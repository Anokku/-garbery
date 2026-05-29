'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'

export default function ConceptHero() {
  return (
    <div className="relative w-full aspect-[16/9] md:aspect-[21/9] overflow-hidden bg-brand-light">
      {/* 画像：フェードイン + ズームイン */}
      <motion.div
        className="absolute inset-0"
        initial={{ opacity: 0, scale: 1.08 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.8, ease: [0.25, 0.46, 0.45, 0.94] }}
      >
        <Image
          src="/images/top/concept.png"
          alt="GARBERY Concept"
          fill
          className="object-cover object-center"
          priority
          sizes="100vw"
        />
      </motion.div>
    </div>
  )
}
