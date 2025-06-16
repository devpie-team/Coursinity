'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { useLocale, useTranslations } from 'next-intl'
import { Typography } from '@/components/ui'
import AOS from 'aos'
import 'aos/dist/aos.css'
import Lottie, { type LottieRefCurrentProps } from 'lottie-react'

import animation1 from '../../../../public/assets/lottie/impact/1.json'
import animation2 from '../../../../public/assets/lottie/impact/2.json'
import animation3 from '../../../../public/assets/lottie/impact/3.json'
import animation4 from '../../../../public/assets/lottie/impact/4.json'
import animation5 from '../../../../public/assets/lottie/impact/5.json'
import animation6 from '../../../../public/assets/lottie/impact/6.json'
import animation7 from '../../../../public/assets/lottie/impact/7.json'
import animation8 from '../../../../public/assets/lottie/impact/8.json'
import { BuildingIcon, BusinessIcon, EducationIcon, SmileIcon } from '@/components/icons'

export const ImpactSectionNew = () => {
  const t = useTranslations('ImpactSection')
  const locale = useLocale()
  const containerRef = useRef<HTMLDivElement>(null)
  const wrapperRef = useRef<HTMLDivElement>(null)

  const GROUP_COUNT = 2

  const animations = [
    {
      animation: animation1,
      className: 'absolute w-[362px] h-[280px] top-[146px] left-0 md:w-[167px] md:h-[243px]'
    },
    {
      animation: animation2,
      className: 'absolute w-[362px] h-[308px] bottom-[27px] right-[16px] md:w-[171px] md:h-[227px]'
    },
    {
      animation: animation3,
      className: 'absolute w-[253px] h-[65px] top-[22px] left-[162px] md:w-[139px] md:h-[31px]'
    },
    {
      animation: animation4,
      className: 'absolute w-[296px] h-[65px] bottom-[231px] right-[390px] md:w-[162px] md:h-[24px]'
    },
    {
      animation: animation5,
      className: 'absolute w-[156px] h-[52px] bottom-[151px] left-[421px] md:w-[87px] md:h-[29px]'
    },
    {
      animation: animation6,
      className: 'absolute w-[309px] h-[223px] top-[35px] right-[556px] md:w-[146px] md:h-[110px]'
    },
    {
      animation: animation7,
      className: 'absolute w-[136px] h-[132px] top-[93px] left-[488px] md:w-[167px] md:h-[243px]'
    },
    {
      animation: animation8,
      className: 'absolute w-[154px] h-[192px] bottom-0 left-[619px] md:w-[167px] md:h-[243px]'
    },
    {
      animation: animation5,
      className: 'absolute w-[156px] h-[52px] top-[133px] right-[251px] md:w-[87px] md:h-[29px]'
    }
  ]

  // Инициализируем ссылочные объекты для каждой Lottie анимации в каждой группе
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
        duration: 120,
        ease: 'linear',
        repeat: -1
      }
    )
  }, [])

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
  }, [])

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
        className="relative h-[672px] min-w-[1905px] max-[1705]:min-w-[1705px] bg-black overflow-hidden">
        <div ref={wrapperRef} className="absolute flex">
          {Array.from({ length: GROUP_COUNT }).map((_, groupIdx) => (
            <div key={groupIdx} className="relative flex-shrink-0" style={{ width: '1705px', height: '633px' }}>
              <div className="blue-gradient-border absolute w-[100px] h-[100px] bottom-[17px] left-[264px] flex items-center justify-center md:w-[48px] md:h-[48px]">
                <BusinessIcon />
              </div>
              <div className="blue-gradient-border absolute w-[100px] h-[100px] top-[30px] right-[50px] flex items-center justify-center md:w-[48px] md:h-[48px]">
                <BuildingIcon />
              </div>
              <div className="blue-gradient-border absolute w-[100px] h-[100px] top-0 right-[438px] flex items-center justify-center md:w-[48px] md:h-[48px]">
                <EducationIcon />
              </div>
              <div className="blue-gradient-border absolute w-[100px] h-[100px] bottom-[58px] right-[507px] flex items-center justify-center md:w-[48px] md:h-[48px]">
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
