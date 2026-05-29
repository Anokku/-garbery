import Link from 'next/link'
import Image from 'next/image'
import { categories } from '@/lib/products'
import AnimatedSection, { StaggerContainer, StaggerItem } from '@/components/ui/AnimatedSection'

const categoryImages: Record<string, string> = {
  outer:       '/images/outer.svg',
  tops:        '/images/tops.svg',
  bottoms:     '/images/bottoms.svg',
  onepiece:    '/images/onepiece.svg',
  accessories: '/images/accessories.svg',
}

export default function Category() {
  return (
    <section className="py-16 md:py-24 px-4 border-t border-brand-border">
      <div className="max-w-screen-xl mx-auto">
        <AnimatedSection className="text-center mb-10">
          <p className="text-[10px] tracking-widest2 text-brand-gray mb-2">COLLECTIONS</p>
          <h2 className="font-serif text-xl md:text-2xl font-light tracking-widest text-brand-black">CATEGORY</h2>
        </AnimatedSection>

        <StaggerContainer className="grid grid-cols-2 md:grid-cols-5 gap-3 md:gap-4">
          {categories.map((cat) => (
            <StaggerItem key={cat.id}>
              <Link href={`/products?category=${cat.id}`} className="group block">
                <div className="relative aspect-[3/4] overflow-hidden bg-brand-light">
                  <Image
                    src={categoryImages[cat.id]}
                    alt={cat.label}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                    sizes="(max-width: 640px) 50vw, 20vw"
                  />
                </div>
                <div className="mt-2 text-center">
                  <p className="text-[10px] tracking-widest text-brand-gray">{cat.labelEn}</p>
                  <p className="text-xs mt-0.5 tracking-wide text-brand-black">{cat.label}</p>
                </div>
              </Link>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  )
}
