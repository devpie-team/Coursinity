import Lottie from 'lottie-react'
import animationData from '../../../../public/assets/lottie/academic/academic.json'
import { Typography } from '@/components/ui'
import { useTranslations } from 'next-intl'
import { Button } from '@/components/primitives/button'

export const AcademySection = () => {
  const t = useTranslations('AcademySection')

  return (
    <section className="bg-white py-[140px] flex justify-center items-center flex-col gap-12">
      <div className="flex flex-col gap-4 text-center">
        <Typography weight="medium" variant="h3">
          {t('title')}
        </Typography>
        <Typography variant="body3" weight="regular" className="text-description">
          {t('description')}
        </Typography>
      </div>
      <div className="flex flex-col items-center gap-8">
        <Lottie
          animationData={animationData}
          loop={true}
          className="w-full h-[900px] max-lg:h-[600px] max-md:h-[400px]"
        />
        <Button variant="purple">{t('button')}</Button>
      </div>
    </section>
  )
}
