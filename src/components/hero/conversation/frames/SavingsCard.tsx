'use client'

import { motion } from 'framer-motion'
import { FrameCard } from './FrameCard'

function ComparisonRow({ label, value, accent, delay }: { label: string; value: number; accent?: boolean; delay: number }) {
  return (
    <div>
      <div className="flex items-baseline justify-between">
        <span className="text-[11px] text-muted">{label}</span>
        <span className="font-mono text-[10px] text-muted">{value}%</span>
      </div>
      <div className="mt-1 h-1.5 rounded-full bg-paper">
        <motion.div
          className={`h-full rounded-full ${accent ? 'bg-accent' : 'bg-ink/30'}`}
          initial={{ width: 0 }}
          animate={{ width: `${value}%` }}
          transition={{ delay, duration: 0.7, ease: 'easeOut' }}
        />
      </div>
    </div>
  )
}

export function SavingsCard({
  title,
  headline,
  before,
  after,
}: {
  title: string
  headline: string
  before: { label: string; value: number }
  after: { label: string; value: number }
}) {
  return (
    <FrameCard eyebrow={title}>
      <p className="font-display text-2xl text-ink">{headline}</p>
      <div className="mt-3 space-y-2.5">
        <ComparisonRow label={before.label} value={before.value} delay={0.2} />
        <ComparisonRow label={after.label} value={after.value} accent delay={0.45} />
      </div>
    </FrameCard>
  )
}
