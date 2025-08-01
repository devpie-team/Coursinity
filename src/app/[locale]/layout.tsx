import type { Metadata } from 'next'
import { Poppins } from 'next/font/google'
import localFont from 'next/font/local'
import './globals.css'
import { Theme } from '@radix-ui/themes'
import { NextIntlClientProvider, hasLocale } from 'next-intl'
import { notFound } from 'next/navigation'
import { routing } from '@/i18n/routing'
import { HeaderVisibilityProvider } from '@/components/Header/HeaderVisibilityContext'
import { JsonLdSchema } from '@/components/JsonLdSchema'

import SmoothScrollProvider from '@/components/SmoothScrollProvider'

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-poppins'
})

const kanunAR = localFont({
  src: [
    {
      path: '../../fonts/KanunAR-Regular.otf',
      weight: '400',
      style: 'normal'
    },
    {
      path: '../../fonts/KanunAR-Medium.otf',
      weight: '500',
      style: 'medium'
    },
    {
      path: '../../fonts/KanunAR-Bold.otf',
      weight: '700',
      style: 'bold'
    }
  ],
  variable: '--font-kanun-ar'
})

export const metadata: Metadata = {
  metadataBase: new URL('https://www.coursinity.com'),
  icons: {
    icon: '/assets/favicon.png',
    apple: '/assets/favicon.png'
  },
  title: {
    template: '%s | Coursinity',
    default: 'Coursinity - Corporate Training in Saudi Arabia'
  },
  description:
    'Coursinity provides customized corporate training programs for businesses and government organizations in Saudi Arabia. Leadership, digital transformation, and soft skills training tailored to Vision 2030.',
  keywords: [
    'corporate training',
    'Saudi Arabia',
    'leadership training',
    'digital transformation',
    'Vision 2030',
    'government training'
  ],
  authors: [{ name: 'Coursinity' }],
  creator: 'Coursinity',
  publisher: 'Coursinity',
  formatDetection: {
    email: false,
    address: false,
    telephone: false
  },

  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://www.coursinity.com',
    title: 'Coursinity - Corporate Training in Saudi Arabia',
    description:
      'Coursinity provides customized corporate training programs for businesses and government organizations in Saudi Arabia.',
    siteName: 'Coursinity',
    images: [
      {
        url: '/assets/favicon.png',
        width: 1200,
        height: 630,
        alt: 'Coursinity Logo'
      }
    ]
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Coursinity - Corporate Training in Saudi Arabia',
    description:
      'Coursinity provides customized corporate training programs for businesses and government organizations in Saudi Arabia.',
    images: ['/assets/favicon.png']
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1
    }
  },
  verification: {
    google: '0uSSTBokSb6aR_Ysvt8_eMuZOnXkELumyfoCsQusOpI'
  }
}

export default async function LocaleLayout({
  children,
  params
}: {
  children: React.ReactNode
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  if (!hasLocale(routing.locales, locale)) {
    notFound()
  }

  const isArabic = locale === 'ar'
  const fontClass = isArabic ? kanunAR.variable : poppins.variable

  return (
    <html lang={locale} className={fontClass} dir={locale == 'ar' ? 'rtl' : 'ltr'}>
      <head>
        <JsonLdSchema locale={locale} />
        <link rel="icon" type="image/png" href="/assets/favicon-96x96.png" sizes="96x96" />
        <link rel="icon" type="image/svg+xml" href="/assets/favicon.svg" />
        <link rel="shortcut icon" href="/assets/favicon.ico" />
        <link rel="apple-touch-icon" sizes="180x180" href="/assets/apple-touch-icon.png" />
        <link rel="manifest" href="/assets/site.webmanifest" />
        {(() => {
          let canonical = 'https://www.coursinity.com/'
          if (locale === 'en') canonical = 'https://www.coursinity.com/en'
          if (locale === 'ar') canonical = 'https://www.coursinity.com/ar'
          return (
            <>
              <link rel="canonical" href={canonical} />
              <link rel="alternate" hrefLang="x-default" href="https://www.coursinity.com/" />
              <link rel="alternate" hrefLang="en" href="https://www.coursinity.com/en" />
              <link rel="alternate" hrefLang="ar" href="https://www.coursinity.com/ar" />
            </>
          )
        })()}
      </head>
      <body>
        <NextIntlClientProvider>
          <Theme>
            <HeaderVisibilityProvider>
              <SmoothScrollProvider>
                <div className="main-wrapper ">{children}</div>
              </SmoothScrollProvider>
            </HeaderVisibilityProvider>
          </Theme>
        </NextIntlClientProvider>
      </body>
    </html>
  )
}
