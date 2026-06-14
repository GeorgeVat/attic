import type { ReactNode } from 'react'

export function FrameCard({ eyebrow, children }: { eyebrow: string; children: ReactNode }) {
  return (
    <div className="rounded-xl border border-hairline bg-white/85 p-4 shadow-[0_10px_28px_-18px_rgba(11,26,48,0.4)]">
      <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-muted">{eyebrow}</p>
      <div className="mt-3">{children}</div>
    </div>
  )
}
