import { Metadata } from 'next'
import { useTranslations } from 'next-intl'
import { Typography } from '@/components/ui'
import { Header } from '@/components/Header'
import Footer from '@/components/Footer/Footer'

export const metadata: Metadata = {
  title: 'Terms of Use | Coursinity',
  description: 'Terms and conditions for using Coursinity services and platform.'
}

export default function TermsOfUsePage() {
  const t = useTranslations('TermsOfUse')

  return (
    <>
      <Header />
      <div className="min-h-screen bg-white py-[100px] max-md:py-[40px]">
        <div className="max-w-4xl mx-auto px-4 py-12">
          <div className="prose prose-lg max-w-none">
            <Typography variant="h3" weight="bold" className="text-gray-900 mb-8 text-center">
              {t('title')}
            </Typography>

            <Typography variant="body3" className="text-gray-600 mb-8">
              {t('lastUpdated')}
            </Typography>

            <div className="mb-8">
              <Typography variant="body2" className="text-gray-700 leading-relaxed">
                {t('intro.paragraph1')}
              </Typography>

              <Typography variant="body2" className="text-gray-700 leading-relaxed mt-4">
                {t('intro.paragraph2')}
              </Typography>

              <Typography variant="body2" className="text-gray-700 leading-relaxed mt-4">
                {t('intro.paragraph3')}
              </Typography>

              <Typography variant="body2" className="text-gray-700 leading-relaxed mt-4">
                {t('intro.paragraph4')}
              </Typography>

              <Typography variant="body2" className="text-gray-700 leading-relaxed mt-4">
                {t('intro.paragraph5')}
              </Typography>
            </div>

            <div className="mb-8">
              <Typography variant="h4" weight="semibold" className="text-gray-900 mb-6">
                {t('tableOfContents.title')}
              </Typography>
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
              <Typography variant="h4" weight="semibold" className="text-gray-900 mb-4">
                {t('sections.agreement.title')}
              </Typography>
              <Typography variant="body2" className="text-gray-700 leading-relaxed">
                {t('sections.agreement.content')}
              </Typography>
            </section>

            <section id="section-2" className="mb-8">
              <Typography variant="h4" weight="semibold" className="text-gray-900 mb-4">
                {t('sections.access.title')}
              </Typography>
              <Typography variant="body2" className="text-gray-700 leading-relaxed">
                {t('sections.access.content')}
              </Typography>
            </section>

            <section id="section-3" className="mb-8">
              <Typography variant="h4" weight="semibold" className="text-gray-900 mb-4">
                {t('sections.intellectual.title')}
              </Typography>

              <Typography variant="h6" weight="medium" className="text-gray-900 mb-3">
                {t('sections.intellectual.subsections.ownership.title')}
              </Typography>
              <Typography variant="body2" className="text-gray-700 leading-relaxed mb-4">
                {t('sections.intellectual.subsections.ownership.content')}
              </Typography>

              <Typography variant="h6" weight="medium" className="text-gray-900 mb-3">
                {t('sections.intellectual.subsections.license.title')}
              </Typography>
              <Typography variant="body2" className="text-gray-700 leading-relaxed mb-4">
                {t('sections.intellectual.subsections.license.content')}
              </Typography>

              <Typography variant="h6" weight="medium" className="text-gray-900 mb-3">
                {t('sections.intellectual.subsections.recordings.title')}
              </Typography>
              <Typography variant="body2" className="text-gray-700 leading-relaxed mb-4">
                {t('sections.intellectual.subsections.recordings.paragraph1')}
              </Typography>
              <Typography variant="body2" className="text-gray-700 leading-relaxed">
                {t('sections.intellectual.subsections.recordings.paragraph2')}
              </Typography>
            </section>

            <section id="section-4" className="mb-8">
              <Typography variant="h4" weight="semibold" className="text-gray-900 mb-4">
                {t('sections.responsibilities.title')}
              </Typography>
              <Typography variant="body2" className="text-gray-700 leading-relaxed mb-4">
                {t('sections.responsibilities.intro')}
              </Typography>
              <ul className="list-disc list-inside space-y-2 text-gray-700 mb-4">
                {t.raw('sections.responsibilities.list').map((item: string, index: number) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
              <Typography variant="body2" className="text-gray-700 leading-relaxed">
                {t('sections.responsibilities.conclusion')}
              </Typography>
            </section>

            <section id="section-5" className="mb-8">
              <Typography variant="h4" weight="semibold" className="text-gray-900 mb-4">
                {t('sections.accuracy.title')}
              </Typography>
              <Typography variant="body2" className="text-gray-700 leading-relaxed">
                {t('sections.accuracy.content')}
              </Typography>
            </section>

            <section id="section-6" className="mb-8">
              <Typography variant="h4" weight="semibold" className="text-gray-900 mb-4">
                {t('sections.thirdParty.title')}
              </Typography>
              <Typography variant="body2" className="text-gray-700 leading-relaxed">
                {t('sections.thirdParty.content')}
              </Typography>
            </section>

            <section id="section-7" className="mb-8">
              <Typography variant="h4" weight="semibold" className="text-gray-900 mb-4">
                {t('sections.privacy.title')}
              </Typography>
              <Typography variant="body2" className="text-gray-700 leading-relaxed">
                {t('sections.privacy.content')}
              </Typography>
            </section>

            <section id="section-8" className="mb-8">
              <Typography variant="h4" weight="semibold" className="text-gray-900 mb-4">
                {t('sections.additional.title')}
              </Typography>
              <Typography variant="body2" className="text-gray-700 leading-relaxed">
                {t('sections.additional.content')}
              </Typography>
            </section>

            <section id="section-9" className="mb-8">
              <Typography variant="h4" weight="semibold" className="text-gray-900 mb-4">
                {t('sections.disclaimers.title')}
              </Typography>
              <Typography variant="body2" className="text-gray-700 leading-relaxed">
                {t('sections.disclaimers.content')}
              </Typography>
            </section>

            <section id="section-10" className="mb-8">
              <Typography variant="h4" weight="semibold" className="text-gray-900 mb-4">
                {t('sections.limitation.title')}
              </Typography>
              <Typography variant="body1" className="text-gray-700 leading-relaxed">
                {t('sections.limitation.content')}
              </Typography>
            </section>

            <section id="section-11" className="mb-8">
              <Typography variant="h4" weight="semibold" className="text-gray-900 mb-4">
                {t('sections.changes.title')}
              </Typography>
              <Typography variant="body1" className="text-gray-700 leading-relaxed">
                {t('sections.changes.content')}
              </Typography>
            </section>

            <section id="section-12" className="mb-8">
              <Typography variant="h4" weight="semibold" className="text-gray-900 mb-4">
                {t('sections.termination.title')}
              </Typography>
              <Typography variant="body2" className="text-gray-700 leading-relaxed mb-4">
                {t('sections.termination.intro')}
              </Typography>
              <ul className="list-disc list-inside space-y-2 text-gray-700 mb-4">
                {t.raw('sections.termination.list').map((item: string, index: number) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
              <Typography variant="body2" className="text-gray-700 leading-relaxed">
                {t('sections.termination.conclusion')}
              </Typography>
            </section>

            <section id="section-13" className="mb-8">
              <Typography variant="h4" weight="semibold" className="text-gray-900 mb-4">
                {t('sections.governing.title')}
              </Typography>
              <Typography variant="body1" className="text-gray-700 leading-relaxed">
                {t('sections.governing.content')}
              </Typography>
            </section>

            <section id="section-14" className="mb-8">
              <Typography variant="h4" weight="semibold" className="text-gray-900 mb-4">
                {t('sections.severability.title')}
              </Typography>
              <Typography variant="body2" className="text-gray-700 leading-relaxed">
                {t('sections.severability.content')}
              </Typography>
            </section>

            <section id="section-15" className="mb-8">
              <Typography variant="h4" weight="semibold" className="text-gray-900 mb-4">
                {t('sections.waivers.title')}
              </Typography>
              <Typography variant="body2" className="text-gray-700 leading-relaxed">
                {t('sections.waivers.content')}
              </Typography>
            </section>

            <section id="section-16" className="mb-8">
              <Typography variant="h4" weight="semibold" className="text-gray-900 mb-4">
                {t('sections.forceMajeure.title')}
              </Typography>
              <Typography variant="body2" className="text-gray-700 leading-relaxed">
                {t('sections.forceMajeure.content')}
              </Typography>
            </section>

            <section id="section-17" className="mb-8">
              <Typography variant="h4" weight="semibold" className="text-gray-900 mb-4">
                {t('sections.assignment.title')}
              </Typography>
              <Typography variant="body2" className="text-gray-700 leading-relaxed">
                {t('sections.assignment.content')}
              </Typography>
            </section>

            <section id="section-18" className="mb-8">
              <Typography variant="h4" weight="semibold" className="text-gray-900 mb-4">
                {t('sections.fullAgreement.title')}
              </Typography>
              <Typography variant="body2" className="text-gray-700 leading-relaxed">
                {t('sections.fullAgreement.content')}
              </Typography>
            </section>

            <section id="section-19" className="mb-8">
              <Typography variant="h4" weight="semibold" className="text-gray-900 mb-4">
                {t('sections.contact.title')}
              </Typography>
              <Typography variant="body2" className="text-gray-700 leading-relaxed">
                {t('sections.contact.content')}{' '}
                <a href={`mailto:${t('sections.contact.email')}`} className="text-blue-600 hover:text-blue-800">
                  {t('sections.contact.email')}
                </a>
              </Typography>
            </section>
          </div>
        </div>
      </div>
      <Footer />
    </>
  )
}
