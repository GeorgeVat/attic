'use client'

import { useCallback, useMemo, useState, type ReactNode } from 'react'
import { CallbackContext } from './callbackContext'
import { CallbackModal } from './CallbackModal'
import { FloatingCallButton } from './FloatingCallButton'

// Mounts once near the root: owns the modal open-state, renders the single modal
// instance + floating button, and exposes open/close to any trigger via context.
export function CallbackProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false)
  const open = useCallback(() => setIsOpen(true), [])
  const close = useCallback(() => setIsOpen(false), [])
  const value = useMemo(() => ({ isOpen, open, close }), [isOpen, open, close])

  return (
    <CallbackContext.Provider value={value}>
      {children}
      <FloatingCallButton />
      <CallbackModal />
    </CallbackContext.Provider>
  )
}
