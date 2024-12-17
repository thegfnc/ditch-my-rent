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
  title: "Finding Ways To Unburden America's Renters | Ditch My Rent",
  description:
    "Half of Americans are paying too much for rent and don't even know it. We're tackling the housing crisis by empowering renters to reclaim the American Dream.",
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
        <Script id='microsoft-clarity'>
          {`
            (function(c,l,a,r,i,t,y){
              c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
              t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
              y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
            })(window, document, "clarity", "script", "peovvps3vg");
          `}
        </Script>
      </body>
    </html>
  )
}
