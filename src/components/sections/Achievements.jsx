import React from 'react'
import { motion } from 'framer-motion'
import {
  FaGithub, FaTrophy, FaStar, FaMicrophone, FaCode, FaMedal
} from 'react-icons/fa'
import { SectionHeader, GlassCard } from '../ui/index'
import { fadeUp, staggerContainer } from '../../utils/animations'
import achievementsData from '../../data/achievements.json'

// Map icon string from JSON → React component
const ICON_MAP = {
  FaGithub, FaTrophy, FaStar, FaMicrophone, FaCode, FaMedal,
}

export default function Achievements() {
  return (
    <section id="achievements" className="py-32 px-6">
      <div className="max-w-6xl mx-auto">
        <SectionHeader
          label="07. Achievements"
          title="Recognition"
          subtitle="Milestones and accolades from my journey."
        />

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-5"
        >
          {achievementsData.map((ach, i) => {
            const Icon = ICON_MAP[ach.icon] || FaTrophy

            return (
              <motion.div key={ach.id} variants={fadeUp} custom={i * 0.1}>
                <GlassCard className="p-5 flex items-start gap-4 glow-border group h-full">
                  {/* Icon */}
                  <div
                    className="w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 transition-transform duration-300 group-hover:scale-110"
                    style={{
                      background: `${ach.color}10`,
                      border: `1px solid ${ach.color}25`,
                    }}
                  >
                    <Icon size={20} style={{ color: ach.color }} />
                  </div>

                  <div className="flex-1">
                    <div className="flex items-start justify-between gap-2">
                      <h3 className="font-display font-semibold text-text-primary text-sm leading-tight">
                        {ach.title}
                      </h3>
                      <span className="text-text-muted text-xs font-mono shrink-0">{ach.year}</span>
                    </div>
                    <p className="text-text-secondary text-xs leading-relaxed mt-2">{ach.description}</p>
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
