'use client'

import { useEffect, useState } from 'react'
import { useSwipeable } from 'react-swipeable'
import { Typography } from '@/components/ui'
import { Button } from '@/components/primitives/button'
import Stepper from '@/components/Stepper'
import { GrowthSlide } from './_components/GrowthSlide'
import { SwipeStepper } from '@/components/SwipeStepper/SwipeStepper'
import { useLocale, useTranslations } from 'next-intl'
import AOS from 'aos'
import 'aos/dist/aos.css'
import { FadeInOnView } from '@/components/FadeInOnView/FadeInOnView'
import { ChevronLeftIcon } from '@/components/icons/ChevronLeftIcon'
import { cn } from '@/lib/utils'

export const GrowthStepSection = () => {
  const t = useTranslations('GrowthStepSection')

  const [activeIndex, setActiveIndex] = useState(0)
  const [isMobile, setIsMobile] = useState(false)
  const [isTablet, setIsTablet] = useState(false)
  const [isDesktop, setIsDesktop] = useState(true)
  const [detailsShownFor, setDetailsShownFor] = useState<Set<number>>(new Set())

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
  const locale = useLocale()
  const isArabic = locale == 'ar'

  useEffect(() => {
    AOS.init()
  }, [])

  const getStepperIndex = (index: number) => index + 1

  const slideImages = [
    {
      image: isArabic ? '/assets/growth/growth_1_ar.png' : '/assets/growth/growth_1_en.png',
      imageClasses: 'absolute top-[-60px] max-lg:top-[20px] max-lg:scale-[1.4] w-[100%]   '
    },
    {
      image: '/assets/growth/growth_2.png',
      imageClasses: ' h-[300px] w-[300px] max-lg:h-[250px] max-md:h-[220px]'
    },
    {
      image: '/assets/growth/growth_3.png',
      imageClasses: '-translate-x-[20px] translate-y-[30px] h-[270px] w-[500px] max-lg:h-[220px]'
    }
  ]

  const rawSlides = t.raw('slides')
  const slides = Array.isArray(rawSlides) ? rawSlides : []

  const mergedSlides = slides.map((slide, index) => ({
    id: slide.id,
    title: slide.title,
    bullets: slide.items,
    ...slideImages[index]
  }))

  const handleClick = (index: number, position: 'left' | 'right' | 'center') => {
    if (!isDesktop && position === 'center') {
      setDetailsShownFor((prev) => {
        const next = new Set(prev)
        next.add(index)
        return next
      })
    } else if (position === 'left') {
      setActiveIndex((prev) => (prev + 2) % 3)
    } else if (position === 'right') {
      setActiveIndex((prev) => (prev + 1) % 3)
    }
  }

  const swipeHandlers = useSwipeable({
    onSwipedRight: () => setActiveIndex((prev) => (prev + 2) % 3),
    onSwipedLeft: () => setActiveIndex((prev) => (prev + 1) % 3),
    preventScrollOnSwipe: true,
    trackTouch: true,
    trackMouse: true
  })

  return (
    <section
      className="relative flex flex-col bg-black h-[1240px] max-lg:h-[760px] overflow-hidden items-center justify-between"
      {...(!isDesktop ? swipeHandlers : {})}>
      <FadeInOnView variant="fade-up">
        <div className="flex flex-col gap-4 text-center pb-10 pt-[140px] max-lg:pt-20 max-md:px-4">
          <Typography variant={isDesktop ? 'h3' : 'h5'} weight="medium" className="text-white">
            {t('common.sectionTitle')}
          </Typography>
          <Typography variant="body3" weight="regular" className="text-white opacity-80">
            {t('common.sectionDescription')}
          </Typography>
        </div>
      </FadeInOnView>

      <div data-aos="fade" data-aos-offset="-200">
        {mergedSlides.map((slide, index) => (
          <GrowthSlide
            key={slide.id}
            index={index}
            activeIndex={activeIndex}
            onClick={handleClick}
            data={slide}
            showDetails={detailsShownFor.has(index)}
          />
        ))}
      </div>

      {isDesktop ? (
        <div className="flex flex-col gap-[40px] pb-[140px] px-[140px] w-full items-center ">
          <Typography variant="h6" weight="regular" className="text-white">
            {t('common.subtitle')}
          </Typography>
          <Button variant="purple" className="w-[190px]">
            {t('common.cta')}
          </Button>
          <div className="absolute bottom-[140px] right-[140px]" data-aos="fade" data-aos-offset="-80">
            <Stepper
              steps={3}
              activeStep={getStepperIndex(activeIndex)}
              onStepClick={(step) => setActiveIndex(step - 1)}
            />
          </div>
          <button
            onClick={() => handleClick(activeIndex, 'left')}
            className="group absolute left-[5%] top-[50%] z-10 transform -translate-y-1/2 w-[48px] h-[48px] bg-white backdrop-blur rounded-full flex items-center justify-center border border-white hover:bg-white/20 transition">
            <ChevronLeftIcon
              className={cn('h-6 w-6  stroke-black group-hover:stroke-white transition', isArabic ? 'scale-x-100' : '')}
            />
          </button>

          <button
            onClick={() => handleClick(activeIndex, 'right')}
            className="group absolute right-[5%] top-[50%] z-10 transform -translate-y-1/2 w-[48px] h-[48px] bg-white backdrop-blur rounded-full flex items-center border border-white justify-center hover:bg-white/20 transition ">
            <ChevronLeftIcon
              className={cn(
                'h-6 w-6  -scale-x-100 stroke-black group-hover:stroke-white transition',
                isArabic ? '' : '-scale-x-100'
              )}
            />
          </button>
        </div>
      ) : (
        <div className="flex flex-col gap-8 items-center justify-center pb-20">
          <SwipeStepper
            steps={3}
            activeStep={getStepperIndex(activeIndex)}
            onStepClick={(step) => setActiveIndex(step - 1)}
          />
          <Button variant="purple" className="w-[343px]">
            {t('common.cta')}
          </Button>
        </div>
      )}
    </section>
  )
}
