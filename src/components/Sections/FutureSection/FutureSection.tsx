'use client'

import { useEffect, useLayoutEffect } from 'react'
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

export const FutureSection = () => {
  const t = useTranslations('FutureSection')

  useLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger)

    if (ScrollTrigger.getAll().length === 0) {
      const width = window.innerWidth
      if (width < 400) runAnimations(0.7, 1.1)
      else if (width < 768) runAnimations(0.7, 1.5)
      else if (width <= 1024) runAnimations(1, 2)
      else if (width <= 1350) runAnimations(1, 2.3)
      else runAnimations(1, 3)
    }

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill())
    }
  }, [])

  const runAnimations = (targetScale: number, initialScale: number) => {
    const elementSettings = [
      { selector: '.future-element1', x: 200, y: -800 },
      { selector: '.future-element2', x: 1100, y: -200 },
      { selector: '.future-element3', x: 1000, y: 700 },
      { selector: '.future-element4', x: -1000, y: 600 },
      { selector: '.future-element5', x: -1100, y: -300 }
    ]

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
            end: '110%',
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
          start: 'bottom bottom',
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

  return (
    <section>
      <LogoSlider />

      <div className="relative flex items-center justify-center text-center w-full h-[975px] overflow-hidden future-section">
        <div className="flex flex-col max-w-full w-[432px] scaleText opacityText max-lg:w-[372px] max-md:w-[252px]">
          <Typography variant="h3" weight="medium">
            {t('title')}
          </Typography>
          <Typography variant="body2" weight="regular" className="text-description">
            {t('subtitle')}
          </Typography>
        </div>

        <div className="absolute flex flex-col w-[240px] h-[240px] bg-primary-purple p-6 rounded-[40px] max-lg:w-[160px] max-lg:h-[160px] max-lg:p-3 max-lg:pb-2 max-lg:rounded-2xl future-element1">
          <Typography variant="body2" weight="semibold" className="text-white">
            {t('card1Title')}
          </Typography>
          <div className="flex gap-1 h-full items-end max-lg:gap-[3px]">
            {[...Array(4)].map((_, i) => (
              <div
                key={i}
                className={cn(
                  'flex justify-center items-end bg-white bg-opacity-[16%]',
                  'h-[101px] p-2 rounded-[15px] w-[45px]',
                  i === 1 && 'items-start',
                  i === 2 && 'items-center'
                )}>
                <UserOctagonIcon size="32" />
              </div>
            ))}
          </div>
        </div>

        <div className="opacity-1 absolute flex flex-col w-[250px] h-[250px] bg-secondary-100 p-6 rounded-[40px] justify-between text-start max-lg:w-[160px] max-lg:h-[160px] max-lg:p-3 max-lg:pt-2 max-lg:rounded-2xl future-element2">
          <Typography variant="body2" weight="semibold" className="text-primary-purple">
            {t('card2Title')}
          </Typography>
          <div className="flex w-20 h-20 bg-primary-purple justify-center items-center rounded-full max-lg:w-12 max-lg:h-12">
            <ClipboardIcon size="48" />
          </div>
        </div>

        <div className="absolute w-[250px] h-[250px] rounded-[40px] overflow-hidden p-6 bg-[url('/assets/future/future_1.jpg')] bg-cover bg-center max-lg:w-[160px] max-lg:h-[160px] max-lg:p-3 max-lg:pt-2 max-lg:rounded-2xl future-element3">
          <div className="absolute inset-0 bg-gradient-to-b from-black/50 to-black/80" />
          <div className="relative flex flex-col justify-between h-full text-white text-start">
            <Typography variant="body2" weight="semibold" className="text-white">
              {t('card3Title')}
            </Typography>
            <img src="/assets/future/future_2.png" alt="" className="object-fill" />
          </div>
        </div>

        <div className="absolute flex flex-col w-[240px] h-[240px] bg-secondary-200 p-6 rounded-[40px] justify-between text-start max-lg:w-[160px] max-lg:h-[160px] max-lg:p-3 max-lg:pt-2 max-lg:rounded-2xl future-element4">
          <Typography variant="body2" weight="semibold" className="text-primary-blue">
            {t('card4Title')}
          </Typography>
          <div className="flex w-20 h-20 bg-primary-blue justify-center items-center rounded-full max-lg:w-12 max-lg:h-12">
            <GridEditIcon size="48" />
          </div>
        </div>

        <div className="absolute flex flex-col w-[250px] h-[245px] bg-secondary-200 px-5 py-3 rounded-[40px] justify-end text-start bg-[url('/assets/future/future_3.jpg')] bg-cover bg-center shadow-[inset_0_0_0_1px_rgba(255,255,255,0.32)] max-lg:w-[160px] max-lg:h-[160px] max-lg:p-3 max-lg:pb-0 max-lg:rounded-2xl items-center future-element5">
          <div className="flex bg-white rounded-[20px] p-3 max-lg:p-2 max-lg:rounded-xl max-lg:w-[144px]">
            <div>
              <ZapIcon size="24" />
            </div>
            <Typography variant="body2" weight="semibold">
              {t('card5Title')}
            </Typography>
          </div>
        </div>
      </div>
    </section>
  )
}
