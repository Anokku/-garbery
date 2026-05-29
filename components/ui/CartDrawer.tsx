'use client'

import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'
import { useCart } from '@/context/CartContext'
import { formatPrice } from '@/lib/products'

export default function CartDrawer() {
  const { items, isOpen, closeCart, dispatch, totalItems, totalPrice } = useCart()

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* オーバーレイ */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 bg-black/30 z-50"
            onClick={closeCart}
            aria-hidden="true"
          />

          {/* ドロワー */}
          <motion.aside
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="fixed top-0 right-0 h-full w-full max-w-md bg-white z-50 flex flex-col shadow-2xl"
            aria-label="カート"
          >
            {/* ヘッダー */}
            <div className="flex items-center justify-between px-6 py-5 border-b border-brand-border">
              <div>
                <p className="text-xs tracking-widest2 text-brand-gray">CART</p>
                <p className="text-sm font-serif">{totalItems}点</p>
              </div>
              <button
                onClick={closeCart}
                aria-label="カートを閉じる"
                className="text-brand-gray hover:text-brand-black transition-colors"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>
            </div>

            {/* アイテム一覧 */}
            <div className="flex-1 overflow-y-auto px-6 py-4">
              {items.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full gap-4 text-center">
                  <p className="text-brand-gray text-sm">カートは空です</p>
                  <button onClick={closeCart} className="btn-primary text-xs">
                    ショッピングを続ける
                  </button>
                </div>
              ) : (
                <ul className="space-y-6">
                  {items.map((item) => (
                    <li key={`${item.product.id}-${item.size}-${item.color}`} className="flex gap-4">
                      <div className="relative w-20 h-[106px] flex-shrink-0 bg-brand-light">
                        <Image
                          src={item.product.images[0]}
                          alt={item.product.name}
                          fill
                          className="object-cover"
                          sizes="80px"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-xs font-medium tracking-wide truncate">{item.product.name}</p>
                        <p className="text-[10px] text-brand-gray mt-1">
                          {item.size} / {item.color}
                        </p>
                        <p className="text-xs mt-2">{formatPrice(item.product.price)}</p>
                        <div className="flex items-center gap-3 mt-3">
                          <button
                            onClick={() =>
                              dispatch({
                                type: 'UPDATE_QUANTITY',
                                payload: {
                                  productId: item.product.id,
                                  size: item.size,
                                  color: item.color,
                                  quantity: item.quantity - 1,
                                },
                              })
                            }
                            className="w-6 h-6 border border-brand-border flex items-center justify-center text-xs hover:bg-brand-light"
                            aria-label="数量を減らす"
                          >
                            −
                          </button>
                          <span className="text-xs w-4 text-center">{item.quantity}</span>
                          <button
                            onClick={() =>
                              dispatch({
                                type: 'UPDATE_QUANTITY',
                                payload: {
                                  productId: item.product.id,
                                  size: item.size,
                                  color: item.color,
                                  quantity: item.quantity + 1,
                                },
                              })
                            }
                            className="w-6 h-6 border border-brand-border flex items-center justify-center text-xs hover:bg-brand-light"
                            aria-label="数量を増やす"
                          >
                            ＋
                          </button>
                          <button
                            onClick={() =>
                              dispatch({
                                type: 'REMOVE_ITEM',
                                payload: {
                                  productId: item.product.id,
                                  size: item.size,
                                  color: item.color,
                                },
                              })
                            }
                            className="ml-auto text-[10px] text-brand-gray hover:text-brand-black underline"
                          >
                            削除
                          </button>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            {/* フッター */}
            {items.length > 0 && (
              <div className="px-6 py-6 border-t border-brand-border space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-xs tracking-widest text-brand-gray">SUBTOTAL</span>
                  <span className="text-sm font-medium">{formatPrice(totalPrice)}</span>
                </div>
                <p className="text-[10px] text-brand-gray">送料は購入手続き時に計算されます。</p>
                <Link
                  href="/cart"
                  onClick={closeCart}
                  className="btn-secondary w-full text-center block"
                >
                  購入手続きへ
                </Link>
              </div>
            )}
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  )
}
