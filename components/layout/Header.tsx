'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { usePathname } from 'next/navigation'

const navLinks = [
  { href: '/',                           label: 'HOME',       external: false },
  { href: '/concept',                    label: 'concept',    external: false },
  { href: '/products',                   label: 'SHOP',       external: false },
  { href: '/membership',                 label: 'MEMBERSHIP', external: false },
  { href: '/contact',                    label: 'CONTACT',    external: false },
]

export default function Header() {
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
        <div className="px-7 pt-10 pb-10">
          <Link href="/" className="font-logo text-base font-bold text-brand-black">
            garbery
          </Link>
        </div>

        <nav className="mt-auto px-7 pb-8 flex flex-col gap-6" aria-label="サイドバーナビゲーション">
          {navLinks.map((link) =>
            link.external ? (
              <a
                key={link.href}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[11px] tracking-widest transition-colors duration-200 text-brand-gray hover:text-brand-black"
              >
                {link.label}
              </a>
            ) : (
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
            )
          )}
        </nav>

        <div className="px-7 pb-10">
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

        <Link
          href="/"
          className="font-logo text-base font-bold text-brand-black absolute left-1/2 -translate-x-1/2"
        >
          garbery
        </Link>
      </header>

      {/* ===== モバイル サイドバードロワー ===== */}
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="fixed inset-0 bg-black/20 z-40 lg:hidden"
              onClick={() => setIsOpen(false)}
            />

            <motion.aside
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ duration: 0.35, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="fixed top-0 left-0 h-full w-[200px] bg-white border-r border-brand-border z-50 flex flex-col lg:hidden"
            >
              <div className="px-7 pt-8 pb-8 border-b border-brand-border">
                <Link
                  href="/"
                  className="font-logo text-base font-bold text-brand-black"
                  onClick={() => setIsOpen(false)}
                >
                  garbery
                </Link>
              </div>

              <nav className="flex-1 px-7 pt-8 flex flex-col gap-6">
                {navLinks.map((link, i) => (
                  <motion.div
                    key={link.href}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.05 }}
                  >
                    {link.external ? (
                      <a
                        href={link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={() => setIsOpen(false)}
                        className="text-[11px] tracking-widest transition-colors text-brand-gray"
                      >
                        {link.label}
                      </a>
                    ) : (
                      <Link
                        href={link.href}
                        onClick={() => setIsOpen(false)}
                        className={`text-[11px] tracking-widest transition-colors ${
                          pathname === link.href ? 'text-brand-black' : 'text-brand-gray'
                        }`}
                      >
                        {link.label}
                      </Link>
                    )}
                  </motion.div>
                ))}
              </nav>

              <div className="px-7 pb-8">
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
