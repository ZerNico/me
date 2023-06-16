import { cva, type VariantProps } from 'class-variance-authority'
import type { HTMLMotionProps} from 'framer-motion';
import { motion } from 'framer-motion'
import { forwardRef } from 'react'

const inputVariants = cva('px-4 py-2 min-w-auto rounded-lg', {
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

const Input = forwardRef<HTMLInputElement, HTMLMotionProps<'input'> & VariantProps<typeof inputVariants>>(
  ({ className, variant, ...props }, ref) => (
      <motion.input
        whileFocus={{ scale: 1.05 }}
        transition={{ type: 'spring', stiffness: 700, damping: 30 }}
        className={inputVariants({ variant, className })}
        ref={ref}
        {...props}
       />
    )
)

Input.displayName = 'Input'

export { Input }
