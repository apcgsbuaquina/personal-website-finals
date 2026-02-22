/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        retro: {
          beige: '#d4c5a9',
          light: '#e8ddd4',
          dark: '#8b7355',
          'border-light': '#f5f0e8',
          'border-dark': '#6b5d47',
          'text-dark': '#2c2416',
          'text-light': '#f5f0e8',
        },
      },
      fontFamily: {
        pixel: ['"Press Start 2P"', '"Courier New"', 'monospace'],
        retro: ['VT323', '"Courier New"', 'monospace'],
      },
      boxShadow: {
        'retro-inset': 'inset 2px 2px 4px rgba(0, 0, 0, 0.2), inset -2px -2px 4px rgba(255, 255, 255, 0.3)',
        'retro-outset': '2px 2px 4px rgba(0, 0, 0, 0.3), -1px -1px 2px rgba(255, 255, 255, 0.2)',
        'retro-hover': '3px 3px 6px rgba(0, 0, 0, 0.4), -2px -2px 4px rgba(255, 255, 255, 0.3)',
        'retro-focus': '4px 4px 8px rgba(0, 0, 0, 0.4), -2px -2px 4px rgba(255, 255, 255, 0.2), 0 0 0 2px rgba(139, 115, 85, 0.5)',
      },
      keyframes: {
        windowOpen: {
          from: { opacity: '0', transform: 'scale(0.9)' },
          to: { opacity: '1', transform: 'scale(1)' },
        },
      },
      animation: {
        'window-open': 'windowOpen 0.3s ease-out',
      },
    },
  },
  plugins: [],
}
