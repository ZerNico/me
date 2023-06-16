import * as TooltipPrimitive from '@radix-ui/react-tooltip'
import type { VariantProps } from 'class-variance-authority';
import { cva } from 'class-variance-authority'
import { AnimatePresence, motion } from 'framer-motion'
import type { ComponentProps, ComponentPropsWithoutRef, ElementRef} from 'react';
import { forwardRef, useEffect, useState } from 'react'

const TooltipProvider = TooltipPrimitive.TooltipProvider
const TooltipTrigger = TooltipPrimitive.Trigger
const TooltipContent = TooltipPrimitive.Content
const TooltipPortal = TooltipPrimitive.Portal

interface TooltipProps extends Omit<ComponentProps<typeof TooltipPrimitive.Root>, 'children'> {
  children: ((props: { open: boolean }) => React.ReactNode) | React.ReactNode
}

const Tooltip = ({ children, open, onOpenChange, defaultOpen, ...props }: TooltipProps) => {
  const [openState, setOpenState] = useState(defaultOpen ?? false)

  const handleOpenChange = (open: boolean) => {
    setOpenState(open)
    onOpenChange?.(open)
  }

  useEffect(() => {
    if (open !== undefined) {
      setOpenState(open)
    }
  }, [open])

  return (
    <TooltipPrimitive.Root onOpenChange={handleOpenChange} open={openState} {...props}>
      {typeof children === 'function' ? children({ open: openState }) : children}
    </TooltipPrimitive.Root>
  )
}

Tooltip.displayName = TooltipPrimitive.Root.displayName

const tooltipContentAnimatedVariants = cva('rounded-lg px-2 py-1', {
  variants: {
    variant: {
      primary: 'bg-primary-background text-primary-foreground',
      secondary: 'bg-secondary-background text-secondary-foreground',
    },
  },
  defaultVariants: {
    variant: 'primary',
  },
})

const TooltipContentAnimated = forwardRef<
  ElementRef<typeof TooltipPrimitive.Content>,
  ComponentPropsWithoutRef<typeof TooltipPrimitive.Content> & { open?: boolean } & VariantProps<
      typeof tooltipContentAnimatedVariants
    >
>(({ className, sideOffset = 6, open, children, variant, ...props }, ref) => {
  const INITIAL_ANIMATION_OFFSET = 10
  const EXIT_ANIMATION_OFFSET = 10
  const initial = {
    opacity: 0,
    y: props.side === 'top' ? INITIAL_ANIMATION_OFFSET : props.side === 'bottom' ? -INITIAL_ANIMATION_OFFSET : 0,
    x: props.side === 'left' ? INITIAL_ANIMATION_OFFSET : props.side === 'right' ? -INITIAL_ANIMATION_OFFSET : 0,
  }

  const exit = {
    opacity: 0,
    y: props.side === 'top' ? EXIT_ANIMATION_OFFSET : props.side === 'bottom' ? -EXIT_ANIMATION_OFFSET : 0,
    x: props.side === 'left' ? EXIT_ANIMATION_OFFSET : props.side === 'right' ? -EXIT_ANIMATION_OFFSET : 0,
  }

  return (
    <AnimatePresence>
      {open && (
        <TooltipPortal forceMount>
          <TooltipContent
            ref={ref}
            sideOffset={sideOffset}
            className={tooltipContentAnimatedVariants({ variant, className })}
            asChild
            {...props}
          >
            <motion.div initial={initial} animate={{ opacity: 1, y: 0 }} exit={exit}>
              {children}
            </motion.div>
          </TooltipContent>
        </TooltipPortal>
      )}
    </AnimatePresence>
  )
})
TooltipContentAnimated.displayName = 'TooltipContentAnimated'

export { Tooltip, TooltipContent, TooltipContentAnimated, TooltipPortal, TooltipProvider, TooltipTrigger }
