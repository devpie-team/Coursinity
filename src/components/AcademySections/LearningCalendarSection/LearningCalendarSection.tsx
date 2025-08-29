'use client'

import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

import { Button } from '@/components/primitives/button'
import { Typography } from '@/components/ui'
import { Card } from './components/Card/Card'

import { useLocale } from 'next-intl'
import { useHeaderVisibility } from '@/components/Header/HeaderVisibilityContext'
import { CardSession } from './components/CardSession/CardSession'

gsap.registerPlugin(ScrollTrigger)

type CardImageItem = {
  variant: 'image'
  className?: string
  title: string
  imageSrc: string
  imageAlt?: string
}

type CardSessionItem = {
  variant: 'session'
  className?: string
  title: string
  subtitle: string
  meta?: string
  cta?: string
}

type CardItem = CardImageItem | CardSessionItem

export const LearningCalendarSection = () => {
  const sectionRef = useRef<HTMLElement | null>(null)
  const [isDesktop, setIsDesktop] = useState(true)
  const locale = useLocale()
  const { hideHeaderForSection, showHeaderForSection } = useHeaderVisibility()
  const sectionId = useRef(Math.random().toString())

  useEffect(() => {
    const check = () => setIsDesktop(window.innerWidth > 1024)
    check()
    window.addEventListener('resize', check)
    return () => window.removeEventListener('resize', check)
  }, [])

  const cards: readonly CardItem[] = [
    {
      variant: 'image',
      className: 'z-10',
      title: 'Transform Newcomers into Next-Gen Leaders',
      imageSrc: '/assets/academy/learning/learning_1.png',
      imageAlt: 'Learning card 1'
    },
    {
      variant: 'image',
      className: 'z-20',
      title: 'On-the-Job Skills, On Your Schedule',
      imageSrc: '/assets/academy/learning/learning_2.png',
      imageAlt: 'Learning card 2'
    },
    {
      variant: 'image',
      className: 'z-30',
      title: 'Auto-Reminders That Keep Teams Moving',
      imageSrc: '/assets/academy/learning/learning_3.png',
      imageAlt: 'Learning card 3'
    },
    // 4-та — особлива (без зображення)
    {
      variant: 'session',
      className: 'z-40',
      title: 'Online Session',
      subtitle: 'Mon, 7 January',
      meta: 'Via Calendar',
      cta: 'Set a reminder'
    },
    {
      variant: 'image',
      className: 'z-50',
      title: 'Fuel Excellence with Continuous Growth',
      imageSrc: '/assets/academy/learning/learning_4.png',
      imageAlt: 'Learning card 5'
    }
  ] as const

  useEffect(() => {
    if (!sectionRef.current) return

    const STEP_PX = 700
    const X_START = 60

    const ctx = gsap.context(() => {
      const elems = gsap.utils.toArray<HTMLElement>('.lc-card')
      const n = elems.length
      const TOTAL_SCROLL = Math.max(0, (n - 1) * STEP_PX)

      const angleMap = [0, -5, -10, -13, -15]
      const yMap = [0, 5, 10, 20, 30]
      const xMap = [0, 10, 20, 30, 40]

      gsap.set(elems, {
        autoAlpha: 0,
        xPercent: X_START,
        rotation: 0,
        x: 0,
        y: 0,
        transformOrigin: '50% 50%'
      })
      if (elems[0]) {
        gsap.set(elems[0], { xPercent: 0, autoAlpha: 1 })
      }

      let currentStep = 0
      let exitingIndex: number | null = null

      ScrollTrigger.create({
        trigger: sectionRef.current!,
        start: 'top top',
        end: `+=${TOTAL_SCROLL}`,
        pin: true,
        scrub: true,
        anticipatePin: 1,

        onEnter: () => hideHeaderForSection(sectionId.current),
        onEnterBack: () => hideHeaderForSection(sectionId.current),
        onLeave: () => showHeaderForSection(sectionId.current),
        onLeaveBack: () => showHeaderForSection(sectionId.current),
        onRefresh: (self) => {
          if (self.isActive) hideHeaderForSection(sectionId.current)
          else showHeaderForSection(sectionId.current)
        },

        onUpdate: (self) => {
          const px = self.progress * TOTAL_SCROLL
          const step = TOTAL_SCROLL === 0 ? 0 : Math.min(n - 1, Math.floor(px / STEP_PX))
          if (step === currentStep) return

          const prev = currentStep
          currentStep = step

          if (prev === -1 || step > prev) {
            exitingIndex = null
            gsap.fromTo(
              elems[step],
              { xPercent: X_START, autoAlpha: 0 },
              { xPercent: 0, autoAlpha: 1, duration: 0.6, ease: 'power3.out', overwrite: 'auto' }
            )
          } else if (step < prev) {
            exitingIndex = prev
            gsap.to(elems[prev], {
              xPercent: X_START,
              autoAlpha: 0,
              duration: 0.6,
              ease: 'power3.inOut',
              overwrite: 'auto',
              onComplete: () => {
                if (exitingIndex === prev) exitingIndex = null
              }
            })
          }

          for (let idx = 0; idx < n; idx++) {
            if (idx === exitingIndex) continue
            const offset = step - idx
            const mi = Math.min(Math.max(offset, 0), angleMap.length - 1)

            gsap.to(elems[idx], {
              rotation: offset >= 0 ? angleMap[mi] : 0,
              x: offset >= 0 ? -xMap[mi] : 0,
              y: offset >= 0 ? yMap[mi] : 0,
              autoAlpha: idx < step ? 0.5 : idx === step ? 1 : 0,
              duration: 0.35,
              ease: 'power1.out',
              overwrite: 'auto'
            })
          }
        }
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [hideHeaderForSection, showHeaderForSection])

  return (
    <section
      ref={sectionRef}
      className="mt-[120px] flex flex-col bg-black py-[120px] h-[100vh] justify-between items-center text-center relative overflow-hidden p-4 max-lg:pt-[80px] max-lg:pb-[80px]">
      <div className="flex flex-col gap-8 max-lg:gap-6 max-md:max-w-[280px] ">
        <Typography variant={isDesktop ? 'h3' : 'h5'} weight="medium" className="text-white">
          Put Learning on Your Clock
        </Typography>
        <Typography variant="body3" weight="regular" className="text-white/70">
          One Calendar. Unlimited Growth
        </Typography>
      </div>

      <div className="relative flex justify-center items-center w-full h-full">
        {cards.map((card, i) =>
          card.variant === 'image' ? (
            <Card
              key={i}
              className={`lc-card absolute ${card.className ?? ''}`}
              title={card.title}
              imageSrc={card.imageSrc}
              imageAlt={card.imageAlt}
            />
          ) : (
            <CardSession
              key={i}
              className={`lc-card absolute ${card.className ?? ''}`}
              title={card.title}
              subtitle={card.subtitle}
              meta={card.meta}
              cta={card.cta}
            />
          )
        )}
      </div>

      <Button variant="academy" className="max-md:w-full">
        Develop your team's skills
      </Button>
    </section>
  )
}
