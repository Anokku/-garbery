import Link from 'next/link'
import Image from 'next/image'
import { rankings } from '@/lib/products'
import { formatPrice } from '@/lib/products'
import AnimatedSection, { StaggerContainer, StaggerItem } from '@/components/ui/AnimatedSection'

export default function Ranking() {
  return (
    <section className="py-20 md:py-28 bg-brand-light">
      <div className="px-4 max-w-screen-xl mx-auto">
        <AnimatedSection className="text-center mb-12">
          <p className="section-heading">POPULAR ITEMS</p>
          <h2 className="section-title">RANKING</h2>
        </AnimatedSection>

        <StaggerContainer className="space-y-0 divide-y divide-brand-border border-y border-brand-border">
          {rankings.map((product) => (
            <StaggerItem key={product.id}>
              <Link
                href={`/products/${product.id}`}
                className="flex items-center gap-4 md:gap-8 py-5 hover:bg-white transition-colors duration-200 px-2 group"
              >
                {/* ランキング番号 */}
                <span className="font-serif text-3xl md:text-4xl font-light text-brand-border w-10 md:w-14 flex-shrink-0 text-center">
                  {String(product.rankingPosition).padStart(2, '0')}
                </span>

                {/* 商品画像 */}
                <div className="relative w-16 h-[85px] md:w-20 md:h-[106px] flex-shrink-0 bg-brand-border overflow-hidden">
                  <Image
                    src={product.images[0]}
                    alt={product.name}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    sizes="80px"
                  />
                </div>

                {/* 商品情報 */}
                <div className="flex-1 min-w-0">
                  <p className="text-[10px] tracking-widest text-brand-gray">{product.nameEn}</p>
                  <p className="text-sm mt-0.5 tracking-wide truncate">{product.name}</p>
                  <p className="text-xs mt-2 text-brand-gray">{formatPrice(product.price)}</p>
                </div>

                {/* 矢印 */}
                <span className="text-brand-gray group-hover:text-brand-black transition-colors flex-shrink-0">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <line x1="5" y1="12" x2="19" y2="12" />
                    <polyline points="12 5 19 12 12 19" />
                  </svg>
                </span>
              </Link>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  )
}
