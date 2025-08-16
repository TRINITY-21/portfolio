import { motion } from 'framer-motion'
import { ChevronDown, Download, Mail } from 'lucide-react'
import React from 'react'

const Hero: React.FC = () => {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <section id="home" className="min-h-screen flex items-center justify-center relative overflow-hidden px-4 sm:px-6 lg:px-8 pt-20 sm:pt-24 lg:pt-28 pb-8 sm:pb-12">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0 bg-gradient-to-br from-platinum via-silver to-steel"></div>
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 25% 25%, rgba(255,255,255,0.1) 1px, transparent 1px),
                           radial-gradient(circle at 75% 75%, rgba(255,255,255,0.1) 1px, transparent 1px)`,
          backgroundSize: '50px 50px'
        }}></div>
      </div>

      <div className="hero-container text-center relative z-10 mb-4 sm:mb-6 lg:mb-8 xl:mb-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="space-y-4 sm:space-y-6 lg:space-y-8 xl:space-y-10"
        >

          {/* Greeting */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="text-silver text-base sm:text-lg md:text-xl font-medium"
          >
            Hello, I'm
          </motion.p>

          {/* Name */}
          <motion.h1
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.6, duration: 0.8, type: "spring" }}
            className="text-4xl sm:text-5xl md:text-6xl lg:text-6xl xl:text-7xl font-bold gradient-text leading-tight sm:leading-tight md:leading-tight lg:leading-relaxed xl:leading-relaxed"
          >
            Joseph Yaw Agyeman
          </motion.h1>

          {/* Title */}
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.8 }}
            className="text-xl sm:text-2xl md:text-3xl lg:text-4xl text-platinum font-medium leading-tight sm:leading-tight md:leading-tight lg:leading-relaxed xl:leading-relaxed"
          >
            Full Stack Developer & AI/ML Engineer
          </motion.h2>

          {/* Availability Status Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ 
              opacity: 1, 
              scale: 1,
              y: [0, -8, 0]
            }}
            transition={{ 
              delay: 1.0, 
              duration: 0.8, 
              type: "spring",
              y: {
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut"
              }
            }}
            className="availability-badge inline-flex items-center gap-3 px-5 py-3 bg-gradient-to-r from-platinum/10 via-silver/15 to-steel/10 
                       border border-platinum/40 rounded-full backdrop-blur-md shadow-2xl hover:shadow-platinum/25 
                       transition-all duration-500 hover:scale-105 hover:border-platinum/60 group mt-4"
          >
            {/* Animated Pulse Dot */}
            <div className="availability-dot relative w-3 h-3 bg-platinum rounded-full"></div>
            
            {/* Status Text */}
            <span className="text-platinum font-semibold text-sm sm:text-base tracking-wide group-hover:text-white transition-colors duration-300">
              Available for new opportunities
            </span>
            
            {/* Subtle Sparkle Effect */}
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
              className="w-4 h-4 text-silver opacity-60 group-hover:opacity-100 transition-opacity duration-300"
            >
              ✨
            </motion.div>
          </motion.div>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2, duration: 0.8 }}
            className="text-silver text-base sm:text-lg md:text-xl content-constraint leading-relaxed mt-4 text-balance"
          >
            Building intelligent applications with clean code, modern frameworks, 
            and cutting-edge AI/ML technologies. Passionate about creating innovative solutions that drive business value.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.4, duration: 0.8 }}
            className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center pt-4 sm:pt-6"
          >
            <motion.button
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              className="w-full sm:w-auto bg-platinum text-obsidian px-6 sm:px-8 py-3 sm:py-4 rounded-lg font-semibold text-base sm:text-lg 
                         hover:bg-white transition-all duration-300 shadow-lg hover:shadow-xl
                         flex items-center justify-center gap-2"
              onClick={() => scrollToSection('contact')}
            >
              <Mail className="w-4 h-4 sm:w-5 sm:h-5" />
              Get In Touch
            </motion.button>
            
            <motion.button
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              className="w-full sm:w-auto border-2 border-platinum text-platinum px-6 sm:px-8 py-3 sm:py-4 rounded-lg font-semibold text-base sm:text-lg
                         hover:bg-platinum hover:text-obsidian transition-all duration-300
                         flex items-center justify-center gap-2"
              onClick={() => window.open('https://drive.google.com/file/d/1oMVo0ut4BzpxZrmPdL2ytrJMAyLx13a-/view?usp=sharing', '_blank')}
            >
              <Download className="w-4 h-4 sm:w-5 sm:h-5" />
              Download CV
            </motion.button>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.6, duration: 0.8 }}
            className="grid grid-cols-3 gap-4 sm:gap-8 lg:gap-12 xl:gap-16 ultra-wide-constraint pt-8 sm:pt-12 lg:pt-16 xl:pt-20"
          >
            {[
              { number: '5+', label: 'Years Experience' },
              { number: '50+', label: 'Projects Completed' },
              { number: '100%', label: 'Client Satisfaction' } 
            ].map((stat, index) => (
                              <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 1.8 + index * 0.1, duration: 0.6 }}
                  className="text-center"
                >
                <div className="text-2xl sm:text-3xl md:text-4xl font-bold gradient-text">{stat.number}</div>
                <div className="text-silver text-xs sm:text-sm md:text-base leading-tight">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.2, duration: 0.8 }}
        className="absolute bottom-6 sm:bottom-8 left-1/2 transform -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="cursor-pointer"
          onClick={() => scrollToSection('about')}
        >
          <ChevronDown size={28} className="sm:w-8 sm:h-8 text-platinum hover:text-white transition-colors" />
        </motion.div>
      </motion.div>
    </section>
  )
}

export default Hero
