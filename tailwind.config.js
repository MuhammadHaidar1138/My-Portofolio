/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        // Display font: Sharp, editorial feel
        display: ['"Syne"', 'sans-serif'],
        // Body font: Clean and readable
        body: ['"DM Sans"', 'sans-serif'],
        // Mono font for code snippets
        mono: ['"JetBrains Mono"', 'monospace'],
      },
      colors: {
        // Core dark palette
        bg: {
          primary: '#080c14',
          secondary: '#0d1424',
          card: '#111827',
          hover: '#1a2235',
        },
        // Accent: Electric cyan-teal
        accent: {
          DEFAULT: '#00d4ff',
          dim: '#00a8cc',
          glow: 'rgba(0, 212, 255, 0.15)',
          subtle: 'rgba(0, 212, 255, 0.08)',
        },
        // Secondary accent: Violet
        violet: {
          DEFAULT: '#7c3aed',
          light: '#a855f7',
          glow: 'rgba(124, 58, 237, 0.2)',
        },
        // Text hierarchy
        text: {
          primary: '#f0f4ff',
          secondary: '#8b9ab8',
          muted: '#4a5568',
        },
        // Border colors
        border: {
          DEFAULT: 'rgba(255,255,255,0.06)',
          accent: 'rgba(0, 212, 255, 0.3)',
        }
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'gradient-x': 'gradient-x 8s ease infinite',
        'spin-slow': 'spin 8s linear infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        'gradient-x': {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
      },
      backdropBlur: {
        xs: '2px',
      },
      boxShadow: {
        'glow-accent': '0 0 30px rgba(0, 212, 255, 0.15)',
        'glow-violet': '0 0 30px rgba(124, 58, 237, 0.2)',
        'card': '0 4px 24px rgba(0,0,0,0.4)',
        'card-hover': '0 8px 40px rgba(0,0,0,0.6)',
      },
    },
  },
  plugins: [],
}
