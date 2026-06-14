'use client'

import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion, useInView, useReducedMotion } from 'framer-motion'
import type { Scenario } from './types'
import { useConversation } from './useConversation'
import { FrameRenderer } from './FrameRenderer'
import { TypingIndicator } from './frames/TypingIndicator'

export function ConversationCard({ scenarios }: { scenarios: Scenario[] }) {
  const rootRef = useRef<HTMLDivElement>(null)
  const viewportRef = useRef<HTMLDivElement>(null)
  const inView = useInView(rootRef, { amount: 0.3 })
  const [tabHidden, setTabHidden] = useState(false)
  const reducedPref = useReducedMotion()
  // Hydration guard: the server renders zero frames, but with reduced motion
  // the engine would return the full first scenario on the very first client
  // render — a guaranteed hydration mismatch. Gate the static render behind a
  // mounted flag so render #1 matches the server, then flip post-mount.
  const [mounted, setMounted] = useState(false)
  useEffect(() => setMounted(true), [])
  const reduced = !!reducedPref && mounted

  useEffect(() => {
    const onVisibility = () => setTabHidden(document.hidden)
    document.addEventListener('visibilitychange', onVisibility)
    return () => document.removeEventListener('visibilitychange', onVisibility)
  }, [])

  const view = useConversation(scenarios, {
    paused: !inView || tabHidden,
    reduced: !!reduced,
  })

  useEffect(() => {
    const viewport = viewportRef.current
    if (viewport) viewport.scrollTo({ top: viewport.scrollHeight, behavior: reduced ? 'auto' : 'smooth' })
  }, [view.frames.length, view.isTyping, reduced])

  return (
    <div
      ref={rootRef}
      className="glass relative flex h-[460px] flex-col overflow-hidden rounded-[1.75rem]"
      aria-label="Example client conversation"
    >
      {/* gradient seam along the top edge */}
      <span
        aria-hidden
        className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-accent via-sky to-accent"
      />

      {/* header — avatar tile + name, no chat-app "online" chrome */}
      <div className="flex items-center gap-3 px-5 pb-4 pt-5">
        <span className="relative flex size-9 items-center justify-center rounded-xl bg-gradient-to-br from-accent to-sky text-sm font-bold text-white shadow-[0_10px_22px_-10px_rgba(47,107,255,0.9)]">
          d
          <motion.span
            aria-hidden
            className="absolute -bottom-0.5 -right-0.5 size-2.5 rounded-full border-2 border-white bg-emerald-400"
            animate={reduced ? undefined : { scale: [1, 1.25, 1] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          />
        </span>
        <div className="leading-tight">
          <p className="font-display text-sm font-semibold text-ink">Driftwork</p>
          <p className="text-[11px] text-muted">Solutions desk · replies in minutes</p>
        </div>
      </div>

      <div className="h-px bg-hairline/70" />

      {/* messages */}
      <div
        ref={viewportRef}
        className="flex-1 overflow-y-auto px-5 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={view.scenarioId}
            className="flex flex-col gap-3 py-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
          >
            {view.frames.map((frame, i) => (
              <motion.div
                key={i}
                initial={reduced ? false : { opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, ease: 'easeOut' }}
              >
                <FrameRenderer frame={frame} />
              </motion.div>
            ))}
            {view.isTyping && <TypingIndicator />}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* fake composer — pill input with a send affordance */}
      <div className="px-4 pb-4 pt-2" aria-hidden>
        <div className="flex items-center gap-2 rounded-full border border-hairline bg-white/70 py-2 pl-4 pr-2">
          <p className="flex-1 text-xs">
            {view.inputText ? (
              <span className="text-ink">
                {view.inputText}
                <motion.span
                  className="ml-px inline-block h-3.5 w-[2px] translate-y-0.5 bg-accent"
                  animate={{ opacity: [1, 0] }}
                  transition={{ duration: 0.7, repeat: Infinity }}
                />
              </span>
            ) : (
              <span className="text-muted">describe what you&rsquo;re building…</span>
            )}
          </p>
          <span className="flex size-7 items-center justify-center rounded-full bg-ink text-paper">
            <svg
              width="13"
              height="13"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.4"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M5 12h14M13 6l6 6-6 6" />
            </svg>
          </span>
        </div>
      </div>
    </div>
  )
}
