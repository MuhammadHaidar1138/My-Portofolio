import React, { useState, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FaGithub, FaExternalLinkAlt } from 'react-icons/fa'
import { SectionHeader, Tag, GlassCard } from '../ui/index'
import { cardHover, staggerContainer, fadeUp } from '../../utils/animations'
import projectsData from '../../data/projects.json'

// Derive unique categories from JSON data automatically
const ALL_CATEGORIES = ['All', ...new Set(projectsData.map((p) => p.category))]

/**
 * ProjectCard — displays a single project with image, tags, and links.
 */
function ProjectCard({ project, index }) {
  return (
    <motion.div
      layout
      variants={fadeUp}
      custom={index * 0.08}
      initial="hidden"
      animate="visible"
      exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.2 } }}
    >
      <motion.div
        variants={cardHover}
        initial="rest"
        whileHover="hover"
        className="h-full"
      >
        <GlassCard className="h-full flex flex-col overflow-hidden glow-border group">
          {/* Project image */}
          <div className="relative h-48 bg-gradient-to-br from-bg-hover to-bg-card overflow-hidden">
            {project.image ? (
              <img
                src={project.image}
                alt={project.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                onError={(e) => { e.target.style.display = 'none' }}
              />
            ) : null}
            {/* Gradient overlay on hover */}
            <div className="absolute inset-0 bg-gradient-to-t from-bg-card/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

            {/* Featured badge */}
            {project.featured && (
              <span className="absolute top-3 left-3 px-2 py-1 text-xs font-mono bg-accent/20 text-accent border border-accent/30 rounded-md backdrop-blur-sm">
                Featured
              </span>
            )}

            {/* Category badge */}
            <span className="absolute top-3 right-3 px-2 py-1 text-xs font-mono glass border border-white/8 text-text-secondary rounded-md backdrop-blur-sm">
              {project.category}
            </span>

            {/* Quick links overlay */}
            <div className="absolute bottom-3 right-3 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              {project.github && (
                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => e.stopPropagation()}
                  className="p-2 glass rounded-lg border border-white/10 text-text-secondary hover:text-accent transition-colors"
                >
                  <FaGithub size={14} />
                </a>
              )}
              {project.demo && (
                <a
                  href={project.demo}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => e.stopPropagation()}
                  className="p-2 glass rounded-lg border border-white/10 text-text-secondary hover:text-accent transition-colors"
                >
                  <FaExternalLinkAlt size={14} />
                </a>
              )}
            </div>
          </div>

          {/* Card content */}
          <div className="p-5 flex flex-col flex-1">
            <h3 className="font-display font-bold text-text-primary text-lg mb-2 group-hover:text-accent transition-colors">
              {project.title}
            </h3>
            <p className="text-text-secondary text-sm leading-relaxed mb-4 flex-1">
              {project.description}
            </p>

            {/* Tech tags */}
            <div className="flex flex-wrap gap-1.5">
              {project.technologies.map((tech) => (
                <Tag key={tech}>{tech}</Tag>
              ))}
            </div>
          </div>
        </GlassCard>
      </motion.div>
    </motion.div>
  )
}

export default function Projects() {
  const [activeCategory, setActiveCategory] = useState('All')

  // Filter projects based on selected category
  const filtered = useMemo(() => {
    if (activeCategory === 'All') return projectsData
    return projectsData.filter((p) => p.category === activeCategory)
  }, [activeCategory])

  return (
    <section id="projects" className="py-32 px-6">
      <div className="max-w-6xl mx-auto">
        <SectionHeader
          label="05. Projects"
          title="What I've Built"
          subtitle="A selection of projects that showcase my skills and passion."
        />

        {/* Category filter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-wrap gap-2 mb-10"
        >
          {ALL_CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 rounded-xl text-sm font-medium border transition-all duration-200 cursor-pointer ${
                activeCategory === cat
                  ? 'filter-btn-active'
                  : 'border-white/8 text-text-secondary hover:text-text-primary hover:border-white/15 bg-bg-card'
              }`}
            >
              {cat}
              <span className="ml-1.5 text-xs text-text-muted">
                ({cat === 'All' ? projectsData.length : projectsData.filter(p => p.category === cat).length})
              </span>
            </button>
          ))}
        </motion.div>

        {/* Project grid with AnimatePresence for smooth filter transitions */}
        <motion.div
          layout
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          <AnimatePresence mode="popLayout">
            {filtered.map((project, i) => (
              <ProjectCard key={project.id} project={project} index={i} />
            ))}
          </AnimatePresence>
        </motion.div>

        {/* No results state */}
        {filtered.length === 0 && (
          <div className="text-center py-20 text-text-muted">
            No projects found in this category.
          </div>
        )}
      </div>
    </section>
  )
}
