import * as TogglePrimitive from '@radix-ui/react-toggle'
import type { VariantProps } from 'class-variance-authority';
import { cva } from 'class-variance-authority'
import { clsx } from 'clsx'
import { motion } from 'framer-motion'
import type { ComponentPropsWithoutRef, ElementRef} from 'react';
import { forwardRef } from 'react'

const toggleVariants = cva(
  'h-10 w-20 flex items-center rounded-full px-2 data-[state=off]:bg-gray-background data-[state=on]:justify-end children:data-[state=off]:bg-gray-foreground',
  {
    variants: {
      variant: {
        primary: 'data-[state=on]:bg-primary-background children:data-[state=on]:bg-primary-foreground',
        secondary: 'data-[state=on]:bg-secondary-background children:data-[state=on]:bg-secondary-foreground',
      },
    },
    defaultVariants: {
      variant: 'primary',
    },
  }
)

const Toggle = forwardRef<
  ElementRef<typeof TogglePrimitive.Root>,
  ComponentPropsWithoutRef<typeof TogglePrimitive.Root> & VariantProps<typeof toggleVariants>
>(({ className, variant, ...props }, ref) => (
  <TogglePrimitive.Root ref={ref} className={toggleVariants({ variant, className })} {...props}>
    <motion.div
      className={clsx('h-6 w-6 rounded-full transition-colors duration-300')}
      layout
      transition={{ type: 'spring', stiffness: 700, damping: 30 }}
    />
  </TogglePrimitive.Root>
))

Toggle.displayName = TogglePrimitive.Root.displayName

export { Toggle }
