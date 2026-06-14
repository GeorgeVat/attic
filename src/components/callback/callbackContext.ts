'use client'

import { createContext } from 'react'

export type CallbackContextValue = {
  isOpen: boolean
  open: () => void
  close: () => void
}

export const CallbackContext = createContext<CallbackContextValue | null>(null)
