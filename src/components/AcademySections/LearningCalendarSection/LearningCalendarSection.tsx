'use client'

import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

import { Button } from '@/components/primitives/button'
import { Typography } from '@/components/ui'
import { Card } from './components/Card/Card'
import { useLocale } from 'next-intl'
import { useHeaderVisibility } from '@/components/Header/HeaderVisibilityContext' // ⬅️

gsap.registerPlugin(ScrollTrigger)

export const LearningCalendarSection = () => {
  const sectionRef = useRef<HTMLElement | null>(null)
  const [isMobile, setIsMobile] = useState(false)
  const [isTablet, setIsTablet] = useState(false)
  const [isDesktop, setIsDesktop] = useState(true)
  const locale = useLocale()
  const isArabic = locale === 'ar'

  const { hideHeaderForSection, showHeaderForSection } = useHeaderVisibility()
  const sectionId = useRef(Math.random().toString())

  useEffect(() => {
    const el = sectionRef.current
    if (!el) return

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          hideHeaderForSection(sectionId.current)
        } else {
          showHeaderForSection(sectionId.current)
        }
      },
      { threshold: 0.1 }
    )

    io.observe(el)
    return () => {
      io.disconnect()
      showHeaderForSection(sectionId.current)
    }
  }, [hideHeaderForSection, showHeaderForSection])

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

  const cards = [
    {
      className: ' top-[280px] z-10 max-md:top-[230px]',
      title: 'Transform Newcomers into Next-Gen Leaders',
      imageSrc: '/assets/academy/learning/learning_1.png',
      imageAlt: 'Learning card 1'
    },
    {
      className: ' top-[280px] z-20 max-md:top-[230px]',
      title: 'On-the-Job Skills, On Your Schedule',
      imageSrc: '/assets/academy/learning/learning_2.png',
      imageAlt: 'Learning card 2'
    },
    {
      className: 'top-[280px] z-30 max-md:top-[230px]',
      title: 'Auto-Reminders That Keep Teams Moving',
      imageSrc: '/assets/academy/learning/learning_3.png',
      imageAlt: 'Learning card 3'
    },
    {
      className: ' top-[280px] z-40 max-md:top-[230px]',
      title: 'Track Progress Across Departments',
      imageSrc: '/assets/academy/learning/learning_4.png',
      imageAlt: 'Learning card 4'
    },
    {
      className: ' top-[280px] z-50 max-md:top-[230px]',
      title: 'Add to Calendar in One Click',
      imageSrc: '/assets/academy/learning/learning_4.png',
      imageAlt: 'Learning card 5'
    }
  ] as const

  useEffect(() => {
    if (!sectionRef.current) return

    const ctx = gsap.context(() => {
      const elems = gsap.utils.toArray<HTMLElement>('.lc-card')
      const n = elems.length

      const angleMap = [0, -5, -10, -13, -15]
      const yMap = [0, 5, 10, 20, 30]
      const xMap = [0, 10, 20, 30, 40] // вліво, застосуємо зі знаком «-»

      // старт: усі картки приховані та зсунуто праворуч
      gsap.set(elems, {
        autoAlpha: 0,
        xPercent: 60,
        rotation: 0,
        x: 0,
        y: 0,
        transformOrigin: '50% 50%'
      })

      // TL з pin+scrub; тут ДОДАВ onEnter/onLeave для синхронізації хедера з pin-станом
      const tl = gsap.timeline({
        defaults: { ease: 'power3.out', duration: 1 },
        scrollTrigger: {
          trigger: sectionRef.current!,
          start: 'top top',
          end: () => '+=' + window.innerHeight * n,
          pin: true,
          scrub: true,
          anticipatePin: 1,
          // markers: true,
          onEnter: () => hideHeaderForSection(sectionId.current),
          onEnterBack: () => hideHeaderForSection(sectionId.current),
          onLeave: () => showHeaderForSection(sectionId.current),
          onLeaveBack: () => showHeaderForSection(sectionId.current),
          onUpdate: (self) => {
            const step = Math.min(n - 1, Math.floor(self.progress * n + 1e-6))
            // плавно оновлюємо ТІЛЬКИ rotation/x/y
            for (let idx = 0; idx < n; idx++) {
              const offset = step - idx
              const deg = offset >= 0 ? angleMap[Math.min(offset, angleMap.length - 1)] : 0
              const yOff = offset >= 0 ? yMap[Math.min(offset, yMap.length - 1)] : 0
              const xOff = offset >= 0 ? -xMap[Math.min(offset, xMap.length - 1)] : 0

              gsap.to(elems[idx], {
                rotation: deg,
                y: yOff,
                x: xOff,
                duration: 0.35,
                ease: 'none',
                overwrite: 'auto'
              })
            }
          }
        }
      })

      // поява кожної картки (справа -> центр)
      elems.forEach((el, i) => {
        tl.to(el, { xPercent: 0, autoAlpha: 1 }, i)
      })

      // симетрична логіка прозорості (як домовлялись)
      const lastApplied = new Array(n).fill(undefined) as (number | undefined)[]
      ScrollTrigger.create({
        trigger: sectionRef.current!,
        start: 'top top',
        end: () => '+=' + window.innerHeight * n,
        scrub: true,
        onUpdate: () => {
          const t = tl.time()
          let lastFinished = Math.floor(t) - 1
          lastFinished = Math.max(-1, Math.min(n - 1, lastFinished))
          const enteringIdx = lastFinished + 1

          for (let idx = 0; idx < n; idx++) {
            if (idx === enteringIdx && t < idx + 1) continue
            let targetAlpha: number
            if (idx < lastFinished) targetAlpha = 0.5
            else if (idx === lastFinished) targetAlpha = 1
            else targetAlpha = 0

            if (lastApplied[idx] !== targetAlpha) {
              lastApplied[idx] = targetAlpha
              gsap.to(elems[idx], {
                autoAlpha: targetAlpha,
                duration: 0.25,
                ease: 'power1.out',
                overwrite: 'auto'
              })
            }
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

      {cards.map(({ className, ...rest }, i) => (
        <Card key={i} className={`lc-card ${className}`} {...rest} />
      ))}

      <Button variant="academy" className="w-[240px] max-md:w-full">
        Develop your team's skills
      </Button>
    </section>
  )
}
