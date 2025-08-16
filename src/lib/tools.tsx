import IconBun from "~icons/logos/bun";
import IconDocker from "~icons/logos/docker-icon";
import IconGit from "~icons/logos/git-icon";
import IconJavaScript from "~icons/logos/javascript";
import IconKubernetes from "~icons/logos/kubernetes";
import IconLinux from "~icons/logos/linux-tux";
import IconNext from "~icons/logos/nextjs-icon";
import IconNode from "~icons/logos/nodejs-icon";
import IconNuxt from "~icons/logos/nuxt-icon";
import IconPlaywright from "~icons/logos/playwright";
import IconPython from "~icons/logos/python";
import IconReact from "~icons/logos/react";
import IconReactQuery from "~icons/logos/react-query-icon";
import IconRust from "~icons/logos/rust";
import IconStorybook from "~icons/logos/storybook-icon";
import IconTailwindCSS from "~icons/logos/tailwindcss-icon";
import IconTauri from "~icons/logos/tauri";
import IconTRPC from "~icons/logos/trpc";
import IconTurborepo from "~icons/logos/turborepo-icon";
import IconTypeScript from "~icons/logos/typescript-icon";
import IconVite from "~icons/logos/vitejs";
import IconVitest from "~icons/logos/vitest";
import IconVue from "~icons/logos/vue";

export interface Tool {
	name: string;
	logo: React.ReactNode;
	class?: string;
}

export const tools: Tool[] = [
	{
		name: "Vue",
		logo: <IconVue />,
	},
	{
		name: "Nuxt",
		logo: <IconNuxt />,
	},
	{
		name: "React",
		logo: <IconReact />,
	},
	{
		name: "Next",
		logo: <IconNext />,
		class: "dark:invert",
	},
	{
		name: "JavaScript",
		logo: <IconJavaScript />,
	},
	{
		name: "TypeScript",
		logo: <IconTypeScript />,
	},
	{
		name: "Docker",
		logo: <IconDocker />,
	},
	{
		name: "Kubernetes",
		logo: <IconKubernetes />,
	},
	{
		name: "Tailwind CSS",
		logo: <IconTailwindCSS />,
	},
	{
		name: "Vite",
		logo: <IconVite />,
	},
	{
		name: "Tauri",
		logo: <IconTauri />,
	},
	{
		name: "Node.js",
		logo: <IconNode />,
	},
	{
		name: "Bun",
		logo: <IconBun />,
	},
	{
		name: "Git",
		logo: <IconGit />,
	},
	{
		name: "Linux",
		logo: <IconLinux />,
	},
	{
		name: "tRPC",
		logo: <IconTRPC />,
	},
	{
		name: "Turborepo",
		logo: <IconTurborepo />,
		class: "dark:invert",
	},
	{
		name: "React Query",
		logo: <IconReactQuery />,
	},
	{
		name: "Storybook",
		logo: <IconStorybook />,
	},
	{
		name: "Vitest",
		logo: <IconVitest />,
	},
	{
		name: "Rust",
		logo: <IconRust />,
		class: "dark:invert",
	},
	{
		name: "Python",
		logo: <IconPython />,
	},
	{
		name: "Playwright",
		logo: <IconPlaywright />,
	},
];
