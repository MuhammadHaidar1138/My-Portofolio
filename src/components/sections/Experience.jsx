import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { HiChevronDown } from 'react-icons/hi'
import { BsBriefcaseFill } from 'react-icons/bs'
import { SectionHeader, Tag, GlassCard } from '../ui/index'
import { fadeUp, staggerContainer } from '../../utils/animations'
import experienceData from '../../data/experience.json'

/**
 * ExperienceCard — one job entry with expandable highlights.
 */
function ExperienceCard({ exp, index }) {
  const [expanded, setExpanded] = useState(index === 0)

  return (
    <motion.div
      variants={fadeUp}
      custom={index * 0.1}
      className="relative pl-8 md:pl-0"
    >
      {/* Timeline line (left side) */}
      <div className="hidden md:flex absolute left-[calc(50%-1px)] top-8 bottom-0 w-0.5 bg-gradient-to-b from-accent/30 to-transparent" />

      <GlassCard
        className="p-6 cursor-pointer glow-border"
        onClick={() => setExpanded(!expanded)}
      >
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1">
            <div className="flex flex-wrap items-center gap-2 mb-1">
              <span className={`px-2 py-0.5 rounded-md text-xs font-mono ${
                exp.current ? 'bg-green-500/15 text-green-400 border border-green-500/20' : 'bg-bg-hover text-text-muted border border-white/6'
              }`}>
                {exp.current ? '● Current' : exp.type}
              </span>
              <span className="text-text-muted text-xs font-mono">{exp.startDate} — {exp.endDate}</span>
            </div>
            <h3 className="font-display font-bold text-text-primary text-xl">{exp.role}</h3>
            <p className="text-accent font-medium text-sm mt-0.5">{exp.company} · {exp.location}</p>
          </div>

          {/* Expand icon */}
          <motion.div
            animate={{ rotate: expanded ? 180 : 0 }}
            transition={{ duration: 0.2 }}
            className="text-text-muted mt-1 shrink-0"
          >
            <HiChevronDown size={20} />
          </motion.div>
        </div>

        <AnimatePresence>
          {expanded && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3, ease: 'easeInOut' }}
              className="overflow-hidden"
            >
              <p className="text-text-secondary text-sm leading-relaxed mt-4 mb-4">
                {exp.description}
              </p>

              {/* Highlights */}
              <ul className="space-y-2 mb-5">
                {exp.highlights.map((h) => (
                  <li key={h} className="flex gap-3 text-sm text-text-secondary leading-6">
                    <span className="text-accent shrink-0">›</span>
                    <span>{h}</span>
                  </li>
                ))}
              </ul>

              {/* Tech tags */}
              <div className="flex flex-wrap gap-2">
                {exp.technologies.map((tech) => (
                  <Tag key={tech}>{tech}</Tag>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </GlassCard>
    </motion.div>
  )
}

export default function Experience() {
  return (
    <section id="experience" className="py-32 px-6">
      <div className="max-w-3xl mx-auto">
        <SectionHeader
          label="03. Experience"
          title="Where I've Worked"
          subtitle="My professional journey and the impact I've made."
        />

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="relative space-y-4"
        >
          {/* Left timeline dot column */}
          {experienceData.map((exp, i) => (
            <ExperienceCard key={exp.id} exp={exp} index={i} />
          ))}
        </motion.div>
      </div>
    </section>
  )
}
