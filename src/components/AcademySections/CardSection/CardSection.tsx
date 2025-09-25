'use client'

import { useLocale, useTranslations } from 'next-intl'
import { Swiper, SwiperProps, SwiperSlide } from 'swiper/react'
import 'swiper/css'
import { Button } from '@/components/primitives/button'
import { Typography } from '@/components/ui'
import { FadeInOnView } from '@/components/FadeInOnView/FadeInOnView'
import { cn } from '@/lib/utils'
import { Card } from './components/Card'
import {
  BankIcon,
  BellIcon,
  BigRankIcon,
  CheckMarkCircleIcon,
  CpuIcon,
  EarningIcon,
  FileIcon,
  FilesFolderIcon,
  FinanceIcon,
  HealthCareIcon,
  HospitalIcon,
  MedicalInformationIcon,
  MedicalServiceIcon,
  PaymentIcon,
  QiwaIcon,
  ReportIcon,
  ShieldIcon,
  SolarPanelIcon,
  VideoCallIcon,
  WifiIcon
} from '@/components/icons'
import { useEffect, useRef, useState } from 'react'
import type { Swiper as SwiperType } from 'swiper'
import { Stepper } from './components/Stepper'
import { SwipeStepper } from '@/components/SwipeStepper/SwipeStepper'
import DiplomaIcon from '@/components/icons/DiplomaIcon'

const CARDS = [
  {
    bigIcon: <ShieldIcon />,
    smallIcon1: <FileIcon />,
    smallIcon2: <BellIcon />,
    smallIcon3: <SolarPanelIcon />
  },
  {
    bigIcon: <BankIcon />,
    smallIcon1: <PaymentIcon />,
    smallIcon2: <DiplomaIcon variant="small" />,
    smallIcon3: <ShieldIcon size="small" />
  },
  {
    bigIcon: <CheckMarkCircleIcon />,
    smallIcon1: <QiwaIcon />,
    smallIcon2: <ReportIcon />,
    smallIcon3: <FinanceIcon />
  },
  {
    bigIcon: <CpuIcon />,
    smallIcon1: <FilesFolderIcon />,
    smallIcon2: <ShieldIcon size="small" />,
    smallIcon3: <WifiIcon />
  },
  {
    bigIcon: <BigRankIcon />,
    smallIcon1: <EarningIcon />,
    smallIcon2: <DiplomaIcon variant="small" />,
    smallIcon3: <VideoCallIcon />
  },
  {
    bigIcon: <HospitalIcon />,
    smallIcon1: <HealthCareIcon />,
    smallIcon2: <MedicalInformationIcon />,
    smallIcon3: <MedicalServiceIcon />
  }
]

export const CardSection = () => {
  const t = useTranslations('AC_CardSection')
  const locale = useLocale()
  const isArabic = locale === 'ar'
  const [currentStep, setCurrentStep] = useState(0)
  const [currentPage, setCurrentPage] = useState(0)
  const [totalPages, setTotalPages] = useState(1)
  const [isMobile, setIsMobile] = useState(false)
  const [isTablet, setIsTablet] = useState(false)

  const swiperRef = useRef<SwiperType | null>(null)

  const getPerView = () => Number(swiperRef.current?.params.slidesPerView) || 1

  const handleStepClick = (step: number) => {
    if (swiperRef.current) {
      swiperRef.current?.slideTo(step - 1)

      setCurrentStep(step - 1)
    }
  }

  const handleSlideChange = (swiper: SwiperType) => {
    setCurrentStep(swiper.activeIndex)
  }

  useEffect(() => {
    const checkScreenSize = () => {
      const width = window.innerWidth
      setIsMobile(width < 768)
      setIsTablet(width >= 768 && width < 1024)
    }
    checkScreenSize()
    window.addEventListener('resize', checkScreenSize)
    return () => window.removeEventListener('resize', checkScreenSize)
  }, [])

  return (
    <section
      className={cn(
        'pb-[120px] pt-40 flex flex-col items-center justify-center gap-[60px] max-md:gap-10 px-[120px] max-md:p-4 max-md:pb-[124px]'
      )}>
      <div className="flex flex-col max-w-full scaleText opacityText max-md:px-4 gap-6 text-center">
        <FadeInOnView variant="fade-up">
          <Typography variant={isMobile ? 'h5' : 'h3'} weight="medium" className="text-white max-md:text-h5">
            {t('title')}
          </Typography>
        </FadeInOnView>
        <FadeInOnView variant="fade-up">
          <Typography variant="body3" weight="regular" className="text-description">
            {t('subtitle')}
          </Typography>
        </FadeInOnView>
      </div>

      <Swiper
        onSwiper={(swiper) => {
          swiperRef.current = swiper
          setTotalPages(swiper.snapGrid?.length)
          setCurrentPage(Math.floor(swiper.activeIndex / getPerView()))
        }}
        onSlideChange={(swiper) => {
          setCurrentPage(Math.floor(swiper.activeIndex / getPerView()))
          setCurrentStep(swiper.activeIndex)
        }}
        slidesPerView={isMobile ? 1 : isTablet ? 2 : 3}
        slidesPerGroup={isMobile ? 1 : isTablet ? 2 : 3}
        spaceBetween={20}
        className="w-full max-w-[1240px]"
        allowTouchMove
        observer
        observeParents
        onInit={(swiper) =>
          requestAnimationFrame(() => {
            swiper.update()
            setTotalPages(swiper.snapGrid?.length)
            setCurrentPage(Math.floor(swiper.activeIndex / getPerView()))
          })
        }
        breakpoints={{
          350: {
            spaceBetween: 0
          },
          370: {
            spaceBetween: -30
          },
          410: {
            spaceBetween: -50
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
            spaceBetween: -200
          },
          767: {
            spaceBetween: 20
          }
        }}>
        {CARDS.map((_, id) => (
          <SwiperSlide key={id}>
            <div className="flex w-full justify-center">
              <Card
                id={id}
                bigIcon={CARDS[id].bigIcon}
                smallIcon1={CARDS[id].smallIcon1}
                smallIcon2={CARDS[id].smallIcon2}
                smallIcon3={CARDS[id].smallIcon3}
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      <div className="grid w-full max-w-[1240px] grid-cols-3 max-md:hidden">
        <div />
        <div className="flex justify-center">
          <Button variant="academy" className="max-md:w-full ">
            {t('button')}
          </Button>
        </div>
        <div className="flex justify-end">
          <Stepper
            rtl={isArabic}
            current={currentPage}
            total={totalPages}
            onPrev={() => swiperRef.current?.slidePrev()}
            onNext={() => swiperRef.current?.slideNext()}
            onGo={(page) => {
              const perView = getPerView()
              swiperRef.current?.slideTo(page * perView)
            }}
          />
        </div>
      </div>
      <div className="flex flex-col items-center md:hidden gap-5">
        <SwipeStepper steps={6} activeStep={currentStep + 1} onStepClick={handleStepClick} type="white" />
        <Button variant="academy" className="max-md:w-full max-w-[280px]">
          {t('button')}
        </Button>
      </div>
    </section>
  )
}
