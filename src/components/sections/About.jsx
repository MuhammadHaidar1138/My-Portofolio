import React from "react";
import { motion } from "framer-motion";
import { FaMapMarkerAlt, FaEnvelope, FaPhone } from "react-icons/fa";
import { SectionHeader, ScrollReveal, GlassCard } from "../ui/index";
import { slideLeft, slideRight } from "../../utils/animations";
import personal from "../../data/personal.json";

export default function About() {
  return (
    <section id="about" className="py-32 px-6">
      <div className="max-w-6xl mx-auto">
        <SectionHeader
          label="01. About"
          title="Who I Am"
          subtitle="A little about my background, what drives me, and how I work."
        />

        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left — avatar + contact info */}
          <motion.div
            variants={slideLeft}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="flex flex-col items-center lg:items-start gap-8"
          >
            {/* Avatar placeholder with gradient border */}
            <div className="relative">
              <div className="w-56 h-56 rounded-3xl overflow-hidden border-2 border-accent/20 shadow-glow-accent">
                {personal.avatar ? (
                  <img
                    src={personal.avatar}
                    alt={personal.name}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  // Elegant fallback avatar
                  <div className="w-full h-full bg-gradient-to-br from-bg-card to-bg-hover flex items-center justify-center">
                    <span className="font-display font-bold text-7xl gradient-text">
                      {personal.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </span>
                  </div>
                )}
              </div>
              {/* Floating badge */}
              <div className="absolute -bottom-3 -right-3 glass border border-white/8 rounded-xl px-3 py-2 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                <span className="text-xs text-text-secondary font-medium">
                  Available
                </span>
              </div>
            </div>

            {/* Contact details */}
            <GlassCard className="p-6 space-y-4 w-full max-w-sm">
              {[
                { icon: FaMapMarkerAlt, label: personal.location },
                { icon: FaEnvelope, label: personal.email },
                { icon: FaPhone, label: personal.phone },
              ].map(({ icon: Icon, label }) => (
                <div
                  key={label}
                  className="flex items-center gap-3 text-text-secondary"
                >
                  <span className="text-accent">
                    <Icon size={15} />
                  </span>
                  <span className="text-sm">{label}</span>
                </div>
              ))}
            </GlassCard>
          </motion.div>

          {/* Right — bio text */}
          <motion.div
            variants={slideRight}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="space-y-6"
          >
            <p className="text-text-secondary text-lg leading-relaxed">
              {personal.bio}
            </p>
            <p className="text-text-secondary leading-relaxed">
              {personal.bioExtended}
            </p>

            {/* What I value */}
            <div className="grid grid-cols-2 gap-4 pt-4">
              {[
                {
                  title: "Clean Code",
                  desc: "Writing readable, maintainable, and structured code for scalable applications.",
                },
                {
                  title: "Backend Development",
                  desc: "Building REST APIs and backend systems using Laravel and Lumen.",
                },
                {
                  title: "API Integration",
                  desc: "Experienced in integrating and consuming APIs for web and mobile applications.",
                },
                {
                  title: "Problem Solving",
                  desc: "Enjoy solving technical challenges with efficient and practical solutions.",
                },
              ].map(({ title, desc }) => (
                <GlassCard key={title} className="p-4 glow-border">
                  <p className="font-display font-semibold text-text-primary text-sm mb-1">
                    {title}
                  </p>
                  <p className="text-text-muted text-xs leading-relaxed">
                    {desc}
                  </p>
                </GlassCard>
              ))}
            </div>

            <a
              href={personal.resume}
              download="CV-Muhammad-Haidar.pdf"
              className="inline-flex items-center gap-2 text-accent text-sm font-medium hover:gap-3 transition-all duration-200 mt-2"
            >
              Download Resume ↗
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
