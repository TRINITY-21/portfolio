import { motion, useScroll, useSpring } from 'framer-motion'
import { Menu, X } from 'lucide-react'
import React, { useEffect, useState } from 'react'

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [activeSection, setActiveSection] = useState('home')

  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, { stiffness: 200, damping: 30, restDelta: 0.001 })

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }
    handleScroll()
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    const sections = document.querySelectorAll('section[id]')
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id)
          }
        })
      },
      { rootMargin: '-50% 0px -50% 0px' }
    )
    sections.forEach((section) => observer.observe(section))
    return () => observer.disconnect()
  }, [])

  const navItems = [
    { name: 'Home', href: '#home' },
    { name: 'About', href: '#about' },
    { name: 'Skills', href: '#skills' },
    { name: 'Projects', href: '#projects' },
    { name: 'Vibe Coded', href: '#vibe-coded' },
    { name: 'Experience', href: '#experience' },
    { name: 'Contact', href: '#contact' },
  ]

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled || isOpen
          ? 'bg-obsidian/95 backdrop-blur-2xl border-b border-line/[0.04] shadow-lg shadow-black/20'
          : 'bg-transparent'
      }`}
    >
      <div className="container-max">
        <div className="flex items-center justify-between h-16 sm:h-20">
          {/* Logo */}
          <motion.a
            href="#home"
            whileHover={{ scale: 1.02 }}
            className="flex items-center gap-2"
          >
            <div className="w-8 h-8 rounded-lg bg-accent/10 border border-accent/20 flex items-center justify-center">
              <span className="text-accent font-mono font-bold text-sm">J</span>
            </div>
            <span className="text-pearl font-semibold text-sm tracking-tight hidden sm:block">
              joseph<span className="text-accent">.dev</span>
            </span>
          </motion.a>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-6">
            {navItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className={`nav-link ${activeSection === item.href.slice(1) ? 'text-accent after:w-full' : ''}`}
              >
                {item.name}
              </a>
            ))}
          </div>

          {/* CTA - Desktop */}
          <div className="hidden md:flex items-center gap-3">
            <motion.a
              href="#contact"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="btn-outline px-4 py-2 text-xs"
            >
              Let's Talk
            </motion.a>
          </div>

          {/* Mobile: Menu Button */}
          <div className="md:hidden flex items-center gap-2">
            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={() => setIsOpen(!isOpen)}
              className="w-10 h-10 flex items-center justify-center rounded-lg
                         text-silver hover:text-pearl hover:bg-line/[0.04] transition-all duration-300"
            >
              {isOpen ? <X size={20} /> : <Menu size={20} />}
            </motion.button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <motion.div
          initial={false}
          animate={isOpen ? { height: 'auto', opacity: 1 } : { height: 0, opacity: 0 }}
          transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
          className="md:hidden overflow-hidden"
        >
          <div className="py-4 space-y-1 border-t border-line/[0.04]">
            {navItems.map((item, index) => (
              <motion.a
                key={item.name}
                href={item.href}
                initial={{ opacity: 0, x: -10 }}
                animate={isOpen ? { opacity: 1, x: 0 } : { opacity: 0, x: -10 }}
                transition={{ delay: index * 0.05 }}
                className={`block px-4 py-3 text-sm rounded-lg transition-all duration-300 font-medium ${
                  activeSection === item.href.slice(1)
                    ? 'text-accent bg-accent/[0.04]'
                    : 'text-silver hover:text-pearl hover:bg-line/[0.03]'
                }`}
                onClick={() => setIsOpen(false)}
              >
                {item.name}
              </motion.a>
            ))}
            <div className="pt-2 px-3">
              <a
                href="#contact"
                onClick={() => setIsOpen(false)}
                className="block w-full py-2.5 text-center text-sm font-medium bg-accent/10 text-accent
                           border border-accent/20 rounded-lg hover:bg-accent/20 transition-all duration-300"
              >
                Let's Talk
              </a>
            </div>
          </div>
        </motion.div>
      </div>
      {/* Scroll Progress Bar */}
      <motion.div
        style={{ scaleX }}
        className="absolute bottom-0 left-0 right-0 h-[1.5px] bg-gradient-to-r from-accent/80 to-accent/40 origin-left"
      />
    </motion.nav>
  )
}

export default Navbar
