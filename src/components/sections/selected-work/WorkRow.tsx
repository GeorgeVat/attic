import Image from 'next/image'
import { Reveal } from '../Reveal'
import type { ProjectRowData } from './projectRowData'

export function WorkRow({ project, index }: { project: ProjectRowData; index: number }) {
  const flipped = index % 2 === 1

  const panel = (
    <div
      className="group relative aspect-[5/4] overflow-hidden rounded-[1.75rem] border border-white/60 shadow-[0_40px_80px_-44px_rgba(18,37,36,0.55)]"
      style={{ backgroundImage: project.tint ?? 'linear-gradient(135deg,#31696d,#34c2d4)' }}
    >
      {project.imageUrl && (
        <Image
          src={project.imageUrl}
          alt={project.imageAlt ?? project.title}
          fill
          sizes="(min-width: 1024px) 46vw, 92vw"
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.05]"
        />
      )}
      {/* readability scrim */}
      <div
        aria-hidden
        className="absolute inset-0 bg-gradient-to-t from-ink/70 via-ink/10 to-transparent"
      />
      <span className="absolute left-6 top-6 rounded-full bg-white/15 px-3 py-1 text-xs font-semibold uppercase tracking-[0.16em] text-white backdrop-blur-md">
        {project.type}
      </span>
      <div className="absolute inset-x-5 bottom-5 translate-y-2 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
        <p className="rounded-2xl bg-white/15 px-4 py-3 text-sm leading-snug text-white backdrop-blur-md">
          {project.impact}
        </p>
      </div>
    </div>
  )

  const text = (
    <div className={flipped ? 'lg:pr-8' : 'lg:pl-8'}>
      <span className="font-display text-5xl font-light text-accent/30">
        {String(index + 1).padStart(2, '0')}
      </span>
      <h3 className="font-display mt-3 text-3xl font-semibold tracking-tight text-ink sm:text-4xl">
        {project.title}
      </h3>
      <p className="mt-2 text-sm font-medium uppercase tracking-[0.14em] text-muted">
        {project.client} · {project.year}
      </p>
      <p className="mt-5 max-w-md text-base leading-relaxed text-muted">{project.impact}</p>
    </div>
  )

  return (
    <Reveal className="grid items-center gap-8 lg:grid-cols-2 lg:gap-14">
      {flipped ? (
        <>
          <div className="order-1 lg:order-2">{panel}</div>
          <div className="order-2 lg:order-1">{text}</div>
        </>
      ) : (
        <>
          {panel}
          {text}
        </>
      )}
    </Reveal>
  )
}
