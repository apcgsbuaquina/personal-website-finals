import { useState, useRef, useCallback, useEffect } from 'react'

export default function useDrag(windowRef, isMaximized) {
  const [position, setPosition] = useState(null)
  const isDragging = useRef(false)
  const dragOffset = useRef({ x: 0, y: 0 })

  const onMouseDown = useCallback(
    (e) => {
      if (isMaximized) return
      if (e.target.closest('button')) return

      isDragging.current = true
      const rect = windowRef.current.getBoundingClientRect()
      dragOffset.current = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      }

      const onMouseMove = (e) => {
        if (!isDragging.current) return

        const maxX = window.innerWidth - windowRef.current.offsetWidth
        const maxY = window.innerHeight - windowRef.current.offsetHeight - 30

        let newX = e.clientX - dragOffset.current.x
        let newY = e.clientY - dragOffset.current.y

        newX = Math.max(0, Math.min(newX, maxX))
        newY = Math.max(0, Math.min(newY, maxY))

        setPosition({ x: newX, y: newY })
      }

      const onMouseUp = () => {
        isDragging.current = false
        document.removeEventListener('mousemove', onMouseMove)
        document.removeEventListener('mouseup', onMouseUp)
      }

      document.addEventListener('mousemove', onMouseMove)
      document.addEventListener('mouseup', onMouseUp)
    },
    [isMaximized, windowRef]
  )

  // Prevent text selection while dragging
  useEffect(() => {
    const handleSelectStart = (e) => {
      if (isDragging.current) e.preventDefault()
    }
    document.addEventListener('selectstart', handleSelectStart)
    return () => document.removeEventListener('selectstart', handleSelectStart)
  }, [])

  return { position, onMouseDown, isDragging: isDragging.current }
}
