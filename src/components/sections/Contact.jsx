import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { FaGithub, FaLinkedin} from 'react-icons/fa'
import { MdEmail, MdPhone, MdLocationOn } from 'react-icons/md'
import { SectionHeader, GlassCard, Button } from '../ui/index'
import { fadeUp, slideLeft, slideRight } from '../../utils/animations'
import personal from '../../data/personal.json'

const SOCIALS = [
  { key: 'github', icon: FaGithub, label: 'GitHub' },
  { key: 'linkedin', icon: FaLinkedin, label: 'LinkedIn' },
]

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', message: '' })
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value })

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    // Simulate submission — replace with actual API call / EmailJS / Formspree
    await new Promise((r) => setTimeout(r, 1200))
    setLoading(false)
    setSubmitted(true)
    setForm({ name: '', email: '', message: '' })
  }

  return (
    <section id="contact" className="py-32 px-6 bg-bg-secondary">
      <div className="max-w-5xl mx-auto">
        <SectionHeader
          label="09. Contact"
          title="Let's Work Together"
          subtitle="Have a project in mind or just want to say hi? I'd love to hear from you."
        />

        <div className="grid md:grid-cols-2 gap-12 items-start">
          {/* Left — contact info */}
          <motion.div
            variants={slideLeft}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="space-y-8"
          >
            <div className="space-y-4">
              {[
                { icon: MdEmail, label: 'Email', value: personal.email, href: `mailto:${personal.email}` },
                { icon: MdPhone, label: 'Phone', value: personal.phone, href: `tel:${personal.phone}` },
                { icon: MdLocationOn, label: 'Location', value: personal.location, href: null },
              ].map(({ icon: Icon, label, value, href }) => (
                <GlassCard key={label} className="p-4 flex items-center gap-4">
                  <div className="w-10 h-10 rounded-xl bg-accent-subtle border border-accent/20 flex items-center justify-center shrink-0">
                    <Icon size={18} className="text-accent" />
                  </div>
                  <div>
                    <p className="text-text-muted text-xs uppercase tracking-wider font-mono">{label}</p>
                    {href ? (
                      <a href={href} className="text-text-secondary hover:text-accent transition-colors text-sm font-medium">{value}</a>
                    ) : (
                      <p className="text-text-secondary text-sm font-medium">{value}</p>
                    )}
                  </div>
                </GlassCard>
              ))}
            </div>

            {/* Social links */}
            <div>
              <p className="text-text-muted text-xs uppercase tracking-wider font-mono mb-4">Find me online</p>
              <div className="flex gap-3">
                {SOCIALS.map(({ key, icon: Icon, label }) => (
                  <a
                    key={key}
                    href={personal.social[key]}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={label}
                    className="w-11 h-11 glass rounded-xl border border-white/6 flex items-center justify-center text-text-secondary hover:text-accent hover:border-accent/30 transition-all duration-200 hover:shadow-glow-accent"
                  >
                    <Icon size={17} />
                  </a>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Right — contact form */}
          <motion.div
            variants={slideRight}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <GlassCard className="p-7">
              {submitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-10"
                >
                  <div className="text-5xl mb-4">✓</div>
                  <h3 className="font-display font-bold text-text-primary text-2xl mb-2">Message Sent!</h3>
                  <p className="text-text-secondary text-sm">Thanks for reaching out. I'll get back to you soon.</p>
                  <button
                    onClick={() => setSubmitted(false)}
                    className="mt-6 text-accent text-sm hover:underline"
                  >
                    Send another message
                  </button>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  {[
                    { name: 'name', label: 'Name', type: 'text', placeholder: 'Your Full Name' },
                    { name: 'email', label: 'Email', type: 'email', placeholder: 'Your@gmail.com' },
                  ].map(({ name, label, type, placeholder }) => (
                    <div key={name}>
                      <label className="block text-text-secondary text-xs font-mono uppercase tracking-wider mb-2">
                        {label}
                      </label>
                      <input
                        type={type}
                        name={name}
                        value={form[name]}
                        onChange={handleChange}
                        placeholder={placeholder}
                        required
                        className="w-full bg-bg-hover border border-white/8 rounded-xl px-4 py-3 text-text-primary text-sm placeholder-text-muted focus:outline-none focus:border-accent/50 focus:shadow-glow-accent transition-all"
                      />
                    </div>
                  ))}

                  <div>
                    <label className="block text-text-secondary text-xs font-mono uppercase tracking-wider mb-2">
                      Message
                    </label>
                    <textarea
                      name="message"
                      value={form.message}
                      onChange={handleChange}
                      placeholder="Tell me about your project..."
                      required
                      rows={5}
                      className="w-full bg-bg-hover border border-white/8 rounded-xl px-4 py-3 text-text-primary text-sm placeholder-text-muted focus:outline-none focus:border-accent/50 focus:shadow-glow-accent transition-all resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full py-3 rounded-xl bg-gradient-to-r from-accent to-violet-light text-bg-primary font-semibold text-sm hover:shadow-glow-accent hover:scale-[1.02] active:scale-100 transition-all duration-200 disabled:opacity-60 disabled:cursor-not-allowed"
                  >
                    {loading ? 'Sending...' : 'Send Message →'}
                  </button>
                </form>
              )}
            </GlassCard>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
