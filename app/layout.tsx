import type { Metadata, Viewport } from 'next'
import { Noto_Sans_JP, Noto_Serif_JP } from 'next/font/google'
import './globals.css'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'

const notoSans = Noto_Sans_JP({
  subsets: ['latin'],
  weight: ['300', '400', '500'],
  variable: '--font-noto-sans',
  display: 'swap',
})

const notoSerif = Noto_Serif_JP({
  subsets: ['latin'],
  weight: ['300', '400'],
  variable: '--font-noto-serif',
  display: 'swap',
})


export const metadata: Metadata = {
  title: {
    default: 'GARBERY | 高感度アパレルブランド',
    template: '%s | GARBERY',
  },
  description:
    'GARBERYは、上質な素材と洗練されたデザインで日常を彩るアパレルブランドです。',
  keywords: ['アパレル', 'ファッション', 'ミニマル', 'レディース', 'GARBERY'],
  authors: [{ name: 'GARBERY' }],
  openGraph: {
    type: 'website',
    locale: 'ja_JP',
    siteName: 'GARBERY',
    title: 'GARBERY | 高感度アパレルブランド',
    description: 'GARBERYは、上質な素材と洗練されたデザインで日常を彩るアパレルブランドです。',
    images: [{ url: '/images/ogp.png', width: 1200, height: 630, alt: 'GARBERY' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'GARBERY | 高感度アパレルブランド',
    description: 'GARBERYは、上質な素材と洗練されたデザインで日常を彩るアパレルブランドです。',
    images: ['/images/ogp.png'],
  },
  robots: {
    index: true,
    follow: true,
  },
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#ffffff',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ja" className={`${notoSans.variable} ${notoSerif.variable}`}>
      <body>
          <Header />
          <div className="pt-12 lg:pt-0 lg:ml-[200px]">
            <main>{children}</main>
            <Footer />
          </div>
      </body>
    </html>
  )
}
