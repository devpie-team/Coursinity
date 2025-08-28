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

import lottie1En from '../../../../public/assets/lottie/academy/journey_section/journey_1.json'
import lottie2En from '../../../../public/assets/lottie/academy/journey_section/journey_2.json'
import { useLocale, useTranslations } from 'next-intl'

export const JourneySection = () => {
  const [isMobile, setIsMobile] = useState(false)
  const [isTablet, setIsTablet] = useState(false)
  const [isDesktop, setIsDesktop] = useState(true)
  const locale = useLocale()
  const isArabic = locale === 'ar'
  const t = useTranslations('AC_JourneySection')

  const lottieRef1 = useRef<LottieRefCurrentProps>(null)
  const lottieRef2 = useRef<LottieRefCurrentProps>(null)

  const { ref: ref1, inView: inView1 } = useInView({ triggerOnce: false })
  const { ref: ref2, inView: inView2 } = useInView({ triggerOnce: false })

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

  return (
    <section className="flex flex-col gap-10 py-[120px] bg-white justify-center items-center px-4 max-lg:py-[80px]">
      <div className="flex flex-col gap-6 text-center max-w-[750px]">
        <Typography variant={isDesktop ? 'h3' : 'h5'} weight="medium">
          {t('title')}
        </Typography>
        <Typography variant="body3" weight="regular" className="text-description">
          {t('subtitle')}
        </Typography>
      </div>

      <div className="flex gap-6 max-md:flex-col">
        {/* Left card */}
        <div className="bg-secondary-300 rounded-2xl max-w-[565px] p-8 max-md:max-w-full">
          <div className="flex flex-col gap-6">
            <Typography variant={isDesktop ? 'h5' : 'h6'} weight="medium">
              {t('cardsLeft.title')}
            </Typography>
            <div className="flex flex-col gap-4">
              <div className="flex gap-4">
                <div className="flex w-10 h-10 items-center justify-center bg-secondary-200 rounded-lg border-primary-blue/20 border shrink-0">
                  <RankIcon />
                </div>
                <div className="flex flex-col gap-2">
                  <Typography variant={isDesktop ? 'body2' : 'body3'} weight="medium">
                    {t('cardsLeft.items.0.title')}
                  </Typography>
                  <Typography variant="body3" className="text-description">
                    {t('cardsLeft.items.0.description')}
                  </Typography>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex w-10 h-10 items-center justify-center bg-secondary-200 rounded-lg border-primary-blue/20 border shrink-0">
                  <PyramideIcon />
                </div>
                <div className="flex flex-col gap-2">
                  <Typography variant="body2" weight="medium">
                    {t('cardsLeft.items.1.title')}
                  </Typography>
                  <Typography variant="body3" className="text-description">
                    {t('cardsLeft.items.1.description')}
                  </Typography>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex w-10 h-10 items-center justify-center bg-secondary-200 rounded-lg border-primary-blue/20 border shrink-0">
                  <UsersIcon color="#1C8DC1" size={24} />
                </div>
                <div className="flex flex-col gap-2">
                  <Typography variant="body2" weight="medium">
                    {t('cardsLeft.items.2.title')}
                  </Typography>
                  <Typography variant="body3" className="text-description">
                    {t('cardsLeft.items.2.description')}
                  </Typography>
                </div>
              </div>
            </div>

            <div ref={ref1} className="flex justify-center items-center">
              <Lottie
                lottieRef={lottieRef1}
                animationData={lottie1En}
                loop={false}
                autoplay={false}
                className="h-[300px]"
              />
            </div>
          </div>
        </div>

        {/* Right card */}
        <div className="bg-secondary-300 rounded-2xl max-w-[565px] p-8 max-md:max-w-full">
          <div className="flex flex-col gap-6">
            <Typography variant={isDesktop ? 'h5' : 'h6'} weight="medium">
              {t('cardsRight.title')}
            </Typography>
            <div className="flex flex-col gap-4">
              <div className="flex gap-4">
                <div className="flex w-10 h-10 items-center justify-center bg-light-green rounded-lg border-primary-green/20 border shrink-0">
                  <ListIcon size={24} color="#02B5AC" />
                </div>
                <div className="flex flex-col gap-2">
                  <Typography variant={isDesktop ? 'body2' : 'body3'} weight="medium">
                    {t('cardsRight.items.0.title')}
                  </Typography>
                  <Typography variant="body3" className="text-description">
                    {t('cardsRight.items.0.description')}
                  </Typography>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex w-10 h-10 items-center justify-center bg-light-green rounded-lg border-primary-green/20 border shrink-0">
                  <ChartNotificationIcon color="#02B5AC" size={24} />
                </div>
                <div className="flex flex-col gap-2">
                  <Typography variant="body2" weight="medium">
                    {t('cardsRight.items.1.title')}
                  </Typography>
                  <Typography variant="body3" className="text-description">
                    {t('cardsRight.items.1.description')}
                  </Typography>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex w-10 h-10 items-center justify-center bg-light-green rounded-lg border-primary-green/20 border shrink-0">
                  <TeacherIcon color="#02B5AC" size={24} />
                </div>
                <div className="flex flex-col gap-2">
                  <Typography variant="body2" weight="medium">
                    {t('cardsRight.items.2.title')}
                  </Typography>
                  <Typography variant="body3" className="text-description">
                    {t('cardsRight.items.2.description')}
                  </Typography>
                </div>
              </div>
            </div>

            <div ref={ref2} className="flex justify-center items-center">
              <Lottie
                lottieRef={lottieRef2}
                animationData={lottie2En}
                loop={false}
                autoplay={false}
                className="h-[300px]"
              />
            </div>
          </div>
        </div>
      </div>

      <Button variant="academy" className="max-md:w-full">
        {t('cta')}
      </Button>
    </section>
  )
}
