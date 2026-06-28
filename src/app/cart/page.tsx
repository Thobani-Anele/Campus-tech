'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { Trash2, Plus, Minus } from 'lucide-react'

export default function Cart() {
  return (
    <main className="min-h-screen bg-ct-darker pt-20">
      <div className="container-ct">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12"
        >
          <h1 className="heading-lg gradient-text">Shopping Cart</h1>
        </motion.div>

        <div className="glass-dark rounded-xl p-12 text-center">
          <p className="text-gray-400 mb-6">Your cart is empty</p>
          <Link href="/shop" className="btn-primary">
            Continue Shopping
          </Link>
        </div>
      </div>
    </main>
  )
}