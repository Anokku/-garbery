'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { usePathname } from 'next/navigation'
import { useCart } from '@/context/CartContext'

const navLinks = [
  { href: '/',           label: 'HOME' },
  { href: '/concept',    label: 'concept' },
  { href: '/products',   label: 'SHOP' },
  { href: '/membership', label: 'MEMBERSHIP' },
  { href: '/contact',    label: 'CONTACT' },
]

export default function Header() {
  const { totalItems, openCart } = useCart()
  const [isOpen, setIsOpen] = useState(false)
  const pathname = usePathname()

  useEffect(() => { setIsOpen(false) }, [pathname])

  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [isOpen])

  return (
    <>
      {/* ===== デスクトップ固定サイドバー (lg+) ===== */}
      <aside className="hidden lg:flex flex-col fixed top-0 left-0 h-full w-[200px] bg-white border-r border-brand-border z-40">
        {/* ロゴ */}
        <div className="px-7 pt-10 pb-10">
          <Link href="/" className="font-logo text-base font-bold text-brand-black">
            garbery
          </Link>
        </div>

        {/* ナビゲーション */}
        <nav className="mt-auto px-7 pb-8 flex flex-col gap-6" aria-label="サイドバーナビゲーション">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`text-[11px] tracking-widest transition-colors duration-200 ${
                pathname === link.href
                  ? 'text-brand-black'
                  : 'text-brand-gray hover:text-brand-black'
              }`}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* ボトム：カート + SNS */}
        <div className="px-7 pb-10 flex flex-col gap-5">
          <button
            onClick={openCart}
            className="text-[11px] tracking-widest text-brand-gray hover:text-brand-black transition-colors duration-200 text-left w-fit"
          >
            CART{totalItems > 0 && ` (${totalItems})`}
          </button>
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[11px] tracking-widest text-brand-gray hover:text-brand-black transition-colors duration-200 w-fit"
          >
            LINK
          </a>
        </div>
      </aside>

      {/* ===== モバイル トップバー (< lg) ===== */}
      <header className="fixed top-0 left-0 right-0 h-12 bg-white border-b border-brand-border z-40 flex items-center px-4 lg:hidden">
        {/* ハンバーガー */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          aria-label="メニューを開く"
          aria-expanded={isOpen}
          className="flex flex-col gap-[5px] p-1"
        >
          <span className={`block w-5 h-px bg-brand-black transition-all duration-300 ${isOpen ? 'rotate-45 translate-y-[6px]' : ''}`} />
          <span className={`block w-5 h-px bg-brand-black transition-all duration-300 ${isOpen ? 'opacity-0' : ''}`} />
          <span className={`block w-5 h-px bg-brand-black transition-all duration-300 ${isOpen ? '-rotate-45 -translate-y-[6px]' : ''}`} />
        </button>

        {/* ロゴ（中央） */}
        <Link
          href="/"
          className="font-logo text-base font-bold text-brand-black absolute left-1/2 -translate-x-1/2"
        >
          garbery
        </Link>

        {/* カート（右） */}
        <button
          onClick={openCart}
          className="ml-auto text-[11px] tracking-widest text-brand-gray hover:text-brand-black transition-colors"
        >
          CART{totalItems > 0 && ` (${totalItems})`}
        </button>
      </header>

      {/* ===== モバイル サイドバードロワー ===== */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* バックドロップ */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="fixed inset-0 bg-black/20 z-40 lg:hidden"
              onClick={() => setIsOpen(false)}
            />

            {/* サイドバー本体 */}
            <motion.aside
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ duration: 0.35, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="fixed top-0 left-0 h-full w-[200px] bg-white border-r border-brand-border z-50 flex flex-col lg:hidden"
            >
              {/* ロゴ */}
              <div className="px-7 pt-8 pb-8 border-b border-brand-border">
                <Link
                  href="/"
                  className="font-logo text-base font-bold text-brand-black"
                  onClick={() => setIsOpen(false)}
                >
                  garbery
                </Link>
              </div>

              {/* ナビ */}
              <nav className="flex-1 px-7 pt-8 flex flex-col gap-6">
                {navLinks.map((link, i) => (
                  <motion.div
                    key={link.href}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.05 }}
                  >
                    <Link
                      href={link.href}
                      onClick={() => setIsOpen(false)}
                      className={`text-[11px] tracking-widest transition-colors ${
                        pathname === link.href ? 'text-brand-black' : 'text-brand-gray'
                      }`}
                    >
                      {link.label}
                    </Link>
                  </motion.div>
                ))}
              </nav>

              {/* ボトム */}
              <div className="px-7 pb-8 flex flex-col gap-5">
                <button
                  onClick={() => { openCart(); setIsOpen(false) }}
                  className="text-[11px] tracking-widest text-brand-gray hover:text-brand-black transition-colors text-left"
                >
                  CART{totalItems > 0 && ` (${totalItems})`}
                </button>
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[11px] tracking-widest text-brand-gray hover:text-brand-black transition-colors"
                >
                  LINK
                </a>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  )
}

