import { FadeInOnView } from '@/components/FadeInOnView/FadeInOnView'
import { Typography } from '@/components/ui'
import { useLocale, useTranslations } from 'next-intl'
import { useEffect, useRef, useState } from 'react'
import Lottie, { LottieRefCurrentProps } from 'lottie-react'
import { useInView } from './useInView'

import lottie1En from '../../../../public/assets/lottie/consulting/en/con_1.json'
import lottie2En from '../../../../public/assets/lottie/consulting/en/con_2.json'
import lottie3En from '../../../../public/assets/lottie/consulting/en/con_3.json'
import lottie4En from '../../../../public/assets/lottie/consulting/en/con_4.json'
import lottie1Ar from '../../../../public/assets/lottie/consulting/ar/con_1.json'
import lottie2Ar from '../../../../public/assets/lottie/consulting/ar/con_2.json'
import lottie3Ar from '../../../../public/assets/lottie/consulting/ar/con_3.json'
import lottie4Ar from '../../../../public/assets/lottie/consulting/ar/con_4.json'
import { ConsultingCard } from './components/ConsultingCard'
import { Button } from '@/components/primitives/button'

export const ConsultingSection = () => {
  const [isDesktop, setIsDesktop] = useState(false)
  const [isMobile, setIsMobile] = useState(false)

  const t = useTranslations('S_ConsultingSection')
  const locale = useLocale()
  const isArabic = locale === 'ar'

  const lotties = isArabic ? [lottie1Ar, lottie2Ar, lottie3Ar, lottie4Ar] : [lottie1En, lottie2En, lottie3En, lottie4En]

  useEffect(() => {
    const checkScreenSize = () => {
      const width = window.innerWidth
      setIsDesktop(width > 1024)
      setIsMobile(width < 768)
    }

    checkScreenSize()
    window.addEventListener('resize', checkScreenSize)
    return () => window.removeEventListener('resize', checkScreenSize)
  }, [])

  const lottieRefs = Array.from({ length: 4 }, () => useRef<LottieRefCurrentProps | null>(null))
  const cardRefs = Array.from({ length: 4 }, () => useRef<HTMLDivElement | null>(null))
  const [wasInView, setWasInView] = useState([false, false, false, false])
  const inViews = cardRefs.map((ref) => useInView(ref as React.RefObject<HTMLElement>, { threshold: 0.3 }))

  useEffect(() => {
    inViews.forEach((inView, i) => {
      const lottie = lottieRefs[i]?.current
      if (!lottie) return

      if (inView && !wasInView[i]) {
        lottie.stop?.()
        lottie.goToAndPlay?.(0, true)
        setWasInView((prev) => {
          const arr = [...prev]
          arr[i] = true
          return arr
        })
      }

      if (!inView && wasInView[i]) {
        lottie.stop?.()
        setWasInView((prev) => {
          const arr = [...prev]
          arr[i] = false
          return arr
        })
      }
    })
  }, [inViews, wasInView])

  const cardData = lotties.map((lottie, i) => ({
    index: i,
    layout: i === 0 || i === 3 ? 'wide' : 'tall',
    lottieData: lottie,
    title: t(`cards.${i}.title`),
    description: t(`cards.${i}.description`),
    refEl: cardRefs[i],
    lottieRef: lottieRefs[i],
    isMobile,
    lottieClassName:
      i === 0
        ? 'max-w-[365px] max-h-[243px] min-w-[365px] min-h-[243px] max-lg:min-w-[330px] max-lg:min-h-[300px] max-md:min-w-full max-md:min-h-fit'
        : i === 1
        ? 'min-w-[367px] min-h-[300px] max-lg:min-w-[330px] max-lg:min-h-[300px] max-md:min-w-full max-md:min-h-fit'
        : i === 2
        ? 'min-w-[313px] min-h-[292px] max-lg:min-w-[330px] max-lg:min-h-[300px] max-md:min-w-full max-md:min-h-fit'
        : 'max-w-[568px] max-h-[238px] max-lg:min-w-[330px] max-lg:min-h-[300px] max-md:min-w-full max-md:min-h-fit'
  }))

  return (
    <section className="py-[120px] max-lg:py-0 max-lg:pt-[80px] flex flex-col items-center  justify-center bg-white gap-[40px] max-1250:px-[40px] px-[150px]  max-lg:px-6 max-md:px-4">
      <div className="flex flex-col max-w-full scaleText opacityText text-center gap-4">
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

      <div className="flex flex-col items-center justify-center gap-5 w-full">
        <div className="flex flex-col md:flex-row gap-5 w-full justify-center">
          {cardData.slice(0, 2).map((card) => (
            <ConsultingCard key={card.index} {...card} />
          ))}
        </div>
        <div className="flex flex-col md:flex-row gap-5 w-full justify-center">
          {cardData.slice(2).map((card) => (
            <ConsultingCard key={card.index} {...card} />
          ))}
        </div>
      </div>
      <FadeInOnView>
        <Button href={`/${locale}/contact-form`} variant="purple" className="w-fit max-md:w-full">
          {t('button')}
        </Button>
      </FadeInOnView>
    </section>
  )
}
