import { motion } from 'framer-motion'
import { Building, Calendar, ExternalLink, MapPin } from 'lucide-react'
import React from 'react'

const Experience: React.FC = () => {
  const experiences = [
    {
      id: 1,
      company: "TechCorp Solutions",
      position: "Senior Full Stack Developer",
      duration: "2022 - Present",
      location: "San Francisco, CA",
      type: "Full-time",
      description: "Leading development of enterprise-scale web applications using React, Node.js, and cloud technologies. Mentoring junior developers and implementing best practices.",
      achievements: [
        "Led a team of 5 developers in building a customer portal serving 100K+ users",
        "Improved application performance by 40% through optimization and caching strategies",
        "Implemented CI/CD pipelines reducing deployment time by 60%",
        "Mentored 3 junior developers and conducted code review sessions"
      ],
      technologies: ["React", "Node.js", "AWS", "Docker", "PostgreSQL", "Redis"],
      logo: "TC"
    },
    {
      id: 2,
      company: "InnovateTech",
      position: "Full Stack Developer",
      duration: "2020 - 2022",
      location: "New York, NY",
      type: "Full-time",
      description: "Developed and maintained multiple web applications, focusing on user experience and performance optimization. Collaborated with design and product teams.",
      achievements: [
        "Built 3 major features for the main product, increasing user engagement by 25%",
        "Reduced page load times by 35% through code splitting and lazy loading",
        "Collaborated with UX team to implement responsive design improvements",
        "Participated in agile development process with 2-week sprint cycles"
      ],
      technologies: ["React", "Express.js", "MongoDB", "Socket.io", "Tailwind CSS"],
      logo: "IT"
    },
    {
      id: 3,
      company: "StartupHub",
      position: "Frontend Developer",
      duration: "2019 - 2020",
      location: "Austin, TX",
      type: "Full-time",
      description: "Focused on creating responsive and accessible user interfaces. Worked closely with designers to implement pixel-perfect designs.",
      achievements: [
        "Developed 5+ responsive web pages with 99% accessibility score",
        "Implemented design system components used across the entire application",
        "Optimized bundle size by 20% through tree shaking and code splitting",
        "Collaborated with backend team to design and implement REST APIs"
      ],
      technologies: ["React", "TypeScript", "Styled Components", "Jest", "Webpack"],
      logo: "SH"
    },
    {
      id: 4,
      company: "Freelance",
      position: "Web Developer",
      duration: "2018 - 2019",
      location: "Remote",
      type: "Contract",
      description: "Worked with various clients to build custom websites and web applications. Managed projects from conception to deployment.",
      achievements: [
        "Completed 15+ client projects with 100% satisfaction rate",
        "Built e-commerce sites, portfolios, and business websites",
        "Managed client relationships and project timelines independently",
        "Learned multiple frameworks and technologies through diverse projects"
      ],
      technologies: ["HTML/CSS", "JavaScript", "PHP", "WordPress", "jQuery"],
      logo: "FR"
    }
  ]

  return (
    <section id="experience" className="section-padding bg-slate relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 right-20 w-80 h-80 bg-gradient-to-bl from-platinum to-silver rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 left-20 w-72 h-72 bg-gradient-to-tr from-steel to-silver rounded-full blur-3xl"></div>
      </div>

      <div className="container-max relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold gradient-text mb-6">
            Work Experience
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-platinum to-silver mx-auto mb-6"></div>
          <p className="text-silver text-base md:text-lg max-w-3xl mx-auto px-4">
            My professional journey in software development, showcasing growth, achievements, 
            and the diverse range of projects I've contributed to.
          </p>
        </motion.div>

        {/* Experience Timeline */}
        <div className="relative px-4 sm:px-0">
          {/* Timeline Line - Hidden on mobile, visible on larger screens */}
          <div className="hidden md:block absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-platinum via-silver to-steel"></div>

          <div className="space-y-8 md:space-y-12">
            {experiences.map((experience, index) => (
              <motion.div
                key={experience.id}
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                className="relative"
              >
                {/* Timeline Dot - Hidden on mobile, visible on larger screens */}
                <div className="hidden md:block absolute left-6 top-6 w-4 h-4 bg-platinum rounded-full border-4 border-charcoal shadow-lg"></div>

                {/* Content Card */}
                <div className="md:ml-20 bg-charcoal/50 backdrop-blur-sm rounded-2xl p-4 sm:p-6 lg:p-8 border border-steel/30 
                               hover:border-platinum/50 transition-all duration-300 hover:shadow-2xl">
                  
                  {/* Header */}
                  <div className="flex flex-col gap-4 mb-6">
                    <div className="flex flex-col sm:flex-row sm:items-start gap-4">
                      {/* Company Logo */}
                      <div className="w-16 h-16 bg-gradient-to-br from-platinum to-silver rounded-xl 
                                     flex items-center justify-center text-obsidian font-bold text-lg shadow-lg flex-shrink-0">
                        {experience.logo}
                      </div>
                      
                      <div className="flex-1 min-w-0">
                        <h3 className="text-xl sm:text-2xl font-semibold text-platinum mb-2 leading-tight">
                          {experience.position}
                        </h3>
                        <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 text-silver text-sm sm:text-base">
                          <div className="flex items-center gap-2">
                            <Building className="w-4 h-4 flex-shrink-0" />
                            <span className="font-medium truncate">{experience.company}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <MapPin className="w-4 h-4 flex-shrink-0" />
                            <span className="truncate">{experience.location}</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Duration and Type */}
                    <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4">
                      <div className="flex items-center gap-2 text-silver text-sm sm:text-base">
                        <Calendar className="w-4 h-4 flex-shrink-0" />
                        <span className="font-medium">{experience.duration}</span>
                      </div>
                      <span className="px-3 py-1 bg-steel/30 text-platinum text-sm rounded-full border border-steel/30 w-fit">
                        {experience.type}
                      </span>
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-silver text-sm sm:text-base lg:text-lg leading-relaxed mb-6">
                    {experience.description}
                  </p>

                  {/* Achievements */}
                  <div className="mb-6">
                    <h4 className="text-platinum font-semibold mb-3 text-base sm:text-lg">Key Achievements:</h4>
                    <ul className="space-y-2">
                      {experience.achievements.map((achievement, achievementIndex) => (
                        <li key={achievementIndex} className="flex items-start gap-3 text-silver text-sm sm:text-base">
                          <div className="w-2 h-2 bg-platinum rounded-full mt-2 flex-shrink-0"></div>
                          <span className="leading-relaxed">{achievement}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Technologies */}
                  <div className="flex flex-wrap gap-2">
                    {experience.technologies.map((tech, techIndex) => (
                      <span
                        key={techIndex}
                        className="px-2 sm:px-3 py-1 bg-slate/50 text-silver text-xs sm:text-sm rounded-full border border-steel/30
                                   hover:border-platinum/50 hover:text-platinum transition-colors"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Download Resume Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="text-center mt-16"
        >
          <motion.button
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
            className="px-6 sm:px-8 py-3 sm:py-4 bg-platinum text-obsidian rounded-lg font-semibold text-base sm:text-lg
                       hover:bg-white transition-all duration-300 shadow-lg hover:shadow-xl"
          >
            <ExternalLink className="w-4 h-4 sm:w-5 sm:h-5 inline mr-2" />
            Download Full Resume
          </motion.button>
        </motion.div>
      </div>
    </section>
  )
}

export default Experience
