'use client'

import { useContext } from 'react'
import { CallbackContext } from './callbackContext'

// Access the shared callback modal controls. Must be called inside <CallbackProvider>.
export function useCallbackModal() {
  const ctx = useContext(CallbackContext)
  if (!ctx) {
    throw new Error('useCallbackModal must be used within <CallbackProvider>')
  }
  return ctx
}
