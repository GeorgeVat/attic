/** A small accent kicker above a section heading. `index` is accepted for
 *  backwards compatibility but no longer rendered. */
export function SectionMarker({ index: _index, label }: { index?: string; label: string }) {
  return (
    <div className="flex items-center gap-3">
      <span aria-hidden className="h-px w-10 bg-gradient-to-r from-accent to-transparent" />
      <span className="text-xs font-semibold uppercase tracking-[0.28em] text-accent">{label}</span>
    </div>
  )
}
