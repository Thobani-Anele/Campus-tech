// Product types
export interface Product {
  id: string
  name: string
  slug: string
  category: string
  price: number
  original_price?: number
  description: string
  long_description: string
  image_url: string
  images?: string[]
  stock_quantity: number
  is_featured: boolean
  is_out_of_stock: boolean
  brand?: string
  specs?: Record<string, string>
  created_at: string
  updated_at: string
}

// Category types
export interface Category {
  id: string
  name: string
  slug: string
  image_url?: string
  description?: string
  created_at: string
}

// Cart types
export interface CartItem {
  product_id: string
  product: Product
  quantity: number
  added_at: string
}

export interface Cart {
  items: CartItem[]
  total: number
  item_count: number
}

// Order types
export interface Order {
  id: string
  customer_name: string
  customer_email: string
  customer_phone: string
  delivery_address: string
  campus_pickup_point?: string
  items: OrderItem[]
  subtotal: number
  delivery_fee: number
  promo_code_applied?: string
  discount_amount?: number
  total: number
  status: 'new' | 'processing' | 'out_for_delivery' | 'completed' | 'cancelled'
  payment_method: 'paystack' | 'yoco' | 'cash_on_delivery'
  payment_status: 'pending' | 'completed' | 'failed'
  notes?: string
  created_at: string
  updated_at: string
}

export interface OrderItem {
  product_id: string
  product_name: string
  quantity: number
  unit_price: number
  total_price: number
}

// Admin types
export interface AdminUser {
  id: string
  email: string
  created_at: string
  last_login?: string
}

// Settings types
export interface SiteSettings {
  delivery_fee: number
  low_stock_threshold: number
  store_open: boolean
  store_closed_message?: string
  admin_whatsapp_number: string
  admin_email: string
  hero_title: string
  hero_subtitle: string
  about_story: string
  contact_email: string
  contact_phone: string
  instagram_url?: string
  twitter_url?: string
}

// Notification types
export interface Notification {
  id: string
  type: 'low_stock' | 'new_order' | 'order_update'
  title: string
  message: string
  recipient_type: 'admin' | 'customer'
  recipient_contact: string
  created_at: string
  sent_at?: string
  status: 'pending' | 'sent' | 'failed'
}
