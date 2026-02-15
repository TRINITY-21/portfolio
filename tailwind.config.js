/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'charcoal': '#111111',
        'slate': '#1a1a1a',
        'platinum': '#e0e0e0',
        // Theme-aware colors via CSS variables
        'obsidian': 'rgb(var(--color-bg-primary) / <alpha-value>)',
        'steel': 'rgb(var(--color-bg-secondary) / <alpha-value>)',
        'pearl': 'rgb(var(--color-text-primary) / <alpha-value>)',
        'silver': 'rgb(var(--color-text-secondary) / <alpha-value>)',
        'line': 'rgb(var(--color-border) / <alpha-value>)',
        'accent': {
          DEFAULT: '#06b6d4',
          50: '#ecfeff',
          100: '#cffafe',
          200: '#a5f3fc',
          300: '#67e8f9',
          400: '#22d3ee',
          500: '#06b6d4',
          600: '#0891b2',
          700: '#0e7490',
          800: '#155e75',
          900: '#164e63',
        },
      },
      fontFamily: {
        'sans': ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
        'mono': ['JetBrains Mono', 'Fira Code', 'monospace'],
      },
      animation: {
        'fade-in': 'fadeIn 0.6s ease-out',
        'slide-up': 'slideUp 0.8s ease-out',
        'slide-down': 'slideDown 0.8s ease-out',
        'scale-in': 'scaleIn 0.5s ease-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(30px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        slideDown: {
          '0%': { transform: 'translateY(-30px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        scaleIn: {
          '0%': { transform: 'scale(0.9)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
      },
      backgroundImage: {
        'grid-pattern': 'linear-gradient(var(--grid-line-color) 1px, transparent 1px), linear-gradient(90deg, var(--grid-line-color) 1px, transparent 1px)',
        'dot-pattern': 'radial-gradient(circle, rgba(6, 182, 212, 0.08) 1px, transparent 1px)',
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
      },
      backgroundSize: {
        'grid': '60px 60px',
        'dot': '24px 24px',
      },
      boxShadow: {
        'glow': 'var(--shadow-glow)',
        'glow-lg': 'var(--shadow-glow-lg)',
        'glow-xl': '0 0 40px rgba(6, 182, 212, 0.15)',
        'card': 'var(--shadow-card)',
        'card-hover': 'var(--shadow-card-hover)',
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
}
