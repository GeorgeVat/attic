import type { Metadata } from 'next'
import { ContactForm } from '@/components/sections/contact/ContactForm'
import { Reveal } from '@/components/sections/Reveal'
import { SectionMarker } from '@/components/sections/SectionMarker'
import { ogDefaults } from '@/lib/og'
import { SITE } from '@/data/site'
import { defaultLocale, isLocale } from '@/i18n/config'
import { getDictionary } from '@/i18n/dictionaries'

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>
}): Promise<Metadata> {
  const { lang } = await params
  const locale = isLocale(lang) ? lang : defaultLocale
  const dict = getDictionary(locale)
  const base = locale === defaultLocale ? '/contact' : `/${locale}/contact`

  return {
    title: dict.contactPage.metaTitle,
    description: dict.contactPage.metaDescription,
    alternates: {
      canonical: base,
      languages: { el: '/contact', en: '/en/contact', 'x-default': '/contact' },
    },
    openGraph: { ...ogDefaults, url: base },
  }
}

export default async function ContactPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params
  const locale = isLocale(lang) ? lang : defaultLocale
  const dict = getDictionary(locale)
  const c = dict.contactPage

  return (
    <main id="main" className="mx-auto max-w-6xl px-6 pb-24 pt-28">
      <div className="grid gap-12 lg:grid-cols-[1fr_1.2fr] lg:gap-20">
        <div>
          <SectionMarker label={c.marker} />
          <h1 className="font-display mt-6 text-5xl font-light leading-[1.02] tracking-tight sm:text-6xl">
            {c.titleLead} <span className="italic text-accent">{c.titleHighlight}</span>
          </h1>
          <p className="mt-6 max-w-sm text-base leading-relaxed text-muted">{c.body}</p>
          <dl className="mt-10 space-y-5">
            <div>
              <dt className="text-xs font-semibold uppercase tracking-[0.16em] text-muted">
                {c.emailLabel}
              </dt>
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
              <dt className="text-xs font-semibold uppercase tracking-[0.16em] text-muted">
                {c.studioLabel}
              </dt>
              <dd className="mt-1.5 font-medium text-ink">{SITE.location}</dd>
            </div>
            <div>
              <dt className="text-xs font-semibold uppercase tracking-[0.16em] text-muted">
                {c.elsewhereLabel}
              </dt>
              <dd className="mt-1.5">
                <a
                  href={SITE.linkedin}
                  rel="noopener"
                  target="_blank"
                  className="font-medium text-ink transition-colors hover:text-accent"
                >
                  {dict.footer.linkedin}
                </a>
              </dd>
            </div>
          </dl>
        </div>
        <Reveal>
          <div className="glass rounded-3xl p-6 sm:p-8">
            <ContactForm dict={dict.contactForm} />
          </div>
        </Reveal>
      </div>
    </main>
  )
}
