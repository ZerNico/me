import { Slot } from '@radix-ui/react-slot'
import type { VariantProps } from 'class-variance-authority'
import { cva } from 'class-variance-authority'
import { clsx } from 'clsx'
import type { HTMLAttributes } from 'react'
import { forwardRef } from 'react'

const cardVariants = cva('rounded-xl  p-4 flex flex-col gap-2', {
  variants: {
    variant: {
      primary: 'bg-primary-background text-primary-foreground',
      secondary: 'bg-secondary-background text-secondary-foreground',
      muted: 'bg-muted-background text-muted-foreground',
    },
  },
  defaultVariants: {
    variant: 'muted',
  },
})

export interface CardProps extends HTMLAttributes<HTMLDivElement>, VariantProps<typeof cardVariants> {
  asChild?: boolean
}

const Card = forwardRef<HTMLDivElement, CardProps>(({ className, variant, asChild = false, ...props }, ref) => {
  const Comp = asChild ? Slot : 'div'
  return <Comp className={cardVariants({ variant, className })} ref={ref} {...props} />
})

Card.displayName = 'Card'

interface CardTitleProps extends HTMLAttributes<HTMLHeadingElement> {
  asChild?: boolean
}

const CardTitle = forwardRef<HTMLHeadingElement, CardTitleProps>(({ className, asChild = false, ...props }, ref) => {
  const Comp = asChild ? Slot : 'h1'
  return <Comp className={clsx('font-semibold text-foreground', className)} ref={ref} {...props} />
})

CardTitle.displayName = 'CardTitle'

interface CardDescriptionProps extends HTMLAttributes<HTMLParagraphElement> {
  asChild?: boolean
}

const CardDescription = forwardRef<HTMLParagraphElement, CardDescriptionProps>(
  ({ className, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : 'p'
    return <Comp className={clsx(className)} ref={ref} {...props} />
  }
)

CardDescription.displayName = 'CardDescription'

export { Card, CardDescription, CardTitle }
