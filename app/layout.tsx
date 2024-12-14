import type { Metadata } from 'next'
import { Analytics } from '@vercel/analytics/react'
import { Crimson_Pro, Outfit } from 'next/font/google'
import './globals.css'
import Header from '@/components/Header'

const outfit = Outfit({
  subsets: ['latin'],
  display: 'swap',
  weight: 'variable',
  style: ['normal'],
  variable: '--font-outfit',
})

const crimsonPro = Crimson_Pro({
  subsets: ['latin'],
  display: 'swap',
  weight: 'variable',
  style: ['normal', 'italic'],
  variable: '--font-crimson-pro',
})

export const metadata: Metadata = {
  title: 'Ditch My Rent',
  description:
    'Learn about the tools and resources available to help you ditch your rent.',
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang='en'>
      <body className={`${outfit.variable} ${crimsonPro.variable} antialiased`}>
        <Header />
        {children}
        <footer></footer>
        <Analytics />
      </body>
    </html>
  )
}
