import React, { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaExternalLinkAlt, FaMedal } from "react-icons/fa";
import { SectionHeader, GlassCard } from "../ui/index";
import { fadeUp, staggerContainer } from "../../utils/animations";
import certificatesData from "../../data/certificates.json";

// Generate categories automatically
const ALL_CATEGORIES = [
  "All",
  ...new Set(certificatesData.map((c) => c.category)),
];

/**
 * CertificateCard — displays issuer, date, credential link.
 */
function CertificateCard({ cert, index }) {
  return (
    <motion.div
      layout
      variants={fadeUp}
      custom={index * 0.08}
      initial="hidden"
      animate="visible"
      exit={{ opacity: 0, scale: 0.9 }}
    >
      <GlassCard className="p-5 h-full flex flex-col glow-border group">
        {/* Certificate image */}
        <div className="relative h-36 rounded-xl overflow-hidden mb-5 bg-gradient-to-br from-bg-hover to-bg-card">
          {cert.image ? (
            <img
              src={cert.image}
              alt={cert.title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              onError={(e) => {
                e.target.style.display = "none";
              }}
            />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center">
              <FaMedal size={40} className="text-accent/30" />
            </div>
          )}

          {/* Category badge */}
          <span className="absolute top-2 right-2 px-2 py-1 text-xs font-mono glass border border-white/8 text-text-secondary rounded-md backdrop-blur-sm">
            {cert.category}
          </span>
        </div>

        {/* Title + issuer */}
        <h3 className="font-display font-bold text-text-primary text-base leading-tight mb-1 group-hover:text-accent transition-colors">
          {cert.title}
        </h3>

        <p className="text-accent text-sm font-medium mb-0.5">{cert.issuer}</p>

        {/* Dates */}
        <div className="flex items-center gap-3 text-xs text-text-muted font-mono mb-4 mt-1">
          <span>Issued {cert.date}</span>
          {cert.expiry && <span>· Expires {cert.expiry}</span>}
        </div>

        {/* Credential ID */}
        {cert.credentialId && (
          <p className="text-text-muted text-xs font-mono mb-4 flex-1">
            ID: {cert.credentialId}
          </p>
        )}

        {/* Verify link */}
        {cert.credentialUrl && (
          <a
            href={cert.credentialUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-xs text-accent border border-accent/20 rounded-lg px-3 py-2 hover:bg-accent-subtle transition-colors self-start"
          >
            <FaExternalLinkAlt size={10} />
            Verify Credential
          </a>
        )}
      </GlassCard>
    </motion.div>
  );
}

export default function Certificates() {
  const [activeCategory, setActiveCategory] = useState("All");

  // Filter certificates
  const filtered = useMemo(() => {
    if (activeCategory === "All") return certificatesData;
    return certificatesData.filter((c) => c.category === activeCategory);
  }, [activeCategory]);

  return (
    <section id="certificates" className="py-32 px-6 bg-bg-secondary">
      <div className="max-w-6xl mx-auto">
        <SectionHeader
          label="06. Certificates"
          title="Certifications"
          subtitle="Professional credentials that validate my expertise."
        />

        {/* Filter buttons */}
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
                  ? "filter-btn-active"
                  : "border-white/8 text-text-secondary hover:text-text-primary hover:border-white/15 bg-bg-card"
              }`}
            >
              {cat}
              <span className="ml-1.5 text-xs text-text-muted">
                (
                {cat === "All"
                  ? certificatesData.length
                  : certificatesData.filter((c) => c.category === cat).length}
                )
              </span>
            </button>
          ))}
        </motion.div>

        {/* Certificates grid */}
        <motion.div
          layout
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          <AnimatePresence mode="popLayout">
            {filtered.map((cert, i) => (
              <CertificateCard key={cert.id} cert={cert} index={i} />
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Empty state */}
        {filtered.length === 0 && (
          <div className="text-center py-20 text-text-muted">
            No certificates found in this category.
          </div>
        )}
      </div>
    </section>
  );
}
