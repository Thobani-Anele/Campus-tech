import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Campus Tech - Premium Tech Accessories for Students',
  description: 'Shop premium gadgets, headphones, smartwatches, and tech accessories at Campus Tech. Bloemfontein delivery, fair prices, quality guaranteed.',
  keywords: 'tech accessories, headphones, smartwatches, LED lighting, chargers, Bloemfontein, students',
  openGraph: {
    title: 'Campus Tech - Elevate Your Campus Tech Game',
    description: 'Premium gadgets. Fair prices. Campus delivery.',
    type: 'website',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Campus Tech',
    description: 'Premium tech accessories for university students',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body className={`${inter.className} bg-ct-darker text-white`}>
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  )
}
