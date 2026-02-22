import { useState, useCallback, useRef } from 'react'

export default function useWindowManager() {
  const [windows, setWindows] = useState({
    welcome: { active: true, minimized: false, maximized: false, zIndex: 100 },
    about: { active: false, minimized: false, maximized: false, zIndex: 10 },
    projects: { active: false, minimized: false, maximized: false, zIndex: 10 },
    skills: { active: false, minimized: false, maximized: false, zIndex: 10 },
    contact: { active: false, minimized: false, maximized: false, zIndex: 10 },
    blog: { active: false, minimized: false, maximized: false, zIndex: 10 },
    gallery: { active: false, minimized: false, maximized: false, zIndex: 10 },
  })

  const zIndexCounter = useRef(100)

  const [selectedIcon, setSelectedIcon] = useState(null)

  const bringToFront = useCallback((windowId) => {
    zIndexCounter.current += 1
    setWindows((prev) => ({
      ...prev,
      [windowId]: { ...prev[windowId], zIndex: zIndexCounter.current },
    }))
  }, [])

  const openWindow = useCallback((windowId) => {
    zIndexCounter.current += 1
    setWindows((prev) => ({
      ...prev,
      [windowId]: {
        ...prev[windowId],
        active: true,
        minimized: false,
        zIndex: zIndexCounter.current,
      },
    }))
    setSelectedIcon(windowId)
  }, [])

  const closeWindow = useCallback((windowId) => {
    setWindows((prev) => ({
      ...prev,
      [windowId]: { ...prev[windowId], active: false, maximized: false },
    }))
    setSelectedIcon((prev) => (prev === windowId ? null : prev))
  }, [])

  const minimizeWindow = useCallback((windowId) => {
    setWindows((prev) => ({
      ...prev,
      [windowId]: { ...prev[windowId], minimized: true },
    }))
  }, [])

  const maximizeWindow = useCallback((windowId) => {
    setWindows((prev) => ({
      ...prev,
      [windowId]: { ...prev[windowId], maximized: !prev[windowId].maximized },
    }))
  }, [])

  return {
    windows,
    selectedIcon,
    openWindow,
    closeWindow,
    minimizeWindow,
    maximizeWindow,
    bringToFront,
  }
}
