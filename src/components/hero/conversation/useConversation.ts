'use client'

import { useEffect, useMemo, useRef, useState } from 'react'
import type { ChatFrame, Scenario } from './types'

export interface ConversationOptions {
  /** pause on a completed scenario before cycling (ms) */
  holdMs?: number
  /** fake-input typewriter speed per character (ms) */
  charMs?: number
  /** freeze the engine (offscreen / hidden tab) */
  paused?: boolean
  /** prefers-reduced-motion: scenario 0 final state, no timers */
  reduced?: boolean
}

export interface ConversationView {
  frames: ChatFrame[]
  isTyping: boolean
  inputText: string
  scenarioIndex: number
  scenarioId: string
}

interface State {
  scenario: number
  revealed: number
  typedChars: number
  status: 'waiting' | 'typing'
}

type Event = { type: 'WAIT_DONE' } | { type: 'CHAR_TYPED' } | { type: 'HOLD_DONE' }

const INITIAL: State = { scenario: 0, revealed: 0, typedChars: 0, status: 'waiting' }

function makeReducer(scenarios: Scenario[]) {
  return function reduce(state: State, event: Event): State {
    const frames = scenarios[state.scenario]!.frames
    const next = frames[state.revealed]

    switch (event.type) {
      case 'WAIT_DONE': {
        if (!next) return state
        if (next.frame.kind === 'user') return { ...state, status: 'typing', typedChars: 0 }
        return { ...state, revealed: state.revealed + 1, status: 'waiting' }
      }
      case 'CHAR_TYPED': {
        if (!next || next.frame.kind !== 'user') return state
        const typed = state.typedChars + 1
        if (typed >= next.frame.text.length) {
          return { ...state, revealed: state.revealed + 1, typedChars: 0, status: 'waiting' }
        }
        return { ...state, typedChars: typed }
      }
      case 'HOLD_DONE': {
        return {
          scenario: (state.scenario + 1) % scenarios.length,
          revealed: 0,
          typedChars: 0,
          status: 'waiting',
        }
      }
    }
  }
}

/**
 * Drives the animated conversation engine for the hero section.
 *
 * **Preconditions**
 *
 * - `scenarios` must be **referentially stable** — pass a module-level constant
 *   or a `useMemo`-ed value.  A new array identity (e.g. an inline literal) is
 *   treated as a changed dependency and restarts the engine from the beginning.
 *
 * - Toggling `paused` back to `false` (resuming) restarts the in-flight wait
 *   timer in full.  This is deliberate: a partial wait would look jarring after
 *   a pause, and the engine has no concept of "elapsed" time within a step.
 */
export function useConversation(
  scenarios: Scenario[],
  { holdMs = 3500, charMs = 35, paused = false, reduced = false }: ConversationOptions = {},
): ConversationView {
  const reducer = useMemo(() => makeReducer(scenarios), [scenarios])
  const [state, setState] = useState<State>(INITIAL)
  // Source of truth for the timer chain: timer callbacks fire synchronously
  // inside fake-timer ticks, before React flushes renders, so they cannot
  // rely on `state` from the closure being current.
  const stateRef = useRef(state)

  useEffect(() => {
    if (reduced || paused) return

    let timer: ReturnType<typeof setTimeout>

    // Self-perpetuating chain: each callback advances the state via the pure
    // reducer and schedules the next transition immediately, so consecutive
    // transitions resolve within a single timer-advance window.
    const schedule = (s: State) => {
      const next = scenarios[s.scenario]!.frames[s.revealed]
      if (!next) {
        // last frame revealed → hold once, then cycle to the next scenario
        timer = setTimeout(() => tick({ type: 'HOLD_DONE' }), holdMs)
      } else if (s.status === 'typing') {
        timer = setTimeout(() => tick({ type: 'CHAR_TYPED' }), charMs)
      } else {
        timer = setTimeout(() => tick({ type: 'WAIT_DONE' }), next.delay)
      }
    }

    // Advances the engine one step: runs the pure reducer, mirrors the result
    // into both the ref (for same-tick callbacks) and React state, then
    // schedules the next transition.
    const tick = (event: Event) => {
      const nextState = reducer(stateRef.current, event)
      stateRef.current = nextState
      setState(nextState)
      schedule(nextState)
    }

    schedule(stateRef.current)
    return () => clearTimeout(timer)
  }, [paused, reduced, reducer, scenarios, holdMs, charMs])

  if (reduced) {
    const first = scenarios[0]!
    return {
      frames: first.frames.map((f) => f.frame),
      isTyping: false,
      inputText: '',
      scenarioIndex: 0,
      scenarioId: first.id,
    }
  }

  const scenario = scenarios[state.scenario]!
  const next = scenario.frames[state.revealed]

  // `revealed > 0`: don't show the typing indicator before the first user
  // message has appeared — the AI never types until the user has "spoken".
  const isTyping = state.status === 'waiting' && state.revealed > 0 && next?.frame.kind === 'ai'

  const inputText =
    state.status === 'typing' && next?.frame.kind === 'user'
      ? next.frame.text.slice(0, state.typedChars)
      : ''

  return {
    frames: scenario.frames.slice(0, state.revealed).map((f) => f.frame),
    isTyping,
    inputText,
    scenarioIndex: state.scenario,
    scenarioId: scenario.id,
  }
}
