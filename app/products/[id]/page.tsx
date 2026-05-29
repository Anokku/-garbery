import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { products, getProduct, newArrivals } from '@/lib/products'
import ProductDetail from '@/components/product/ProductDetail'
import ProductCard from '@/components/product/ProductCard'
import AnimatedSection, { StaggerContainer, StaggerItem } from '@/components/ui/AnimatedSection'

interface Props {
  params: Promise<{ id: string }>
}

export async function generateStaticParams() {
  return products.map((p) => ({ id: p.id }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params
  const product = getProduct(id)
  if (!product) return {}
  return {
    title: `${product.name} | GARBERY`,
    description: product.description,
    openGraph: {
      title: `${product.name} | GARBERY`,
      description: product.description,
      images: [{ url: '/images/ogp.png', width: 1200, height: 630, alt: 'GARBERY' }],
    },
    twitter: {
      card: 'summary_large_image',
      images: ['/images/ogp.png'],
    },
  }
}

export default async function ProductPage({ params }: Props) {
  const { id } = await params
  const product = getProduct(id)
  if (!product) notFound()

  const related = newArrivals.filter((p) => p.id !== id).slice(0, 4)

  return (
    <>
      <ProductDetail product={product} />

      {/* 関連商品 */}
      {related.length > 0 && (
        <section className="py-16 px-4 max-w-screen-xl mx-auto border-t border-brand-border">
          <AnimatedSection className="text-center mb-10">
            <p className="section-heading">YOU MAY ALSO LIKE</p>
            <h2 className="text-xl font-serif font-light tracking-widest">RELATED ITEMS</h2>
          </AnimatedSection>
          <StaggerContainer className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            {related.map((p) => (
              <StaggerItem key={p.id}>
                <ProductCard product={p} />
              </StaggerItem>
            ))}
          </StaggerContainer>
        </section>
      )}
    </>
  )
}
