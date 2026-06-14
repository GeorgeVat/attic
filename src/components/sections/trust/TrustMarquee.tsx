import { TRUST } from '@/data/content'

export function TrustMarquee() {
  // Duplicate the list so the -50% translate loops seamlessly.
  const items = [...TRUST, ...TRUST]

  return (
    <section aria-label="Selected clients" className="py-10">
      <p className="mb-7 text-center text-xs font-semibold uppercase tracking-[0.22em] text-muted">
        Trusted by teams across commerce, events &amp; hospitality
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
