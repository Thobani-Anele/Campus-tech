'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { ShoppingCart, Zap, Truck, Shield, Star } from 'lucide-react'
import { supabase } from '@/lib/supabase'
import type { Product, Category } from '@/types'

export default function Home() {
  const [products, setProducts] = useState<Product[]>([])
  const [categories, setCategories] = useState<Category[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [productsRes, categoriesRes] = await Promise.all([
          supabase.from('products').select('*').eq('is_featured', true).limit(6),
          supabase.from('categories').select('*'),
        ])
        setProducts(productsRes.data || [])
        setCategories(categoriesRes.data || [])
      } catch (error) {
        console.error('Error fetching data:', error)
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [])

  return (
    <main className="min-h-screen bg-ct-darker">
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden pt-20">
        <div className="absolute inset-0 bg-gradient-to-br from-ct-accent-blue/10 via-transparent to-ct-accent-violet/10" />
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-ct-accent-blue/20 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-ct-accent-violet/20 rounded-full blur-3xl" />

        <div className="container-ct relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-3xl mx-auto text-center"
          >
            <h1 className="heading-lg gradient-text mb-6">
              Elevate Your Campus Tech Game
            </h1>
            <p className="text-xl text-gray-300 mb-8">
              Premium gadgets, fair prices, campus delivery. Experience tech like never before.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/shop" className="btn-primary">
                Shop Now
              </Link>
              <Link href="/about" className="btn-secondary">
                Learn More
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Trust Badges */}
      <section className="py-12 border-y border-ct-accent-blue/20">
        <div className="container-ct">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              { icon: Truck, title: 'Same-Day Delivery', desc: 'Bloemfontein' },
              { icon: Shield, title: '100% Secure', desc: 'Payment protected' },
              { icon: Zap, title: 'Premium Quality', desc: 'Warranty included' },
              { icon: Star, title: 'Student Trusted', desc: '1000+ Happy Students' },
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <div className="flex justify-center mb-4">
                  <item.icon className="w-8 h-8 text-ct-accent-cyan" />
                </div>
                <h3 className="font-semibold mb-2">{item.title}</h3>
                <p className="text-gray-400 text-sm">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="section-padding">
        <div className="container-ct">
          <h2 className="heading-md mb-12 text-center">Shop by Category</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
            {categories.map((cat, i) => (
              <motion.div
                key={cat.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <Link href={`/shop?category=${cat.slug}`} className="group">
                  <div className="card-glass aspect-square flex items-center justify-center relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-br from-ct-accent-blue/20 to-ct-accent-violet/20 group-hover:from-ct-accent-blue/40 group-hover:to-ct-accent-violet/40 transition-all duration-300" />
                    <span className="relative text-center">
                      <p className="font-semibold text-lg">{cat.name}</p>
                    </span>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="section-padding">
        <div className="container-ct">
          <h2 className="heading-md mb-12 text-center">Featured Products</h2>
          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="card-glass aspect-square animate-pulse" />
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {products.map((product, i) => (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                >
                  <Link href={`/product/${product.slug}`}>
                    <div className="card-glass group cursor-pointer h-full flex flex-col">
                      <div className="relative overflow-hidden rounded-lg mb-4 aspect-square bg-ct-card-bg">
                        {product.image_url && (
                          <Image
                            src={product.image_url}
                            alt={product.name}
                            fill
                            className="object-cover group-hover:scale-110 transition-transform duration-300"
                          />
                        )}
                      </div>
                      <h3 className="font-semibold mb-2 line-clamp-2">{product.name}</h3>
                      <p className="text-gray-400 text-sm mb-4 flex-grow line-clamp-2">{product.description}</p>
                      <div className="flex items-center justify-between">
                        <span className="text-ct-accent-cyan font-bold">R{product.price}</span>
                        <button className="p-2 bg-ct-accent-blue/20 hover:bg-ct-accent-blue/40 rounded-lg transition-colors">
                          <ShoppingCart className="w-4 h-4 text-ct-accent-blue" />
                        </button>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          )}
          <div className="text-center mt-12">
            <Link href="/shop" className="btn-primary">
              View All Products
            </Link>
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="section-padding">
        <div className="container-ct">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="glass-dark rounded-xl p-12 text-center max-w-2xl mx-auto"
          >
            <h2 className="heading-sm mb-4">Stay Updated</h2>
            <p className="text-gray-300 mb-8">
              Get early access to new products, exclusive deals, and campus delivery updates.
            </p>
            <form className="flex flex-col sm:flex-row gap-2">
              <input
                type="email"
                placeholder="Your email"
                className="flex-1 px-4 py-3 rounded-lg bg-ct-darker border border-ct-accent-blue/30 text-white placeholder-gray-500 focus:outline-none focus:border-ct-accent-cyan"
              />
              <button className="btn-primary">
                Subscribe
              </button>
            </form>
          </motion.div>
        </div>
      </section>
    </main>
  )
}