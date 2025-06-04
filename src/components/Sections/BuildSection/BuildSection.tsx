import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useTranslations } from 'next-intl'
import { Swiper, SwiperSlide } from 'swiper/react'
import type { Swiper as SwiperType } from 'swiper'
import 'swiper/css'
import { RotatedCard } from './components/RotatedCard/RotatedCard'
import { Typography } from '@/components/ui'
import { DartIcon, LayersIcon, MoonIcon, PlanetIcon, SectorIcon, StarIcon } from '@/components/icons'
import { SwipeStepper } from '@/components/SwipeStepper/SwipeStepper'

gsap.registerPlugin(ScrollTrigger)

const CARDS = [
  { icon: <LayersIcon />, rotation: '0' },
  { icon: <DartIcon />, rotation: '0' },
  { icon: <SectorIcon />, rotation: '0' },
  { icon: <PlanetIcon />, rotation: '0' },
  { icon: <MoonIcon />, rotation: '0' },
  { icon: <StarIcon />, rotation: '0' }
]

type ScrollTriggerInstance = ReturnType<typeof ScrollTrigger.create>

export const BuildSection = () => {
  const [isMobile, setIsMobile] = useState(false)
  const [isTablet, setIsTablet] = useState(false)
  const [isDesktop, setIsDesktop] = useState(true)
  const t = useTranslations('Build')
  const scrollWrapperBuildRef = useRef<HTMLDivElement>(null)
  const cardRefs = useRef<Array<HTMLDivElement | null>>([])
  const [currentStep, setCurrentStep] = useState(0)
  const swiperRef = useRef<SwiperType | null>(null)
  const scrollTriggerRef = useRef<ScrollTriggerInstance | null>(null)

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
    if (!scrollWrapperBuildRef.current || !isDesktop) return

    const updateStep = () => {
      const container = scrollWrapperBuildRef.current
      if (!container) return
      const containerRect = container.getBoundingClientRect()
      const containerLeft = containerRect.left
      const containerRight = containerRect.right
      let firstVisible = 0

      cardRefs.current.forEach((cardRef, index) => {
        if (!cardRef) return
        const cardRect = cardRef.getBoundingClientRect()
        const cardCenter = cardRect.left + cardRect.width / 2
        if (cardCenter >= containerLeft && cardCenter <= containerRight && firstVisible === 0) {
          firstVisible = index
        }
      })
      setCurrentStep(firstVisible >= 2 ? 1 : 0)
    }

    const sections = gsap.utils.toArray('.horizontal-container .page')
    const st = ScrollTrigger.create({
      trigger: scrollWrapperBuildRef.current,
      pin: true,
      start: 'bottom bottom',
      end: () => '+=' + scrollWrapperBuildRef.current!.offsetWidth,
      scrub: 1,
      onUpdate: updateStep,
      animation: gsap.to(sections, {
        xPercent: -310,
        ease: 'none'
      })
    })
    scrollTriggerRef.current = st
    updateStep()

    return () => {
      if (scrollTriggerRef.current) scrollTriggerRef.current.kill()
    }
  }, [isDesktop])

  const handleStepClick = (step: number) => {
    if (isTablet && swiperRef.current) {
      swiperRef.current.slideTo(step - 1)
    } else if (isMobile && swiperRef.current) {
      swiperRef.current.slideTo(step)
    } else if (isDesktop && scrollTriggerRef.current) {
      const scrollTrigger = scrollTriggerRef.current
      const totalScroll = scrollTrigger.end - scrollTrigger.start
      const targetProgress = step === 1 ? 0 : 1
      const targetScrollPosition = scrollTrigger.start + totalScroll * targetProgress
      window.scrollTo({ top: targetScrollPosition, behavior: 'smooth' })
    }
  }

  const handleSlideChange = (swiper: SwiperType) => {
    setCurrentStep(swiper.activeIndex)
  }

  const renderCards = () => {
    if (isTablet) {
      const pairs = []
      for (let i = 0; i < CARDS.length; i += 2) pairs.push(CARDS.slice(i, i + 2))
      return (
        <Swiper
          slidesPerView={1}
          spaceBetween={40}
          className="w-full tablet-swiper"
          allowTouchMove={true}
          onSwiper={(swiper) => (swiperRef.current = swiper)}
          onSlideChange={handleSlideChange}>
          {pairs.map((pair, pairIndex) => (
            <SwiperSlide key={pairIndex} className="!flex !flex-row !justify-center !gap-[40px] w-full">
              {pair.map((card, idx) => (
                <RotatedCard
                  key={pairIndex * 2 + idx}
                  innerRef={(el) => (cardRefs.current[pairIndex * 2 + idx] = el)}
                  title={t(`cards.${pairIndex * 2 + idx}.title`)}
                  subtitle={t(`cards.${pairIndex * 2 + idx}.subtitle`)}
                  icon={card.icon}
                  rotation={card.rotation}
                  id={pairIndex * 2 + idx}
                  className="page"
                />
              ))}
            </SwiperSlide>
          ))}
        </Swiper>
      )
    }

    if (isMobile) {
      return (
        <Swiper
          slidesPerView={1}
          spaceBetween={20}
          className="w-full mobile-swiper"
          allowTouchMove={true}
          onSwiper={(swiper) => (swiperRef.current = swiper)}
          onSlideChange={handleSlideChange}>
          {CARDS.map((card, idx) => (
            <SwiperSlide key={idx} className="!flex !justify-center">
              <RotatedCard
                innerRef={(el) => (cardRefs.current[idx] = el)}
                title={t(`cards.${idx}.title`)}
                subtitle={t(`cards.${idx}.subtitle`)}
                icon={card.icon}
                rotation={card.rotation}
                id={idx}
                className="page"
              />
            </SwiperSlide>
          ))}
        </Swiper>
      )
    }

    return (
      <div className="horizontal-container flex h-[536px] items-center gap-[26px] overflow-hidden w-full">
        {CARDS.map(({ icon, rotation }, id) => (
          <RotatedCard
            key={id}
            innerRef={(el) => (cardRefs.current[id] = el)}
            title={t(`cards.${id}.title`)}
            subtitle={t(`cards.${id}.subtitle`)}
            icon={icon}
            rotation={rotation}
            id={id}
            className="page"
          />
        ))}
      </div>
    )
  }

  const steps = isMobile ? 6 : isTablet ? 3 : 2

  return (
    <section
      className="build-section flex flex-col items-center gap-12 pt-[140px] px-10 max-w-[100vw] bg-black pb-[150px] text-white max-lg:pt-20 max-lg:px-6 max-lg:pb-0"
      ref={scrollWrapperBuildRef}>
      <div className="flex flex-col items-center gap-4 text-center">
        <Typography variant={isDesktop ? 'h3' : 'h5'}>{t('title')}</Typography>
        <Typography variant="body3" className="text-white text-opacity-80">
          {t('subtitle')}
        </Typography>
      </div>
      {renderCards()}

      <SwipeStepper steps={steps} activeStep={currentStep + 1} onStepClick={handleStepClick} />
    </section>
  )
}
