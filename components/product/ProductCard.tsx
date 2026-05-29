'use client'

import Link from 'next/link'
import Image from 'next/image'
import type { Product } from '@/types'
import { formatPrice } from '@/lib/products'

interface ProductCardProps {
  product: Product
  priority?: boolean
}

export default function ProductCard({ product, priority = false }: ProductCardProps) {
  return (
    <Link href={`/products/${product.id}`} className="group block">
      {/* 画像 */}
      <div className="relative aspect-[3/4] overflow-hidden bg-brand-light">
        <Image
          src={product.images[0]}
          alt={product.name}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-105"
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
          priority={priority}
        />
        {product.isNew && (
          <span className="absolute top-2 left-2 bg-white text-brand-black text-[9px] tracking-widest2 px-2 py-0.5">
            NEW
          </span>
        )}
      </div>

      {/* 商品情報 */}
      <div className="mt-3 px-0.5">
        <p className="text-[10px] tracking-widest text-brand-gray">{product.nameEn}</p>
        <p className="text-xs mt-0.5 tracking-wide">{product.name}</p>
        <p className="text-xs mt-1.5 text-brand-gray">{formatPrice(product.price)}</p>
        {/* カラースウォッチ */}
        <div className="flex gap-1.5 mt-2">
          {product.colors.map((color) => (
            <span
              key={color.name}
              title={color.name}
              className="w-3 h-3 rounded-full border border-brand-border"
              style={{ backgroundColor: color.hex }}
              aria-label={color.name}
            />
          ))}
        </div>
      </div>
    </Link>
  )
}
