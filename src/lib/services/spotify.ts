import { ofetch } from "ofetch";

export default class SpotifyService {
	private clientId = process.env.SPOTIFY_CLIENT_ID;
	private clientSecret = process.env.SPOTIFY_CLIENT_SECRET;
	private refreshToken = process.env.SPOTIFY_REFRESH_TOKEN;
	private accessToken: { token: string; expires: Date } | null = null;

	async getTokensFromCode(code: string) {
		const credentials = Buffer.from(
			`${this.clientId}:${this.clientSecret}`,
		).toString("base64");

		const formData = new URLSearchParams({
			grant_type: "authorization_code",
			code,
			redirect_uri: "http://localhost:3000/spotify/callback",
		});

		const response = await ofetch<{
			access_token: string;
			refresh_token: string;
		}>("https://accounts.spotify.com/api/token", {
			method: "POST",
			headers: {
				"Content-Type": "application/x-www-form-urlencoded",
				Authorization: `Basic ${credentials}`,
			},
			body: formData.toString(),
		});

		return response;
	}

	async getAccessTokenFromRefreshToken() {
		const credentials = Buffer.from(
			`${this.clientId}:${this.clientSecret}`,
		).toString("base64");

		const formData = new URLSearchParams({
			grant_type: "refresh_token",
			refresh_token: this.refreshToken || "",
		});

		const response = await ofetch<{ access_token: string; expires_in: number }>(
			"https://accounts.spotify.com/api/token",
			{
				method: "POST",
				headers: {
					"Content-Type": "application/x-www-form-urlencoded",
					Authorization: `Basic ${credentials}`,
				},
				body: formData.toString(),
			},
		);

		this.accessToken = {
			token: response.access_token,
			expires: new Date(Date.now() + response.expires_in * 1000),
		};
	}

	async refreshAccessToken() {
		if (!this.accessToken || this.accessToken.expires < new Date()) {
			await this.getAccessTokenFromRefreshToken();
		}
	}

	async getCurrentlyPlaying() {
		await this.refreshAccessToken();

		const response = await ofetch<{
			is_playing: boolean;
			currently_playing_type: "track" | "episode" | "ad" | "unknown";
			item: {
				id: string;
				name: string;
				artists: { name: string }[];
				album: {
					name: string;
					images: { url: string }[];
				};
				external_urls: {
					spotify: string;
				};
			};
		} | null>("https://api.spotify.com/v1/me/player/currently-playing", {
			headers: {
				Authorization: `Bearer ${this.accessToken?.token}`,
			},
		});

		return response;
	}

	async getRecentlyPlayed() {
		await this.refreshAccessToken();

		const response = await ofetch<{
			items: {
				track: {
					id: string;
					name: string;
					artists: { name: string }[];
					album: {
						name: string;
						images: { url: string }[];
					};
					external_urls: {
						spotify: string;
					};
				};
			}[];
		}>("https://api.spotify.com/v1/me/player/recently-played", {
			headers: {
				Authorization: `Bearer ${this.accessToken?.token}`,
			},
		});

		return response;
	}
}
