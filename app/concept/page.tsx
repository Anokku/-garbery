'use client'

import { motion } from 'framer-motion'
import ConceptHero from '@/components/sections/ConceptHero'
import { StaggerContainer, StaggerItem } from '@/components/ui/AnimatedSection'
import AnimatedSection from '@/components/ui/AnimatedSection'

const lines = [
  'ガーベラは、一輪増えるだけで意味が変わる。',
  '色が違うだけで、語る言葉が変わる。',
  'その一輪一輪に、確かな存在意義がある。',
  '人もそうだと、garbery は思う。',
]

const body = [
  '誰かと同じ色でなくていい。多数の中に溶けなくていい。あなたの色は、あなただけのものだ。',
  'garbery がつくるのは、そんな「自分という一輪」を纏うための服。',
  '余分を削ぎ落としたシンプルな形の中に、世界に一つだけのあなたの好きをつけて。自分を纏うのもいい。大切な人にそっと贈るのもいい。',
  '着る人が、欠かせない一輪のガーベラのように。',
]

export default function ConceptPage() {
  return (
    <div className="pt-0">

      {/* フルワイド画像（ヒーローと同じアニメーション）*/}
      <ConceptHero />

      {/* コンセプトテキスト */}
      <div className="max-w-xl mx-auto px-4 py-20 md:py-32">

        {/* 見出し */}
        <div className="text-center mb-16">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-[10px] tracking-widest2 text-brand-gray mb-3"
          >
            BRAND CONCEPT
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="font-serif text-2xl md:text-3xl font-light tracking-widest text-brand-black"
          >
            concept
          </motion.h1>
        </div>

        {/* 詩的テキスト */}
        <StaggerContainer className="mb-14 space-y-4 text-center">
          {lines.map((line, i) => (
            <StaggerItem key={i}>
              <p className="font-serif text-base md:text-lg font-light leading-loose tracking-wide text-brand-black">
                {line}
              </p>
            </StaggerItem>
          ))}
        </StaggerContainer>

        {/* 区切り線 */}
        <AnimatedSection className="flex items-center gap-4 mb-14" delay={0.3}>
          <span className="flex-1 h-px bg-brand-border" />
          <span className="text-brand-gray text-[10px] tracking-widest2">garbery</span>
          <span className="flex-1 h-px bg-brand-border" />
        </AnimatedSection>

        {/* 本文 */}
        <StaggerContainer className="space-y-6">
          {body.map((text, i) => (
            <StaggerItem key={i}>
              <p className="text-sm leading-loose text-brand-gray tracking-wide">{text}</p>
            </StaggerItem>
          ))}
        </StaggerContainer>

        {/* 締め */}
        <AnimatedSection className="mt-20 text-center" delay={0.4}>
          <p className="font-serif text-xl md:text-2xl font-light tracking-widest3 text-brand-black">
            それが、garbery。
          </p>
        </AnimatedSection>

      </div>
    </div>
  )
}
