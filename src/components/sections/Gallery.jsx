import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { HiX } from 'react-icons/hi'
import { SectionHeader, GlassCard } from '../ui/index'
import { fadeUp, staggerContainer } from '../../utils/animations'
import galleryData from '../../data/gallery.json'

/**
 * Lightbox — full-screen image viewer triggered by clicking a gallery item.
 */
function Lightbox({ item, onClose }) {
  return (
    <AnimatePresence>
      {item && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-black/80 backdrop-blur-md cursor-pointer"
        >
          <motion.div
            initial={{ scale: 0.85, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.85, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 300, damping: 25 }}
            onClick={(e) => e.stopPropagation()}
            className="relative max-w-3xl w-full rounded-2xl overflow-hidden glass border border-white/8 cursor-default"
          >
            {/* Image */}
            <div className="aspect-video bg-bg-card flex items-center justify-center">
              {item.image ? (
                <img src={item.image} alt={item.caption} className="w-full h-full object-cover" />
              ) : (
                <div className="text-text-muted text-sm">Image not available</div>
              )}
            </div>

            {/* Caption */}
            <div className="p-4 flex items-center justify-between">
              <div>
                <p className="text-text-primary font-medium text-sm">{item.caption}</p>
                <p className="text-text-muted text-xs font-mono mt-0.5">{item.category}</p>
              </div>
              <button
                onClick={onClose}
                className="p-2 rounded-lg glass border border-white/8 text-text-secondary hover:text-text-primary transition-colors"
              >
                <HiX size={18} />
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default function Gallery() {
  const [selected, setSelected] = useState(null)

  return (
    <section id="gallery" className="py-32 px-6">
      <div className="max-w-6xl mx-auto">
        <SectionHeader
          label="08. Gallery"
          title="Life in Pixels"
          subtitle="Moments from conferences, hackathons, and team adventures."
        />

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-2 md:grid-cols-3 gap-4"
        >
          {galleryData.map((item, i) => (
            <motion.div
              key={item.id}
              variants={fadeUp}
              custom={i * 0.08}
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.2 }}
              onClick={() => setSelected(item)}
              className="cursor-pointer"
            >
              <GlassCard className="aspect-video overflow-hidden group relative">
                {/* Image */}
                <div className="w-full h-full bg-gradient-to-br from-bg-hover to-bg-card">
                  {item.image && (
                    <img
                      src={item.image}
                      alt={item.caption}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      onError={(e) => { e.target.style.display = 'none' }}
                    />
                  )}
                </div>

                {/* Hover overlay */}
                <div className="absolute inset-0 bg-bg-primary/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                  <div>
                    <p className="text-text-primary text-sm font-medium">{item.caption}</p>
                    <p className="text-accent text-xs font-mono">{item.category}</p>
                  </div>
                </div>
              </GlassCard>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Lightbox */}
      <Lightbox item={selected} onClose={() => setSelected(null)} />
    </section>
  )
}
