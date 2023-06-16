export default function Footer() {
  // current year
  const year = new Date().getFullYear()

  const socials = [
    {
      icon: 'i-mingcute-github-line',
      link: 'https://github.com/ZerNico',
    },
    {
      icon: 'i-mingcute-linkedin-line',
      link: 'https://linkedin.com/in/nico-franke-744313224',
    },
    {
      icon: 'i-mingcute-twitter-line',
      link: 'https://twitter.com/z3rnico',
    },
    {
      icon: 'i-mingcute-ins-line',
      link: 'https://instagram.com/z3rnico',
    },
  ]

  return (
    <footer className="flex flex-col items-center justify-center gap-4">
      {year} • Nico Franke
      <div className="flex gap-1 text-xl">
        {socials.map((social) => (
          <a href={social.link} target="_blank" rel="noreferrer" key={social.link}>
            <div className={social.icon} />
          </a>
        ))}
      </div>
    </footer>
  )
}
