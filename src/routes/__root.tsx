/// <reference types="vite/client" />
/** biome-ignore-all lint/style/noHeadElement: required by tanstack router */

import spaceGrotesk from "@fontsource-variable/space-grotesk?url";
import {
	createRootRoute,
	HeadContent,
	Outlet,
	Scripts,
} from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";
import Footer from "~/components/footer";
import Header from "~/components/header";
import { ThemeProvider, useTheme } from "~/components/theme-provider";
import { getThemeServerFn } from "~/lib/theme";
import appCss from "~/styles/app.css?url";
import { seo } from "~/utils/seo";

export const Route = createRootRoute({
	component: RootComponent,
	loader: () => getThemeServerFn(),
	head: () => ({
		meta: [
			{
				charSet: "utf-8",
			},
			{
				name: "viewport",
				content: "width=device-width, initial-scale=1",
			},
			...seo({
				title: "Nico Franke",
				description: `About me`,
				image: "/img/og-image.svg",
			}),
		],
		links: [
			{ rel: "stylesheet", href: appCss },
			{ rel: "stylesheet", href: spaceGrotesk },
			{
				rel: "apple-touch-icon",
				sizes: "180x180",
				href: "/apple-touch-icon.png",
			},
			{ rel: "manifest", href: "/site.webmanifest", color: "#fffff" },
			{ rel: "icon", href: "/favicon.ico" },
		],
	}),
});

function RootComponent() {
	const data = Route.useLoaderData();
	return (
		<ThemeProvider theme={data}>
			<RootDocument>
				<Outlet />
			</RootDocument>
		</ThemeProvider>
	);
}

function RootDocument({ children }: { children: React.ReactNode }) {
	const { theme } = useTheme();
	return (
		<html
			lang="en"
			suppressHydrationWarning
			style={{ colorScheme: theme }}
			data-theme={theme}
			className="bg-background text-foreground transition-colors duration-300"
		>
			<head>
				<HeadContent />
			</head>
			<body className="mx-auto min-h-screen max-w-210 px-8 py-20">
				<Header />
				{children}
				<Footer />
				<TanStackRouterDevtools position="bottom-right" />
				<Scripts />
			</body>
		</html>
	);
}
