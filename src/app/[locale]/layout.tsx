import { NextIntlClientProvider, hasLocale } from 'next-intl'
import { getMessages, setRequestLocale } from 'next-intl/server'
import { notFound } from 'next/navigation'
import { routing } from '@/i18n/routing'
import { HeaderVisibilityProvider } from '@/components/Header/HeaderVisibilityContext'
import { JsonLdSchema } from '@/components/JsonLdSchema'
import SmoothScrollProvider from '@/components/SmoothScrollProvider'
import { Theme } from '@radix-ui/themes'
import Script from 'next/script'

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params; // <-- тільки так
  if (!hasLocale(routing.locales, locale)) notFound();

  // (опційно) зафіксувати локаль для статичного рендеру next-intl
  setRequestLocale(locale);

  const messages = await getMessages();

  return (
    <>
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

      {/* Meta Pixel init */}
      <Script id="facebook-pixel" strategy="afterInteractive">
        {`
          !function(f,b,e,v,n,t,s){
            if(f.fbq) return;
            n=f.fbq=function(){ n.callMethod ? n.callMethod.apply(n,arguments) : n.queue.push(arguments) };
            if(!f._fbq) f._fbq=n;
            n.push=n; n.loaded=!0; n.version='2.0';
            n.queue=[];
            t=b.createElement(e); t.async=!0; t.src=v;
            s=b.getElementsByTagName(e)[0]; s.parentNode.insertBefore(t,s);
          }(window, document, 'script', 'https://connect.facebook.net/en_US/fbevents.js');
          fbq('init', '1255262075149493');
          fbq('track', 'PageView');
        `}
      </Script>

      <NextIntlClientProvider locale={locale} messages={messages}>
        <Theme>
          <HeaderVisibilityProvider>
            <SmoothScrollProvider>
              <div className="main-wrapper">{children}</div>
            </SmoothScrollProvider>
          </HeaderVisibilityProvider>
        </Theme>
      </NextIntlClientProvider>

      {/* noscript fallback */}
      <noscript>
        <img
          height="1"
          width="1"
          style={{ display: 'none' }}
          src="https://www.facebook.com/tr?id=1255262075149493&ev=PageView&noscript=1"
          alt=""
        />
      </noscript>
    </>
  )
}
