import { motion } from 'framer-motion'
import { ArrowUp, Heart } from 'lucide-react'
import React from 'react'

const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-obsidian border-t border-steel/30 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-96 h-96 
                       bg-gradient-to-b from-platinum to-transparent rounded-full blur-3xl"></div>
      </div>

      <div className="container-max relative z-10">
        <div className="py-8 sm:py-12 px-4 sm:px-6 lg:px-8">
          {/* Main Footer Content */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 mb-6 sm:mb-8">
            {/* Brand */}
            <div className="sm:col-span-2">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="mb-6"
              >
                <h3 className="text-xl sm:text-2xl font-bold gradient-text mb-4">Joseph Yaw Agyeman</h3>
                <p className="text-silver text-sm sm:text-lg leading-relaxed max-w-md">
                  A passionate Full Stack Developer & AI/ML Engineer dedicated to creating intelligent applications 
                  and innovative solutions that drive business value.
                </p>
              </motion.div>
            </div>

            {/* Quick Links */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="px-2 sm:px-0"
            >
              <h4 className="text-platinum font-semibold mb-4 text-base sm:text-lg">Quick Links</h4>
              <ul className="space-y-2">
                {['Home', 'About', 'Skills', 'Projects', 'Experience', 'Contact'].map((link, index) => (
                  <li key={index}>
                    <a
                      href={`#${link.toLowerCase()}`}
                      className="text-silver hover:text-platinum transition-colors duration-300 text-sm sm:text-base"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Contact Info */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="px-2 sm:px-0"
            >
              <h4 className="text-platinum font-semibold mb-4 text-base sm:text-lg">Contact</h4>
              <ul className="space-y-2 text-silver text-sm sm:text-base">
                <li>agyemanjoseph12@yahoo.com</li>
                <li>+90 538 243 24 00</li>
                <li>Adapazari, Sakarya Turkey</li>
              </ul>
            </motion.div>
          </div>

          {/* Divider */}
          <div className="w-full h-px bg-gradient-to-r from-transparent via-steel to-transparent mb-6 sm:mb-8"></div>

          {/* Bottom Footer */}
          <div className="flex flex-col gap-4 sm:gap-6 px-2 sm:px-0">
            {/* Copyright */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="text-center sm:text-left"
            >
              <p className="text-silver text-sm sm:text-base flex flex-col sm:flex-row items-center justify-center sm:justify-start gap-1">
                <span>© {currentYear} Joseph Yaw Agyeman. Made with</span>
                <Heart className="w-4 h-4 text-red-500 inline" />
                <span>and lots of coffee.</span>
              </p>
            </motion.div>

            {/* Social Links */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="flex justify-center sm:justify-start gap-3 sm:gap-4 lg:gap-6 flex-wrap"
            >
              {[
              { name: 'LinkedIn', url: 'https://www.linkedin.com/in/joseph-yaw-agyeman-747384241/' },
              { name: 'GitHub', url: 'https://github.com/TRINITY-21' }
            ].map((social, index) => (
                <a
                  key={index}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-silver hover:text-platinum transition-colors duration-300 text-sm sm:text-base px-2 py-1"
                >
                  {social.name}
                </a>
              ))}
            </motion.div>
          </div>
        </div>
      </div>

      {/* Scroll to Top Button */}
      <motion.button
        initial={{ opacity: 0, scale: 0.8 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.5 }}
        onClick={scrollToTop}
        whileHover={{ scale: 1.1, y: -2 }}
        whileTap={{ scale: 0.9 }}
        className="fixed bottom-4 sm:bottom-8 right-4 sm:right-8 w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-r from-platinum to-silver 
                   text-obsidian rounded-full shadow-lg hover:shadow-xl transition-all duration-300
                   flex items-center justify-center z-40"
      >
        <ArrowUp className="w-4 h-4 sm:w-5 sm:h-5" />
      </motion.button>
    </footer>
  )
}

export default Footer
