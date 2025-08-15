import { motion } from 'framer-motion'
import { Award, Heart, Target, User } from 'lucide-react'
import React from 'react'

const About: React.FC = () => {
  const features = [
    {
      icon: <Target className="w-6 h-6 sm:w-8 sm:h-8" />,
      title: "Goal-Oriented",
      description: "Focused on delivering results that exceed expectations and drive business growth."
    },
    {
      icon: <Award className="w-6 h-6 sm:w-8 sm:h-8" />,
      title: "Quality-Driven",
      description: "Committed to writing clean, maintainable code and creating exceptional user experiences."
    },
    {
      icon: <Heart className="w-6 h-6 sm:w-8 sm:h-8" />,
      title: "Passionate",
      description: "Genuinely excited about technology and its potential to solve real-world problems."
    },
    {
      icon: <User className="w-6 h-6 sm:w-8 sm:h-8" />,
      title: "User-Centric",
      description: "Always putting the end-user first, ensuring intuitive and accessible design."
    }
  ]

  return (
    <section id="about" className="section-padding bg-charcoal relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 left-20 w-64 h-64 bg-gradient-to-br from-platinum to-silver rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-gradient-to-tl from-steel to-silver rounded-full blur-3xl"></div>
      </div>

      <div className="container-max relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12 sm:mb-16"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold gradient-text mb-6">
            About Me
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-platinum to-silver mx-auto"></div>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Left Column - Image and Personal Info */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="space-y-6 sm:space-y-8 order-2 lg:order-1"
          >
            {/* Profile Image */}
            <div className="relative">
              <div className="w-64 h-64 sm:w-80 sm:h-80 mx-auto rounded-2xl overflow-hidden shadow-2xl border-4 border-platinum/30">
                <img 
                  src="/me.png" 
                  alt="Joseph Yaw Agyeman - Professional Headshot"
                  className="w-full h-full object-cover"
                />
              </div>
              
            </div>

            {/* Personal Info */}
            <div className="text-center lg:text-left space-y-4">
              <h3 className="text-xl sm:text-2xl font-semibold text-platinum">Joseph Yaw Agyeman</h3>
              <p className="text-silver text-base sm:text-lg">
                A passionate developer with a love for creating innovative solutions and beautiful user experiences.
              </p>
            </div>
          </motion.div>

          {/* Right Column - Content */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="space-y-6 sm:space-y-8 order-1 lg:order-2"
          >
            {/* Main Description */}
            <div className="space-y-4 sm:space-y-6">
              <p className="text-silver text-base sm:text-lg leading-relaxed">
                I'm a dedicated Full Stack Developer with over 5 years of experience in building 
                modern web applications. My journey in technology began with a curiosity about 
                how things work, which evolved into a passion for creating digital solutions 
                that make a real impact.
              </p>
              
              <p className="text-silver text-base sm:text-lg leading-relaxed">
                I specialize in React, Node.js, and cloud technologies, with a strong focus on 
                performance, scalability, and user experience. Every project I work on is an 
                opportunity to learn, grow, and push the boundaries of what's possible.
              </p>

              <p className="text-silver text-base sm:text-lg leading-relaxed">
                When I'm not coding, you'll find me exploring new technologies, contributing to 
                open-source projects, or sharing knowledge with the developer community. I believe 
                in continuous learning and staying ahead of industry trends.
              </p>
            </div>

            {/* Key Features Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 pt-6 sm:pt-8">
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="text-center p-4 sm:p-6 rounded-xl bg-slate/30 backdrop-blur-sm 
                             border border-steel/30 hover:border-platinum/50 transition-all duration-300
                             hover:bg-slate/50 group"
                >
                  <div className="text-platinum mb-3 sm:mb-4 group-hover:scale-110 transition-transform duration-300">
                    {feature.icon}
                  </div>
                  <h4 className="text-platinum font-semibold mb-2 text-sm sm:text-base">{feature.title}</h4>
                  <p className="text-silver text-xs sm:text-sm leading-relaxed">{feature.description}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default About
