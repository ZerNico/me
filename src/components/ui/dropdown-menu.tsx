import { Menu } from "@base-ui-components/react/menu";
import clsx from "clsx";
import { AnimatePresence, motion, type Variants } from "motion/react";
import { useState } from "react";

interface DropdownMenuProps {
	children: React.ReactNode;
	trigger: React.ComponentProps<typeof Menu.Trigger>["render"];
	className?: string;
}

export function DropdownMenu(props: DropdownMenuProps) {
	const [open, setOpen] = useState(false);

	const variants: Variants = {
		closed: {
			clipPath: "inset(10% 50% 90% 50% round 0.5rem)",
			transition: {
				type: "spring",
				bounce: 0,
				duration: 0.3,
			},
		},
		open: {
			clipPath: "inset(0% 0% 0% 0% round 0.5rem)",
			transition: {
				type: "spring",
				bounce: 0,
				duration: 0.7,
				delayChildren: 0.3,
				staggerChildren: 0.05,
			},
		},
	};

	return (
		<Menu.Root modal={false} open={open} onOpenChange={setOpen}>
			<Menu.Trigger render={props.trigger} />
			<AnimatePresence>
				{open && (
					<Menu.Portal key="dropdown-portal">
						<Menu.Positioner sideOffset={8}>
							<Menu.Popup
								render={
									<motion.ul
										variants={variants}
										initial="closed"
										animate="open"
										exit="closed"
										className={clsx(
											"bg-secondary-background text-secondary-foreground focus:outline-none",
											props.className,
										)}
									></motion.ul>
								}
							>
								{props.children}
							</Menu.Popup>
						</Menu.Positioner>
					</Menu.Portal>
				)}
			</AnimatePresence>
		</Menu.Root>
	);
}

interface DropdownMenuItemProps {
	children: React.ReactNode;
	onClick?: () => void;
	class?: string;
}

export function DropdownMenuItem(props: DropdownMenuItemProps) {
	const variants: Variants = {
		open: {
			opacity: 1,
			y: 0,
			transition: { type: "spring", stiffness: 300, damping: 24 },
		},
		closed: { opacity: 0, y: 20, transition: { duration: 0.2 } },
	};

	return (
		<Menu.Item
			render={<motion.li variants={variants}></motion.li>}
			className="flex w-full cursor-pointer items-center gap-2 rounded-lg px-4 py-2 text-sm transition-colors hover:bg-secondary-active focus:outline-none"
			onClick={props.onClick}
		>
			{props.children}
		</Menu.Item>
	);
}
