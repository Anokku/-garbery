'use client'

import { useRef } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion, useScroll, useTransform } from 'framer-motion'
import AnimatedSection from '@/components/ui/AnimatedSection'

const lookbookItems = [
  { src: '/images/product-main.png', alt: 'Lookbook 01', position: 'object-center' },
  { src: '/images/product-main.png', alt: 'Lookbook 02', position: 'object-top' },
  { src: '/images/product-main.png', alt: 'Lookbook 03', position: 'object-bottom' },
]

export default function Lookbook() {
  const ref = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const y1 = useTransform(scrollYProgress, [0, 1], ['-5%', '5%'])
  const y2 = useTransform(scrollYProgress, [0, 1], ['5%', '-5%'])

  return (
    <section ref={ref} className="py-20 md:py-28 bg-brand-light overflow-hidden">
      <div className="px-4 max-w-screen-xl mx-auto">
        <AnimatedSection className="text-center mb-14">
          <p className="section-heading">STYLING</p>
          <h2 className="section-title">LOOKBOOK</h2>
          <p className="text-xs text-brand-gray tracking-wide">2026 Autumn / Winter Collection</p>
        </AnimatedSection>

        {/* グリッド */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4">
          <motion.div style={{ y: y1 }} className="col-span-1 space-y-3 md:space-y-4">
            <div className="relative aspect-[3/4] overflow-hidden bg-brand-border">
              <Image src={lookbookItems[0].src} alt={lookbookItems[0].alt} fill className={`object-cover ${lookbookItems[0].position}`} sizes="(max-width: 768px) 50vw, 33vw" />
            </div>
          </motion.div>

          <motion.div style={{ y: y2 }} className="col-span-1 space-y-3 md:space-y-4 mt-10">
            <div className="relative aspect-[3/4] overflow-hidden bg-brand-border">
              <Image src={lookbookItems[1].src} alt={lookbookItems[1].alt} fill className={`object-cover ${lookbookItems[1].position}`} sizes="(max-width: 768px) 50vw, 33vw" />
            </div>
          </motion.div>

          <motion.div style={{ y: y1 }} className="hidden md:block col-span-1 space-y-4 mt-5">
            <div className="relative aspect-[3/4] overflow-hidden bg-brand-border">
              <Image src={lookbookItems[2].src} alt={lookbookItems[2].alt} fill className={`object-cover ${lookbookItems[2].position}`} sizes="33vw" />
            </div>
          </motion.div>
        </div>

        <AnimatedSection className="text-center mt-14" delay={0.2}>
          <Link href="/products" className="btn-primary">
            SHOP THE LOOK
          </Link>
        </AnimatedSection>
      </div>
    </section>
  )
}
