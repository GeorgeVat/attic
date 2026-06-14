'use client'

import { motion, useReducedMotion } from 'framer-motion'
import type { ReactNode } from 'react'

type Direction = 'up' | 'down' | 'left' | 'right' | 'none'

const OFFSET: Record<Direction, { x: number; y: number }> = {
  up: { x: 0, y: 22 },
  down: { x: 0, y: -22 },
  left: { x: 28, y: 0 },
  right: { x: -28, y: 0 },
  none: { x: 0, y: 0 },
}

// A confident, weighted ease-out (mirrors --ease-out-soft in styles.css).
const EASE = [0.22, 1, 0.36, 1] as const

/**
 * Scroll-into-view reveal. Content rises and resolves out of a soft blur — a
 * "developing photograph" feel that suits the archive aesthetic. Backward
 * compatible: existing `delay`/`className` callers keep working unchanged.
 */
export function Reveal({
  children,
  delay = 0,
  direction = 'up',
  blur = true,
  className,
}: {
  children: ReactNode
  delay?: number
  direction?: Direction
  blur?: boolean
  className?: string
}) {
  const reduced = useReducedMotion()
  const { x, y } = OFFSET[direction]

  // useReducedMotion() is null on the server — keep the rendered tree identical
  // on both passes (always motion.div) and only zero out the transition,
  // otherwise reduced-motion clients hit a hydration mismatch.
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, x, y, filter: blur ? 'blur(8px)' : 'blur(0px)' }}
      whileInView={{ opacity: 1, x: 0, y: 0, filter: 'blur(0px)' }}
      viewport={{ once: true, margin: '-80px' }}
      transition={reduced ? { duration: 0 } : { duration: 0.7, ease: EASE, delay }}
    >
      {children}
    </motion.div>
  )
}
