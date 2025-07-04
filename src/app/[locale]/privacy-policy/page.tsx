import { Metadata } from 'next'
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

export default function PrivacyPolicyPage() {
  const t = useTranslations('PrivacyPolicy')

  return (
    <>
      <Header />
      <div className="min-h-screen bg-white py-[100px]  max-md:py-[40px]">
        <div className="max-w-4xl mx-auto px-4 py-12">
          <div className="prose prose-lg max-w-none">
            <h1 className="text-4xl font-bold text-gray-900 mb-8">{t('title')}</h1>

            <p className="text-sm text-gray-600 mb-8">{t('lastUpdated')}</p>

            <p className="text-gray-700 leading-relaxed mb-8">{t('intro')}</p>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">{t('introductionScope.title')}</h2>
              <p className="text-gray-700 leading-relaxed mb-4">{t('introductionScope.paragraph1')}</p>
              <ul className="list-disc list-inside space-y-2 text-gray-700 mb-4">
                {t.raw('introductionScope.list').map((item: string, index: number) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
              <p className="text-gray-700 leading-relaxed">{t('introductionScope.paragraph2')}</p>
            </section>

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

            <section id="section-2" className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">{t('sections.informationCollect.title')}</h2>
              <p className="text-gray-700 leading-relaxed mb-4">{t('sections.informationCollect.intro')}</p>
              <ul className="list-disc list-inside space-y-2 text-gray-700">
                {t.raw('sections.informationCollect.items').map((item: any, index: number) => (
                  <li key={index}>
                    <strong>{item.title}</strong> {item.content}
                  </li>
                ))}
              </ul>
            </section>

            <section id="section-3" className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">{t('sections.howWeUse.title')}</h2>
              <p className="text-gray-700 leading-relaxed mb-4">{t('sections.howWeUse.intro')}</p>
              <ul className="list-disc list-inside space-y-2 text-gray-700">
                {t.raw('sections.howWeUse.items').map((item: any, index: number) => (
                  <li key={index}>
                    <strong>{item.title}</strong> {item.content}
                  </li>
                ))}
              </ul>
            </section>

            <section id="section-4" className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">{t('sections.dataSharing.title')}</h2>
              <p className="text-gray-700 leading-relaxed mb-4">{t('sections.dataSharing.intro')}</p>
              <ul className="list-disc list-inside space-y-2 text-gray-700 mb-4">
                {t.raw('sections.dataSharing.items').map((item: any, index: number) => (
                  <li key={index}>
                    <strong>{item.title}</strong> {item.content}
                  </li>
                ))}
              </ul>
              <p className="text-gray-700 leading-relaxed">{t('sections.dataSharing.conclusion')}</p>
            </section>

            <section id="section-5" className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">{t('sections.cookies.title')}</h2>
              <p className="text-gray-700 leading-relaxed mb-4">{t('sections.cookies.intro')}</p>
              <ul className="list-disc list-inside space-y-2 text-gray-700 mb-4">
                {t.raw('sections.cookies.list').map((item: string, index: number) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
              <p className="text-gray-700 leading-relaxed">{t('sections.cookies.conclusion')}</p>
            </section>

            <section id="section-6" className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">{t('sections.dataRetention.title')}</h2>
              <p className="text-gray-700 leading-relaxed">{t('sections.dataRetention.content')}</p>
            </section>

            <section id="section-7" className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">{t('sections.yourRights.title')}</h2>
              <p className="text-gray-700 leading-relaxed mb-4">{t('sections.yourRights.intro')}</p>
              <ul className="list-disc list-inside space-y-2 text-gray-700">
                {t.raw('sections.yourRights.items').map((item: any, index: number) => (
                  <li key={index}>
                    <strong>{item.title}</strong> {item.content}
                  </li>
                ))}
              </ul>
            </section>

            <section id="section-8" className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">{t('sections.thirdPartyLinks.title')}</h2>
              <p className="text-gray-700 leading-relaxed">{t('sections.thirdPartyLinks.content')}</p>
            </section>

            <section id="section-9" className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">{t('sections.security.title')}</h2>
              <p className="text-gray-700 leading-relaxed">{t('sections.security.content')}</p>
            </section>

            <section id="section-10" className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">{t('sections.childrensPrivacy.title')}</h2>
              <p className="text-gray-700 leading-relaxed">{t('sections.childrensPrivacy.content')}</p>
            </section>

            <section id="section-11" className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">{t('sections.changes.title')}</h2>
              <p className="text-gray-700 leading-relaxed">{t('sections.changes.content')}</p>
            </section>

            <section id="section-12" className="mb-8">
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
