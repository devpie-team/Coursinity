import { FadeInOnView } from '@/components/FadeInOnView/FadeInOnView'
import { Typography } from '@/components/ui'
import { useLocale, useTranslations } from 'next-intl'
import { useEffect, useRef, useState } from 'react'
import Lottie, { LottieRefCurrentProps } from 'lottie-react'
import { useInView } from './useInView'

import lottie1En from '../../../../public/assets/lottie/path/en/l_1.json'
import lottie2En from '../../../../public/assets/lottie/path/en/l_2.json'
import lottie3En from '../../../../public/assets/lottie/path/en/l_3.json'
import lottie1Ar from '../../../../public/assets/lottie/path/ar/l_1.json'
import lottie2Ar from '../../../../public/assets/lottie/path/ar/l_2.json'
import lottie3Ar from '../../../../public/assets/lottie/path/ar/l_3.json'
import { Button } from '@/components/primitives/button'

export const PathSection = () => {
  const [isDesktop, setIsDesktop] = useState(false)
  const [isTablet, setIsTablet] = useState(false)

  const t = useTranslations('S_PathSection')
  const locale = useLocale()
  const isArabic = locale == 'ar'

  const lottie1 = isArabic ? lottie1Ar : lottie1En
  const lottie2 = isArabic ? lottie2Ar : lottie2En
  const lottie3 = isArabic ? lottie3Ar : lottie3En

  useEffect(() => {
    const checkScreenSize = () => {
      const width = window.innerWidth
      setIsDesktop(width > 1024)
      setIsTablet(width >= 768 && width <= 1024)
    }

    checkScreenSize()
    window.addEventListener('resize', checkScreenSize)
    return () => window.removeEventListener('resize', checkScreenSize)
  }, [])

  const cards = [
    { lottie: lottie1, maxWidth: 'w-[183px]' },
    { lottie: lottie2, maxWidth: 'w-[243px]' },
    { lottie: lottie3, maxWidth: 'w-[238px]' }
  ]

  const lottieRefs = [
    useRef<LottieRefCurrentProps | null>(null),
    useRef<LottieRefCurrentProps | null>(null),
    useRef<LottieRefCurrentProps | null>(null)
  ]
  const cardRefs = [
    useRef<HTMLDivElement | null>(null),
    useRef<HTMLDivElement | null>(null),
    useRef<HTMLDivElement | null>(null)
  ]

  const [wasInView, setWasInView] = useState([false, false, false])
  const inViews = cardRefs.map((ref) => useInView(ref as React.RefObject<HTMLElement>, { threshold: 0.3 }))

  useEffect(() => {
    inViews.forEach((inView, i) => {
      const lottie = lottieRefs[i]?.current
      if (!lottie) return

      if (inView && !wasInView[i]) {
        lottie.stop?.()
        lottie.goToAndPlay?.(0, true)
        setWasInView((was) => {
          const arr = [...was]
          arr[i] = true
          return arr
        })
      }

      if (!inView && wasInView[i]) {
        lottie.stop?.()
        setWasInView((was) => {
          const arr = [...was]
          arr[i] = false
          return arr
        })
      }
    })
  }, [inViews, wasInView])

  return (
    <section className="pt-[120px] mb-[-2px]  max-lg:pt-[80px] flex flex-col items-center justify-center bg-white gap-[40px] max-lg:px-6 max-md:px-4">
      <div className="flex flex-col max-w-full scaleText opacityText gap-4 text-center">
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
      <div className="flex justify-center items-center w-full gap-5 max-md:flex-col">
        {cards.map((card, i) => (
          <div
            key={i}
            ref={cardRefs[i]}
            className="flex flex-col items-center w-[367px] max-md:w-full h-[600px] max-lg:h-[445px] bg-secondary-300 rounded-[20px] overflow-hidden">
            <Lottie
              animationData={card.lottie}
              lottieRef={lottieRefs[i]}
              loop={false}
              className="min-w-[440px] min-h-[440px] max-lg:min-w-[330px] max-lg:min-h-[300px]  max-md:min-w-full max-md:min-h-[333px]"
            />
            <div
              className={`flex flex-col h-full mx-8 pb-10 max-md:pt-3 max-lg:pb-5 max-lg:mx-5 gap-4 max-lg:gap-2 self-start ${
                isDesktop ? card.maxWidth : isTablet && i === 0 && 'w-[200px]'
              }`}>
              <Typography variant={!isDesktop ? 'body1' : 'h5'} weight={!isDesktop ? 'medium' : 'regular'}>
                {t(`cards.${i}.title`)}
              </Typography>
              <Typography variant={!isDesktop ? 'caption' : 'body3'} weight="regular" className="opacity-65 leading-6">
                {t(`cards.${i}.description`)}
              </Typography>
            </div>
          </div>
        ))}
      </div>
      <FadeInOnView>
        <Button href={`/${locale}/contact-form`} variant="purple" className="w-[327px] max-md:w-full">
          {t('button')}
        </Button>
      </FadeInOnView>
    </section>
  )
}
