import { Head, Html, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html lang="en">
      <Head />
      <body className="bg-background font-sans text-foreground transition-colors duration-300">
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
