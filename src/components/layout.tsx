import Footer from './footer'
import Header from './header'

interface LayoutProps {
  children: React.ReactNode
}

export default function Layout({ children }: LayoutProps) {
  return (
    <div className="mx-auto max-w-210 min-h-screen px-8 py-20">
      <Header />
      <main>{children}</main>
      <Footer />
    </div>
  )
}
