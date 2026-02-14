import { AnimatePresence, motion } from 'framer-motion'
import { Code, Database, ExternalLink, Github, Globe, Layers } from 'lucide-react'
import React, { useState } from 'react'

const Projects: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState('all')

  const projects = [
    {
      id: 1,
      title: "E-Commerce Platform",
      description: "A full-stack e-commerce solution with React, Node.js, and Stripe integration. Features include user authentication, product management, shopping cart, and payment processing.",
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
      category: "backend",
      technologies: ["Node.js", "Express", "Redis", "JWT", "Docker"],
      liveUrl: "#",
      githubUrl: "#",
      featured: false
    }
  ]

  const filters = [
    { id: 'all', label: 'All', icon: <Globe className="w-3.5 h-3.5" /> },
    { id: 'frontend', label: 'Frontend', icon: <Code className="w-3.5 h-3.5" /> },
    { id: 'backend', label: 'Backend', icon: <Database className="w-3.5 h-3.5" /> },
    { id: 'fullstack', label: 'Full Stack', icon: <Layers className="w-3.5 h-3.5" /> }
  ]

  const filteredProjects = activeFilter === 'all'
    ? projects
    : projects.filter(project => project.category === activeFilter)

  return (
    <section id="projects" className="section-padding relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-grid opacity-20" />
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-white/[0.06] to-transparent" />
      <div className="absolute bottom-1/4 left-0 w-[500px] h-[500px] bg-accent/[0.04] rounded-full blur-[120px]" />

      <div className="container-max relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="mb-16 sm:mb-20"
        >
          <span className="section-label">// projects</span>
          <h2 className="section-heading">Featured Projects</h2>
          <div className="accent-line mt-6" />
          <p className="text-silver text-base max-w-2xl mt-6 leading-relaxed">
            A showcase of my work, demonstrating skills in full-stack development,
            system design, and problem-solving.
          </p>
        </motion.div>

        {/* Filter Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.3, delay: 0.2 }}
          className="flex flex-wrap gap-2 mb-12"
        >
          {filters.map((filter) => (
            <button
              key={filter.id}
              onClick={() => setActiveFilter(filter.id)}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-medium tracking-wide
                         transition-all duration-300 ${
                activeFilter === filter.id
                  ? 'bg-accent text-obsidian shadow-glow'
                  : 'bg-white/[0.03] text-silver border border-white/[0.06] hover:bg-white/[0.06] hover:border-accent/20 hover:text-pearl'
              }`}
            >
              {filter.icon}
              {filter.label}
            </button>
          ))}
        </motion.div>

        {/* Projects Grid */}
        <motion.div
          layout
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          <AnimatePresence mode="wait">
            {filteredProjects.map((project, index) => (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.4, delay: index * 0.08 }}
                className="group"
              >
                <div className="glass-card overflow-hidden h-full flex flex-col">
                  {/* Project Image Area */}
                  <div className="relative h-44 bg-gradient-to-br from-steel/30 via-obsidian to-steel/20 overflow-hidden">
                    <div className="absolute inset-0 bg-grid opacity-20" />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <Code className="w-10 h-10 text-accent/30" />
                    </div>

                    {/* Featured Badge */}
                    {project.featured && (
                      <div className="absolute top-3 right-3 px-2.5 py-1 bg-accent/10 backdrop-blur-sm
                                     text-accent text-xs font-mono font-semibold rounded-md border border-accent/20">
                        FEATURED
                      </div>
                    )}

                    {/* Category */}
                    <div className="absolute top-3 left-3 px-2.5 py-1 bg-obsidian/60 backdrop-blur-sm
                                   text-silver text-xs font-mono rounded-md border border-white/[0.06]">
                      {project.category}
                    </div>

                    {/* Hover Overlay */}
                    <div className="absolute inset-0 bg-obsidian/80 backdrop-blur-sm opacity-0 group-hover:opacity-100
                                   transition-all duration-300 flex items-center justify-center gap-3">
                      <motion.a
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        href={project.liveUrl}
                        className="p-2.5 bg-accent text-obsidian rounded-lg hover:bg-accent-400 transition-colors"
                      >
                        <ExternalLink className="w-4 h-4" />
                      </motion.a>
                      <motion.a
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        href={project.githubUrl}
                        className="p-2.5 bg-white/10 text-pearl rounded-lg border border-white/[0.06]
                                   hover:bg-white/20 transition-colors"
                      >
                        <Github className="w-4 h-4" />
                      </motion.a>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-4 sm:p-6 flex flex-col flex-1">
                    <h3 className="text-pearl font-semibold text-lg mb-2 group-hover:text-accent transition-colors duration-300">
                      {project.title}
                    </h3>

                    <p className="text-silver text-sm leading-relaxed line-clamp-2 mb-4 flex-1">
                      {project.description}
                    </p>

                    {/* Technologies */}
                    <div className="flex flex-wrap gap-1.5">
                      {project.technologies.map((tech, techIndex) => (
                        <span key={techIndex} className="tech-tag text-xs px-2.5 py-0.5">
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* View More */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.3, delay: 0.4 }}
          className="text-center mt-12"
        >
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            className="btn-outline px-8"
          >
            View All Projects
          </motion.button>
        </motion.div>
      </div>
    </section>
  )
}

export default Projects
