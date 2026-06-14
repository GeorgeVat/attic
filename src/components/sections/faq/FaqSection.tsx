import { SectionMarker } from '../SectionMarker'
import { Reveal } from '../Reveal'
import { FaqItem } from './FaqItem'
import type { Dictionary } from '@/i18n/dictionaries'

export function FaqSection({ dict }: { dict: Dictionary['faq'] }) {
  if (!dict.items.length) return null

  return (
    <section className="mx-auto max-w-6xl px-6 py-24">
      <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
        <Reveal>
          <div className="lg:sticky lg:top-28">
            <SectionMarker label={dict.eyebrow} />
            <h2 className="font-display mt-5 text-4xl font-light leading-tight tracking-tight sm:text-5xl">
              {dict.heading}
            </h2>
            <p className="mt-5 max-w-xs text-sm leading-relaxed text-muted">{dict.note}</p>
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="flex flex-col gap-3">
            {dict.items.map((item) => (
              <FaqItem key={item.question} question={item.question} answer={item.answer} />
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  )
}
