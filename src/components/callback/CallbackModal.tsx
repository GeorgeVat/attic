'use client'

import { useEffect, useRef } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { useLenis } from 'lenis/react'
import { X } from 'lucide-react'
import { useCallbackModal } from './useCallbackModal'
import { CallbackForm } from './CallbackForm'

// Accessible dialog shell: backdrop + animated panel, ESC/backdrop to close,
// focus trap, focus restore, and page-scroll lock (Lenis + native) while open.
export function CallbackModal() {
  const { isOpen, close } = useCallbackModal()
  const reduce = useReducedMotion()
  const lenis = useLenis()
  const panelRef = useRef<HTMLDivElement>(null)
  const previouslyFocused = useRef<HTMLElement | null>(null)

  // Lock scroll + remember/restore focus around the open lifecycle.
  useEffect(() => {
    if (!isOpen) return
    previouslyFocused.current = document.activeElement as HTMLElement | null
    lenis?.stop()
    document.body.style.overflow = 'hidden'
    return () => {
      lenis?.start()
      document.body.style.overflow = ''
      previouslyFocused.current?.focus?.()
    }
  }, [isOpen, lenis])

  // ESC to close + Tab focus trap within the panel.
  useEffect(() => {
    if (!isOpen) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        close()
        return
      }
      if (e.key !== 'Tab') return
      const panel = panelRef.current
      if (!panel) return
      const focusables = Array.from(
        panel.querySelectorAll<HTMLElement>(
          'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])',
        ),
      ).filter((el) => el.tabIndex !== -1)
      if (focusables.length === 0) return
      const first = focusables[0]
      const last = focusables[focusables.length - 1]
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault()
        last.focus()
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault()
        first.focus()
      }
    }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [isOpen, close])

  // Move focus into the panel shortly after it opens.
  useEffect(() => {
    if (!isOpen) return
    const t = setTimeout(() => {
      // Focus the first real form field — skip the Close button (a <button>)
      // and the off-screen honeypot ([tabindex="-1"]) — so keyboard users land
      // in the form rather than on the X.
      panelRef.current
        ?.querySelector<HTMLElement>('input:not([tabindex="-1"]), select, textarea')
        ?.focus()
    }, 50)
    return () => clearTimeout(t)
  }, [isOpen])

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-[70] flex items-end justify-center p-0 sm:items-center sm:p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: reduce ? 0 : 0.25 }}
        >
          <div
            className="absolute inset-0 bg-ink/40 backdrop-blur-sm"
            onClick={close}
            aria-hidden
          />
          <motion.div
            ref={panelRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby="callback-title"
            initial={reduce ? { opacity: 0 } : { opacity: 0, y: 30, scale: 0.97 }}
            animate={reduce ? { opacity: 1 } : { opacity: 1, y: 0, scale: 1 }}
            exit={reduce ? { opacity: 0 } : { opacity: 0, y: 20, scale: 0.98 }}
            transition={{ duration: reduce ? 0 : 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="relative z-10 w-full rounded-t-3xl border border-hairline bg-paper p-6 text-ink shadow-xl sm:max-w-md sm:rounded-2xl md:p-8"
          >
            <button
              type="button"
              onClick={close}
              aria-label="Close"
              className="absolute right-4 top-4 text-muted transition-colors duration-200 hover:text-accent"
            >
              <X size={20} />
            </button>
            <CallbackForm onDone={close} />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
