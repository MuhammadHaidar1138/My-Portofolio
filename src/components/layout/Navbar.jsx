import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { HiMenuAlt3, HiX } from 'react-icons/hi'
import { useActiveSection } from '../../hooks/useAnimations'

const NAV_LINKS = [
  { label: 'About', href: '#about' },
  { label: 'Skills', href: '#skills' },
  { label: 'Experience', href: '#experience' },
  { label: 'Projects', href: '#projects' },
  { label: 'Certificates', href: '#certificates' },
  { label: 'Contact', href: '#contact' },
]

const SECTION_IDS = ['hero', 'about', 'skills', 'experience', 'education', 'projects', 'certificates', 'achievements', 'gallery', 'contact']

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const activeSection = useActiveSection(SECTION_IDS)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const onResize = () => { if (window.innerWidth >= 768) setMobileOpen(false) }
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [])

  const handleNavClick = (href) => {
    setMobileOpen(false)
    const id = href.replace('#', '')
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <>
      <motion.nav
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? 'glass-strong border-b border-white/5 py-3'
            : 'py-5 bg-transparent'
        }`}
      >
        <div className="max-w-6xl mx-auto px-6 flex items-center justify-between">
          {/* Logo */}
          <motion.a
            href="#hero"
            onClick={() => handleNavClick('#hero')}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
            className="font-display font-bold text-xl tracking-tight cursor-pointer"
          >
            <span className="gradient-text">MH.</span>
          </motion.a>

          {/* Desktop links */}
          <ul className="hidden md:flex items-center gap-1">
            {NAV_LINKS.map(({ label, href }) => {
              const sectionId = href.replace('#', '')
              const isActive = activeSection === sectionId
              return (
                <li key={label}>
                  <button
                    onClick={() => handleNavClick(href)}
                    className={`relative px-4 py-2 text-sm font-medium rounded-lg transition-colors duration-200 cursor-pointer ${
                      isActive
                        ? 'text-accent'
                        : 'text-text-secondary hover:text-text-primary'
                    }`}
                  >
                    {label}
                    {isActive && (
                      <motion.span
                        layoutId="nav-indicator"
                        className="absolute inset-0 rounded-lg bg-accent-subtle border border-accent/20"
                        style={{ zIndex: -1 }}
                        transition={{ type: 'spring', stiffness: 350, damping: 30 }}
                      />
                    )}
                  </button>
                </li>
              )
            })}
          </ul>

          {/* CTA button */}
          <a
            href="/pdf/CV-Muhammad-Haidar.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden md:inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-accent border border-accent/30 rounded-lg hover:bg-accent-subtle transition-all duration-200"
          >
            Resume ↗
          </a>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden text-text-secondary hover:text-text-primary transition-colors p-1"
            aria-label="Toggle menu"
          >
            {mobileOpen ? <HiX size={24} /> : <HiMenuAlt3 size={24} />}
          </button>
        </div>
      </motion.nav>

      {/* Mobile drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            className="fixed inset-0 z-40 glass-strong md:hidden"
          >
            <div className="flex flex-col items-center justify-center h-full gap-6">
              {NAV_LINKS.map(({ label, href }, i) => (
                <motion.button
                  key={label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.07 }}
                  onClick={() => handleNavClick(href)}
                  className="font-display text-3xl font-bold text-text-secondary hover:text-accent transition-colors"
                >
                  {label}
                </motion.button>
              ))}
              <motion.a
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: NAV_LINKS.length * 0.07 }}
                href="/pdf/CV-Muhammad-Haidar.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 px-6 py-3 text-accent border border-accent/30 rounded-xl font-medium"
              >
                Resume ↗
              </motion.a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
