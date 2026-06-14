import { SectionMarker } from '../SectionMarker'
import { Reveal } from '../Reveal'
import { TESTIMONIALS } from '@/data/content'

export function TestimonialsSection() {
  return (
    <section className="mx-auto max-w-6xl px-6 py-24">
      <Reveal>
        <SectionMarker label="Words" />
        <h2 className="font-display mt-5 max-w-2xl text-4xl font-light leading-tight tracking-tight sm:text-5xl">
          What partners say <span className="italic text-accent">after launch.</span>
        </h2>
      </Reveal>

      <div className="mt-14 grid gap-5 lg:grid-cols-3">
        {TESTIMONIALS.map((t, i) => (
          <Reveal key={t.name} delay={Math.min(i * 0.08, 0.3)} className="h-full">
            <figure className="glass flex h-full flex-col rounded-3xl p-7">
              <span aria-hidden className="font-display text-5xl leading-none text-accent/30">
                &ldquo;
              </span>
              <blockquote className="mt-2 flex-1 font-display text-lg font-light italic leading-relaxed text-ink">
                {t.quote}
              </blockquote>
              <figcaption className="mt-6 border-t border-hairline pt-4">
                <p className="text-sm font-semibold text-ink">{t.name}</p>
                <p className="text-xs text-muted">{t.role}</p>
              </figcaption>
            </figure>
          </Reveal>
        ))}
      </div>
    </section>
  )
}
