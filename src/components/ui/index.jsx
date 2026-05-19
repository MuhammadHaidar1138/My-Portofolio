import React from 'react'
import { motion } from 'framer-motion'
import { fadeUp } from '../../utils/animations'

/**
 * SectionHeader — consistent heading + subtitle for every section.
 */
export function SectionHeader({ label, title, subtitle, centered = false }) {
  return (
    <div className={`mb-16 ${centered ? 'text-center' : ''}`}>
      {label && (
        <motion.p
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="text-accent font-mono text-sm tracking-widest uppercase mb-3"
        >
          {label}
        </motion.p>
      )}
      <motion.h2
        variants={fadeUp}
        custom={0.1}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className={`font-display font-bold text-4xl md:text-5xl text-text-primary ${!centered ? 'section-underline' : ''}`}
      >
        {title}
      </motion.h2>
      {subtitle && (
        <motion.p
          variants={fadeUp}
          custom={0.2}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="text-text-secondary text-lg mt-6 max-w-2xl"
          style={centered ? { margin: '1.5rem auto 0' } : {}}
        >
          {subtitle}
        </motion.p>
      )}
    </div>
  )
}

/**
 * Tag — small pill label for technologies/categories.
 */
export function Tag({ children, accent = false }) {
  return (
    <span
      className={`inline-block px-2.5 py-1 rounded-md text-xs font-mono font-medium ${
        accent
          ? 'bg-accent-subtle text-accent border border-accent/20'
          : 'bg-bg-hover text-text-secondary border border-white/6'
      }`}
    >
      {children}
    </span>
  )
}

/**
 * Button — primary CTA button with gradient.
 */
export function Button({ children, href, onClick, variant = 'primary', className = '' }) {
  const base = 'inline-flex items-center gap-2 px-6 py-3 rounded-xl font-medium text-sm transition-all duration-300 cursor-pointer'
  const variants = {
    primary: 'bg-gradient-to-r from-accent to-violet text-bg-primary font-semibold hover:shadow-glow-accent hover:scale-105 active:scale-100',
    outline: 'border border-accent/30 text-accent hover:bg-accent-subtle hover:border-accent/60',
    ghost: 'text-text-secondary hover:text-text-primary hover:bg-bg-hover',
  }

  const cls = `${base} ${variants[variant]} ${className}`

  if (href) {
    return <a href={href} target="_blank" rel="noopener noreferrer" className={cls}>{children}</a>
  }
  return <button onClick={onClick} className={cls}>{children}</button>
}

/**
 * GlassCard — glassmorphism card wrapper.
 */
export function GlassCard({ children, className = '', ...props }) {
  return (
    <div
      className={`glass rounded-2xl border border-white/6 transition-all duration-300 ${className}`}
      {...props}
    >
      {children}
    </div>
  )
}

/**
 * ScrollReveal — wraps children in a motion.div that fades up on scroll.
 */
export function ScrollReveal({ children, delay = 0, className = '' }) {
  return (
    <motion.div
      variants={fadeUp}
      custom={delay}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-50px' }}
      className={className}
    >
      {children}
    </motion.div>
  )
}
