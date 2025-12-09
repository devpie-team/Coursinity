import type { Metadata } from 'next'
import HomePage from './HomePage'

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params
  const isArabic = locale === 'ar'

  return {
    title: isArabic
      ? 'أفضل شركات التدريب في السعودية | Coursinity'
      : 'Coursinity | Leading Training Company in Saudi Arabia. AI-Powered Training Solutions & Online Courses',
    description: isArabic
      ? 'الرائدة في رفع إنتاجية أعضاء فريقك بأحدث البرامج والتقنيات'
      : "Coursinity is one of Saudi Arabia's leading training companies, offering innovative programs and online courses powered by advanced AI and edu tech solutions. We help organizations enhance productivity, improve performance, and achieve measurable impact through data-driven learning experiences.",
    icons: {
      icon: '/assets/favicon.png',
      shortcut: '/assets/favicon.png',
      apple: '/assets/favicon.png'
    },
    alternates: {
      canonical: `https://www.coursinity.com/${locale}`,
      languages: {
        en: 'https://www.coursinity.com/en',
        ar: 'https://www.coursinity.com/ar'
      }
    }
  }
}

export default async function Page({ params }: { params: Promise<{ locale: string }> }) {
  return <HomePage />
}
