import { useEffect } from 'react'
import MenuBar from './components/MenuBar'
import Desktop from './components/Desktop'
import useWindowManager from './hooks/useWindowManager'

export default function App() {
  const {
    windows,
    selectedIcon,
    openWindow,
    closeWindow,
    minimizeWindow,
    maximizeWindow,
    bringToFront,
  } = useWindowManager()

  // ESC key to close active window
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        // Find the topmost active, non-minimized window
        const activeWindows = Object.entries(windows)
          .filter(([, state]) => state.active && !state.minimized)
          .sort((a, b) => b[1].zIndex - a[1].zIndex)

        if (activeWindows.length > 0) {
          closeWindow(activeWindows[0][0])
        }
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [windows, closeWindow])

  return (
    <div className="h-screen overflow-hidden bg-gradient-to-br from-retro-dark to-retro-border-dark">
      <MenuBar />
      <Desktop
        windows={windows}
        selectedIcon={selectedIcon}
        openWindow={openWindow}
        closeWindow={closeWindow}
        minimizeWindow={minimizeWindow}
        maximizeWindow={maximizeWindow}
        bringToFront={bringToFront}
      />
    </div>
  )
}
