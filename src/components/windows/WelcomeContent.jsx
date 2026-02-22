export default function WelcomeContent({ onExplore }) {
  return (
    <>
      <h2 className="font-pixel text-sm font-bold mb-4 text-retro-text-dark [text-shadow:1px_1px_0_rgba(0,0,0,0.2)] tracking-wide">
        Welcome to My Profile!
      </h2>
      <p className="font-retro text-base font-normal leading-none mb-3 text-retro-text-dark">
        Explore my personal computer to learn more about me. Click on the desktop icons to open different applications and discover my work, skills, and interests.
      </p>

      {/* Stats Section */}
      <div className="stats-divider flex justify-around my-5 py-4 border-y-2 border-retro-border-dark">
        {[
          { icon: '🌱', value: '100+', label: 'Projects' },
          { icon: '💡', value: '5+', label: 'Years Experience' },
          { icon: '🎯', value: '50+', label: 'Technologies' },
        ].map((stat, i, arr) => (
          <div
            key={stat.label}
            className={`text-center flex-1 relative ${i < arr.length - 1 ? 'stat-divider' : ''}`}
          >
            <div className="text-2xl mb-2 [filter:drop-shadow(1px_1px_0_rgba(0,0,0,0.3))]">
              {stat.icon}
            </div>
            <div className="font-pixel text-xs font-bold mb-1 text-retro-text-dark">
              {stat.value}
            </div>
            <div className="font-retro text-[7px] font-normal text-retro-text-dark opacity-80">
              {stat.label}
            </div>
          </div>
        ))}
      </div>

      <p className="font-retro text-base font-normal leading-none mb-3 text-retro-text-dark">
        You can explore the features of retroOS!
      </p>

      <button
        onClick={onExplore}
        className="retro-btn block mx-auto my-5 font-pixel text-[8px] py-3 px-6 bg-retro-beige text-retro-text-dark cursor-pointer uppercase relative overflow-hidden
          border-[3px] border-t-retro-border-dark border-l-retro-border-dark border-b-retro-border-light border-r-retro-border-light
          shadow-retro-outset [text-shadow:1px_1px_0_rgba(255,255,255,0.3)]
          transition-all duration-100
          hover:bg-retro-light hover:shadow-retro-hover hover:-translate-y-px
          active:shadow-retro-inset active:translate-x-px active:translate-y-px active:border-t-retro-border-light active:border-l-retro-border-light active:border-b-retro-border-dark active:border-r-retro-border-dark
          focus:outline-2 focus:outline-retro-border-dark focus:outline-offset-2"
      >
        Let&apos;s go!
      </button>
    </>
  )
}
