import '@unocss/reset/tailwind.css'
import '@fontsource-variable/space-grotesk'
import '@/styles/globals.scss'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { MotionConfig } from 'framer-motion'
import type { AppProps } from 'next/app'
import { ThemeProvider } from 'next-themes'

import Layout from '@/components/layout'

const queryClient = new QueryClient()

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider>
      <QueryClientProvider client={queryClient}>
        <MotionConfig reducedMotion="user">
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </MotionConfig>
      </QueryClientProvider>
    </ThemeProvider>
  )
}
