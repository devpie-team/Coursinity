'use client'

import { useEffect, useRef, useState } from 'react'
import { useTranslations } from 'next-intl'

import { LogoSlider } from './_components/LogoSlider'
import { Typography } from '@/components/ui'

export const FutureSection = () => {
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

  return (
    <div className="p-10">
      <LogoSlider />
      <div className="flex items-center justify-center text-center w-full h-[975px]">
        <div className="flex flex-col w-[452px]">
          <Typography variant="h3" weight="medium">
            The Future Starts Now. Get Your Team Ready
          </Typography>
          <Typography variant="body2" weight="regular">
            Get your team future-ready with training designed to ignite productivity.
          </Typography>
        </div>
      </div>
    </div>
  )
}
