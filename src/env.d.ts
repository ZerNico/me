declare module 'next-runtime-env' {
  type Env =
    | 'NEXT_PUBLIC_SPOTIFY_CLIENT_ID'
    | 'SPOTIFY_CLIENT_SECRET'
    | 'SPOTIFY_REFRESH_TOKEN'
    | 'NEXT_PUBLIC_SPOTIFY_REDIRECT_URI'
  export function env(key: Env): string
}
