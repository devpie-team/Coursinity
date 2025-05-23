'use client'

import { useEffect, useState } from 'react'
import { useTranslations } from 'next-intl'
import { Button } from '@/components/primitives/button'
import { Typography } from '@/components/ui'

import UsersIcon from '@/components/icons/UsersIcon'
import PhysicsIcon from '@/components/icons/PhysicsIcon'
import TeacherIcon from '@/components/icons/TeacherIcon'
import IdeaIcon from '@/components/icons/IdeaIcon'
import MonitorIcon from '@/components/icons/MonitorIcon'
import { cn } from '@/lib/utils'

export const AiTeamSection = () => {
  const t = useTranslations('AiTeamSection')

  const [isMobile, setIsMobile] = useState(false)
  const [isTablet, setIsTablet] = useState(false)
  const [isDesktop, setIsDesktop] = useState(true)

  useEffect(() => {
    const checkScreenSize = () => {
      const width = window.innerWidth
      setIsMobile(width < 834)
      setIsTablet(width < 1440)
      setIsDesktop(width > 1440)
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

  return (
    <div
      className={cn(
        'bg-black text-white p-[140px] max-[1440px]:px-6 max-[1440px]:pb-20 max-[1440px]:pt-0 max-[834px]:px-4'
      )}>
      <div className={cn('flex justify-center items-stretch gap-[130px] max-[1440px]:gap-10 max-[1080px]:flex-col')}>
        {/* Left */}
        <div className="flex flex-col gap-8 flex-1 min-w-[300px]">
          <Typography variant={isDesktop ? 'h3' : 'h5'} weight="medium">
            {t('title')}
          </Typography>
          <Typography variant="body3" weight="regular">
            {t('description')}
          </Typography>
          <Button variant="purple" size="md" className="mt-12 w-[190px] max-[1440px]:w-[253px] max-[834px]:w-full">
            {t('button')}
          </Button>
        </div>

        {/* Right */}
        <div className="flex flex-col gap-2 flex-1 min-w-[300px]">
          {items.map(({ icon, translationKey }, index) => (
            <div
              key={index}
              className="p-6 border rounded-[20px] bg-[linear-gradient(180deg,_rgba(255,255,255,0.06)_0%,_rgba(30,141,194,0.06)_100%)] backdrop-blur-[16px]">
              <div className="flex gap-3 items-center">
                <div>{icon}</div>
                <Typography variant={isDesktop ? 'body3' : isTablet ? 'body2' : 'caption'} weight="regular">
                  {t(translationKey)}
                </Typography>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
