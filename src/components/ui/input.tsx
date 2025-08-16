import { cva, type VariantProps } from "cva";
import type { HTMLMotionProps } from "motion/react";
import { motion } from "motion/react";
import { forwardRef } from "react";

const inputVariants = cva({
	base: "w-full rounded-lg border-0 px-4 py-2 font-medium outline-0 transition-colors duration-300 placeholder:text-gray-foreground focus:ring-2 focus:ring-offset-0",
	variants: {
		variant: {
			primary:
				"bg-primary-background text-primary-foreground focus:ring-primary-active",
			secondary:
				"bg-secondary-background text-secondary-foreground focus:ring-secondary-active",
		},
	},
	defaultVariants: {
		variant: "primary",
	},
});

interface InputProps
	extends Omit<HTMLMotionProps<"input">, "ref">,
		VariantProps<typeof inputVariants> {
	placeholder?: string;
}

const Input = forwardRef<HTMLInputElement, InputProps>((props, ref) => {
	const { variant, className, ...rest } = props;

	return (
		<motion.input
			whileFocus={{ scale: rest.readOnly ? 1 : 1.05 }}
			transition={{ type: "spring", stiffness: 400, damping: 20 }}
			className={inputVariants({ variant, className })}
			ref={ref}
			{...rest}
		/>
	);
});

Input.displayName = "Input";

export default Input;
