'use client'

import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { Trash2, Plus, Minus, ShoppingCart, ArrowRight } from 'lucide-react'
import { useCart, updateQuantity, removeFromCart, cartSubtotal } from '@/lib/cart'

export default function Cart() {
  const items = useCart()
  const subtotal = cartSubtotal(items)

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

        {items.length === 0 ? (
          <div className="glass-dark rounded-xl p-12 text-center">
            <ShoppingCart className="w-12 h-12 text-ct-accent-blue mx-auto mb-4 opacity-50" />
            <p className="text-gray-400 mb-6">Your cart is empty</p>
            <Link href="/shop" className="btn-primary">
              Continue Shopping
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Items */}
            <div className="lg:col-span-2 space-y-4">
              {items.map(item => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="glass-dark rounded-xl p-4 flex gap-4 items-center"
                >
                  <Link href={`/product/${item.slug}`} className="relative w-20 h-20 rounded-lg overflow-hidden bg-ct-card-bg flex-shrink-0">
                    {item.image_url && (
                      <Image src={item.image_url} alt={item.name} fill className="object-cover" />
                    )}
                  </Link>

                  <div className="flex-grow min-w-0">
                    <Link href={`/product/${item.slug}`} className="font-semibold hover:text-ct-accent-blue transition-colors line-clamp-1">
                      {item.name}
                    </Link>
                    <p className="text-ct-accent-cyan font-bold mt-1">R{item.price}</p>
                  </div>

                  <div className="flex items-center gap-2 border border-ct-accent-blue/30 rounded-lg p-1">
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      className="p-1 hover:bg-ct-accent-blue/20 rounded"
                      aria-label="Decrease quantity"
                    >
                      <Minus className="w-4 h-4" />
                    </button>
                    <span className="w-8 text-center">{item.quantity}</span>
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      className="p-1 hover:bg-ct-accent-blue/20 rounded"
                      aria-label="Increase quantity"
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>

                  <p className="font-bold w-24 text-right">R{item.price * item.quantity}</p>

                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="p-2 text-gray-400 hover:text-red-400 transition-colors"
                    aria-label={`Remove ${item.name}`}
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </motion.div>
              ))}
            </div>

            {/* Summary */}
            <div className="glass-dark rounded-xl p-6 h-fit space-y-4">
              <h2 className="text-xl font-bold">Order Summary</h2>
              <div className="flex justify-between text-gray-300">
                <span>Subtotal</span>
                <span>R{subtotal}</span>
              </div>
              <div className="flex justify-between text-gray-300">
                <span>Delivery</span>
                <span className="text-gray-400 text-sm">Calculated at checkout</span>
              </div>
              <div className="border-t border-ct-accent-blue/20 pt-4 flex justify-between font-bold text-lg">
                <span>Subtotal</span>
                <span className="text-ct-accent-cyan">R{subtotal}</span>
              </div>
              <Link href="/checkout" className="btn-primary w-full flex items-center justify-center gap-2">
                Proceed to Checkout
                <ArrowRight className="w-5 h-5" />
              </Link>
              <Link href="/shop" className="block text-center text-sm text-gray-400 hover:text-ct-accent-blue transition-colors">
                Continue shopping
              </Link>
            </div>
          </div>
        )}
      </div>
    </main>
  )
}
