'use client'

import { useReducedMotion } from 'framer-motion'
import { ReactLenis } from 'lenis/react'
import type { ReactNode } from 'react'

export function LenisProvider({ children }: { children: ReactNode }) {
  // SSR-safe: returns null on the server, so the first render matches
  // hydration; swaps to plain children only when reduce is detected.
  const reduce = useReducedMotion()

  if (reduce) {
    return <>{children}</>
  }

  return (
    <ReactLenis root options={{ lerp: 0.12, smoothWheel: true }}>
      {children}
    </ReactLenis>
  )
}
