# Campus Tech Automation Workflows

This document explains how to set up real-world automations for your Campus Tech store.

## Overview

Campus Tech includes these automated workflows:

1. **New Order Notification** - You get notified when someone places an order
2. **Order Status Updates** - Customer gets WhatsApp when order status changes
3. **Low Stock Alerts** - Daily check for products running low
4. **Abandoned Cart Recovery** - Gentle reminder if customer leaves items in cart

## 🔐 Required API Keys

Get these from their respective platforms:

### 1. Meta WhatsApp Business API
**What it does**: Send WhatsApp messages to customers and yourself

**Get API key**:
1. Go to [business.facebook.com](https://business.facebook.com)
2. Create or use existing Business Account
3. Go to App Dashboard → Apps → Your App → WhatsApp
4. Navigate to API Setup
5. Copy your **Phone Number ID** and **Access Token**
6. Add to `.env.local`:
   ```
   WHATSAPP_BUSINESS_API_TOKEN=your_token_here
   WHATSAPP_BUSINESS_PHONE_ID=your_phone_id_here
   ```

### 2. Resend Email API
**What it does**: Send email alerts (low stock, order summaries)

**Get API key**:
1. Go to [resend.com](https://resend.com)
2. Sign up for free account
3. Go to API Keys
4. Create new key
5. Add to `.env.local`:
   ```
   RESEND_API_KEY=re_xxxxxxxxxxxx
   ```

### 3. Google Gemini API
**What it does**: Generate realistic product images

**Get API key**:
1. Go to [aistudio.google.com](https://aistudio.google.com)
2. Click "Get API Key"
3. Select your project or create new one
4. Copy the API key
5. Add to `.env.local`:
   ```
   GEMINI_API_KEY=your_key_here
   ```

### 4. Anthropic Claude API
**What it does**: Generate premium product descriptions

**Get API key**:
1. Go to [console.anthropic.com](https://console.anthropic.com)
2. Sign up / Log in
3. Navigate to API keys
4. Create new key
5. Add to `.env.local`:
   ```
   ANTHROPIC_API_KEY=sk_xxxxxxxxxxxx
   ```

## 📧 Workflow Details

### Workflow 1: New Order Notification

**What happens**:
- Customer places order → You get WhatsApp + email notification
- Email shows order summary, customer details, total amount
- WhatsApp sends quick notification with order ID

**API Endpoint**:
```
POST /api/webhooks/order-notification
```

**Triggered by**: Supabase trigger on new order insert

**Setup**:
1. In Supabase, create a Postgres function that calls this webhook
2. Or use n8n/Make.com to watch for new orders

**Example n8n workflow**:
```
1. Supabase Trigger: New Row in 'orders'
2. HTTP Request: POST to /api/webhooks/order-notification
3. Send Email (Resend): Order summary
4. Send WhatsApp: Notification to your number
```

### Workflow 2: Order Status Update

**What happens**:
- You change order status in admin (e.g., "Processing" → "Out for Delivery")
- Customer automatically gets WhatsApp: "Your order is on the way! 🚀"

**API Endpoint**:
```
POST /api/webhooks/order-status-update
```

**Setup**:
1. Admin updates order status → Supabase trigger fires
2. Webhook sends WhatsApp to customer

**Example Messages**:
- New → "We've received your order! ✅ Expect delivery today."
- Processing → "Preparing your order... 📦"
- Out for Delivery → "Your package is on the way! 🚀"
- Completed → "Order delivered! Thanks for shopping Campus Tech. 🙌"

### Workflow 3: Low Stock Alerts

**What happens**:
- Daily at 9 AM, system checks inventory
- Any product with stock < threshold gets flagged
- You receive email + WhatsApp with list of products to restock

**API Endpoint**:
```
GET /api/cron/low-stock-alert
```

**Setup** (Vercel Cron):
1. Create `vercel.json` in project root:
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

2. Deploy to Vercel

**Customization**:
- Change threshold in Admin → Site Settings → Low Stock Threshold
- Default is 5 units
- Alerts only run if `low_stock_threshold` is set

### Workflow 4: Abandoned Cart Recovery

**What happens**:
- Customer adds items to cart but doesn't checkout
- After 2+ hours, they get friendly WhatsApp: "Missing something? Complete your order 👉 [link]"

**Note**: This requires capturing phone/email at cart or during browse.

**Setup**:
1. When customer adds to cart, capture phone number
2. Store in `cart_sessions` table
3. Daily cron job checks for carts untouched for 2+ hours
4. Sends WhatsApp reminder via Meta API

## 🔗 Setting Up n8n (Recommended)

n8n is **free and self-hosted**, perfect for Campus Tech.

**Install n8n**:
```bash
npm install n8n -g
n8n start
```

Access at `http://localhost:5678`

**Create a workflow**:

1. **New Order Workflow**
   - Trigger: Webhook (receive POST from your Campus Tech site)
   - Parse JSON from order
   - Send Resend email to admin
   - Send WhatsApp to +27684472974
   - Send WhatsApp to customer phone

2. **Low Stock Workflow**
   - Trigger: Cron (daily at 9 AM)
   - Query Supabase for low stock products
   - Format message
   - Send WhatsApp + email

## 📞 WhatsApp Message Templates

Meta requires pre-approved message templates.

**Create templates** at [business.facebook.com](https://business.facebook.com) → WhatsApp → Message Templates

**Recommended templates**:

```
Hi {{1}}, we've received your order! ✅
Order ID: {{2}}
Total: R{{3}}
Expect delivery today. Track here: {{4}}

---

Hi {{1}}, your order is out for delivery! 🚀
Driver info: {{2}}
ETA: {{3}}

---

Hi {{1}}, restock alert! 📦
Low stock: {{2}}
Current level: {{3}} units
```

## 🚨 Testing Automations

### Test New Order Notification
```bash
curl -X POST http://localhost:3000/api/webhooks/order-notification \
  -H "Content-Type: application/json" \
  -d '{"orderId": "test-order-123"}'
```

### Test Low Stock Alert
```bash
curl -X GET http://localhost:3000/api/cron/low-stock-alert \
  -H "Authorization: Bearer your_cron_secret"
```

## 🔒 Security Checklist

- [ ] Change `ADMIN_PASSWORD` from default
- [ ] Store all API keys in `.env.local` (never commit to GitHub)
- [ ] Use webhook signatures to verify requests (optional but recommended)
- [ ] Set rate limits on API endpoints
- [ ] Verify Cron Secret in environment
- [ ] Test with real orders before going live

## 📊 Monitoring Automations

**Check if automations ran**:
1. In Supabase, check `notifications` table
2. Look for `status: 'sent'` entries
3. Check timestamp to confirm when it ran

**Debug failed automations**:
1. Check `.env.local` has all required keys
2. Verify API key format (some services use `sk_`, `re_`, etc.)
3. Check Vercel logs: `vercel logs`
4. Check n8n execution history for errors

## 🆘 Troubleshooting

### WhatsApp not sending?
- Confirm token and phone ID are correct
- Verify number format: `+27` for South Africa
- Check recipient is opted in to receive messages
- Review Meta's sandbox/production settings

### Emails not arriving?
- Check Resend API key is valid
- Verify email address isn't in spam filter
- Confirm sender email is verified in Resend dashboard

### Cron job not running?
- Confirm `vercel.json` is in project root
- Check Vercel environment variables are set
- Review Vercel deployment logs
- Cron runs in **UTC** - adjust time accordingly

## 📚 Resources

- [Meta WhatsApp API Docs](https://developers.facebook.com/docs/whatsapp/cloud-api/)
- [Resend Email API](https://resend.com/docs)
- [n8n Docs](https://docs.n8n.io/)
- [Google Gemini API](https://ai.google.dev/)
- [Anthropic Claude API](https://www.anthropic.com/)
- [Supabase Triggers & Functions](https://supabase.com/docs/guides/database/webhooks)

---

**Automations set up? You're ready to scale Campus Tech!** 🚀
