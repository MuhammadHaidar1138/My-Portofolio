import React from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import {
  FaReact, FaNodeJs, FaDocker, FaPython, FaAws, FaGitAlt
} from 'react-icons/fa'
import { SectionHeader, GlassCard } from '../ui/index'
import { fadeUp, staggerContainer } from '../../utils/animations'
import skillsData from '../../data/skills.json'

const ICON_MAP = {
  FaReact: FaReact,
  FaNodeJs: FaNodeJs,
  FaDocker: FaDocker,
  FaPython: FaPython,
  FaAws: FaAws,
  FaGitAlt: FaGitAlt,
}

/**
 * SkillBar — animated progress bar for a single skill.
 * Uses react-intersection-observer to trigger animation on scroll.
 */
function SkillBar({ name, level, color, delay }) {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 })

  return (
    <div ref={ref} className="space-y-1.5">
      <div className="flex justify-between items-center">
        <span className="text-text-secondary text-sm">{name}</span>
        <span className="text-text-muted text-xs font-mono">{level}%</span>
      </div>
      <div className="h-1.5 bg-bg-hover rounded-full overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          animate={inView ? { width: `${level}%` } : { width: 0 }}
          transition={{ duration: 1.2, delay, ease: [0.22, 1, 0.36, 1] }}
          className="h-full rounded-full skill-bar-fill"
          style={{ background: `linear-gradient(90deg, ${color}99, ${color})` }}
        />
      </div>
    </div>
  )
}

export default function Skills() {
  return (
    <section id="skills" className="py-32 px-6 bg-bg-secondary">
      <div className="max-w-6xl mx-auto">
        <SectionHeader
          label="02. Skills"
          title="My Toolkit"
          subtitle="Technologies and tools I use to bring ideas to life."
        />

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid md:grid-cols-3 gap-8"
        >
          {skillsData.map((category, ci) => {
            const Icon = ICON_MAP[category.icon]
            return (
              <motion.div key={category.category} variants={fadeUp} custom={ci * 0.1}>
                <GlassCard className="p-6 h-full glow-border">
                  {/* Category header */}
                  <div className="flex items-center gap-3 mb-6">
                    <div
                      className="w-10 h-10 rounded-xl flex items-center justify-center"
                      style={{ background: `${category.color}15`, border: `1px solid ${category.color}30` }}
                    >
                      {Icon && <Icon size={20} style={{ color: category.color }} />}
                    </div>
                    <h3 className="font-display font-semibold text-text-primary">{category.category}</h3>
                  </div>

                  {/* Skill bars */}
                  <div className="space-y-4">
                    {category.skills.map((skill, si) => (
                      <SkillBar
                        key={skill.name}
                        name={skill.name}
                        level={skill.level}
                        color={category.color}
                        delay={si * 0.08}
                      />
                    ))}
                  </div>
                </GlassCard>
              </motion.div>
            )
          })}
        </motion.div>
      </div>
    </section>
  )
}
