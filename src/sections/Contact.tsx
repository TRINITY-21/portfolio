import emailjs from '@emailjs/browser'
import { motion } from 'framer-motion'
import { CheckCircle, Github, Linkedin, Mail, MapPin, Phone, Send } from 'lucide-react'
import React, { useRef, useState } from 'react'
import { EMAILJS_CONFIG } from '../config/emailjs'

const Contact: React.FC = () => {
  const formRef = useRef<HTMLFormElement>(null)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [error, setError] = useState('')

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    const fieldMapping: { [key: string]: string } = {
      'user_name': 'name',
      'user_email': 'email',
      'subject': 'subject',
      'message': 'message'
    }

    const formDataKey = fieldMapping[name] || name
    setFormData({
      ...formData,
      [formDataKey]: value
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setError('')

    try {
      const result = await emailjs.sendForm(
        EMAILJS_CONFIG.SERVICE_ID,
        EMAILJS_CONFIG.TEMPLATE_ID,
        formRef.current!,
        EMAILJS_CONFIG.PUBLIC_KEY
      )

      console.log('Email sent successfully:', result.text)
      setIsSubmitted(true)

      setTimeout(() => {
        setIsSubmitted(false)
        setFormData({ name: '', email: '', subject: '', message: '' })
      }, 3000)

    } catch (error) {
      console.error('Email send failed:', error)
      setError('Failed to send message. Please try again or contact me directly.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const contactInfo = [
    {
      icon: <Mail className="w-5 h-5" />,
      title: "Email",
      value: "agyemanjoseph12@yahoo.com",
      link: "mailto:agyemanjoseph12@yahoo.com"
    },
    {
      icon: <Phone className="w-5 h-5" />,
      title: "Phone",
      value: "+90 538 243 24 00",
      link: "tel:+905382432400"
    },
    {
      icon: <MapPin className="w-5 h-5" />,
      title: "Location",
      value: "Adapazari, Sakarya Turkey",
      link: "#"
    }
  ]

  return (
    <section id="contact" className="section-padding scroll-mt-20 relative overflow-hidden">
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
          <span className="section-label">// contact</span>
          <h2 className="section-heading">Get In Touch</h2>
          <div className="accent-line mt-6" />
          <p className="text-silver text-base max-w-2xl mt-6 leading-relaxed">
            I'm always open to discussing new opportunities, interesting projects,
            or just having a chat about technology.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-5 gap-8 lg:gap-16">
          {/* Contact Information */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="lg:col-span-2 space-y-6"
          >
            <div>
              <h3 className="text-pearl font-semibold text-lg mb-3">Let's Talk</h3>
              <p className="text-silver text-sm leading-relaxed">
                Currently available for freelance work and full-time opportunities.
                Whether you have a question or just want to say hi, I'll try my best to get back to you.
              </p>
            </div>

            {/* Contact Details */}
            <div className="space-y-4">
              {contactInfo.map((info, index) => (
                <motion.a
                  key={index}
                  href={info.link}
                  initial={{ opacity: 0, x: -15 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: index * 0.08 }}
                  className="flex items-center gap-4 p-4 glass-card group"
                >
                  <div className="flex-shrink-0 p-2.5 rounded-lg bg-accent/[0.06] text-accent border border-accent/10
                                 group-hover:bg-accent/10 group-hover:border-accent/20 transition-all duration-300">
                    {info.icon}
                  </div>
                  <div className="min-w-0">
                    <h4 className="text-pearl font-medium text-sm">{info.title}</h4>
                    <p className="text-silver text-sm break-all sm:break-normal">{info.value}</p>
                  </div>
                </motion.a>
              ))}
            </div>

            {/* Social Links */}
            <div>
              <h4 className="text-pearl font-medium text-sm mb-3">Connect</h4>
              <div className="flex gap-3">
                <a
                  href="https://www.linkedin.com/in/joseph-yaw-agyeman-747384241/"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="LinkedIn"
                  className="w-10 h-10 rounded-lg bg-line/[0.03] border border-line/[0.06]
                             flex items-center justify-center text-silver hover:text-accent
                             hover:border-accent/20 hover:bg-accent/[0.06] hover:scale-105 transition-all duration-300"
                >
                  <Linkedin className="w-4 h-4" />
                </a>
                <a
                  href="https://github.com/TRINITY-21"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="GitHub"
                  className="w-10 h-10 rounded-lg bg-line/[0.03] border border-line/[0.06]
                             flex items-center justify-center text-silver hover:text-accent
                             hover:border-accent/20 hover:bg-accent/[0.06] hover:scale-105 transition-all duration-300"
                >
                  <Github className="w-4 h-4" />
                </a>
              </div>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="lg:col-span-3"
          >
            <div className="glass-card p-4 sm:p-8">
              {!isSubmitted ? (
                <form ref={formRef} onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="name" className="block text-pearl font-medium text-xs mb-2 tracking-wide uppercase">
                        Name
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="user_name"
                        value={formData.name}
                        onChange={handleInputChange}
                        required
                        className="input-field"
                        placeholder="Your name"
                      />
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-pearl font-medium text-xs mb-2 tracking-wide uppercase">
                        Email
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="user_email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                        className="input-field"
                        placeholder="your@email.com"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="subject" className="block text-pearl font-medium text-xs mb-2 tracking-wide uppercase">
                      Subject
                    </label>
                    <input
                      type="text"
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleInputChange}
                      required
                      className="input-field"
                      placeholder="What's this about?"
                    />
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-pearl font-medium text-xs mb-2 tracking-wide uppercase">
                      Message
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      required
                      rows={5}
                      className="input-field resize-none"
                      placeholder="Tell me about your project..."
                    />
                  </div>

                  {error && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="p-3 bg-red-500/[0.06] border border-red-500/20 rounded-xl"
                    >
                      <p className="text-red-400 text-sm">{error}</p>
                    </motion.div>
                  )}

                  <motion.button
                    type="submit"
                    disabled={isSubmitting}
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.99 }}
                    className="w-full btn-primary py-3.5 flex items-center justify-center gap-2.5
                               disabled:opacity-40 disabled:cursor-not-allowed disabled:shadow-none"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="w-4 h-4 border-2 border-obsidian border-t-transparent rounded-full animate-spin" />
                        Sending...
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        Send Message
                      </>
                    )}
                  </motion.button>
                </form>
              ) : (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-16"
                >
                  <div className="w-14 h-14 rounded-2xl bg-accent/10 border border-accent/20 flex items-center justify-center mx-auto mb-4">
                    <CheckCircle className="w-7 h-7 text-accent" />
                  </div>
                  <h3 className="text-xl font-semibold text-pearl mb-2">Message Sent!</h3>
                  <p className="text-silver text-sm">Thank you for reaching out. I'll get back to you soon.</p>
                </motion.div>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default Contact
