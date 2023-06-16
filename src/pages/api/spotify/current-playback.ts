import type { NextApiRequest, NextApiResponse } from 'next'
import type { Track } from 'spotify-api.js'
import { Player } from 'spotify-api.js'

import { client } from '@/lib/spotify/client'

export interface CurrentPlayBackResponse {
  track: Track
  progress: number
  isPlaying: boolean
}

let lastResponse: { response: CurrentPlayBackResponse; date: Date } | undefined

export default async function handler(_req: NextApiRequest, res: NextApiResponse) {
  // If the last response was less than 10 seconds ago, return it
  if (lastResponse && lastResponse.date.getTime() + 5000 > Date.now()) {
    return res.status(200).json(lastResponse.response)
  }

  const player = new Player(client)
  const playback = await player.getCurrentPlayback()

  if (!playback || playback.currentPlayingType !== 'track') {
    // fallback to last response
    if (lastResponse) {
      return res.status(200).json({ ...lastResponse.response, isPlaying: false })
    }

    // fallback to recently played
    const recentlyPlayed = await player.getRecentlyPlayed()
    const track = recentlyPlayed.items.at(0)?.track

    if (track) {
      const response: CurrentPlayBackResponse = {
        track,
        progress: 0,
        isPlaying: false,
      }
      lastResponse = { response, date: new Date() }

      return res.status(200).json(response)
    }

    return res.status(404).json({ error: 'No playback' })
  }

  const response: CurrentPlayBackResponse = {
    track: playback.item as Track,
    progress: playback.progress,
    isPlaying: playback.isPlaying,
  }

  lastResponse = { response, date: new Date() }

  return res.status(200).json(response)
}
