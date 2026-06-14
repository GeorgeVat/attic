import Link from 'next/link'
import { SectionMarker } from '../SectionMarker'
import { Reveal } from '../Reveal'
import { WorkRow } from './WorkRow'
import type { ProjectRowData } from './projectRowData'

export function SelectedWorkSection({ projects }: { projects: ProjectRowData[] }) {
  if (projects.length === 0) return null
  const featured = projects.slice(0, 3)

  return (
    <section id="selected-work" className="mx-auto max-w-6xl scroll-mt-28 px-6 py-24">
      <Reveal>
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <SectionMarker label="Selected work" />
            <h2 className="font-display mt-5 max-w-2xl text-4xl font-light leading-tight tracking-tight sm:text-5xl">
              Work shaped around the <span className="italic text-accent">business behind it.</span>
            </h2>
          </div>
          <Link href="/work" className="btn-glass inline-flex items-center px-5 py-2.5 text-sm">
            View all work →
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
