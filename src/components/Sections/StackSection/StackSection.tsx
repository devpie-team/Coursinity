'use client'

import { useEffect, useRef, useState } from 'react'
import { Typography } from '@/components/ui'
import { Button } from '@/components/primitives/button'
import Stepper from '@/components/Stepper'
import { StackCards } from './_components/StackCards/StackCards'
import { useLocale, useTranslations } from 'next-intl'
import AOS from 'aos'
import 'aos/dist/aos.css'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useHeaderVisibility } from '@/components/Header/HeaderVisibilityContext'

gsap.registerPlugin(ScrollTrigger)

export function useMediaBreakpoints() {
  const getBp = () => {
    if (typeof window === 'undefined') return 'desktop'
    if (window.matchMedia('(max-width: 767px)').matches) return 'mobile'
    if (window.matchMedia('(min-width: 1025px)').matches) return 'desktop'
    return 'tablet'
  }

  const [bp, setBp] = useState(getBp)
  const [isLowScreen, setIsLowScreen] = useState(() => {
    if (typeof window === 'undefined') return false
    return window.innerHeight < 850
  })

  useEffect(() => {
    const mMobile = window.matchMedia('(max-width: 767px)')
    const mDesktop = window.matchMedia('(min-width: 1025px)')

    const check = () => {
      if (mMobile.matches) setBp('mobile')
      else if (mDesktop.matches) setBp('desktop')
      else setBp('tablet')
      setIsLowScreen(window.innerHeight < 850)
    }

    mMobile.addEventListener('change', check)
    mDesktop.addEventListener('change', check)
    window.addEventListener('resize', check)

    // for initial mount
    check()

    return () => {
      mMobile.removeEventListener('change', check)
      mDesktop.removeEventListener('change', check)
      window.removeEventListener('resize', check)
    }
  }, [])

  return {
    isMobile: bp === 'mobile',
    isTablet: bp === 'tablet',
    isDesktop: bp === 'desktop',
    isLowScreen
  }
}

export const StackSection = () => {
  const [activeIndex, setActiveIndex] = useState(0)

  const [isVisible, setIsVisible] = useState(false)
  const sectionRef = useRef<HTMLDivElement>(null)
  const t = useTranslations('StackSection')
  const locale = useLocale()
  const isArabic = locale == 'ar'

  // Responsive state (simplified, can keep your useState version if you want)
  const [windowWidth, setWindowWidth] = useState<number>(0)
  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth)
    handleResize()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  const isMobile = windowWidth < 768
  const isDesktop = windowWidth > 1024

  const { isMobile: isMobileAnimation, isLowScreen } = useMediaBreakpoints()

  useEffect(() => {
    AOS.init()

    if (!sectionRef.current) return

    const ctx = gsap.context(() => {
      const steps = 3
      const triggerLength = window.innerHeight * steps

      ScrollTrigger.create({
        anticipatePin: 1,
        trigger: sectionRef.current,
        start: isLowScreen || isMobileAnimation ? 'bottom bottom' : 'top top',
        end: `+=${triggerLength}`,
        pin: true,
        scrub: 1,
        fastScrollEnd: false,
        onEnter: () => setActiveIndex(0),
        onEnterBack: () => setActiveIndex(0),
        onLeave: () => setActiveIndex(2),
        onLeaveBack: () => setActiveIndex(0),
        onUpdate: (self) => {
          const progress = self.progress
          if (progress < 0.33) {
            setActiveIndex(0)
          } else if (progress < 0.66) {
            setActiveIndex(1)
          } else {
            setActiveIndex(2)
          }
        }
      })
    }, sectionRef)

    return () => {
      ctx.revert()
    }
  }, [isMobileAnimation, isLowScreen])

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
  const { hideHeaderForSection, showHeaderForSection } = useHeaderVisibility()
  const sectionId = useRef(Math.random()?.toString())

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          hideHeaderForSection(sectionId.current)
        } else {
          showHeaderForSection(sectionId.current)
        }
      },
      { threshold: 0.5 }
    )
    if (sectionRef.current) observer.observe(sectionRef.current)
    return () => {
      if (sectionRef.current) observer.unobserve(sectionRef.current)
      showHeaderForSection(sectionId.current)
    }
  }, [])

  return (
    <section
      ref={sectionRef}
      className="relative flex gap-[120px] bg-primary-purple pt-[120px] px-[235px] text-white overflow-hidden items-start max-[1200px]:px-[140px] max-lg:px-10 max-lg:pt-20  h-[900px] max-lg:h-[650px] max-lg:gap-16 max-md:flex-col max-md:px-4 max-md:gap-10 max-md:h-[970px]">
      {/* Slides */}
      <div
        className={`${
          isArabic && isMobile ? 'w-full' : 'w-1/2'
        } relative max-lg:scale-[75%] transform order-1 max-md:order-2${
          isArabic && isMobile ? '' : ' max-md:translate-x-1/2'
        }`}>
        <StackCards activeIndex={activeIndex} setActiveIndex={setActiveIndex} isVisible={isVisible} />
      </div>
      {/* Right section */}
      <div
        className="flex flex-col gap-[210px] max-w-[410px]  relative z-40 w-1/2 max-lg:gap-[120px] justify-center h-full order-2 max-md:order-1 max-md:justify-start max-md:items-center max-md:h-[280px] max-md:w-full max-md:max-w-full max-md:text-center max-lg:justify-end pb-14"
        style={{
          opacity: isVisible ? 1 : 0,
          transition: 'opacity 800ms cubic-bezier(0.4, 0, 0.2, 1)',
          transitionDelay: isVisible ? '400ms' : '0ms'
        }}>
        <div className="flex flex-col gap-8 max-lg:gap-4 w-full justify-center">
          <Typography variant={isDesktop ? 'h3' : 'h5'} weight="medium">
            {t('left.title')}
          </Typography>
          <Typography variant={isDesktop ? 'body2' : 'body3'} weight="regular">
            {t('left.description')}
          </Typography>
          <Button
            variant="secondary"
            className="w-[255px] mt-4 max-md:mx-auto max-lg:w-[343px] max-[400px]:w-full max-[400px]:mt-0">
            {t('left.button')}
          </Button>
        </div>
        {/* {!isMobile && (
          <div>
            <Stepper
              steps={3}
              activeStep={activeIndex + 1}
              onStepClick={(stepIndex) => {
                setActiveIndexForced(stepIndex - 1)
                setActiveIndex(stepIndex - 1)
              }}
            />
          </div>
        )} */}
      </div>
    </section>
  )
}
