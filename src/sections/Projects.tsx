import { AnimatePresence, motion } from 'framer-motion'
import { Code, Database, ExternalLink, Github, Globe, Layers } from 'lucide-react'
import React, { useState } from 'react'

const Projects: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState('all')
  const [showAll, setShowAll] = useState(false)

  const projects = [
    {
      id: 1,
      title: "Spiika",
      description: "An African language learning platform offering interactive courses in Yoruba, Swahili, Twi, Ewe, Hausa, and French. Features organized curricula with categorized lessons and a clean learning interface.",
      category: "fullstack",
      image: "/projects/spiika.webp",
      technologies: ["Next.js", "React", "Firebase", "Firestore", "TypeScript"],
      liveUrl: "https://www.spiika.com/",
      githubUrl: null,

    },
    {
      id: 2,
      title: "FamConnections",
      description: "A family networking platform to build family trees, share memories, organize reunions, and stay connected in a private, secure space. Features a media hub and Google Maps integration.",
      category: "fullstack",
      image: "/projects/famconnections.webp",
      technologies: ["Next.js", "React", "Django", "PrimeReact", "Google Maps API"],
      liveUrl: "https://www.famconnections.com/",
      githubUrl: null,

    },
    {
      id: 7,
      title: "AfCFTA",
      description: "An initiative of the AfCFTA Secretariat — a blogging and debate platform for discussing and shaping the African Continental Free Trade Area. Features debates, events, articles, and trending discussions.",
      category: "backend",
      image: "/projects/afcfta.webp",
      technologies: ["Vue.js", "Django", "PostgreSQL", "REST API", "Docker"],
      liveUrl: "https://afcfta.blog/",
      githubUrl: null,

    },
    {
      id: 3,
      title: "Artist Desk",
      description: "A project management platform built for musicians and artists. Organize tasks, projects, music, file sharing, and collaboration — all in one system designed for the creative workflow.",
      category: "fullstack",
      image: "/projects/artistdesk.webp",
      technologies: ["Next.js", "React", "Firebase", "Firestore", "TypeScript"],
      liveUrl: "https://artistdesk.com",
      githubUrl: null,

    },
    {
      id: 4,
      title: "KNG Technologies",
      description: "Corporate website for a Ghana-based software development company. A clean, modern landing page showcasing services, portfolio, and team — with a focus on outsourced development and Flutter expertise.",
      category: "frontend",
      image: "/projects/kngtechnologies.webp",
      technologies: ["React", "TypeScript", "Tailwind CSS", "Framer Motion"],
      liveUrl: "https://kngtechnologies.com/",
      githubUrl: null,

    },
    {
      id: 5,
      title: "Moms & Midwives",
      description: "A maternal health platform connecting pregnant women and new mothers with certified midwives and doctors. Features private chats, community forums, contraction tracking, and video consultations.",
      category: "fullstack",
      image: "/projects/momsandmidwives.webp",
      technologies: ["Django", "Wagtail CMS", "React", "PostgreSQL", "REST API"],
      liveUrl: "https://www.momsandmidwives.com/",
      githubUrl: null,

    },
    {
      id: 6,
      title: "Portfolio Website",
      description: "A modern, responsive developer portfolio with smooth animations, dark theme, active nav highlighting, and optimized performance. Features project showcases, skills, and contact sections.",
      category: "frontend",
      image: "/projects/portfolio.webp",
      technologies: ["React", "TypeScript", "Tailwind CSS", "Framer Motion", "Vite"],
      liveUrl: "https://josephdev-sigma.vercel.app/",
      githubUrl: "https://github.com/TRINITY-21/portfolio",

    },

    {
      id: 8,
      title: "Cryptospace Network",
      description: "A multi-service cryptocurrency platform featuring crypto card services, buy/sell with Visa/Mastercard, SaaS solutions, NFT marketplace, and media — all in one blockchain ecosystem.",
      category: "backend",
      image: "/projects/cryptospace.webp",
      technologies: ["React", "Django", "PostgreSQL", "REST API", "TypeScript"],
      liveUrl: "https://cryptospace.com/",
      githubUrl: null,

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

  const visibleProjects = showAll ? filteredProjects : filteredProjects.slice(0, 6)

  return (
    <section id="projects" className="section-padding scroll-mt-20 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-grid" />
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-line/[0.06] to-transparent" />

      <div className="container-max relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="mb-12 sm:mb-16"
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
                         transition-all duration-200 ${
                activeFilter === filter.id
                  ? 'bg-accent text-obsidian'
                  : 'bg-line/[0.03] text-silver border border-line/[0.06] hover:bg-line/[0.06] hover:border-line/[0.1] hover:text-pearl'
              }`}
            >
              {filter.icon}
              {filter.label}
            </button>
          ))}
        </motion.div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence>
            {visibleProjects.map((project) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3 }}
                className="group"
              >
                <div className="glass-card overflow-hidden h-full flex flex-col transition-all duration-300">
                  {/* Project Image Area */}
                  <div className="relative h-44 bg-steel/20 overflow-hidden">
                    {'image' in project && project.image ? (
                      <>
                        <img
                          src={project.image}
                          alt={project.title}
                          loading="lazy"
                          onLoad={(e) => e.currentTarget.classList.add('opacity-100')}
                          className="absolute inset-0 w-full h-full object-cover object-top transition-all duration-700 opacity-0 group-hover:scale-[1.03]"
                        />
                        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-obsidian/40" />
                      </>
                    ) : (
                      <>
                        <div className="absolute inset-0 bg-grid" />
                        <div className="absolute inset-0 flex items-center justify-center">
                          <Code className="w-10 h-10 text-silver/20" />
                        </div>
                      </>
                    )}

                    {/* Category */}
                    <div className="absolute top-3 right-3 px-2.5 py-1 bg-obsidian/80 backdrop-blur-md
                                   text-silver text-xs font-mono font-medium rounded-md border border-line/[0.08]">
                      {project.category}
                    </div>

                  </div>

                  {/* Content */}
                  <div className="p-4 sm:p-6 flex flex-col flex-1">
                    <h3 className="text-pearl font-semibold text-lg mb-2 transition-colors duration-300">
                      {project.title}
                    </h3>

                    <p className="text-silver text-sm leading-relaxed line-clamp-2 mb-4 flex-1">
                      {project.description}
                    </p>

                    {/* Technologies */}
                    <div className="flex flex-wrap gap-1.5 mb-4">
                      {project.technologies.map((tech, techIndex) => (
                        <span key={techIndex} className="tech-tag text-xs px-2.5 py-0.5">
                          {tech}
                        </span>
                      ))}
                    </div>

                    {/* Action Links */}
                    <div className="flex gap-2 pt-3 border-t border-line/[0.04]">
                      {project.liveUrl && (
                        <a
                          href={project.liveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex-1 flex items-center justify-center gap-2 py-2 rounded-lg text-xs font-medium
                                     bg-accent/[0.06] text-accent border border-accent/10
                                     hover:bg-accent/10 hover:border-accent/20 transition-all duration-300"
                        >
                          <ExternalLink className="w-3.5 h-3.5" />
                          Live Demo
                        </a>
                      )}
                      {project.githubUrl && (
                        <a
                          href={project.githubUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex-1 flex items-center justify-center gap-2 py-2 rounded-lg text-xs font-medium
                                     bg-line/[0.03] text-silver border border-line/[0.06]
                                     hover:text-pearl hover:border-line/10 transition-all duration-300"
                        >
                          <Github className="w-3.5 h-3.5" />
                          Source
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* View More */}
        {filteredProjects.length > 6 && (
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
              onClick={() => {
                if (showAll) {
                  document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })
                }
                setShowAll(!showAll)
              }}
              className="btn-outline px-8"
            >
              {showAll ? 'Show Less' : 'View All Projects'}
            </motion.button>
          </motion.div>
        )}
      </div>
    </section>
  )
}

export default Projects
