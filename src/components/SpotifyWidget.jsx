import { useState, useEffect } from 'react'

const SPOTIFY_API_URL = '/api/spotify'

function timeAgo(dateStr) {
  const diff = Date.now() - new Date(dateStr).getTime()
  const mins = Math.floor(diff / 60000)
  if (mins < 1) return 'just now'
  if (mins < 60) return `${mins}m ago`
  const hrs = Math.floor(mins / 60)
  if (hrs < 24) return `${hrs}h ago`
  return `${Math.floor(hrs / 24)}d ago`
}

export default function SpotifyWidget() {
  const [tracks, setTracks] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [collapsed, setCollapsed] = useState(false)

  useEffect(() => {
    let cancelled = false

    async function fetchTracks() {
      try {
        const res = await fetch(SPOTIFY_API_URL)
        if (!res.ok) throw new Error(`HTTP ${res.status}`)
        const data = await res.json()
        if (!cancelled) {
          setTracks(data.tracks || [])
          setError(data.rateLimited ? 'Rate limited' : null)
        }
      } catch (err) {
        if (!cancelled) setError(err.message)
      } finally {
        if (!cancelled) setLoading(false)
      }
    }

    fetchTracks()
    // Refresh every 10 minutes
    const interval = setInterval(fetchTracks, 600_000)
    return () => {
      cancelled = true
      clearInterval(interval)
    }
  }, [])

  return (
    <div
      className="absolute right-4 top-4 z-10 select-none"
      style={{ width: 300 }}
    >
      {/* Title bar */}
      <div
        className="flex items-center justify-between px-2 py-1 cursor-pointer
                    bg-retro-dark text-retro-text-light font-pixel text-[10px] tracking-wide
                    border-2 border-retro-border-light border-b-retro-border-dark border-r-retro-border-dark"
        onClick={() => setCollapsed((c) => !c)}
      >
        <div className="flex items-center gap-1.5">
          <span className="text-green-400 text-sm leading-none">♫</span>
          <span>Recently Played</span>
        </div>
        <span className="text-[8px]">{collapsed ? '▼' : '▲'}</span>
      </div>

      {/* Body */}
      {!collapsed && (
        <div
          className="bg-retro-beige/90 backdrop-blur-sm border-2
                      border-t-0 border-retro-border-dark border-l-retro-border-dark
                      border-r-retro-border-light border-b-retro-border-light
                      shadow-retro-outset max-h-[340px] overflow-y-auto window-scrollbar"
        >
          {loading && (
            <div className="p-3 text-center text-retro-dark font-retro text-sm animate-pulse">
              Loading tracks...
            </div>
          )}

          {error && error !== 'Rate limited' && (
            <div className="p-3 text-center text-retro-dark font-retro text-sm">
              <span className="text-red-700">⚠</span> Could not load tracks
            </div>
          )}

          {error === 'Rate limited' && (
            <div className="p-3 text-center text-retro-dark font-retro text-sm">
              Spotify is rate limited right now — showing last available data.
            </div>
          )}

          {!loading && !error && tracks.length === 0 && (
            <div className="p-3 text-center text-retro-dark font-retro text-sm">
              No recent tracks
            </div>
          )}

          {!loading &&
            !error &&
            tracks.map((track, i) => (
              <a
                key={`${track.url}-${i}`}
                href={track.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-2 py-1.5 hover:bg-retro-dark/10
                           transition-colors border-b border-retro-border-dark/20 last:border-b-0
                           group"
              >
                {/* Album art */}
                <img
                  src={track.albumArt}
                  alt={track.album}
                  className="w-11 h-11 border border-retro-border-dark/40 flex-shrink-0"
                  style={{ imageRendering: 'auto' }}
                />

                {/* Track info */}
                <div className="min-w-0 flex-1">
                  <p className="font-retro text-sm text-retro-text-dark truncate leading-tight group-hover:text-retro-dark">
                    {track.title}
                  </p>
                  <p className="font-retro text-xs text-retro-dark/70 truncate leading-tight">
                    {track.artist}
                  </p>
                </div>

                {/* Time ago */}
                <span className="font-retro text-[11px] text-retro-dark/50 flex-shrink-0">
                  {timeAgo(track.playedAt)}
                </span>
              </a>
            ))}

          {/* Spotify branding */}
          <div className="flex items-center justify-center gap-1 py-1 bg-retro-dark/5 font-pixel text-[7px] text-retro-dark/40 tracking-wider">
            <svg
              viewBox="0 0 24 24"
              className="w-3 h-3 fill-current"
              aria-hidden="true"
            >
              <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z" />
            </svg>
            <span>SPOTIFY</span>
          </div>
        </div>
      )}
    </div>
  )
}
