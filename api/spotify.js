// Vercel Serverless Function — /api/spotify
// Returns the user's recently played Spotify tracks.

const CLIENT_ID = process.env.SPOTIFY_CLIENT_ID
const CLIENT_SECRET = process.env.SPOTIFY_CLIENT_SECRET
const REFRESH_TOKEN = process.env.SPOTIFY_REFRESH_TOKEN

const TOKEN_URL = 'https://accounts.spotify.com/api/token'
const RECENTLY_PLAYED_URL =
  'https://api.spotify.com/v1/me/player/recently-played?limit=5'

let cachedResponse = null
let cacheExpiry = 0
let rateLimitedUntil = 0
const CACHE_DURATION_MS = 10 * 60 * 1000

async function getAccessToken() {
  const basic = Buffer.from(`${CLIENT_ID}:${CLIENT_SECRET}`).toString('base64')

  const res = await fetch(TOKEN_URL, {
    method: 'POST',
    headers: {
      Authorization: `Basic ${basic}`,
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: new URLSearchParams({
      grant_type: 'refresh_token',
      refresh_token: REFRESH_TOKEN,
    }),
  })

  if (!res.ok) {
    const errorData = await res.text()
    console.error('Token refresh failed:', res.status, errorData)
    throw new Error(`Token refresh failed: ${res.status} - ${errorData}`)
  }

  return res.json()
}

export default async function handler(req, res) {
  // CORS headers for local dev
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'GET')
  res.setHeader('Cache-Control', 'public, s-maxage=300, stale-while-revalidate=600')

  try {
    // Verify env vars are set
    if (!CLIENT_ID || !CLIENT_SECRET || !REFRESH_TOKEN) {
      console.error('Missing environment variables:', {
        hasClientId: !!CLIENT_ID,
        hasClientSecret: !!CLIENT_SECRET,
        hasRefreshToken: !!REFRESH_TOKEN,
      })
      return res.status(500).json({ 
        error: 'Server configuration error',
        details: 'Missing Spotify credentials'
      })
    }

    if (cachedResponse && Date.now() < cacheExpiry) {
      return res.status(200).json(cachedResponse)
    }

    if (Date.now() < rateLimitedUntil) {
      if (cachedResponse) {
        return res.status(200).json(cachedResponse)
      }
      return res.status(200).json({ tracks: [], rateLimited: true })
    }

    const { access_token } = await getAccessToken()

    const spotifyRes = await fetch(RECENTLY_PLAYED_URL, {
      headers: { Authorization: `Bearer ${access_token}` },
    })

    if (!spotifyRes.ok) {
      if (spotifyRes.status === 429) {
        const retryAfter = Number.parseInt(spotifyRes.headers.get('Retry-After') || '60', 10)
        rateLimitedUntil = Date.now() + Math.max(retryAfter, 60) * 1000
        if (cachedResponse) {
          return res.status(200).json(cachedResponse)
        }
        return res.status(200).json({ tracks: [], rateLimited: true, retryAfter })
      }

      return res.status(spotifyRes.status).json({
        error: 'Spotify API error',
        status: spotifyRes.status,
      })
    }

    const data = await spotifyRes.json()

    const tracks = data.items.map((item) => ({
      title: item.track.name,
      artist: item.track.artists.map((a) => a.name).join(', '),
      album: item.track.album.name,
      albumArt: item.track.album.images[2]?.url || item.track.album.images[0]?.url,
      url: item.track.external_urls.spotify,
      playedAt: item.played_at,
    }))

    cachedResponse = { tracks }
    cacheExpiry = Date.now() + CACHE_DURATION_MS
    return res.status(200).json(cachedResponse)
  } catch (err) {
    console.error('Spotify API error:', err.message, err.stack)
    return res.status(500).json({ 
      error: 'Failed to fetch recently played',
      message: err.message
    })
  }
}
