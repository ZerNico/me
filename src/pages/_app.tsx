import '@unocss/reset/tailwind.css'
import '@fontsource-variable/space-grotesk'
import '@/styles/globals.scss'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { MotionConfig } from 'framer-motion'
import type { AppProps } from 'next/app'
import PlausibleProvider from 'next-plausible'
import { env } from 'next-runtime-env'
import { ThemeProvider } from 'next-themes'

import Layout from '@/components/layout'

const queryClient = new QueryClient()

export default function App({ Component, pageProps }: AppProps) {
  return (
    <PlausibleProvider
      domain={env('NEXT_PUBLIC_PLAUSIBLE_DOMAIN')}
      customDomain={env('NEXT_PUBLIC_PLAUSIBLE_CUSTOM_DOMAIN')}
      selfHosted
      enabled
      trackOutboundLinks
      taggedEvents
    >
      <ThemeProvider>
        <QueryClientProvider client={queryClient}>
          <MotionConfig reducedMotion="user">
            <Layout>
              <Component {...pageProps} />
            </Layout>
          </MotionConfig>
        </QueryClientProvider>
      </ThemeProvider>
    </PlausibleProvider>
  )
}
