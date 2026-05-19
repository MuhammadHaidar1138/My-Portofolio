/**
 * Shared Framer Motion animation variants.
 * Import these into components for consistent, reusable animations.
 */

// Fade up — the main "reveal on scroll" animation
export const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] },
  }),
}

// Fade in — simple opacity
export const fadeIn = {
  hidden: { opacity: 0 },
  visible: (delay = 0) => ({
    opacity: 1,
    transition: { duration: 0.5, delay },
  }),
}

// Slide in from left
export const slideLeft = {
  hidden: { opacity: 0, x: -60 },
  visible: (delay = 0) => ({
    opacity: 1,
    x: 0,
    transition: { duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] },
  }),
}

// Slide in from right
export const slideRight = {
  hidden: { opacity: 0, x: 60 },
  visible: (delay = 0) => ({
    opacity: 1,
    x: 0,
    transition: { duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] },
  }),
}

// Scale in
export const scaleIn = {
  hidden: { opacity: 0, scale: 0.85 },
  visible: (delay = 0) => ({
    opacity: 1,
    scale: 1,
    transition: { duration: 0.5, delay, ease: [0.22, 1, 0.36, 1] },
  }),
}

// Stagger container — wraps staggered children
export const staggerContainer = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.1,
    },
  },
}

// Card hover effect
export const cardHover = {
  rest: { scale: 1, y: 0 },
  hover: {
    scale: 1.02,
    y: -6,
    transition: { duration: 0.3, ease: 'easeOut' },
  },
}

// Section wrapper — used to trigger viewport-based animations
export const sectionReveal = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.6, staggerChildren: 0.15 },
  },
}
