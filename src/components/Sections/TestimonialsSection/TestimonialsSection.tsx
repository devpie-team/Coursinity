'use client'

import { useEffect, useState } from 'react'
import { Typography } from '@/components/ui'
import { TestimonialCard } from './_components/TestimonialCard'
import { CarouselStepper } from './_components/CarouselStepper'
import { useSwipeable } from 'react-swipeable'
import { useTranslations } from 'next-intl'
import AOS from 'aos'
import 'aos/dist/aos.css'

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
      result.push({ ...testimonials[activeIndex - 1], userImg: testimonialImages[activeIndex - 1], pos: 'left' })
    }
    result.push({ ...testimonials[activeIndex], userImg: testimonialImages[activeIndex], pos: 'center' })
    if (activeIndex < testimonials.length - 1) {
      result.push({ ...testimonials[activeIndex + 1], userImg: testimonialImages[activeIndex + 1], pos: 'right' })
    }
    return result
  }

  const handlePrev = () => setActiveIndex((prev) => (prev === 0 ? 0 : prev - 1))
  const handleNext = () => setActiveIndex((prev) => (prev === slidesCount - 1 ? prev : prev + 1))

  const visibleSlides = getVisibleSlides()
  const swipeHandlers = useSwipeable({
    onSwipedLeft: () => (isMobile || isTablet) && handleNext(),
    onSwipedRight: () => (isMobile || isTablet) && handlePrev(),
    trackMouse: true
  })

  return (
    <section className="flex flex-col h-[933px] bg-white items-center gap-[105px] relative justify-between px-[140px] pb-[140px] overflow-hidden max-lg:px-[60px] max-lg:py-20 max-lg:h-[650px] max-md:h-[862px] max-md:px-4">
      <div className="flex flex-col gap-4 text-center">
        <Typography
          variant={isDesktop ? 'h3' : 'h5'}
          weight="medium"
          data-aos="fade"
          data-aos-offset={isMobile ? '-450' : '-100'}>
          {t('title')}
        </Typography>
        <Typography
          variant="body3"
          weight="regular"
          className="text-description"
          data-aos="fade"
          data-aos-offset={isMobile ? '-450' : '-100'}>
          {t('subtitle')}
        </Typography>
      </div>
      <div
        className="relative w-full min-h-[440px] flex items-center justify-center max-lg:w-auto max-lg:min-h-0"
        {...(isMobile || isTablet ? swipeHandlers : {})}>
        {visibleSlides.map((slide, idx) => (
          <TestimonialCard
            key={slide.company + slide.userName}
            data={slide}
            position={slide.pos}
            isDesktop={isDesktop}
          />
        ))}
      </div>
      <div data-aos="fade" data-aos-offset={isMobile ? '-450' : '-50'}>
        <CarouselStepper
          total={testimonials.length}
          activeStep={activeIndex}
          onPrev={handlePrev}
          onNext={handleNext}
          onStepClick={setActiveIndex}
        />
      </div>
    </section>
  )
}
