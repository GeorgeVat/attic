import Link from 'next/link'
import { SectionMarker } from '../SectionMarker'
import { Reveal } from '../Reveal'
import { WorkRow } from './WorkRow'
import type { ProjectRowData } from './projectRowData'
import type { Locale } from '@/i18n/config'
import type { Dictionary } from '@/i18n/dictionaries'
import { localePath } from '@/i18n/routing'

export function SelectedWorkSection({
  dict,
  projects,
  locale,
}: {
  dict: Dictionary['selectedWork']
  projects: ProjectRowData[]
  locale: Locale
}) {
  if (projects.length === 0) return null
  const featured = projects.slice(0, 3)

  return (
    <section id="selected-work" className="mx-auto max-w-6xl scroll-mt-28 px-6 py-24">
      <Reveal>
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <SectionMarker label={dict.marker} />
            <h2 className="font-display mt-5 max-w-2xl text-4xl font-light leading-tight tracking-tight sm:text-5xl">
              {dict.titleLead} <span className="italic text-accent">{dict.titleHighlight}</span>
            </h2>
          </div>
          <Link href={localePath(locale, '/work')} className="btn-glass inline-flex items-center px-5 py-2.5 text-sm">
            {dict.viewAll}
          </Link>
        </div>
      </Reveal>

      <div className="mt-20 space-y-24">
        {featured.map((project, i) => (
          <WorkRow key={project.slug || project.title} project={project} index={i} />
        ))}
      </div>
    </section>
  )
}
