'use client'

import { Button } from '@/components/primitives/button'
import { Typography } from '@/components/ui'
import React, { useEffect, useRef, useState } from 'react'
import { ExpandableCard } from './_components/ExpandableCard'
import { EducationProperty5Icon } from '@/components/icons/EducationProperty5Icon'
import { BookCheckIcon } from '@/components/icons/BookCheckIcon'
import { BriefCaseIcon } from '@/components/icons/BriefCaseIcon'
import { EducationProperty2Icon } from '@/components/icons/EducationProperty2Icon'
import { GamingPadIcon } from '@/components/icons/GamingPadIcon'
import DiplomaIcon from '@/components/icons/DiplomaIcon'
import { useTranslations } from 'next-intl'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useHeaderVisibility } from '@/components/Header/HeaderVisibilityContext'
import AOS from 'aos'
import 'aos/dist/aos.css'

const benefits = [
  { icon: <GamingPadIcon /> },
  { icon: <EducationProperty2Icon /> },
  { icon: <BriefCaseIcon /> },
  { icon: <BookCheckIcon /> },
  { icon: <EducationProperty5Icon /> },
  { icon: <DiplomaIcon fill="primary-blue" /> }
]

export const InspirationSection = () => {
  const t = useTranslations('InspirationSection')
  gsap.registerPlugin(ScrollTrigger)
  const sectionRef = useRef<HTMLDivElement | null>(null)

  const cardRefs = useRef<Array<HTMLDivElement | null>>([])
  const [openStates, setOpenStates] = useState<boolean[]>(() => benefits.map((_, idx) => idx === 0))

  const [isMobile, setIsMobile] = useState<boolean>(false)
  const [isTablet, setIsTablet] = useState<boolean>(false)
  const [isDesktop, setIsDesktop] = useState<boolean>(true)
  const [isVisible, setIsVisible] = useState<boolean>(false)
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

  // Custom intersection observer for repetitive opacity animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true)
          } else {
            // Reset when leaving viewport so animation can repeat
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

  const CLOSED_HEIGHT = 56
  const open_height = 200
  const iconSize = isDesktop ? '32px' : '24px'

  function setOpenOnly(idx: number) {
    setOpenStates((states) => states.map((_, i) => i === idx))
  }
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
      showHeaderForSection(sectionId.current) // На всякий случай
    }
  }, [])

  useEffect(() => {
    if (isMobile) {
      AOS.init({
        duration: 800,
        easing: 'ease-in-out'
      })
    }
  }, [isMobile])

  useEffect(() => {
    if (!sectionRef.current || isMobile) return

    cardRefs.current.forEach((card, idx) => {
      if (card) gsap.set(card, { height: idx === 0 ? open_height : CLOSED_HEIGHT })
    })

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top top',
        end: '+=' + 100 * benefits.length + '%',
        pin: true,
        scrub: true,
        invalidateOnRefresh: true
      }
    })

    benefits.forEach((_, i) => {
      if (cardRefs.current[i + 1]) {
        const label = `switch-${i}`
        tl.addLabel(label)
        tl.to(
          cardRefs.current[i],
          {
            height: CLOSED_HEIGHT,
            onStart: () => setOpenOnly(i + 1),
            onReverseComplete: () => setOpenOnly(i)
          },
          label
        )
        tl.to(
          cardRefs.current[i + 1],
          {
            height: open_height
          },
          label
        )
      }
    })

    return () => {
      tl.scrollTrigger?.kill()
      tl.kill()
    }
  }, [isMobile])

  if (isMobile) {
    return (
      <section ref={sectionRef} className="flex bg-black py-20 px-6 gap-8 items-center justify-center flex-col">
        <div className="max-w-[270px] shrink flex flex-col gap-4" data-aos="fade" data-aos-offset="-50">
          <Typography variant="h5" weight="medium" className="text-white">
            {t('title')}
          </Typography>
          <Typography variant="body3" weight="regular" className="text-white opacity-80">
            {t('description')}
          </Typography>
        </div>
        <div className="flex flex-col gap-[10px] border border-white border-opacity-15 p-6 rounded-3xl w-full max-w-[343px]">
          {benefits.map((item, idx) => (
            <div key={t(`benefits.${idx}.title`)} data-aos="fade-up " data-aos-offset="-30">
              <ExpandableCard
                title={t(`benefits.${idx}.title`)}
                description={t(`benefits.${idx}.description`)}
                icon={React.cloneElement(item.icon, { size: '24px' })}
                innerRef={(el) => {
                  cardRefs.current[idx] = el
                }}
                isOpen={true}
                closedHeight={CLOSED_HEIGHT}
                openHeight={open_height}
              />
            </div>
          ))}
        </div>
        <div className="flex flex-col gap-6 text-center" data-aos="fade" data-aos-offset="-50">
          <Typography variant="body3" weight="medium" className="text-white">
            {t('successMetric')}
          </Typography>
          <Button variant="purple" className="w-[343px]">
            {t('learnMore')}
          </Button>
        </div>
      </section>
    )
  }

  return (
    <section
      ref={sectionRef}
      className="flex bg-black h-[100vh] p-[140px] gap-20 max-[1300px]:p-10 items-center justify-center max-lg:gap-8 max-lg:px-6 max-md:px-4">
      <div
        className="max-w-[270px] shrink max-[1150px]:hidden"
        style={
          isDesktop
            ? {
                opacity: isVisible ? 1 : 0,
                transition: 'opacity 800ms cubic-bezier(0.4, 0, 0.2, 1)',
                transitionDelay: isVisible ? '0ms' : '0ms'
              }
            : {}
        }>
        <Typography variant={isDesktop ? 'h3' : 'h5'} weight="medium" className="text-white">
          {t('title')}
        </Typography>
      </div>
      <div
        className="flex flex-col gap-[10px] border border-white border-opacity-15 p-6 rounded-3xl min-w-[440px] max-w-[500px] flex-1 max-md:min-w-[343px] max-md:max-w-[343px] order-1 max-[1150px]:order-2 max-lg:max-w-[343px] max-lg:min-w-[343px]"
        style={
          isDesktop
            ? {
                opacity: isVisible ? 1 : 0,
                transition: 'opacity 800ms cubic-bezier(0.4, 0, 0.2, 1)',
                transitionDelay: isVisible ? '200ms' : '0ms'
              }
            : {}
        }>
        {benefits.map((item, idx) => (
          <ExpandableCard
            key={t(`benefits.${idx}.title`)}
            title={t(`benefits.${idx}.title`)}
            description={t(`benefits.${idx}.description`)}
            icon={React.cloneElement(item.icon, { size: iconSize })}
            innerRef={(el) => {
              cardRefs.current[idx] = el
            }}
            isOpen={openStates[idx]}
            closedHeight={CLOSED_HEIGHT}
            openHeight={open_height}
          />
        ))}
      </div>
      <div
        className="flex flex-col gap-8 max-w-[270px] shrink order-2 max-[1150px]:order-1 max-lg:max-w-full w-full"
        style={
          isDesktop
            ? {
                opacity: isVisible ? 1 : 0,
                transition: 'opacity 800ms cubic-bezier(0.4, 0, 0.2, 1)',
                transitionDelay: isVisible ? '400ms' : '0ms'
              }
            : {}
        }>
        <div className=" shrink min-[1150px]:hidden ">
          <Typography variant={isDesktop ? 'h3' : 'h5'} weight="medium" className="text-white">
            {t('title')}
          </Typography>
        </div>
        <Typography variant="body3" weight="regular" className="text-white opacity-80">
          {t('description')}
        </Typography>
        <Typography variant="body3" weight="medium" className="text-white">
          {t('successMetric')}
        </Typography>
        <Button variant="purple" className="max-lg:w-[253px] max-md:w-full">
          {t('learnMore')}
        </Button>
      </div>
    </section>
  )
}
