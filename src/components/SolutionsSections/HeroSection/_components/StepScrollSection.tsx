'use client'

import { useEffect, useRef, useState, useLayoutEffect } from 'react'
import { StepCard } from './StepCard'
import { Button } from '@/components/primitives/button'
import { Typography } from '@/components/ui'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ScrollToPlugin } from 'gsap/all'
import { useHeaderVisibility } from '@/components/Header/HeaderVisibilityContext'
import { useTranslations } from 'use-intl'
import { FadeInOnView } from '@/components/FadeInOnView/FadeInOnView'

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin)

const StepScroll = () => {
  const wrapperRef = useRef<HTMLDivElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const cardRefs = useRef<(HTMLDivElement | null)[]>([])
  const timelineRef = useRef<gsap.core.Timeline | null>(null)
  const sectionId = useRef(Math.random().toString())
  const { hideHeaderForSection, showHeaderForSection } = useHeaderVisibility()
  const headerRef = useRef<HTMLDivElement>(null)

  const t = useTranslations('S_StepScrollSection')
  const steps = t.raw('steps') as { title: string; description: string }[]

  const [openStates, setOpenStates] = useState<boolean[]>(steps.map((_, i) => i === 0))
  const [activeStepIndex, setActiveStepIndex] = useState(0)
  const [isMobile, setIsMobile] = useState(false)
  const [isTablet, setIsTablet] = useState(false)
  const [isDesktop, setIsDesktop] = useState(true)
  const [headerHeight, setHeaderHeight] = useState(0)
  const scrollTriggerRef = useRef<ScrollTrigger | null>(null)

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

  useLayoutEffect(() => {
    if (headerRef.current) {
      setHeaderHeight(headerRef.current.offsetHeight)
    }
  }, [isDesktop, t])

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          hideHeaderForSection(sectionId.current)
        } else {
          showHeaderForSection(sectionId.current)
        }
      },
      { threshold: 0.1 }
    )

    const currentRef = wrapperRef.current
    if (currentRef) observer.observe(currentRef)

    return () => {
      if (currentRef) observer.unobserve(currentRef)
      showHeaderForSection(sectionId.current)
    }
  }, [hideHeaderForSection, showHeaderForSection])

  useEffect(() => {
    if (!containerRef.current) return

    const startValue = `top+=${headerHeight + 30}px top`

    const trigger = ScrollTrigger.create({
      trigger: containerRef.current,
      start: isMobile ? startValue : 'top top',
      end: `+=${150 * (steps.length - 1)}%`,
      pin: true,
      scrub: true,
      onUpdate: (self) => {
        const idx = Math.round(self.progress * (steps.length - 1))
        setActiveStepIndex(idx)
        setOpenStates((prev) => prev.map((_, i) => i === idx))
      }
    })

    scrollTriggerRef.current = trigger

    return () => {
      trigger.kill()
    }
  }, [isDesktop, isMobile, steps.length, headerHeight])

  return (
    <div ref={wrapperRef} className="bg-[repeating-linear-gradient(180deg,_#A578F2_-10%,_#F9FAFB_100%)]">
      <div
        ref={containerRef}
        className="flex flex-col bg-white rounded-[40px] max-md:rounded-3xl max-md:mx-2 mx-8 py-[40px] border border-secondary-400 gap-10 items-center max-lg:gap-0 max-md:gap-8 min-h-[100vh] max-md:px-4 max-md:pb-20 justify-center">
        <div
          ref={headerRef}
          className="flex flex-col gap-6 mb-5 max-w-[800px] text-center max-lg:mb-10 max-lg:max-w-[690px] max-md:mb-0">
          <FadeInOnView variant="fade-up">
            <Typography variant={isDesktop ? 'h3' : 'h5'} weight="medium">
              {t('heading')}
            </Typography>
          </FadeInOnView>
          <FadeInOnView variant="fade-up">
            <Typography variant="body3" weight="regular" className="text-description">
              {t('description')}
            </Typography>
          </FadeInOnView>
        </div>

        <div className="flex gap-5 max-md:flex-col max-md:gap-0">
          <div className="flex flex-col w-[470px] text-start max-lg:w-[330px]">
            {steps.map((step, i) => (
              <StepCard
                key={i}
                title={step.title}
                description={step.description}
                number={i + 1}
                isOpen={openStates[i]}
                isLast={i === steps.length - 1}
                isCompleted={i < activeStepIndex}
                ref={(el) => {
                  cardRefs.current[i] = el
                }}
                onClick={() => {
                  setActiveStepIndex(i)
                  setOpenStates(steps.map((_, idx) => idx === i))

                  const total = steps.length - 1
                  const targetProgress = i / total

                  const st = scrollTriggerRef.current
                  if (st) {
                    const scroll = gsap.utils.interpolate(st.start, st.end, targetProgress)
                    gsap.killTweensOf(window)
                    gsap.to(window, {
                      scrollTo: scroll,
                      duration: 1,
                      ease: 'power2.out'
                    })
                  }
                }}
              />
            ))}
          </div>

          <FadeInOnView>
            <div className="w-[470px] h-[470px] relative overflow-hidden max-lg:w-[330px] max-lg:h-[340px]">
              {steps.map((_, i) => (
                <img
                  key={i}
                  src={`/assets/solutions/hero_section/hero_section_${i + 1}.png`}
                  alt={`hero_section_${i + 1}`}
                  className={`absolute inset-0 object-contain transition-opacity duration-700 ease-in-out ${
                    i === activeStepIndex ? 'opacity-100' : 'opacity-0'
                  }`}
                />
              ))}
            </div>
          </FadeInOnView>
        </div>

        <FadeInOnView>
          <Button variant="purple" className="max-lg:w-[330px] max-md:w-[330px]">
            {t('button')}
          </Button>
        </FadeInOnView>
      </div>
    </div>
  )
}

export default StepScroll
