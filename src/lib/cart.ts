// Client-side cart backed by localStorage, with a change event so the
// navbar badge and cart page stay in sync.
import { useEffect, useState } from 'react'
import type { Product } from '@/types'

export interface CartLine {
  id: string
  name: string
  slug: string
  price: number
  image_url: string
  quantity: number
}

const KEY = 'campus-tech-cart'
const EVENT = 'campus-tech-cart-updated'

export const DELIVERY_FEE = 50

export function getCart(): CartLine[] {
  if (typeof window === 'undefined') return []
  try {
    const parsed = JSON.parse(localStorage.getItem(KEY) || '[]')
    return Array.isArray(parsed) ? parsed : []
  } catch {
    return []
  }
}

function save(items: CartLine[]) {
  localStorage.setItem(KEY, JSON.stringify(items))
  window.dispatchEvent(new Event(EVENT))
}

export function addToCart(product: Pick<Product, 'id' | 'name' | 'slug' | 'price' | 'image_url'>, quantity = 1) {
  const items = getCart()
  const existing = items.find(i => i.id === product.id)
  if (existing) {
    existing.quantity += quantity
  } else {
    items.push({
      id: product.id,
      name: product.name,
      slug: product.slug,
      price: product.price,
      image_url: product.image_url,
      quantity,
    })
  }
  save(items)
}

export function updateQuantity(id: string, quantity: number) {
  if (quantity <= 0) return removeFromCart(id)
  save(getCart().map(i => (i.id === id ? { ...i, quantity } : i)))
}

export function removeFromCart(id: string) {
  save(getCart().filter(i => i.id !== id))
}

export function clearCart() {
  save([])
}

export function cartSubtotal(items: CartLine[]): number {
  return items.reduce((sum, i) => sum + i.price * i.quantity, 0)
}

export function cartItemCount(items: CartLine[]): number {
  return items.reduce((sum, i) => sum + i.quantity, 0)
}

export function useCart(): CartLine[] {
  const [items, setItems] = useState<CartLine[]>([])

  useEffect(() => {
    const sync = () => setItems(getCart())
    sync()
    window.addEventListener(EVENT, sync)
    window.addEventListener('storage', sync)
    return () => {
      window.removeEventListener(EVENT, sync)
      window.removeEventListener('storage', sync)
    }
  }, [])

  return items
}
