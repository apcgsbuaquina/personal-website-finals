const resources = [
  {
    title: 'w3schools',
    url: 'https://www.w3schools.com/',
    note: 'Reference guide for web development standards, syntax, and tutorials..',
  },
  {
    title: 'github',
    url: 'https://github.com/',
    note: 'Hosting the source code, version history, and frontend architecture for this project.',
  },
]

export default function BlogContent() {
  return (
    <>
      <h2 className="font-pixel text-sm font-bold mb-4 text-retro-text-dark [text-shadow:1px_1px_0_rgba(0,0,0,0.2)] tracking-wide">
        Resources Used
      </h2>
      <div className="flex flex-col gap-3">
        {resources.map((resource, i) => (
          <div
            key={i}
            className={`font-retro py-3 bg-transparent ${
              i < resources.length - 1 ? 'border-b border-retro-border-dark' : ''
            }`}
          >
            <strong className="font-pixel block text-[9px] font-bold mb-2">
              {resource.title}
            </strong>
            <a
              href={resource.url}
              target="_blank"
              rel="noreferrer"
              className="font-retro text-sm underline opacity-90 break-all"
            >
              {resource.url}
            </a>
            <p className="font-retro text-sm font-normal opacity-80">
              {resource.note}
            </p>
          </div>
        ))}
      </div>
    </>
  )
}
