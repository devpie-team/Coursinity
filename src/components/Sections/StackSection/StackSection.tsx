'use client'

import { useEffect, useState } from 'react'
import { Typography } from '@/components/ui'
import { Button } from '@/components/primitives/button'
import Stepper from '@/components/Stepper'

import { StackCards } from './_components/StackCards/StackCards'
import { useTranslations } from 'next-intl'
import AOS from 'aos'
import 'aos/dist/aos.css'

export const StackSection = () => {
  const [isMobile, setIsMobile] = useState<boolean>(false)
  const [isTablet, setIsTablet] = useState<boolean>(false)
  const [isDesktop, setIsDesktop] = useState<boolean>(true)
  const [activeIndex, setActiveIndex] = useState(0)
  const t = useTranslations('StackSection')

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
    AOS.init()
  }, [])

  return (
    <section className="flex gap-[120px] bg-primary-purple h-[900px] pt-[130px] px-[235px] text-white overflow-hidden items-start max-[1200px]:px-[140px] max-lg:px-10 max-lg:pt-20 max-lg:h-[750px]  max-lg:gap-16 max-md:flex-col max-md:px-4 max-md:gap-10 max-md:h-[970px] ">
      {/* Slides */}
      <div className="w-1/2 relative max-lg:scale-[75%] transform order-1 max-md:order-2 max-md:translate-x-1/2">
        <StackCards activeIndex={activeIndex} setActiveIndex={setActiveIndex} />
      </div>
      {/* Right section */}
      <div className="flex flex-col gap-[210px] max-w-[410px]  relative z-40 w-1/2 max-lg:gap-[120px] justify-center h-full order-2 max-md:order-1 max-md:justify-start max-md:items-center max-md:h-[280px] max-md:w-full max-md:max-w-full max-md:text-center">
        <div className="flex flex-col gap-8 max-lg:gap-4 w-full justify-center">
          <Typography variant={isDesktop ? 'h3' : 'h5'} weight="medium" data-aos="fade">
            {t('left.title')}
          </Typography>
          <Typography variant={isDesktop ? 'body2' : 'body3'} weight="regular" data-aos="fade">
            {t('left.description')}
          </Typography>
          <Button
            variant="secondary"
            className="w-[255px] mt-4 max-md:mx-auto max-lg:w-[343px] max-[400px]:w-full max-[400px]:mt-0"
            data-aos="fade">
            {t('left.button')}
          </Button>
        </div>
        {!isMobile && (
          <div data-aos="fade" data-aos-offset="-50">
            <Stepper
              steps={3}
              activeStep={activeIndex + 1}
              onStepClick={(stepIndex) => setActiveIndex(stepIndex - 1)}
            />
          </div>
        )}
      </div>
    </section>
  )
}
