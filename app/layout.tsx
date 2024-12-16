import type { Metadata } from 'next'
import { Analytics } from '@vercel/analytics/react'
import { Libre_Baskerville, Outfit } from 'next/font/google'
import './globals.css'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import Script from 'next/script'

const outfit = Outfit({
  subsets: ['latin'],
  display: 'swap',
  weight: 'variable',
  style: ['normal'],
  variable: '--font-outfit',
})

const libreBaskerville = Libre_Baskerville({
  subsets: ['latin'],
  display: 'swap',
  weight: ['400', '700'],
  style: ['normal', 'italic'],
  variable: '--font-libre-baskerville',
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
      <body
        className={`${outfit.variable} ${libreBaskerville.variable} antialiased`}
      >
        <Header />
        {children}
        <Footer />
        <Analytics />
        <Script src='https://www.googletagmanager.com/gtag/js?id=G-WSJDKKNT29' />
        <Script id='google-analytics'>
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());

            gtag('config', 'G-WSJDKKNT29');
          `}
        </Script>
      </body>
    </html>
  )
}
