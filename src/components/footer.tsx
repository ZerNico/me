import IconGithub from "~icons/mingcute/github-line";
import IconInstagram from "~icons/mingcute/ins-line";
import IconLinkedin from "~icons/mingcute/linkedin-line";
import IconTwitter from "~icons/mingcute/twitter-line";

export default function Footer() {
  const year = new Date().getFullYear();

  const socials = [
    {
      icon: IconGithub,
      label: "GitHub",
      link: "https://github.com/ZerNico",
    },
    {
      icon: IconLinkedin,
      label: "LinkedIn",
      link: "https://linkedin.com/in/nico-franke-744313224",
    },
    {
      icon: IconTwitter,
      label: "Twitter",
      link: "https://twitter.com/z3rnico",
    },
    {
      icon: IconInstagram,
      label: "Instagram",
      link: "https://instagram.com/z3rnico",
    },
  ];

  return (
    <footer className="flex flex-col items-center justify-center gap-4">
      {year} • Nico Franke
      <div className="flex gap-1 text-xl">
        {socials.map((social) => (
          <a href={social.link} target="_blank" rel="noreferrer" key={social.link} aria-label={social.label}>
            <social.icon />
          </a>
        ))}
      </div>
    </footer>
  );
}
