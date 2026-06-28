'use client'

import Link from 'next/link'
import { Mail, Phone, MapPin, Instagram, Twitter } from 'lucide-react'
import { motion } from 'framer-motion'

export default function Footer() {
  const currentYear = new Date().getFullYear()

  const footerLinks = {
    Shop: [
      { name: 'All Products', href: '/shop' },
      { name: 'Headphones', href: '/shop?category=headphones' },
      { name: 'Smartwatches', href: '/shop?category=smartwatches' },
      { name: 'LED Lighting', href: '/shop?category=led-lighting' },
    ],
    Company: [
      { name: 'About Us', href: '/about' },
      { name: 'Contact', href: '/contact' },
      { name: 'Privacy Policy', href: '/privacy' },
      { name: 'Terms & Conditions', href: '/terms' },
    ],
    Support: [
      { name: 'FAQ', href: '/faq' },
      { name: 'Shipping Info', href: '/shipping' },
      { name: 'Returns', href: '/returns' },
      { name: 'Track Order', href: '/track' },
    ],
  }

  return (
    <footer className="bg-ct-dark border-t border-ct-accent-blue/20">
      {/* Main footer content */}
      <div className="container-ct py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mb-12">
          {/* Brand section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-1"
          >
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-ct-accent-blue to-ct-accent-violet flex items-center justify-center">
                <span className="text-white font-bold">CT</span>
              </div>
              <span className="text-xl font-bold gradient-text">Campus Tech</span>
            </div>
            <p className="text-gray-400 text-sm">
              Premium tech accessories for university students in Bloemfontein. Quality, style, and fair prices.
            </p>
            <div className="flex space-x-4 mt-4">
              <a href="#" className="text-gray-400 hover:text-ct-accent-blue transition-colors">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-ct-accent-blue transition-colors">
                <Twitter className="w-5 h-5" />
              </a>
            </div>
          </motion.div>

          {/* Footer links */}
          {Object.entries(footerLinks).map(([category, links]) => (
            <motion.div
              key={category}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
            >
              <h4 className="font-semibold mb-4 text-ct-accent-blue">{category}</h4>
              <ul className="space-y-2">
                {links.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="text-gray-400 hover:text-ct-accent-cyan transition-colors text-sm"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}

          {/* Contact section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <h4 className="font-semibold mb-4 text-ct-accent-blue">Get in Touch</h4>
            <div className="space-y-3">
              <a href="mailto:support@campustech.co.za" className="flex items-center space-x-2 text-gray-400 hover:text-ct-accent-cyan transition-colors text-sm">
                <Mail className="w-4 h-4" />
                <span>support@campustech.co.za</span>
              </a>
              <a href="https://wa.me/27684472974" className="flex items-center space-x-2 text-gray-400 hover:text-ct-accent-cyan transition-colors text-sm">
                <Phone className="w-4 h-4" />
                <span>+27 68 444 7297</span>
              </a>
              <div className="flex items-center space-x-2 text-gray-400 text-sm">
                <MapPin className="w-4 h-4" />
                <span>Bloemfontein, South Africa</span>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Newsletter signup */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="glass-dark rounded-xl p-8 mb-8 border border-ct-accent-blue/30"
        >
          <div className="max-w-md">
            <h3 className="heading-sm mb-2">Stay Updated</h3>
            <p className="text-gray-400 text-sm mb-4">
              Subscribe to our newsletter for new products, deals, and campus delivery updates.
            </p>
            <form className="flex flex-col sm:flex-row gap-2">
              <input
                type="email"
                placeholder="Your email"
                className="flex-1 px-4 py-2 rounded-lg bg-ct-darker border border-ct-accent-blue/30 text-white placeholder-gray-500 focus:outline-none focus:border-ct-accent-cyan"
              />
              <button className="btn-primary">Subscribe</button>
            </form>
          </div>
        </motion.div>

        {/* Bottom bar */}
        <div className="border-t border-ct-accent-blue/20 pt-8 flex flex-col md:flex-row items-center justify-between">
          <p className="text-gray-400 text-sm">
            &copy; {currentYear} Campus Tech. All rights reserved. Bloemfontein, South Africa.
          </p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <Link href="/privacy" className="text-gray-400 hover:text-ct-accent-cyan text-sm transition-colors">
              Privacy
            </Link>
            <Link href="/terms" className="text-gray-400 hover:text-ct-accent-cyan text-sm transition-colors">
              Terms
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
