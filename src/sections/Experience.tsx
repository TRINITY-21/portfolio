import { motion } from 'framer-motion'
import { Building, Calendar, ExternalLink, MapPin } from 'lucide-react'
import React from 'react'

const Experience: React.FC = () => {
  const experiences = [
    {
      id: 1,
      company: "KNG Technologies",
      position: "Full-stack Engineer",
      duration: "September 2022 - Present",
      location: "Remote",
      type: "Full-time",
      description: "Building distributed platforms and sophisticated workflow services using modern technologies. Collaborating with cross-functional teams to design and develop scalable backend systems.",
      achievements: [
        "Leveraged Django, TypeScript, and Next.js to build distributed platforms using Kafka for efficient data streaming and processing",
        "Implemented DevOps practices using AWS, Docker, Kubernetes, and Helm charts for efficient deployment and scaling",
        "Utilized GitHub Actions for CI/CD, automating build, testing, and deployment processes",
        "Developed reusable libraries in Django and Next.js to enhance code reusability and faster development cycles",
        "Built sophisticated workflow service using Django for REST APIs with PostgreSQL for data persistence"
      ],
      technologies: ["Django", "Next.js", "TypeScript", "PostgreSQL", "React.js", "Python", "Kafka", "AWS", "Docker", "Kubernetes", "Helm", "GitHub Actions"],
      logo: "KT"
    },
    {
      id: 2,
      company: "Cybotcx",
      position: "Full-stack Engineer",
      duration: "October 2021 - June 2023",
      location: "Remote",
      type: "Full-time",
      description: "Worked as a Senior Full Stack Developer building highly scalable applications using Django, Next.js, and React. Implemented containerization and orchestration solutions.",
      achievements: [
        "Built highly scalable applications using Django, Next.js, React, and various modern tools",
        "Orchestrated containerization and orchestration using Kubernetes for efficient deployment and scaling",
        "Implemented CI/CD pipelines using CircleCI, automating build, testing, and deployment processes",
        "Leveraged MySQL as a relational database management system with optimized schemas and queries",
        "Utilized Redis for caching and Elasticsearch for search functionality"
      ],
      technologies: ["TypeScript", "JavaScript", "Python", "Django", "React", "MySQL", "Redis", "Kubernetes", "CircleCI", "Elasticsearch", "AWS", "Linux", "Jest"],
      logo: "CX"
    },
    {
      id: 3,
      company: "Mpedigree",
      position: "Backend Engineer",
      duration: "September 2020 - 2022",
      location: "Accra, Ghana",
      type: "Full-time",
      description: "Worked as a Full Stack Developer contributing to projects like Panabios and Alkemy care, a trusted B2B marketplace in Ghana. Participated in sprint meetings and code reviews.",
      achievements: [
        "Contributed to Panabios and Alkemy care projects - trusted B2B marketplace platforms in Ghana",
        "Participated in sprint meetings, wrote code, and contributed to code review processes",
        "Built and maintained in-house packages for improved development efficiency",
        "Leveraged Django and REST framework to develop robust backend applications",
        "Worked with cross-functional teams to deliver scalable solutions"
      ],
      technologies: ["Python", "Django", "JavaScript", "React", "RabbitMQ", "Redis", "Redux", "Ansible", "Linode", "Linux"],
      logo: "MP"
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
          className="text-center mb-20 sm:mb-16"
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold gradient-text mb-8 sm:mb-6">
            Work Experience
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-platinum to-silver mx-auto mb-8 sm:mb-6"></div>
          <p className="text-silver text-base md:text-lg max-w-3xl mx-auto px-6 sm:px-4">
            My professional journey in software development, showcasing growth, achievements, 
            and the diverse range of projects I've contributed to.
          </p>
        </motion.div>

        {/* Experience Timeline */}
        <div className="relative px-0 sm:px-4 md:px-0">
          {/* Timeline Line - Hidden on mobile, visible on larger screens */}
          <div className="hidden md:block absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-platinum via-silver to-steel"></div>

          <div className="space-y-10 sm:space-y-8 md:space-y-12">
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
                  <div className="flex flex-col gap-5 sm:gap-4 mb-8 sm:mb-6">
                    <div className="flex flex-col sm:flex-row sm:items-start gap-5 sm:gap-4">
                      {/* Company Logo */}
                      <div className="w-20 h-20 sm:w-16 sm:h-16 bg-gradient-to-br from-platinum to-silver rounded-xl 
                                     flex items-center justify-center text-obsidian font-bold text-xl sm:text-lg shadow-lg flex-shrink-0">
                        {experience.logo}
                      </div>
                      
                      <div className="flex-1 min-w-0">
                        <h3 className="text-2xl sm:text-xl md:text-2xl font-semibold text-platinum mb-3 sm:mb-2 leading-tight">
                          {experience.position}
                        </h3>
                        <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-2 md:gap-4 text-silver text-base sm:text-sm md:text-base">
                          <div className="flex items-center gap-2">
                            <Building className="w-5 h-5 sm:w-4 sm:h-4 flex-shrink-0" />
                            <span className="font-medium truncate">{experience.company}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <MapPin className="w-5 h-5 sm:w-4 sm:h-4 flex-shrink-0" />
                            <span className="truncate">{experience.location}</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Duration and Type */}
                    <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-2 md:gap-4">
                      <div className="flex items-center gap-2 text-silver text-base sm:text-sm md:text-base">
                        <Calendar className="w-5 h-5 sm:w-4 sm:h-4 flex-shrink-0" />
                        <span className="font-medium">{experience.duration}</span>
                      </div>
                      <span className="px-4 py-2 sm:px-3 sm:py-1 bg-steel/30 text-platinum text-base sm:text-sm rounded-full border border-steel/30 w-fit">
                        {experience.type}
                      </span>
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-silver text-base sm:text-sm md:text-base lg:text-lg leading-relaxed mb-8 sm:mb-6">
                    {experience.description}
                  </p>

                  {/* Achievements */}
                  <div className="mb-8 sm:mb-6">
                    <h4 className="text-platinum font-semibold mb-4 sm:mb-3 text-lg sm:text-base md:text-lg">Key Achievements:</h4>
                    <ul className="space-y-3 sm:space-y-2">
                      {experience.achievements.map((achievement, achievementIndex) => (
                        <li key={achievementIndex} className="flex items-start gap-4 sm:gap-3 text-silver text-base sm:text-sm md:text-base">
                          <div className="w-3 h-3 sm:w-2 sm:h-2 bg-platinum rounded-full mt-2 flex-shrink-0"></div>
                          <span className="leading-relaxed">{achievement}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Technologies */}
                  <div className="flex flex-wrap gap-3 sm:gap-2">
                    {experience.technologies.map((tech, techIndex) => (
                      <span
                        key={techIndex}
                        className="px-3 sm:px-2 md:px-3 py-2 sm:py-1 bg-slate/50 text-silver text-sm sm:text-xs md:text-sm rounded-full border border-steel/30
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
          className="text-center mt-20 sm:mt-16"
        >
          <motion.button
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
            className="px-8 sm:px-6 md:px-8 py-4 sm:py-3 md:py-4 bg-platinum text-obsidian rounded-lg font-semibold text-lg sm:text-base md:text-lg
                       hover:bg-white transition-all duration-300 shadow-lg hover:shadow-xl"
            onClick={() => window.open('https://drive.google.com/file/d/1oMVo0ut4BzpxZrmPdL2ytrJMAyLx13a-/view?usp=sharing', '_blank')}
          >
            <ExternalLink className="w-5 h-5 sm:w-4 sm:h-4 md:w-5 md:h-5 inline mr-2" />
            Download Full Resume
          </motion.button>
        </motion.div>
      </div>
    </section>
  )
}

export default Experience
