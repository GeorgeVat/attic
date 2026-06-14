import Link from 'next/link'
import { ConversationCard } from './conversation/ConversationCard'
import { SCENARIOS } from './conversation/scenarios'
import { Magnetic } from '@/components/motion/Magnetic'
import { SITE } from '@/data/site'
import type { Locale } from '@/i18n/config'
import type { Dictionary } from '@/i18n/dictionaries'
import { localePath } from '@/i18n/routing'

export function HeroSection({ dict, locale }: { dict: Dictionary['hero']; locale: Locale }) {
  return (
    <section className="relative mx-auto grid max-w-6xl items-center gap-14 px-6 pb-24 pt-16 lg:grid-cols-[1.05fr_0.95fr] lg:gap-12 lg:pt-24">
      <div>
        <span className="btn-glass inline-flex items-center gap-2 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.18em] text-muted">
          <span
            className="size-1.5 rounded-full bg-accent animate-[ember-pulse_2.4s_ease-in-out_infinite]"
            aria-hidden
          />
          {dict.badge} · {SITE.city}
        </span>

        <h1 className="font-display mt-7 text-5xl font-light leading-[1.02] tracking-tight sm:text-6xl lg:text-7xl">
          {dict.titleLead} <span className="text-gradient font-semibold italic">{dict.titleHighlight}</span>
        </h1>

        <p className="mt-7 max-w-md text-lg leading-relaxed text-muted">{dict.body}</p>

        <div className="mt-10 flex flex-wrap items-center gap-4">
          <Magnetic className="inline-flex" strength={0.4}>
            <Link
              href={localePath(locale, '/contact')}
              className="btn-primary inline-flex items-center px-7 py-3.5 text-sm"
            >
              {dict.ctaPrimary}
            </Link>
          </Magnetic>
          <Magnetic className="inline-flex" strength={0.35}>
            <Link
              href={localePath(locale, '/work')}
              className="btn-glass inline-flex items-center px-6 py-3.5 text-sm"
            >
              {dict.ctaSecondary}
            </Link>
          </Magnetic>
        </div>

        <p className="mt-10 text-xs font-medium uppercase tracking-[0.18em] text-muted/80">
          {dict.tags}
        </p>
      </div>

      <ConversationCard scenarios={SCENARIOS} />
    </section>
  )
}
