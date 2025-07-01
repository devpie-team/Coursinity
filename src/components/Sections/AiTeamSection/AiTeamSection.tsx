'use client'

import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useLocale, useTranslations } from 'next-intl'
import { Button } from '@/components/primitives/button'
import { Typography } from '@/components/ui'

import UsersIcon from '@/components/icons/UsersIcon'
import PhysicsIcon from '@/components/icons/PhysicsIcon'
import TeacherIcon from '@/components/icons/TeacherIcon'
import IdeaIcon from '@/components/icons/IdeaIcon'
import MonitorIcon from '@/components/icons/MonitorIcon'
import { cn } from '@/lib/utils'
import AOS from 'aos'
import 'aos/dist/aos.css'
import { FadeInOnView } from '@/components/FadeInOnView/FadeInOnView'

gsap.registerPlugin(ScrollTrigger)

export const AiTeamSection = () => {
  const t = useTranslations('AiTeamSection')
  const [isMobile, setIsMobile] = useState(false)
  const [isTablet, setIsTablet] = useState(false)
  const [isDesktop, setIsDesktop] = useState(false)
  const locale = useLocale()
  const isArabic = locale == 'ar'

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

  const items = [
    { icon: <UsersIcon />, translationKey: 'items.0' },
    { icon: <PhysicsIcon />, translationKey: 'items.1' },
    { icon: <TeacherIcon />, translationKey: 'items.2' },
    { icon: <IdeaIcon />, translationKey: 'items.3' },
    { icon: <MonitorIcon />, translationKey: 'items.4' }
  ]

  const itemRefs = useRef<Array<HTMLDivElement | null>>([])

  useEffect(() => {
    let ctx = gsap.context(() => {
      items.forEach((_, i) => {
        gsap.fromTo(
          itemRefs.current[i],
          {
            opacity: 0,
            scale: 0.7,
            y: 50
          },
          {
            opacity: 1,
            scale: 1,
            y: 0,
            delay: i * 0.05,
            duration: 0.3,
            ease: 'expo.inOut',
            scrollTrigger: {
              trigger: itemRefs.current[i],
              start: 'top 95%',

              toggleActions: 'play reverse play reverse'
            }
          }
        )
      })
    })
    return () => ctx.revert()
  }, [items.length])

  return (
    <section className={cn('bg-black text-white p-[140px] max-[1200px]:px-6 max-lg:pb-20 max-lg:pt-0 max-md:px-4')}>
      <div className={cn('flex justify-center items-center gap-[130px] max-lg:gap-10 max-md:flex-col')}>
        {/* Left */}
        <div className="flex flex-col gap-8 flex-1 min-w-[300px] max-w-[550px] justify-center max-lg:gap-4 max-lg:max-w-[373px]">
          <FadeInOnView variant="fade-up">
            <Typography variant={isDesktop ? 'h3' : 'h5'} weight="medium">
              {t('title')}
            </Typography>
          </FadeInOnView>
          <FadeInOnView>
            <Typography variant="body3" weight="regular">
              {t('description')}
            </Typography>
          </FadeInOnView>
          <FadeInOnView>
            <a href={`/${locale}/contact-form`} className="mt-10  max-lg:mt-4">
              <Button variant="purple" size="md" className="mt-10 w-[190px] max-lg:w-full max-md:w-full max-lg:mt-4">
                {t('button')}
              </Button>
            </a>
          </FadeInOnView>
        </div>

        {/* Right */}
        <div className="flex flex-col gap-2 flex-1 min-w-[300px] max-w-[480px] max-lg:max-w-[373px]">
          {items.map(({ icon, translationKey }, index) => (
            <div
              key={index}
              ref={(el) => {
                itemRefs.current[index] = el
              }}
              className="p-6 border border-[#FFFFFF29] rounded-[20px] bg-[linear-gradient(180deg,_rgba(255,255,255,0.06)_0%,_rgba(30,141,194,0.06)_100%)] backdrop-blur-[16px] max-lg:p-4 origin-top"
              style={{ transformOrigin: 'top center' }}>
              <div className="flex gap-3 items-center">
                <div>{icon}</div>
                <Typography variant="body2" weight="regular">
                  {t(translationKey)}
                </Typography>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
