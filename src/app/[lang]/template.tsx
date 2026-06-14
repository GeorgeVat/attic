'use client'

import { motion, MotionConfig } from 'framer-motion'
import { useEffect, type ReactNode } from 'react'

// Module-level flag: false during the very first page load (server render +
// hydration pass), true once any template instance has mounted. On the first
// load we render a plain div — no inline `opacity:0` in the server HTML, so
// the h1/LCP paints immediately. `next/navigation` re-mounts template.tsx on
// every client-side navigation, so subsequent mounts get the fade-up.
let hasNavigated = false

export default function Template({ children }: { children: ReactNode }) {
  const animate = hasNavigated

  useEffect(() => {
    hasNavigated = true
  }, [])

  if (!animate) {
    return <MotionConfig reducedMotion="user">{children}</MotionConfig>
  }

  return (
    <MotionConfig reducedMotion="user">
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35, ease: 'easeOut' }}
      >
        {children}
      </motion.div>
    </MotionConfig>
  )
}
