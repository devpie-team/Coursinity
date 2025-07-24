'use client'

import { useLocale, useTranslations } from 'next-intl'

import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useEffect, useState } from 'react'
import TypingLoopText from './_components/TypingLoopText'
import { Typography } from '@/components/ui'
import { Button } from '@/components/primitives/button'

gsap.registerPlugin(ScrollTrigger)

type THeroSection = {
  loading: boolean
}

export const HeroSection = ({ loading }: THeroSection) => {
  const locale = useLocale()
  const isArabic = locale == 'ar'
  const [isMobile, setIsMobile] = useState(false)
  const [isTablet, setIsTablet] = useState(false)
  const [isDesktop, setIsDesktop] = useState(true)
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

  return (
    <section className="h-[2300px] bg-[linear-gradient(180deg,_#F9FAFB_0%,_#A578F2_57.98%,_#F9FAFB_100%)] pt-[180px]">
      <div className="flex flex-col justify-center items-center  gap-8">
        <div className="flex flex-col gap-4 justify-center items-center">
          <div className="flex gap-2 items-center">
            <Typography variant="h1" weight="medium">
              Train
            </Typography>
            <div></div>
            <TypingLoopText />
            <Typography variant="h1" weight="medium">
              with
            </Typography>
          </div>
          <Typography variant="h1" weight="medium">
            Team-centric Solutions
          </Typography>
        </div>
        <Typography variant="body2" weight="medium">
          Programs designed for your organization’s goals and your team's daily needs.
        </Typography>
        <Button variant="primary" className="mt-4">
          Book a Demo
        </Button>
      </div>
    </section>
  )
}
