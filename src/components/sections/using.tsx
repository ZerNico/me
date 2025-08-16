import { useInterval } from "ahooks";
import { AnimatePresence, motion } from "motion/react";
import { useMemo, useState } from "react";
import { type Tool, tools } from "~/lib/tools";
import { shuffleArray } from "~/lib/utils/random";
import { Section } from "../section";

interface UsingProps {
	seed: string;
}

export default function Using({ seed }: UsingProps) {
	const [currentToolIndex, setCurrentToolIndex] = useState(0);

	const shuffledTools = useMemo(() => {
		const t = shuffleArray(tools, seed);
		return t;
	}, [seed]);

	const loop = () => {
		setCurrentToolIndex((tool) => (tool + 1) % tools.length);
	};

	useInterval(
		() => {
			loop();
		},
		1500,
		{ immediate: true },
	);

	return (
		<Section
			title={
				<div className="w-full">
					<span className="whitespace-pre">I love using </span>
					<AnimatePresence initial={false}>
						<motion.span
							className="absolute inline-block text-primary-foreground"
							initial={{ y: 50, opacity: 0 }}
							animate={{ y: 0, opacity: 1 }}
							exit={{ y: -50, opacity: 0 }}
							key={shuffledTools[currentToolIndex]?.name}
							layoutId={shuffledTools[currentToolIndex]?.name}
						>
							{shuffledTools[currentToolIndex]?.name}
						</motion.span>
					</AnimatePresence>
				</div>
			}
		>
			<LogoScroller tools={shuffledTools} />
		</Section>
	);
}

function LogoScroller({ tools }: { tools: Tool[] }) {
	return (
		<div className="mask-x-from-90% mask-x-to-100% w-full overflow-hidden">
			<div className="logo-slider flex min-w-fit max-w-10000 flex-shrink-0 gap-4 text-5xl">
				{tools.map((tool) => (
					<div key={tool.name} className={tool.class}>
						{tool.logo}
					</div>
				))}
				{tools.map((tool) => (
					<div key={tool.name} className={tool.class}>
						{tool.logo}
					</div>
				))}
			</div>
		</div>
	);
}
