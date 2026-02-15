import { motion } from 'framer-motion'
import { Menu, X } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'

interface NavItem {
  name: string
  href: string
  type: 'hash' | 'route'
}

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [activeSection, setActiveSection] = useState('home')

  const location = useLocation()
  const navigate = useNavigate()
  const isHomePage = location.pathname === '/'

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }
    handleScroll()
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    if (!isHomePage) return
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
  }, [isHomePage])

  const navItems: NavItem[] = [
    { name: 'Home', href: '#home', type: 'hash' },
    { name: 'About', href: '#about', type: 'hash' },
    { name: 'Skills', href: '#skills', type: 'hash' },
    { name: 'Projects', href: '#projects', type: 'hash' },
    { name: 'Vibe Coded', href: '#vibe-coded', type: 'hash' },
    { name: 'Experience', href: '#experience', type: 'hash' },
    { name: 'Contact', href: '#contact', type: 'hash' },
    { name: 'Blog', href: '/blog', type: 'route' },
  ]

  const handleNavClick = (e: React.MouseEvent, item: NavItem) => {
    e.preventDefault()
    setIsOpen(false)

    if (item.type === 'route') {
      navigate(item.href)
    } else if (isHomePage) {
      const element = document.getElementById(item.href.slice(1))
      element?.scrollIntoView({ behavior: 'smooth' })
    } else {
      navigate('/' + item.href)
    }
  }

  const handleCtaClick = (e: React.MouseEvent) => {
    e.preventDefault()
    setIsOpen(false)
    if (isHomePage) {
      document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })
    } else {
      navigate('/#contact')
    }
  }

  const isActive = (item: NavItem) => {
    if (item.type === 'route') {
      return location.pathname.startsWith(item.href)
    }
    return isHomePage && activeSection === item.href.slice(1)
  }

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled || isOpen
          ? 'bg-obsidian backdrop-blur-2xl border-b border-line/[0.04] shadow-lg shadow-black/20'
          : 'bg-transparent'
      }`}
    >
      <div className="container-max">
        <div className="flex items-center justify-between h-16 sm:h-20">
          {/* Logo */}
          <motion.div whileHover={{ scale: 1.02 }}>
            <Link to="/" className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-accent/10 border border-accent/20 flex items-center justify-center">
                <span className="text-accent font-mono font-bold text-sm">J</span>
              </div>
              <span className="text-pearl font-semibold text-sm tracking-tight hidden sm:block">
                joseph<span className="text-accent">.dev</span>
              </span>
            </Link>
          </motion.div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-6">
            {navItems.map((item) => (
              <a
                key={item.name}
                href={item.type === 'route' ? item.href : item.href}
                onClick={(e) => handleNavClick(e, item)}
                className={`nav-link ${isActive(item) ? 'text-accent after:w-full' : ''}`}
              >
                {item.name}
              </a>
            ))}
          </div>

          {/* CTA - Desktop */}
          <div className="hidden md:flex items-center gap-3">
            <motion.a
              href="#contact"
              onClick={handleCtaClick}
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
              aria-label={isOpen ? 'Close menu' : 'Open menu'}
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
                href={item.type === 'route' ? item.href : item.href}
                onClick={(e) => handleNavClick(e, item)}
                initial={{ opacity: 0, x: -10 }}
                animate={isOpen ? { opacity: 1, x: 0 } : { opacity: 0, x: -10 }}
                transition={{ delay: index * 0.05 }}
                className={`block px-4 py-3 text-sm rounded-lg transition-all duration-300 font-medium ${
                  isActive(item)
                    ? 'text-accent bg-accent/[0.04]'
                    : 'text-silver hover:text-pearl hover:bg-line/[0.03]'
                }`}
              >
                {item.name}
              </motion.a>
            ))}
            <div className="pt-2 px-3">
              <a
                href="#contact"
                onClick={handleCtaClick}
                className="block w-full py-2.5 text-center text-sm font-medium bg-accent/10 text-accent
                           border border-accent/20 rounded-lg hover:bg-accent/20 transition-all duration-300"
              >
                Let's Talk
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.nav>
  )
}

export default Navbar
