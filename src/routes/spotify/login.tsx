import { createFileRoute, redirect } from "@tanstack/react-router";
import { createServerFn } from "@tanstack/react-start";
import { getWebRequest } from "@tanstack/react-start/server";

const getCurrentOrigin = createServerFn({ method: "GET" }).handler(async () => {
	const request = getWebRequest();
	return new URL(request.url).origin;
});

export const Route = createFileRoute("/spotify/login")({
	component: RouteComponent,
	loader: async () => {
		const currentOrigin = await getCurrentOrigin();
		const callbackUrl = encodeURIComponent(`${currentOrigin}/spotify/callback`);
		const clientId = process.env.SPOTIFY_CLIENT_ID;
		const scopes = encodeURIComponent(
			"user-read-playback-state user-read-recently-played",
		);

		throw redirect({
			href: `https://accounts.spotify.com/authorize?client_id=${clientId}&response_type=code&redirect_uri=${callbackUrl}&scope=${scopes}`,
		});
	},
});

function RouteComponent() {
	return <div></div>;
}
