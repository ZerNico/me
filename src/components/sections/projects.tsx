import { motion } from 'framer-motion'

import { Section } from '../section'
import { Card, CardDescription, CardTitle } from '../ui/card'

export default function Projects() {
  const projects = [
    {
      title: 'Tune Perfect',
      description:
        'An open source Karaoke game built with Vue, Tauri, and trpc. It uses pitch detection to score your singing.',
      icon: '/img/tune-perfect.svg',
      url: 'https://github.com/ZerNico/sing',
    },

    {
      title: 'POSP',
      description:
        'An AOSP based custom ROM with a focus on stability and performance. It includes many original features and customizations.',
      icon: '/img/posp.jpg',
      url: 'https://potatoproject.co',
    },
    {
      title: 'Lawnchair',
      description: 'A simple, customizable, and open source launcher for Android.',
      icon: '/img/lawnchair.png',
      url: 'https://lawnchair.app',
    },
    {
      title: 'Leaflet Notes',
      description:
        'An open source note taking app made with Flutter. It uses a custom sync engine to sync notes across devices.',
      icon: '/img/leaflet-notes.png',
      url: 'https://github.com/PotatoProject/Leaflet',
    },
  ] as const

  const urlDomain = (url: string) => {
    const domain = url.replace('http://', '').replace('https://', '').split(/[#/?]/)[0]
    return domain.replace('www.', '')
  }

  return (
    <Section title="My Projects">
      <div className="columns-1 gap-8 md:columns-2 space-y-8">
        {projects.map((project) => (
          <Card key={project.title} className="break-inside-avoid" asChild>
            <motion.a
              href={project.url}
              target="_blank"
              rel="noreferrer"
              whileHover={{
                scale: 1.05,
                transition: { duration: 0.3 },
              }}
            >
              <div className="">
                <img src={project.icon} alt={`${project.title} Icon`} className="w-10 rounded-full" />
              </div>
              <CardTitle>{project.title}</CardTitle>
              <CardDescription>{project.description}</CardDescription>
              <div className="flex items-center gap-1">
                <div className="i-mingcute-link-2-fill" />
                {urlDomain(project.url)}
              </div>
            </motion.a>
          </Card>
        ))}
      </div>
    </Section>
  )
}
