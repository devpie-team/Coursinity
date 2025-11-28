import { useLocale, useTranslations } from 'next-intl'
import { FeaturesClient } from './FeaturesSection.client'

export function FeaturesSection() {
  const t = useTranslations('Features')
  const locale = useLocale()

  return <FeaturesClient t={t} locale={locale} />
}
