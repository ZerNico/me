import { motion } from 'framer-motion'
import { useTheme } from 'next-themes'
import type { ComponentProps } from 'react'

export default function DarkModeToggle(props: ComponentProps<'button'>) {
  const { theme } = useTheme()

  const darkVariants = {
    visible: { x: 0 },
    hidden: { x: 40 },
  }
  const lightVariants = {
    visible: { x: 0 },
    hidden: { x: -40 },
  }

  const transition = {
    type: 'spring',
    stiffness: 300,
    damping: 16,
  }

  return (
    <button className="h-12 w-12 overflow-hidden rounded-full bg-muted-background" id="toggle" {...props}>
      <motion.div className="relative h-full w-full flex items-center justify-center">
        <motion.div
          variants={lightVariants}
          initial={false}
          animate={theme === 'light' ? 'visible' : 'hidden'}
          transition={transition}
          className="i-mingcute-sun-fill absolute h-8 w-8"
         />
        <motion.div
          variants={darkVariants}
          initial={false}
          animate={theme === 'dark' ? 'visible' : 'hidden'}
          transition={transition}
          className="i-mingcute-moon-fill absolute h-8 w-8"
         />
      </motion.div>
    </button>
  )
}
