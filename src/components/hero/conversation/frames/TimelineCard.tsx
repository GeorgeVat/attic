'use client'

import { motion } from 'framer-motion'
import { FrameCard } from './FrameCard'

export function TimelineCard({
  title,
  steps,
  caption,
}: {
  title: string
  steps: { label: string; detail: string }[]
  caption: string
}) {
  return (
    <FrameCard eyebrow={title}>
      <ol className="relative space-y-2.5 pl-1">
        <motion.span
          aria-hidden
          className="absolute bottom-1 left-[3px] top-1 w-px origin-top bg-hairline"
          initial={{ scaleY: 0 }}
          animate={{ scaleY: 1 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
        />
        {steps.map((step, i) => (
          <motion.li
            key={step.label}
            className="relative flex items-baseline gap-3 pl-4"
            initial={{ opacity: 0, x: -6 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 * i, duration: 0.35 }}
          >
            <span aria-hidden className="absolute left-0 top-1 size-[7px] rounded-full border border-accent bg-card" />
            <span className="font-mono text-[10px] text-accent">{String(i + 1).padStart(2, '0')}</span>
            <span className="text-xs font-medium text-ink">{step.label}</span>
            <span className="text-[11px] text-muted">{step.detail}</span>
          </motion.li>
        ))}
      </ol>
      <p className="mt-3 font-mono text-[10px] text-muted">{caption}</p>
    </FrameCard>
  )
}
