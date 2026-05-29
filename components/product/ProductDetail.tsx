'use client'

import { useState } from 'react'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import { useCart } from '@/context/CartContext'
import type { Product } from '@/types'
import { formatPrice } from '@/lib/products'

export default function ProductDetail({ product }: { product: Product }) {
  const { dispatch, openCart } = useCart()
  const [selectedImage, setSelectedImage] = useState(0)
  const [selectedSize, setSelectedSize] = useState<string | null>(null)
  const [selectedColor, setSelectedColor] = useState(product.colors[0].name)
  const [error, setError] = useState('')
  const [added, setAdded] = useState(false)

  const handleAddToCart = () => {
    if (!selectedSize) {
      setError('サイズを選択してください。')
      return
    }
    setError('')
    dispatch({
      type: 'ADD_ITEM',
      payload: { product, size: selectedSize, color: selectedColor, quantity: 1 },
    })
    setAdded(true)
    setTimeout(() => {
      setAdded(false)
      openCart()
    }, 800)
  }

  return (
    <div className="pt-4 md:pt-8">
      <div className="max-w-screen-xl mx-auto px-4 md:px-8 py-10 md:py-16">
        <div className="grid md:grid-cols-2 gap-8 md:gap-16">
          {/* 画像エリア */}
          <div className="space-y-3">
            <div className="relative aspect-[3/4] overflow-hidden bg-brand-light">
              <AnimatePresence mode="wait">
                <motion.div
                  key={selectedImage}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="absolute inset-0"
                >
                  <Image
                    src={product.images[selectedImage]}
                    alt={`${product.name} - ${selectedImage + 1}`}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 50vw"
                    priority
                  />
                </motion.div>
              </AnimatePresence>
            </div>

            {/* サムネイル */}
            {product.images.length > 1 && (
              <div className="flex gap-2">
                {product.images.map((src, i) => (
                  <button
                    key={i}
                    onClick={() => setSelectedImage(i)}
                    className={`relative w-16 h-[85px] overflow-hidden flex-shrink-0 border-2 transition-colors ${
                      selectedImage === i ? 'border-brand-black' : 'border-transparent'
                    }`}
                    aria-label={`画像 ${i + 1} を表示`}
                    aria-pressed={selectedImage === i}
                  >
                    <Image src={src} alt="" fill className="object-cover" sizes="64px" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* 商品情報エリア */}
          <div className="md:py-4">
            {product.isNew && (
              <p className="text-[10px] tracking-widest2 text-brand-gray mb-3">NEW ARRIVAL</p>
            )}
            <p className="text-[10px] tracking-widest text-brand-gray mb-1">{product.nameEn}</p>
            <h1 className="text-xl md:text-2xl font-serif font-light tracking-wide mb-4">
              {product.name}
            </h1>
            <p className="text-lg font-light mb-8">{formatPrice(product.price)}</p>

            {/* カラー */}
            <div className="mb-6">
              <p className="text-xs tracking-widest mb-3">
                COLOR: <span className="font-medium">{selectedColor}</span>
              </p>
              <div className="flex gap-3">
                {product.colors.map((color) => (
                  <button
                    key={color.name}
                    onClick={() => setSelectedColor(color.name)}
                    title={color.name}
                    aria-label={color.name}
                    aria-pressed={selectedColor === color.name}
                    className={`w-7 h-7 rounded-full border-2 transition-all ${
                      selectedColor === color.name
                        ? 'border-brand-black ring-1 ring-brand-black ring-offset-1'
                        : 'border-brand-border'
                    }`}
                    style={{ backgroundColor: color.hex }}
                  />
                ))}
              </div>
            </div>

            {/* サイズ */}
            <div className="mb-8">
              <p className="text-xs tracking-widest mb-3">SIZE</p>
              <div className="flex flex-wrap gap-2">
                {product.sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => { setSelectedSize(size); setError('') }}
                    aria-pressed={selectedSize === size}
                    className={`w-12 h-12 border text-xs tracking-widest transition-colors ${
                      selectedSize === size
                        ? 'border-brand-black bg-brand-black text-white'
                        : 'border-brand-border hover:border-brand-black'
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
              {error && (
                <p className="text-[11px] text-red-500 mt-2" role="alert">{error}</p>
              )}
            </div>

            {/* カートボタン */}
            <motion.button
              onClick={handleAddToCart}
              disabled={added}
              whileTap={{ scale: 0.98 }}
              className={`w-full py-4 text-xs tracking-widest2 transition-colors duration-300 ${
                added
                  ? 'bg-brand-gray text-white'
                  : 'bg-brand-black text-white hover:bg-opacity-80'
              }`}
            >
              {added ? 'カートに追加しました' : 'カートに追加する'}
            </motion.button>

            {/* 商品説明 */}
            <div className="mt-10 pt-8 border-t border-brand-border">
              <p className="text-xs text-brand-gray leading-relaxed">{product.description}</p>
            </div>

            {/* 配送・返品 */}
            <div className="mt-6 space-y-2 text-[10px] text-brand-gray tracking-widest">
              <p>✓ 2営業日以内に発送</p>
              <p>✓ 送料無料（¥10,000以上）</p>
              <p>✓ 14日間返品対応</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
