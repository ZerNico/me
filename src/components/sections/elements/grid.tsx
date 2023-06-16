import { useInterval } from 'ahooks'
import { clsx } from 'clsx'
import { motion } from 'framer-motion'
import { useState } from 'react'

export default function Grid() {
  const [expanded, setExpanded] = useState(false)

  const toggleExpanded = () => setExpanded(!expanded)

  useInterval(toggleExpanded, 3000, { immediate: true })

  const elements = [
    { class: clsx({ 'col-span-3': expanded }), text: '1' },
    { class: '', text: '2' },
    { class: clsx({ 'col-span-2': expanded }, 'bg-secondary-background text-secondary-foreground'), text: '3' },
    { class: '', text: '4' },
  ]

  return (
    <div className="h-34">
      <div className="grid grid-cols-3 list-none gap-2">
        {elements.map((element, index) => (
          <motion.div
            key={index}
            layout
            style={{ borderRadius: 8 }}
            className={clsx(element.class, 'bg-primary-background px-4 py-2 text-primary-foreground')}
          >
            <motion.span layout style={{ display: 'inline-block' }}>
              {element.text}
            </motion.span>
          </motion.div>
        ))}
      </div>
    </div>
  )
}
