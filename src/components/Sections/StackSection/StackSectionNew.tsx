'use client'

import { useEffect, useState, useRef } from 'react'
import { Typography } from '@/components/ui'
import { Button } from '@/components/primitives/button'
import Stepper from '@/components/Stepper'

import { StackCards } from './_components/StackCards/StackCards'
import { useLocale, useTranslations } from 'next-intl'
import AOS from 'aos'
import 'aos/dist/aos.css'
import { FadeInOnView } from '@/components/FadeInOnView/FadeInOnView'
import { cn } from '@/lib/utils'

export const StackSectionNew = () => {
  const [isMobile, setIsMobile] = useState<boolean>(false)
  const [isTablet, setIsTablet] = useState<boolean>(false)
  const [isDesktop, setIsDesktop] = useState<boolean>(true)
  const [activeIndex, setActiveIndex] = useState(0)
  const [isVisible, setIsVisible] = useState(false)
  const sectionRef = useRef<HTMLDivElement>(null)
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

  // Intersection Observer для isVisible
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true)
          } else {
            setIsVisible(false)
          }
        })
      },
      {
        threshold: 0.3,
        rootMargin: '0px 0px -100px 0px'
      }
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current)
      }
    }
  }, [])

  const locale = useLocale()
  const isArabic = locale == 'ar'

  return (
    <section
      ref={sectionRef}
      className="flex gap-[120px] bg-primary-purple h-[900px] pt-[130px] px-[235px] text-white overflow-hidden items-start max-[1200px]:px-[140px] max-lg:px-10 max-lg:pt-20 max-lg:h-[650px]  max-lg:gap-16 max-md:flex-col max-md:px-4 max-md:gap-10 max-md:h-[970px] ">
      {/* Slides */}
      <div
        className={`${
          isArabic && isMobile ? 'w-full' : 'w-1/2'
        } relative max-lg:scale-[75%] transform order-1 max-md:order-2${
          isArabic && isMobile ? '' : ' max-md:translate-x-1/2'
        }`}>
        <StackCards
          activeIndex={activeIndex}
          setActiveIndex={setActiveIndex}
          isVisible={isVisible}
          setIsVisible={setIsVisible}
        />
      </div>
      {/* Right section */}
      <div className="flex flex-col gap-[210px] max-w-[410px]  relative z-40 w-1/2 max-lg:gap-[120px] justify-center h-full order-2 max-md:order-1 max-md:justify-start max-md:items-center max-md:h-[280px] max-md:w-full max-md:max-w-full max-md:text-center max-lg:justify-end pb-14">
        <div className="flex flex-col gap-8 max-lg:gap-4 w-full justify-center">
          <FadeInOnView>
            <Typography variant={isDesktop ? 'h3' : 'h5'} weight="medium">
              {t('left.title')}
            </Typography>
          </FadeInOnView>
          <FadeInOnView>
            <Typography variant={isDesktop ? 'body2' : 'body3'} weight="regular">
              {t('left.description')}
            </Typography>
          </FadeInOnView>
          <a
            href={`/${locale}/contact-form`}
            className={cn(
              'w-[285px] mt-4 max-md:mx-auto max-lg:w-[343px] max-[400px]:w-full max-[400px]:mt-0',
              isArabic ? 'w-[290px]' : 'w-[265px]'
            )}>
            <Button variant="secondary" className={cn('w-full', isArabic ? 'px-4' : '')}>
              {t('left.button')}
            </Button>
          </a>
        </div>
        {!isMobile && (
          <FadeInOnView>
            <Stepper
              steps={3}
              activeStep={activeIndex + 1}
              onStepClick={(stepIndex) => setActiveIndex(stepIndex - 1)}
            />
          </FadeInOnView>
        )}
      </div>
    </section>
  )
}
