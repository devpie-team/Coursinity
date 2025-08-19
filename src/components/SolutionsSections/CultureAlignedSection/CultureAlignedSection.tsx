'use client'

import { useEffect, useRef, useState, useLayoutEffect } from 'react'
import { Button } from '@/components/primitives/button'
import { Typography } from '@/components/ui'
import { Card } from './_components/Card/Cards'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useLocale, useTranslations } from 'next-intl'
import { FadeInOnView } from '@/components/FadeInOnView/FadeInOnView'

gsap.registerPlugin(ScrollTrigger)

export const CultureAlignedSection = () => {
  const [isMobile, setIsMobile] = useState(false)
  const [isTablet, setIsTablet] = useState(false)
  const [isDesktop, setIsDesktop] = useState(true)
  const locale = useLocale()
  const isArabic = locale === 'ar'
  const t = useTranslations('S_CultureSection')

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

  const cardRefs = useRef<(HTMLDivElement | null)[]>([])

  const cards = [
    {
      title: t('cards.0.title'),
      description: t('cards.0.description'),
      className:
        'absolute left-[-300px] top-[320px] max-lg:left-[-20vw] max-lg:top-[180px] max-md:left-[40px] max-md:top-[200px] '
    },
    {
      title: t('cards.1.title'),
      description: t('cards.1.description'),
      className:
        'absolute left-[-320px] bottom-[40px] rotate-[-2.95deg] max-lg:left-[-20vw] max-lg:bottom-[160px] max-lg:rotate-[-2deg] max-md:bottom-[30px] max-md:left-[80px] max-md:rotate-0'
    },
    {
      title: t('cards.2.title'),
      description: t('cards.2.description'),
      className:
        'absolute  left-[400px] top-[315px]  max-lg:left-[35vw] max-lg:top-[165px] max-md:top-[340px] max-md:left-[80px]'
    },
    {
      title: t('cards.3.title'),
      description: t('cards.3.description'),
      className:
        'absolute left-[375px] bottom-[50px] rotate-[5deg] max-lg:left-[35vw] max-lg:bottom-[160px] max-lg:rotate-[2deg] max-md:rotate-0 max-md:bottom-[170px] max-md:left-[40px]'
    }
  ]

  useLayoutEffect(() => {
    const timeoutId = setTimeout(() => {
      const ctx = gsap.context(() => {
        cardRefs.current.forEach((card, i) => {
          if (!card) return

          ScrollTrigger.getAll().forEach((trigger) => {
            if (trigger.vars.id === `culture-card-${i}`) {
              trigger.kill()
            }
          })

          if (isDesktop) {
            gsap.fromTo(
              card,
              { y: 0, opacity: 1 },
              {
                y: -600,
                opacity: 0.5,
                ease: 'none',
                scrollTrigger: {
                  trigger: '.culture-cards-trigger',
                  start: 'top bottom',
                  end: 'bottom top',
                  scrub: true,
                  id: `culture-card-${i}`,
                  markers: false
                }
              }
            )
          } else {
            gsap.fromTo(
              card,
              { opacity: 1, scale: 0, transformOrigin: 'center center' },
              {
                opacity: 1,
                scale: 1,
                ease: 'power2.out',
                duration: 0.7,
                scrollTrigger: {
                  trigger: card,
                  start: 'top bottom',
                  end: 'bottom top',
                  toggleActions: 'play reverse play reverse',
                  id: `culture-card-${i}`,
                  markers: false
                }
              }
            )
          }
        })
      })

      return () => ctx.revert()
    }, 200)

    return () => {
      clearTimeout(timeoutId)
    }
  }, [isMobile, isTablet, isDesktop])

  return (
    <section
      className="flex flex-col gap-10 pt-[120px] justify-center items-center max-lg:pt-20 max-md:px-4 overflow-hidden w-full bg-no-repeat custom-shadow-bg "
      style={{
        backgroundImage: "url('/assets/solutions/custom_training_section/custom_training_1.png')",
        backgroundSize: '1920px auto',
        backgroundPosition: 'center 6%'
      }}>
      <div className="flex flex-col gap-8 max-w-[800px]  items-center max-lg:max-w-[430px]">
        <div className="flex flex-col gap-6 text-center">
          <FadeInOnView variant="fade-up">
            <Typography variant={isDesktop ? 'h3' : 'h5'} weight="medium" className="text-white">
              {t('title')}
            </Typography>
          </FadeInOnView>
          <FadeInOnView variant="fade-up">
            <Typography variant="body3" weight="regular" className="text-white opacity-70 ">
              {t('description')}
            </Typography>
          </FadeInOnView>
        </div>
        <FadeInOnView variant="fade-up">
          <Button href={`/${locale}/contact-form`} variant="purple" className="w-[275px]">
            {t('button')}
          </Button>
        </FadeInOnView>
      </div>

      <div className="relative w-[410px] h-[810px] culture-cards-trigger">
        <img
          src="/assets/solutions/culture_section/culture_section_1.png"
          alt="culture_section_1"
          className="object-contain w-full h-full"
        />
        {/*    <div className="absolute bottom-0 left-0 w-full h-[450px] bg-[linear-gradient(0deg,_#0D0D0D_0%,_rgba(13,13,13,0)_100%)]" /> */}

        {cards.map((card, idx) => (
          <Card
            key={idx}
            ref={(el) => {
              cardRefs.current[idx] = el
            }}
            title={card.title}
            description={card.description}
            className={card.className}
          />
        ))}
      </div>
    </section>
  )
}
