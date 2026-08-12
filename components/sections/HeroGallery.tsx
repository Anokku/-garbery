'use client'

import Image from 'next/image'
import AnimatedSection from '@/components/ui/AnimatedSection'

export default function HeroGallery() {
  return (
    <section className="bg-white py-16 md:py-24">
      <div className="max-w-screen-xl mx-auto px-4">
        <div className="flex flex-col md:flex-row md:items-end gap-4 md:gap-6">
          <AnimatedSection className="w-full md:w-[62%]">
            <div className="relative aspect-[3/4] overflow-hidden bg-brand-border">
              <Image
                src="/images/top/feature-1.jpg"
                alt="GARBERY スタイリング 01"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 62vw"
              />
            </div>
          </AnimatedSection>

          <AnimatedSection delay={0.15} className="w-3/5 self-end md:w-[32%]">
            <div className="relative aspect-[3/4] overflow-hidden bg-brand-border">
              <Image
                src="/images/top/feature-2.jpg"
                alt="GARBERY スタイリング 02"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 60vw, 32vw"
              />
            </div>
          </AnimatedSection>
        </div>
      </div>
    </section>
  )
}
