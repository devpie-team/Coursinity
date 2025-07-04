import { Metadata } from 'next'
import ContactFormClient from './ContactFormClient'

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params
  const isArabic = locale === 'ar'

  return {
    title: isArabic
      ? 'أفضل شركات التدريب في السعودية | Coursinity'
      : 'Best Training Companies in Saudi Arabia | Coursinity',
    description: isArabic
      ? 'الرائدة في رفع إنتاجية أعضاء فريقك بأحدث البرامج والتقنيات'
      : 'Explore COURSINITY: Blended courses that combine real-life experience and interactive learning, for the best professional certifications and internationally accredited training in Saudi Arabia.',
    icons: {
      icon: '/assets/favicon.png',
      shortcut: '/assets/favicon.png',
      apple: '/assets/favicon.png'
    }
  }
}

export default function ContactFormPage() {
  return <ContactFormClient />
}
