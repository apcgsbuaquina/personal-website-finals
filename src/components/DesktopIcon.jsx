export default function DesktopIcon({ id, label, icon, isSelected, onClick }) {
  const handleImageError = (e) => {
    e.target.src = '/images/icon-placeholder.svg'
  }

  return (
    <div
      className={`flex flex-col items-center cursor-pointer transition-transform duration-100 select-none w-20 hover:-translate-y-0.5 active:translate-y-0`}
      onClick={onClick}
      onDoubleClick={onClick}
    >
      <div
        className={`w-12 h-12 flex items-center justify-center mb-1 p-1 transition-all duration-100 overflow-hidden
          [image-rendering:pixelated] [filter:drop-shadow(2px_2px_0_rgba(0,0,0,0.2))]
          hover:scale-105 active:shadow-retro-inset active:scale-[0.98]
          ${isSelected ? 'bg-[#b8a082] shadow-retro-inset' : 'bg-transparent'}`}
      >
        <img
          src={`/images/icons/${id}.png`}
          alt={label}
          onError={handleImageError}
          className="w-full h-full object-cover [image-rendering:pixelated] block"
        />
      </div>
      <div
        className={`font-pixel bg-transparent border-none shadow-none px-2 py-1 text-[7px] text-center text-retro-text-dark w-full break-words
          [text-shadow:1px_1px_2px_rgba(0,0,0,0.8),_-1px_-1px_2px_rgba(255,255,255,0.8)]
          transition-all duration-100
          ${isSelected ? '[text-shadow:2px_2px_4px_rgba(0,0,0,1),_-1px_-1px_2px_rgba(255,255,255,1)]' : ''}`}
      >
        {label}
      </div>
    </div>
  )
}
