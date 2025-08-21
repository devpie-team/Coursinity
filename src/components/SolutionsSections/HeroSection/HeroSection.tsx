'use client'

import { useLocale, useTranslations } from 'next-intl'

import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useEffect, useState } from 'react'
import TypingLoopText from './_components/TypingLoopText'
import { Typography } from '@/components/ui'
import { Button } from '@/components/primitives/button'
import StepScroll from './_components/StepScrollSection'
import { FadeInOnView } from '@/components/FadeInOnView/FadeInOnView'

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
    <section className="flex flex-col justify-between pt-[180px] items-center max-lg:pt-[120px] overflow-x-hidden">
      <div className="flex flex-col justify-center items-center text-center gap-8 max-lg:max-w-[480px]  max-lg:gap-4 max-md:px-4">
        {/*  {!isMobile && (
          <button className="h-[30px]  px-6 py-5 flex items-center max-lg:mb-4  bg-white text-primary-purple border border-secondary-400   hover:shadow-[0px_12px_30px_0px_#A578F240] active:bg-none active:bg-secondary-purple active:shadow-none disabled:pointer-events-none  disabled:bg-opacity-20 disabled:text-opacity-90 rounded-full leading-4 font-medium transition-all duration-300">
            {t('badge')}
          </button>
        )} */}

        <div className="flex flex-col gap-4 justify-center items-center ">
          <div className="flex gap-4 items-center">
            <FadeInOnView>
              <Typography variant={isDesktop ? 'h1' : isTablet ? 'h3' : isArabic ? 'h6' : 'h5'} weight="medium">
                {t('title.prefix')}
              </Typography>
            </FadeInOnView>

            <FadeInOnView>
              <TypingLoopText ready={!loading} />
            </FadeInOnView>

            {isArabic ? (
              <FadeInOnView>
                <Typography variant={isDesktop ? 'h1' : isTablet ? 'h3' : 'h6'} weight="medium">
                  {t('title.with')}
                </Typography>
              </FadeInOnView>
            ) : (
              isDesktop && (
                <FadeInOnView>
                  <Typography variant={isDesktop ? 'h1' : isTablet ? 'h3' : 'h6'} weight="medium">
                    {t('title.with')}
                  </Typography>
                </FadeInOnView>
              )
            )}
          </div>

          {!isArabic ? (
            <FadeInOnView>
              <Typography variant={isDesktop ? 'h1' : isTablet ? 'h3' : 'h5'} weight="medium">
                {!isDesktop && t('title.with')} {t('title.suffix')}
              </Typography>
            </FadeInOnView>
          ) : (
            isDesktop && (
              <FadeInOnView>
                <Typography variant={isDesktop ? 'h1' : isTablet ? 'h3' : 'h6'} weight="medium">
                  {t('title.suffix')}
                </Typography>
              </FadeInOnView>
            )
          )}
        </div>

        <FadeInOnView>
          <Typography variant={!isDesktop ? 'body3' : 'body2'} weight="regular" className="">
            {t('description')}
          </Typography>
        </FadeInOnView>

        <Button href={`/${locale}/contact-form`} variant="primary" className="mt-4 max-lg:w-full max-lg:bt-4">
          {t('button')}
        </Button>
      </div>
    </section>
  )
}
