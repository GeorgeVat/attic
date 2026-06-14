import Image from 'next/image'
import type { Content } from '@/data/types'
import { Reveal } from '../Reveal'
import { SectionMarker } from '../SectionMarker'

const PRINCIPLES = [
  { title: 'Senior team, no juniors', body: 'Every line is written by people who have shipped real products.' },
  { title: 'Code you own outright', body: 'Clean, documented, no lock-in — the system is yours, not ours.' },
  { title: 'Weeks, not quarters', body: 'Tight feedback loops mean you see working software fast.' },
]

export function ManifestoSection({ manifesto }: { manifesto: Content['manifesto'] }) {
  const lines = manifesto?.paragraph1 ?? []
  if (lines.length === 0) return null

  return (
    <section id="studio" className="mx-auto max-w-6xl scroll-mt-28 px-4 py-24">
      <div
        className="relative overflow-hidden rounded-[2.5rem] border border-white/60 px-7 py-16 shadow-[0_50px_100px_-60px_rgba(18,37,36,0.55)] sm:px-14 sm:py-20"
        style={{
          background:
            'linear-gradient(160deg, #fbfdfb 0%, #e6f1ee 45%, #def0f0 100%)',
        }}
      >
        {/* soft glow accents */}
        <div
          aria-hidden
          className="absolute -right-16 -top-20 size-72 rounded-full opacity-60 blur-3xl"
          style={{ background: 'radial-gradient(circle, rgba(52,194,212,0.45), transparent 70%)' }}
        />
        <div
          aria-hidden
          className="absolute -bottom-24 -left-16 size-80 rounded-full opacity-50 blur-3xl"
          style={{ background: 'radial-gradient(circle, rgba(49,105,109,0.45), transparent 70%)' }}
        />

        <div className="relative">
          <Reveal>
            <SectionMarker label="Studio" />
          </Reveal>
          <div className="mt-8 max-w-3xl">
            {lines.map((row, i) => (
              <Reveal key={row.id ?? i} delay={i * 0.12}>
                <p className="font-display text-3xl font-light leading-snug tracking-tight text-ink sm:text-4xl lg:text-[2.75rem]">
                  {row.line}
                </p>
              </Reveal>
            ))}
          </div>

          {manifesto?.paragraph2 && (
            <Reveal delay={0.4}>
              <p className="mt-9 max-w-xl text-base leading-relaxed text-muted">
                {manifesto.paragraph2}
              </p>
            </Reveal>
          )}

          <Reveal delay={0.2} className="mt-12">
            <figure className="group relative overflow-hidden rounded-3xl border border-white/60 shadow-[0_40px_80px_-44px_rgba(18,37,36,0.5)]">
              <Image
                src="/studio.jpg"
                alt="The ATTIC studio — the wordmark on the wall, branding across the workspace"
                width={1408}
                height={768}
                sizes="(min-width: 1024px) 60rem, 92vw"
                className="h-auto w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
              />
              <div
                aria-hidden
                className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink/15 via-transparent to-transparent"
              />
            </figure>
          </Reveal>

          <div className="mt-12 grid gap-4 sm:grid-cols-3">
            {PRINCIPLES.map((p, i) => (
              <Reveal key={p.title} delay={0.1 + i * 0.08}>
                <div className="glass h-full rounded-2xl p-6">
                  <p className="font-display text-lg font-semibold tracking-tight text-ink">
                    {p.title}
                  </p>
                  <p className="mt-2 text-sm leading-relaxed text-muted">{p.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
