import type { Metadata } from 'next'
import AnimatedSection from '@/components/ui/AnimatedSection'

export const metadata: Metadata = {
  title: 'CONTACT | GARBERY',
  description: 'GARBERYへのお問い合わせ。',
}

export default function ContactPage() {
  return (
    <div className="pt-0">
      <div className="max-w-lg mx-auto px-4 py-20 md:py-32">
        <AnimatedSection className="text-center mb-14">
          <p className="text-[10px] tracking-widest2 text-brand-gray mb-3">GET IN TOUCH</p>
          <h1 className="font-serif text-2xl md:text-3xl font-light tracking-widest text-brand-black">
            CONTACT
          </h1>
          <p className="text-xs text-brand-gray mt-4 leading-loose">
            ご質問・ご相談はInstagramのDM、<br />またはメールにてお気軽にどうぞ。
          </p>
        </AnimatedSection>

        <AnimatedSection className="space-y-4 text-center" delay={0.2}>
          <div className="border border-brand-border py-5 px-6">
            <p className="text-[10px] tracking-widest2 text-brand-gray mb-2">INSTAGRAM</p>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs tracking-widest text-brand-black hover:text-brand-gray transition-colors"
            >
              @garbery_official
            </a>
          </div>

          <div className="border border-brand-border py-5 px-6">
            <p className="text-[10px] tracking-widest2 text-brand-gray mb-2">EMAIL</p>
            <a
              href="mailto:info@garbery.jp"
              className="text-xs tracking-widest text-brand-black hover:text-brand-gray transition-colors"
            >
              info@garbery.jp
            </a>
          </div>
        </AnimatedSection>
      </div>
    </div>
  )
}
