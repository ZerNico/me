import { useInterval } from "ahooks";
import clsx from "clsx";
import { motion } from "motion/react";
import { useState } from "react";
import IconArrowDownFill from "~icons/mingcute/arrow-down-fill";
import IconCodeFill from "~icons/mingcute/code-fill";
import IconDownSmallFill from "~icons/mingcute/down-small-fill";
import IconSafeShield2Fill from "~icons/mingcute/safe-shield-2-fill";
import IconServerFill from "~icons/mingcute/server-fill";
import { Section } from "../section";
import Button from "../ui/button";
import { Card, CardTitle } from "../ui/card";
import { DropdownMenu, DropdownMenuItem } from "../ui/dropdown-menu";
import Input from "../ui/input";
import { Toggle } from "../ui/toggle";
import { Tooltip } from "../ui/tooltip";

export default function Building() {
	return (
		<Section title="I'm building">
			<div className="grid grid-cols-1 gap-8 md:grid-cols-2">
				<Grid />
				<Elements />
				<Backend />
			</div>
		</Section>
	);
}

function Grid() {
	const [expanded, setExpanded] = useState(false);

	const toggleExpanded = () => setExpanded(!expanded);

	useInterval(toggleExpanded, 3000, { immediate: true });

	const elements = [
		{
			class: clsx("bg-primary-background text-primary-foreground", {
				"col-span-3": expanded,
			}),
		},
		{ class: "bg-primary-background text-primary-foreground" },
		{
			class: clsx("bg-secondary-background text-secondary-foreground", {
				"col-span-2": expanded,
			}),
		},
		{ class: "bg-primary-background text-primary-foreground" },
	];

	return (
		<Card className="h-50">
			<CardTitle>Responsive UI</CardTitle>
			<div className="grid grid-cols-3 gap-2">
				{elements.map((element, index) => (
					<motion.div
						// biome-ignore lint/suspicious/noArrayIndexKey: Isn't typed properly
						key={index}
						layout
						className={clsx(
							element.class,
							"rounded-md px-4 py-2 transition-colors duration-300",
						)}
					>
						<motion.span layout style={{ display: "inline-block" }}>
							{index + 1}
						</motion.span>
					</motion.div>
				))}
			</div>
		</Card>
	);
}

function Elements() {
	return (
		<Card className="h-50">
			<CardTitle>Interactive Elements</CardTitle>
			<div className="flex flex-wrap items-center gap-2">
				<div className="flex-1">
					<DropdownMenu
						trigger={(props, state) => (
							// biome-ignore lint/suspicious/noExplicitAny: Isnt typed properly
							<Button {...(props as any)}>
								Click me{" "}
								<IconDownSmallFill
									className={clsx("h-6 w-6 transition-transform duration-300", {
										"rotate-180": state.open,
									})}
								/>
							</Button>
						)}
					>
						<DropdownMenuItem>Item 1</DropdownMenuItem>
						<DropdownMenuItem>Item 2</DropdownMenuItem>
						<DropdownMenuItem>Item 3</DropdownMenuItem>
						<DropdownMenuItem>Item 4</DropdownMenuItem>
						<DropdownMenuItem>Item 5</DropdownMenuItem>
					</DropdownMenu>
				</div>
				<div className="flex-1">
					<Toggle defaultPressed />
				</div>
				<Input placeholder="Input" />
				<div className="flex w-full justify-end">
					<Tooltip
						trigger={
							<Button variant="secondary" className="w-2/3!">
								Hover me <IconArrowDownFill className="h-4 w-4" />
							</Button>
						}
						side="bottom"
					>
						What's up?
					</Tooltip>
				</div>
			</div>
		</Card>
	);
}

function Backend() {
	const [activeRequest, setActiveRequest] = useState(0);

	const requests = [
		{
			method: "GET",
			endpoint: "/api/users",
			status: 200,
			color: "bg-green-500",
			icon: IconServerFill,
		},
		{
			method: "POST",
			endpoint: "/api/auth",
			status: 201,
			color: "bg-blue-500",
			icon: IconCodeFill,
		},
		{
			method: "PUT",
			endpoint: "/api/profile",
			status: 200,
			color: "bg-yellow-500",
			icon: IconSafeShield2Fill,
		},
		{
			method: "DELETE",
			endpoint: "/api/session",
			status: 204,
			color: "bg-red-500",
			icon: IconServerFill,
		},
	];

	useInterval(() => {
		setActiveRequest((prev) => (prev + 1) % requests.length);
	}, 2000);

	return (
		<Card className="md:col-span-2">
			<CardTitle>Backend APIs</CardTitle>
			<div className="grid gap-2 md:grid-cols-2">
				{requests.map((request, index) => {
					const Icon = request.icon;
					const isActive = index === activeRequest;

					return (
						<motion.div
							key={`${request.method}-${request.endpoint}`}
							className={clsx(
								"flex items-center justify-between rounded-lg border p-3 transition-[background-color_color_box-shadow] duration-300",
								isActive
									? "border-primary bg-primary-background text-primary-foreground shadow-lg"
									: "border-secondary bg-secondary-background text-secondary-foreground",
							)}
							animate={{
								opacity: isActive ? 1 : 0.7,
							}}
							transition={{ duration: 0.3 }}
						>
							<div className="flex items-center gap-2">
								<Icon className="h-4 w-4" />
								<span
									className={clsx(
										"rounded px-2 py-1 font-mono text-xs",
										request.color,
										"text-white",
									)}
								>
									{request.method}
								</span>
								<span className="font-mono text-sm">{request.endpoint}</span>
							</div>
							<motion.div
								className={clsx(
									"rounded px-2 py-1 text-xs",
									request.color,
									"text-white",
								)}
								animate={{
									opacity: isActive ? [0.5, 1, 0.5] : 1,
								}}
								transition={{
									duration: isActive ? 1.5 : 0,
									repeat: isActive ? Number.POSITIVE_INFINITY : 0,
								}}
							>
								{request.status}
							</motion.div>
						</motion.div>
					);
				})}
			</div>
		</Card>
	);
}
