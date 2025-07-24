import { Metadata } from 'next'
import ContactFormClient from './ContactFormClient'

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params
  const isArabic = locale === 'ar'

  return {
    title: isArabic ? 'أفضل شركات التدريب في السعودية' : 'Best Training Companies in Saudi Arabia',
    description: isArabic
      ? 'الرائدة في رفع إنتاجية أعضاء فريقك بأحدث البرامج والتقنيات'
      : 'Explore COURSINITY: Blended courses that combine real-life experience and interactive learning, for the best professional certifications and internationally accredited training in Saudi Arabia.',
    icons: {
      icon: '/assets/favicon.png',
      shortcut: '/assets/favicon.png',
      apple: '/assets/favicon.png'
    },
    openGraph: {
      title: isArabic
        ? 'أفضل شركات التدريب في السعودية | Coursinity'
        : 'Best Training Companies in Saudi Arabia | Coursinity',
      description: isArabic
        ? 'الرائدة في رفع إنتاجية أعضاء فريقك بأحدث البرامج والتقنيات'
        : 'Explore COURSINITY: Blended courses that combine real-life experience and interactive learning, for the best professional certifications and internationally accredited training in Saudi Arabia.',
      url: isArabic ? 'https://www.coursinity.com/ar/contact-form' : 'https://www.coursinity.com/en/contact-form',
      images: [
        {
          url: '/assets/favicon.png',
          width: 512,
          height: 512,
          alt: 'Coursinity Logo'
        }
      ],
      locale: isArabic ? 'ar' : 'en',
      type: 'website'
    },
    twitter: {
      card: 'summary_large_image',
      title: isArabic
        ? 'أفضل شركات التدريب في السعودية | Coursinity'
        : 'Best Training Companies in Saudi Arabia | Coursinity',
      description: isArabic
        ? 'الرائدة في رفع إنتاجية أعضاء فريقك بأحدث البرامج والتقنيات'
        : 'Explore COURSINITY: Blended courses that combine real-life experience and interactive learning, for the best professional certifications and internationally accredited training in Saudi Arabia.',
      images: ['/assets/favicon.png']
    }
  }
}

export default function ContactFormPage() {
  return <ContactFormClient />
}
