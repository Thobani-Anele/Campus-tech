'use client'

import { motion } from 'framer-motion'
import { Heart, Target, Users, Zap } from 'lucide-react'

export default function About() {
  return (
    <main className="min-h-screen bg-ct-darker pt-20">
      <div className="container-ct">
        {/* Hero */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-3xl mx-auto text-center mb-20"
        >
          <h1 className="heading-lg gradient-text mb-6">About Campus Tech</h1>
          <p className="text-xl text-gray-300">
            We're on a mission to bring premium tech accessories to university students in Bloemfontein.
          </p>
        </motion.div>

        {/* Our Story */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-3xl mx-auto mb-20"
        >
          <div className="glass-dark rounded-xl p-12">
            <h2 className="heading-md mb-6">Our Story</h2>
            <p className="text-gray-300 leading-relaxed mb-4">
              Campus Tech was born from a simple observation: university students in Bloemfontein wanted premium tech accessories but felt priced out by retail markups and forced to buy from discount shops that compromised on quality.
            </p>
            <p className="text-gray-300 leading-relaxed mb-4">
              We decided to change that. By building relationships directly with manufacturers and optimizing our supply chain, we pass the savings directly to you—without cutting corners on quality or service.
            </p>
            <p className="text-gray-300 leading-relaxed">
              Today, Campus Tech is trusted by over 1,000 students across Bloemfontein campuses. Every order comes with our guarantee: premium quality, fair prices, and delivery to your doorstep.
            </p>
          </div>
        </motion.div>

        {/* Values */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mb-20"
        >
          <h2 className="heading-md text-center mb-12">Our Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: Target,
                title: 'Student-First',
                desc: 'Every decision we make considers what students actually need',
              },
              {
                icon: Heart,
                title: 'Honest Pricing',
                desc: 'No hidden fees. Fair prices. Premium quality.',
              },
              {
                icon: Zap,
                title: 'Fast & Reliable',
                desc: 'Same-day delivery in Bloemfontein, every time',
              },
              {
                icon: Users,
                title: 'Community Focused',
                desc: 'We give back to the student community',
              },
            ].map((value, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="card-glass"
              >
                <value.icon className="w-8 h-8 text-ct-accent-cyan mb-4" />
                <h3 className="font-semibold mb-2">{value.title}</h3>
                <p className="text-gray-400 text-sm">{value.desc}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="glass-dark rounded-xl p-12 text-center mb-20"
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { number: '1000+', label: 'Happy Students' },
              { number: '500+', label: 'Products' },
              { number: '100%', label: 'Same-Day Delivery' },
            ].map((stat, i) => (
              <div key={i}>
                <p className="text-4xl font-bold gradient-text mb-2">{stat.number}</p>
                <p className="text-gray-400">{stat.label}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </main>
  )
}