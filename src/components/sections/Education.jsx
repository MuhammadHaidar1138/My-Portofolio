import React from 'react'
import { motion } from 'framer-motion'
import { HiAcademicCap } from 'react-icons/hi'
import { SectionHeader, GlassCard } from '../ui/index'
import { fadeUp, staggerContainer } from '../../utils/animations'
import educationData from '../../data/education.json'

export default function Education() {
  return (
    <section id="education" className="py-32 px-6 bg-bg-secondary">
      <div className="max-w-4xl mx-auto">
        <SectionHeader
          label="04. Education"
          title="Academic Background"
          subtitle="Where I built my foundations."
        />

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid md:grid-cols-2 gap-6"
        >
          {educationData.map((edu, i) => (
            <motion.div key={edu.id} variants={fadeUp} custom={i * 0.15}>
              <GlassCard className="p-6 h-full glow-border">
                {/* Icon */}
                <div className="w-12 h-12 rounded-2xl bg-accent-subtle border border-accent/20 flex items-center justify-center mb-5">
                  <HiAcademicCap size={24} className="text-accent" />
                </div>

                <div className="flex items-start justify-between gap-2 mb-1">
                  <h3 className="font-display font-bold text-text-primary text-lg leading-tight">{edu.degree}</h3>
                </div>
                <p className="text-accent font-medium text-sm mb-0.5">{edu.institution}</p>
                <p className="text-text-muted text-xs font-mono mb-4">
                  {edu.startDate} — {edu.endDate}
                  {edu.gpa && <span className="ml-3 text-text-secondary">GPA: {edu.gpa}</span>}
                </p>

                <p className="text-text-secondary text-sm leading-relaxed mb-4">{edu.description}</p>

                <ul className="space-y-1.5">
                  {edu.highlights.map((h) => (
                    <li key={h} className="flex items-start gap-2 text-xs text-text-secondary">
                      <span className="text-accent mt-0.5 shrink-0">›</span>
                      <span>{h}</span>
                    </li>
                  ))}
                </ul>
              </GlassCard>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
