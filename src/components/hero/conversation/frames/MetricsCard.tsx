'use client'

import { motion } from 'framer-motion'
import { FrameCard } from './FrameCard'

export function MetricsCard({
  title,
  bars,
  stats,
}: {
  title: string
  bars: number[]
  stats: { value: string; label: string }[]
}) {
  const max = Math.max(...bars)
  return (
    <FrameCard eyebrow={title}>
      <div className="flex h-14 items-end gap-1" aria-hidden>
        {bars.map((value, i) => (
          <motion.div
            key={i}
            data-bar
            className="flex-1 rounded-sm bg-accent/80 origin-bottom"
            style={{ height: `${(value / max) * 100}%` }}
            initial={{ scaleY: 0 }}
            animate={{ scaleY: 1 }}
            transition={{ delay: 0.06 * i, duration: 0.4, ease: 'easeOut' }}
          />
        ))}
      </div>
      <div className="mt-3 flex gap-5">
        {stats.map((stat) => (
          <div key={stat.label}>
            <p className="font-mono text-sm font-medium text-ink">{stat.value}</p>
            <p className="text-[11px] text-muted">{stat.label}</p>
          </div>
        ))}
      </div>
    </FrameCard>
  )
}
