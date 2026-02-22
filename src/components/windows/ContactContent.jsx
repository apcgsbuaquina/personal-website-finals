const contacts = [
  { label: 'Email', href: 'mailto:gsbuaquina@gmail.com', text: 'gsbuaquina@gmail.com' },
  { label: 'GitHub', href: 'https://github.com/apcgsbuaquina', text: 'github.com/apcgsbuaquina' },
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/gian-ace-buaqui%C3%B1a-67b9a0321/', text: 'linkedin.com/in/gian-ace-buaquiña' },
  { label: 'Instagram', href: 'https://instagram.com/totallynotgiann', text: '@totallynotgiann' },
]

export default function ContactContent() {
  return (
    <>
      <h2 className="font-pixel text-sm font-bold mb-4 text-retro-text-dark [text-shadow:1px_1px_0_rgba(0,0,0,0.2)] tracking-wide">
        Get In Touch
      </h2>
      <div className="my-5">
        {contacts.map((contact, i) => (
          <div
            key={contact.label}
            className={`font-retro text-sm font-normal py-2.5 mb-2.5 bg-transparent ${
              i < contacts.length - 1 ? 'border-b border-retro-border-dark' : ''
            }`}
          >
            <strong className="font-pixel font-bold">{contact.label}:</strong>{' '}
            <a
              href={contact.href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-retro-text-dark underline hover:opacity-70 transition-opacity"
            >
              {contact.text}
            </a>
          </div>
        ))}
      </div>
      <button
        className="retro-btn block mx-auto my-5 font-pixel text-[8px] py-3 px-6 bg-retro-beige text-retro-text-dark cursor-pointer uppercase relative overflow-hidden
          border-[3px] border-t-retro-border-dark border-l-retro-border-dark border-b-retro-border-light border-r-retro-border-light
          shadow-retro-outset [text-shadow:1px_1px_0_rgba(255,255,255,0.3)]
          transition-all duration-100
          hover:bg-retro-light hover:shadow-retro-hover hover:-translate-y-px
          active:shadow-retro-inset active:translate-x-px active:translate-y-px
          focus:outline-2 focus:outline-retro-border-dark focus:outline-offset-2"
      >
        Send Message
      </button>
    </>
  )
}
