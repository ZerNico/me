import { motion } from "motion/react";
import type { ComponentProps } from "react";
import type { Theme } from "~/lib/theme";
import IconMoonFill from "~icons/mingcute/moon-fill";
import IconSunFill from "~icons/mingcute/sun-fill";

export default function DarkModeToggle({
	theme,
	...props
}: ComponentProps<"button"> & { theme: Theme }) {
	const darkVariants = {
		visible: { x: 0 },
		hidden: { x: 40 },
	};
	const lightVariants = {
		visible: { x: 0 },
		hidden: { x: -40 },
	};

	const transition = {
		type: "spring",
		stiffness: 300,
		damping: 16,
	} as const;

	const t = theme;

	return (
		<button
			aria-label="Toggle for Dark/Light Mode"
			className="h-12 w-12 cursor-pointer overflow-hidden rounded-full bg-muted"
			id="toggle"
			{...props}
		>
			<motion.div className="relative flex h-full w-full items-center justify-center">
				<motion.div
					suppressHydrationWarning
					variants={lightVariants}
					initial={false}
					animate={t === "light" ? "visible" : "hidden"}
					transition={transition}
					className="absolute"
				>
					<IconSunFill className="h-8 w-8" />
				</motion.div>
				<motion.div
					suppressHydrationWarning
					variants={darkVariants}
					initial={false}
					animate={t === "dark" ? "visible" : "hidden"}
					transition={transition}
					className="absolute"
				>
					<IconMoonFill className="h-8 w-8 text-foreground" />
				</motion.div>
			</motion.div>
		</button>
	);
}
