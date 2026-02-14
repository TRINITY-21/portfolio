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
        'steel': '#2a2a2a',
        'silver': '#737373',
        'platinum': '#e0e0e0',
        'pearl': '#fafafa',
        'obsidian': '#09090b',
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
        'glow-pulse': 'glowPulse 3s ease-in-out infinite',
        'grid-fade': 'gridFade 4s ease-in-out infinite',
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
        glowPulse: {
          '0%, 100%': { opacity: '0.4' },
          '50%': { opacity: '0.8' },
        },
        gridFade: {
          '0%, 100%': { opacity: '0.15' },
          '50%': { opacity: '0.25' },
        },
      },
      backgroundImage: {
        'grid-pattern': 'linear-gradient(rgba(6, 182, 212, 0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(6, 182, 212, 0.03) 1px, transparent 1px)',
        'dot-pattern': 'radial-gradient(circle, rgba(6, 182, 212, 0.08) 1px, transparent 1px)',
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
      },
      backgroundSize: {
        'grid': '60px 60px',
        'dot': '24px 24px',
      },
      boxShadow: {
        'glow': '0 0 20px rgba(6, 182, 212, 0.15)',
        'glow-lg': '0 0 40px rgba(6, 182, 212, 0.2)',
        'glow-xl': '0 0 60px rgba(6, 182, 212, 0.25)',
        'card': '0 1px 3px rgba(0,0,0,0.3), 0 8px 32px rgba(0,0,0,0.2)',
        'card-hover': '0 4px 12px rgba(0,0,0,0.4), 0 16px 48px rgba(0,0,0,0.3), 0 0 24px rgba(6, 182, 212, 0.08)',
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
}
