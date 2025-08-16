import { Tooltip as BaseTooltip } from "@base-ui-components/react/tooltip";
import { AnimatePresence, motion, type Variants } from "motion/react";
import { useState } from "react";

interface TooltipProps {
	children: React.ReactNode;
	trigger: React.ComponentProps<typeof BaseTooltip.Trigger>["render"];
	side?: "top" | "bottom" | "left" | "right";
}

export function Tooltip({ trigger, side = "top", children }: TooltipProps) {
	const [open, setOpen] = useState(false);

	const variants: Variants = {
		closed: {
			opacity: 0,
			scale: 0.9,
			y: side === "top" ? 4 : side === "bottom" ? -4 : 0,
			x: side === "left" ? 4 : side === "right" ? -4 : 0,
			transition: {
				type: "spring",
				bounce: 0,
				duration: 0.2,
			},
		},
		open: {
			opacity: 1,
			scale: 1,
			y: 0,
			x: 0,
			transition: {
				type: "spring",
				bounce: 0,
				duration: 0.3,
			},
		},
	};

	return (
		<BaseTooltip.Root open={open} onOpenChange={setOpen} delay={300}>
			<BaseTooltip.Trigger render={trigger} />
			<AnimatePresence>
				{open && (
					<BaseTooltip.Portal key="tooltip-portal">
						<BaseTooltip.Positioner side={side} sideOffset={8}>
							<BaseTooltip.Popup
								render={
									<motion.div
										variants={variants}
										initial="closed"
										animate="open"
										exit="closed"
										className="rounded-lg bg-secondary-background px-3 py-1.5 text-secondary-foreground text-sm shadow-lg"
									/>
								}
							>
								{children}
							</BaseTooltip.Popup>
						</BaseTooltip.Positioner>
					</BaseTooltip.Portal>
				)}
			</AnimatePresence>
		</BaseTooltip.Root>
	);
}
