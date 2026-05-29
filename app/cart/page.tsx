'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useCart } from '@/context/CartContext'
import { formatPrice } from '@/lib/products'

export default function CartPage() {
  const { items, dispatch, totalItems, totalPrice } = useCart()

  if (items.length === 0) {
    return (
      <div className="pt-8 pb-20 px-4 max-w-screen-xl mx-auto text-center py-20">
        <p className="text-xs tracking-widest2 text-brand-gray mb-6">CART</p>
        <p className="font-serif text-2xl font-light mb-8">カートは空です</p>
        <Link href="/products" className="btn-primary">
          ショッピングを続ける
        </Link>
      </div>
    )
  }

  const shipping = totalPrice >= 10000 ? 0 : 800

  return (
    <div className="pt-8 pb-20 px-4 max-w-screen-xl mx-auto">
      <div className="py-10 mb-8 border-b border-brand-border">
        <p className="text-xs tracking-widest2 text-brand-gray mb-1">CART</p>
        <h1 className="font-serif text-2xl md:text-3xl font-light tracking-widest">
          カート ({totalItems}点)
        </h1>
      </div>

      <div className="grid md:grid-cols-3 gap-10 md:gap-16">
        {/* アイテム一覧 */}
        <div className="md:col-span-2 space-y-0 divide-y divide-brand-border">
          {items.map((item) => (
            <div
              key={`${item.product.id}-${item.size}-${item.color}`}
              className="flex gap-5 py-6"
            >
              <Link href={`/products/${item.product.id}`} className="relative w-24 h-32 flex-shrink-0 bg-brand-light overflow-hidden">
                <Image
                  src={item.product.images[0]}
                  alt={item.product.name}
                  fill
                  className="object-cover hover:scale-105 transition-transform duration-500"
                  sizes="96px"
                />
              </Link>

              <div className="flex-1 min-w-0">
                <p className="text-[10px] tracking-widest text-brand-gray">{item.product.nameEn}</p>
                <Link href={`/products/${item.product.id}`} className="text-sm mt-0.5 block hover:underline">
                  {item.product.name}
                </Link>
                <p className="text-[10px] text-brand-gray mt-1">
                  SIZE: {item.size} / COLOR: {item.color}
                </p>
                <p className="text-sm mt-2">{formatPrice(item.product.price)}</p>

                <div className="flex items-center gap-3 mt-3">
                  <button
                    onClick={() =>
                      dispatch({
                        type: 'UPDATE_QUANTITY',
                        payload: { productId: item.product.id, size: item.size, color: item.color, quantity: item.quantity - 1 },
                      })
                    }
                    className="w-7 h-7 border border-brand-border flex items-center justify-center text-sm hover:bg-brand-light"
                    aria-label="数量を減らす"
                  >
                    −
                  </button>
                  <span className="text-sm w-5 text-center">{item.quantity}</span>
                  <button
                    onClick={() =>
                      dispatch({
                        type: 'UPDATE_QUANTITY',
                        payload: { productId: item.product.id, size: item.size, color: item.color, quantity: item.quantity + 1 },
                      })
                    }
                    className="w-7 h-7 border border-brand-border flex items-center justify-center text-sm hover:bg-brand-light"
                    aria-label="数量を増やす"
                  >
                    ＋
                  </button>
                  <button
                    onClick={() =>
                      dispatch({
                        type: 'REMOVE_ITEM',
                        payload: { productId: item.product.id, size: item.size, color: item.color },
                      })
                    }
                    className="ml-auto text-[10px] text-brand-gray hover:text-brand-black underline"
                  >
                    削除
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* 注文サマリー */}
        <div>
          <div className="border border-brand-border p-6 sticky top-24">
            <h2 className="text-xs tracking-widest2 mb-6">ORDER SUMMARY</h2>
            <div className="space-y-3 mb-6 text-xs">
              <div className="flex justify-between">
                <span className="text-brand-gray">商品合計</span>
                <span>{formatPrice(totalPrice)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-brand-gray">送料</span>
                <span>{shipping === 0 ? '無料' : formatPrice(shipping)}</span>
              </div>
              {shipping > 0 && (
                <p className="text-[10px] text-brand-gray">
                  あと{formatPrice(10000 - totalPrice)}で送料無料
                </p>
              )}
            </div>
            <div className="border-t border-brand-border pt-4 mb-6 flex justify-between">
              <span className="text-xs tracking-widest">TOTAL</span>
              <span className="text-sm font-medium">{formatPrice(totalPrice + shipping)}</span>
            </div>
            <button className="btn-secondary w-full mb-3">
              購入手続きへ
            </button>
            <Link href="/products" className="btn-primary w-full text-center block">
              ショッピングを続ける
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
