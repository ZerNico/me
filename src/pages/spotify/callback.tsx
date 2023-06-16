import type { GetServerSideProps, InferGetServerSidePropsType } from 'next'
import { useRouter } from 'next/router'
import { useRef } from 'react'
import { Client } from 'spotify-api.js'

import { Button } from '@/components/ui/button'
import { env } from '@/env'

export default function Callback({ refreshToken }: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const router = useRouter()

  const refreshTokenRef = useRef<HTMLInputElement>(null)

  const copyToClipboard = () => {
    if (refreshTokenRef.current) {
      refreshTokenRef.current.select()
      refreshTokenRef.current.setSelectionRange(0, 99_999)

      navigator.clipboard.writeText(refreshTokenRef.current.value)
    }
  }

  return (
    <div className="flex flex-col items-center gap-4 py-20">
      {refreshToken ? (
        <div className="w-full">
          <h1 className="font-semibold">Refresh token</h1>
          <div className="flex gap-4">
            <input
              ref={refreshTokenRef}
              className="w-full rounded-lg bg-primary-background px-4 py-2"
              type="text"
              value={refreshToken}
              readOnly
            />
            <Button onClick={copyToClipboard}>Copy</Button>
          </div>
        </div>
      ) : (
        <>
          <h1 className="font-semibold">Could not get refresh token</h1>
          <Button onClick={() => router.push('/spotify/login')}>Try again</Button>
        </>
      )}
    </div>
  )
}

export const getServerSideProps: GetServerSideProps<{ refreshToken?: string }> = async ({ query }) => {
  try {
    const client = await Client.create({
      refreshToken: true,
      token: {
        clientID: env.NEXT_PUBLIC_SPOTIFY_CLIENT_ID,
        clientSecret: env.SPOTIFY_CLIENT_SECRET,
        code: query.code as string,
        redirectURL: env.NEXT_PUBLIC_SPOTIFY_REDIRECT_URI,
      },
    })
    return {
      props: {
        refreshToken: client.refreshMeta?.refreshToken,
      },
    }
  } catch {
    // Do nothing
  }

  return {
    props: {},
  }
}
