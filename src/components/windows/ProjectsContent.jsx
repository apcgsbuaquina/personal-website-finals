import { useState } from 'react'

const projects = [
  {
    image: 'public/images/projects/Mindle.png',
    title: 'Mindle',
    description:
      'This is the first ever project I have contributed on, this stone paved the way for many more projects to come. Anyway, it\'s a simple mental health tracker I built on my first year.',
  },
  {
    image: '',
    title: 'Portfolio Commerce App',
    description:
      'Praesent commodo, justo at bibendum fringilla, velit ligula ultrices turpis, in sodales justo nisl id augue. You can add your stack and features here.',
  },
  {
    image: '',
    title: 'Realtime Team Platform',
    description:
      'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium. Swap this text with your final project details.',
  },
]

function ProjectImage({ src, title }) {
  const [hasError, setHasError] = useState(false)
  const showImage = Boolean(src) && !hasError

  return (
    <div className="w-[320px] max-w-full h-[180px] mb-3 bg-retro-beige border-2 border-retro-border-dark flex items-center justify-center overflow-hidden">
      {showImage ? (
        <img
          src={src}
          alt={title}
          className="w-full h-full object-cover"
          onError={() => setHasError(true)}
        />
      ) : (
        <span className="text-retro-text-dark/70 font-pixel text-[8px]">IMAGE PLACEHOLDER</span>
      )}
    </div>
  )
}

export default function ProjectsContent({ isMaximized }) {
  return (
    <>
      <h2 className="font-pixel text-sm font-bold mb-4 text-retro-text-dark [text-shadow:1px_1px_0_rgba(0,0,0,0.2)] tracking-wide">
        My Projects
      </h2>
      <div className={`flex flex-wrap gap-4 ${!isMaximized ? 'justify-center' : ''}`}>
        {projects.map((project) => (
          <div
            key={project.title}
            className="w-[320px] max-w-full bg-retro-light p-3 border-2 border-t-retro-border-light border-l-retro-border-light border-b-retro-border-dark border-r-retro-border-dark shadow-retro-outset"
          >
            <ProjectImage src={project.image} title={project.title} />

            <h3 className="font-pixel block text-[9px] font-bold mb-2 text-retro-text-dark">
              {project.title}
            </h3>

            <p className="font-retro text-sm leading-4 font-normal opacity-80 text-retro-text-dark">
              {project.description}
            </p>
          </div>
        ))}
      </div>
    </>
  )
}
