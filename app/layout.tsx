import type { Metadata } from 'next'
import { Alegreya, Outfit } from 'next/font/google'
import './globals.css'

const fontSans = Outfit({
  subsets: ['latin'],
  display: 'swap',
  weight: 'variable',
  style: ['normal'],
  variable: '--font-sans',
})

const fontSerif = Alegreya({
  subsets: ['latin'],
  display: 'swap',
  weight: 'variable',
  style: ['normal', 'italic'],
  variable: '--font-serif',
})

export const metadata: Metadata = {
  title: 'Ditch My Rent',
  description:
    'Learn about the tools and resources available to help you ditch your rent.',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang='en'>
      <body
        className={`${fontSans.variable} ${fontSerif.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  )
}
