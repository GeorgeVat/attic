'use client'

import { motion, useReducedMotion } from 'framer-motion'
import type { ReactNode } from 'react'

export function Reveal({
  children,
  delay = 0,
  className,
}: {
  children: ReactNode
  delay?: number
  className?: string
}) {
  const reduced = useReducedMotion()
  // useReducedMotion() is null on the server — keep the rendered tree identical
  // on both passes (always motion.div) and only zero out the transition, otherwise
  // reduced-motion clients hit a hydration mismatch.
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={reduced ? { duration: 0 } : { duration: 0.55, ease: 'easeOut', delay }}
    >
      {children}
    </motion.div>
  )
}
