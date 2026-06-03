import type { Metadata } from 'next'
import Image from 'next/image'
import { redirect } from 'next/navigation'
import { getBaseItems, formatBasePrice } from '@/lib/base-api'
import AnimatedSection from '@/components/ui/AnimatedSection'

export const metadata: Metadata = {
  title: 'SHOP | garbery',
  description: 'garbery の商品をご覧ください。',
}

export const revalidate = 300

export default async function ProductsPage() {
  if (!process.env.BASE_REFRESH_TOKEN) {
    redirect('https://garbery.official.ec')
  }

  let items: Awaited<ReturnType<typeof getBaseItems>> = []
  try {
    items = await getBaseItems()
  } catch {
    redirect('https://garbery.official.ec')
  }

  if (items.length === 0) {
    redirect('https://garbery.official.ec')
  }

  const [featured, ...rest] = items

  return (
    <div className="min-h-screen">

      {/* フィーチャーアイテム */}
      <AnimatedSection direction="none">
        <a
          href={`https://garbery.official.ec/items/${featured.item_id}`}
          target="_blank"
          rel="noopener noreferrer"
          className="group block"
        >
          <div className="grid md:grid-cols-2 min-h-[80vh]">
            <div className="relative bg-brand-light overflow-hidden" style={{ minHeight: '60vw', maxHeight: '90vh' }}>
              <Image
                src={featured.img1_origin}
                alt={featured.title}
                fill
                className="object-cover object-center transition-transform duration-700 group-hover:scale-[1.02]"
                priority
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
            <div className="flex flex-col justify-center px-6 md:px-14 py-8 md:py-20">
              <h1 className="font-serif text-2xl md:text-3xl lg:text-4xl font-light tracking-wide text-brand-black mb-4 leading-snug">
                {featured.title}
              </h1>
              <p className="text-lg font-light text-brand-black mb-8">
                {formatBasePrice(featured.price)}
              </p>
              <span className="inline-block border border-brand-black text-brand-black text-[10px] tracking-widest2 px-10 py-3.5 w-fit group-hover:bg-brand-black group-hover:text-white transition-colors duration-300">
                VIEW ITEM
              </span>
              <p className="text-[10px] text-brand-gray tracking-wide mt-8 leading-loose line-clamp-4">
                {featured.detail}
              </p>
            </div>
          </div>
        </a>
      </AnimatedSection>

      {/* 追加アイテムグリッド */}
      {rest.length > 0 && (
        <div className="px-4 md:px-8 py-16 border-t border-brand-border">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
            {rest.map((item) => (
              <a
                key={item.item_id}
                href={`https://garbery.official.ec/items/${item.item_id}`}
                target="_blank"
                rel="noopener noreferrer"
                className="group block"
              >
                <div className="relative aspect-[3/4] overflow-hidden bg-brand-light">
                  <Image
                    src={item.img1_origin}
                    alt={item.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                    sizes="(max-width: 640px) 50vw, 25vw"
                  />
                </div>
                <div className="mt-3">
                  <p className="text-xs tracking-wide text-brand-black line-clamp-2">{item.title}</p>
                  <p className="text-xs text-brand-gray mt-1">{formatBasePrice(item.price)}</p>
                </div>
              </a>
            ))}
          </div>
        </div>
      )}

    </div>
  )
}
