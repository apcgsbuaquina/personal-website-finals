import { useState, useEffect } from 'react'

export default function MenuBar() {
  const [time, setTime] = useState('')

  useEffect(() => {
    const updateTime = () => {
      const now = new Date()
      const timeString = now.toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit',
        hour12: true,
      })
      const dateString = now.toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
      })
      setTime(`${dateString} | ${timeString}`)
    }

    updateTime()
    const interval = setInterval(updateTime, 1000)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="fixed top-0 left-0 w-full h-[30px] bg-retro-beige border-b-[3px] border-retro-border-dark flex justify-between items-center px-4 z-[1000] shadow-[0_2px_4px_rgba(0,0,0,0.3)] font-pixel text-[8px]">
      {/* Left Section */}
      <div className="flex items-center gap-4">
        <span className="font-bold text-[9px] text-retro-text-dark [text-shadow:1px_1px_0_rgba(255,255,255,0.3)] mr-2.5">
          Gian Ace Buaquiña
        </span>
        <span className="text-retro-text-dark cursor-pointer px-2 py-1 border border-transparent transition-all duration-100 hover:bg-retro-light hover:border hover:border-retro-border-dark hover:shadow-retro-inset">
          File
        </span>
        <span className="text-retro-text-dark cursor-pointer px-2 py-1 border border-transparent transition-all duration-100 hover:bg-retro-light hover:border hover:border-retro-border-dark hover:shadow-retro-inset">
          Help
        </span>
        <span className="text-[#4a7c3f] text-[10px] ml-1">▲</span>
      </div>

      {/* Right Section */}
      <div className="flex items-center text-retro-text-dark text-[7px]">
        <span className="[text-shadow:1px_1px_0_rgba(255,255,255,0.3)]">
          Welcome to my profile |{' '}
          <span className="font-bold">{time}</span>
        </span>
      </div>
    </div>
  )
}
