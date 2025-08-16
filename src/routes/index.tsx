import { createFileRoute } from "@tanstack/react-router";
import About from "~/components/sections/about";
import Building from "~/components/sections/building";
import CV from "~/components/sections/cv";
import Projects from "~/components/sections/projects";
import Spotify from "~/components/sections/spotify";
import Using from "~/components/sections/using";

export const Route = createFileRoute("/")({
	component: RouteComponent,
	loader: async () => {
		return {
			seed: Math.random().toString(36).slice(2, 15),
		};
	},
});

function RouteComponent() {
	const { seed } = Route.useLoaderData();

	return (
		<div className="flex flex-col gap-40 py-20">
			<section>
				<About />
			</section>
			<Building />
			<Using seed={seed} />
			<CV />
			<Projects />
			<Spotify />
		</div>
	);
}
