'use client'

import { Button } from '@/components/primitives/button'
import { Typography } from '@/components/ui'
import { useTranslations } from 'next-intl'
import { useEffect, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export const HeroSection = () => {
  const t = useTranslations('Hero')
  const [isTablet, setIsTablet] = useState<boolean>(false)
  const [isMobile, setIsMobile] = useState<boolean>(false)

  useEffect(() => {
    const checkScreenSize = () => {
      const width = window.innerWidth
      setIsMobile(width < 768)
      setIsTablet(width <= 1024)
    }

    checkScreenSize()

    window.addEventListener('resize', checkScreenSize)
    return () => window.removeEventListener('resize', checkScreenSize)
  }, [])

  useEffect(() => {
    const elementSettings = [
      { selector: '.element1', x: -1200, y: 1200, duration: 2, fade: true },
      { selector: '.element2', x: 1200, y: 1200, duration: 2, fade: true },
      { selector: '.element3', x: -1200, y: -1200, duration: 2, fade: true },
      { selector: '.element4', x: 1200, y: -1200, duration: 2, fade: true },
      { selector: '.element5', x: 0, y: 0, duration: 1, fade: false },
      { selector: '.element6', x: 1200, y: 0, duration: 2, fade: true },
      { selector: '.element7', x: -1200, y: 0, duration: 2, fade: true }
    ]

    // Для каждого элемента настраиваем анимацию
    elementSettings.forEach(({ selector, x, y, duration, fade }) => {
      if (fade) {
        gsap.fromTo(
          selector,
          {
            opacity: 1,
            x: 0,
            y: 0
          },
          {
            opacity: 0,
            x: x,
            y: y,
            duration: duration,
            ease: 'sine.inOut',
            delay: 20,
            scrollTrigger: {
              trigger: '.hero-section',
              start: 'top top',
              end: 'bottom top',
              scrub: 2
            }
          }
        )
      } else {
        gsap.fromTo(
          selector,
          {
            opacity: 1
          },
          {
            opacity: 0,
            duration: 0.002,
            ease: 'sine.inOut',
            delay: 20,
            scrollTrigger: {
              trigger: '.hero-section',
              start: 'top top',
              end: '20%',
              scrub: true
            }
          }
        )
      }
    })
  }, [])

  return (
    <section
      className="overflow-hidden relative min-h-[900px] max-[768px]:min-h-[766px] max-[1024px]:min-h-[600px] w-full bg-cover bg-center bg-no-repeat hero-section"
      style={{
        backgroundImage: `url('/assets/hero/heroBg.png')`
      }}>
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="absolute z-1 top-0 left-0 right-0 bottom-0">
          <img src="/assets/hero/glass.png" alt="Glass" className="w-full h-full object-cover opacity-70" />
        </div>

        <div className="flex flex-col gap-8 items-center z-10 text-center px-4 w-[910px] ">
          <div className="flex flex-col gap-6 max-[1024px]:gap-4 items-center">
            {isTablet ? (
              <div className=" leading-tight text-transparent bg-gradient-to-b from-[#1C8DC1] to-[#D3E7F0] bg-clip-text w-fit">
                <Typography variant="h3" weight="medium">
                  Spark a learning
                </Typography>
                <Typography variant="h3" weight="medium">
                  revolution.
                </Typography>
              </div>
            ) : (
              <div>
                <Typography variant="h1" as="span" weight="medium">
                  {t('title')}
                </Typography>
                <Typography
                  variant="h1"
                  as="span"
                  weight="medium"
                  className="bg-gradient-to-b from-[#1C8DC1] to-[#D3E7F0] bg-clip-text text-transparent">
                  {t('titleGradient')}
                </Typography>
              </div>
            )}
            <Typography variant={isTablet ? 'body3' : 'body1'} className="min-[1440px]:max-w-[693px]">
              {t(isTablet ? 'subtitleMobile' : 'subtitle')}
            </Typography>
          </div>

          <Button className="max-[1440px]:max-w-[425px] max-[1440px]:w-full" size="lg">
            {t('bookDemo')}
          </Button>
        </div>
      </div>

      <img
        src={`/assets/hero/${'en'}/${isTablet ? 'tabletElement' : 'element'}1.png/`}
        className="absolute bottom-[-40px] left-3 max-[1024px]:left-1  max-[1024px]:bottom-[-20px] animate-element element1 "
      />
      <img
        src={`/assets/hero/${'en'}/${isTablet ? 'tabletElement' : 'element'}2.png/`}
        className="absolute bottom-[-40px] right-[-40px] max-[1024px]:right-[-20px]  max-[1024px]:bottom-[-15px] animate-element element2"
      />
      <img
        src={`/assets/hero/${'en'}/${isTablet ? 'tabletElement' : 'element'}3.png/`}
        className="absolute top-[15%] left-0  max-[768px]:top-[10%] animate-element element3"
      />
      <img
        src={`/assets/hero/${'en'}/${isTablet ? 'tabletElement' : 'element'}4.png/`}
        className="absolute top-[15%] right-[-40px] max-[768px]:top-[10%] max-[1024px]:right-[-15px] animate-element element4"
      />
      <img
        src={`/assets/hero/${'en'}/${isTablet ? 'tabletElement' : 'element'}5.png/`}
        className="absolute top-[15%] left-[42%] max-[768px]:top-[22%] max-[768px]:left-[25%] animate-element element5"
      />
      {isMobile ? null : (
        <>
          <img
            src={`/assets/hero/${'en'}/${isTablet ? 'tabletElement' : 'element'}6.png/`}
            className="absolute top-[42%] right-[-40px] max-[1024px]:right-[-15px] animate-element element6"
          />
          <img
            src={`/assets/hero/${'en'}/${isTablet ? 'tabletElement' : 'element'}7.png/`}
            className="absolute top-[42%] left-[-90px] max-[1024px]:left-[-60px] animate-element element7"
          />
        </>
      )}
    </section>
  )
}
