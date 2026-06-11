import type { Metadata } from 'next'
import Image from 'next/image'
import AnimatedSection, { StaggerContainer, StaggerItem } from '@/components/ui/AnimatedSection'

export const metadata: Metadata = {
  title: 'CHEKI | GARBERY',
  description: 'GARBERY POP-UP STORE チェキ販売ページ。',
}

const casts = [
  {
    name: 'さらさん',
    image: '/images/cheki/sara.jpg',
    deco: 'https://square.link/u/Be4svg8m',
    normal: 'https://square.link/u/gWtteH0x',
  },
  {
    name: 'miyu^._.^',
    image: '/images/cheki/miyu.jpg',
    deco: 'https://square.link/u/ZDsY0oBS',
    normal: 'https://square.link/u/8KLXmBNQ',
  },
  {
    name: 'りりあ🦖',
    image: '/images/cheki/riria.jpg',
    deco: 'https://square.link/u/QRxFKeb7',
    normal: 'https://square.link/u/4FOwyb1r',
  },
]

const tickets = [
  {
    name: 'VIPチケット',
    time: '14:00入場',
    note: '',
    url: 'https://square.link/u/klf2cI36',
  },
  {
    name: '一般チケット',
    time: '15:00入場',
    note: '',
    url: 'https://square.link/u/gcZLfbso',
  },
  {
    name: 'Laterチケット',
    time: '16:00入場',
    note: 'チェキ購入不可',
    url: 'https://square.link/u/JFOkIY9B',
  },
]

const notes = [
  'お一人様の購入枚数には上限がございます。',
  '在庫がなくなり次第、販売を終了いたします。',
  '購入後のキャンセル・返品はお受けできません。',
]

export default function ChekiPage() {
  return (
    <div className="min-h-screen bg-white flex flex-col">
      <div className="flex-1 flex flex-col justify-center max-w-md w-full mx-auto px-6 py-16">

        {/* ロゴ */}
        <AnimatedSection className="text-center mb-10">
          <p className="font-logo text-lg font-bold text-brand-black">garbery</p>
        </AnimatedSection>

        {/* ヘッダー */}
        <AnimatedSection className="text-center mb-12" delay={0.1}>
          <p className="text-[10px] tracking-widest2 text-brand-gray mb-3">POP-UP STORE</p>
          <h1 className="font-serif text-3xl md:text-4xl font-light tracking-widest text-brand-black mb-5">
            CHEKI
          </h1>
          <p className="text-xs text-brand-gray leading-loose">
            GARBERY POP-UP STORE限定のチェキを販売しています。<br />
            購入したいキャストとチェキの種類を選んでください。
          </p>
        </AnimatedSection>

        {/* 入場チケット */}
        <AnimatedSection delay={0.15} className="mb-14">
          <p className="text-[10px] tracking-widest2 text-brand-gray mb-5 text-center">TICKET</p>
          <StaggerContainer className="space-y-3">
            {tickets.map((ticket) => (
              <StaggerItem key={ticket.name}>
                <a
                  href={ticket.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary block w-full text-center py-4"
                >
                  <span className="block text-xs tracking-widest2">{ticket.name}</span>
                  <span className="block text-[10px] text-brand-gray mt-1">
                    {ticket.time}
                    {ticket.note && `（${ticket.note}）`}
                  </span>
                </a>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </AnimatedSection>

        {/* キャストごとの購入カード */}
        <p className="text-[10px] tracking-widest2 text-brand-gray mb-5 text-center">CHEKI</p>
        <StaggerContainer className="space-y-6 mb-14">
          {casts.map((cast) => (
            <StaggerItem key={cast.name}>
              <div className="border border-brand-border p-6">
                <div className="relative w-full aspect-[4/5] mb-4 overflow-hidden">
                  <Image
                    src={cast.image}
                    alt={cast.name}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 400px"
                  />
                </div>
                <p className="font-serif text-base font-light tracking-widest text-brand-black mb-4 text-center">
                  {cast.name}
                </p>
                <div className="flex flex-col gap-3">
                  <a
                    href={cast.deco}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-secondary block w-full text-center text-xs py-4"
                  >
                    デコりチェキ
                  </a>
                  <a
                    href={cast.normal}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-primary block w-full text-center text-xs py-4"
                  >
                    チェキ
                  </a>
                </div>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>

        {/* 注意事項 */}
        <AnimatedSection delay={0.3}>
          <div className="border-t border-brand-border pt-8">
            <p className="text-[10px] tracking-widest2 text-brand-gray mb-5 text-center">NOTES</p>
            <StaggerContainer className="space-y-3">
              {notes.map((note, i) => (
                <StaggerItem key={i}>
                  <p className="text-[11px] text-brand-gray leading-relaxed text-center">
                    {note}
                  </p>
                </StaggerItem>
              ))}
            </StaggerContainer>
          </div>
        </AnimatedSection>

      </div>
    </div>
  )
}
