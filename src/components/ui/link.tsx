import { cva, type VariantProps } from "cva";
import type { HTMLMotionProps } from "motion/react";
import { motion } from "motion/react";

const linkVariants = cva({
	base: "inline-flex h-10 w-auto select-none items-center justify-center gap-2 rounded-lg px-4 py-2 font-medium transition-colors duration-300",
	variants: {
		variant: {
			primary:
				"bg-primary-background text-primary-foreground hover:bg-primary-active",
			secondary:
				"bg-secondary-background text-secondary-foreground hover:bg-secondary-active",
		},
	},
	defaultVariants: {
		variant: "primary",
	},
});

interface LinkProps
	extends HTMLMotionProps<"a">,
		VariantProps<typeof linkVariants> {
	ref?: React.RefObject<HTMLAnchorElement>;
}

export default function Link(props: LinkProps) {
	return (
		<motion.a
			whileTap={{ scale: 0.95 }}
			transition={{ type: "spring", stiffness: 700, damping: 30 }}
			ref={props.ref}
			{...props}
			className={linkVariants({
				variant: props.variant,
				className: props.className,
			})}
		/>
	);
}
