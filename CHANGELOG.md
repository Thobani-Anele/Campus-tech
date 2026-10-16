# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.0.0] - 2026-10-16

First stable release of Campus Tech — a production-ready e-commerce platform for
selling premium tech accessories to university students in Bloemfontein, South Africa.

### Added

- **Customer storefront**: product catalog with smart filtering (category, price,
  stock status), product detail pages, shopping cart, and checkout
- **Admin dashboard**: revenue and order stats, low-stock alerts, product
  management (add/edit/delete with inline editing), order management, and site
  settings (delivery fees, stock thresholds, store hours, content)
- **AI tooling**: product copy generation with Anthropic Claude and product image
  generation with Google Gemini via API routes
- **Payments**: Paystack and Yoco integration stubs, plus cash on delivery
- **Automations**: WhatsApp order status notifications, daily low-stock alerts,
  and abandoned cart recovery (see AUTOMATIONS.md)
- **Database**: Supabase (PostgreSQL) schema and migrations with 15 seeded sample
  products across all categories
- **UI/UX**: dark-mode glass-morphism design with Tailwind CSS and Framer Motion,
  mobile-first and optimized images
- **Docs**: README, SETUP.md, DOWNLOAD.md, and AUTOMATIONS.md setup guides

### Tech stack

Next.js 14 (App Router) · TypeScript · Tailwind CSS · Supabase · Framer Motion

[1.0.0]: https://github.com/Thobani-Anele/Campus-tech/releases/tag/v1.0.0
