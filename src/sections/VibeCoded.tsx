import { motion } from 'framer-motion'
import { Bot, ExternalLink, Github, Sparkles, Terminal, Wand2 } from 'lucide-react'
import React from 'react'

const VibeCoded: React.FC = () => {
  const vibeProjects = [
    {
      id: 1,
      title: "Bynge",
      description: "A Netflix-style movie and TV discovery platform with show browsing, watchlist, collections, scheduling, ratings, and detailed media pages with trailers and cast info.",
      image: "/projects/bynge.webp",
      liveUrl: "https://cinescope-nine-pink.vercel.app/",
      githubUrl: "https://github.com/TRINITY-21/cinescope",
      techStack: ["Next.js", "TypeScript", "Tailwind CSS", "TMDB API"],
      aiTools: ["Claude", "Cursor"],
      status: "live",
      vibeTime: "5 hours",
    },
    {
      id: 2,
      title: "Ovalve",
      description: "A live sports streaming platform with real-time match feeds, schedules, highlights library, expert predictions, league browsing, and dark mode. Search teams, leagues, and matches instantly.",
      image: "/projects/ovalve.webp",
      liveUrl: "https://ovalve-zhqp.vercel.app/",
      githubUrl: "https://github.com/TRINITY-21/ovalve",
      techStack: ["Next.js", "TypeScript", "Tailwind CSS", "Sports API"],
      aiTools: ["Claude", "Cursor"],
      status: "live",
      vibeTime: "3 hours",
    },
    {
      id: 3,
      title: "Echoweb",
      description: "An interactive music discovery platform that maps related Spotify artists through a dreamy, visual interface. Explore artist connections and find new music through an immersive experience.",
      image: "/projects/echoweb.webp",
      liveUrl: "https://echoweb-mu.vercel.app/",
      githubUrl: "https://github.com/TRINITY-21/echoweb",
      techStack: ["Next.js", "TypeScript", "Tailwind CSS", "Spotify API"],
      aiTools: ["Claude", "Cursor"],
      status: "live",
      vibeTime: "2 hours",
    },
    {
      id: 4,
      title: "Three Two Live",
      description: "A multi-sport streaming hub aggregating live streams, highlights, predictions, scores, and news across NFL, basketball, hockey, and tennis from official sources.",
      image: "/projects/threetwo.webp",
      liveUrl: "https://threetwo.vercel.app/",
      githubUrl: "https://github.com/TRINITY-21/Cline/tree/main",
      techStack: ["Next.js", "TypeScript", "Tailwind CSS", "Sports API"],
      aiTools: ["Claude", "Cline"],
      status: "live",
      vibeTime: "3.5 hours",
    },
    {
      id: 5,
      title: "Portfolio Website",
      description: "A modern developer portfolio with smooth animations, dark theme, active nav highlighting, project showcases with live screenshots, and a contact form — all vibe coded with AI agents.",
      image: "/projects/portfolio.webp",
      liveUrl: "https://josephdev-sigma.vercel.app/",
      githubUrl: "https://github.com/TRINITY-21/portfolio/tree/main",
      techStack: ["React", "TypeScript", "Tailwind CSS", "Framer Motion", "Vite"],
      aiTools: ["Claude", "Cursor"],
      status: "live",
      vibeTime: "1 hour",
    },
    {
      id: 6,
      title: "Popkorn CLI",
      description: "A terminal-based entertainment CLI for discovering movies, TV shows, and people. Features mood-based recommendations, live TV schedules, trending content, and streaming availability — all from the command line.",
      image: null as string | null,
      liveUrl: null as string | null,
      githubUrl: "https://github.com/TRINITY-21/popkorn",
      techStack: ["Python", "Click", "Rich", "TMDB API", "TVMaze API"],
      aiTools: ["Claude", "Cursor"],
      status: "live",
      vibeTime: "1 hour",
    },
    {
      id: 7,
      title: "Auxcord CLI",
      description: "Spotify from your terminal — search tracks, explore artist profiles with discographies, browse albums and tracklists, and discover similar artists through genre-based matching, all styled with a Spotify-themed terminal UI.",
      image: null as string | null,
      liveUrl: null as string | null,
      githubUrl: "https://github.com/TRINITY-21/auxcord",
      techStack: ["Go", "Cobra", "Lip Gloss", "Spotify API"],
      aiTools: ["Claude", "Cursor"],
      status: "live",
      vibeTime: "1 hour",
    },
    {
      id: 8,
      title: "Loopie CLI",
      description: "A terminal-based GIF search tool powered by the Giphy API. Search GIFs by keyword, browse trending content, and fetch random GIFs — with copy-to-clipboard support and styled terminal output.",
      image: null as string | null,
      liveUrl: null as string | null,
      githubUrl: "https://github.com/TRINITY-21/loopie",
      techStack: ["TypeScript", "Commander.js", "Chalk", "Giphy API"],
      aiTools: ["Claude", "Cursor"],
      status: "live",
      vibeTime: "1 hour",
    },
    {
      id: 9,
      title: "TLDR CLI",
      description: "An AI-powered URL and article summarizer for the terminal. Fetch any webpage, extract its content, and get concise summaries or ask questions about it — powered by Groq's Llama models.",
      image: null as string | null,
      liveUrl: null as string | null,
      githubUrl: "https://github.com/TRINITY-21/tldr",
      techStack: ["Python", "Click", "Rich", "Groq AI", "Trafilatura"],
      aiTools: ["Claude", "Cursor"],
      status: "live",
      vibeTime: "1 hour",
    },
  ]

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
    <section id="vibe-coded" className="section-padding scroll-mt-20 relative overflow-hidden">
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
          <span className="section-label">// vibe-coded</span>

          <h2 className="section-heading">
            Built with AI Agents
          </h2>
          <div className="accent-line mt-6" />

          <p className="text-silver text-base max-w-2xl mt-6 leading-relaxed">
            Full applications built through vibe coding with AI agents. From idea to deployment,
            these projects showcase what's possible when you pair engineering expertise with AI-powered development.
          </p>

          {/* Vibe coding stats bar */}
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
            <div className="flex items-center gap-2 px-3.5 py-2 rounded-lg bg-accent/[0.06] border border-accent/10">
              <Wand2 className="w-3.5 h-3.5 text-accent" />
              <span className="text-accent/90 text-xs font-medium">Prompt-to-Production</span>
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
                            <Terminal className="w-8 h-8 text-accent/30 relative z-10" />
                            <div className="relative z-10 font-mono text-[10px] text-accent/40 bg-accent/[0.04] border border-accent/10 rounded px-3 py-1.5">
                              $ {project.title.toLowerCase().replace(' cli', '')} --help
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Card Body */}
                  <div className="px-4 pb-4 sm:pb-5 flex flex-col flex-1">
                    {/* Title + Vibe Time */}
                    <h3 className="text-pearl font-semibold text-lg mb-1.5 transition-colors duration-300">
                      {project.title}
                    </h3>
                    <div className="flex items-center gap-1.5 mb-3">
                      <Sparkles className="w-3 h-3 text-accent/60" />
                      <span className="text-accent/50 text-[11px] font-mono">
                        Vibe coded in {project.vibeTime}
                      </span>
                    </div>

                    <p className="text-silver text-sm leading-relaxed line-clamp-2 mb-4 flex-1">
                      {project.description}
                    </p>

                    {/* AI Tools + Tech Stack inline */}
                    <div className="flex flex-wrap gap-1.5 mb-4">
                      {project.aiTools.map((tool, i) => (
                        <span
                          key={`ai-${i}`}
                          className="px-2 py-0.5 text-[11px] font-mono font-medium rounded-md
                                     bg-accent/[0.08] text-accent/70 border border-accent/15"
                        >
                          {tool}
                        </span>
                      ))}
                      <span className="text-line/10 text-xs flex items-center">|</span>
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
                <p className="text-pearl font-medium text-sm">Interested in vibe coding?</p>
                <p className="text-silver text-xs">Let's build something amazing with AI agents.</p>
              </div>
            </div>
            <motion.a
              href="#contact"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="btn-primary px-6 whitespace-nowrap"
            >
              Let's Collaborate
            </motion.a>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default VibeCoded
