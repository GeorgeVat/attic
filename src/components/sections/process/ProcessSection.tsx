import { SectionMarker } from '../SectionMarker'
import { Reveal } from '../Reveal'
import { PROCESS } from '@/data/content'

export function ProcessSection() {
  return (
    <section id="approach" className="mx-auto max-w-6xl scroll-mt-28 px-6 py-24">
      <Reveal>
        <SectionMarker label="Approach" />
        <h2 className="font-display mt-5 max-w-2xl text-4xl font-light leading-tight tracking-tight sm:text-5xl">
          A short path from <span className="italic text-accent">idea to live.</span>
        </h2>
      </Reveal>

      <div className="mt-16 grid gap-px overflow-hidden rounded-3xl border border-hairline bg-hairline sm:grid-cols-2 lg:grid-cols-4">
        {PROCESS.map((step, i) => (
          <Reveal key={step.title} delay={Math.min(i * 0.07, 0.3)} className="h-full">
            <div className="group flex h-full flex-col bg-card/85 p-7 backdrop-blur transition-colors hover:bg-card">
              <span className="font-display text-5xl font-light text-accent/25 transition-colors group-hover:text-accent/50">
                {String(i + 1).padStart(2, '0')}
              </span>
              <h3 className="font-display mt-5 text-xl font-semibold tracking-tight text-ink">
                {step.title}
              </h3>
              <p className="mt-2.5 text-sm leading-relaxed text-muted">{step.body}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  )
}
