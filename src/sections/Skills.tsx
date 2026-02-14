import { motion } from 'framer-motion'
import React from 'react'

const Skills: React.FC = () => {
  const skillGroups = [
    {
      label: "Languages",
      skills: ["Python", "Java", "JavaScript", "TypeScript"],
    },
    {
      label: "Frontend",
      skills: ["React", "Next.js", "Tailwind CSS", "HTML/CSS", "Framer Motion"],
    },
    {
      label: "Backend",
      skills: ["Django", "Django REST", "Spring Boot", "GraphQL", "REST APIs"],
    },
    {
      label: "Databases",
      skills: ["PostgreSQL", "MySQL", "MongoDB", "Redis", "Elasticsearch"],
    },
    {
      label: "Infrastructure",
      skills: ["Docker", "Kubernetes", "AWS", "Helm", "Linux", "Nginx"],
    },
    {
      label: "CI/CD",
      skills: ["GitHub Actions", "CircleCI", "GitLab CI/CD", "AWS CodePipeline"],
    },
    {
      label: "Architecture",
      skills: ["Microservices", "Distributed Systems", "Kafka", "RabbitMQ", "Event-Driven"],
    },
    {
      label: "AI / ML",
      skills: ["TensorFlow", "PyTorch", "NLP", "LLMs", "Deep Learning", "Computer Vision"],
    },
    {
      label: "Practices",
      skills: ["Agile", "SCRUM", "TDD", "OOP", "Code Review", "System Design"],
    },
  ]

  return (
    <section id="skills" className="section-padding relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-grid opacity-20" />
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-white/[0.06] to-transparent" />
      <div className="absolute top-1/3 right-0 w-[400px] h-[400px] bg-accent/[0.04] rounded-full blur-[100px]" />

      <div className="container-max relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="mb-16 sm:mb-20"
        >
          <span className="section-label">// skills</span>
          <h2 className="section-heading">Tech Stack</h2>
          <div className="accent-line mt-6" />
          <p className="text-silver text-base max-w-2xl mt-6 leading-relaxed">
            Tools and technologies I use to ship production software.
          </p>
        </motion.div>

        {/* Skills Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-10">
          {skillGroups.map((group, groupIndex) => (
            <motion.div
              key={groupIndex}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: groupIndex * 0.08 }}
              className="glass-card p-4 sm:p-5"
            >
              <h3 className="text-xs font-mono text-accent/70 uppercase tracking-widest mb-3">
                {group.label}
              </h3>
              <div className="flex flex-wrap gap-2">
                {group.skills.map((skill, skillIndex) => (
                  <span key={skillIndex} className="tech-tag">
                    {skill}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Skills
