'use client'

import { usePathname } from 'next/navigation'
import Header from './Header'
import Footer from './Footer'

const STANDALONE_PATHS = ['/cheki']

export default function LayoutChrome({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const isStandalone = STANDALONE_PATHS.some((path) => pathname?.startsWith(path))

  if (isStandalone) {
    return <main>{children}</main>
  }

  return (
    <>
      <Header />
      <div className="pt-12 lg:pt-0 lg:ml-[200px]">
        <main>{children}</main>
        <Footer />
      </div>
    </>
  )
}
