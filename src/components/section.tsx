import { motion } from 'framer-motion'
import type React from 'react'

interface SectionProps {
  title: React.ReactNode
  description?: string
  children?: React.ReactNode
}

const Section = ({ title, description, children }: SectionProps) => (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.5,
        delay: 0.2,
      }}
      viewport={{ margin: '20px', once: true }}
    >
      <h1 className="text-2xl font-bold font-bold md:text-5xl sm:text-4xl">{title}</h1>
      {description && <p className="text-md font-semibold leading-tight sm:text-xl">{description}</p>}
      <div className="mt-5">{children}</div>
    </motion.div>
  )

export { Section }
