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
import { useLocale } from 'next-intl'

export const JourneySection = () => {
  const [isMobile, setIsMobile] = useState(false)
  const [isTablet, setIsTablet] = useState(false)
  const [isDesktop, setIsDesktop] = useState(true)
  const locale = useLocale()
  const isArabic = locale === 'ar'
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
    <section className="flex flex-col gap-10 py-[120px] bg-white  justify-center items-center px-4 max-lg:py-[80px]">
      <div className="flex flex-col gap-6 text-center">
        <Typography variant={isDesktop ? 'h3' : 'h5'} weight="medium">
          Your Training Academy, Built by You
        </Typography>
        <Typography variant="body3" weight="regular" className="text-description">
          Coursinity Academy is your team’s all-in-one hub for skills, knowledge, and real-world learning.
        </Typography>
      </div>

      <div className="flex gap-6 max-md:flex-col">
        <div className="bg-secondary-300 rounded-2xl max-w-[565px]  p-8 max-md:max-w-full">
          <div className="flex flex-col gap-6">
            <Typography variant={isDesktop ? 'h5' : 'h6'} weight="medium">
              Interactive Training Journeys
            </Typography>
            <div className="flex flex-col gap-4">
              <div className="flex gap-4">
                <div className="flex w-10 h-10 items-center justify-center bg-secondary-200 rounded-lg border-primary-blue/20 border shrink-0">
                  <RankIcon />
                </div>

                <div className="flex flex-col gap-2">
                  <Typography variant={isDesktop ? 'body2' : 'body3'} weight="medium">
                    Ongoing Adventures
                  </Typography>
                  <Typography variant="body3" className="text-description">
                    Accelerate skills with engaging challenges, gamification, and instant expert support.
                  </Typography>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="flex w-10 h-10 items-center justify-center bg-secondary-200 rounded-lg border-primary-blue/20 border shrink-0">
                  <PyramideIcon />
                </div>

                <div className="flex flex-col gap-2">
                  <Typography variant="body2" weight="medium">
                    Complete Roadmaps
                  </Typography>
                  <Typography variant="body3" className="text-description">
                    Step-by-step plans that keep your team charging forward.
                  </Typography>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="flex w-10 h-10 items-center justify-center bg-secondary-200 rounded-lg border-primary-blue/20 border shrink-0">
                  <UsersIcon color="#1C8DC1" size={24} />
                </div>

                <div className="flex flex-col gap-2">
                  <Typography variant={isDesktop ? 'body2' : 'body3'} weight="medium">
                    Expert Success Squad
                  </Typography>
                  <Typography variant="body3" className="text-description">
                    Your dedicated crew of specialists, cheering you on and clearing every hurdle.
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
        <div className="bg-secondary-300 rounded-2xl max-w-[565px]  p-8 max-md:max-w-full">
          <div className="flex flex-col gap-6">
            <Typography variant={isDesktop ? 'h5' : 'h6'} weight="medium">
              Customized Training Paths
            </Typography>
            <div className="flex flex-col gap-4">
              <div className="flex gap-4">
                <div className="flex w-10 h-10 items-center justify-center bg-light-green rounded-lg border-primary-green/20 border shrink-0">
                  <ListIcon size={24} color="#02B5AC" />
                </div>

                <div className="flex flex-col gap-2">
                  <Typography variant={isDesktop ? 'body2' : 'body3'} weight="medium">
                    Personalized Blueprints
                  </Typography>
                  <Typography variant="body3" className="text-description">
                    Custom learning maps built for each role, level, and ambition.
                  </Typography>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="flex w-10 h-10 items-center justify-center bg-light-green rounded-lg border-primary-green/20 border shrink-0">
                  <ChartNotificationIcon color="#02B5AC" size={24} />
                </div>

                <div className="flex flex-col gap-2">
                  <Typography variant={isDesktop ? 'body2' : 'body3'} weight="medium">
                    Real-Time Progress Check
                  </Typography>
                  <Typography variant="body3" className="text-description">
                    Instant insights on milestones that matter, so you can steer your team to success.
                  </Typography>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="flex w-10 h-10 items-center justify-center bg-light-green rounded-lg border-primary-green/20 border shrink-0">
                  <TeacherIcon color="#02B5AC" size={24} />
                </div>

                <div className="flex flex-col gap-2">
                  <Typography variant={isDesktop ? 'body2' : 'body3'} weight="medium">
                    Strategic Coaching
                  </Typography>
                  <Typography variant="body3" className="text-description">
                    Your own training advisor, aligning every lesson with your big-picture goals.
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
      <Button variant="academy" className="w-full">
        Build Your Branded Academy Now
      </Button>
    </section>
  )
}
