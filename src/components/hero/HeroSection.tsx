import Link from 'next/link'
import { ConversationCard } from './conversation/ConversationCard'
import { SCENARIOS } from './conversation/scenarios'
import { SITE } from '@/data/site'

export function HeroSection() {
  return (
    <section className="relative mx-auto grid max-w-6xl items-center gap-14 px-6 pb-24 pt-16 lg:grid-cols-[1.05fr_0.95fr] lg:gap-12 lg:pt-24">
      <div>
        <span className="btn-glass inline-flex items-center gap-2 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.18em] text-muted">
          <span className="size-1.5 rounded-full bg-accent" aria-hidden />
          Software studio · {SITE.city}
        </span>

        <h1 className="font-display mt-7 text-5xl font-light leading-[1.02] tracking-tight sm:text-6xl lg:text-7xl">
          Software, <span className="text-gradient font-semibold italic">built to fit.</span>
        </h1>

        <p className="mt-7 max-w-md text-lg leading-relaxed text-muted">
          Custom ecommerce platforms, ticketing systems, AI automation &amp; websites — designed,
          built and run end to end by a small senior team.
        </p>

        <div className="mt-10 flex flex-wrap items-center gap-4">
          <Link
            href="/contact"
            className="btn-primary inline-flex items-center px-7 py-3.5 text-sm"
          >
            Start a project
          </Link>
          <Link href="/work" className="btn-glass inline-flex items-center px-6 py-3.5 text-sm">
            See our work
          </Link>
        </div>

        <p className="mt-10 text-xs font-medium uppercase tracking-[0.18em] text-muted/80">
          Commerce · Ticketing · AI automation · Hospitality · Web
        </p>
      </div>

      <ConversationCard scenarios={SCENARIOS} />
    </section>
  )
}
