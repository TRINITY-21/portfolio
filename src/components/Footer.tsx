import { AnimatePresence, motion } from 'framer-motion'
import { ArrowUp, Github, Linkedin } from 'lucide-react'
import React, { useEffect, useState } from 'react'

const Footer: React.FC = () => {
  const [showScrollTop, setShowScrollTop] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > window.innerHeight)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const currentYear = new Date().getFullYear()

  return (
    <footer className="relative overflow-hidden border-t border-line/[0.04]">

      <div className="container-max relative z-10">
        <div className="py-12 sm:py-16 lg:py-20">
          {/* Main Footer */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {/* Brand */}
            <div className="sm:col-span-2">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 rounded-lg bg-accent/10 border border-accent/20 flex items-center justify-center">
                  <span className="text-accent font-mono font-bold text-sm">J</span>
                </div>
                <span className="text-pearl font-semibold text-sm tracking-tight">
                  joseph<span className="text-accent">.dev</span>
                </span>
              </div>
              <p className="text-silver text-sm leading-relaxed max-w-md">
                Full Stack Developer & AI/ML Engineer crafting intelligent applications
                and innovative solutions that drive business value.
              </p>

              {/* Social Links */}
              <div className="flex gap-3 mt-6">
                <a
                  href="https://www.linkedin.com/in/joseph-yaw-agyeman-747384241/"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="LinkedIn"
                  className="w-10 h-10 rounded-lg bg-line/[0.03] border border-line/[0.06]
                             flex items-center justify-center text-silver hover:text-accent
                             hover:border-accent/20 hover:bg-accent/[0.06] hover:scale-105 transition-all duration-300"
                >
                  <Linkedin className="w-4 h-4" />
                </a>
                <a
                  href="https://github.com/TRINITY-21"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="GitHub"
                  className="w-10 h-10 rounded-lg bg-line/[0.03] border border-line/[0.06]
                             flex items-center justify-center text-silver hover:text-accent
                             hover:border-accent/20 hover:bg-accent/[0.06] hover:scale-105 transition-all duration-300"
                >
                  <Github className="w-4 h-4" />
                </a>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <p className="text-pearl font-medium text-sm mb-4 tracking-wide">Navigation</p>
              <ul className="space-y-2.5">
                {[
                  { label: 'Home', href: '#home' },
                  { label: 'About', href: '#about' },
                  { label: 'Skills', href: '#skills' },
                  { label: 'Projects', href: '#projects' },
                  { label: 'Vibe Coded', href: '#vibe-coded' },
                  { label: 'Experience', href: '#experience' },
                  { label: 'Contact', href: '#contact' },
                  { label: 'Blog', href: '/blog' },
                ].map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="text-silver text-sm hover:text-accent hover:translate-x-1 transition-all duration-300 inline-block"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact */}
            <div>
              <p className="text-pearl font-medium text-sm mb-4 tracking-wide">Contact</p>
              <ul className="space-y-2.5 text-silver text-sm break-all sm:break-normal">
                <li>agyemanjoseph12@yahoo.com</li>
                <li>+90 538 243 24 00</li>
                <li>Adapazari, Sakarya Turkey</li>
              </ul>
            </div>
          </div>

          {/* Divider */}
          <div className="h-px bg-gradient-to-r from-transparent via-line/[0.06] to-transparent mb-8" />

          {/* Bottom */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-silver text-xs">
              &copy; {currentYear} Joseph Yaw Agyeman. All rights reserved.
            </p>
            <p className="text-silver text-xs font-mono">
              Built with React + TypeScript
            </p>
          </div>
        </div>
      </div>

      {/* Scroll to Top */}
      <AnimatePresence>
        {showScrollTop && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.2 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={scrollToTop}
            aria-label="Scroll to top"
            className="fixed bottom-6 right-6 w-11 h-11 rounded-xl bg-accent/10 backdrop-blur-md border border-accent/20
                       text-accent flex items-center justify-center z-40
                       hover:bg-accent/20 hover:shadow-glow transition-all duration-300"
          >
            <ArrowUp className="w-4 h-4" />
          </motion.button>
        )}
      </AnimatePresence>
    </footer>
  )
}

export default Footer
