import React, { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export default function LoadingScreen() {
  const [visible, setVisible] = useState(true)

  useEffect(() => {
    const t = setTimeout(() => setVisible(false), 2200)
    return () => clearTimeout(t)
  }, [])

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          exit={{ opacity: 0, scale: 1.05 }}
          transition={{ duration: 0.5, ease: 'easeInOut' }}
          className="loader-screen"
        >
          {/* Animated logo */}
          <div className="flex flex-col items-center gap-8">
            <motion.div
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className="relative"
            >
              <span className="font-display font-bold text-6xl gradient-text">MH.</span>
              {/* Orbital ring */}
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
                className="absolute inset-0 -m-4 border border-accent/20 rounded-full border-t-accent"
                style={{ borderRadius: '50%' }}
              />
            </motion.div>

            {/* Progress bar */}
            <div className="w-48 h-0.5 bg-bg-hover rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: '100%' }}
                transition={{ duration: 1.8, ease: 'easeInOut' }}
                className="h-full bg-gradient-to-r from-accent to-violet rounded-full"
              />
            </div>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="text-text-muted text-sm font-mono tracking-widest"
            >
              Initializing...
            </motion.p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
