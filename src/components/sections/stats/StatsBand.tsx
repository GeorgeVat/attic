'use client'

import { useEffect, useRef, useState } from 'react'
import { animate, useInView, useReducedMotion } from 'framer-motion'

type Stat = { value: number; suffix?: string; prefix?: string; label: string }

function Counter({ value, prefix, suffix }: { value: number; prefix?: string; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })
  const reduced = useReducedMotion()
  const [display, setDisplay] = useState(0)

  useEffect(() => {
    if (!inView) return
    if (reduced) {
      setDisplay(value)
      return
    }
    const controls = animate(0, value, {
      duration: 1.4,
      ease: 'easeOut',
      onUpdate: (v) => setDisplay(Math.round(v)),
    })
    return () => controls.stop()
  }, [inView, value, reduced])

  return (
    <span ref={ref} className="font-display text-5xl font-semibold tracking-tight text-ink sm:text-6xl">
      {prefix}
      {display}
      {suffix}
    </span>
  )
}

export function StatsBand({ items }: { items: Stat[] }) {
  return (
    <section className="px-4 py-16">
      <div className="glass mx-auto grid max-w-6xl gap-y-10 rounded-[2rem] px-8 py-12 sm:grid-cols-2 lg:grid-cols-4">
        {items.map((stat) => (
          <div key={stat.label} className="text-center">
            <Counter value={stat.value} prefix={stat.prefix} suffix={stat.suffix} />
            <p className="mt-3 text-sm font-medium text-muted">{stat.label}</p>
          </div>
        ))}
      </div>
    </section>
  )
}
