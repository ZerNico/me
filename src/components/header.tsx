import { motion } from 'framer-motion'
import Image from 'next/image'
import { useTheme } from 'next-themes'

import DarkModeToggle from './dark-mode-toggle'

export default function Header() {
  const { theme, setTheme } = useTheme()

  const isDark = theme === 'dark'

  const toggleTheme = () => {
    setTheme(isDark ? 'light' : 'dark')
  }

  return (
    <header className="flex items-center">
      <motion.div
        whileHover={{
          scale: 1.2,
          transition: { duration: 0.5 },
        }}
      >
        <Image
          src="/img/avatar.jpg"
          alt="A headshot of Nico Franke"
          width={112}
          height={112}
          className="h-14 w-14 rounded-full"
        />
      </motion.div>
      <div className="flex-grow" />
      <div className="flex items-center gap-4">
        <a href="https://github.com/ZerNico" target="_blank" rel="noreferrer">
          <div className="i-mingcute-github-line text-2xl" />
        </a>
        <DarkModeToggle onClick={toggleTheme} />
      </div>
    </header>
  )
}
