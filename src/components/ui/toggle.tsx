import { Toggle as BaseToggle } from "@base-ui-components/react/toggle";
import clsx from "clsx";
import { motion } from "motion/react";

interface ToggleProps {
	ref?: React.RefObject<HTMLButtonElement>;
	defaultPressed?: boolean;
	className?: string;
}

export function Toggle(props: ToggleProps) {
	return (
		<BaseToggle
			defaultPressed={props.defaultPressed}
			ref={props.ref}
			render={(props, state) => (
				<motion.button
					// biome-ignore lint/suspicious/noExplicitAny: Doesnt properly type with motion
					{...(props as any)}
					className={clsx(
						"flex h-10 w-20 cursor-pointer items-center rounded-full bg-gray-background px-2 transition-colors duration-300 data-pressed:justify-end data-pressed:bg-secondary-background",
						props.className,
					)}
				>
					<motion.div
						layout
						className={clsx(
							"h-6 w-6 rounded-full transition-[background-color]",
							{
								"bg-secondary-foreground": state.pressed,
								"bg-gray-foreground": !state.pressed,
							},
						)}
						transition={{ type: "spring", stiffness: 700, damping: 30 }}
					></motion.div>
				</motion.button>
			)}
		/>
	);
}
