import { createFileRoute } from "@tanstack/react-router";
import { createServerFn } from "@tanstack/react-start";
import { useState } from "react";
import * as v from "valibot";
import { Section } from "~/components/section";
import Button from "~/components/ui/button";
import { Card, CardDescription, CardTitle } from "~/components/ui/card";
import Input from "~/components/ui/input";
import SpotifyService from "~/lib/services/spotify";
import IconCheckFill from "~icons/mingcute/check-fill";
import IconClipboardLine from "~icons/mingcute/clipboard-line";

const getTokens = createServerFn({ method: "GET" })
	.validator(
		v.object({
			code: v.string(),
		}),
	)
	.handler(async ({ data }) => {
		const spotify = new SpotifyService();
		const tokens = await spotify.getTokensFromCode(data.code);
		return tokens;
	});

export const Route = createFileRoute("/spotify/callback")({
	component: RouteComponent,
	validateSearch: v.object({
		code: v.string(),
	}),
	loaderDeps: ({ search: { code } }) => ({ code }),
	loader: async ({ deps: { code } }) => {
		const tokens = await getTokens({ data: { code } });
		return tokens;
	},
});

function RouteComponent() {
	const tokens = Route.useLoaderData();
	const [copied, setCopied] = useState(false);

	const copyToClipboard = async () => {
		try {
			await navigator.clipboard.writeText(tokens.refresh_token);
			setCopied(true);
			setTimeout(() => setCopied(false), 2000);
		} catch (err) {
			console.error("Failed to copy: ", err);
		}
	};

	return (
		<div className="flex flex-col gap-40 py-20">
			<Section title="Spotify Refresh Token">
				<Card className="w-full max-w-2xl">
					<CardTitle>Refresh Token</CardTitle>

					<div className="flex items-center gap-2">
						<Input value={tokens.refresh_token} readOnly className="flex-1" />
						<Button onClick={copyToClipboard}>
							{copied ? (
								<IconCheckFill className="h-4 w-4" />
							) : (
								<IconClipboardLine className="h-4 w-4" />
							)}
						</Button>
					</div>

					<CardDescription>
						Copy this token and add it to your environment variables as
						SPOTIFY_REFRESH_TOKEN
					</CardDescription>
				</Card>
			</Section>
		</div>
	);
}
