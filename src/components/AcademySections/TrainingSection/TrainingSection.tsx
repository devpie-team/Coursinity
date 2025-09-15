import { FadeInOnView } from '@/components/FadeInOnView/FadeInOnView'
import { SmallCheckIcon } from '@/components/icons'
import { Button } from '@/components/primitives/button'
import { Typography } from '@/components/ui'
import { cn } from '@/lib/utils'
import { useLocale, useTranslations } from 'next-intl'
import { useEffect, useState } from 'react'
import lottie1En from '../../../../public/assets/lottie/academy/training/en/1.json'
import lottie2En from '../../../../public/assets/lottie/academy/training/en/2.json'
import lottie1Ar from '../../../../public/assets/lottie/academy/training/ar/1.json'
import lottie2Ar from '../../../../public/assets/lottie/academy/training/ar/2.json'
import Lottie from 'lottie-react'

export const TrainingSection = () => {
  const t = useTranslations('AC_TrainingSection')
  const locale = useLocale()
  const isArabic = locale === 'ar'

  const [isMobile, setIsMobile] = useState(false)
  const [isTablet, setIsTablet] = useState(false)
  const [isDesktop, setIsDesktop] = useState(false)

  const lottie1 = isArabic ? lottie1Ar : lottie1En
  const lottie2 = isArabic ? lottie2Ar : lottie2En

  useEffect(() => {
    const checkScreenSize = () => {
      const width = window.innerWidth
      const height = window.innerHeight

      setIsMobile(width < 768)
      setIsTablet(width >= 768 && width <= 1260)
      setIsDesktop(width > 1260)
    }
    checkScreenSize()
    window.addEventListener('resize', checkScreenSize)
    return () => window.removeEventListener('resize', checkScreenSize)
  }, [])

  return (
    <section
      className={cn(
        'pb-[120px] max-md:pb-0 flex flex-col items-center justify-center bg-white gap-5 max-md:gap-10 px-4'
      )}>
      <div className="flex flex-col max-w-full scaleText opacityText max-md:px-4 gap-4 max-md:gap-6 text-center">
        <FadeInOnView variant="fade-up">
          <Typography variant={isDesktop ? 'h3' : 'h5'} weight="medium">
            {t('title')}
          </Typography>
        </FadeInOnView>
        <FadeInOnView variant="fade-up">
          <Typography variant="body3" weight="regular" className="text-description">
            {t('subtitle')}
          </Typography>
        </FadeInOnView>
      </div>
      <div className="flex gap-6 max-md:flex-col">
        {[0, 1].map((index) => (
          <div
            key={index}
            className={cn(
              'p-6 flex flex-col  bg-secondary-300 w-[565px] max-[1200px]:w-[50%] max-md:w-full rounded-2xl max-md:h-auto',
              isArabic ? ' h-[620px]' : ' h-[708px]'
            )}>
            <Lottie animationData={index ? lottie2 : lottie1} loop={true} className="w-full" />
            <div className="flex flex-col gap-6">
              <Typography variant={isDesktop ? 'h5' : 'body1'} weight="medium" className={isArabic ? '' : 'w-[282px]'}>
                {t(`cards.${index}.title`)}
              </Typography>
              <div className="flex flex-col gap-3">
                <div className="flex gap-3">
                  <div className="flex items-center justify-center bg-primary-purple min-w-5 h-5 rounded-full">
                    <SmallCheckIcon />
                  </div>
                  <Typography variant={isDesktop ? 'body2' : 'body3'}>{t(`cards.${index}.item_1`)}</Typography>
                </div>
                <div className="flex gap-3">
                  <div className="flex items-center justify-center bg-primary-purple min-w-5 h-5 rounded-full">
                    <SmallCheckIcon />
                  </div>
                  <Typography variant={isDesktop ? 'body2' : 'body3'}>{t(`cards.${index}.item_2`)}</Typography>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="flex flex-col items-center gap-8 text-center">
        <Typography variant="body3" className="text-description">
          {t('bottom_text')}
        </Typography>
        <Button variant="academy" className="max-md:w-full">
          {t('button')}
        </Button>
      </div>
    </section>
  )
}
