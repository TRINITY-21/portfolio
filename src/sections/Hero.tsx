import { motion } from 'framer-motion'
import { ArrowDown, Download, Mail } from 'lucide-react'
import React from 'react'

const Hero: React.FC = () => {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <section id="home" className="min-h-screen flex items-center justify-center relative overflow-hidden">
      {/* Background grid */}
      <div className="absolute inset-0 bg-grid animate-grid-fade" />

      {/* Gradient orbs */}
      <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-accent/[0.08] rounded-full blur-[120px] animate-glow-pulse" />
      <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-accent/[0.05] rounded-full blur-[100px] animate-glow-pulse" />

      {/* Top gradient fade */}
      <div className="absolute top-0 inset-x-0 h-40 bg-gradient-to-b from-obsidian to-transparent" />
      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 inset-x-0 h-40 bg-gradient-to-t from-obsidian to-transparent" />

      <div className="hero-container text-center relative z-10 py-28 sm:py-0">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          className="space-y-6 sm:space-y-8"
        >
          {/* Availability Badge */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="flex justify-center"
          >
            <div className="availability-badge inline-flex items-center gap-2.5 px-4 py-2
                            bg-emerald-500/[0.06] border border-emerald-500/20 rounded-full">
              <div className="availability-dot relative w-2 h-2 bg-emerald-400 rounded-full" />
              <span className="text-emerald-400/90 font-medium text-xs tracking-wide">
                Available for new opportunities
              </span>
            </div>
          </motion.div>

          {/* Name */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
          >
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-[1.1]">
              <span className="text-pearl">Joseph Yaw</span>
              <br />
              <span className="gradient-text-accent">Agyeman</span>
            </h1>
          </motion.div>

          {/* Title */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.8 }}
          >
            <p className="font-mono text-accent/80 text-xs sm:text-base tracking-wide">
              {'<'} Full Stack Developer & AI/ML Engineer {'/>'}
            </p>
          </motion.div>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9, duration: 0.8 }}
            className="text-silver text-base sm:text-lg content-constraint leading-relaxed max-w-2xl mx-auto"
          >
            Building intelligent applications with clean architecture, modern frameworks,
            and cutting-edge AI/ML technologies. Turning complex problems into elegant solutions.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.1, duration: 0.8 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-4 w-full sm:w-auto"
          >
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="btn-primary flex items-center justify-center gap-2.5 px-8 py-3.5 w-full sm:w-auto"
              onClick={() => scrollToSection('contact')}
            >
              <Mail className="w-4 h-4" />
              Get In Touch
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="btn-outline flex items-center justify-center gap-2.5 px-8 py-3.5 w-full sm:w-auto"
              onClick={() => window.open('https://drive.google.com/file/d/1oMVo0ut4BzpxZrmPdL2ytrJMAyLx13a-/view?usp=sharing', '_blank')}
            >
              <Download className="w-4 h-4" />
              Download CV
            </motion.button>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.3, duration: 0.8 }}
            className="flex justify-center pt-12 sm:pt-16"
          >
            <div className="inline-flex items-center divide-x divide-white/[0.06] px-3 sm:px-10 py-5 rounded-2xl
                            bg-white/[0.03] border border-white/[0.06] backdrop-blur-sm">
              {[
                { number: '5+', label: 'Years' },
                { number: '50+', label: 'Projects' },
                { number: '100%', label: 'Satisfaction' }
              ].map((stat, index) => (
                <div key={index} className="text-center px-4 sm:px-8">
                  <div className="text-xl sm:text-3xl font-bold text-pearl tracking-tight">{stat.number}</div>
                  <div className="text-silver/60 text-xs sm:text-sm font-medium mt-1">{stat.label}</div>
                </div>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 0.8 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
      >
        <motion.button
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="w-10 h-10 rounded-full border border-white/[0.06] flex items-center justify-center
                     text-silver hover:text-accent hover:border-accent/30 transition-all duration-300"
          onClick={() => scrollToSection('about')}
        >
          <ArrowDown size={16} />
        </motion.button>
      </motion.div>
    </section>
  )
}

export default Hero
