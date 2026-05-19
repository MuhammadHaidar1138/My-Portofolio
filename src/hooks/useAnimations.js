import { useState, useEffect } from 'react'

/**
 * useTypingEffect — cycles through an array of strings with a typewriter animation.
 * @param {string[]} words - Array of strings to cycle through
 * @param {number} typeSpeed - Milliseconds per character while typing
 * @param {number} deleteSpeed - Milliseconds per character while deleting
 * @param {number} pauseDuration - Milliseconds to pause after fully typed
 */
export function useTypingEffect(words = [], typeSpeed = 80, deleteSpeed = 50, pauseDuration = 2000) {
  const [displayText, setDisplayText] = useState('')
  const [wordIndex, setWordIndex] = useState(0)
  const [isDeleting, setIsDeleting] = useState(false)

  useEffect(() => {
    if (!words.length) return

    const currentWord = words[wordIndex % words.length]

    const timeout = setTimeout(() => {
      if (!isDeleting) {
        // Typing
        setDisplayText(currentWord.slice(0, displayText.length + 1))
        if (displayText.length === currentWord.length) {
          // Done typing — pause then delete
          setTimeout(() => setIsDeleting(true), pauseDuration)
        }
      } else {
        // Deleting
        setDisplayText(currentWord.slice(0, displayText.length - 1))
        if (displayText.length === 0) {
          setIsDeleting(false)
          setWordIndex((i) => (i + 1) % words.length)
        }
      }
    }, isDeleting ? deleteSpeed : typeSpeed)

    return () => clearTimeout(timeout)
  }, [displayText, isDeleting, wordIndex, words, typeSpeed, deleteSpeed, pauseDuration])

  return displayText
}

/**
 * useScrollProgress — returns a 0–100 scroll progress value.
 */
export function useScrollProgress() {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY
      const docHeight = document.documentElement.scrollHeight - window.innerHeight
      setProgress(docHeight > 0 ? (scrollTop / docHeight) * 100 : 0)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return progress
}

/**
 * useActiveSection — tracks which section is currently in the viewport.
 * @param {string[]} sectionIds - Array of section id strings
 */
export function useActiveSection(sectionIds) {
  const [activeSection, setActiveSection] = useState(sectionIds[0] || '')

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 150

      for (let i = sectionIds.length - 1; i >= 0; i--) {
        const id = sectionIds[i]
        const section = document.getElementById(id)

        if (!section) continue

        const sectionTop = section.offsetTop

        if (scrollPosition >= sectionTop) {
          setActiveSection(id)
          break
        }
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })

    handleScroll()

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [sectionIds])

  return activeSection
}