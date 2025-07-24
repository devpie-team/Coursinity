import type { Metadata } from 'next'
import Footer from '@/components/Footer/Footer'
import { Header } from '@/components/Header'
import { useTranslations } from 'next-intl'

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

export default function CookiePolicyPage() {
  const t = useTranslations('CookiePolicy')

  return (
    <>
      <Header />
      <div className="min-h-screen bg-white py-[100px] max-md:py-[40px] ">
        <div className="max-w-4xl mx-auto px-4 py-12">
          <div className="prose prose-lg max-w-none">
            <h1 className="text-4xl font-bold text-gray-900 mb-8">{t('title')}</h1>

            <p className="text-sm text-gray-600 mb-8">{t('lastUpdated')}</p>

            <div className="mb-8">
              <p className="text-gray-700 leading-relaxed mb-4">{t('intro.paragraph1')}</p>

              <p className="text-gray-700 leading-relaxed mb-4">{t('intro.paragraph2')}</p>

              <p className="text-gray-700 leading-relaxed">{t('intro.paragraph3')}</p>
            </div>

            <div className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-6">{t('tableOfContents.title')}</h2>
              <ol className="list-decimal list-inside space-y-2 text-gray-700">
                {t.raw('tableOfContents.items').map((item: string, index: number) => (
                  <li key={index}>
                    <a href={`#section-${index + 1}`} className="text-blue-600 hover:text-blue-800">
                      {item}
                    </a>
                  </li>
                ))}
              </ol>
            </div>

            <section id="section-1" className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">{t('sections.whatAreCookies.title')}</h2>
              <p className="text-gray-700 leading-relaxed">{t('sections.whatAreCookies.content')}</p>
            </section>

            <section id="section-2" className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">{t('sections.typesOfCookies.title')}</h2>
              <p className="text-gray-700 leading-relaxed mb-6">{t('sections.typesOfCookies.intro')}</p>
              <div className="space-y-6">
                {t.raw('sections.typesOfCookies.types').map((type: any, index: number) => (
                  <div key={index}>
                    <h3 className="text-xl font-medium text-gray-900 mb-3">{type.title}</h3>
                    <p className="text-gray-700 leading-relaxed">{type.description}</p>
                  </div>
                ))}
              </div>
            </section>

            <section id="section-3" className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">{t('sections.howWeUseCookies.title')}</h2>
              <p className="text-gray-700 leading-relaxed mb-4">{t('sections.howWeUseCookies.intro')}</p>
              <ul className="list-disc list-inside space-y-2 text-gray-700">
                {t.raw('sections.howWeUseCookies.list').map((item: string, index: number) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
            </section>

            <section id="section-4" className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">{t('sections.managingPreferences.title')}</h2>
              <p className="text-gray-700 leading-relaxed mb-6">{t('sections.managingPreferences.intro')}</p>
              <div className="space-y-6">
                {t.raw('sections.managingPreferences.methods').map((method: any, index: number) => (
                  <div key={index}>
                    <h3 className="text-xl font-medium text-gray-900 mb-3">{method.title}</h3>
                    <p className="text-gray-700 leading-relaxed">{method.description}</p>
                  </div>
                ))}
              </div>
            </section>

            <section id="section-5" className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">{t('sections.otherTechnologies.title')}</h2>
              <p className="text-gray-700 leading-relaxed mb-4">{t('sections.otherTechnologies.intro')}</p>
              <ul className="list-disc list-inside space-y-2 text-gray-700 mb-4">
                {t.raw('sections.otherTechnologies.list').map((item: string, index: number) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
              <p className="text-gray-700 leading-relaxed">{t('sections.otherTechnologies.conclusion')}</p>
            </section>

            <section id="section-6" className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">{t('sections.contact.title')}</h2>
              <p className="text-gray-700 leading-relaxed">
                {t('sections.contact.content')}{' '}
                <a href={`mailto:${t('sections.contact.email')}`} className="text-blue-600 hover:text-blue-800">
                  {t('sections.contact.email')}
                </a>
              </p>
            </section>
          </div>
        </div>
      </div>
      <Footer />
    </>
  )
}
