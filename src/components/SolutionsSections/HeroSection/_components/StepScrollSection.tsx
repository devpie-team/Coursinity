'use client'

import { useEffect, useRef, useState } from 'react'
import { StepCard } from './StepCard'
import { Button } from '@/components/primitives/button'
import { Typography } from '@/components/ui'
import { useInView } from 'framer-motion'
import { useHeaderVisibility } from '@/components/Header/HeaderVisibilityContext'
import { useLocale, useTranslations } from 'next-intl'
import { FadeInOnView } from '@/components/FadeInOnView/FadeInOnView'
import './StepScrollSection.css'

const StepScroll = () => {
  const wrapperRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(wrapperRef, { once: false, amount: 0.4 })

  const [isMobile, setIsMobile] = useState(false)
  const locale = useLocale()
  useEffect(() => {
    const checkScreenSize = () => {
      const width = window.innerWidth
      setIsMobile(width < 768)
    }
    checkScreenSize()
    window.addEventListener('resize', checkScreenSize)
    return () => window.removeEventListener('resize', checkScreenSize)
  }, [])

  const { hideHeaderForSection, showHeaderForSection } = useHeaderVisibility()
  const sectionId = useRef(Math.random().toString())

  const t = useTranslations('S_StepScrollSection')
  const steps = t.raw('steps') as { title: string; description: string }[]

  const [activeStepIndex, setActiveStepIndex] = useState(0)
  const [openPercent, setOpenPercent] = useState(0)
  const [autoPlayActive, setAutoPlayActive] = useState(true)

  useEffect(() => {
    if (!isInView || !autoPlayActive || activeStepIndex >= steps.length) return

    let animationFrame: number
    let startTime: number | null = null
    const duration = 5000

    const animate = (timestamp: number) => {
      if (startTime === null) startTime = timestamp
      const elapsed = timestamp - startTime
      const progress = Math.min(elapsed / duration, 1)
      setOpenPercent(progress)

      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate)
      } else {
        const next = activeStepIndex + 1
        if (next < steps.length) {
          setActiveStepIndex(next)
          setOpenPercent(0)
        }
      }
    }

    animationFrame = requestAnimationFrame(animate)
    return () => cancelAnimationFrame(animationFrame)
  }, [isInView, autoPlayActive, activeStepIndex])

  return (
    <div
      className="relative flex flex-col bg-white rounded-[40px] mx-8 max-lg:mx-6 max-md:mx-2 py-[40px]  px-12 border border-secondary-400 gap-10 max-lg:gap-8 items-center max-md:px-4 max-md:pb-20 pt-[120px] max-lg:pt-[80px] max-lg:rounded-3xl "
      ref={wrapperRef}>
      <div className="flex flex-col gap-6 mb-5 max-w-[800px] text-center items-center">
        <FadeInOnView variant="fade-up">
          <Typography variant={isMobile ? 'h5' : 'h3'} weight="medium" className="max-w-[600px]">
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
        <div className="flex flex-col w-[470px] max-lg:w-[330px]">
          {steps.map((step, i) => (
            <StepCard
              key={i}
              title={step.title}
              description={step.description}
              number={i + 1}
              isOpen={i === activeStepIndex}
              isLast={i === steps.length - 1}
              isCompleted={i < activeStepIndex}
              openPercent={i === activeStepIndex ? openPercent : 0}
              onClick={() => {
                setActiveStepIndex(i)
                setOpenPercent(0)
              }}
            />
          ))}
        </div>

        <FadeInOnView>
          <div className="image-wrapper w-[470px] h-[470px] relative  max-lg:w-[330px] max-lg:h-[340px]">
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
        <Button
          href={`/${locale}/contact-form`}
          variant="purple"
          className="button-wrapper max-lg:w-[330px] max-md:w-[330px]">
          {t('button')}
        </Button>
      </FadeInOnView>
    </div>
  )
}

export default StepScroll
