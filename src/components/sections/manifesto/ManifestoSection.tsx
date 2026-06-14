import Image from 'next/image'
import { Reveal } from '../Reveal'
import { SectionMarker } from '../SectionMarker'
import type { Dictionary } from '@/i18n/dictionaries'

export function ManifestoSection({ dict }: { dict: Dictionary['manifesto'] }) {
  const lines = dict.lines
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
            <SectionMarker label={dict.marker} />
          </Reveal>
          <div className="mt-8 max-w-3xl">
            {lines.map((line, i) => (
              <Reveal key={i} delay={i * 0.12}>
                <p className="font-display text-3xl font-light leading-snug tracking-tight text-ink sm:text-4xl lg:text-[2.75rem]">
                  {line}
                </p>
              </Reveal>
            ))}
          </div>

          {dict.paragraph2 && (
            <Reveal delay={0.4}>
              <p className="mt-9 max-w-xl text-base leading-relaxed text-muted">
                {dict.paragraph2}
              </p>
            </Reveal>
          )}

          <Reveal delay={0.2} className="mt-12">
            <figure className="group relative overflow-hidden rounded-3xl border border-white/60 shadow-[0_40px_80px_-44px_rgba(18,37,36,0.5)]">
              <Image
                src="/studio.jpg"
                alt={dict.imageAlt}
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
            {dict.principles.map((p, i) => (
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
