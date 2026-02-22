import { useMemo, useState } from 'react'

const photos = ['/images/gallery/pfp.png']

export default function GalleryContent({ isMaximized = false }) {
  const [currentIndex, setCurrentIndex] = useState(0)

  const hasPhotos = photos.length > 0

  const currentPhoto = useMemo(() => {
    if (!hasPhotos) return null
    return photos[currentIndex]
  }, [currentIndex, hasPhotos])

  const goPrev = () => {
    if (!hasPhotos) return
    setCurrentIndex((prev) => (prev - 1 + photos.length) % photos.length)
  }

  const goNext = () => {
    if (!hasPhotos) return
    setCurrentIndex((prev) => (prev + 1) % photos.length)
  }

  return (
    <>
      <h2 className="font-pixel text-sm font-bold mb-4 text-retro-text-dark [text-shadow:1px_1px_0_rgba(0,0,0,0.2)] tracking-wide">
        Photo Gallery
      </h2>
      {hasPhotos ? (
        isMaximized ? (
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3 my-4">
            {photos.map((photo, index) => (
              <div
                key={photo}
                className="aspect-square bg-retro-beige border-2 border-retro-border-dark overflow-hidden"
              >
                <img
                  src={photo}
                  alt={`Gallery ${index + 1}`}
                  className="w-full h-full object-cover"
                />
              </div>
            ))}
          </div>
        ) : (
          <div className="my-4">
            <div className="aspect-square bg-retro-beige border-2 border-retro-border-dark overflow-hidden mb-3">
              <img src={currentPhoto} alt={`Gallery ${currentIndex + 1}`} className="w-full h-full object-cover" />
            </div>
            <div className="flex items-center justify-between">
              <button
                onClick={goPrev}
                className="px-3 py-1.5 bg-retro-beige text-retro-text-dark border-2 border-t-retro-border-light border-l-retro-border-light border-b-retro-border-dark border-r-retro-border-dark font-pixel text-[9px]"
              >
                ← Prev
              </button>
              <span className="font-pixel text-[9px] text-retro-text-dark">
                {currentIndex + 1} / {photos.length}
              </span>
              <button
                onClick={goNext}
                className="px-3 py-1.5 bg-retro-beige text-retro-text-dark border-2 border-t-retro-border-light border-l-retro-border-light border-b-retro-border-dark border-r-retro-border-dark font-pixel text-[9px]"
              >
                Next →
              </button>
            </div>
          </div>
        )
      ) : (
        <div className="my-4 p-3 border-2 border-retro-border-dark bg-retro-beige font-retro text-sm text-retro-text-dark">
          No photos yet. Add images to /public/images/gallery.
        </div>
      )}
    </>
  )
}
