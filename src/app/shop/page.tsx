'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { Filter, ShoppingCart, ChevronDown } from 'lucide-react'
import { supabase } from '@/lib/supabase'
import type { Product, Category } from '@/types'

export default function Shop() {
  const [products, setProducts] = useState<Product[]>([])
  const [categories, setCategories] = useState<Category[]>([])
  const [selectedCategory, setSelectedCategory] = useState('')
  const [priceRange, setPriceRange] = useState([0, 5000])
  const [sortBy, setSortBy] = useState('newest')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      try {
        let query = supabase.from('products').select('*').eq('is_out_of_stock', false)

        if (selectedCategory) {
          const category = categories.find(c => c.slug === selectedCategory)
          if (category) {
            query = query.eq('category_id', category.id)
          }
        }

        query = query.gte('price', priceRange[0]).lte('price', priceRange[1])

        const { data, error } = await query
        if (error) throw error

        let sorted = data || []
        if (sortBy === 'price-low') sorted.sort((a, b) => a.price - b.price)
        if (sortBy === 'price-high') sorted.sort((a, b) => b.price - a.price)
        if (sortBy === 'newest') sorted.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())

        setProducts(sorted)
      } catch (error) {
        console.error('Error fetching products:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [selectedCategory, priceRange, sortBy, categories])

  useEffect(() => {
    const fetchCategories = async () => {
      const { data } = await supabase.from('categories').select('*')
      setCategories(data || [])
    }
    fetchCategories()
  }, [])

  return (
    <main className="min-h-screen bg-ct-darker pt-20">
      <div className="container-ct">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12"
        >
          <h1 className="heading-lg gradient-text mb-4">Shop Our Products</h1>
          <p className="text-gray-400">Premium tech accessories for university students</p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Filters Sidebar */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="lg:col-span-1"
          >
            <div className="glass-dark rounded-xl p-6">
              <h2 className="heading-sm mb-6 flex items-center gap-2">
                <Filter className="w-5 h-5" /> Filters
              </h2>

              {/* Category Filter */}
              <div className="mb-8">
                <h3 className="font-semibold mb-4 text-ct-accent-blue">Category</h3>
                <div className="space-y-2">
                  <button
                    onClick={() => setSelectedCategory('')}
                    className={`block w-full text-left px-3 py-2 rounded-lg transition-colors ${
                      selectedCategory === '' ? 'bg-ct-accent-blue/20 text-ct-accent-blue' : 'hover:bg-ct-card-bg'
                    }`}
                  >
                    All Categories
                  </button>
                  {categories.map(cat => (
                    <button
                      key={cat.id}
                      onClick={() => setSelectedCategory(cat.slug)}
                      className={`block w-full text-left px-3 py-2 rounded-lg transition-colors ${
                        selectedCategory === cat.slug ? 'bg-ct-accent-blue/20 text-ct-accent-blue' : 'hover:bg-ct-card-bg'
                      }`}
                    >
                      {cat.name}
                    </button>
                  ))}
                </div>
              </div>

              {/* Price Filter */}
              <div className="mb-8">
                <h3 className="font-semibold mb-4 text-ct-accent-blue">Price Range</h3>
                <div className="space-y-2">
                  <input
                    type="range"
                    min="0"
                    max="5000"
                    value={priceRange[0]}
                    onChange={(e) => setPriceRange([parseInt(e.target.value), priceRange[1]])}
                    className="w-full"
                  />
                  <input
                    type="range"
                    min="0"
                    max="5000"
                    value={priceRange[1]}
                    onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
                    className="w-full"
                  />
                  <p className="text-sm text-gray-400 mt-2">
                    R{priceRange[0]} - R{priceRange[1]}
                  </p>
                </div>
              </div>

              {/* Sort */}
              <div className="mb-8">
                <h3 className="font-semibold mb-4 text-ct-accent-blue">Sort By</h3>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg bg-ct-card-bg border border-ct-accent-blue/30 text-white focus:outline-none focus:border-ct-accent-cyan"
                >
                  <option value="newest">Newest</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                </select>
              </div>
            </div>
          </motion.div>

          {/* Products Grid */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="lg:col-span-3"
          >
            {loading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {[...Array(8)].map((_, i) => (
                  <div key={i} className="card-glass aspect-square animate-pulse rounded-xl" />
                ))}
              </div>
            ) : products.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-gray-400 mb-4">No products found matching your filters</p>
                <button
                  onClick={() => {
                    setSelectedCategory('')
                    setPriceRange([0, 5000])
                  }}
                  className="btn-primary"
                >
                  Clear Filters
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {products.map((product, i) => (
                  <motion.div
                    key={product.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.05 }}
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
                          <div>
                            <span className="text-ct-accent-cyan font-bold">R{product.price}</span>
                            {product.original_price && (
                              <span className="ml-2 text-sm text-gray-400 line-through">R{product.original_price}</span>
                            )}
                          </div>
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
          </motion.div>
        </div>
      </div>
    </main>
  )
}