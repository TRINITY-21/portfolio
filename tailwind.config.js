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
      typography: {
        DEFAULT: {
          css: {
            color: 'rgb(var(--color-text-secondary))',
            maxWidth: '72ch',
            a: {
              color: '#06b6d4',
              textDecoration: 'underline',
              textDecorationColor: 'rgba(6, 182, 212, 0.3)',
              '&:hover': { color: '#22d3ee', textDecorationColor: '#22d3ee' },
            },
            strong: { color: 'rgb(var(--color-text-primary))' },
            h1: { color: 'rgb(var(--color-text-primary))' },
            h2: { color: 'rgb(var(--color-text-primary))' },
            h3: { color: 'rgb(var(--color-text-primary))' },
            h4: { color: 'rgb(var(--color-text-primary))' },
            blockquote: {
              borderLeftColor: '#06b6d4',
              color: 'rgb(var(--color-text-secondary))',
              backgroundColor: 'rgba(42, 42, 42, 0.3)',
              padding: '1rem 1.5rem',
              borderRadius: '0 0.75rem 0.75rem 0',
            },
            code: {
              color: '#06b6d4',
              backgroundColor: 'rgba(42, 42, 42, 0.5)',
              borderRadius: '0.25rem',
              padding: '0.125rem 0.375rem',
              fontWeight: '500',
            },
            'code::before': { content: 'none' },
            'code::after': { content: 'none' },
            'pre code': { color: 'rgb(var(--color-text-primary))', backgroundColor: 'transparent', padding: '0' },
            pre: { backgroundColor: 'transparent', padding: '0', margin: '0' },
            hr: { borderColor: 'rgba(255, 255, 255, 0.06)' },
            'thead th': { color: 'rgb(var(--color-text-primary))', borderBottomColor: 'rgba(255, 255, 255, 0.1)' },
            'tbody td': { borderBottomColor: 'rgba(255, 255, 255, 0.06)' },
            img: { borderRadius: '0.75rem' },
            li: { color: 'rgb(var(--color-text-secondary))' },
            'li::marker': { color: 'rgba(6, 182, 212, 0.5)' },
            'ol > li::marker': { color: 'rgba(6, 182, 212, 0.5)' },
          },
        },
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
