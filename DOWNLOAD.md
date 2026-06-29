# 📦 How to Download Campus Tech

## Option 1: Download as ZIP (Easiest)

### Step 1: Go to GitHub
Visit: **https://github.com/Thobani-Anele/Campus-tech**

### Step 2: Click "Code" Button
Green button on the right side

### Step 3: Select "Download ZIP"
Wait for download to complete (~5-10 MB)

### Step 4: Extract the ZIP
- Right-click the ZIP file
- Select "Extract All" (Windows) or "Extract" (Mac)
- Choose where to save it

---

## Option 2: Clone with Git (If you have Git installed)

### Step 1: Open Terminal/Command Prompt

### Step 2: Run This Command
```bash
git clone https://github.com/Thobani-Anele/Campus-tech.git
cd campus-tech
```

That's it! The entire project is now on your computer.

---

## ✅ After Download/Clone

### Step 1: Open Terminal in the Folder
- **Windows**: Right-click folder → "Open in Terminal"
- **Mac**: Right-click folder → "Open in Terminal"
- **Linux**: Right-click folder → "Open Here" or `cd` to folder

### Step 2: Install Dependencies
```bash
npm install
```
Wait 2-3 minutes for npm to install all packages.

### Step 3: Start Development Server
```bash
npm run dev
```

You'll see:
```
  ▲ Next.js 14.0.0
  - Local:        http://localhost:3000
```

### Step 4: Open in Browser
Click the link or go to: **http://localhost:3000**

🎉 **Campus Tech is now running on your computer!**

---

## 📂 What You Get

After extraction, you'll have:

```
campus-tech/
├── src/                    ← All your code
│   ├── app/               ← Pages (Home, Shop, About, etc.)
│   ├── components/        ← Navbar, Footer
│   ├── lib/              ← Database & utilities
│   └── types/            ← TypeScript types
├── public/               ← Images & static files
├── package.json          ← Dependencies list
├── README.md             ← Full documentation
├── SETUP.md              ← Setup instructions
├── .env.example          ← Config template
├── tailwind.config.ts    ← Colors & theme
├── next.config.js        ← Next.js settings
└── node_modules/         ← Packages (created after npm install)
```

---

## 🎯 What to Do Next

### View All Pages
Click these links to explore:
- http://localhost:3000 - **Home**
- http://localhost:3000/shop - **Shop**
- http://localhost:3000/about - **About**
- http://localhost:3000/contact - **Contact**
- http://localhost:3000/admin - **Admin** (password: `admin123`)

### Customize Colors
Edit: `tailwind.config.ts`

Search for:
```
'ct-accent-blue': '#00d9ff',
'ct-accent-violet': '#b026ff',
```

Change the hex codes to your brand colors.

### Customize Text
Edit: `.env.local` (create it from `.env.example`)

Update:
```
ADMIN_EMAIL=your@email.com
ADMIN_WHATSAPP_NUMBER=+27XXXXXXXXXX
```

---

## 🆘 Common Issues

### "npm: command not found"
- You need Node.js installed
- Download from: https://nodejs.org/
- Install LTS version
- Restart terminal
- Try `npm install` again

### "Port 3000 already in use"
```bash
npm run dev -- -p 3001
```
Then go to: http://localhost:3001

### "Module not found" error
```bash
rm -rf node_modules
npm install
```

### Styles look broken
- Press Ctrl+Shift+R (or Cmd+Shift+R on Mac)
- Hard refresh your browser
- Wait 10 seconds for styles to rebuild

---

## 📋 System Requirements

- **Node.js**: 18+ (Download from nodejs.org)
- **npm**: Comes with Node.js
- **Browser**: Chrome, Firefox, Safari, Edge (any modern browser)
- **Space**: ~500MB for node_modules

---

## 🚀 Ready?

1. **Download ZIP** from GitHub
2. **Extract** it
3. **Open terminal** in folder
4. Run: `npm install`
5. Run: `npm run dev`
6. Open: http://localhost:3000

**That's it!** Your store is running! 🎉

---

## 📞 Commands Reference

```bash
# Install dependencies (first time only)
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Check TypeScript errors
npm run type-check

# Format code
npm run lint
```

---

## 💾 File Locations Cheat Sheet

| What | File |
|------|------|
| Home Page | `src/app/page.tsx` |
| Shop Page | `src/app/shop/page.tsx` |
| Colors & Theme | `tailwind.config.ts` |
| Settings | `.env.local` |
| Navigation | `src/components/Navbar.tsx` |
| Footer | `src/components/Footer.tsx` |
| Global Styles | `src/app/globals.css` |

---

## 🎨 Personalization Ideas

After getting it running:

1. **Change Logo**
   - Edit Navbar.tsx (line with "CT")

2. **Change Hero Text**
   - Edit src/app/page.tsx (line with "Elevate Your Campus Tech Game")

3. **Change Colors**
   - Edit tailwind.config.ts

4. **Add Your Own Products**
   - Later: connect Supabase database

5. **Change Contact Info**
   - Edit Footer.tsx or .env.local

---

## 🎓 Learning Resources

New to Next.js?
- https://nextjs.org/learn
- https://tailwindcss.com/docs

New to React?
- https://react.dev

New to TypeScript?
- https://www.typescriptlang.org/docs/

---

## ✨ You're All Set!

Everything works out of the box.

**Next step**: Download the ZIP → Extract → npm install → npm run dev

Enjoy building Campus Tech! 🚀
