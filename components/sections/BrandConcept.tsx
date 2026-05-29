import Image from 'next/image'
import Link from 'next/link'
import AnimatedSection from '@/components/ui/AnimatedSection'

export default function BrandConcept() {
  return (
    <section className="w-full">
      {/* コンセプト画像（全幅） */}
      <div className="relative w-full aspect-[16/9] md:aspect-[21/9] overflow-hidden bg-brand-light">
        <Image
          src="/images/heart-tshirt.jpg"
          alt="GARBERY Brand Concept"
          fill
          className="object-cover object-center"
          sizes="100vw"
        />
      </div>

      {/* テキストエリア */}
      <AnimatedSection className="py-14 md:py-20 px-4 text-center">
        <p className="text-[10px] tracking-widest2 text-brand-gray mb-4">BRAND CONCEPT</p>
        <h2 className="font-serif text-2xl md:text-3xl font-light tracking-widest mb-6 text-brand-black">
          Brand Concept — garbery
        </h2>
        <p className="text-xs md:text-sm text-brand-gray leading-loose max-w-md mx-auto mb-8">
          誰かと同じ色でなくていい。<br />
          あなたの色は、あなただけのものだ。
        </p>
        <Link
          href="/concept"
          className="text-[10px] tracking-widest2 border-b border-brand-black pb-0.5 hover:text-brand-gray hover:border-brand-gray transition-colors duration-300"
        >
          VIEW MORE
        </Link>
      </AnimatedSection>
    </section>
  )
}
