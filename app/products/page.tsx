import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { products } from '@/lib/products'
import { formatPrice } from '@/lib/products'
import AnimatedSection from '@/components/ui/AnimatedSection'

export const metadata: Metadata = {
  title: 'SHOP | garbery',
  description: 'garbery の商品をご覧ください。',
}

export default async function ProductsPage() {
  const featured = products[0]
  const rest = products.slice(1)

  return (
    <div className="min-h-screen">

      {/* ===== フィーチャーアイテム ===== */}
      <AnimatedSection direction="none">
        <Link href={`/products/${featured.id}`} className="group block">
          <div className="grid md:grid-cols-2 min-h-[80vh]">

            {/* 画像エリア */}
            <div className="relative bg-brand-light overflow-hidden" style={{ minHeight: '60vw', maxHeight: '90vh' }}>
              <Image
                src={featured.images[0]}
                alt={featured.name}
                fill
                className="object-cover object-center transition-transform duration-700 group-hover:scale-[1.02]"
                priority
                sizes="(max-width: 768px) 100vw, 50vw"
              />
              {featured.isNew && (
                <span className="absolute top-6 left-6 text-[9px] tracking-widest2 bg-white text-brand-black px-2.5 py-1">
                  NEW
                </span>
              )}
            </div>

            {/* 商品情報 */}
            <div className="flex flex-col justify-center px-8 md:px-14 py-12 md:py-20">
              <p className="text-[10px] tracking-widest2 text-brand-gray mb-3">
                {featured.category.toUpperCase()}
              </p>
              <h1 className="font-serif text-2xl md:text-3xl lg:text-4xl font-light tracking-wide text-brand-black mb-2 leading-snug">
                {featured.name}
              </h1>
              <p className="text-[11px] tracking-widest text-brand-gray mb-6">
                {featured.nameEn}
              </p>
              <p className="text-lg font-light text-brand-black mb-8">
                {formatPrice(featured.price)}
              </p>

              {/* カラースウォッチ */}
              <div className="flex gap-2 mb-10">
                {featured.colors.map((color) => (
                  <span
                    key={color.name}
                    title={color.name}
                    className="w-4 h-4 rounded-full border border-brand-border"
                    style={{ backgroundColor: color.hex }}
                  />
                ))}
              </div>

              <Link
                href={`/products/${featured.id}`}
                className="inline-block border border-brand-black text-brand-black text-[10px] tracking-widest2 px-10 py-3.5 w-fit hover:bg-brand-black hover:text-white transition-colors duration-300"
              >
                VIEW ITEM
              </Link>

              <p className="text-[10px] text-brand-gray tracking-wide mt-8 leading-loose">
                {featured.description}
              </p>
            </div>

          </div>
        </Link>
      </AnimatedSection>

      {/* ===== 追加アイテム（増えたとき用グリッド）===== */}
      {rest.length > 0 && (
        <div className="px-4 md:px-8 py-16 border-t border-brand-border">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
            {rest.map((product) => (
              <Link
                key={product.id}
                href={`/products/${product.id}`}
                className="group block"
              >
                <div className="relative aspect-[3/4] overflow-hidden bg-brand-light">
                  <Image
                    src={product.images[0]}
                    alt={product.name}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                    sizes="(max-width: 640px) 50vw, 25vw"
                  />
                  {product.isNew && (
                    <span className="absolute top-2 left-2 text-[9px] tracking-widest2 bg-white text-brand-black px-2 py-0.5">
                      NEW
                    </span>
                  )}
                </div>
                <div className="mt-3">
                  <p className="text-xs tracking-wide text-brand-black">{product.name}</p>
                  <p className="text-xs text-brand-gray mt-1">{formatPrice(product.price)}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}

    </div>
  )
}
