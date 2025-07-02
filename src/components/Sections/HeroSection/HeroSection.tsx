'use client'

import { Button } from '@/components/primitives/button'
import { Typography } from '@/components/ui'
import { useLocale, useTranslations } from 'next-intl'
import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Lottie from 'lottie-react'
import hero1En from '../../../../public/assets/lottie/hero/en/h_1.json'
import hero2En from '../../../../public/assets/lottie/hero/en/h_2.json'
import hero3En from '../../../../public/assets/lottie/hero/en/h_3.json'
import hero4En from '../../../../public/assets/lottie/hero/en/h_4.json'

import hero1Ar from '../../../../public/assets/lottie/hero/ar/h_1.json'
import hero2Ar from '../../../../public/assets/lottie/hero/ar/h_2.json'
import hero3Ar from '../../../../public/assets/lottie/hero/ar/h_3.json'
import hero4Ar from '../../../../public/assets/lottie/hero/ar/h_4.json'
import type { LottieRefCurrentProps } from 'lottie-react'
import 'aos/dist/aos.css'
import { BubbleIcon } from '@/components/icons'
import { cn } from '@/lib/utils'

gsap.registerPlugin(ScrollTrigger)

type THeroSection = {
  loading: boolean
}

export const HeroSection = ({ loading }: THeroSection) => {
  const locale = useLocale()
  const isArabic = locale == 'ar'

  const elementSettings = [
    { selector: '.hero-element1', x: -1200, y: 1200, duration: 2, fade: true },
    { selector: '.hero-element2', x: 1200, y: 1200, duration: 2, fade: true },
    { selector: '.hero-element3', x: -1200, y: -1200, duration: 2, fade: true },
    { selector: '.hero-element4', x: 1200, y: -1200, duration: 2, fade: true },
    { selector: '.hero-element5', x: 0, y: isArabic ? 100 : 0, duration: 1, fade: false },
    { selector: '.hero-element6', x: 1200, y: 0, duration: 2, fade: true },
    { selector: '.hero-element7', x: -1200, y: 0, duration: 2, fade: true }
  ]

  const hero1 = isArabic ? hero1Ar : hero1En
  const hero2 = isArabic ? hero2Ar : hero2En
  const hero3 = isArabic ? hero3Ar : hero3En
  const hero4 = isArabic ? hero4Ar : hero4En

  const t = useTranslations('Hero')
  const [isTablet, setIsTablet] = useState<boolean>(false)
  const [isMobile, setIsMobile] = useState<boolean>(false)
  const [isDesktop, setIsDesktop] = useState<boolean>(true)

  const lottieRef1 = useRef<LottieRefCurrentProps>(null)
  const lottieRef2 = useRef<LottieRefCurrentProps>(null)
  const lottieRef3 = useRef<LottieRefCurrentProps>(null)
  const lottieRef4 = useRef<LottieRefCurrentProps>(null)

  useEffect(() => {
    if (!loading) {
      lottieRef1.current?.goToAndPlay(0, true)
      lottieRef2.current?.goToAndPlay(0, true)
      lottieRef3.current?.goToAndPlay(0, true)
      lottieRef4.current?.goToAndPlay(0, true)
    }
  }, [loading])

  useEffect(() => {
    ScrollTrigger.create({
      trigger: '.hero-section',
      start: 'top 80%',
      onEnterBack: () => {
        lottieRef1.current?.goToAndPlay(0, true)
        lottieRef2.current?.goToAndPlay(0, true)
        lottieRef3.current?.goToAndPlay(0, true)
        lottieRef4.current?.goToAndPlay(0, true)
      }
    })
  }, [])

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

  useEffect(() => {
    elementSettings.forEach(({ selector, x, y, duration, fade }) => {
      if (fade) {
        gsap.fromTo(
          selector,
          {
            opacity: 1,
            x: 0,
            y: 0
          },
          {
            opacity: 0,
            x: x,
            y: y,
            duration: duration,
            ease: 'sine.inOut',
            delay: 20,
            scrollTrigger: {
              trigger: '.hero-section',
              start: 'top top',
              end: 'bottom top',
              scrub: 2
            }
          }
        )
      } else {
        gsap.fromTo(
          selector,
          {
            opacity: 1
          },
          {
            opacity: 0,
            duration: 0.002,
            ease: 'sine.inOut',
            delay: 20,
            scrollTrigger: {
              trigger: '.hero-section',
              start: 'top top',
              end: '20%',
              scrub: true
            }
          }
        )
      }
    })
  }, [])

  return (
    <section
      className="overflow-hidden relative min-h-[900px] max-[768px]:min-h-[766px] max-[1024px]:min-h-[600px] w-full bg-cover bg-center bg-no-repeat hero-section"
      style={{
        backgroundImage: `url('/assets/hero/heroBg.png')`
      }}>
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="absolute z-1 top-0 left-0 right-0 bottom-0">
          <img src="/assets/hero/glass.png" alt="Glass" className="w-full h-full object-cover opacity-70" />
        </div>

        <div
          className={`flex flex-col gap-8 items-center z-10 text-center px-4  max-md:px-4 ${
            locale ? 'w-full' : 'w-[910px]'
          } `}
          data-aos="fade-up">
          <div className="flex flex-col gap-6 max-lg:gap-4 items-center">
            <div>
              <Typography
                variant={isDesktop ? 'h1' : isTablet ? 'h3' : isArabic ? 'h6' : 'h3'}
                as="span"
                weight="medium"
                className={cn(isArabic ? 'leading-[120px] max-lg:leading-[60px] max-md:leading-[0px]' : '')}>
                {t('title1')}
                <br />
                <span className="text-primary-purple"> {t('title3')}</span>
                {t('title2')}
              </Typography>

              <Typography
                variant={isDesktop ? 'h1' : 'h3'}
                as="span"
                weight="medium"
                className="bg-gradient-to-b from-[#1C8DC1] to-[#D3E7F0] bg-clip-text text-transparent">
                {t('titleGradient')}
              </Typography>
            </div>

            <Typography variant={isDesktop ? 'body1' : 'body4'} className="max-w-[693px]">
              {t('subtitle')}
            </Typography>
          </div>
          <a href={`/${locale}/contact-form`} className="">
            <Button variant="purple" className="w-[193px] max-lg:w-[393px] max-md:w-[343px] h-16">
              {t('bookDemo')}
            </Button>
          </a>
        </div>
      </div>

      <Lottie
        animationData={hero1}
        loop={false}
        lottieRef={lottieRef1}
        className="absolute bottom-[-40px] left-3 max-[1024px]:left-1  max-[1024px]:bottom-[-20px] animate-element hero-element1  max-lg:h-[135px] max-lg:w-[135px]"
      />
      <img
        src={`/assets/hero/${locale}/${isTablet ? 'tabletElement' : 'element'}2.png/`}
        className="absolute bottom-[-40px] right-[-40px] animate-element hero-element2 max-w-[228px] max-md:max-w-[163px]"
      />
      {isTablet && !isArabic ? (
        <BubbleIcon />
      ) : (
        <img
          src={`/assets/hero/${locale}/${isTablet && !isArabic ? 'tabletElement' : 'element'}3.png`}
          className={`absolute top-[15%] left-0 max-[768px]:top-[10%] animate-element hero-element3 ${
            isArabic ? 'w-[126px] max-md:max-w-[80px]' : 'w-[222px] max-md:max-w-[123px]'
          }`}
        />
      )}
      <img
        src={`/assets/hero/${locale}/${isTablet ? 'tabletElement' : 'element'}4.png/`}
        className="absolute top-[15%] right-[-30px] max-[768px]:top-[10%] max-[1024px]:right-[-15px] animate-element hero-element4 max-w-[86px] max-md:max-w-[54px]"
      />
      <Lottie
        animationData={hero3}
        loop={false}
        lottieRef={lottieRef3}
        className={cn(
          'absolute left-[42%] max-[768px]:top-[22%] max-[768px]:left-[25%] animate-element hero-element5 max-lg:h-[85px] max-lg:w-[199px]',
          isArabic ? 'top-[13%]' : 'top-[15%]'
        )}
      />

      {isMobile ? null : (
        <>
          <Lottie
            animationData={hero4}
            loop={false}
            lottieRef={lottieRef4}
            className="absolute top-[42%] right-[-40px] max-[1024px]:right-[-15px] animate-element hero-element6 max-lg:h-[114px] max-lg:w-[116px]"
          />
          <Lottie
            animationData={hero2}
            loop={false}
            lottieRef={lottieRef2}
            className="absolute top-[42%] left-[-90px] max-[1024px]:left-[-60px] animate-element hero-element7 max-lg:h-[123px] max-lg:w-[140px]"
          />
        </>
      )}
    </section>
  )
}
