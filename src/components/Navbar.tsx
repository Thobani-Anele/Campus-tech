'use client'

import Link from 'next/link'
import { useState } from 'react'
import { Menu, X, ShoppingCart, Search } from 'lucide-react'
import { motion } from 'framer-motion'

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)

  const navItems = [
    { name: 'Home', href: '/' },
    { name: 'Shop', href: '/shop' },
    { name: 'About', href: '/about' },
    { name: 'Contact', href: '/contact' },
  ]

  return (
    <nav className="glass-dark border-b border-ct-accent-blue/20 sticky top-0 z-50">
      <div className="container-ct">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2 group">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-ct-accent-blue to-ct-accent-violet flex items-center justify-center">
              <span className="text-white font-bold text-lg">CT</span>
            </div>
            <span className="text-xl font-bold gradient-text hidden sm:block">Campus Tech</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="text-gray-300 hover:text-ct-accent-blue transition-colors relative group"
              >
                {item.name}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-ct-accent-blue to-ct-accent-violet group-hover:w-full transition-all duration-300" />
              </Link>
            ))}
          </div>

          {/* Right side actions */}
          <div className="flex items-center space-x-4">
            <button className="p-2 hover:bg-ct-accent-blue/20 rounded-lg transition-colors">
              <Search className="w-5 h-5 text-ct-accent-blue" />
            </button>
            <Link href="/cart" className="relative p-2 hover:bg-ct-accent-blue/20 rounded-lg transition-colors">
              <ShoppingCart className="w-5 h-5 text-ct-accent-blue" />
              <span className="absolute -top-2 -right-2 bg-ct-accent-violet text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                0
              </span>
            </Link>

            {/* Mobile menu button */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden p-2 hover:bg-ct-accent-blue/20 rounded-lg transition-colors"
            >
              {isOpen ? (
                <X className="w-6 h-6 text-ct-accent-blue" />
              ) : (
                <Menu className="w-6 h-6 text-ct-accent-blue" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="md:hidden pb-4 space-y-2"
          >
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="block px-4 py-2 hover:bg-ct-accent-blue/20 rounded-lg text-gray-300 hover:text-ct-accent-blue transition-colors"
                onClick={() => setIsOpen(false)}
              >
                {item.name}
              </Link>
            ))}
          </motion.div>
        )}
      </div>
    </nav>
  )
}
