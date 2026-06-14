import type { Metadata } from 'next'
import Link from 'next/link'
import { WorkRow } from '@/components/sections/selected-work/WorkRow'
import { Reveal } from '@/components/sections/Reveal'
import { SectionMarker } from '@/components/sections/SectionMarker'
import { ogDefaults } from '@/lib/og'
import { PROJECTS } from '@/data/content'

export const metadata: Metadata = {
  title: 'Work',
  description:
    'Selected projects — custom ecommerce, ticketing, AI automation, hospitality systems and websites, designed and built end to end.',
  alternates: { canonical: '/work' },
  openGraph: { ...ogDefaults, url: '/work' },
}

export default function WorkPage() {
  return (
    <main id="main" className="mx-auto max-w-6xl px-6 pb-24 pt-28">
      <Reveal>
        <SectionMarker label="Work" />
        <h1 className="font-display mt-6 max-w-3xl text-5xl font-light leading-[1.02] tracking-tight sm:text-6xl">
          Systems shaped around the <span className="italic text-accent">business behind them.</span>
        </h1>
        <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted">
          A selection of recent builds across commerce, ticketing, automation and the web — each
          designed, built and run end to end.
        </p>
      </Reveal>

      <div className="mt-20 space-y-24">
        {PROJECTS.map((project, i) => (
          <WorkRow key={project.slug || project.title} project={project} index={i} />
        ))}
      </div>

      <Reveal className="mt-24">
        <div className="glass flex flex-col items-start gap-5 rounded-3xl p-8 sm:flex-row sm:items-center sm:justify-between sm:p-10">
          <p className="font-display text-2xl font-semibold tracking-tight text-ink">
            Have something in mind?
          </p>
          <Link href="/contact" className="btn-primary inline-flex items-center px-7 py-3.5 text-sm">
            Start a project
          </Link>
        </div>
      </Reveal>
    </main>
  )
}
