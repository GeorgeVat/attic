import { SectionMarker } from '../SectionMarker'
import { Reveal } from '../Reveal'
import { SERVICE_ICONS } from './serviceIcons'
import type { Dictionary } from '@/i18n/dictionaries'

const ICON_ORDER = ['web', 'systems', 'ai', 'commerce', 'design', 'partnership']

export function ServicesSection({ dict }: { dict: Dictionary['services'] }) {
  if (!dict.items.length) return null

  return (
    <section id="services" className="mx-auto max-w-6xl scroll-mt-28 px-6 py-24">
      <Reveal>
        <SectionMarker label={dict.marker} />
        <h2 className="font-display mt-5 max-w-2xl text-4xl font-light leading-tight tracking-tight sm:text-5xl">
          {dict.titleLead} <span className="italic text-accent">{dict.titleHighlight}</span>
        </h2>
      </Reveal>

      <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {dict.items.map((service, i) => {
          const Icon = SERVICE_ICONS[ICON_ORDER[i]]
          return (
            <Reveal key={service.title} delay={Math.min(i * 0.05, 0.25)} className="h-full">
              <div className="group glass flex h-full flex-col gap-5 rounded-3xl p-7 transition-transform duration-300 hover:-translate-y-1.5">
                {Icon && (
                  <span className="inline-flex size-12 items-center justify-center rounded-2xl bg-gradient-to-br from-accent to-sky text-white shadow-[0_14px_28px_-12px_rgba(31,90,95,0.8)]">
                    <Icon aria-hidden strokeWidth={1.75} className="size-5" />
                  </span>
                )}
                <div>
                  <h3 className="font-display text-xl font-semibold tracking-tight text-ink">
                    {service.title}
                  </h3>
                  <p className="mt-2.5 text-sm leading-relaxed text-muted">{service.description}</p>
                </div>
              </div>
            </Reveal>
          )
        })}
      </div>
    </section>
  )
}
