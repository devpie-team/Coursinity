'use client'

import { useEffect, useRef, useState } from 'react'
import { StepCard } from './StepCard'
import { Button } from '@/components/primitives/button'
import { Typography } from '@/components/ui'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ScrollToPlugin } from 'gsap/all'

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin)

const steps = [
  {
    title: 'Focus on Your Goals',
    description: 'Training solution aimed at your business objectives',
    image: '/assets/solutions/hero_section/hero_section_1.png'
  },
  {
    title: 'Learn From Experts',
    description: 'Job-ready skills from content created by industry experts.',
    image: '/assets/solutions/hero_section/hero_section_2.png'
  },
  {
    title: 'Fit Your Structure',
    description: 'Use custom platforms and learning paths designed to match how you operate',
    image: '/assets/solutions/hero_section/hero_section_3.png'
  },
  {
    title: 'Track Real Results',
    description: 'See your progress with clear reporting',
    image: '/assets/solutions/hero_section/hero_section_4.png'
  }
]

const StepScroll = () => {
  const containerRef = useRef<HTMLDivElement>(null)
  const cardRefs = useRef<(HTMLDivElement | null)[]>([])
  const timelineRef = useRef<gsap.core.Timeline | null>(null)
  const [openStates, setOpenStates] = useState<boolean[]>(steps.map((_, i) => i === 0))
  const [activeStepIndex, setActiveStepIndex] = useState(0)
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
  const CLOSED_HEIGHT = 86

  useEffect(() => {
    if (!containerRef.current) return

    const OPEN_HEIGHT = isDesktop ? 150 : 120 // поміщаємо всередину, щоб завжди було актуальне

    cardRefs.current.forEach((card, idx) => {
      if (card) gsap.set(card, { height: idx === 0 ? OPEN_HEIGHT : CLOSED_HEIGHT })
    })

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: isTablet ? 'top top' : 'top+=100 top',
        end: `+=${150 * (steps.length - 1)}%`,
        pin: true,
        scrub: true
      }
    })
    timelineRef.current = tl

    for (let i = 0; i < steps.length - 1; i++) {
      const next = i + 1
      const label = `step-${i}`
      tl.addLabel(label)

      tl.to(
        {},
        {
          duration: 1,
          onUpdate: () => {
            const idx = Math.round(tl.progress() * (steps.length - 1))
            setActiveStepIndex(idx)
            setOpenStates((prev) => prev.map((_, i) => i === idx))
          }
        },
        label
      )

      tl.to(cardRefs.current[i], { height: CLOSED_HEIGHT }, label)
      tl.to(cardRefs.current[next], { height: OPEN_HEIGHT }, label)
    }

    return () => {
      tl.scrollTrigger?.kill()
      tl.kill()
    }
  }, [isDesktop])

  return (
    <div
      className="flex flex-col bg-white rounded-[40px] mx-8 py-[120px] border border-secondary-400 gap-10 items-center max-lg:gap-0 max-md:gap-8"
      ref={containerRef}>
      <div className="flex flex-col gap-6 mb-5 max-w-[800px] text-center max-lg:mb-10 max-lg:max-w-[690px] max-md:mb-0">
        <Typography variant={isDesktop ? 'h3' : 'h5'} weight="medium">
          Not Off-the-Shelf, Just Off-the-Charts Solutions
        </Typography>
        <Typography variant="body3" weight="regular" className="text-description">
          Forget generic programs—get training built around your strategy and team. Take full control over the entire
          design of your training organization's solutions. Choose the topics, target the right teams, and deliver it
          your way for maximum impact.
        </Typography>
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

                const st = timelineRef.current?.scrollTrigger
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

        <div className="w-[470px] h-[470px] relative overflow-hidden max-lg:w-[330px] max-lg:h-[330px]">
          {steps.map((step, i) => (
            <img
              key={i}
              src={step.image}
              alt={`hero_section_${i + 1}`}
              className={`absolute inset-0 object-contain transition-opacity duration-700 ease-in-out ${
                i === activeStepIndex ? 'opacity-100' : 'opacity-0'
              }`}
            />
          ))}
        </div>
      </div>

      <Button variant="purple" className="max-lg:w-[330px] max-md:w-full">
        Discuss Your Training Needs
      </Button>
    </div>
  )
}

export default StepScroll
