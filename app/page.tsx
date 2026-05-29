import type { Metadata } from 'next'
import Hero from '@/components/sections/Hero'

export const metadata: Metadata = {
  title: 'garbery',
  description: 'GARBERYは上質な素材と洗練されたデザインで日常を彩るアパレルブランド。',
}

export default function HomePage() {
  return <Hero />
}
