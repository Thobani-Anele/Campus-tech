'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { ShoppingCart, Share2, Heart, MessageCircle } from 'lucide-react'
import { supabase } from '@/lib/supabase'
import type { Product } from '@/types'

export default function ProductPage({ params }: { params: { slug: string } }) {
  const [product, setProduct] = useState<Product | null>(null)
  const [quantity, setQuantity] = useState(1)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const { data, error } = await supabase
          .from('products')
          .select('*')
          .eq('slug', params.slug)
          .single()

        if (error) throw error
        setProduct(data)
      } catch (error) {
        console.error('Error fetching product:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchProduct()
  }, [params.slug])

  if (loading) {
    return (
      <main className="min-h-screen bg-ct-darker pt-20">
        <div className="container-ct">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div className="aspect-square bg-ct-card-bg rounded-xl animate-pulse" />
            <div className="space-y-4">
              <div className="h-8 bg-ct-card-bg rounded animate-pulse" />
              <div className="h-4 bg-ct-card-bg rounded animate-pulse" />
            </div>
          </div>
        </div>
      </main>
    )
  }

  if (!product) {
    return (
      <main className="min-h-screen bg-ct-darker pt-20">
        <div className="container-ct text-center">
          <p className="text-gray-400">Product not found</p>
        </div>
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-ct-darker pt-20">
      <div className="container-ct">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-20">
          {/* Product Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
          >
            <div className="aspect-square relative rounded-xl overflow-hidden bg-ct-card-bg">
              {product.image_url && (
                <Image
                  src={product.image_url}
                  alt={product.name}
                  fill
                  className="object-cover"
                />
              )}
            </div>
          </motion.div>

          {/* Product Info */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <div>
              <h1 className="heading-lg mb-2">{product.name}</h1>
              {product.brand && (
                <p className="text-ct-accent-blue mb-6">{product.brand}</p>
              )}

              {/* Price */}
              <div className="mb-6">
                <p className="text-4xl font-bold text-ct-accent-cyan">
                  R{product.price}
                </p>
                {product.original_price && (
                  <p className="text-gray-400 line-through">
                    R{product.original_price}
                  </p>
                )}
              </div>

              {/* Stock Status */}
              <div className="mb-6">
                <p className={`text-sm font-semibold ${
                  product.stock_quantity > 0 ? 'text-green-400' : 'text-red-400'
                }`}>
                  {product.stock_quantity > 0 ? `${product.stock_quantity} in stock` : 'Out of stock'}
                </p>
              </div>

              {/* Description */}
              <p className="text-gray-300 mb-8">{product.description}</p>
              {product.long_description && (
                <p className="text-gray-400 text-sm mb-8">{product.long_description}</p>
              )}

              {/* Quantity & Add to Cart */}
              <div className="flex gap-4 mb-8">
                <div className="flex items-center gap-2 border border-ct-accent-blue/30 rounded-lg p-2">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="px-2 py-1 hover:bg-ct-accent-blue/20 rounded"
                  >
                    −
                  </button>
                  <span className="px-4">{quantity}</span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="px-2 py-1 hover:bg-ct-accent-blue/20 rounded"
                  >
                    +
                  </button>
                </div>
                <button className="flex-1 btn-primary flex items-center justify-center gap-2">
                  <ShoppingCart className="w-5 h-5" />
                  Add to Cart
                </button>
              </div>

              {/* WhatsApp Button */}
              <a
                href={`https://wa.me/27684472974?text=Hi! I'm interested in the ${product.name}`}
                className="btn-secondary w-full flex items-center justify-center gap-2 mb-6"
              >
                <MessageCircle className="w-5 h-5" />
                Ask on WhatsApp
              </a>

              {/* Share Buttons */}
              <div className="flex gap-2">
                <button className="flex-1 btn-secondary flex items-center justify-center gap-2">
                  <Share2 className="w-5 h-5" />
                  Share
                </button>
                <button className="flex-1 btn-secondary flex items-center justify-center gap-2">
                  <Heart className="w-5 h-5" />
                  Wishlist
                </button>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Specs Table */}
        {product.specs && Object.keys(product.specs).length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="glass-dark rounded-xl p-8 mb-20"
          >
            <h2 className="heading-sm mb-6">Specifications</h2>
            <div className="space-y-4">
              {Object.entries(product.specs).map(([key, value]) => (
                <div key={key} className="flex gap-4 pb-4 border-b border-ct-accent-blue/20 last:border-b-0">
                  <p className="font-semibold text-ct-accent-blue min-w-32">{key}</p>
                  <p className="text-gray-300">{value}</p>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </div>
    </main>
  )
}