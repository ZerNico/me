import { Button } from '@/components/ui/button'
import { env } from '@/env'

const login = () => {
  const clientId = encodeURIComponent(env.NEXT_PUBLIC_SPOTIFY_CLIENT_ID)
  const redirectUri = encodeURIComponent(env.NEXT_PUBLIC_SPOTIFY_REDIRECT_URI)
  const scopes = encodeURIComponent('user-read-playback-state user-read-recently-played')

  window.location.href = `https://accounts.spotify.com/authorize?client_id=${clientId}&response_type=code&redirect_uri=${redirectUri}&scope=${scopes}`
}

export default function Login() {
  return (
    <div className="w-full flex justify-center py-10">
      <Button onClick={login}>Login</Button>
    </div>
  )
}
