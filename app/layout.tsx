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

export async function generateMetadata(): Promise<Metadata> {
  const pathname = '/'

  return {
    title: {
      template: '%s | Ditch My Rent',
      default: "Finding Ways To Unburden America's Renters | Ditch My Rent",
    },
    description:
      "Half of Americans are paying too much for rent and don't even know it. We're tackling the housing crisis by empowering renters to reclaim the American Dream.",
    referrer: 'origin-when-cross-origin',
    keywords: [
      // Primary Keywords
      'Rent affordability',
      'Housing cost solutions',
      'Affordable housing',
      'Rent burden',
      'Housing affordability calculator',
      'Rent reduction strategies',
      'Housing crisis solutions',

      // Long-Tail Keywords
      'How to reduce monthly rent',
      'Ways to lower housing expenses',
      'Affordable housing options in America',
      'Rent-to-income ratio calculator',
      'Escape high rent costs',
      'Alternative housing solutions',
      'Budget-friendly living strategies',

      // Location-Based Keywords
      'Affordable housing near me',
      'Rent prices in US cities',
      'Low-cost housing options',

      // Problem-Focused Keywords
      'Rent burden statistics',
      'Housing affordability crisis',
      'Overpaying for rent',
      'Rent cost management',
      'Income-to-rent ratio help',

      // Solution-Oriented Keywords
      'Housing cost optimization',
      'Rent reduction techniques',
      'Affordable living strategies',
      'Housing financial freedom',
      'Creative housing solutions',

      // Audience-Targeted Keywords
      'Millennial housing struggles',
      'Young professional rent help',
      'First-time renter advice',
      'Low-income housing support',
      'Rent relief strategies',

      // Technical/Tool Keywords
      'Rent calculator',
      'Housing cost analyzer',
      'Rent burden assessment',
      'Budget planning for housing',
      'Rent optimization tools',
    ],
    creator: 'Ditch My Rent',
    metadataBase: new URL('https://ditchmyrent.com'),
    alternates: {
      canonical: pathname,
    },
    openGraph: {
      url: pathname,
      type: 'website',
      locale: 'en_US',
    },
  }
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
