import { cva, type VariantProps } from 'class-variance-authority'
import type { HTMLMotionProps} from 'framer-motion';
import { motion } from 'framer-motion'
import { forwardRef } from 'react'

const buttonVariants = cva(
  'select-none px-4 py-2 rounded-lg inline-flex justify-center font-medium items-center gap-2 w-auto',
  {
    variants: {
      variant: {
        primary: 'bg-primary-background text-primary-foreground',
        secondary: 'bg-secondary-background text-secondary-foreground',
      },
    },
    defaultVariants: {
      variant: 'primary',
    },
  }
)

const Button = forwardRef<HTMLButtonElement, HTMLMotionProps<'button'> & VariantProps<typeof buttonVariants>>(
  ({ className, variant, ...props }, ref) => (
      <motion.button
        whileTap={{ scale: 0.95 }}
        transition={{ type: 'spring', stiffness: 700, damping: 30 }}
        className={buttonVariants({ variant, className })}
        ref={ref}
        {...props}
       />
    )
)

Button.displayName = 'Button'

export { Button }
