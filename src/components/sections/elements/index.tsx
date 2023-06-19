import { motion } from 'framer-motion'
import { useState } from 'react'

import { Section } from '@/components/section'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContentAnimated,
  DropdownMenuItemAnimated,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Input } from '@/components/ui/input'
import { Toggle } from '@/components/ui/toggle'
import { Tooltip, TooltipContentAnimated, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'

import { Card, CardTitle } from '../../ui/card'
import Grid from './grid'

export default function Elements() {
  const [toggleOn, setToggleOn] = useState(true)

  return (
    <Section title="I build">
      <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
        <Card className="flex flex-col gap-2">
          <CardTitle>Interactive UI</CardTitle>
          <div className="flex flex-wrap gap-4">
            <div className="flex-1">
              <DropdownMenu>
                {({ open }) => (
                  <>
                    <DropdownMenuTrigger asChild>
                      <Button>
                        Dropdown
                        <motion.div
                          animate={open ? 'open' : 'closed'}
                          variants={{
                            open: { rotate: 180 },
                            closed: { rotate: 0 },
                          }}
                          transition={{ duration: 0.2 }}
                          style={{ originY: 0.55 }}
                        >
                          <div className="i-mingcute-down-small-fill text-3xl -m-2" />
                        </motion.div>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContentAnimated open={open} variant="secondary">
                      {Array.from({ length: 5 }).map((_, index) => (
                        <DropdownMenuItemAnimated variant="secondary" key={index}>
                          Item {index + 1}
                        </DropdownMenuItemAnimated>
                      ))}
                    </DropdownMenuContentAnimated>
                  </>
                )}
              </DropdownMenu>
            </div>
            <div className="flex-1">
              <Toggle
                aria-label="Preview Toggle"
                pressed={toggleOn}
                onPressedChange={(pressed) => setToggleOn(pressed)}
              />
            </div>
          </div>
          <div>
            <Input placeholder="Input" className="w-full" />
          </div>
          <div className="text-right">
            <TooltipProvider>
              <Tooltip delayDuration={300}>
                {({ open }) => (
                  <>
                    <TooltipTrigger asChild>
                      <Button variant="secondary" className="min-w-2/3">
                        Tooltip
                        <div className="i-mingcute-arrow-down-fill" />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContentAnimated open={open} side="bottom" variant="secondary">
                      What&apos;s up?
                    </TooltipContentAnimated>
                  </>
                )}
              </Tooltip>
            </TooltipProvider>
          </div>
        </Card>
        <Card className="flex flex-col gap-2">
          <CardTitle>Responsive UI</CardTitle>
          <Grid />
        </Card>
      </div>
    </Section>
  )
}
