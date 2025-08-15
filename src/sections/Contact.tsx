import { motion } from 'framer-motion'
import { CheckCircle, Mail, MapPin, Phone, Send } from 'lucide-react'
import React, { useState } from 'react'

const Contact: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    setIsSubmitting(false)
    setIsSubmitted(true)
    
    // Reset form after 3 seconds
    setTimeout(() => {
      setIsSubmitted(false)
      setFormData({ name: '', email: '', subject: '', message: '' })
    }, 3000)
  }

  const contactInfo = [
    {
      icon: <Mail className="w-6 h-6" />,
      title: "Email",
      value: "hello@josephagyeman.com",
      link: "mailto:hello@josephagyeman.com"
    },
    {
      icon: <Phone className="w-6 h-6" />,
      title: "Phone",
      value: "+1 (555) 123-4567",
      link: "tel:+15551234567"
    },
    {
      icon: <MapPin className="w-6 h-6" />,
      title: "Location",
      value: "San Francisco, CA",
      link: "#"
    }
  ]

  const socialLinks = [
    { name: "LinkedIn", url: "#", icon: "in" },
    { name: "GitHub", url: "#", icon: "gh" },
    { name: "Twitter", url: "#", icon: "tw" },
    { name: "Dribbble", url: "#", icon: "db" }
  ]

  return (
    <section id="contact" className="section-padding bg-charcoal relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 left-20 w-96 h-96 bg-gradient-to-br from-platinum to-silver rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-20 w-80 h-80 bg-gradient-to-tl from-steel to-silver rounded-full blur-3xl"></div>
      </div>

      <div className="container-max relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12 sm:mb-16"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold gradient-text mb-6">
            Get In Touch
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-platinum to-silver mx-auto mb-6"></div>
          <p className="text-silver text-base sm:text-lg max-w-3xl mx-auto px-4">
            I'm always open to discussing new opportunities, interesting projects, 
            or just having a chat about technology. Let's connect!
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Information */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            <div>
              <h3 className="text-2xl font-semibold text-platinum mb-6">Let's Talk</h3>
              <p className="text-silver text-lg leading-relaxed mb-8">
                I'm currently available for freelance work and full-time opportunities. 
                Whether you have a question or just want to say hi, I'll try my best to get back to you!
              </p>
            </div>

            {/* Contact Details */}
            <div className="space-y-6">
              {contactInfo.map((info, index) => (
                <motion.a
                  key={index}
                  href={info.link}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="flex items-center gap-4 p-4 bg-slate/30 backdrop-blur-sm rounded-xl 
                             border border-steel/30 hover:border-platinum/50 transition-all duration-300
                             group"
                >
                  <div className="text-platinum p-3 bg-steel/30 rounded-lg group-hover:bg-platinum 
                                 group-hover:text-obsidian transition-all duration-300">
                    {info.icon}
                  </div>
                  <div>
                    <h4 className="text-platinum font-medium">{info.title}</h4>
                    <p className="text-silver">{info.value}</p>
                  </div>
                </motion.a>
              ))}
            </div>

            {/* Social Links */}
            <div>
              <h4 className="text-platinum font-semibold mb-4">Follow Me</h4>
              <div className="flex gap-4">
                {socialLinks.map((social, index) => (
                  <motion.a
                    key={index}
                    href={social.url}
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.6 + (index * 0.1) }}
                    whileHover={{ scale: 1.1, y: -2 }}
                    className="w-12 h-12 bg-slate/30 border border-steel/30 rounded-xl 
                               flex items-center justify-center text-platinum hover:bg-platinum 
                               hover:text-obsidian hover:border-platinum transition-all duration-300"
                  >
                    <span className="font-bold text-sm">{social.icon}</span>
                  </motion.a>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="bg-slate/30 backdrop-blur-sm rounded-2xl p-8 border border-steel/30"
          >
            {!isSubmitted ? (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                  <div>
                    <label htmlFor="name" className="block text-platinum font-medium mb-2 text-sm sm:text-base">
                      Name *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      className="w-full px-3 sm:px-4 py-2 sm:py-3 bg-charcoal/50 border border-steel/30 rounded-lg 
                                 text-platinum placeholder-silver focus:outline-none focus:border-platinum 
                                 transition-colors duration-300 text-sm sm:text-base"
                      placeholder="Your name"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-platinum font-medium mb-2 text-sm sm:text-base">
                      Email *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className="w-full px-3 sm:px-4 py-2 sm:py-3 bg-charcoal/50 border border-steel/30 rounded-lg 
                                 text-platinum placeholder-silver focus:outline-none focus:border-platinum 
                                 transition-colors duration-300 text-sm sm:text-base"
                      placeholder="your@email.com"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="subject" className="block text-platinum font-medium mb-2 text-sm sm:text-base">
                    Subject *
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    required
                    className="w-full px-3 sm:px-4 py-2 sm:py-3 bg-charcoal/50 border border-steel/30 rounded-lg 
                               text-platinum placeholder-silver focus:outline-none focus:border-platinum 
                               transition-colors duration-300 text-sm sm:text-base"
                    placeholder="What's this about?"
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-platinum font-medium mb-2 text-sm sm:text-base">
                    Message *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                    rows={6}
                    className="w-full px-3 sm:px-4 py-2 sm:py-3 bg-charcoal/50 border border-steel/30 rounded-lg 
                               text-platinum placeholder-silver focus:outline-none focus:border-platinum 
                               transition-colors duration-300 resize-none text-sm sm:text-base"
                    placeholder="Tell me more about your project..."
                  />
                </div>

                <motion.button
                  type="submit"
                  disabled={isSubmitting}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-platinum to-silver text-obsidian 
                             rounded-lg font-semibold text-base sm:text-lg hover:from-white hover:to-platinum 
                             transition-all duration-300 shadow-lg hover:shadow-xl disabled:opacity-50 
                             disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-5 h-5 border-2 border-obsidian border-t-transparent rounded-full animate-spin"></div>
                      Sending...
                    </>
                  ) : (
                    <>
                      <Send className="w-5 h-5" />
                      Send Message
                    </>
                  )}
                </motion.button>
              </form>
            ) : (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-12"
              >
                <CheckCircle className="w-16 h-16 text-platinum mx-auto mb-4" />
                <h3 className="text-2xl font-semibold text-platinum mb-2">Message Sent!</h3>
                <p className="text-silver">Thank you for reaching out. I'll get back to you soon!</p>
              </motion.div>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default Contact
