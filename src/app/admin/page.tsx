'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { BarChart3, Package, ShoppingBag, AlertTriangle } from 'lucide-react'
import { supabase } from '@/lib/supabase'

export default function AdminDashboard() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [password, setPassword] = useState('')
  const [stats, setStats] = useState({
    totalOrders: 0,
    revenue: 0,
    lowStockCount: 0,
    productsCount: 0,
  })

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    // Simple auth - replace with proper implementation
    if (password === process.env.NEXT_PUBLIC_ADMIN_PASSWORD || password === 'admin123') {
      setIsAuthenticated(true)
      setPassword('')
    }
  }

  useEffect(() => {
    if (!isAuthenticated) return

    const fetchStats = async () => {
      try {
        const [ordersRes, productsRes] = await Promise.all([
          supabase.from('orders').select('*'),
          supabase.from('products').select('*'),
        ])

        const lowStock = (productsRes.data || []).filter(p => p.stock_quantity <= 5)
        const revenue = (ordersRes.data || []).reduce((sum, order) => sum + order.total, 0)

        setStats({
          totalOrders: (ordersRes.data || []).length,
          revenue,
          lowStockCount: lowStock.length,
          productsCount: (productsRes.data || []).length,
        })
      } catch (error) {
        console.error('Error fetching stats:', error)
      }
    }

    fetchStats()
    const interval = setInterval(fetchStats, 30000) // Refresh every 30s
    return () => clearInterval(interval)
  }, [isAuthenticated])

  if (!isAuthenticated) {
    return (
      <main className="min-h-screen bg-ct-darker flex items-center justify-center pt-20">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="glass-dark rounded-xl p-8 max-w-md w-full mx-4"
        >
          <h1 className="heading-md mb-6">Admin Login</h1>
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-sm font-semibold mb-2">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 rounded-lg bg-ct-darker border border-ct-accent-blue/30 text-white focus:outline-none focus:border-ct-accent-cyan"
                placeholder="Enter admin password"
              />
            </div>
            <button type="submit" className="btn-primary w-full">
              Login
            </button>
          </form>
        </motion.div>
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
          <h1 className="heading-lg gradient-text mb-2">Admin Dashboard</h1>
          <p className="text-gray-400">Welcome back. Here's your store overview.</p>
        </motion.div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {[
            { icon: ShoppingBag, label: 'Total Orders', value: stats.totalOrders },
            { icon: BarChart3, label: 'Revenue (ZAR)', value: `R${stats.revenue.toLocaleString()}` },
            { icon: Package, label: 'Products', value: stats.productsCount },
            { icon: AlertTriangle, label: 'Low Stock', value: stats.lowStockCount },
          ].map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="card-glass"
            >
              <stat.icon className="w-8 h-8 text-ct-accent-cyan mb-4" />
              <p className="text-gray-400 text-sm">{stat.label}</p>
              <p className="heading-sm mt-2">{stat.value}</p>
            </motion.div>
          ))}
        </div>

        {/* Admin Navigation */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="glass-dark rounded-xl p-8"
        >
          <h2 className="heading-sm mb-6">Admin Tools</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <a href="#products" className="btn-primary">
              Manage Products
            </a>
            <a href="#orders" className="btn-primary">
              View Orders
            </a>
            <a href="#categories" className="btn-secondary">
              Manage Categories
            </a>
            <a href="#settings" className="btn-secondary">
              Site Settings
            </a>
          </div>
        </motion.div>

        {/* Placeholder sections */}
        <div className="mt-12 space-y-8">
          {['Products Manager', 'Orders', 'Categories', 'Settings'].map((section) => (
            <motion.div
              key={section}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="glass-dark rounded-xl p-8"
            >
              <h3 className="heading-sm mb-4">{section}</h3>
              <p className="text-gray-400">Coming soon - detailed {section.toLowerCase()} interface</p>
            </motion.div>
          ))}
        </div>
      </div>
    </main>
  )
}