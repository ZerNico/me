import { useQuery } from '@tanstack/react-query'
import { clsx } from 'clsx'
import { AnimatePresence, motion } from 'framer-motion'
import { useEffect } from 'react'
import { useAudioPlayer } from 'react-use-audio-player'

import type { CurrentPlayBackResponse } from '@/pages/api/spotify/current-playback'

import { Section } from '../section'
import { Button } from '../ui/button'

export default function Spotify() {
  const getCurrentPlayback = async () => {
    const res = await fetch('/api/spotify/current-playback')
    if (!res.ok) throw new Error('Something went wrong')

    return (await res.json()) as CurrentPlayBackResponse
  }

  const { data } = useQuery({
    queryKey: ['spotfy', 'current-playback'],
    queryFn: getCurrentPlayback,
    refetchInterval: 10_000,
  })

  const coverUrl = data?.track.album?.images[0]?.url || '/img/cover-placeholder.svg'

  const { load, playing, togglePlayPause, setVolume } = useAudioPlayer()

  useEffect(() => {
    if (!data?.track.previewURL) return
    load(data.track.previewURL, {
      html5: true,
      format: 'mp3',
    })
    setVolume(0.1)
  }, [data?.track.previewURL, load, setVolume])

  return (
    <Section title="My Music" description="Check out what I am currently listening to on Spotify">
      {data ? (
        <div className="flex flex-col items-center justify-center gap-4">
          <div className="relative aspect-square max-w-70 w-full overflow-hidden">
            <AnimatePresence>
              <motion.div
                key={data.track.id}
                className="absolute"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <div className="relative">
                  <img
                    src={coverUrl}
                    alt={`${data.track.name} Album Cover`}
                    className={clsx('w-full h-full object-cover rounded-full', {
                      'animate-spin-1800 ': data.isPlaying,
                    })}
                   />
                  <div className="absolute inset-0 h-full w-full flex items-center justify-center">
                    <div className="rounded-full bg-background p-3">
                      <div
                        className={clsx('text-3xl', data.isPlaying ? 'i-mingcute-pause-fill' : 'i-mingcute-play-fill')}
                       />
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
          <p className="text-center text-xl font-semibold sm:text-lg">
            {data.track.name} - {data.track.artists.at(0)?.name}
          </p>
          <a href={data.track.externalURL.spotify} target="_blank" rel="noreferrer">
            <Button>Open in Spotify</Button>
          </a>
          <Button
            onClick={togglePlayPause}
            layout
            transition={{
              layout: { duration: 0.2 },
            }}
          >
            <div className="flex items-center gap-2">
              <div className={playing ? 'i-mingcute-pause-fill' : 'i-mingcute-play-fill'} />
              {playing ? 'Pause' : 'Play'} Preview
            </div>
          </Button>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center gap-4">
          <div className="i-mingcute-file-unknown-fill text-9xl" />
          <p>No data found</p>
        </div>
      )}
    </Section>
  )
}
