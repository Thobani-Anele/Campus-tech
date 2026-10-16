'use client'

import { useState } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { MessageCircle, ShoppingCart, CheckCircle } from 'lucide-react'
import { useCart, cartSubtotal, clearCart, DELIVERY_FEE } from '@/lib/cart'

const WHATSAPP_NUMBER = '27684472974'

export default function Checkout() {
  const items = useCart()
  const subtotal = cartSubtotal(items)

  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [deliveryMethod, setDeliveryMethod] = useState<'pickup' | 'delivery'>('pickup')
  const [address, setAddress] = useState('')
  const [notes, setNotes] = useState('')
  const [placed, setPlaced] = useState(false)

  const deliveryFee = deliveryMethod === 'delivery' ? DELIVERY_FEE : 0
  const total = subtotal + deliveryFee

  const canSubmit = name.trim() !== '' && phone.trim() !== '' && (deliveryMethod === 'pickup' || address.trim() !== '')

  const placeOrder = () => {
    const lines = items.map(i => `• ${i.quantity}× ${i.name} — R${i.price * i.quantity}`).join('\n')
    const message = [
      '🛒 *New Campus Tech order*',
      '',
      `*Name:* ${name}`,
      `*Phone:* ${phone}`,
      deliveryMethod === 'pickup' ? '*Delivery:* Campus pickup (free)' : `*Delivery:* ${address}`,
      '',
      '*Items:*',
      lines,
      '',
      `Subtotal: R${subtotal}`,
      `Delivery: ${deliveryFee > 0 ? `R${deliveryFee}` : 'Free (campus pickup)'}`,
      `*Total: R${total}*`,
      '',
      'Payment: cash on delivery / EFT — details to be confirmed on WhatsApp.',
      notes.trim() ? `\n*Notes:* ${notes}` : '',
    ].filter(Boolean).join('\n')

    const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`
    const win = window.open(url, '_blank')
    if (!win) window.location.href = url
    clearCart()
    setPlaced(true)
  }

  if (placed) {
    return (
      <main className="min-h-screen bg-ct-darker pt-20">
        <div className="container-ct max-w-2xl">
          <div className="glass-dark rounded-xl p-12 text-center">
            <CheckCircle className="w-16 h-16 text-green-400 mx-auto mb-6" />
            <h1 className="heading-lg gradient-text mb-4">Order Sent!</h1>
            <p className="text-gray-300 mb-2">
              Your order was opened in WhatsApp — just press send to confirm it with us.
            </p>
            <p className="text-gray-400 text-sm mb-8">
              We&apos;ll confirm availability and arrange payment (cash on delivery or EFT) right there in the chat.
            </p>
            <Link href="/shop" className="btn-primary">
              Continue Shopping
            </Link>
          </div>
        </div>
      </main>
    )
  }

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

        {items.length === 0 ? (
          <div className="glass-dark rounded-xl p-12 text-center">
            <ShoppingCart className="w-12 h-12 text-ct-accent-blue mx-auto mb-4 opacity-50" />
            <p className="text-gray-400 mb-6">Your cart is empty</p>
            <Link href="/shop" className="btn-primary">
              Back to Shop
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Form */}
            <div className="lg:col-span-2 glass-dark rounded-xl p-8 space-y-6">
              <h2 className="text-xl font-bold">Your Details</h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm text-gray-400 mb-2">Full name *</label>
                  <input
                    type="text"
                    value={name}
                    onChange={e => setName(e.target.value)}
                    className="w-full bg-ct-card-bg border border-ct-accent-blue/30 rounded-lg px-4 py-3 focus:outline-none focus:border-ct-accent-blue"
                    placeholder="Thabo Mokoena"
                  />
                </div>
                <div>
                  <label className="block text-sm text-gray-400 mb-2">Phone / WhatsApp *</label>
                  <input
                    type="tel"
                    value={phone}
                    onChange={e => setPhone(e.target.value)}
                    className="w-full bg-ct-card-bg border border-ct-accent-blue/30 rounded-lg px-4 py-3 focus:outline-none focus:border-ct-accent-blue"
                    placeholder="082 123 4567"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm text-gray-400 mb-3">How do you want it? *</label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <button
                    type="button"
                    onClick={() => setDeliveryMethod('pickup')}
                    className={`p-4 rounded-lg border text-left transition-colors ${
                      deliveryMethod === 'pickup'
                        ? 'border-ct-accent-blue bg-ct-accent-blue/10'
                        : 'border-ct-accent-blue/30 hover:border-ct-accent-blue/60'
                    }`}
                  >
                    <p className="font-semibold">Campus pickup</p>
                    <p className="text-sm text-gray-400">Free — we&apos;ll arrange a pickup point on WhatsApp</p>
                  </button>
                  <button
                    type="button"
                    onClick={() => setDeliveryMethod('delivery')}
                    className={`p-4 rounded-lg border text-left transition-colors ${
                      deliveryMethod === 'delivery'
                        ? 'border-ct-accent-blue bg-ct-accent-blue/10'
                        : 'border-ct-accent-blue/30 hover:border-ct-accent-blue/60'
                    }`}
                  >
                    <p className="font-semibold">Delivery in Bloemfontein</p>
                    <p className="text-sm text-gray-400">R{DELIVERY_FEE} — same-day where possible</p>
                  </button>
                </div>
              </div>

              {deliveryMethod === 'delivery' && (
                <div>
                  <label className="block text-sm text-gray-400 mb-2">Delivery address *</label>
                  <textarea
                    value={address}
                    onChange={e => setAddress(e.target.value)}
                    rows={2}
                    className="w-full bg-ct-card-bg border border-ct-accent-blue/30 rounded-lg px-4 py-3 focus:outline-none focus:border-ct-accent-blue"
                    placeholder="Res name, room / flat, street..."
                  />
                </div>
              )}

              <div>
                <label className="block text-sm text-gray-400 mb-2">Notes (optional)</label>
                <textarea
                  value={notes}
                  onChange={e => setNotes(e.target.value)}
                  rows={2}
                  className="w-full bg-ct-card-bg border border-ct-accent-blue/30 rounded-lg px-4 py-3 focus:outline-none focus:border-ct-accent-blue"
                  placeholder="Anything we should know?"
                />
              </div>

              <p className="text-sm text-gray-400">
                Payment is finalised on WhatsApp — cash on delivery or EFT. No card details needed here.
              </p>
            </div>

            {/* Summary */}
            <div className="glass-dark rounded-xl p-6 h-fit space-y-4">
              <h2 className="text-xl font-bold">Your Order</h2>
              <div className="space-y-2 max-h-64 overflow-y-auto">
                {items.map(i => (
                  <div key={i.id} className="flex justify-between text-sm text-gray-300 gap-4">
                    <span className="line-clamp-1">{i.quantity}× {i.name}</span>
                    <span className="flex-shrink-0">R{i.price * i.quantity}</span>
                  </div>
                ))}
              </div>
              <div className="border-t border-ct-accent-blue/20 pt-4 space-y-2">
                <div className="flex justify-between text-gray-300">
                  <span>Subtotal</span>
                  <span>R{subtotal}</span>
                </div>
                <div className="flex justify-between text-gray-300">
                  <span>Delivery</span>
                  <span>{deliveryFee > 0 ? `R${deliveryFee}` : 'Free'}</span>
                </div>
                <div className="flex justify-between font-bold text-lg">
                  <span>Total</span>
                  <span className="text-ct-accent-cyan">R{total}</span>
                </div>
              </div>
              <button
                onClick={placeOrder}
                disabled={!canSubmit}
                className="btn-primary w-full flex items-center justify-center gap-2 disabled:opacity-40 disabled:cursor-not-allowed"
              >
                <MessageCircle className="w-5 h-5" />
                Place Order via WhatsApp
              </button>
              <p className="text-xs text-gray-500 text-center">
                Opens WhatsApp with your order pre-filled — just press send.
              </p>
            </div>
          </div>
        )}
      </div>
    </main>
  )
}
