'use client'

import { Fragment } from 'react'
import { motion } from 'framer-motion'
import { FrameCard } from './FrameCard'

function Connector({ pulse }: { pulse?: boolean }) {
  return (
    <span className="relative h-px min-w-5 flex-1 shrink-0" aria-hidden>
      <span className="absolute inset-x-0 top-0 border-t border-dashed border-muted/50" />
      {pulse && (
        <motion.span
          className="absolute -top-[2.5px] left-0 size-1.5 rounded-full bg-accent"
          animate={{ left: ['0%', '90%'], opacity: [0, 1, 0] }}
          transition={{ duration: 1.4, repeat: Infinity, ease: 'easeInOut' }}
        />
      )}
    </span>
  )
}

export function FlowDiagramCard({
  title,
  nodes,
  caption,
  pulse,
}: {
  title: string
  nodes: string[]
  caption: string
  pulse?: boolean
}) {
  return (
    <FrameCard eyebrow={title}>
      <div className="flex items-center gap-2">
        {nodes.map((node, i) => (
          <Fragment key={node}>
            {i > 0 && <Connector pulse={pulse} />}
            <motion.span
              initial={{ opacity: 0, scale: 0.92 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.15 * i, duration: 0.3 }}
              className="rounded-md border border-hairline bg-paper px-2.5 py-1.5 text-center font-mono text-[10px] uppercase tracking-wide"
            >
              {node}
            </motion.span>
          </Fragment>
        ))}
      </div>
      <p className="mt-3 text-xs text-muted">{caption}</p>
    </FrameCard>
  )
}
