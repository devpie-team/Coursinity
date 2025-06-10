'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useTranslations } from 'next-intl'
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

gsap.registerPlugin(ScrollTrigger)

export const AiTeamSection = () => {
  const t = useTranslations('AiTeamSection')

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
            y: 60
          },
          {
            opacity: 1,
            scale: 1,
            y: 0,
            delay: i * 0.05,
            duration: 0.6,
            ease: 'expo.inOut',
            scrollTrigger: {
              trigger: itemRefs.current[i],
              start: 'top 80%',

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
      <div className={cn('flex justify-center items-stretch gap-[130px] max-lg:gap-10 max-md:flex-col')}>
        {/* Left */}
        <div className="flex flex-col gap-8 flex-1 min-w-[300px] justify-center max-lg:gap-4">
          <Typography variant="h3" weight="medium" data-aos="fade" data-aos-offset="-50">
            {t('title')}
          </Typography>
          <Typography variant="body3" weight="regular" data-aos="fade" data-aos-offset="-50">
            {t('description')}
          </Typography>
          <Button
            variant="purple"
            size="md"
            className="mt-10 w-[190px] max-lg:w-[253px] max-md:w-full max-lg:mt-4"
            data-aos="fade">
            {t('button')}
          </Button>
        </div>

        {/* Right */}
        <div className="flex flex-col gap-2 flex-1 min-w-[300px]">
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
