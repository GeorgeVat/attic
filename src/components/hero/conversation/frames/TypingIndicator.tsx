'use client'

import { motion } from 'framer-motion'

export function TypingIndicator() {
  return (
    <div className="flex justify-start" role="status" aria-label="driftwork is typing">
      <div className="flex items-center gap-1 rounded-[1.25rem] rounded-tl-sm border border-hairline bg-white px-4 py-3">
        {[0, 1, 2].map((i) => (
          <motion.span
            key={i}
            className="size-1.5 rounded-full bg-muted"
            animate={{ opacity: [0.3, 1, 0.3] }}
            transition={{ duration: 1, repeat: Infinity, delay: i * 0.18 }}
          />
        ))}
      </div>
    </div>
  )
}
