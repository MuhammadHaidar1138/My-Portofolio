import React from 'react'
import { motion } from 'framer-motion'
import { FaGithub, FaLinkedin} from 'react-icons/fa'
import { MdEmail } from 'react-icons/md'
import { HiArrowDown } from 'react-icons/hi'
import { useTypingEffect } from '../../hooks/useAnimations'
import { Button } from '../ui/index'
import personal from '../../data/personal.json'

const SOCIAL = [
  { key: 'github', icon: FaGithub },
  { key: 'linkedin', icon: FaLinkedin },
  { key: 'email', icon: MdEmail },
]

export default function Hero() {
  const typedRole = useTypingEffect(personal.typingRoles)

  const scrollToAbout = () => {
    document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section
      id="hero"
      className="relative min-h-screen pt-20 px-6 overflow-hidden dot-grid flex items-center"
    >
      {/* Background ambient glows */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-accent/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-violet/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 w-full max-w-4xl mx-auto flex flex-col items-center text-center pb-24">
        {/* Availability */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex flex-wrap items-center justify-center gap-2 mb-8 px-4 py-2 glass rounded-full border border-white/8 text-sm text-text-secondary"
        >
          <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse-slow" />
          {personal.availability}
          <span className="text-text-muted">·</span>
          <span className="text-text-muted">{personal.location}</span>
        </motion.div>

        {/* Main heading */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.7,
            delay: 0.1,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="font-display font-bold text-5xl sm:text-6xl md:text-8xl leading-[1.05] tracking-tight text-text-primary mb-6"
        >
          Hi, I'm{' '}
          <span className="gradient-text">
            {personal.name.split(' ')[0]}
          </span>
          <br />
          <span className="gradient-text">
            {personal.name.split(' ')[1]}
          </span>
        </motion.h1>

        {/* Typing role */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="text-xl md:text-2xl text-text-secondary font-body mb-6 min-h-[40px]"
        >
          <span>{typedRole}</span>
          <span className="typing-cursor" />
        </motion.div>

        {/* Bio */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.6 }}
          className="text-text-secondary text-lg max-w-2xl mx-auto mb-10 leading-relaxed"
        >
          {personal.bio}
        </motion.p>

        {/* CTA buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="flex flex-wrap items-center justify-center gap-4 mb-12"
        >
          <Button
            onClick={() =>
              document
                .getElementById('projects')
                ?.scrollIntoView({ behavior: 'smooth' })
            }
            variant="primary"
          >
            View My Work
          </Button>

          <Button
            onClick={() =>
              document
                .getElementById('contact')
                ?.scrollIntoView({ behavior: 'smooth' })
            }
            variant="outline"
          >
            Get In Touch
          </Button>
        </motion.div>

        {/* Social links */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
          className="flex items-center justify-center gap-5 mb-14"
        >
          {SOCIAL.map(({ key, icon: Icon }) => (
            <motion.a
              key={key}
              href={personal.social[key]}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.2, y: -3 }}
              whileTap={{ scale: 0.9 }}
              transition={{
                type: 'spring',
                stiffness: 400,
                damping: 15,
              }}
              className="text-text-muted hover:text-accent transition-colors"
              aria-label={key}
            >
              <Icon size={22} />
            </motion.a>
          ))}
        </motion.div>

        {/* Stats bar */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9, duration: 0.6 }}
          className="w-full max-w-3xl"
        >
          <div className="glass rounded-2xl border border-white/6 px-8 py-5 grid grid-cols-2 md:grid-cols-4 gap-6">
            {personal.stats.map(({ label, value }) => (
              <div key={label} className="text-center">
                <p className="font-display font-bold text-3xl gradient-text">
                  {value}
                </p>
                <p className="text-text-muted text-xs mt-1">
                  {label}
                </p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        onClick={scrollToAbout}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 text-text-muted hover:text-accent transition-colors cursor-pointer"
        aria-label="Scroll to about"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{
            repeat: Infinity,
            duration: 1.6,
            ease: 'easeInOut',
          }}
        >
          <HiArrowDown size={22} />
        </motion.div>
      </motion.button>
    </section>
  )
}