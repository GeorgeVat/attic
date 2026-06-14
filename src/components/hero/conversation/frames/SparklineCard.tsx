'use client'

import { motion } from 'framer-motion'
import { FrameCard } from './FrameCard'

export function SparklineCard({
  title,
  points,
  stats,
}: {
  title: string
  points: number[]
  stats: { value: string; label: string }[]
}) {
  const max = Math.max(...points)
  const coords = points
    .map((p, i) => `${(i / (points.length - 1)) * 100},${30 - (p / max) * 28}`)
    .join(' ')

  return (
    <FrameCard eyebrow={title}>
      <svg viewBox="0 0 100 32" className="h-14 w-full" preserveAspectRatio="none" aria-hidden>
        <motion.polyline
          points={coords}
          fill="none"
          stroke="var(--color-accent)"
          strokeWidth="1.5"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 1.1, ease: 'easeInOut' }}
        />
      </svg>
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
