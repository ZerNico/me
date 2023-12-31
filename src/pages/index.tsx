import type { GetServerSideProps, InferGetServerSidePropsType } from 'next'
import Head from 'next/head'

import About from '@/components/sections/about'
import Elements from '@/components/sections/elements'
import Projects from '@/components/sections/projects'
import Spotify from '@/components/sections/spotify'
import Using from '@/components/sections/using'

export default function Home({ seed }: InferGetServerSidePropsType<typeof getServerSideProps>) {
  return (
    <div className="flex flex-col gap-40 py-20">
      <Head>
        <title>Nico Franke</title>
        <meta name="description" content="Fullstack Developer in Berlin Germany" />
      </Head>
      <About />
      <Elements />
      <Using seed={seed} />
      <Projects />
      <Spotify />
    </div>
  )
}

export const getServerSideProps: GetServerSideProps<{ seed: string }> = async () => ({
  props: {
    seed: Math.random().toString(36).slice(2, 15),
  },
})
