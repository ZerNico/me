import { motion } from "motion/react";
import IconGithub from "~icons/mingcute/github-line";
import DarkModeToggle from "./dark-mode-toggle";
import { useTheme } from "./theme-provider";

export default function Header() {
	const { theme, setTheme } = useTheme();
	return (
		<header className="flex items-center">
			<motion.div
				whileHover={{
					scale: 1.2,
					transition: { duration: 0.5 },
				}}
			>
				<img
					src="/img/avatar.jpg"
					alt="A headshot of Nico Franke"
					width={112}
					height={112}
					className="h-14 w-14 rounded-full"
				/>
			</motion.div>
			<div className="flex-grow" />
			<div className="flex items-center gap-4">
				<a href="https://github.com/ZerNico" target="_blank" rel="noreferrer">
					<IconGithub className="text-xl" />
				</a>
				<DarkModeToggle
					theme={theme}
					onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
				/>
			</div>
		</header>
	);
}
