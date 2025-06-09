'use client'

import { Typography } from '@/components/ui'
import { useEffect, useState } from 'react'
import clsx from 'clsx'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay } from 'swiper/modules'
import { useTranslations } from 'next-intl'
import AOS from 'aos'
import 'aos/dist/aos.css'

import 'swiper/css'
import 'swiper/css/pagination'

export const DataDrivenSection = () => {
  const t = useTranslations('dataDrivenSection')
  const slides = t.raw('slides') as { title: string; description: string }[]

  const [isTablet, setIsTablet] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const [isDesktop, setIsDesktop] = useState(false)
  const [activeIndex, setActiveIndex] = useState(0)
  const [fade, setFade] = useState(true)

  const current = slides[activeIndex]

  useEffect(() => {
    if (!isDesktop) return
    const interval = setInterval(() => {
      setFade(false)
      setTimeout(() => {
        setActiveIndex((prev) => (prev + 1) % slides.length)
        setFade(true)
      }, 300)
    }, 3000)

    return () => clearInterval(interval)
  }, [activeIndex, isDesktop, slides.length])

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

  return (
    <section className="bg-white p-[140px] pt-0 flex justify-center items-center gap-[180px] max-lg:px-6 max-lg:pt-20 max-lg:pb-0 max-md:flex-col max-lg:gap-10 max-md:px-4">
      {/* Left side */}
      <div className="flex flex-col gap-4 max-w-[480px]">
        <Typography variant={isDesktop ? 'h3' : 'h5'} weight="medium" data-aos="fade-right">
          {t('left.title')}
        </Typography>
        <Typography variant="body3" weight="regular" className="text-description" data-aos="fade-right">
          {t('left.description')}
        </Typography>
      </div>

      {isTablet || isMobile ? (
        <div className="w-full max-w-[373px] relative">
          <Swiper
            modules={[Autoplay]}
            autoplay={{ delay: 3000 }}
            loop
            slidesPerView={1}
            onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}>
            {slides.map((slide, index) => (
              <SwiperSlide key={index}>
                <div className="flex flex-col gap-8 bg-secondary-300 rounded-[20px] relative overflow-hidden justify-center items-center p-[35px] pb-[76px] max-md:p-5 max-md:pb-[76px] h-[400px]">
                  <img
                    src="/assets/data_driven/data_driven_1.png"
                    alt="bg"
                    className="absolute top-0 object-cover pointer-events-none"
                  />
                  <img
                    src={`/assets/data_driven/data_driven_${index + 2}.png`}
                    alt={`slide_${index}`}
                    className="relative object-cover h-[195px] w-[270px]"
                  />
                  <div className="flex flex-col justify-center items-center text-center">
                    <div className="flex flex-col gap-4 mb-4">
                      <Typography variant="body1" weight="medium">
                        {slide.title}
                      </Typography>
                      <Typography variant="caption" weight="regular" className="text-description">
                        {slide.description}
                      </Typography>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
          <div className="absolute bottom-7 left-0 right-0 z-10 flex gap-[10px] justify-center">
            {slides.map((_, dotIndex) => (
              <div
                key={dotIndex}
                className={clsx(
                  'h-2 w-2 rounded-full transition-colors duration-300 bg-primary-blue',
                  dotIndex === activeIndex ? 'opacity-100' : 'opacity-40'
                )}
              />
            ))}
          </div>
        </div>
      ) : (
        <div
          className="flex flex-col gap-8 shrink-0 h-[500px] w-[480px] bg-secondary-300 rounded-[20px] relative overflow-hidden justify-center items-center p-[50px] pb-[28px]"
          data-aos="fade-left">
          <img
            src="/assets/data_driven/data_driven_1.png"
            alt="bg"
            className="absolute top-0 object-cover pointer-events-none"
          />
          <img
            key={activeIndex}
            src={`/assets/data_driven/data_driven_${activeIndex + 2}.png`}
            alt={`slide_${activeIndex}`}
            className={clsx(
              'relative object-cover h-[270px] w-[380px] transition-opacity duration-500',
              fade ? 'opacity-100' : 'opacity-0'
            )}
          />
          <div className="flex flex-col justify-center items-center text-center gap-3">
            <div
              className={clsx(
                'flex flex-col gap-4 transition-opacity duration-500',
                fade ? 'opacity-100' : 'opacity-0'
              )}>
              <Typography variant="body1" weight="medium">
                {current.title}
              </Typography>
              <Typography variant="body3" weight="regular" className="text-description">
                {current.description}
              </Typography>
            </div>
            <div className="flex gap-[10px] justify-center">
              {slides.map((_, dotIndex) => (
                <button
                  key={dotIndex}
                  onClick={() => {
                    setFade(false)
                    setTimeout(() => {
                      setActiveIndex(dotIndex)
                      setFade(true)
                    }, 300)
                  }}
                  className={clsx(
                    'h-2 w-2 rounded-full transition-colors duration-300 cursor-pointer',
                    dotIndex === activeIndex ? 'bg-primary-blue' : 'bg-secondary-200'
                  )}
                />
              ))}
            </div>
          </div>
        </div>
      )}
    </section>
  )
}
