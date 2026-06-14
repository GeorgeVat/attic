import { TRUST } from '@/data/content'
import type { Dictionary } from '@/i18n/dictionaries'

export function TrustMarquee({ dict }: { dict: Dictionary['trust'] }) {
  // Duplicate the list so the -50% translate loops seamlessly.
  const items = [...TRUST, ...TRUST]

  return (
    <section aria-label={dict.aria} className="py-10">
      <p className="mb-7 text-center text-xs font-semibold uppercase tracking-[0.22em] text-muted">
        {dict.label}
      </p>
      <div className="relative overflow-hidden [mask-image:linear-gradient(to_right,transparent,#000_12%,#000_88%,transparent)]">
        <div className="marquee-track gap-14 px-7">
          {items.map((name, i) => (
            <span
              key={`${name}-${i}`}
              className="font-display text-2xl font-semibold tracking-tight text-ink/35 transition-colors hover:text-ink/70"
            >
              {name}
            </span>
          ))}
        </div>
      </div>
    </section>
  )
}
