'use client'

import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { FadeInOnView } from '@/components/FadeInOnView/FadeInOnView'
import { Typography } from '@/components/ui'
import { useLocale, useTranslations } from 'next-intl'
import lottie1En from '../../../../public/assets/lottie/academy/skill/en/1.json'
import lottie2En from '../../../../public/assets/lottie/academy/skill/en/2.json'
import lottie3En from '../../../../public/assets/lottie/academy/skill/en/3.json'
import lottie4En from '../../../../public/assets/lottie/academy/skill/en/4.json'
import lottie5En from '../../../../public/assets/lottie/academy/skill/en/5.json'
import lottie6En from '../../../../public/assets/lottie/academy/skill/en/6.json'
import lottie7En from '../../../../public/assets/lottie/academy/skill/en/7.json'
import lottie8En from '../../../../public/assets/lottie/academy/skill/en/8.json'
import lottie1Ar from '../../../../public/assets/lottie/academy/skill/ar/1.json'
import lottie2Ar from '../../../../public/assets/lottie/academy/skill/ar/2.json'
import lottie3Ar from '../../../../public/assets/lottie/academy/skill/ar/3.json'
import lottie4Ar from '../../../../public/assets/lottie/academy/skill/ar/4.json'
import lottie5Ar from '../../../../public/assets/lottie/academy/skill/ar/5.json'
import lottie6Ar from '../../../../public/assets/lottie/academy/skill/ar/6.json'
import lottie7Ar from '../../../../public/assets/lottie/academy/skill/ar/7.json'
import lottie8Ar from '../../../../public/assets/lottie/academy/skill/ar/8.json'
import Lottie, { LottieRefCurrentProps } from 'lottie-react'
import { SmallCheckIcon } from '@/components/icons'
import { useLottieAutoPlay } from './useLottieAutoPlay'
import { cn } from '@/lib/utils'
import { useHeaderVisibility } from '@/components/Header/HeaderVisibilityContext'
import type { Swiper as SwiperType } from 'swiper'
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css'
import { Pagination } from 'swiper/modules'
import { SwipeStepper } from '@/components/SwipeStepper/SwipeStepper'
import { Button } from '@/components/primitives/button'

gsap.registerPlugin(ScrollTrigger)

export const SkillSection = () => {
  const isArabic = useLocale() === 'ar'
  const lottie1 = isArabic ? lottie1Ar : lottie1En
  const lottie2 = isArabic ? lottie2Ar : lottie2En
  const lottie3 = isArabic ? lottie3Ar : lottie3En
  const lottie4 = isArabic ? lottie4Ar : lottie4En
  const lottie5 = isArabic ? lottie5Ar : lottie5En
  const lottie6 = isArabic ? lottie6Ar : lottie6En
  const lottie7 = isArabic ? lottie7Ar : lottie7En
  const lottie8 = isArabic ? lottie8Ar : lottie8En

  const stepsData = [lottie1, lottie2, lottie3, lottie4, lottie5, lottie6, lottie7, lottie8]

  const rootRef = useRef<HTMLElement | null>(null)
  const leftStageRef = useRef<HTMLDivElement | null>(null)
  const leftTrackRef = useRef<HTMLDivElement | null>(null)
  const rightStageRef = useRef<HTMLDivElement | null>(null)
  const rightTrackRef = useRef<HTMLDivElement | null>(null)

  const [isDesktop, setIsDesktop] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const [panelH, setPanelH] = useState<number>(520)
  const [smallHeight, setSmallHeight] = useState(false)

  const getTracks = () => [leftTrackRef.current, rightTrackRef.current].filter(Boolean) as HTMLElement[]

  useEffect(() => {
    const measure = () => {
      setIsDesktop(window.innerWidth >= 1024)
      setIsMobile(window.innerWidth <= 768)
      setSmallHeight(window.innerHeight <= 900)
    }
    measure()
    window.addEventListener('resize', measure)
    return () => window.removeEventListener('resize', measure)
  }, [])

  useEffect(() => {
    if (!isDesktop || !stepsData?.length) return
    if (!rootRef.current) return
    const tracks = getTracks()
    if (tracks.length < 2) return

    const ctx = gsap.context((): void | (() => void) => {
      const stepsCount = stepsData.length
      const totalSteps = stepsCount - 1
      const stepScroll = 1500

      gsap.set(tracks, { y: 0, willChange: 'transform' })

      const tl = gsap.timeline({ defaults: { ease: 'none' } })
      for (let i = 0; i < totalSteps; i++) {
        tl.to(tracks, { y: -(i + 1) * panelH, duration: 1 }, i)
      }

      const st = ScrollTrigger.create({
        trigger: rootRef.current!,
        animation: tl,
        start: 'top top',
        end: `+=${totalSteps * stepScroll}`,
        pin: true,
        pinSpacing: true,
        anticipatePin: 1,
        scrub: 0.25,
        invalidateOnRefresh: true,
        onToggle: (self) => {
          document.documentElement.classList.toggle('hide-header', self.isActive)
        }
      })

      const onRefreshInit = () => {
        gsap.set(tracks, { y: 0 })
      }
      ScrollTrigger.addEventListener('refreshInit', onRefreshInit)

      return () => {
        ScrollTrigger.removeEventListener('refreshInit', onRefreshInit)
        st.kill()
        tl.kill()
      }
    }, rootRef)

    ScrollTrigger.refresh()
    return () => ctx.revert()
  }, [isDesktop, panelH, stepsData])

  const swiperRef = useRef<SwiperType | null>(null)
  const [currentStep, setCurrentStep] = useState(0)

  const handleStepClick = (step: number) => {
    if (swiperRef.current) {
      swiperRef.current?.slideTo(step - 1)

      setCurrentStep(step - 1)
    }
  }
  const t = useTranslations('AC_SkillSection')

  if (isMobile) {
    return (
      <section ref={rootRef} className="bg-white py-20" dir={isArabic ? 'rtl' : 'ltr'}>
        <div className="flex flex-col gap-[32px] px-[14px]">
          <Header isMobile />
          <Swiper
            onSwiper={(swiper) => {
              swiperRef.current = swiper
              setCurrentStep(swiper.activeIndex)
            }}
            pagination={{
              clickable: true,
              el: '.skill-swiper-pagination',
              bulletClass: 'skill-bullet',
              bulletActiveClass: 'skill-bullet-active',
              renderBullet: (_, className) => `<span class="${className}"></span>`
            }}
            onSlideChange={(swiper) => setCurrentStep(swiper.activeIndex)}
            slidesPerView={1}
            slidesPerGroup={1}
            spaceBetween={16}
            allowTouchMove
            observer
            observeParents
            className="w-full">
            {stepsData.map((anim, id) => (
              <SwiperSlide key={id}>
                <MobileStep step={id} anim={anim} isActive={currentStep === id} />
              </SwiperSlide>
            ))}
          </Swiper>
          <div className="py-[22px] flex w-full items-center justify-center">
            <SwipeStepper steps={8} activeStep={currentStep + 1} onStepClick={handleStepClick} type="green" />
          </div>
          <Button variant="academy">{t('button')}</Button>
        </div>
      </section>
    )
  }

  return (
    <>
      {smallHeight && <div className="h-[100px] bg-white w-screen " />}
      <section ref={rootRef} className="bg-white h-screen flex flex-col items-start justify-center py-5">
        <div className="container mx-auto px-4 mb-[60px]">
          <Header isMobile={isMobile} smallHeight={smallHeight} />
        </div>

        <div className="container mx-auto px-4 flex-1 min-h-0 max-h-[520px]">
          <div className="flex w-full justify-between relative h-full">
            <div className="relative w-full h-full">
              <div ref={leftStageRef} className="relative overflow-hidden h-full">
                <div ref={leftTrackRef} className="absolute inset-0 will-change-transform">
                  {stepsData.map((_, id) => (
                    <div key={id} className="flex items-start pr-2" style={{ minHeight: panelH }}>
                      <LeftStep step={id} />
                    </div>
                  ))}
                </div>

                <div
                  className="
      pointer-events-none
      absolute inset-x-0 bottom-[-200px] h-[331px]
      [background-image:linear-gradient(180deg,rgba(255,255,255,0)_0%,#ffffff_31.27%)]
    "
                />
              </div>
            </div>

            <div className="relative h-full ">
              <div
                className="rounded-2xl overflow-hidden w-[455px] h-full"
                style={{
                  backgroundImage: `url('/assets/academy/skill/bg.png')`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center'
                }}>
                <div ref={rightStageRef} className="relative h-full overflow-hidden">
                  <div ref={rightTrackRef} className="absolute inset-x-0 top-0 will-change-transform">
                    {stepsData.map((anim, id) => (
                      <StepVisual key={id} anim={anim} minHeight={panelH} />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {smallHeight && <div className="h-[100px] bg-white w-screen " />}
    </>
  )
}

const Header = ({ isMobile, smallHeight }: { isMobile: boolean; smallHeight?: boolean }) => {
  const t = useTranslations('AC_SkillSection')
  return (
    <div className={cn('flex flex-col items-center gap-8')}>
      <div className="flex flex-col max-w-full scaleText opacityText max-md:px-4 gap-4 max-md:gap-6 text-center">
        <FadeInOnView variant="fade-up">
          <Typography variant={isMobile ? 'h5' : 'h3'} weight="medium">
            {t('title')}
          </Typography>
        </FadeInOnView>
        <FadeInOnView variant="fade-up">
          <Typography variant="body3" weight="regular" className="text-description">
            {t('subtitle')}
          </Typography>
        </FadeInOnView>
      </div>
      <div className="flex flex-col w-full scaleText opacityText gap-2 md:text-center">
        <FadeInOnView variant="fade-up">
          <Typography variant={isMobile ? 'h6' : smallHeight ? 'body2' : 'body1'} weight="medium">
            {t('small_title')}
          </Typography>
        </FadeInOnView>
        <FadeInOnView variant="fade-up">
          <Typography
            variant={isMobile ? 'body3' : smallHeight ? 'body4' : 'body3'}
            weight="regular"
            className="text-description">
            {t('small_subtitle')}
          </Typography>
        </FadeInOnView>
      </div>
    </div>
  )
}

function LeftStep({ step }: { step: number }) {
  const t = useTranslations('AC_SkillSection')
  return (
    <div className="flex flex-col gap-10">
      <div className="flex flex-col gap-6">
        <Typography variant="h3" weight="medium">
          {t(`steps.${step}.title`)}
        </Typography>
        <Typography variant="body3" className="text-description">
          {t(`steps.${step}.description`)}
        </Typography>
      </div>
      <ul className="flex flex-col gap-5">
        {[1, 2, 3].map((i) => (
          <li key={i} className="flex items-center gap-3">
            <div className="flex items-center justify-center bg-primary-green min-w-5 h-5 rounded-full">
              <SmallCheckIcon />
            </div>
            <Typography variant="body2">{t(`steps.${step}.item_${i}`)}</Typography>
          </li>
        ))}
      </ul>
    </div>
  )
}

function MobileStep({ step, anim, isActive }: { step: number; anim: any; isActive: boolean }) {
  const t = useTranslations('AC_SkillSection')

  return (
    <div className="grid grid-cols-1 gap-8 ">
      <div className="flex flex-col gap-6">
        <div className="flex flex-col gap-3">
          <Typography variant="h6" weight="medium">
            {t(`steps.${step}.title`)}
          </Typography>
          <Typography variant="body3" className="text-description">
            {t(`steps.${step}.description`)}
          </Typography>
        </div>
      </div>

      <div
        className="rounded-2xl overflow-hidden w-full h-[380px]"
        style={{
          backgroundImage: `url('/assets/academy/skill/bg.png')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}>
        <StepVisual anim={anim} minHeight={380} play={isActive} />
      </div>
    </div>
  )
}

export function StepVisual({ anim, minHeight, play = false }: { anim: any; minHeight: number; play?: boolean }) {
  const cardRef = useRef<HTMLDivElement | null>(null)
  const lottieRef = useRef<LottieRefCurrentProps | null>(null)

  useLottieAutoPlay(cardRef, lottieRef, {
    threshold: 0.6,
    rootMargin: '0px 0px 0px 0px',
    once: false
  })

  useEffect(() => {
    if (!lottieRef.current) return
    if (play) {
      try {
        lottieRef.current.goToAndPlay(0, true)
      } catch {}
    } else {
      try {
        lottieRef.current.pause()
      } catch {}
    }
  }, [play])

  return (
    <div ref={cardRef} className="p-6 lg:p-8 flex items-center" style={{ maxHeight: minHeight }}>
      <Lottie
        lottieRef={lottieRef}
        animationData={anim}
        autoplay={false}
        loop={false}
        style={{ width: '100%', height: '100%' }}
      />
    </div>
  )
}
