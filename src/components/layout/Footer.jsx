import React from 'react'
import { FaGithub, FaLinkedin} from 'react-icons/fa'
import { MdEmail } from 'react-icons/md'
import personal from '../../data/personal.json'

const ICON_MAP = { FaGithub, FaLinkedin, MdEmail }

const SOCIAL_ICONS = [
  { key: 'github', icon: FaGithub },
  { key: 'linkedin', icon: FaLinkedin },
  { key: 'email', icon: MdEmail },
]

export default function Footer() {
  return (
    <footer className="border-t border-white/5 py-12 px-6">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        {/* Brand */}
        <div className="text-center md:text-left">
          <span className="font-display font-bold text-xl gradient-text">{personal.name.split(' ')[0][0]}{personal.name.split(' ')[1][0]}.</span>
          <p className="text-text-muted text-sm mt-1">Crafting digital experiences</p>
        </div>

        {/* Social links */}
        <div className="flex items-center gap-4">
          {SOCIAL_ICONS.map(({ key, icon: Icon }) => (
            <a
              key={key}
              href={personal.social[key]}
              target="_blank"
              rel="noopener noreferrer"
              className="text-text-muted hover:text-accent transition-colors duration-200 text-lg"
              aria-label={key}
            >
              <Icon />
            </a>
          ))}
        </div>

        {/* Copyright */}
        <p className="text-text-muted text-sm">
          © {new Date().getFullYear()} {personal.name}. Built with React & ♥
        </p>
      </div>
    </footer>
  )
}
