import { motion } from 'framer-motion'
import { Award, Heart, Target, User } from 'lucide-react'
import React from 'react'

const About: React.FC = () => {
  const features = [
    {
      icon: <Target className="w-5 h-5" />,
      title: "End-to-End Ownership",
      description: "From architecture design to CI/CD deployment — I own the full lifecycle of features and systems."
    },
    {
      icon: <Award className="w-5 h-5" />,
      title: "Production-Grade Code",
      description: "Clean, tested, and maintainable code with proper documentation, reviews, and engineering best practices."
    },
    {
      icon: <Heart className="w-5 h-5" />,
      title: "AI-Augmented Builder",
      description: "Early adopter of AI-assisted development, shipping full applications in days using modern AI tools."
    },
    {
      icon: <User className="w-5 h-5" />,
      title: "Team Multiplier",
      description: "I build reusable libraries, mentor junior devs, and streamline processes that make the whole team faster."
    }
  ]

  return (
    <section id="about" className="section-padding scroll-mt-20 relative overflow-hidden">
      {/* Subtle background */}
      <div className="absolute inset-0 bg-grid" />
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-line/[0.06] to-transparent" />

      <div className="container-max relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="mb-12 sm:mb-16"
        >
          <span className="section-label">// about</span>
          <h2 className="section-heading">
            Get to know me
          </h2>
          <div className="accent-line mt-6" />
        </motion.div>

        <div className="grid lg:grid-cols-5 gap-12 lg:gap-16">
          {/* Left Column - Image */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="lg:col-span-2"
          >
            <div className="relative max-w-sm mx-auto lg:mx-0">
              {/* Corner brackets — top-left */}
              <div className="absolute -top-3 -left-3 w-10 h-10 z-20">
                <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-accent to-transparent" />
                <div className="absolute top-0 left-0 h-full w-[2px] bg-gradient-to-b from-accent to-transparent" />
              </div>
              {/* Top-right */}
              <div className="absolute -top-3 -right-3 w-10 h-10 z-20">
                <div className="absolute top-0 right-0 w-full h-[2px] bg-gradient-to-l from-accent to-transparent" />
                <div className="absolute top-0 right-0 h-full w-[2px] bg-gradient-to-b from-accent to-transparent" />
              </div>
              {/* Bottom-left */}
              <div className="absolute -bottom-3 -left-3 w-10 h-10 z-20">
                <div className="absolute bottom-0 left-0 w-full h-[2px] bg-gradient-to-r from-accent to-transparent" />
                <div className="absolute bottom-0 left-0 h-full w-[2px] bg-gradient-to-t from-accent to-transparent" />
              </div>
              {/* Bottom-right */}
              <div className="absolute -bottom-3 -right-3 w-10 h-10 z-20">
                <div className="absolute bottom-0 right-0 w-full h-[2px] bg-gradient-to-l from-accent to-transparent" />
                <div className="absolute bottom-0 right-0 h-full w-[2px] bg-gradient-to-t from-accent to-transparent" />
              </div>

              {/* Glow behind image */}
              <div className="absolute -inset-4 bg-accent/[0.04] rounded-3xl blur-2xl -z-10" />

              {/* Outer dashed border frame */}
              <div className="absolute -inset-2 rounded-2xl border border-dashed border-accent/[0.12] -z-10" />

              {/* Image container */}
              <div className="relative rounded-2xl overflow-hidden border border-line/[0.06] shadow-card group
                            hover:border-line/[0.1] transition-all duration-500">
                <img
                  src="/me.jpeg"
                  alt="Joseph Yaw Agyeman"
                  className="w-full aspect-[4/5] object-cover grayscale hover:grayscale-0 transition-all duration-500"
                />
                {/* Overlay gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-obsidian/80 via-obsidian/20 to-transparent" />

                {/* Scanline effect */}
                <div
                  className="absolute inset-0 opacity-[0.06] pointer-events-none"
                  style={{
                    backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(6,182,212,0.12) 2px, rgba(6,182,212,0.12) 4px)',
                  }}
                />

                {/* Bottom info bar */}
                <div className="absolute bottom-0 inset-x-0 px-4 py-3 flex items-center justify-between">
                  <span className="font-mono text-xs text-accent/60 tracking-widest uppercase">joseph.dev</span>
                  <div className="flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
                    <span className="font-mono text-xs text-accent/60">online</span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right Column - Content */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="lg:col-span-3 space-y-8"
          >
            {/* Bio */}
            <div className="space-y-5">
              <p className="text-silver text-base leading-relaxed sm:leading-[1.8]">
                I'm a <span className="text-pearl font-medium">Full Stack Developer and AI/ML Engineer</span> with over
                5 years of experience shipping production software across B2B platforms, fintech, and
                cybersecurity. My core stack is <span className="text-pearl">Django</span>, <span className="text-pearl">React/Next.js</span>,
                and TypeScript, backed by PostgreSQL, Redis, and Elasticsearch — deployed
                on <span className="text-pearl">AWS</span> with Docker, Kubernetes, and CI/CD pipelines I architect myself.
                At <span className="text-pearl font-medium">KNG Technologies</span>, I lead the development of distributed
                workflow services, Kafka data pipelines, and DevOps infrastructure.
              </p>

              <p className="text-silver text-base leading-relaxed sm:leading-[1.8]">
                What sets me apart is my ability to pair deep engineering fundamentals with
                cutting-edge <span className="text-pearl">AI/ML</span> — from training models with TensorFlow
                and PyTorch to leveraging LLMs for automation. I'm also an early adopter
                of <span className="text-pearl font-medium">AI-assisted development</span>, using tools like Claude and
                Cursor to ship full applications in days. Based in Turkey, open to remote roles worldwide,
                and I thrive in fast-moving teams where I can own problems end-to-end.
              </p>
            </div>

            {/* Feature Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: index * 0.08 }}
                  className="glass-card p-4 sm:p-6 group"
                >
                  <div className="flex items-start gap-3.5">
                    <div className="p-2 rounded-lg bg-accent/[0.06] text-accent border border-accent/10
                                    group-hover:bg-accent/10 group-hover:border-accent/20 transition-all duration-300">
                      {feature.icon}
                    </div>
                    <div>
                      <h4 className="text-pearl font-medium text-sm mb-1">{feature.title}</h4>
                      <p className="text-silver text-sm leading-relaxed">{feature.description}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default About
