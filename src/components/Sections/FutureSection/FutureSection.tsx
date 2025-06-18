'use client'

import { useEffect, useLayoutEffect, useState } from 'react'
import { useTranslations } from 'next-intl'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

import { LogoSlider } from './_components/LogoSlider'
import { Typography } from '@/components/ui'
import { UserOctagonIcon } from '@/components/icons/UserOctagonIcon'
import { ClipboardIcon } from '@/components/icons/ClipboardIcon'
import { GridEditIcon } from '@/components/icons/GridEditIcon'
import { ZapIcon } from '@/components/icons/ZapIcon'
import { cn } from '@/lib/utils'
import { FadeInOnView } from '@/components/FadeInOnView/FadeInOnView'
import { ScrollSmoother } from 'gsap/ScrollSmoother'

gsap.registerPlugin(ScrollSmoother, ScrollTrigger)

export const FutureSection = () => {
  const t = useTranslations('FutureSection')
  const [isMobile, setIsMobile] = useState(false)
  const [isTablet, setIsTablet] = useState(false)
  const [isDesktop, setIsDesktop] = useState(false)
  const [windowWidth, setWindowWidth] = useState(0)

  useEffect(() => {
    const checkScreenSize = () => {
      const width = window.innerWidth
      setWindowWidth(width)
      setIsMobile(width < 768)
      setIsTablet(width >= 768 && width <= 1024)
      setIsDesktop(width > 1024)
    }

    checkScreenSize()
    window.addEventListener('resize', checkScreenSize)
    return () => window.removeEventListener('resize', checkScreenSize)
  }, [])

  const getElementSettings = (isMobile: boolean, isTablet: boolean, isDesktop: boolean) => {
    if (isMobile) {
      return [
        { selector: '.future-element1', x: 80, y: -220 },
        { selector: '.future-element2', x: 230, y: 40 },
        { selector: '.future-element3', x: 30, y: 240 },
        { selector: '.future-element4', x: -180, y: 180 },
        { selector: '.future-element5', x: -200, y: -170 }
      ]
    }
    if (isTablet) {
      return [
        { selector: '.future-element1', x: 70, y: -240 },
        { selector: '.future-element2', x: 340, y: -70 },
        { selector: '.future-element3', x: 180, y: 220 },
        { selector: '.future-element4', x: -260, y: 180 },
        { selector: '.future-element5', x: -320, y: -100 }
      ]
    }
    // Default: Desktop
    return [
      { selector: '.future-element1', x: 100, y: -250 },
      { selector: '.future-element2', x: 500, y: -100 },
      { selector: '.future-element3', x: 450, y: 200 },
      { selector: '.future-element4', x: -400, y: 250 },
      { selector: '.future-element5', x: -500, y: -150 }
    ]
  }

  useLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger)

    ScrollTrigger.matchMedia({
      '(max-width: 767px)': () => {
        runAnimations(0.5, 1, true, false, false)
      },
      '(min-width: 768px) and (max-width: 1024px)': () => {
        runAnimations(0.7, 1.3, false, true, false)
      },
      '(min-width: 1025px) and (max-width: 1350px)': () => {
        runAnimations(0.7, 1.3, false, false, true)
      },
      '(min-width: 1351px)': () => {
        runAnimations(1, 1.5, false, false, true)
      }
    })

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill())
    }
  }, [])

  const runAnimations = (
    targetScale: number,
    initialScale: number,
    isMobile: boolean,
    isTablet: boolean,
    isDesktop: boolean
  ) => {
    const elementSettings = getElementSettings(isMobile, isTablet, isDesktop)

    elementSettings.forEach(({ selector, x, y }) => {
      gsap.fromTo(
        selector,
        { opacity: 1, x, y },
        {
          x: 0,
          y: 0,
          ease: 'sine.inOut',
          opacity: 1,
          scrollTrigger: {
            trigger: '.future-section',
            start: 'top top',
            end: '120%',
            scrub: 2
          }
        }
      )
    })

    gsap.fromTo(
      '.scaleText',
      { scale: initialScale },
      {
        scale: targetScale,
        ease: 'sine.inOut',
        scrollTrigger: {
          trigger: '.future-section',
          start: 'top top',
          end: '90%',
          scrub: 2,
          pin: true
        }
      }
    )

    gsap.fromTo(
      '.opacityText',
      { opacity: 1 },
      {
        opacity: 0,
        ease: 'none',
        scrollTrigger: {
          trigger: '.future-section',
          start: 'bottom 90%',
          end: 'bottom 70%',
          scrub: true
        }
      }
    )
  }

  ScrollSmoother.create({
    wrapper: '#smooth-wrapper',
    content: '#smooth-content',
    smooth: 1.2,
    effects: true
  })

  return (
    <section className="bg-white overflow-x-hidden" id="smooth-wrapper">
      <div>
        <LogoSlider />
      </div>
      <div
        className="relative flex items-center justify-center text-center w-full h-[100vh] overflow-hidden future-section"
        id="smooth-content">
        <div className="flex flex-col max-w-full w-[432px] scaleText opacityText max-lg:w-[372px] max-md:w-[252px]">
          <FadeInOnView>
            <Typography variant={isDesktop ? 'h3' : 'h5'} weight="medium">
              {t('title')}
            </Typography>
            <Typography variant={isDesktop ? 'body2' : 'body3'} weight="regular" className="text-description">
              {t('subtitle')}
            </Typography>
          </FadeInOnView>
        </div>

        <div className="absolute flex flex-col w-[240px] h-[240px] bg-primary-purple p-6 rounded-[40px] max-lg:w-[160px] max-lg:h-[160px] max-lg:p-3 max-lg:pb-2 max-lg:rounded-2xl future-element1">
          <Typography
            variant={isDesktop ? 'body2' : 'caption'}
            weight={isDesktop ? 'semibold' : 'medium'}
            className="text-white text-start">
            {t('card1Title')}
          </Typography>
          <div className="flex gap-1 h-full items-end max-lg:gap-[3px]">
            {[...Array(4)].map((_, i) => (
              <div
                key={i}
                className={cn(
                  'flex justify-center items-end bg-white bg-opacity-[16%]',
                  isDesktop ? 'h-[101px] p-2 rounded-[15px] w-[45px]' : 'h-[92px] p-1 w-[32px] rounded-[10px]',
                  i === 1 && 'items-start',
                  i === 2 && 'items-center'
                )}>
                <UserOctagonIcon size={isDesktop ? '32' : '22.67'} />
              </div>
            ))}
          </div>
        </div>

        <div className="opacity-1 absolute flex flex-col w-[250px] h-[250px] bg-secondary-100 p-6 rounded-[40px] justify-between text-start max-lg:w-[160px] max-lg:h-[160px] max-lg:p-3 max-lg:pt-2 max-lg:rounded-2xl future-element2">
          <Typography
            variant={isDesktop ? 'body2' : 'caption'}
            weight={isDesktop ? 'semibold' : 'medium'}
            className="text-primary-purple">
            {t('card2Title')}
          </Typography>
          <div className="flex w-20 h-20 bg-primary-purple justify-center items-center rounded-full max-lg:w-12 max-lg:h-12">
            <ClipboardIcon size={isDesktop ? '48' : '29'} />
          </div>
        </div>

        <div className="absolute w-[250px] h-[250px] rounded-[40px] overflow-hidden p-6 bg-[url('/assets/future/future_1.jpg')] bg-cover bg-center max-lg:w-[160px] max-lg:h-[160px] max-lg:p-3 max-lg:pt-2 max-lg:rounded-2xl future-element3">
          <div className="absolute inset-0 bg-gradient-to-b from-black/50 to-black/80" />
          <div className="relative flex flex-col justify-between h-full text-white text-start">
            <Typography
              variant={isDesktop ? 'body2' : 'caption'}
              weight={isDesktop ? 'semibold' : 'medium'}
              className="text-white">
              {t('card3Title')}
            </Typography>
            <img src="/assets/future/future_2.png" alt="" className="object-fill" />
          </div>
        </div>

        <div className="absolute flex flex-col w-[240px] h-[240px] bg-secondary-200 p-6 rounded-[40px] justify-between text-start max-lg:w-[160px] max-lg:h-[160px] max-lg:p-3 max-lg:pt-2 max-lg:rounded-2xl future-element4">
          <Typography
            variant={isDesktop ? 'body2' : 'caption'}
            weight={isDesktop ? 'semibold' : 'medium'}
            className="text-primary-blue">
            {t('card4Title')}
          </Typography>
          <div className="flex w-20 h-20 bg-primary-blue justify-center items-center rounded-full max-lg:w-12 max-lg:h-12">
            <GridEditIcon size={isDesktop ? '48' : '29'} />
          </div>
        </div>

        <div className="absolute flex flex-col w-[250px] h-[245px] bg-secondary-200 px-5 py-3 rounded-[40px] justify-end text-start bg-[url('/assets/future/future_3.jpg')] bg-cover bg-center shadow-[inset_0_0_0_1px_rgba(255,255,255,0.32)] max-lg:w-[160px] max-lg:h-[160px] max-lg:p-3 max-lg:pb-0 max-lg:rounded-2xl items-center future-element5">
          <div className="flex bg-white rounded-[20px] p-3 max-lg:p-2 max-lg:rounded-xl max-lg:w-[144px] gap-3">
            <div>
              <ZapIcon size={isDesktop ? '24' : '14'} />
            </div>
            <Typography variant={isDesktop ? 'body2' : 'caption'} weight={isDesktop ? 'semibold' : 'medium'}>
              {t('card5Title')}
            </Typography>
          </div>
        </div>
      </div>
    </section>
  )
}
