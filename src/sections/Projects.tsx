import { AnimatePresence, motion } from 'framer-motion'
import { Code, Database, ExternalLink, Eye, Github, Globe, Smartphone } from 'lucide-react'
import React, { useState } from 'react'

const Projects: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState('all')

  const projects = [
    {
      id: 1,
      title: "E-Commerce Platform",
      description: "A full-stack e-commerce solution with React, Node.js, and Stripe integration. Features include user authentication, product management, shopping cart, and payment processing.",
      image: "/api/placeholder/400/300",
      category: "fullstack",
      technologies: ["React", "Node.js", "MongoDB", "Stripe", "Redux"],
      liveUrl: "#",
      githubUrl: "#",
      featured: true
    },
    {
      id: 2,
      title: "AI Chat Application",
      description: "Real-time chat application powered by OpenAI's GPT API. Built with React, Socket.io, and Express. Features include conversation history, user authentication, and responsive design.",
      image: "/api/placeholder/400/300",
      category: "fullstack",
      technologies: ["React", "Express", "Socket.io", "OpenAI API", "JWT"],
      liveUrl: "#",
      githubUrl: "#",
      featured: true
    },
    {
      id: 3,
      title: "Portfolio Website",
      description: "Modern, responsive portfolio website built with React and TypeScript. Features smooth animations, dark mode, and optimized performance.",
      image: "/api/placeholder/400/300",
      category: "frontend",
      technologies: ["React", "TypeScript", "Tailwind CSS", "Framer Motion"],
      liveUrl: "#",
      githubUrl: "#",
      featured: false
    },
    {
      id: 4,
      title: "Task Management App",
      description: "Collaborative task management application with real-time updates, drag-and-drop functionality, and team collaboration features.",
      image: "/api/placeholder/400/300",
      category: "fullstack",
      technologies: ["React", "Node.js", "PostgreSQL", "Socket.io", "Docker"],
      liveUrl: "#",
      githubUrl: "#",
      featured: false
    },
    {
      id: 5,
      title: "Weather Dashboard",
      description: "Beautiful weather application with location-based forecasts, interactive maps, and detailed weather analytics.",
      image: "/api/placeholder/400/300",
      category: "frontend",
      technologies: ["React", "OpenWeather API", "Chart.js", "Leaflet Maps"],
      liveUrl: "#",
      githubUrl: "#",
      featured: false
    },
    {
      id: 6,
      title: "API Gateway Service",
      description: "Microservices API gateway built with Node.js and Express. Features include rate limiting, authentication, logging, and load balancing.",
      image: "/api/placeholder/400/300",
      category: "backend",
      technologies: ["Node.js", "Express", "Redis", "JWT", "Docker"],
      liveUrl: "#",
      githubUrl: "#",
      featured: false
    }
  ]

  const filters = [
    { id: 'all', label: 'All Projects', icon: <Globe className="w-4 h-4" /> },
    { id: 'frontend', label: 'Frontend', icon: <Code className="w-4 h-4" /> },
    { id: 'backend', label: 'Backend', icon: <Database className="w-4 h-4" /> },
    { id: 'fullstack', label: 'Full Stack', icon: <Smartphone className="w-4 h-4" /> }
  ]

  const filteredProjects = activeFilter === 'all' 
    ? projects 
    : projects.filter(project => project.category === activeFilter)

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'frontend': return <Code className="w-5 h-5" />
      case 'backend': return <Database className="w-5 h-5" />
      case 'fullstack': return <Smartphone className="w-5 h-5" />
      default: return <Globe className="w-5 h-5" />
    }
  }

  return (
    <section id="projects" className="section-padding bg-charcoal relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 left-1/4 w-96 h-96 bg-gradient-to-br from-platinum to-silver rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-1/4 w-80 h-80 bg-gradient-to-tl from-steel to-silver rounded-full blur-3xl"></div>
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
            Featured Projects
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-platinum to-silver mx-auto mb-6"></div>
          <p className="text-silver text-base sm:text-lg max-w-3xl mx-auto px-4">
            A showcase of my best work, demonstrating my skills in full-stack development, 
            UI/UX design, and problem-solving abilities.
          </p>
        </motion.div>

        {/* Filter Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex flex-wrap justify-center gap-4 mb-12"
        >
          {filters.map((filter) => (
            <motion.button
              key={filter.id}
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setActiveFilter(filter.id)}
              className={`flex items-center gap-2 px-6 py-3 rounded-full font-medium transition-all duration-300
                         ${activeFilter === filter.id
                           ? 'bg-platinum text-obsidian shadow-lg'
                           : 'bg-slate/50 text-silver border border-steel/30 hover:border-platinum/50 hover:text-platinum'
                         }`}
            >
              {filter.icon}
              {filter.label}
            </motion.button>
          ))}
        </motion.div>

        {/* Projects Grid */}
        <motion.div
          layout
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8"
        >
          <AnimatePresence mode="wait">
            {filteredProjects.map((project, index) => (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group"
              >
                <div className="bg-slate/50 backdrop-blur-sm rounded-2xl overflow-hidden border border-steel/30 
                               hover:border-platinum/50 transition-all duration-300 hover:shadow-2xl card-hover">
                  
                  {/* Project Image */}
                  <div className="relative h-48 bg-gradient-to-br from-steel via-slate to-charcoal overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-t from-transparent to-charcoal/50"></div>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <Code className="w-16 h-16 text-platinum opacity-30" />
                    </div>
                    
                    {/* Category Badge */}
                    <div className="absolute top-4 left-4 flex items-center gap-2 px-3 py-1 bg-obsidian/80 
                                   backdrop-blur-sm rounded-full text-xs text-platinum border border-steel/30">
                      {getCategoryIcon(project.category)}
                      {project.category.charAt(0).toUpperCase() + project.category.slice(1)}
                    </div>

                    {/* Featured Badge */}
                    {project.featured && (
                      <div className="absolute top-4 right-4 px-3 py-1 bg-gradient-to-r from-platinum to-silver 
                                     text-obsidian text-xs font-bold rounded-full">
                        Featured
                      </div>
                    )}

                    {/* Hover Overlay */}
                    <div className="absolute inset-0 bg-obsidian/80 opacity-0 group-hover:opacity-100 
                                   transition-opacity duration-300 flex items-center justify-center gap-4">
                      <motion.a
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        href={project.liveUrl}
                        className="p-3 bg-platinum text-obsidian rounded-full hover:bg-white transition-colors"
                      >
                        <Eye className="w-5 h-5" />
                      </motion.a>
                      <motion.a
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        href={project.githubUrl}
                        className="p-3 bg-charcoal text-platinum rounded-full border border-platinum 
                                   hover:bg-platinum hover:text-obsidian transition-colors"
                      >
                        <Github className="w-5 h-5" />
                      </motion.a>
                    </div>
                  </div>

                  {/* Project Content */}
                  <div className="p-4 sm:p-6 space-y-3 sm:space-y-4">
                    <h3 className="text-lg sm:text-xl font-semibold text-platinum group-hover:text-white transition-colors">
                      {project.title}
                    </h3>
                    
                    <p className="text-silver text-xs sm:text-sm leading-relaxed line-clamp-3">
                      {project.description}
                    </p>

                    {/* Technologies */}
                    <div className="flex flex-wrap gap-2">
                      {project.technologies.map((tech, techIndex) => (
                        <span
                          key={techIndex}
                          className="px-2 py-1 bg-charcoal/50 text-silver text-xs rounded-full border border-steel/30"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>

                    {/* Action Buttons */}
                    <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 pt-2">
                      <motion.a
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        href={project.liveUrl}
                        className="flex-1 flex items-center justify-center gap-2 px-3 sm:px-4 py-2 bg-platinum text-obsidian 
                                   rounded-lg font-medium hover:bg-white transition-colors text-xs sm:text-sm"
                      >
                        <ExternalLink className="w-3 h-3 sm:w-4 sm:h-4" />
                        Live Demo
                      </motion.a>
                      <motion.a
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        href={project.githubUrl}
                        className="flex-1 flex items-center justify-center gap-2 px-3 sm:px-4 py-2 border border-platinum 
                                   text-platinum rounded-lg font-medium hover:bg-platinum hover:text-obsidian 
                                   transition-colors text-xs sm:text-sm"
                      >
                        <Github className="w-3 h-3 sm:w-4 sm:h-4" />
                        Code
                      </motion.a>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* View More Button */}
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
            className="px-8 py-4 border-2 border-platinum text-platinum rounded-lg font-semibold text-lg
                       hover:bg-platinum hover:text-obsidian transition-all duration-300"
          >
            View All Projects
          </motion.button>
        </motion.div>
      </div>
    </section>
  )
}

export default Projects
