const skillCategories = [
  { title: 'Languages', tags: ['JavaScript', 'Python', 'HTML/CSS', 'TypeScript'] },
  { title: 'Frameworks', tags: ['React', 'Node.js', 'Vue.js'] },
  { title: 'Tools', tags: ['Git', 'VSCode', 'Supabase'] },
]

export default function SkillsContent() {
  return (
    <>
      <h2 className="font-pixel text-sm font-bold mb-4 text-retro-text-dark [text-shadow:1px_1px_0_rgba(0,0,0,0.2)] tracking-wide">
        Technical Skills
      </h2>
      <div className="flex flex-col gap-4">
        {skillCategories.map((category, i) => (
          <div
            key={category.title}
            className={`font-retro py-3 bg-transparent ${
              i < skillCategories.length - 1 ? 'border-b border-retro-border-dark' : ''
            }`}
          >
            <strong className="font-pixel block text-[9px] font-bold mb-2.5">
              {category.title}:
            </strong>
            <div className="flex flex-wrap gap-2">
              {category.tags.map((tag) => (
                <span
                  key={tag}
                  className="text-[15px] px-2.5 py-1.5 bg-retro-light inline-block
                    border-2 border-t-retro-border-light border-l-retro-border-light border-b-retro-border-dark border-r-retro-border-dark
                    shadow-retro-outset"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </>
  )
}
