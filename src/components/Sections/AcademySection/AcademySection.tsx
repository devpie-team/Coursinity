import { useEffect } from 'react'
import AOS from 'aos'
import 'aos/dist/aos.css'
import Lottie from 'lottie-react'
import animationData from '../../../../public/assets/lottie/academic/academic.json'
import { Typography } from '@/components/ui'
import { useTranslations } from 'next-intl'
import { Button } from '@/components/primitives/button'

export const AcademySection = () => {
  const t = useTranslations('AcademySection')

  useEffect(() => {
    AOS.init()
  }, [])

  return (
    <section className="bg-white py-[140px] flex justify-center items-center flex-col gap-12">
      <div className="flex flex-col gap-4 text-center">
        <Typography weight="medium" variant="h3" data-aos="fade-down">
          {t('title')}
        </Typography>
        <Typography variant="body3" weight="regular" className="text-description" data-aos="fade-up">
          {t('description')}
        </Typography>
      </div>
      <div className="flex flex-col items-center gap-8" data-aos="fade-up">
        <Lottie
          animationData={animationData}
          loop={true}
          className="w-full h-[900px] max-lg:h-[600px] max-md:h-[400px]"
        />
        <Button variant="purple" data-aos="fade-up" data-aos-offset="-50">
          {t('button')}
        </Button>
      </div>
    </section>
  )
}
