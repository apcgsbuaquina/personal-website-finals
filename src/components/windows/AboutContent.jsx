export default function AboutContent() {
  return (
    <>
      <h2 className="font-pixel text-sm font-bold mb-4 text-retro-text-dark [text-shadow:1px_1px_0_rgba(0,0,0,0.2)] tracking-wide">
        About Me
      </h2>
      <div className="my-4">
        <img
          src="public/images/gallery/pfp.png"
          alt="About me"
          className="w-[120px] h-[120px] border-2 border-retro-border-dark float-left mr-4 mb-2.5 object-cover shadow-retro-inset bg-[#1a1a1a]"
        />
        <p className="font-retro text-base font-normal leading-none mb-3 text-retro-text-dark">
          Hello! I'm a passionate student in hopes of contributing to meaningful projects.
        </p>
        <p className="font-retro text-base font-normal leading-none mb-3 text-retro-text-dark">
          I love coding random useless things and exploring new technologies. When I'm not coding, you can find me outside galloping, consuming media, or wasting my time.
        </p>
        <div className="font-retro bg-transparent border-x-0 border-y-2 border-retro-border-dark py-3 my-4 text-sm font-normal leading-[1.8] clear-both">
          <strong className="font-pixel text-[9px] font-bold">Education:</strong> Information Technology Student<br />
          <strong className="font-pixel text-[9px] font-bold">Location:</strong> Philippines<br />
          <strong className="font-pixel text-[9px] font-bold">Status:</strong> Hungry
        </div>
        <div className="clear-both" />
      </div>
    </>
  )
}
