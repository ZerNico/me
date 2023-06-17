import { env } from 'next-runtime-env'
import { Client } from 'spotify-api.js'

export const client = new Client({
  refreshToken: true,
  token: {
    clientID: env('NEXT_PUBLIC_SPOTIFY_CLIENT_ID'),
    clientSecret: env('SPOTIFY_CLIENT_SECRET'),
    refreshToken: env('SPOTIFY_REFRESH_TOKEN'),
    redirectURL: env('NEXT_PUBLIC_SPOTIFY_REDIRECT_URI'),
  },
})
