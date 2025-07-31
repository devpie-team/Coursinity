'use client'

import { useLocale, useTranslations } from 'next-intl'

import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useEffect, useState } from 'react'
import TypingLoopText from './_components/TypingLoopText'
import { Typography } from '@/components/ui'
import { Button } from '@/components/primitives/button'
import StepScroll from './_components/StepScrollSection'

gsap.registerPlugin(ScrollTrigger)

type THeroSection = {
  loading: boolean
}

export const HeroSection = ({ loading }: THeroSection) => {
  const t = useTranslations('S_HeroSection')
  const locale = useLocale()
  const isArabic = locale === 'ar'
  const [isMobile, setIsMobile] = useState(false)
  const [isTablet, setIsTablet] = useState(false)
  const [isDesktop, setIsDesktop] = useState(true)

  useEffect(() => {
    const checkScreenSize = () => {
      const width = window.innerWidth
      setIsMobile(width < 768)
      setIsTablet(width >= 768 && width <= 1024)
      setIsDesktop(width > 1024)
    }
    checkScreenSize()
    window.addEventListener('resize', checkScreenSize)
    return () => window.removeEventListener('resize', checkScreenSize)
  }, [])

  return (
    <section className="flex flex-col justify-between pt-[180px] items-center max-lg:pt-[120px]">
      <div className="flex flex-col justify-center items-center text-center gap-8 max-lg:max-w-[440px] max-lg:gap-4 max-md:px-4">
        <Button variant="hero" className="h-[30px] flex items-center max-md:mb-4">
          {t('badge')}
        </Button>

        <div className="flex flex-col gap-4 justify-center items-center">
          <div className="flex gap-2 items-center">
            <Typography variant={isDesktop ? 'h1' : 'h3'} weight="medium">
              {t('title.prefix')}
            </Typography>

            <TypingLoopText />

            {isDesktop && (
              <Typography variant="h1" weight="medium">
                {t('title.with')}
              </Typography>
            )}
          </div>

          <Typography variant={isDesktop ? 'h1' : 'h3'} weight="medium">
            {!isDesktop && `${t('title.with')} `}
            {t('title.suffix')}
          </Typography>
        </div>

        <Typography variant={!isDesktop ? 'body3' : 'body2'} weight={!isDesktop ? 'regular' : 'medium'}>
          {t('description')}
        </Typography>

        <Button variant="primary" className="mt-4 max-lg:w-full max-lg:bt-4">
          {t('button')}
        </Button>
      </div>
    </section>
  )
}
