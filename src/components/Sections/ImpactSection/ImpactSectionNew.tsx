'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { useLocale, useTranslations } from 'next-intl'
import { Typography } from '@/components/ui'
import AOS from 'aos'
import 'aos/dist/aos.css'
import Lottie, { type LottieRefCurrentProps } from 'lottie-react'

import { BuildingIcon, BusinessIcon, EducationIcon, SmileIcon } from '@/components/icons'

export const ImpactSectionNew = () => {
  const t = useTranslations('ImpactSection')
  const locale = useLocale()
  const containerRef = useRef<HTMLDivElement>(null)
  const wrapperRef = useRef<HTMLDivElement>(null)

  const GROUP_COUNT = 2

  const getAnimationsForLocale = (locale: string) => {
    return [
      {
        animation: require(`../../../../public/assets/lottie/impact/${locale}/1.json`),
        className:
          'absolute w-[362px] h-[280px] top-[74px] md:top-[146px] left-[30px] lg:left-0 scale-50 sm:scale-75 lg:scale-100'
      },
      {
        animation: require(`../../../../public/assets/lottie/impact/${locale}/2.json`),
        className:
          'absolute w-[362px] h-[308px] bottom-[220px] md:bottom-[27px] right-[16px] scale-50 sm:scale-75 lg:scale-100'
      },
      {
        animation: require(`../../../../public/assets/lottie/impact/${locale}/3.json`),
        className: 'absolute w-[253px] h-[65px] top-[11px] md:top-[22px] left-[162px] scale-50 sm:scale-75 lg:scale-100'
      },
      {
        animation: require(`../../../../public/assets/lottie/impact/${locale}/4.json`),
        className:
          'absolute w-[296px] h-[65px] bottom-[331px] md:bottom-[231px] right-[390px] scale-50 sm:scale-75 lg:scale-100'
      },
      {
        animation: require(`../../../../public/assets/lottie/impact/${locale}/5.json`),
        className:
          'absolute w-[156px] h-[52px] bottom-[251px] md:bottom-[151px] left-[421px] scale-50 sm:scale-75 lg:scale-100'
      },
      {
        animation: require(`../../../../public/assets/lottie/impact/${locale}/6.json`),
        className:
          'absolute w-[309px] h-[223px] top-[16px] md:top-[35px] right-[556px] scale-50 sm:scale-75 lg:scale-100'
      },
      {
        animation: require(`../../../../public/assets/lottie/impact/${locale}/7.json`),
        className:
          'absolute w-[269px] h-[160px] top-[46px] md:top-[93px] left-[488px] scale-50 sm:scale-75 lg:scale-100'
      },
      {
        animation: require(`../../../../public/assets/lottie/impact/${locale}/8.json`),
        className:
          'absolute w-[362px] h-[316px] bottom-[220px] md:bottom-0 left-[619px] scale-50 sm:scale-75 lg:scale-100'
      },
      {
        animation: require(`../../../../public/assets/lottie/impact/en/5.json`),
        className:
          'absolute w-[156px] h-[52px] top-[62px] md:top-[133px] right-[251px] scale-50 sm:scale-75 lg:scale-100'
      }
    ]
  }

  const animations = getAnimationsForLocale(locale)

  const lottieRefs: Array<Array<React.RefObject<LottieRefCurrentProps | null>>> = Array.from(
    { length: animations.length },
    () => Array.from({ length: GROUP_COUNT }, () => useRef<LottieRefCurrentProps | null>(null))
  )

  useEffect(() => {
    const wrapper = wrapperRef.current
    const container = containerRef.current
    if (!wrapper || !container) return

    const wrapperWidth = wrapper.offsetWidth / 2
    gsap.fromTo(
      wrapper,
      { x: locale === 'ar' ? wrapperWidth : 0 },
      {
        x: locale === 'ar' ? 0 : -wrapperWidth,
        duration: 12,
        ease: 'linear',
        repeat: -1
      }
    )
  }, [locale])

  useEffect(() => {
    AOS.init()
  }, [])

  useEffect(() => {
    const playAll = () => {
      animations.forEach((_, i) => {
        for (let group = 0; group < GROUP_COUNT; group++) {
          const ref = lottieRefs[i][group].current
          ref?.stop()
          ref?.play()
        }
      })
    }

    playAll()

    const interval = setInterval(() => {
      playAll()
    }, 8000)

    return () => clearInterval(interval)
  }, [animations])

  return (
    <section className="pt-32 pb-[89px] bg-black flex flex-col gap-[52px] overflow-hidden">
      <div className="flex flex-col gap-4 text-center text-white">
        <Typography variant="h3" weight="medium" data-aos="fade-left" data-aos-offset="-30">
          {t('title')}
        </Typography>
        <Typography variant="body3" data-aos="fade-right">
          {t('subtitle')}
        </Typography>
      </div>

      <div
        ref={containerRef}
        className="relative h-[372px] md:h-[572px] lg:h-[672px] min-w-[1905px] max-[1705]:min-w-[1705px] bg-black overflow-hidden">
        <div ref={wrapperRef} className="absolute flex">
          {Array.from({ length: GROUP_COUNT }).map((_, groupIdx) => (
            <div key={groupIdx} className="relative flex-shrink-0" style={{ width: '1705px', height: '633px' }}>
              <div className="blue-gradient-border absolute w-[100px] h-[100px] bottom-[237px] md:bottom-[57px] lg:bottom-[17px] left-[264px] flex items-center justify-center scale-50 sm:scale-75 lg:scale-100">
                <BusinessIcon />
              </div>
              <div className="blue-gradient-border absolute w-[100px] h-[100px] top-[15px] md:top-[30px] right-[50px] flex items-center justify-center scale-50 sm:scale-75 lg:scale-100">
                <BuildingIcon />
              </div>
              <div className="blue-gradient-border absolute w-[100px] h-[100px] top-0 right-[438px] flex items-center justify-center scale-50 sm:scale-75 lg:scale-100">
                <EducationIcon />
              </div>
              <div className="blue-gradient-border absolute w-[100px] h-[100px] bottom-[238px] md:bottom-[58px] right-[507px] flex items-center justify-center scale-50 sm:scale-75 lg:scale-100">
                <SmileIcon />
              </div>
              {animations.map(({ animation, className }, i) => (
                <Lottie
                  key={`${groupIdx}-${i}`}
                  lottieRef={lottieRefs[i][groupIdx]}
                  animationData={animation}
                  autoplay={false}
                  className={className}
                  loop={false}
                />
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
