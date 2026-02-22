import { useRef } from 'react'
import useDrag from '../hooks/useDrag'

const defaultPositions = {
  welcome: { top: '50%', left: '50%', width: 500, height: 400, transform: 'translate(-50%, -50%)' },
  about: { top: '15%', left: '25%', width: 600, height: 350 },
  projects: { top: '20%', left: '30%', width: 300, height: 415 },
  skills: { top: '15%', left: '35%', width: 360, height: 300 },
  contact: { top: '20%', left: '25%', width: 540, height: 200 },
  blog: { top: '18%', left: '30%', width: 470, height: 370 },
  gallery: { top: '20%', left: '30%', width: 500, height: 400 },
}

export default function Window({
  id,
  icon,
  title,
  children,
  state,
  onClose,
  onMinimize,
  onMaximize,
  onFocus,
}) {
  const windowRef = useRef(null)
  const { position, onMouseDown } = useDrag(windowRef, state.maximized)
  const defaults = defaultPositions[id] || defaultPositions.about

  if (!state.active || state.minimized) return null

  const style = state.maximized
    ? {
        width: 'calc(100vw - 20px)',
        height: 'calc(100vh - 50px)',
        top: 10,
        left: 10,
        zIndex: state.zIndex,
        transform: 'none',
      }
    : position
    ? {
        left: position.x,
        top: position.y,
        width: defaults.width,
        height: defaults.height,
        zIndex: state.zIndex,
        transform: 'none',
      }
    : {
        top: defaults.top,
        left: defaults.left,
        width: defaults.width,
        height: defaults.height,
        zIndex: state.zIndex,
        transform: defaults.transform || 'none',
      }

  return (
    <div
      ref={windowRef}
      className="absolute bg-retro-light min-w-[400px] animate-window-open
        border-[3px] border-retro-border-dark border-t-retro-border-light border-l-retro-border-light
        shadow-retro-focus"
      style={style}
      onMouseDown={(e) => {
        if (!e.target.closest('.window-titlebar')) onFocus()
      }}
    >
      {/* Title Bar */}
      <div
        className="window-titlebar titlebar-highlight h-[30px] bg-gradient-to-b from-[#9d8a6f] to-retro-dark border-b-2 border-retro-border-dark flex justify-between items-center px-2.5 cursor-move select-none relative shadow-[inset_0_1px_0_rgba(255,255,255,0.2)]"
        onMouseDown={onMouseDown}
      >
        {/* Left: Icon + Title */}
        <div className="flex items-center gap-2 text-retro-text-light [text-shadow:1px_1px_0_rgba(0,0,0,0.5)]">
          <span className="text-xs [filter:drop-shadow(1px_1px_0_rgba(0,0,0,0.5))]">
            {icon}
          </span>
          <span className="font-pixel text-[8px] font-bold">{title}</span>
        </div>

        {/* Right: Window Buttons */}
        <div className="flex gap-1.5">
          <button
            onClick={(e) => { e.stopPropagation(); onMinimize() }}
            className="w-5 h-[18px] bg-retro-beige cursor-pointer text-[10px] font-bold text-retro-text-dark flex items-center justify-center font-pixel p-0 leading-none transition-all duration-100
              border-2 border-t-retro-border-light border-l-retro-border-light border-b-retro-border-dark border-r-retro-border-dark
              shadow-retro-outset hover:bg-[#cc4] active:shadow-retro-inset active:translate-x-px active:translate-y-px"
          >
            _
          </button>
          <button
            onClick={(e) => { e.stopPropagation(); onMaximize() }}
            className="w-5 h-[18px] bg-retro-beige cursor-pointer text-[10px] font-bold text-retro-text-dark flex items-center justify-center font-pixel p-0 leading-none transition-all duration-100
              border-2 border-t-retro-border-light border-l-retro-border-light border-b-retro-border-dark border-r-retro-border-dark
              shadow-retro-outset hover:bg-[#4c4] active:shadow-retro-inset active:translate-x-px active:translate-y-px"
          >
            □
          </button>
          <button
            onClick={(e) => { e.stopPropagation(); onClose() }}
            className="w-5 h-[18px] bg-retro-beige cursor-pointer text-[10px] font-bold text-retro-text-dark flex items-center justify-center font-pixel p-0 leading-none transition-all duration-100
              border-2 border-t-retro-border-light border-l-retro-border-light border-b-retro-border-dark border-r-retro-border-dark
              shadow-retro-outset hover:bg-[#c44] hover:text-retro-text-light active:shadow-retro-inset active:translate-x-px active:translate-y-px"
          >
            ×
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="window-scrollbar p-5 bg-retro-light h-[calc(100%-35px)] overflow-y-auto overflow-x-hidden">
        {children}
      </div>
    </div>
  )
}
