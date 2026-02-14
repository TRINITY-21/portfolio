import { motion } from 'framer-motion'
import { Bot, ExternalLink, Github, Sparkles, Wand2 } from 'lucide-react'
import React from 'react'

const VibeCoded: React.FC = () => {
  const vibeProjects = [
    {
      id: 1,
      title: "AI-Powered SaaS Dashboard",
      description: "A full analytics dashboard with real-time charts, user management, and AI-driven insights. Built entirely through prompting and vibe coding with AI agents.",
      liveUrl: "#",
      githubUrl: "#",
      techStack: ["Next.js", "TypeScript", "Tailwind CSS", "Prisma", "PostgreSQL"],
      aiTools: ["Claude", "Cursor"],
      status: "live",
      vibeTime: "2 days",
    },
    {
      id: 2,
      title: "E-Commerce Storefront",
      description: "Modern e-commerce platform with product catalog, cart functionality, Stripe payments, and order tracking. Vibe coded from concept to deployment.",
      liveUrl: "#",
      githubUrl: "#",
      techStack: ["React", "Node.js", "Stripe", "MongoDB", "Tailwind CSS"],
      aiTools: ["Claude", "V0"],
      status: "live",
      vibeTime: "3 days",
    },
    {
      id: 3,
      title: "Real-time Chat Platform",
      description: "WebSocket-based chat app with rooms, direct messaging, file sharing, and AI-powered message suggestions. Built through conversational AI coding.",
      liveUrl: "#",
      githubUrl: "#",
      techStack: ["React", "Socket.io", "Express", "Redis", "TypeScript"],
      aiTools: ["Claude", "GitHub Copilot"],
      status: "live",
      vibeTime: "1 day",
    },
    {
      id: 4,
      title: "Portfolio Generator",
      description: "A tool that generates stunning developer portfolios from a GitHub profile. Users input their username and get a fully customizable portfolio site.",
      liveUrl: "#",
      githubUrl: "#",
      techStack: ["Next.js", "GitHub API", "Tailwind CSS", "Framer Motion"],
      aiTools: ["Claude"],
      status: "beta",
      vibeTime: "1 day",
    },
    {
      id: 5,
      title: "AI Study Companion",
      description: "An intelligent study platform that generates flashcards, quizzes, and summaries from uploaded documents using LLMs. Features spaced repetition learning.",
      liveUrl: "#",
      githubUrl: "#",
      techStack: ["React", "Python", "FastAPI", "OpenAI", "Pinecone"],
      aiTools: ["Claude", "Cursor"],
      status: "live",
      vibeTime: "4 days",
    },
    {
      id: 6,
      title: "DevOps Monitoring Dashboard",
      description: "Infrastructure monitoring tool with real-time metrics, alerting, and incident management. Visualizes server health, deployments, and CI/CD pipelines.",
      liveUrl: "#",
      githubUrl: "#",
      techStack: ["Next.js", "D3.js", "WebSocket", "Docker", "TypeScript"],
      aiTools: ["Claude", "Windsurf"],
      status: "development",
      vibeTime: "2 days",
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
        return { label: status, dotColor: 'bg-silver', textColor: 'text-silver', borderColor: 'border-white/10', bgColor: 'bg-white/[0.03]' }
    }
  }

  return (
    <section id="vibe-coded" className="section-padding relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-grid opacity-20" />
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-white/[0.06] to-transparent" />

      {/* Accent glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-accent/[0.03] rounded-full blur-[150px]" />
      <div className="absolute bottom-1/4 right-0 w-[300px] h-[300px] bg-accent/[0.04] rounded-full blur-[100px]" />

      <div className="container-max relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="mb-16 sm:mb-20"
        >
          <div className="flex items-center gap-3 mb-4">
            <span className="section-label mb-0">// vibe-coded</span>
            <motion.div
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            >
              <Sparkles className="w-4 h-4 text-accent/80" />
            </motion.div>
          </div>

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
                <div className="glass-card overflow-hidden h-full flex flex-col">
                  {/* Card Header - Terminal style */}
                  <div className="px-4 sm:px-6 pt-5 sm:pt-6 pb-4 border-b border-white/[0.04]">
                    <div className="flex items-center justify-between mb-4">
                      {/* Terminal dots */}
                      <div className="flex items-center gap-1.5">
                        <div className="w-2.5 h-2.5 rounded-full bg-red-500/70" />
                        <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/70" />
                        <div className="w-2.5 h-2.5 rounded-full bg-emerald-500/70" />
                      </div>

                      {/* Status badge */}
                      <div className={`flex items-center gap-1.5 px-2.5 py-1 rounded-md ${statusConfig.bgColor} ${statusConfig.borderColor} border`}>
                        <div className={`w-1.5 h-1.5 rounded-full ${statusConfig.dotColor}`} />
                        <span className={`text-xs font-mono font-medium ${statusConfig.textColor}`}>
                          {statusConfig.label}
                        </span>
                      </div>
                    </div>

                    <h3 className="text-pearl font-semibold text-lg mb-1.5 group-hover:text-accent transition-colors duration-300">
                      {project.title}
                    </h3>

                    {/* Vibe time */}
                    <div className="flex items-center gap-1.5">
                      <Sparkles className="w-3 h-3 text-accent/70" />
                      <span className="text-accent/60 text-xs font-mono">
                        vibe coded in {project.vibeTime}
                      </span>
                    </div>
                  </div>

                  {/* Card Body */}
                  <div className="px-4 sm:px-6 py-4 sm:py-5 flex flex-col flex-1">
                    <p className="text-silver text-sm leading-relaxed mb-4 flex-1">
                      {project.description}
                    </p>

                    {/* AI Tools Used */}
                    <div className="mb-3">
                      <span className="text-xs font-mono text-silver/40 uppercase tracking-wider">AI Tools</span>
                      <div className="flex flex-wrap gap-1.5 mt-1.5">
                        {project.aiTools.map((tool, i) => (
                          <span
                            key={i}
                            className="px-2.5 py-0.5 text-xs font-mono font-medium rounded-md
                                       bg-accent/[0.08] text-accent/70 border border-accent/15
                                       hover:border-accent/30 transition-colors duration-300"
                          >
                            {tool}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Tech Stack */}
                    <div className="mb-4">
                      <span className="text-xs font-mono text-silver/40 uppercase tracking-wider">Stack</span>
                      <div className="flex flex-wrap gap-1.5 mt-1.5">
                        {project.techStack.map((tech, i) => (
                          <span key={i} className="tech-tag text-xs px-2.5 py-0.5">
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Action Links */}
                    <div className="flex gap-2 pt-2 border-t border-white/[0.04]">
                      <a
                        href={project.liveUrl}
                        className="flex-1 flex items-center justify-center gap-2 py-2 rounded-lg text-xs font-medium
                                   bg-accent/[0.06] text-accent border border-accent/10
                                   hover:bg-accent/10 hover:border-accent/20 transition-all duration-300"
                      >
                        <ExternalLink className="w-3.5 h-3.5" />
                        Live Demo
                      </a>
                      <a
                        href={project.githubUrl}
                        className="flex-1 flex items-center justify-center gap-2 py-2 rounded-lg text-xs font-medium
                                   bg-white/[0.03] text-silver border border-white/[0.06]
                                   hover:text-pearl hover:border-white/10 transition-all duration-300"
                      >
                        <Github className="w-3.5 h-3.5" />
                        Source
                      </a>
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
