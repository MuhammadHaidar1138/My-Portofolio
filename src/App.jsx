import React, { useEffect } from 'react'
import { motion } from 'framer-motion'

// Layout components
import Navbar from './components/layout/Navbar'
import Footer from './components/layout/Footer'

// UI utilities
import LoadingScreen from './components/ui/LoadingScreen'
import BackToTop from './components/ui/BackToTop'

// Page sections — each maps to one JSON data source
import Hero from './components/sections/Hero'
import About from './components/sections/About'
import Skills from './components/sections/Skills'
import Experience from './components/sections/Experience'
import Education from './components/sections/Education'
import Projects from './components/sections/Projects'
import Certificates from './components/sections/Certificates'
import Gallery from './components/sections/Gallery'
import Contact from './components/sections/Contact'

// Custom hooks
import { useScrollProgress } from './hooks/useAnimations'

export default function App() {
  const scrollProgress = useScrollProgress()

  return (
    <>
      {/* ── Loading screen ──────────────────────── */}
      <LoadingScreen />

      {/* ── Scroll progress bar ─────────────────── */}
      <div
        id="scroll-progress"
        style={{ width: `${scrollProgress}%` }}
      />

      {/* ── Navigation ──────────────────────────── */}
      <Navbar />

      {/* ── Main content ────────────────────────── */}
      <main>
        <Hero />
        <About />
        <Skills />
        <Experience />
        <Education />
        <Projects />
        <Certificates />
        <Gallery />
        <Contact />
      </main>

      {/* ── Footer ──────────────────────────────── */}
      <Footer />

      {/* ── Back to top button ──────────────────── */}
      <BackToTop />
    </>
  )
}
