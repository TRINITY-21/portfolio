import { motion } from 'framer-motion'
import { Download, ExternalLink } from 'lucide-react'
import React from 'react'

interface Resume {
  file: string
  filename: string
  label: string
  blurb: string
  stack: string[]
  recommended?: boolean
}

const RESUMES: Resume[] = [
  {
    file: '/resumes/resume_aiml.pdf',
    filename: 'Joseph-Agyeman-AI-Application-Engineer.pdf',
    label: 'AI Application Engineer',
    blurb: 'Full-stack engineer shipping LLM-powered features. Customer-facing AI assistant in production at KNG, open-source MCP server, active blog on RAG and AI agents.',
    stack: ['Claude', 'OpenAI', 'Gemini', 'MCP', 'Django', 'Next.js', 'Python', 'TypeScript'],
    recommended: true,
  },
  {
    file: '/resumes/resume_frontend.pdf',
    filename: 'Joseph-Agyeman-Frontend-Engineer.pdf',
    label: 'Frontend Engineer',
    blurb: '5+ years of production experience. The last two focused almost exclusively on React, Next.js, and TypeScript at KNG.',
    stack: ['React', 'Next.js', 'TypeScript', 'Tailwind', 'Jest', 'RTL'],
  },
  {
    file: '/resumes/resume_backend.pdf',
    filename: 'Joseph-Agyeman-Backend-Engineer.pdf',
    label: 'Backend Engineer',
    blurb: 'Backend foundations in Python and Django. REST API design, PostgreSQL, Kafka, async messaging, container deploys.',
    stack: ['Python', 'Django', 'FastAPI', 'PostgreSQL', 'Redis', 'Kafka', 'Docker', 'Kubernetes'],
  },
  {
    file: '/resumes/resume_techlead.pdf',
    filename: 'Joseph-Agyeman-Tech-Lead.pdf',
    label: 'Tech Lead',
    blurb: 'Senior IC with technical leadership instincts. Spec writing, architecture decisions, code review, cross-functional coordination.',
    stack: ['Architecture', 'Code Review', 'Spec Writing', 'Cross-Functional', 'Mentoring'],
  },
  {
    file: '/resumes/resume_sdet.pdf',
    filename: 'Joseph-Agyeman-SDET.pdf',
    label: 'Software Engineer in Test',
    blurb: 'Engineer-tester with strong code-reading instincts. pytest + Jest coverage across Django and React stacks, CI test infrastructure ownership.',
    stack: ['pytest', 'Jest', 'RTL', 'GitHub Actions', 'Manual E2E', 'Bug Reproduction'],
  },
]

const ResumePage: React.FC = () => {
  return (
    <section className="min-h-screen pt-32 pb-20 relative overflow-hidden">
      <div className="absolute inset-0 bg-grid" />
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-accent/[0.03] rounded-full blur-[150px]" />

      <div className="container-max relative z-10 max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="mb-10 sm:mb-14"
        >
          <span className="section-label">// resumes</span>
          <h1 className="section-heading">
            Pick the angle
          </h1>
          <div className="accent-line mt-6" />
          <p className="text-silver text-base max-w-2xl mt-6 leading-relaxed">
            Same career, told through five different lenses. Pick the one that matches the role
            you're hiring for &mdash; or the one closest to it. The work is the same;
            what changes is what gets emphasized.
          </p>
        </motion.div>

        <div className="space-y-3">
          {RESUMES.map((r, i) => (
            <motion.a
              key={r.file}
              href={r.file}
              download={r.filename}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: i * 0.06 }}
              className="group block glass-card p-5 sm:p-6 hover:border-line/[0.12] transition-all duration-300"
            >
              <div className="flex items-start gap-4">
                <div className="hidden sm:flex w-10 h-10 rounded-lg bg-accent/[0.06] border border-accent/15 items-center justify-center flex-shrink-0
                                group-hover:bg-accent/10 group-hover:border-accent/25 transition-all duration-300">
                  <Download className="w-4 h-4 text-accent" />
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex flex-wrap items-center gap-2 mb-1.5">
                    <h3 className="text-pearl font-semibold text-base sm:text-lg">{r.label}</h3>
                    {r.recommended && (
                      <span className="text-[9px] font-mono text-accent/80 tracking-widest uppercase
                                       px-1.5 py-0.5 rounded bg-accent/[0.08] border border-accent/15">
                        primary
                      </span>
                    )}
                  </div>
                  <p className="text-silver text-sm leading-relaxed mb-3">{r.blurb}</p>
                  <div className="flex flex-wrap gap-1.5">
                    {r.stack.map((t) => (
                      <span key={t} className="tech-tag text-[11px] px-2 py-0.5">{t}</span>
                    ))}
                  </div>
                </div>

                <ExternalLink className="w-4 h-4 text-silver/40 group-hover:text-accent transition-colors flex-shrink-0 mt-1" />
              </div>
            </motion.a>
          ))}
        </div>

        <p className="text-silver/50 text-xs mt-10 leading-relaxed">
          Built from a single source. Each PDF is regenerated whenever I update a role-specific
          claim &mdash; no copy-paste drift.
        </p>
      </div>
    </section>
  )
}

export default ResumePage
