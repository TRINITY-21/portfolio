import { motion } from 'framer-motion'
import { Cloud, Code, Database, Globe, Palette, Smartphone } from 'lucide-react'
import React from 'react'

const Skills: React.FC = () => {
  const skillCategories = [
    {
      icon: <Code className="w-6 h-6 sm:w-8 sm:h-8" />,
      title: "Frontend Development",
      skills: [
        { name: "React", level: 95 },
        { name: "TypeScript", level: 90 },
        { name: "JavaScript", level: 95 },
        { name: "HTML/CSS", level: 98 },
        { name: "Tailwind CSS", level: 92 },
        { name: "Next.js", level: 88 }
      ]
    },
    {
      icon: <Database className="w-6 h-6 sm:w-8 sm:h-8" />,
      title: "Backend Development",
      skills: [
        { name: "Node.js", level: 90 },
        { name: "Express.js", level: 88 },
        { name: "Python", level: 85 },
        { name: "PostgreSQL", level: 82 },
        { name: "MongoDB", level: 80 },
        { name: "GraphQL", level: 75 }
      ]
    },
    {
      icon: <Cloud className="w-6 h-6 sm:w-8 sm:h-8" />,
      title: "DevOps & Cloud",
      skills: [
        { name: "AWS", level: 85 },
        { name: "Docker", level: 80 },
        { name: "Git", level: 95 },
        { name: "CI/CD", level: 78 },
        { name: "Linux", level: 82 },
        { name: "Kubernetes", level: 70 }
      ]
    },
    {
      icon: <Palette className="w-6 h-6 sm:w-8 sm:h-8" />,
      title: "Design & Tools",
      skills: [
        { name: "Figma", level: 85 },
        { name: "Adobe XD", level: 80 },
        { name: "Photoshop", level: 75 },
        { name: "Illustrator", level: 70 },
        { name: "Sketch", level: 65 },
        { name: "InVision", level: 80 }
      ]
    },
    {
      icon: <Smartphone className="w-6 h-6 sm:w-8 sm:h-8" />,
      title: "Mobile Development",
      skills: [
        { name: "React Native", level: 85 },
        { name: "Flutter", level: 70 },
        { name: "iOS Development", level: 65 },
        { name: "Android Development", level: 60 },
        { name: "PWA", level: 90 },
        { name: "Responsive Design", level: 95 }
      ]
    },
    {
      icon: <Globe className="w-6 h-6 sm:w-8 sm:h-8" />,
      title: "Other Technologies",
      skills: [
        { name: "Blockchain", level: 70 },
        { name: "Machine Learning", level: 65 },
        { name: "Web3", level: 75 },
        { name: "REST APIs", level: 92 },
        { name: "Testing", level: 85 },
        { name: "Performance", level: 88 }
      ]
    }
  ]

  return (
    <section id="skills" className="section-padding bg-slate relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-10 right-10 w-72 h-72 bg-gradient-to-bl from-platinum to-silver rounded-full blur-3xl"></div>
        <div className="absolute bottom-10 left-10 w-80 h-80 bg-gradient-to-tr from-steel to-silver rounded-full blur-3xl"></div>
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
            Skills & Expertise
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-platinum to-silver mx-auto mb-6"></div>
          <p className="text-silver text-base sm:text-lg max-w-3xl mx-auto px-4">
            A comprehensive toolkit of technologies and frameworks that I've mastered over the years. 
            From frontend to backend, I bring a full-stack approach to every project.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-12">
          {skillCategories.map((category, categoryIndex) => (
            <motion.div
              key={categoryIndex}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: categoryIndex * 0.1 }}
              className="bg-charcoal/50 backdrop-blur-sm rounded-2xl p-4 sm:p-6 lg:p-8 border border-steel/30 
                         hover:border-platinum/50 transition-all duration-300 hover:shadow-2xl"
            >
              {/* Category Header */}
              <div className="flex items-center gap-3 sm:gap-4 mb-6 sm:mb-8">
                <div className="text-platinum p-2 sm:p-3 bg-steel/30 rounded-xl">
                  {category.icon}
                </div>
                <h3 className="text-xl sm:text-2xl font-semibold text-platinum">{category.title}</h3>
              </div>

              {/* Skills List */}
              <div className="space-y-4 sm:space-y-6">
                {category.skills.map((skill, skillIndex) => (
                  <motion.div
                    key={skillIndex}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: (categoryIndex * 0.1) + (skillIndex * 0.05) }}
                    className="space-y-2"
                  >
                    <div className="flex justify-between items-center">
                      <span className="text-silver font-medium text-sm sm:text-base">{skill.name}</span>
                      <span className="text-platinum font-semibold text-sm sm:text-base">{skill.level}%</span>
                    </div>
                    
                    {/* Skill Bar */}
                    <div className="w-full bg-steel/30 rounded-full h-2 overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: `${skill.level}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 1.5, delay: (categoryIndex * 0.1) + (skillIndex * 0.05) + 0.3 }}
                        className="h-full bg-gradient-to-r from-platinum to-silver rounded-full"
                      />
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Additional Skills */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-12 sm:mt-16 text-center"
        >
          <h3 className="text-xl sm:text-2xl font-semibold text-platinum mb-6 sm:mb-8">Additional Skills</h3>
          <div className="flex flex-wrap justify-center gap-2 sm:gap-4 px-4">
            {[
              "Agile Methodologies", "Scrum", "Team Leadership", "Project Management",
              "Technical Writing", "Public Speaking", "Mentoring", "Code Review",
              "System Architecture", "Microservices", "API Design", "Security Best Practices"
            ].map((skill, index) => (
              <motion.span
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.8 + (index * 0.05) }}
                className="px-3 py-2 bg-charcoal/50 border border-steel/30 rounded-full text-silver text-xs sm:text-sm
                           hover:border-platinum/50 hover:text-platinum transition-all duration-300"
              >
                {skill}
              </motion.span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default Skills
