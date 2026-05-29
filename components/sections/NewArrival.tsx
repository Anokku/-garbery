import Link from 'next/link'
import { newArrivals } from '@/lib/products'
import ProductCard from '@/components/product/ProductCard'
import AnimatedSection, { StaggerContainer, StaggerItem } from '@/components/ui/AnimatedSection'

export default function NewArrival() {
  return (
    <section className="py-16 md:py-24 px-4 max-w-screen-xl mx-auto">
      <AnimatedSection className="text-center mb-10">
        <p className="text-[10px] tracking-widest2 text-brand-gray mb-2">WHAT&apos;S NEW</p>
        <h2 className="font-serif text-xl md:text-2xl font-light tracking-widest text-brand-black">NEW ARRIVAL</h2>
      </AnimatedSection>

      <StaggerContainer className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-5">
        {newArrivals.map((product, i) => (
          <StaggerItem key={product.id}>
            <ProductCard product={product} priority={i < 2} />
          </StaggerItem>
        ))}
      </StaggerContainer>

      <AnimatedSection className="text-center mt-10" delay={0.2}>
        <Link
          href="/products?category=new"
          className="text-[10px] tracking-widest2 border-b border-brand-black pb-0.5 hover:text-brand-gray hover:border-brand-gray transition-colors duration-300"
        >
          VIEW ALL
        </Link>
      </AnimatedSection>
    </section>
  )
}
