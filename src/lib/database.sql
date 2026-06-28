-- Campus Tech Database Schema

-- Categories table
CREATE TABLE IF NOT EXISTS categories (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(255) NOT NULL UNIQUE,
  slug VARCHAR(255) NOT NULL UNIQUE,
  image_url TEXT,
  description TEXT,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Products table
CREATE TABLE IF NOT EXISTS products (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(255) NOT NULL,
  slug VARCHAR(255) NOT NULL UNIQUE,
  category_id UUID REFERENCES categories(id) ON DELETE SET NULL,
  price DECIMAL(10, 2) NOT NULL,
  original_price DECIMAL(10, 2),
  description TEXT NOT NULL,
  long_description TEXT,
  image_url TEXT NOT NULL,
  images TEXT[] DEFAULT '{}',
  stock_quantity INTEGER NOT NULL DEFAULT 0,
  is_featured BOOLEAN DEFAULT FALSE,
  is_out_of_stock BOOLEAN DEFAULT FALSE,
  brand VARCHAR(255),
  specs JSONB,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Orders table
CREATE TABLE IF NOT EXISTS orders (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  customer_name VARCHAR(255) NOT NULL,
  customer_email VARCHAR(255) NOT NULL,
  customer_phone VARCHAR(20) NOT NULL,
  delivery_address TEXT NOT NULL,
  campus_pickup_point VARCHAR(255),
  subtotal DECIMAL(10, 2) NOT NULL,
  delivery_fee DECIMAL(10, 2) DEFAULT 0,
  promo_code_applied VARCHAR(255),
  discount_amount DECIMAL(10, 2) DEFAULT 0,
  total DECIMAL(10, 2) NOT NULL,
  status VARCHAR(50) DEFAULT 'new', -- new, processing, out_for_delivery, completed, cancelled
  payment_method VARCHAR(50), -- paystack, yoco, cash_on_delivery
  payment_status VARCHAR(50) DEFAULT 'pending', -- pending, completed, failed
  notes TEXT,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Order items table
CREATE TABLE IF NOT EXISTS order_items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  order_id UUID NOT NULL REFERENCES orders(id) ON DELETE CASCADE,
  product_id UUID NOT NULL REFERENCES products(id),
  product_name VARCHAR(255) NOT NULL,
  quantity INTEGER NOT NULL,
  unit_price DECIMAL(10, 2) NOT NULL,
  total_price DECIMAL(10, 2) NOT NULL,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Site settings table
CREATE TABLE IF NOT EXISTS site_settings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  key VARCHAR(255) NOT NULL UNIQUE,
  value TEXT NOT NULL,
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Notifications table (for tracking sent notifications)
CREATE TABLE IF NOT EXISTS notifications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  type VARCHAR(50) NOT NULL, -- low_stock, new_order, order_update
  title VARCHAR(255) NOT NULL,
  message TEXT NOT NULL,
  recipient_type VARCHAR(50), -- admin, customer
  recipient_contact VARCHAR(255),
  order_id UUID REFERENCES orders(id) ON DELETE SET NULL,
  created_at TIMESTAMP DEFAULT NOW(),
  sent_at TIMESTAMP,
  status VARCHAR(50) DEFAULT 'pending' -- pending, sent, failed
);

-- Cart sessions table (for abandoned cart recovery)
CREATE TABLE IF NOT EXISTS cart_sessions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  customer_phone VARCHAR(20),
  customer_email VARCHAR(255),
  cart_items JSONB NOT NULL,
  created_at TIMESTAMP DEFAULT NOW(),
  last_updated TIMESTAMP DEFAULT NOW(),
  reminded BOOLEAN DEFAULT FALSE,
  reminder_sent_at TIMESTAMP
);

-- Insert default categories
INSERT INTO categories (name, slug, description) VALUES
  ('Headphones', 'headphones', 'Premium wireless and wired headphones for immersive audio'),
  ('Smartwatches', 'smartwatches', 'Connected smartwatches with fitness tracking and notifications'),
  ('LED Lighting & Decor', 'led-lighting', 'Modern LED strips, neon signs, and ambient lighting'),
  ('Chargers & Cables', 'chargers-cables', 'Fast chargers, USB-C cables, and power banks'),
  ('Accessories', 'accessories', 'Phone stands, cases, screen protectors, and more')
ON CONFLICT (slug) DO NOTHING;

-- Insert default site settings
INSERT INTO site_settings (key, value) VALUES
  ('delivery_fee', '50'),
  ('low_stock_threshold', '5'),
  ('store_open', 'true'),
  ('admin_whatsapp_number', '+27684472974'),
  ('admin_email', 'thobani.mbatha23@gmail.com'),
  ('hero_title', 'Elevate Your Campus Tech Game'),
  ('hero_subtitle', 'Premium gadgets. Fair prices. Campus delivery.'),
  ('about_story', 'Campus Tech was founded to bring premium tech accessories to university students in Bloemfontein. We believe great tech shouldnt break the bank.'),
  ('contact_email', 'support@campustech.co.za'),
  ('contact_phone', '+27684472974')
ON CONFLICT (key) DO NOTHING;

-- Create indexes for performance
CREATE INDEX IF NOT EXISTS idx_products_category ON products(category_id);
CREATE INDEX IF NOT EXISTS idx_products_slug ON products(slug);
CREATE INDEX IF NOT EXISTS idx_products_featured ON products(is_featured);
CREATE INDEX IF NOT EXISTS idx_orders_customer_email ON orders(customer_email);
CREATE INDEX IF NOT EXISTS idx_orders_status ON orders(status);
CREATE INDEX IF NOT EXISTS idx_orders_created_at ON orders(created_at);
CREATE INDEX IF NOT EXISTS idx_order_items_order_id ON order_items(order_id);
CREATE INDEX IF NOT EXISTS idx_notifications_created_at ON notifications(created_at);

-- Enable RLS (Row Level Security) for public read access
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE categories ENABLE ROW LEVEL SECURITY;

-- Public can read products
CREATE POLICY "Allow public read" ON products FOR SELECT USING (TRUE);
CREATE POLICY "Allow public read" ON categories FOR SELECT USING (TRUE);
