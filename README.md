# Campus Tech - Premium Tech E-Commerce Platform

🚀 A production-ready e-commerce platform for selling premium tech accessories to university students in Bloemfontein, South Africa.

Built with **Next.js 14** | **TypeScript** | **Tailwind CSS** | **Supabase** | **Framer Motion**

## 🌟 Features

### For Customers
- 🛍️ **Beautiful Product Showcase** - Dark mode, premium aesthetic with glass-morphism design
- 🔍 **Smart Filtering** - Filter by category, price range, stock status
- 📱 **Mobile-First** - Optimized for students browsing on their phones
- 🚀 **Fast Performance** - Optimized images, lazy loading, smooth animations
- 💳 **Multiple Payment Methods** - Paystack, Yoco, and cash on delivery
- 📍 **Campus Delivery** - Bloemfontein same-day delivery and campus pickup options
- 💬 **WhatsApp Integration** - Direct messaging support

### For Admins
- 📊 **Dashboard** - At-a-glance stats, orders, revenue, low-stock alerts
- ➕ **Product Management** - Add, edit, delete products with inline editing
- 🎨 **AI Product Photos** - Generate professional product images with Google Gemini
- ✍️ **AI Product Copy** - Auto-generate descriptions with Anthropic Claude
- 📦 **Order Management** - Track orders, update status, auto-send WhatsApp updates
- ⚙️ **Site Settings** - Manage delivery fees, stock thresholds, store hours, text content
- 🔔 **Automation** - Low-stock alerts, order notifications, abandoned cart recovery

## 🛠️ Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS + Framer Motion
- **Database**: Supabase (PostgreSQL)
- **Auth**: Supabase Auth
- **AI**: 
  - Google Gemini (image generation)
  - Anthropic Claude (text generation)
- **Email**: Resend
- **Payments**: Paystack / Yoco (stubs ready)
- **Hosting**: Vercel

## 📦 Getting Started

### Prerequisites
- Node.js 18+ and npm/yarn
- A Supabase account
- API keys for:
  - Google Gemini
  - Anthropic Claude
  - Resend
  - Meta WhatsApp Business API (optional)
  - Paystack/Yoco (optional)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/campus-tech.git
   cd campus-tech
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env.local
   ```
   
   Fill in your API keys in `.env.local`

4. **Set up Supabase**
   - Create a new project at [supabase.com](https://supabase.com)
   - Run the SQL schema from `src/lib/database.sql` in your Supabase SQL editor
   - Copy your project URL and keys to `.env.local`

5. **Start the development server**
   ```bash
   npm run dev
   ```

   Open [http://localhost:3000](http://localhost:3000)

## 📁 Project Structure

```
src/
├── app/
│   ├── page.tsx                 # Home page
│   ├── shop/page.tsx            # Product catalog
│   ├── product/[slug]/page.tsx  # Product details
│   ├── cart/page.tsx            # Shopping cart
│   ├── checkout/page.tsx        # Checkout
│   ├── about/page.tsx           # About page
│   ├── contact/page.tsx         # Contact page
│   ├── admin/page.tsx           # Admin dashboard
│   ├── api/
│   │   ├── ai/                  # AI generation endpoints
│   │   ├── webhooks/            # Webhook handlers
│   │   └── cron/                # Scheduled jobs
│   └── layout.tsx               # Root layout
├── components/
│   ├── Navbar.tsx               # Navigation
│   └── Footer.tsx               # Footer
├── lib/
│   ├── supabase.ts              # Supabase client
│   └── database.sql             # Database schema
├── types/
│   └── index.ts                 # TypeScript types
└── app/globals.css              # Global styles
```

## 🚀 Deployment

### Deploy to Vercel

1. **Push to GitHub**
   ```bash
   git push origin main
   ```

2. **Connect to Vercel**
   - Go to [vercel.com](https://vercel.com)
   - Import your GitHub repository
   - Add environment variables from `.env.local`
   - Click Deploy

3. **Set up Cron Jobs** (for low-stock alerts)
   - In `vercel.json` or dashboard, configure:
     ```json
     {
       "crons": [
         {
           "path": "/api/cron/low-stock-alert",
           "schedule": "0 9 * * *"
         }
       ]
     }
     ```

## 🔐 Admin Access

- Navigate to `/admin`
- Default password: `change_me_to_secure_password` (⚠️ Change this immediately!)
- Update in `.env.local` with `ADMIN_PASSWORD=your_secure_password`

## 📚 API Routes

### AI Generation
- `POST /api/ai/generate` - Generate product descriptions
- `POST /api/ai/image-generate` - Generate product images

### Automations
- `POST /api/webhooks/order-notification` - Order notifications
- `GET /api/cron/low-stock-alert` - Low stock check (daily)

## 🔔 Setting Up Automations

See `AUTOMATIONS.md` for detailed setup guides for:
- WhatsApp Business API notifications
- Resend email alerts
- n8n workflow integration
- Abandoned cart recovery

## 📊 Sample Data

The database seeds with 15 sample products across all categories:
- 3 Headphones
- 3 Smartwatches
- 3 LED Lighting
- 3 Chargers & Cables
- 3 Accessories

Add more via the admin dashboard.

## 🎨 Customization

### Colors & Branding
Edit `tailwind.config.ts` to customize:
- `ct-dark` / `ct-darker` - Background colors
- `ct-accent-blue` / `ct-accent-violet` - Primary accent colors
- `ct-accent-cyan` - Secondary accent color

### Site Content
Update via the admin dashboard or directly in `src/lib/database.sql`:
- Hero text
- About story
- Contact information
- Delivery settings

## 📝 License

MIT - Feel free to use this for your project!

## 💬 Support

For issues or questions:
- WhatsApp: +27 68 444 7297
- Email: support@campustech.co.za
- GitHub Issues: [Open an issue](https://github.com/yourusername/campus-tech/issues)

---

**Built with ❤️ for Campus Tech**
