import { Typography } from '@/components/ui'
import { useTranslations } from 'next-intl'

export const ImpactSection = () => {
  const t = useTranslations('ImpactSection')
  return (
    <section className="impact-section py-32 bg-black flex flex-col gap-[52px]">
      <div className="flex flex-col gap-4  text-center text-white">
        <Typography variant="h3" weight="medium">
          {t('title')}
        </Typography>
        <Typography variant="body3">{t('subtitle')}</Typography>
      </div>
      <div className="relative h-[633px] min-w-[1714px] bg-black">
        <div className="blue-gradient-border absolute w-[362] h-[280px] top-[146px] left-[0px]" />
        <div className="blue-gradient-border absolute w-[253px] h-[65px] top-[22px] left-[162px]" />
        <div className="blue-gradient-border absolute" />
        <div className="blue-gradient-border absolute" />
        <div className="blue-gradient-border absolute" />
        <div className="blue-gradient-border absolute" />
        <div className="blue-gradient-border absolute" />
        <div className="blue-gradient-border absolute" />
        <div className="blue-gradient-border absolute" />
        <div className="blue-gradient-border absolute" />
        <div className="blue-gradient-border absolute" />
      </div>
    </section>
  )
}
