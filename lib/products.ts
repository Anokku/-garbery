import type { Product } from '@/types'

export const products: Product[] = [
  {
    id: '001',
    name: 'Three Gerberas - I Love You T-shirt',
    nameEn: 'THREE GERBERAS - I LOVE YOU T-SHIRT',
    price: 8000,
    category: 'tops',
    description: '3輪のガーベラをあしらったオリジナルTシャツ。garbery のブランドコンセプト「自分という一輪」を纏う、シンプルで特別な一着。',
    images: ['/images/products/001-1.png', '/images/products/001-1.png'],
    sizes: ['S', 'M', 'L', 'XL'],
    colors: [{ name: 'ホワイト', hex: '#FFFFFF' }],
    isNew: true,
  },
]

export const newArrivals = products.filter((p) => p.isNew)
export const rankings = products.filter((p) => p.rankingPosition !== undefined)

export const categories = [
  { id: 'tops', label: 'トップス', labelEn: 'TOPS' },
]

export function getProduct(id: string): Product | undefined {
  return products.find((p) => p.id === id)
}

export function getProductsByCategory(category: string): Product[] {
  return products.filter((p) => p.category === category)
}

export function formatPrice(price: number): string {
  return `¥${price.toLocaleString('ja-JP')}`
}
