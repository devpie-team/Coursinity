import { FadeInOnView } from '@/components/FadeInOnView/FadeInOnView'
import { SwipeStepper } from '@/components/SwipeStepper/SwipeStepper'
import { Typography } from '@/components/ui'
import { useEffect, useState, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useLocale, useTranslations } from 'next-intl'
import { Swiper, SwiperSlide } from 'swiper/react'
import type { Swiper as SwiperType } from 'swiper'
import 'swiper/css'
import { Card } from './components/Card/Card'
import { BagIcon, BookIcon, CalculatorIcon, FormalIcon, ListIcon, StarIcon, UserOutline } from '@/components/icons'
import { useHeaderVisibility } from '@/components/Header/HeaderVisibilityContext'
import AOS from 'aos'
import 'aos/dist/aos.css'
import { cn } from '@/lib/utils'
import Lottie from 'lottie-react'
import planet from '../../../../public/assets/lottie/card/planet_full.json'

gsap.registerPlugin(ScrollTrigger)

const CARDS = [
  { icon: <ListIcon />, bg: '#1C8DC1' },
  { icon: <BookIcon />, bg: '#02B5AC' },
  { icon: <CalculatorIcon />, bg: '#A578F2' },
  { icon: <UserOutline />, bg: '#1C8DC1' },
  { icon: <BagIcon />, bg: '#02B5AC' },
  { icon: <FormalIcon />, bg: '#A578F2' }
]

const groupedCards = [CARDS.slice(0, 3), CARDS.slice(3, 6)]

type ScrollTriggerInstance = ReturnType<typeof ScrollTrigger.create>

export const CardSection = () => {
  const [isDesktop, setIsDesktop] = useState(false)

  const t = useTranslations('S_CardSection')

  useEffect(() => {
    const checkScreenSize = () => {
      const width = window.innerWidth
      setIsDesktop(width > 1024)
    }

    checkScreenSize()
    window.addEventListener('resize', checkScreenSize)
    return () => window.removeEventListener('resize', checkScreenSize)
  }, [])

  const [isMobile, setIsMobile] = useState(false)
  const [isTablet, setIsTablet] = useState(false)

  const [smallHeight, setSmallHeight] = useState(false)
  const [smallerHeight, setSmallerHeight] = useState(false)

  const locale = useLocale()
  const scrollWrapperBuildRef = useRef<HTMLDivElement>(null)
  const { hideHeaderForSection, showHeaderForSection } = useHeaderVisibility()
  const sectionId = useRef(Math.random()?.toString())

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) hideHeaderForSection(sectionId.current)
        else showHeaderForSection(sectionId.current)
      },
      { threshold: 0.1 }
    )
    const currentRef = scrollWrapperBuildRef.current
    if (currentRef) observer.observe(currentRef)
    return () => {
      if (currentRef) observer.unobserve(currentRef)
      showHeaderForSection(sectionId.current)
    }
  }, [hideHeaderForSection, showHeaderForSection])

  const cardRefs = useRef<Array<HTMLDivElement | null>>([])
  const [currentStep, setCurrentStep] = useState(0)
  const swiperRef = useRef<SwiperType | null>(null)
  const scrollTriggerRef = useRef<ScrollTriggerInstance | null>(null)

  useEffect(() => {
    const checkScreenSize = () => {
      const width = window.innerWidth
      const height = window.innerHeight

      setSmallHeight(height <= 1010)
      setSmallerHeight(height <= 842)
      setIsMobile(width < 768)
      setIsTablet(width >= 768 && width <= 1260)
      setIsDesktop(width > 1260)
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

    const container = scrollWrapperBuildRef.current
    const sections = gsap.utils.toArray('.horizontal-container .card-group')

    const triggerLength = window.innerHeight * 1.3

    const trigger = ScrollTrigger.create({
      trigger: container,
      start: 'top top',
      end: `+=${triggerLength}`,
      pin: true,
      scrub: true,
      anticipatePin: 1,
      onUpdate: (self) => {
        const progress = self.progress
        if (progress < 0.5) {
          gsap.to(sections, {
            xPercent: 0,
            duration: 1.5,
            ease: 'ease.inOut'
          })
          setCurrentStep(0)
        } else {
          gsap.to(sections, {
            xPercent: locale === 'ar' ? 122 : -122,
            duration: 1.5,
            ease: 'ease.inOut'
          })
          setCurrentStep(1)
        }
      }
    })

    scrollTriggerRef.current = trigger

    return () => {
      trigger.kill()
    }
  }, [isDesktop, locale])

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
          style={{ paddingBottom: '40px' }}
          className="w-full tablet-swiper"
          allowTouchMove={true}
          onSwiper={(swiper) => (swiperRef.current = swiper)}
          onSlideChange={handleSlideChange}
          data-aos="fade"
          data-aos-offset="-50">
          {pairs.map((pair, pairIndex) => (
            <SwiperSlide key={pairIndex} className="!flex !flex-row !justify-center !gap-[40px] w-full">
              {pair.map((card, idx) => (
                <Card
                  key={pairIndex * 2 + idx}
                  innerRef={(el) => (cardRefs.current[pairIndex * 2 + idx] = el)}
                  title={t(`cards.${pairIndex * 2 + idx}.title`)}
                  subtitle={t(`cards.${pairIndex * 2 + idx}.subtitle`)}
                  icon={card.icon}
                  bg={card.bg}
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
              spaceBetween: -60
            },
            390: {
              spaceBetween: -70
            },
            410: {
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
              <Card
                innerRef={(el) => (cardRefs.current[idx] = el)}
                title={t(`cards.${idx}.title`)}
                subtitle={t(`cards.${idx}.subtitle`)}
                icon={card.icon}
                bg={card.bg}
                id={idx}
                className="page"
                isSelected={currentStep === idx}
              />
            </SwiperSlide>
          ))}
        </Swiper>
      )
    }

    return (
      <div
        className={cn(
          'horizontal-container flex items-center overflow-hidden w-full py-[173px] gap-[20vw] px-[40px]',
          smallHeight ? 'py-[100px]' : smallerHeight ? 'py-[50px]' : ''
        )}>
        <Lottie
          animationData={planet}
          loop={true}
          className={cn('absolute left-[32%] top-[22%] w-[714px] h-[630px]')}
        />
        {groupedCards.map((group, groupIndex) => (
          <div key={groupIndex} className="card-group flex flex-shrink-0  w-full justify-between page ">
            {group.map(({ icon, bg }, idx) => (
              <Card
                key={groupIndex * 3 + idx}
                innerRef={(el) => (cardRefs.current[groupIndex * 3 + idx] = el)}
                title={t(`cards.${groupIndex * 3 + idx}.title`)}
                subtitle={t(`cards.${groupIndex * 3 + idx}.subtitle`)}
                icon={icon}
                bg={bg}
                id={groupIndex * 3 + idx}
                className={`element${groupIndex * 3 + idx} ${groupIndex == 1 && idx == 0 && 'ml-[20px]'}  ${
                  ((groupIndex == 1 && idx == 2) || (groupIndex == 0 && idx == 1)) && 'top-[-61px]'
                }`}
              />
            ))}
          </div>
        ))}
      </div>
    )
  }

  const steps = isMobile ? 6 : isTablet ? 3 : 2

  return (
    <section
      className={cn(
        'pt-20 pb-8 max-md:pb-20 max flex flex-col items-center justify-center bg-secondary-300 lg:min-h-[100vh] max-md:gap-10',
        smallHeight && isDesktop ? 'pt-4' : ''
      )}
      ref={scrollWrapperBuildRef}>
      <div className="flex flex-col max-w-full w-[500px] scaleText opacityText max-md:px-4 gap-6 text-center">
        <FadeInOnView variant="fade-up">
          <Typography variant={isDesktop ? 'h3' : 'h5'} weight="medium">
            {t('title')}
          </Typography>
        </FadeInOnView>
        <FadeInOnView variant="fade-up">
          <Typography variant="body3" weight="regular" className="text-description">
            {t('subtitle')}
          </Typography>
        </FadeInOnView>
      </div>
      {renderCards()}
      <SwipeStepper steps={steps} activeStep={currentStep + 1} onStepClick={handleStepClick} type="blue" />
    </section>
  )
}
