import * as DropdownMenuPrimitive from '@radix-ui/react-dropdown-menu'
import type {VariantProps } from 'class-variance-authority';
import { cva } from 'class-variance-authority'
import type {Variants } from 'framer-motion';
import { AnimatePresence, motion } from 'framer-motion'
import type { ComponentProps, ComponentPropsWithoutRef, ElementRef} from 'react';
import { forwardRef, useEffect, useState } from 'react'

const DropdownMenuTrigger = DropdownMenuPrimitive.Trigger
const DropdownMenuPortal = DropdownMenuPrimitive.Portal
const DropdownMenuItem = DropdownMenuPrimitive.Item
const DropdownMenuContent = DropdownMenuPrimitive.Content

interface DropdownMenuProps extends Omit<ComponentProps<typeof DropdownMenuPrimitive.Root>, 'children'> {
  children: ((props: { open: boolean }) => React.ReactNode) | React.ReactNode
}

const DropdownMenu = ({ children, open, onOpenChange, defaultOpen, ...props }: DropdownMenuProps) => {
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
    <DropdownMenuPrimitive.Root onOpenChange={handleOpenChange} open={openState} {...props}>
      {typeof children === 'function' ? children({ open: openState }) : children}
    </DropdownMenuPrimitive.Root>
  )
}

DropdownMenu.displayName = DropdownMenuPrimitive.Root.displayName

const dropdownMenuContentAnimatedVariants = cva('', {
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

const DropdownMenuContentAnimated = forwardRef<
  ElementRef<typeof DropdownMenuPrimitive.Content>,
  ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Content> & { open?: boolean } & VariantProps<
      typeof dropdownMenuContentAnimatedVariants
    >
>(({ className, sideOffset = 4, open, children, variant, ...props }, ref) => {
  const variants: Variants = {
    closed: {
      clipPath: 'inset(10% 50% 90% 50% round 0.5rem)',
      transition: {
        type: 'spring',
        bounce: 0,
        duration: 0.3,
      },
    },
    open: {
      clipPath: 'inset(0% 0% 0% 0% round 0.5rem)',
      transition: {
        type: 'spring',
        bounce: 0,
        duration: 0.7,
        delayChildren: 0.3,
        staggerChildren: 0.05,
      },
    },
  }

  return (
    <AnimatePresence>
      {open && (
        <DropdownMenuPortal forceMount>
          <DropdownMenuContent
            ref={ref}
            sideOffset={sideOffset}
            className={dropdownMenuContentAnimatedVariants({ variant, className })}
            asChild
            {...props}
          >
            <motion.ul key="dropdown" variants={variants} initial="closed" animate="open" exit="closed" className="">
              {children}
            </motion.ul>
          </DropdownMenuContent>
        </DropdownMenuPortal>
      )}
    </AnimatePresence>
  )
})
DropdownMenuContentAnimated.displayName = 'DropdownMenuContentAnimated'

const dropdownMenuItemAnimatedVariants = cva('px-4 py-2 rounded-lg select-none outline-none ', {
  variants: {
    variant: {
      primary: 'bg-primary-background text-primary-foreground focus:bg-primary-background-active',
      secondary: 'bg-secondary-background text-secondary-foreground focus:bg-secondary-background-active',
    },
  },
  defaultVariants: {
    variant: 'primary',
  },
})

const DropdownMenuItemAnimated = forwardRef<
  ElementRef<typeof DropdownMenuPrimitive.Item>,
  ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Item> & VariantProps<typeof dropdownMenuItemAnimatedVariants>
>(({ className, children, variant, ...props }, ref) => {
  const variants: Variants = {
    open: {
      opacity: 1,
      y: 0,
      transition: { type: 'spring', stiffness: 300, damping: 24 },
    },
    closed: { opacity: 0, y: 20, transition: { duration: 0.2 } },
  }
  return (
    <DropdownMenuItem asChild ref={ref} {...props}>
      <motion.li variants={variants} className={dropdownMenuItemAnimatedVariants({ variant, className })}>
        {children}
      </motion.li>
    </DropdownMenuItem>
  )
})

DropdownMenuItemAnimated.displayName = 'DropdownMenuItemAnimated'

export {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuContentAnimated,
  DropdownMenuItem,
  DropdownMenuItemAnimated,
  DropdownMenuPortal,
  DropdownMenuTrigger,
}
