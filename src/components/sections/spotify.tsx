import {
	experimental_streamedQuery as streamedQuery,
	useQuery,
} from "@tanstack/react-query";
import { createServerFn } from "@tanstack/react-start";
import clsx from "clsx";
import { AnimatePresence, motion } from "motion/react";
import SpotifyService from "~/lib/services/spotify";
import IconPauseFill from "~icons/mingcute/pause-fill";
import IconPlayFill from "~icons/mingcute/play-fill";
import { Section } from "../section";
import Link from "../ui/link";

interface SpotifyData {
	isPlaying: boolean;
	track: {
		id: string;
		name: string;
		artists: { name: string }[];
		album: {
			images: { url: string }[];
		};
		externalURL: {
			spotify: string;
		};
	};
}

const getCurrentlyPlaying = createServerFn({
	method: "GET",
	response: "raw",
}).handler(async () => {
	const stream = new ReadableStream({
		start(controller) {
			const spotify = new SpotifyService();

			const sendCurrentlyPlaying = async () => {
				try {
					const currentlyPlaying = await spotify.getCurrentlyPlaying();

					if (
						currentlyPlaying &&
						currentlyPlaying.currently_playing_type === "track"
					) {
						const data = JSON.stringify({
							isPlaying: currentlyPlaying.is_playing,
							track: {
								id: currentlyPlaying.item.id,
								name: currentlyPlaying.item.name,
								artists: currentlyPlaying.item.artists,
								album: currentlyPlaying.item.album,
								externalURL: {
									spotify: currentlyPlaying.item.external_urls.spotify,
								},
							},
						} satisfies SpotifyData);
						controller.enqueue(`data: ${data}\n\n`);
					} else {
						const recentlyPlayed = await spotify.getRecentlyPlayed();
						const lastPlayed = recentlyPlayed.items[0];
						if (lastPlayed.track) {
							const data = JSON.stringify({
								isPlaying: false,
								track: {
									id: lastPlayed.track.id,
									name: lastPlayed.track.name,
									artists: lastPlayed.track.artists,
									album: lastPlayed.track.album,
									externalURL: {
										spotify: lastPlayed.track.external_urls.spotify,
									},
								},
							} satisfies SpotifyData);
							controller.enqueue(`data: ${data}\n\n`);
						}
					}
				} catch (error) {
					console.error("Error fetching currently playing:", error);
					controller.enqueue(
						`data: ${JSON.stringify({ error: "Failed to fetch currently playing" })}\n\n`,
					);
				}
			};

			sendCurrentlyPlaying();

			const interval = setInterval(sendCurrentlyPlaying, 5000);

			return () => {
				clearInterval(interval);
			};
		},
	});

	return new Response(stream, {
		headers: { "Content-Type": "text/event-stream" },
	});
});

export default function Spotify() {
	const currentlyPlayingQuery = useQuery({
		queryKey: ["spotify", "currently-playing"],
		queryFn: streamedQuery<SpotifyData>({
			queryFn: async function* ({ signal }) {
				const response = await getCurrentlyPlaying();
				const reader = response.body?.getReader();
				if (!reader) {
					throw new Error("Failed to get reader");
				}
				const decoder = new TextDecoder();
				while (!signal.aborted) {
					const { done, value } = await reader.read();
					if (done) {
						break;
					}
					try {
						const text = decoder.decode(value);
						const jsonText = text.replace(/^data: /, "").trim();
						const data = JSON.parse(jsonText);
						yield data;
					} catch (error) {
						console.error("Error parsing Spotify data:", error);
						yield null;
					}
				}
			},
			refetchMode: "reset",
			maxChunks: 1,
		}),
	});

	const data = currentlyPlayingQuery.data?.[0];

	return (
		<Section
			title="My Music"
			description="Check out what I am currently listening to on Spotify"
		>
			{data ? (
				<div className="flex flex-col items-center justify-center gap-4">
					<div className="relative aspect-square h-full w-full max-w-80">
						<AnimatePresence>
							<motion.div
								key={data.track.id}
								className="absolute aspect-square h-full w-full"
								initial={{ opacity: 0 }}
								animate={{ opacity: 1 }}
								exit={{ opacity: 0 }}
								transition={{ duration: 1 }}
							>
								<img
									src={data.track.album.images[0].url}
									alt={`${data.track.name} Album Cover`}
									className={clsx("h-full w-full rounded-full object-cover", {
										"animate-spin-1800": data.isPlaying,
									})}
								/>
								<div className="absolute inset-0 flex items-center justify-center">
									<div className="rounded-full bg-background p-3 text-2xl">
										{data.isPlaying ? (
											<IconPauseFill className="text-foreground" />
										) : (
											<IconPlayFill className="text-foreground" />
										)}
									</div>
								</div>
							</motion.div>
						</AnimatePresence>
					</div>
					<div className="flex flex-col gap-2">
						<AnimatePresence mode="wait">
							<motion.div
								key={data.track.id}
								className="text-center font-semibold text-xl"
								initial={{ opacity: 0, y: 10 }}
								animate={{ opacity: 1, y: 0 }}
								exit={{ opacity: 0, y: -10 }}
								transition={{ duration: 0.3, ease: "easeInOut" }}
							>
								{data.track.name} - {data.track.artists[0].name}
							</motion.div>
						</AnimatePresence>
					</div>
					<Link
						href={data.track.externalURL.spotify}
						target="_blank"
						rel="noreferrer"
					>
						Open in Spotify
					</Link>
				</div>
			) : (
				<div>No data</div>
			)}
		</Section>
	);
}
