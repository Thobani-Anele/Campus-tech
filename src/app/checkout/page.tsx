'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'

export default function Checkout() {
  return (
    <main className="min-h-screen bg-ct-darker pt-20">
      <div className="container-ct">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12"
        >
          <h1 className="heading-lg gradient-text">Checkout</h1>
        </motion.div>

        <div className="glass-dark rounded-xl p-12 text-center">
          <p className="text-gray-400 mb-6">Checkout coming soon</p>
          <Link href="/shop" className="btn-primary">
            Back to Shop
          </Link>
        </div>
      </div>
    </main>
  )
}