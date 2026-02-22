import DesktopIcon from './DesktopIcon'
import Window from './Window'
import WelcomeContent from './windows/WelcomeContent'
import AboutContent from './windows/AboutContent'
import ProjectsContent from './windows/ProjectsContent'
import SkillsContent from './windows/SkillsContent'
import ContactContent from './windows/ContactContent'
import BlogContent from './windows/BlogContent'
import GalleryContent from './windows/GalleryContent'

const icons = [
  { id: 'about', label: 'About Me' },
  { id: 'projects', label: 'Projects' },
  { id: 'skills', label: 'Skills' },
  { id: 'contact', label: 'Contact' },
  { id: 'gallery', label: 'Gallery' },
  { id: 'blog', label: 'Blog' },
]

const windowConfigs = [
  { id: 'welcome', icon: '★', title: 'Gian Ace Buaquiña' },
  { id: 'about', icon: '★', title: 'About Me' },
  { id: 'projects', icon: '★', title: 'Projects' },
  { id: 'skills', icon: '★', title: 'Skills' },
  { id: 'contact', icon: '★', title: 'Contact' },
  { id: 'blog', icon: '★', title: 'Blog' },
  { id: 'gallery', icon: '★', title: 'Gallery' },
]

export default function Desktop({
  windows,
  selectedIcon,
  openWindow,
  closeWindow,
  minimizeWindow,
  maximizeWindow,
  bringToFront,
}) {
  const handleExplore = () => {
    closeWindow('welcome')
    setTimeout(() => openWindow('about'), 300)
  }

  const contentMap = {
    welcome: <WelcomeContent onExplore={handleExplore} />,
    about: <AboutContent />,
    projects: <ProjectsContent isMaximized={windows.projects.maximized} />,
    skills: <SkillsContent />,
    contact: <ContactContent />,
    blog: <BlogContent />,
    gallery: <GalleryContent isMaximized={windows.gallery.maximized} />,
  }

  return (
    <div className="desktop-bg relative w-screen h-[calc(100vh-30px)] overflow-hidden mt-[30px]">
      {/* Desktop Icons */}
      <div className="absolute left-5 top-5 flex flex-col gap-6 z-[5]">
        {icons.map((icon) => (
          <DesktopIcon
            key={icon.id}
            id={icon.id}
            label={icon.label}
            isSelected={selectedIcon === icon.id}
            onClick={() => openWindow(icon.id)}
          />
        ))}
      </div>

      {/* Windows */}
      {windowConfigs.map((config) => (
        <Window
          key={config.id}
          id={config.id}
          icon={config.icon}
          title={config.title}
          state={windows[config.id]}
          onClose={() => closeWindow(config.id)}
          onMinimize={() => minimizeWindow(config.id)}
          onMaximize={() => maximizeWindow(config.id)}
          onFocus={() => bringToFront(config.id)}
        >
          {contentMap[config.id]}
        </Window>
      ))}
    </div>
  )
}
