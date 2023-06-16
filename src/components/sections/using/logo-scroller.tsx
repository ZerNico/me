import { clsx } from 'clsx'

import type { Tool } from '@/lib/tools'

interface LogoScrollerProps {
  tools: Tool[]
}

export default function LogoScroller({ tools }: LogoScrollerProps) {
  return (
    <div className="relative w-full overflow-hidden">
      <div className="logo-slider max-w-10000 min-w-fit flex flex-shrink-0 gap-4 text-5xl sm:text-6xl">
        {tools.map((tool, index) => (
          <div key={index} className={clsx(tool.logo, tool.class)} />
        ))}
        {tools.map((tool, index) => (
          <div key={index} className={clsx(tool.logo, tool.class)} />
        ))}
      </div>
      <div className="gradient-fade-left absolute left-0 top-0 h-full w-1/6" />
      <div className="gradient-fade-right absolute right-0 top-0 h-full w-1/6" />
    </div>
  )
}
