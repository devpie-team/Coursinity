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
  metadataBase: new URL('https://www.coursinity.com'),
  alternates: {
    canonical: '/',
    languages: {
      en: '/en',
      ar: '/ar'
    }
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
    google: 'your-google-verification-code'
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
