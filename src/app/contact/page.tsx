'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { MapPin, Phone, Mail, MessageSquare } from 'lucide-react'

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  })
  const [submitted, setSubmitted] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value,
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    // TODO: Send email via Resend API
    setSubmitted(true)
    setTimeout(() => {
      setFormData({ name: '', email: '', phone: '', message: '' })
      setSubmitted(false)
    }, 2000)
  }

  return (
    <main className="min-h-screen bg-ct-darker pt-20">
      <div className="container-ct">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-3xl mx-auto text-center mb-20"
        >
          <h1 className="heading-lg gradient-text mb-6">Get in Touch</h1>
          <p className="text-xl text-gray-300">
            Have questions? We're here to help. Contact us via any channel that works for you.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-20">
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <div className="glass-dark rounded-xl p-8">
              <h2 className="heading-sm mb-6">Send us a Message</h2>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-sm font-semibold mb-2">Name</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 rounded-lg bg-ct-darker border border-ct-accent-blue/30 text-white placeholder-gray-500 focus:outline-none focus:border-ct-accent-cyan"
                    placeholder="Your name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-2">Email</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 rounded-lg bg-ct-darker border border-ct-accent-blue/30 text-white placeholder-gray-500 focus:outline-none focus:border-ct-accent-cyan"
                    placeholder="your@email.com"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-2">Phone</label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-lg bg-ct-darker border border-ct-accent-blue/30 text-white placeholder-gray-500 focus:outline-none focus:border-ct-accent-cyan"
                    placeholder="+27 68 444 7297"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-2">Message</label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={5}
                    className="w-full px-4 py-3 rounded-lg bg-ct-darker border border-ct-accent-blue/30 text-white placeholder-gray-500 focus:outline-none focus:border-ct-accent-cyan resize-none"
                    placeholder="Your message..."
                  />
                </div>
                <button type="submit" className="btn-primary w-full">
                  {submitted ? 'Message Sent!' : 'Send Message'}
                </button>
              </form>
            </div>
          </motion.div>

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            {[
              {
                icon: MessageSquare,
                title: 'WhatsApp',
                desc: 'Chat with us on WhatsApp for instant support',
                contact: '+27 68 444 7297',
                link: 'https://wa.me/27684472974',
              },
              {
                icon: Phone,
                title: 'Phone',
                desc: 'Call us during business hours',
                contact: '+27 68 444 7297',
                link: 'tel:+27684472974',
              },
              {
                icon: Mail,
                title: 'Email',
                desc: 'Send us an email anytime',
                contact: 'support@campustech.co.za',
                link: 'mailto:support@campustech.co.za',
              },
              {
                icon: MapPin,
                title: 'Location',
                desc: 'Bloemfontein, South Africa',
                contact: 'Available for campus pickup',
                link: '#',
              },
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <a href={item.link} className="card-glass block group">
                  <item.icon className="w-8 h-8 text-ct-accent-cyan mb-3" />
                  <h3 className="heading-sm mb-2 group-hover:text-ct-accent-blue transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-gray-400 text-sm mb-2">{item.desc}</p>
                  <p className="font-semibold text-ct-accent-blue">{item.contact}</p>
                </a>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </main>
  )
}