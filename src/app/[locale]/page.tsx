import { Metadata } from 'next'
import HomePage from './HomePage'

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params
  const isArabic = locale === 'ar'

  return {
    title: isArabic
      ? 'أفضل شركات التدريب في السعودية | Coursinity'
      : 'Best Training Companies in Saudi Arabia | Coursinity',
    description: isArabic
      ? 'استكشف COURSINITY: دورات تدريبية مُجزأة تجمع بين الخبرة الحياتية والتعلم التفاعلي، للحصول على أفضل الشهادات الاحترافية والتدريب المعتمد دوليا في السعودية.'
      : 'Explore COURSINITY: Blended courses that combine real-life experience and interactive learning, for the best professional certifications and internationally accredited training in Saudi Arabia.',
    icons: {
      icon: '/assets/favicon.png',
      shortcut: '/assets/favicon.png',
      apple: '/assets/favicon.png'
    }
  }
}

export default function Page() {
  return <HomePage />
}
