'use client'

import { useEffect, useState } from 'react'
import { Typography } from '@/components/ui'
import { TestimonialCard } from './_components/TestimonialCard'
import { CarouselStepper } from './_components/CarouselStepper'
import { useSwipeable } from 'react-swipeable'
import { useLocale, useTranslations } from 'next-intl'
import AOS from 'aos'
import 'aos/dist/aos.css'
import { FadeInOnView } from '@/components/FadeInOnView/FadeInOnView'

const testimonialImages = [
  '/assets/testimonials/testimonials_1.png',
  '/assets/testimonials/testimonials_2.jpg',
  '/assets/testimonials/testimonials_1.png',
  '/assets/testimonials/testimonials_2.jpg',
  '/assets/testimonials/testimonials_1.png',
  '/assets/testimonials/testimonials_2.jpg',
  '/assets/testimonials/testimonials_1.png'
]

export const TestimonialsSection = () => {
  const t = useTranslations('TestimonialsSection')
  const [isMobile, setIsMobile] = useState(false)
  const [isTablet, setIsTablet] = useState(false)
  const [isDesktop, setIsDesktop] = useState(true)
  const [activeIndex, setActiveIndex] = useState(0)
  const testimonials = t.raw('testimonials') as any[]
  const slidesCount = testimonials.length
  const locale = useLocale()
  const isArabic = locale == 'ar'

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

  const getVisibleSlides = () => {
    const result = []
    if (activeIndex > 0) {
      const prevIndex = activeIndex - 1
      result.push({
        ...testimonials[prevIndex],
        userImg: testimonialImages[prevIndex],
        pos: 'left',
        id: prevIndex
      })
    }
    result.push({
      ...testimonials[activeIndex],
      userImg: testimonialImages[activeIndex],
      pos: 'center',
      id: activeIndex
    })
    if (activeIndex < testimonials.length - 1) {
      const nextIndex = activeIndex + 1
      result.push({
        ...testimonials[nextIndex],
        userImg: testimonialImages[nextIndex],
        pos: 'right',
        id: nextIndex
      })
    }
    return result
  }

  const handlePrev = () => setActiveIndex((prev) => (prev === 0 ? 0 : prev - 1))
  const handleNext = () => setActiveIndex((prev) => (prev === slidesCount - 1 ? prev : prev + 1))

  const visibleSlides = getVisibleSlides()
  const swipeHandlers = useSwipeable({
    onSwipedLeft: () => (isMobile || isTablet) && (isArabic ? handlePrev() : handleNext()),
    onSwipedRight: () => (isMobile || isTablet) && (isArabic ? handleNext() : handlePrev()),
    trackMouse: true
  })

  return (
    <section className="flex flex-col h-[933px] bg-white items-center gap-[105px] relative justify-between px-[140px] pb-[140px] overflow-hidden max-lg:px-[60px] max-lg:py-20 max-lg:h-[650px] max-md:h-[862px] max-md:px-4">
      <div className="flex flex-col gap-4 text-center">
        <FadeInOnView>
          <Typography variant={isDesktop ? 'h3' : 'h5'} weight="medium">
            {t('title')}
          </Typography>
        </FadeInOnView>
        <FadeInOnView>
          <Typography variant="body3" weight="regular" className="text-description">
            {t('subtitle')}
          </Typography>
        </FadeInOnView>
      </div>

      <div
        className="relative w-full min-h-[440px] flex items-center justify-center max-lg:w-auto max-lg:min-h-0 max-"
        {...(isMobile || isTablet ? swipeHandlers : {})}>
        {visibleSlides.map((slide) => (
          <TestimonialCard key={slide.id} data={slide} position={slide.pos} isDesktop={isDesktop} />
        ))}
      </div>

      <FadeInOnView>
        <div>
          <CarouselStepper
            total={testimonials.length}
            activeStep={activeIndex}
            onPrev={handlePrev}
            onNext={handleNext}
            onStepClick={setActiveIndex}
          />
        </div>
      </FadeInOnView>
    </section>
  )
}
