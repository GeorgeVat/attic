'use client'

import { motion, useMotionValue, useSpring, useReducedMotion } from 'framer-motion'
import { useRef, type ReactNode } from 'react'

/**
 * Wraps an interactive element (typically a CTA) and gives it a subtle magnetic
 * pull toward the cursor — the element leans into the pointer and springs back
 * on leave. Purely decorative: disabled under prefers-reduced-motion and on
 * touch (no hover), so the underlying link/button is unaffected.
 */
export function Magnetic({
  children,
  strength = 0.3,
  className,
}: {
  children: ReactNode
  /** 0–1; how far the element follows the cursor relative to the offset. */
  strength?: number
  className?: string
}) {
  const reduced = useReducedMotion()
  const ref = useRef<HTMLDivElement>(null)
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const spring = { stiffness: 220, damping: 16, mass: 0.35 }
  const sx = useSpring(x, spring)
  const sy = useSpring(y, spring)

  function handleMove(e: React.MouseEvent<HTMLDivElement>) {
    if (reduced || !ref.current) return
    const rect = ref.current.getBoundingClientRect()
    x.set((e.clientX - (rect.left + rect.width / 2)) * strength)
    y.set((e.clientY - (rect.top + rect.height / 2)) * strength)
  }

  function reset() {
    x.set(0)
    y.set(0)
  }

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMove}
      onMouseLeave={reset}
      style={reduced ? undefined : { x: sx, y: sy }}
      className={className}
    >
      {children}
    </motion.div>
  )
}
