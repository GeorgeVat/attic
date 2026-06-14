'use client'

import { Phone } from 'lucide-react'
import { useCallbackModal } from './useCallbackModal'

// Persistent, deliberately subtle callback trigger pinned bottom-right on every
// page. Hidden (and removed from the tab order) while the modal is open.
export function FloatingCallButton() {
  const { open, isOpen } = useCallbackModal()

  return (
    <button
      type="button"
      onClick={open}
      aria-label="Request a callback"
      aria-hidden={isOpen}
      tabIndex={isOpen ? -1 : 0}
      className={`liquid-glass fixed bottom-6 right-6 z-40 rounded-full p-3 text-muted transition-[opacity,color] duration-200 hover:text-accent ${
        isOpen ? 'pointer-events-none opacity-0' : 'opacity-100'
      }`}
    >
      <Phone className="size-4" />
    </button>
  )
}
