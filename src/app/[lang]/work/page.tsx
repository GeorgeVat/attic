import type { Metadata } from 'next'
import Link from 'next/link'
import { WorkRow } from '@/components/sections/selected-work/WorkRow'
import { Reveal } from '@/components/sections/Reveal'
import { SectionMarker } from '@/components/sections/SectionMarker'
import { ogDefaults } from '@/lib/og'
import { getProjects } from '@/data/content'
import { defaultLocale, isLocale } from '@/i18n/config'
import { getDictionary } from '@/i18n/dictionaries'
import { localePath } from '@/i18n/routing'

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>
}): Promise<Metadata> {
  const { lang } = await params
  const locale = isLocale(lang) ? lang : defaultLocale
  const dict = getDictionary(locale)
  const base = locale === defaultLocale ? '/work' : `/${locale}/work`

  return {
    title: dict.workPage.metaTitle,
    description: dict.workPage.metaDescription,
    alternates: {
      canonical: base,
      languages: { el: '/work', en: '/en/work', 'x-default': '/work' },
    },
    openGraph: { ...ogDefaults, url: base },
  }
}

export default async function WorkPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params
  const locale = isLocale(lang) ? lang : defaultLocale
  const dict = getDictionary(locale)
  const w = dict.workPage
  const projects = getProjects(dict)

  return (
    <main id="main" className="mx-auto max-w-6xl px-6 pb-24 pt-28">
      <Reveal>
        <SectionMarker label={w.marker} />
        <h1 className="font-display mt-6 max-w-3xl text-5xl font-light leading-[1.02] tracking-tight sm:text-6xl">
          {w.titleLead} <span className="italic text-accent">{w.titleHighlight}</span>
        </h1>
        <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted">{w.body}</p>
      </Reveal>

      <div className="mt-20 space-y-24">
        {projects.map((project, i) => (
          <WorkRow key={project.slug || project.title} project={project} index={i} />
        ))}
      </div>

      <Reveal className="mt-24">
        <div className="glass flex flex-col items-start gap-5 rounded-3xl p-8 sm:flex-row sm:items-center sm:justify-between sm:p-10">
          <p className="font-display text-2xl font-semibold tracking-tight text-ink">{w.ctaTitle}</p>
          <Link
            href={localePath(locale, '/contact')}
            className="btn-primary inline-flex items-center px-7 py-3.5 text-sm"
          >
            {w.cta}
          </Link>
        </div>
      </Reveal>
    </main>
  )
}
