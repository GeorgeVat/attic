import type { Metadata } from 'next'
import { ContactForm } from '@/components/sections/contact/ContactForm'
import { Reveal } from '@/components/sections/Reveal'
import { SectionMarker } from '@/components/sections/SectionMarker'
import { ogDefaults } from '@/lib/og'
import { CONTENT } from '@/data/content'
import { SITE } from '@/data/site'

export const metadata: Metadata = {
  title: 'Contact',
  description:
    'Tell us what your business is missing — we reply within 24–48 hours with questions, a shape, and an honest estimate.',
  alternates: { canonical: '/contact' },
  openGraph: { ...ogDefaults, url: '/contact' },
}

export default function ContactPage() {
  const types = (CONTENT.contactTypes ?? []).map((row) => row.type)

  return (
    <main id="main" className="mx-auto max-w-6xl px-6 pb-24 pt-28">
      <div className="grid gap-12 lg:grid-cols-[1fr_1.2fr] lg:gap-20">
        <div>
          <SectionMarker label="Contact" />
          <h1 className="font-display mt-6 text-5xl font-light leading-[1.02] tracking-tight sm:text-6xl">
            Tell us what&rsquo;s <span className="italic text-accent">missing.</span>
          </h1>
          <p className="mt-6 max-w-sm text-base leading-relaxed text-muted">
            A rough idea is enough. We&rsquo;ll come back with questions, a shape, and an honest
            estimate — within 24–48 hours.
          </p>
          <dl className="mt-10 space-y-5">
            <div>
              <dt className="text-xs font-semibold uppercase tracking-[0.16em] text-muted">Email</dt>
              <dd className="mt-1.5">
                <a
                  href={`mailto:${SITE.email}`}
                  className="font-medium text-ink transition-colors hover:text-accent"
                >
                  {SITE.email}
                </a>
              </dd>
            </div>
            <div>
              <dt className="text-xs font-semibold uppercase tracking-[0.16em] text-muted">Studio</dt>
              <dd className="mt-1.5 font-medium text-ink">{SITE.location}</dd>
            </div>
            <div>
              <dt className="text-xs font-semibold uppercase tracking-[0.16em] text-muted">
                Elsewhere
              </dt>
              <dd className="mt-1.5">
                <a
                  href={SITE.linkedin}
                  rel="noopener"
                  target="_blank"
                  className="font-medium text-ink transition-colors hover:text-accent"
                >
                  LinkedIn
                </a>
              </dd>
            </div>
          </dl>
        </div>
        <Reveal>
          <div className="glass rounded-3xl p-6 sm:p-8">
            <ContactForm challengeTypes={types} />
          </div>
        </Reveal>
      </div>
    </main>
  )
}
