import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="pt-24 pb-20 px-4 text-center py-32">
      <p className="text-[10px] tracking-widest3 text-brand-gray mb-4">404</p>
      <h1 className="font-serif text-3xl font-light tracking-widest mb-6">PAGE NOT FOUND</h1>
      <p className="text-xs text-brand-gray mb-10">お探しのページは見つかりませんでした。</p>
      <Link href="/" className="btn-primary">TOP へ戻る</Link>
    </div>
  )
}
