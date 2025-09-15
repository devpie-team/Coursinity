'use client'

import { Button } from '@/components/primitives/button'
import { Typography } from '@/components/ui'
import Lottie, { LottieRefCurrentProps } from 'lottie-react'
import Lottie1En from '../../../../public/assets/lottie/academy/hero_section/hero_1.json'
import Lottie1Ar from '../../../../public/assets/lottie/academy/hero_section/hero_1_ar.json'
import { useInView } from 'react-intersection-observer'
import { useEffect, useRef, useState } from 'react'
import { GrowthSection } from '../GrowthSection'
import { useLocale, useTranslations } from 'next-intl'

type HeroSectionProps = { canPlay?: boolean }

export const HeroSection = ({ canPlay = true }: HeroSectionProps) => {
  const t = useTranslations('AC_HeroSection')
  const lottieRef = useRef<LottieRefCurrentProps>(null)
  const { ref, inView } = useInView({ triggerOnce: false })
  const [isDesktop, setIsDesktop] = useState(true)
  const locale = useLocale()
  const isArabic = locale === 'ar'

  useEffect(() => {
    const checkScreenSize = () => {
      const width = window.innerWidth
      setIsDesktop(width > 1024)
    }
    checkScreenSize()
    window.addEventListener('resize', checkScreenSize)
    return () => window.removeEventListener('resize', checkScreenSize)
  }, [])

  useEffect(() => {
    const api = lottieRef.current
    if (!api) return

    if (inView && canPlay) {
      api.stop()
      api.play()
    } else {
      api.stop()
    }
  }, [inView, canPlay])

  return (
    <section className="bg-gradient-to-b from-gray-50 via-teal-500 to-white">
      <div className="flex flex-col gap-[70px] pt-[200px] px-4 items-center max-md:pt-[120px]">
        <div className="flex flex-col gap-8 items-center">
          {/*   <button className="h-[30px] px-6 py-5 flex items-center max-lg:mb-4 bg-white text-primary-green border border-secondary-400 hover:shadow-[0px_12px_30px_0px_#A578F240] active:bg-none active:bg-secondary-green active:shadow-none disabled:pointer-events-none disabled:bg-opacity-20 disabled:text-opacity-90 rounded-full leading-4 font-medium transition-all duration-300">
            {t('badge')}
          </button> */}
          <div className="flex flex-col items-center gap-8 text-center max-w-[1000px]">
            <Typography variant={isDesktop ? 'h1' : 'h3'} weight="medium">
              {t('title')}
            </Typography>
            <Typography variant={isDesktop ? 'body2' : 'body3'} weight="medium">
              {t('subtitle')}
            </Typography>
            <Button variant="academy_secondary" className="max-md:w-full">
              {t('cta')}
            </Button>
          </div>
        </div>
        <div className="max-w-[1080px] z-10 overflow-hidden px-10 max-md:px-4 translate-y-1" ref={ref}>
          <Lottie
            lottieRef={lottieRef}
            animationData={isArabic ? Lottie1Ar : Lottie1En}
            loop={false}
            autoplay={false}
            className="z-10"
          />
        </div>
      </div>

      <GrowthSection />
    </section>
  )
}
