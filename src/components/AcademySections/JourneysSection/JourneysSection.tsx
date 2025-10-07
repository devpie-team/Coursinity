'use client'

import { ListIcon } from '@/components/icons'
import { ChartNotificationIcon } from '@/components/icons/ChartNotificationIcon'
import { PyramideIcon } from '@/components/icons/PyramideIcon'
import { RankIcon } from '@/components/icons/RankIcon'
import TeacherIcon from '@/components/icons/TeacherIcon'
import UsersIcon from '@/components/icons/UsersIcon'
import { Button } from '@/components/primitives/button'
import { Typography } from '@/components/ui'
import Lottie, { LottieRefCurrentProps } from 'lottie-react'
import { useRef, useEffect, useState } from 'react'
import { useInView } from 'react-intersection-observer'

import lottie1En from '../../../../public/assets/lottie/academy/journey_section/en/journey_1.json'
import lottie2En from '../../../../public/assets/lottie/academy/journey_section/en/journey_2.json'
import lottie1Ar from '../../../../public/assets/lottie/academy/journey_section/ar/journey_1.json'
import lottie2Ar from '../../../../public/assets/lottie/academy/journey_section/ar/journey_2.json'
import { useLocale } from 'next-intl'
import { useTranslations } from 'use-intl'
import { Swiper, SwiperSlide } from 'swiper/react'
import { SwipeStepper } from '@/components/SwipeStepper/SwipeStepper'
import type { Swiper as SwiperType } from 'swiper'
import 'swiper/css'

export const JourneySection = () => {
  const [isMobile, setIsMobile] = useState(false)
  const locale = useLocale()
  const isArabic = locale === 'ar'
  const t = useTranslations('AC_JourneySection')

  const lottieRef1 = useRef<LottieRefCurrentProps>(null)
  const lottieRef2 = useRef<LottieRefCurrentProps>(null)

  const { ref: ref1, inView: inView1 } = useInView({ triggerOnce: false })
  const { ref: ref2, inView: inView2 } = useInView({ triggerOnce: false })

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768)
    handleResize()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  useEffect(() => {
    if (inView1 && lottieRef1.current) {
      lottieRef1.current.stop()
      lottieRef1.current.play()
    }
  }, [inView1])

  useEffect(() => {
    if (inView2 && lottieRef2.current) {
      lottieRef2.current.stop()
      lottieRef2.current.play()
    }
  }, [inView2])

  const swiperRef = useRef<SwiperType | null>(null)

  const [currentStep, setCurrentStep] = useState(0)

  const handleStepClick = (step: number) => {
    if (swiperRef.current) {
      swiperRef.current?.slideTo(step - 1)

      setCurrentStep(step - 1)
    }
  }

  return (
    <section className="flex flex-col gap-10 py-[120px] bg-white justify-center md:items-center px-4 max-lg:py-[80px]">
      <div className="flex flex-col gap-6 text-center max-w-[750px]">
        <Typography variant={isMobile ? 'h5' : 'h3'} weight="medium">
          {t('title')}
        </Typography>
        <Typography variant="body3" className="text-description">
          {t('subtitle')}
        </Typography>
      </div>

      {isMobile ? (
        <div className="flex flex-col gap-[32px]">
          <Swiper
            slidesPerView={1}
            spaceBetween={16}
            onSwiper={(swiper) => {
              swiperRef.current = swiper
              setCurrentStep(swiper.activeIndex)
            }}
            onSlideChange={(swiper) => setCurrentStep(swiper.activeIndex)}
            pagination={{
              clickable: true,
              el: '.journey-swiper-pagination',
              bulletClass: 'skill-bullet',
              bulletActiveClass: 'skill-bullet-active',
              renderBullet: (_, className) => `<span class="${className}"></span>`
            }}
            slidesPerGroup={1}
            allowTouchMove
            observer
            observeParents
            className="w-full"
            breakpoints={{
              350: {
                spaceBetween: -45
              },
              370: {
                spaceBetween: -55
              },
              410: {
                spaceBetween: -55
              },
              460: {
                spaceBetween: -65
              },
              500: {
                spaceBetween: -65
              },
              550: {
                spaceBetween: -75
              },
              600: {
                spaceBetween: -75
              },
              650: {
                spaceBetween: -85
              },
              700: {
                spaceBetween: -85
              },
              767: {
                spaceBetween: 20
              }
            }}>
            <SwiperSlide className="w-full">
              <div className="bg-secondary-300 rounded-2xl p-8 flex flex-col gap-6 w-[90%]">
                <div ref={ref1} className="flex justify-center items-center">
                  <Lottie
                    lottieRef={lottieRef1}
                    animationData={isArabic ? lottie1Ar : lottie1En}
                    loop={false}
                    autoplay={false}
                    className="h-[280px]"
                  />
                </div>
                <Typography variant="h6" weight="medium">
                  {t('cardsLeft.title')}
                </Typography>
                <div className="flex flex-col gap-4">
                  <div className="flex flex-col gap-4">
                    {/* 1 */}
                    <div className="flex gap-4">
                      <div className="flex w-10 h-10 items-center justify-center bg-secondary-200 rounded-lg border-primary-blue/20 border shrink-0">
                        <RankIcon />
                      </div>
                      <div className="flex flex-col gap-2">
                        <Typography variant="body3" weight="medium">
                          {t('cardsLeft.items.0.title')}
                        </Typography>
                        <Typography variant="body4" className="text-description">
                          {t('cardsLeft.items.0.description')}
                        </Typography>
                      </div>
                    </div>

                    {/* 2 */}
                    <div className="flex gap-4">
                      <div className="flex w-10 h-10 items-center justify-center bg-secondary-200 rounded-lg border-primary-blue/20 border shrink-0">
                        <PyramideIcon />
                      </div>
                      <div className="flex flex-col gap-2">
                        <Typography variant="body3" weight="medium">
                          {t('cardsLeft.items.1.title')}
                        </Typography>
                        <Typography variant="body4" className="text-description">
                          {t('cardsLeft.items.1.description')}
                        </Typography>
                      </div>
                    </div>

                    {/* 3 */}
                    <div className="flex gap-4">
                      <div className="flex w-10 h-10 items-center justify-center bg-secondary-200 rounded-lg border-primary-blue/20 border shrink-0">
                        <UsersIcon color="#1C8DC1" size={24} />
                      </div>
                      <div className="flex flex-col gap-2">
                        <Typography variant="body3" weight="medium">
                          {t('cardsLeft.items.2.title')}
                        </Typography>
                        <Typography variant="body4" className="text-description">
                          {t('cardsLeft.items.2.description')}
                        </Typography>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </SwiperSlide>

            <SwiperSlide className="w-full flex justify-items-end">
              <div className="bg-secondary-300 rounded-2xl p-8 flex flex-col gap-6 w-[90%]">
                <div ref={ref2} className="flex justify-center items-center">
                  <Lottie
                    lottieRef={lottieRef2}
                    animationData={isArabic ? lottie2Ar : lottie2En}
                    loop={false}
                    autoplay={false}
                    className="h-[280px]"
                  />
                </div>
                <Typography variant="h6" weight="medium">
                  {t('cardsRight.title')}
                </Typography>
                <div className="flex flex-col gap-4">
                  <div className="flex flex-col gap-4">
                    {/* 1 */}
                    <div className="flex gap-4">
                      <div className="flex w-10 h-10 items-center justify-center bg-light-green rounded-lg border-primary-green/20 border shrink-0">
                        <ListIcon size={24} color="#02B5AC" />
                      </div>
                      <div className="flex flex-col gap-2">
                        <Typography variant="body3" weight="medium">
                          {t('cardsRight.items.0.title')}
                        </Typography>
                        <Typography variant="body4" className="text-description">
                          {t('cardsRight.items.0.description')}
                        </Typography>
                      </div>
                    </div>

                    {/* 2 */}
                    <div className="flex gap-4">
                      <div className="flex w-10 h-10 items-center justify-center bg-light-green rounded-lg border-primary-green/20 border shrink-0">
                        <ChartNotificationIcon color="#02B5AC" size={24} />
                      </div>
                      <div className="flex flex-col gap-2">
                        <Typography variant="body3" weight="medium">
                          {t('cardsRight.items.1.title')}
                        </Typography>
                        <Typography variant="body4" className="text-description">
                          {t('cardsRight.items.1.description')}
                        </Typography>
                      </div>
                    </div>

                    {/* 3 */}
                    <div className="flex gap-4">
                      <div className="flex w-10 h-10 items-center justify-center bg-light-green rounded-lg border-primary-green/20 border shrink-0">
                        <TeacherIcon color="#02B5AC" size={24} />
                      </div>
                      <div className="flex flex-col gap-2">
                        <Typography variant="body3" weight="medium">
                          {t('cardsRight.items.2.title')}
                        </Typography>
                        <Typography variant="body4" className="text-description">
                          {t('cardsRight.items.2.description')}
                        </Typography>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          </Swiper>
          <div className="py-[22px] flex w-full items-center justify-center">
            <SwipeStepper steps={2} activeStep={currentStep + 1} onStepClick={handleStepClick} type="green" />
          </div>
        </div>
      ) : (
        /* 🔹 DESKTOP: дві картки поруч */
        <div className="flex gap-6">
          {/* Left card */}
          <div className="bg-secondary-300 rounded-2xl max-w-[565px] p-8 flex flex-col gap-6">
            <Typography variant="h5" weight="medium">
              {t('cardsLeft.title')}
            </Typography>
            <div className="flex flex-col gap-4">
              <div className="flex flex-col gap-4">
                {/* 1 */}
                <div className="flex gap-4">
                  <div className="flex w-10 h-10 items-center justify-center bg-secondary-200 rounded-lg border-primary-blue/20 border shrink-0">
                    <RankIcon />
                  </div>
                  <div className="flex flex-col gap-2">
                    <Typography variant="body3" weight="medium">
                      {t('cardsLeft.items.0.title')}
                    </Typography>
                    <Typography variant="body4" className="text-description">
                      {t('cardsLeft.items.0.description')}
                    </Typography>
                  </div>
                </div>

                {/* 2 */}
                <div className="flex gap-4">
                  <div className="flex w-10 h-10 items-center justify-center bg-secondary-200 rounded-lg border-primary-blue/20 border shrink-0">
                    <PyramideIcon />
                  </div>
                  <div className="flex flex-col gap-2">
                    <Typography variant="body3" weight="medium">
                      {t('cardsLeft.items.1.title')}
                    </Typography>
                    <Typography variant="body4" className="text-description">
                      {t('cardsLeft.items.1.description')}
                    </Typography>
                  </div>
                </div>

                {/* 3 */}
                <div className="flex gap-4">
                  <div className="flex w-10 h-10 items-center justify-center bg-secondary-200 rounded-lg border-primary-blue/20 border shrink-0">
                    <UsersIcon color="#1C8DC1" size={24} />
                  </div>
                  <div className="flex flex-col gap-2">
                    <Typography variant="body3" weight="medium">
                      {t('cardsLeft.items.2.title')}
                    </Typography>
                    <Typography variant="body4" className="text-description">
                      {t('cardsLeft.items.2.description')}
                    </Typography>
                  </div>
                </div>
              </div>
            </div>
            <div ref={ref1} className="flex justify-center items-center">
              <Lottie
                lottieRef={lottieRef1}
                animationData={isArabic ? lottie1Ar : lottie1En}
                loop={false}
                autoplay={false}
                className="h-[300px]"
              />
            </div>
          </div>

          {/* Right card */}
          <div className="bg-secondary-300 rounded-2xl max-w-[565px] p-8 flex flex-col gap-6">
            <Typography variant="h5" weight="medium">
              {t('cardsRight.title')}
            </Typography>
            <div className="flex flex-col gap-4">
              <div className="flex flex-col gap-4">
                {/* 1 */}
                <div className="flex gap-4">
                  <div className="flex w-10 h-10 items-center justify-center bg-light-green rounded-lg border-primary-green/20 border shrink-0">
                    <ListIcon size={24} color="#02B5AC" />
                  </div>
                  <div className="flex flex-col gap-2">
                    <Typography variant="body3" weight="medium">
                      {t('cardsRight.items.0.title')}
                    </Typography>
                    <Typography variant="body4" className="text-description">
                      {t('cardsRight.items.0.description')}
                    </Typography>
                  </div>
                </div>

                {/* 2 */}
                <div className="flex gap-4">
                  <div className="flex w-10 h-10 items-center justify-center bg-light-green rounded-lg border-primary-green/20 border shrink-0">
                    <ChartNotificationIcon color="#02B5AC" size={24} />
                  </div>
                  <div className="flex flex-col gap-2">
                    <Typography variant="body3" weight="medium">
                      {t('cardsRight.items.1.title')}
                    </Typography>
                    <Typography variant="body4" className="text-description">
                      {t('cardsRight.items.1.description')}
                    </Typography>
                  </div>
                </div>

                {/* 3 */}
                <div className="flex gap-4">
                  <div className="flex w-10 h-10 items-center justify-center bg-light-green rounded-lg border-primary-green/20 border shrink-0">
                    <TeacherIcon color="#02B5AC" size={24} />
                  </div>
                  <div className="flex flex-col gap-2">
                    <Typography variant="body3" weight="medium">
                      {t('cardsRight.items.2.title')}
                    </Typography>
                    <Typography variant="body4" className="text-description">
                      {t('cardsRight.items.2.description')}
                    </Typography>
                  </div>
                </div>
              </div>
            </div>
            <div ref={ref2} className="flex justify-center items-center">
              <Lottie
                lottieRef={lottieRef2}
                animationData={isArabic ? lottie2Ar : lottie2En}
                loop={false}
                autoplay={false}
                className="h-[300px]"
              />
            </div>
          </div>
        </div>
      )}

      <div className="py-4 flex justify-center">
        <div className="journey-swiper-pagination flex gap-2"></div>
      </div>

      <Button variant="academy" className="max-md:w-full">
        {t('cta')}
      </Button>
    </section>
  )
}
