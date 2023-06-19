import { Head, Html, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        {/* eslint-disable-next-line @next/next/no-sync-scripts */}
        <script src="/__ENV.js" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Nico Franke" />
        <meta property="og:description" content="Fullstack Developer" />
        <meta property="og:image" content="/img/og-image.svg" />
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:title" content="Nico Franke" />
        <meta property="twitter:description" content="Fullstack Developer" />
        <meta property="twitter:image" content="/img/og-image.svg" />
      </Head>
      <body className="bg-background font-sans text-foreground transition-colors duration-300">
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
