import type { Content } from '@/data/types'
import { SectionMarker } from '../SectionMarker'
import { Reveal } from '../Reveal'
import { FaqItem } from './FaqItem'

export function FaqSection({ faq }: { faq: Content['faq'] }) {
  if (!faq?.items?.length) return null

  return (
    <section className="mx-auto max-w-6xl px-6 py-24">
      <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
        <Reveal>
          <div className="lg:sticky lg:top-28">
            <SectionMarker label={faq.eyebrow || 'Questions'} />
            <h2 className="font-display mt-5 text-4xl font-light leading-tight tracking-tight sm:text-5xl">
              {faq.heading || 'Frequently asked'}
            </h2>
            <p className="mt-5 max-w-xs text-sm leading-relaxed text-muted">
              Still unsure? Tell us what you&rsquo;re building and we&rsquo;ll answer directly.
            </p>
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="flex flex-col gap-3">
            {faq.items.map((item) => (
              <FaqItem key={item.id ?? item.question} question={item.question} answer={item.answer} />
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  )
}
