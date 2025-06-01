'use client'

import { useEffect, useState } from 'react'
import { Typography } from '@/components/ui'
import { TestimonialCard } from './_components/TestimonialCard'
import { CarouselStepper } from './_components/CarouselStepper'

const testimonials = [
  {
    company: 'Bahri company 1',
    feedback:
      'Coursinity helped us train over 4,000 employees without disrupting daily operations. The academy reflected our identity and values and the results were measurable from the first month.',
    userImg: '/assets/testimonials/testimonials_1.png',
    userName: 'M. Ali',
    userPosition: 'Training Lead, Bahri'
  },
  {
    company: 'Second Riyadh Health Cluster 2 ',
    feedback:
      'In record time, employee skill levels rose significantly, and job satisfaction was clearly enhanced. Coursinity’s customized journeys helped us train 20,000+ medical staff without disrupting care.',
    userImg: '/assets/testimonials/testimonials_2.png',
    userName: 'M. Ali',
    userPosition: 'Training Director, Second Riyadh Health Cluster​'
  },
  {
    company: 'Bahri company 3 ',
    feedback:
      'Coursinity helped us train over 4,000 employees without disrupting daily operations. The academy reflected our identity and values and the results were measurable from the first month.',
    userImg: '/assets/testimonials/testimonials_1.png',
    userName: 'M. Ali',
    userPosition: 'Training Lead, Bahri '
  },
  {
    company: 'Second Riyadh Health Cluster 4',
    feedback:
      'In record time, employee skill levels rose significantly, and job satisfaction was clearly enhanced. Coursinity’s customized journeys helped us train 20,000+ medical staff without disrupting care.',
    userImg: '/assets/testimonials/testimonials_2.png',
    userName: 'M. Ali',
    userPosition: 'Training Director, Second Riyadh Health Cluster​'
  },
  {
    company: 'Bahri company 5',
    feedback:
      'Coursinity helped us train over 4,000 employees without disrupting daily operations. The academy reflected our identity and values and the results were measurable from the first month.',
    userImg: '/assets/testimonials/testimonials_1.png',
    userName: 'M. Ali',
    userPosition: 'Training Lead, Bahri'
  },
  {
    company: 'Second Riyadh Health Cluster 6',
    feedback:
      'In record time, employee skill levels rose significantly, and job satisfaction was clearly enhanced. Coursinity’s customized journeys helped us train 20,000+ medical staff without disrupting care.',
    userImg: '/assets/testimonials/testimonials_2.png',
    userName: 'M. Ali',
    userPosition: 'Training Director, Second Riyadh Health Cluster​'
  },
  {
    company: 'Bahri company 7',
    feedback:
      'Coursinity helped us train over 4,000 employees without disrupting daily operations. The academy reflected our identity and values and the results were measurable from the first month.',
    userImg: '/assets/testimonials/testimonials_1.png',
    userName: 'M. Ali',
    userPosition: 'Training Lead, Bahri'
  }
]

const POSITIONS = ['left', 'center', 'right'] as const
type Position = (typeof POSITIONS)[number]

export const TestimonialsSection = () => {
  const [isMobile, setIsMobile] = useState<boolean>(false)
  const [isTablet, setIsTablet] = useState<boolean>(false)
  const [isDesktop, setIsDesktop] = useState<boolean>(true)
  const [activeIndex, setActiveIndex] = useState(0)
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

  const getVisibleSlides = () => {
    const result = []

    if (activeIndex > 0) {
      result.push({ ...testimonials[activeIndex - 1], pos: 'left' as Position })
    }

    result.push({ ...testimonials[activeIndex], pos: 'center' as Position })

    if (activeIndex < testimonials.length - 1) {
      result.push({ ...testimonials[activeIndex + 1], pos: 'right' as Position })
    }
    return result
  }

  const handlePrev = () => setActiveIndex((prev) => (prev - 1 + slidesCount) % slidesCount)
  const handleNext = () => setActiveIndex((prev) => (prev + 1) % slidesCount)

  const visibleSlides = getVisibleSlides()

  return (
    <section className="flex flex-col h-[933px] bg-white items-center gap-[105px] relative justify-between px-[140px] pb-[140px] max-lg:px-[60px] max-lg:py-20 max-lg:h-[834px] overflow-hidden">
      <div className="flex flex-col gap-4">
        <Typography variant={isDesktop ? 'h3' : 'h3'} weight="medium">
          What Our Partners Are Saying
        </Typography>
        <Typography variant="body3" weight="regular">
          Real results. Genuine trust. Teams that drive transformation.
        </Typography>
      </div>

      <div className="relative w-full min-h-[440px] flex items-center justify-center max-lg:w-auto max-lg:min-h-0">
        {visibleSlides.map((slide, idx) => (
          <TestimonialCard key={slide.company + slide.userName} data={slide} position={slide.pos as Position} />
        ))}
      </div>

      <CarouselStepper
        total={testimonials.length}
        activeStep={activeIndex}
        onPrev={handlePrev}
        onNext={handleNext}
        onStepClick={setActiveIndex}
      />
    </section>
  )
}
