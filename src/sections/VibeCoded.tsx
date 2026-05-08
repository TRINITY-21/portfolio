import { motion } from 'framer-motion'
import { Bot, ExternalLink, Github, Globe, Terminal } from 'lucide-react'
import React from 'react'
import { vibeProjects } from '../data/vibeProjects'

const VibeCoded: React.FC = () => {

  const getStatusConfig = (status: string) => {
    switch (status) {
      case 'live':
        return { label: 'Live', dotColor: 'bg-emerald-400', textColor: 'text-emerald-400', borderColor: 'border-emerald-500/20', bgColor: 'bg-emerald-500/[0.06]' }
      case 'beta':
        return { label: 'Beta', dotColor: 'bg-amber-400', textColor: 'text-amber-400', borderColor: 'border-amber-500/20', bgColor: 'bg-amber-500/[0.06]' }
      case 'development':
        return { label: 'In Dev', dotColor: 'bg-accent', textColor: 'text-accent', borderColor: 'border-accent/20', bgColor: 'bg-accent/[0.06]' }
      default:
        return { label: status, dotColor: 'bg-silver', textColor: 'text-silver', borderColor: 'border-line/10', bgColor: 'bg-line/[0.03]' }
    }
  }

  return (
    <section id="side-projects" className="section-padding scroll-mt-20 relative overflow-hidden">
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
          <span className="section-label">// side-projects</span>

          <h2 className="section-heading">
            Side Projects &amp; Open Source
          </h2>
          <div className="accent-line mt-6" />

          <p className="text-silver text-base max-w-2xl mt-6 leading-relaxed">
            Tools, CLIs, and small applications I build on the side &mdash; mostly to scratch
            my own itch or test an idea end-to-end. Several are on PyPI, the VS Code Marketplace,
            or live on the web. Built with AI-assisted development workflows (Claude, Cursor).
          </p>

          {/* Methodology stat bar */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.3, delay: 0.2 }}
            className="flex flex-wrap gap-3 mt-8"
          >
            <div className="flex items-center gap-2 px-3.5 py-2 rounded-lg bg-accent/[0.06] border border-accent/10">
              <Bot className="w-3.5 h-3.5 text-accent" />
              <span className="text-accent/90 text-xs font-medium">AI-Assisted Development</span>
            </div>
          </motion.div>
        </motion.div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {vibeProjects.map((project, index) => {
            const statusConfig = getStatusConfig(project.status)
            return (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: index * 0.08 }}
                className="group"
              >
                <div className="glass-card overflow-hidden h-full flex flex-col transition-all duration-300">
                  {/* Terminal Top Bar */}
                  <div className="px-4 pt-4 pb-3 flex items-center justify-between">
                    {/* Terminal dots + URL bar */}
                    <div className="flex items-center gap-3">
                      <div className="flex items-center gap-1.5">
                        <div className="w-2.5 h-2.5 rounded-full bg-red-500/70" />
                        <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/70" />
                        <div className="w-2.5 h-2.5 rounded-full bg-emerald-500/70" />
                      </div>
                      <div className="hidden sm:flex items-center gap-1.5 px-3 py-1 rounded-md bg-line/[0.03] border border-line/[0.06]">
                        <div className="w-2.5 h-2.5 rounded-full border border-emerald-500/50 flex items-center justify-center">
                          <div className="w-1 h-1 rounded-full bg-emerald-400/70" />
                        </div>
                        <span className="text-silver/40 text-[10px] font-mono truncate max-w-[120px]">
                          {project.liveUrl?.replace('https://', '').replace(/\/$/, '') ?? project.githubUrl?.replace('https://github.com/', '')}
                        </span>
                      </div>
                    </div>

                    {/* Status badge */}
                    <div className={`flex items-center gap-1.5 px-2.5 py-1 rounded-md ${statusConfig.bgColor} ${statusConfig.borderColor} border`}>
                      <div className={`w-1.5 h-1.5 rounded-full ${statusConfig.dotColor}`} />
                      <span className={`text-xs font-mono font-medium ${statusConfig.textColor}`}>
                        {statusConfig.label}
                      </span>
                    </div>
                  </div>

                  {/* Screen Preview */}
                  <div className="px-3 pb-3">
                    <div className="relative rounded-lg overflow-hidden border border-line/[0.06]
                                    group-hover:border-line/[0.1] transition-all duration-500">
                      <div className="relative h-40 sm:h-44 overflow-hidden">
                        {project.image ? (
                          <>
                            <img
                              src={project.image}
                              alt={project.title}
                              loading="lazy"
                              onLoad={(e) => e.currentTarget.classList.add('opacity-100')}
                              className="w-full h-full object-cover object-top transition-all duration-700 opacity-0 group-hover:scale-105"
                            />
                            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-obsidian/40" />
                          </>
                        ) : (
                          <div className="absolute inset-0 bg-obsidian flex flex-col items-center justify-center gap-3">
                            <div className="absolute inset-0 bg-grid opacity-40" />
                            {project.liveUrl ? (
                              <>
                                <Globe className="w-8 h-8 text-accent/30 relative z-10" />
                                <div className="relative z-10 font-mono text-[10px] text-accent/40 bg-accent/[0.04] border border-accent/10 rounded px-3 py-1.5">
                                  {project.liveUrl.replace('https://', '')}
                                </div>
                              </>
                            ) : (
                              <>
                                <Terminal className="w-8 h-8 text-accent/30 relative z-10" />
                                <div className="relative z-10 font-mono text-[10px] text-accent/40 bg-accent/[0.04] border border-accent/10 rounded px-3 py-1.5">
                                  $ {project.title.toLowerCase().replace(' cli', '')} --help
                                </div>
                              </>
                            )}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Card Body */}
                  <div className="px-4 pb-4 sm:pb-5 flex flex-col flex-1">
                    {/* Title */}
                    <h3 className="text-pearl font-semibold text-lg mb-3 transition-colors duration-300">
                      {project.title}
                    </h3>

                    <p className="text-silver text-sm leading-relaxed line-clamp-2 mb-4 flex-1">
                      {project.description}
                    </p>

                    {/* Tech Stack */}
                    <div className="flex flex-wrap gap-1.5 mb-4">
                      {project.techStack.map((tech, i) => (
                        <span key={`tech-${i}`} className="tech-tag text-[11px] px-2 py-0.5">
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
            )
          })}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.3, delay: 0.3 }}
          className="mt-16 text-center"
        >
          <div className="glass-card inline-flex flex-col sm:flex-row items-center gap-4 sm:gap-6 p-6 sm:p-8">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-accent/[0.06] border border-accent/10">
                <Bot className="w-5 h-5 text-accent" />
              </div>
              <div className="text-left">
                <p className="text-pearl font-medium text-sm">Want to collaborate on a project?</p>
                <p className="text-silver text-xs">Open to interesting work &mdash; full-time, contract, or open source.</p>
              </div>
            </div>
            <motion.a
              href="#contact"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="btn-primary px-6 whitespace-nowrap"
            >
              Get in Touch
            </motion.a>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default VibeCoded
