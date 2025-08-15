import { motion } from 'framer-motion'
import { Menu, X } from 'lucide-react'
import React, { useEffect, useState } from 'react'

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navItems = [
    { name: 'Home', href: '#home' },
    { name: 'About', href: '#about' },
    { name: 'Skills', href: '#skills' },
    { name: 'Projects', href: '#projects' },
    { name: 'Experience', href: '#experience' },
    { name: 'Contact', href: '#contact' },
  ]

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled 
          ? 'bg-obsidian/95 backdrop-blur-md shadow-2xl' 
          : 'bg-transparent'
      }`}
    >
      <div className="container-max">
        <div className="flex items-center justify-between h-14 sm:h-16 px-4 sm:px-6 lg:px-8">
          {/* Logo */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="text-xl sm:text-2xl font-bold gradient-text"
          >
            J.Y.A
          </motion.div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <motion.a
                key={item.name}
                href={item.href}
                className="nav-link"
                whileHover={{ y: -2 }}
                transition={{ duration: 0.2 }}
              >
                {item.name}
              </motion.a>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsOpen(!isOpen)}
              className="text-platinum hover:text-white transition-colors"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </motion.button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <motion.div
          initial={false}
          animate={isOpen ? { height: 'auto', opacity: 1 } : { height: 0, opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="md:hidden overflow-hidden bg-obsidian/95 backdrop-blur-md"
        >
          <div className="px-4 py-6 space-y-4">
            {navItems.map((item) => (
              <motion.a
                key={item.name}
                href={item.href}
                className="block text-platinum hover:text-white transition-colors py-2"
                onClick={() => setIsOpen(false)}
                whileHover={{ x: 10 }}
                transition={{ duration: 0.2 }}
              >
                {item.name}
              </motion.a>
            ))}
          </div>
        </motion.div>
      </div>
    </motion.nav>
  )
}

export default Navbar
