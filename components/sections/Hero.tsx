'use client'

import { useRef } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { motion, useScroll, useTransform } from 'framer-motion'

export default function Hero() {
  const ref = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '15%'])

  return (
    <section ref={ref} className="relative w-full overflow-hidden h-[75svh] lg:h-[100svh]">
      {/* 背景画像（フェードイン + ズームイン + パララックス）*/}
      <motion.div
        className="absolute inset-0"
        style={{ y }}
        initial={{ opacity: 0, scale: 1.08 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.8, ease: [0.25, 0.46, 0.45, 0.94] }}
      >
        <Image
          src="/images/top/hero.png"
          alt="GARBERY コレクション"
          fill
          className="object-cover object-center"
          priority
          sizes="100vw"
        />
      </motion.div>

      {/* ブランド名（中央） */}
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3 }}
          className="text-[9px] tracking-widest3 text-white/70 mb-4"
        >
          2026 AUTUMN / WINTER
        </motion.p>
        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="font-logo text-5xl md:text-7xl lg:text-8xl font-bold tracking-normal text-white mb-10"
        >
          garbery
        </motion.h1>
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.9 }}
        >
          <a
            href="https://garbery.official.ec"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[10px] tracking-widest2 text-white border-b border-white/50 pb-0.5 hover:border-white transition-colors duration-300"
          >
            SHOP NOW
          </a>
        </motion.div>
      </div>
    </section>
  )
}
