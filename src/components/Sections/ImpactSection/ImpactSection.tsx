import { Typography } from '@/components/ui'
import { useTranslations } from 'next-intl'

export const ImpactSection = () => {
  const t = useTranslations('ImpactSection')
  return (
    <section className="py-32 bg-black flex flex-col items-center gap-[52px]">
      <div className="flex flex-col gap-4  text-center text-white">
        <Typography variant="h3" weight="medium">
          {t('title')}
        </Typography>
        <Typography variant="body3">{t('subtitle')}</Typography>
      </div>
      <div className="relative"></div>
    </section>
  )
}
