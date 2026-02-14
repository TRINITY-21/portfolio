import { motion } from 'framer-motion'
import { Download, GitCommit } from 'lucide-react'
import React from 'react'

const Experience: React.FC = () => {
  const experiences = [
    {
      company: "KNG Technologies",
      position: "Full-stack Engineer",
      duration: "Sept 2022 - Present",
      location: "Remote",
      active: true,
      summary: "Lead development of distributed workflow services and Kafka data pipelines. Architect CI/CD with GitHub Actions, Docker, Kubernetes, and Helm on AWS.",
      stack: ["Django", "Next.js", "TypeScript", "PostgreSQL", "Kafka", "AWS", "Kubernetes", "Docker"],
    },
    {
      company: "Cybotcx",
      position: "Full-stack Engineer",
      duration: "Oct 2021 - June 2023",
      location: "Remote",
      active: false,
      summary: "Built scalable applications with Django and React. Orchestrated Kubernetes deployments, implemented CircleCI pipelines, and optimized MySQL/Redis/Elasticsearch layers.",
      stack: ["Django", "React", "TypeScript", "MySQL", "Redis", "Elasticsearch", "Kubernetes", "CircleCI"],
    },
    {
      company: "Mpedigree",
      position: "Backend Engineer",
      duration: "Sept 2020 - 2022",
      location: "Accra, Ghana",
      active: false,
      summary: "Contributed to Panabios and Alkemy care — B2B marketplace platforms. Built backend services with Django REST, maintained in-house packages, and worked with RabbitMQ messaging.",
      stack: ["Python", "Django", "React", "RabbitMQ", "Redis", "Redux", "Ansible", "Linux"],
    },
  ]

  return (
    <section id="experience" className="section-padding relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-grid opacity-20" />
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-white/[0.06] to-transparent" />
      <div className="absolute top-1/4 right-0 w-[400px] h-[400px] bg-accent/[0.04] rounded-full blur-[100px]" />

      <div className="container-max relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="mb-16 sm:mb-20"
        >
          <span className="section-label">// experience</span>
          <h2 className="section-heading">Where I've Worked</h2>
          <div className="accent-line mt-6" />
        </motion.div>

        {/* Git-log style timeline */}
        <div className="relative max-w-3xl">

          {experiences.map((exp, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: index * 0.08 }}
              className="relative"
            >
              {/* Commit row — icon + hash-style header */}
              <div className="flex items-center gap-3 mb-3">
                <div className={`relative flex-shrink-0 w-8 h-8 rounded-lg flex items-center justify-center ${
                  exp.active
                    ? 'bg-accent/15 border border-accent/30'
                    : 'bg-white/[0.03] border border-white/[0.06]'
                }`}>
                  <GitCommit className={`w-4 h-4 ${exp.active ? 'text-accent' : 'text-silver/40'}`} />
                  {exp.active && (
                    <span className="absolute -top-0.5 -right-0.5 w-2 h-2 rounded-full bg-accent shadow-[0_0_6px_rgba(6,182,212,0.6)]" />
                  )}
                </div>

                <div className="flex items-center gap-1.5 sm:gap-2 min-w-0">
                  <span className="font-mono text-[11px] sm:text-xs text-accent/60 tracking-wider whitespace-nowrap">{exp.duration}</span>
                  <span className="text-white/10">|</span>
                  <span className="font-mono text-[11px] sm:text-xs text-silver/40 truncate">{exp.location}</span>
                </div>
              </div>

              {/* Vertical connector line */}
              <div className="ml-[15px] pl-5 sm:pl-7 border-l border-dashed border-accent/20 pb-8">
                {/* Card */}
                <div className={`glass-card overflow-hidden group ${exp.active ? 'border-accent/15 shadow-glow' : ''}`}>
                  {/* Terminal-style top bar */}
                  <div className="flex items-center justify-between px-4 sm:px-5 py-2.5 border-b border-white/[0.04] bg-white/[0.01]">
                    <div className="flex items-center gap-1.5">
                      <span className="w-[7px] h-[7px] rounded-full bg-red-500/70" />
                      <span className="w-[7px] h-[7px] rounded-full bg-yellow-500/70" />
                      <span className="w-[7px] h-[7px] rounded-full bg-green-500/70" />
                    </div>
                    {exp.active && (
                      <span className="inline-flex items-center gap-1.5 text-xs font-mono text-accent/70 tracking-wider uppercase">
                        <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
                        current
                      </span>
                    )}
                  </div>

                  <div className="p-4 sm:p-6">
                    {/* Role */}
                    <h3 className="text-pearl font-semibold text-base mb-1.5">
                      {exp.position}
                      <span className="text-accent font-normal"> @ {exp.company}</span>
                    </h3>

                    {/* Summary */}
                    <p className="text-silver text-sm leading-relaxed mb-4">
                      {exp.summary}
                    </p>

                    {/* Stack */}
                    <div className="flex flex-wrap gap-1.5">
                      {exp.stack.map((tech, i) => (
                        <span key={i} className="tech-tag text-xs px-2.5 py-0.5">
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}

          {/* End node */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="flex items-center gap-3"
          >
            <div className="flex-shrink-0 w-8 h-8 rounded-lg flex items-center justify-center bg-white/[0.02] border border-white/[0.04]">
              <span className="w-1.5 h-1.5 rounded-full bg-accent/20" />
            </div>
            <p className="text-silver/40 text-xs font-mono">// the journey continues...</p>
          </motion.div>
        </div>

        {/* Resume Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.3, delay: 0.3 }}
          className="text-center mt-14"
        >
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            className="btn-primary flex items-center gap-2.5 mx-auto px-8"
            onClick={() => window.open('https://drive.google.com/file/d/1oMVo0ut4BzpxZrmPdL2ytrJMAyLx13a-/view?usp=sharing', '_blank')}
          >
            <Download className="w-4 h-4" />
            Download Full Resume
          </motion.button>
        </motion.div>
      </div>
    </section>
  )
}

export default Experience
