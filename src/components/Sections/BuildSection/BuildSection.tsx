import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useLocale, useTranslations } from 'next-intl'
import { Swiper, SwiperSlide } from 'swiper/react'
import type { Swiper as SwiperType } from 'swiper'
import 'swiper/css'
import { RotatedCard } from './components/RotatedCard/RotatedCard'
import { Typography } from '@/components/ui'
import { DartIcon, LayersIcon, MoonIcon, PlanetIcon, SectorIcon, StarIcon } from '@/components/icons'
import { SwipeStepper } from '@/components/SwipeStepper/SwipeStepper'
import { useHeaderVisibility } from '@/components/Header/HeaderVisibilityContext'
import AOS from 'aos'
import 'aos/dist/aos.css'
import { FadeInOnView } from '@/components/FadeInOnView/FadeInOnView'

gsap.registerPlugin(ScrollTrigger)

const CARDS = [
  { icon: <LayersIcon />, rotation: '0', move: -20, end: 0 },
  { icon: <DartIcon />, rotation: '0', move: 70, end: 90 },
  { icon: <SectorIcon />, rotation: '0', move: 140, end: 160 },
  { icon: <PlanetIcon />, rotation: '0', move: -20, end: 0 },
  { icon: <MoonIcon />, rotation: '0', move: 70, end: 90 },
  { icon: <StarIcon />, rotation: '0', move: 140, end: 160 }
]

type ScrollTriggerInstance = ReturnType<typeof ScrollTrigger.create>

export const BuildSection = () => {
  const [isMobile, setIsMobile] = useState(false)
  const [isTablet, setIsTablet] = useState(false)
  const [isDesktop, setIsDesktop] = useState(true)
  const locale = useLocale()
  const isArabic = locale == 'ar'
  const t = useTranslations('Build')
  const scrollWrapperBuildRef = useRef<HTMLDivElement>(null)
  const { hideHeaderForSection, showHeaderForSection } = useHeaderVisibility()
  const sectionId = useRef(Math.random()?.toString())

  useEffect(() => {
    if (isMobile) {
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
      if (scrollWrapperBuildRef.current) observer.observe(scrollWrapperBuildRef.current)
      return () => {
        if (scrollWrapperBuildRef.current) observer.unobserve(scrollWrapperBuildRef.current)
        showHeaderForSection(sectionId.current)
      }
    }
  }, [])

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
    AOS.init()
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

    CARDS.forEach(({ move, end }, id) => {
      if (id < 3) {
        gsap.fromTo(
          `.element${id}`,
          { rotate: 0, opacity: 1 },
          {
            ease: 'sine.inOut',
            opacity: 0.3,
            rotate: '-7deg',
            scrollTrigger: {
              trigger: '.horizontal-container',
              start: `${move}%`,
              end: `${end}%`,
              scrub: 2
            }
          }
        )
      } else {
        gsap.fromTo(
          `.element${id}`,
          { rotate: '7deg', opacity: 0.3 },
          {
            ease: 'sine.inOut',
            opacity: 1,
            rotate: '0',
            scrollTrigger: {
              trigger: '.horizontal-container',
              start: `${move}%`,
              end: `${end}%`,
              scrub: 2
            }
          }
        )
      }
    })

    const sections = gsap.utils.toArray('.horizontal-container .page')
    const st = ScrollTrigger.create({
      trigger: scrollWrapperBuildRef.current,
      pin: true,
      start: 'top top',
      end: () => '+=' + scrollWrapperBuildRef.current!.offsetWidth,
      scrub: 1,
      onUpdate: updateStep,
      animation: gsap.to(sections, {
        xPercent: locale == 'ar' ? 310 : -310,
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
      swiperRef.current.slideTo(step - 1)
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
          onSlideChange={handleSlideChange}
          data-aos="fade"
          data-aos-offset="-50">
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
          className="w-full mobile-swiper"
          allowTouchMove={true}
          onSwiper={(swiper) => (swiperRef.current = swiper)}
          onSlideChange={handleSlideChange}
          data-aos="fade"
          data-aos-offset="-50"
          breakpoints={{
            320: {
              spaceBetween: -30
            },
            370: {
              spaceBetween: -50
            },
            410: {
              spaceBetween: -80
            },
            460: {
              spaceBetween: -100
            },
            500: {
              spaceBetween: -120
            },
            550: {
              spaceBetween: -140
            },
            600: {
              spaceBetween: -160
            },
            650: {
              spaceBetween: -180
            },
            700: {
              spaceBetween: 0
            }
          }}>
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
            className={`page element${id}`}
          />
        ))}
      </div>
    )
  }

  const steps = isMobile ? 6 : isTablet ? 3 : 2

  return (
    <section
      className="h-[100vh] build-section flex flex-col items-center justify-center gap-11  px-10 max-w-[100vw] bg-black text-white max-lg:pt-0 max-lg:px-6 max-lg:pb-0  max-lg:h-auto max-md:pt-20 max-md:px-4"
      ref={scrollWrapperBuildRef}>
      <div className="flex flex-col items-center gap-4 text-center">
        <FadeInOnView variant="fade-up">
          <Typography variant={isDesktop ? 'h3' : 'h5'}>
            {t('title')}
            {isArabic && (
              <>
                <br />
                {t('bottomTitle')}
              </>
            )}
          </Typography>
        </FadeInOnView>
        <FadeInOnView variant="fade-up">
          <Typography variant="body3" className="text-white text-opacity-80">
            {t('subtitle')}
          </Typography>
        </FadeInOnView>
      </div>
      {renderCards()}

      <SwipeStepper steps={steps} activeStep={currentStep + 1} onStepClick={handleStepClick} />
    </section>
  )
}
