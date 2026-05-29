import type { Metadata } from 'next'
import Link from 'next/link'
import AnimatedSection, { StaggerContainer, StaggerItem } from '@/components/ui/AnimatedSection'

export const metadata: Metadata = {
  title: 'MEMBERSHIP | GARBERY',
  description: 'GARBERYの会員登録・ログイン。',
}

const benefits = [
  { label: '購入履歴の確認', desc: '過去の注文をいつでも確認できます。' },
  { label: '先行アクセス', desc: '新作コレクションをいち早くご覧いただけます。' },
  { label: 'お届け先の保存', desc: '住所を登録してスムーズに購入できます。' },
  { label: 'メルマガ配信', desc: '新着情報やセール情報をお届けします。' },
]

export default function MembershipPage() {
  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-lg mx-auto px-4 py-12 lg:py-16">

        {/* ヘッダー */}
        <AnimatedSection className="text-center mb-14">
          <p className="text-[10px] tracking-widest2 text-brand-gray mb-3">MEMBER</p>
          <h1 className="font-serif text-2xl md:text-3xl font-light tracking-widest text-brand-black mb-4">
            MEMBERSHIP
          </h1>
          <p className="text-xs text-brand-gray leading-loose">
            会員登録でより便利にお買い物をお楽しみいただけます。
          </p>
        </AnimatedSection>

        {/* ログイン / 新規登録 */}
        <AnimatedSection className="grid grid-cols-1 gap-4 mb-14" delay={0.1}>
          {/* ログイン */}
          <div className="border border-brand-border p-8">
            <p className="text-[10px] tracking-widest2 text-brand-gray mb-5">LOGIN</p>
            <p className="font-serif text-lg font-light tracking-widest text-brand-black mb-6">
              ログイン
            </p>
            <div className="space-y-3 mb-6">
              <div>
                <label className="text-[10px] tracking-widest text-brand-gray block mb-1.5">
                  メールアドレス
                </label>
                <input
                  type="email"
                  className="w-full border border-brand-border px-3 py-2.5 text-xs focus:outline-none focus:border-brand-black transition-colors"
                  placeholder="example@garbery.jp"
                />
              </div>
              <div>
                <label className="text-[10px] tracking-widest text-brand-gray block mb-1.5">
                  パスワード
                </label>
                <input
                  type="password"
                  className="w-full border border-brand-border px-3 py-2.5 text-xs focus:outline-none focus:border-brand-black transition-colors"
                  placeholder="••••••••"
                />
              </div>
            </div>
            <button className="btn-secondary w-full mb-3">
              ログイン
            </button>
            <p className="text-center text-[10px] text-brand-gray">
              <Link href="#" className="hover:text-brand-black transition-colors underline">
                パスワードをお忘れの方
              </Link>
            </p>
          </div>

          {/* 新規登録 */}
          <div className="border border-brand-border p-8">
            <p className="text-[10px] tracking-widest2 text-brand-gray mb-5">NEW MEMBER</p>
            <p className="font-serif text-lg font-light tracking-widest text-brand-black mb-4">
              新規会員登録
            </p>
            <p className="text-xs text-brand-gray leading-loose mb-6">
              会員登録は無料です。<br />
              登録後すぐにすべての機能をご利用いただけます。
            </p>
            <Link href="#" className="btn-primary block text-center">
              新規登録はこちら
            </Link>
          </div>
        </AnimatedSection>

        {/* 会員特典 */}
        <AnimatedSection delay={0.2}>
          <div className="border-t border-brand-border pt-12">
            <p className="text-[10px] tracking-widest2 text-brand-gray mb-6 text-center">BENEFITS</p>
            <StaggerContainer className="grid grid-cols-2 gap-4">
              {benefits.map((item, i) => (
                <StaggerItem key={i}>
                  <div className="p-4 bg-brand-light">
                    <p className="text-[10px] tracking-widest text-brand-black mb-1.5">{item.label}</p>
                    <p className="text-[10px] text-brand-gray leading-relaxed">{item.desc}</p>
                  </div>
                </StaggerItem>
              ))}
            </StaggerContainer>
          </div>
        </AnimatedSection>

      </div>
    </div>
  )
}
