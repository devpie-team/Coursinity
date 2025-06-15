'use client'
import { useEffect, useRef, useState, useMemo, useCallback } from 'react'
import { gsap } from 'gsap'
import { useTranslations } from 'next-intl'
import { Typography } from '@/components/ui'
import { BuildingIcon, BusinessIcon, EducationIcon, SmileIcon, StarsIcon } from '@/components/icons'
import AOS from 'aos'
import 'aos/dist/aos.css'

// Constants for screen sizes
const SCREEN_SIZES = {
  MOBILE: 768,
  TABLET: 1024
} as const

// Types for impact items
type ImpactItem = {
  id: string
  className: string
  content: React.ReactNode
}

export const ImpactSection = () => {
  const t = useTranslations('ImpactSection')
  const containerRef = useRef<HTMLDivElement>(null)
  const wrapperRef = useRef<HTMLDivElement>(null)
  const [screenSize, setScreenSize] = useState<'mobile' | 'tablet' | 'desktop'>('desktop')

  // Memoized screen size check
  const checkScreenSize = useCallback(() => {
    const width = window.innerWidth
    if (width < SCREEN_SIZES.MOBILE) {
      setScreenSize('mobile')
    } else if (width <= SCREEN_SIZES.TABLET) {
      setScreenSize('tablet')
    } else {
      setScreenSize('desktop')
    }
  }, [])

  useEffect(() => {
    checkScreenSize()
    window.addEventListener('resize', checkScreenSize)
    return () => window.removeEventListener('resize', checkScreenSize)
  }, [checkScreenSize])

  // Memoized animation setup
  useEffect(() => {
    const wrapper = wrapperRef.current
    const container = containerRef.current
    if (!wrapper || !container) return

    const wrapperWidth = wrapper.offsetWidth / 2
    const animation = gsap.fromTo(
      wrapper,
      { x: 0 },
      {
        x: -wrapperWidth,
        duration: 12,
        ease: 'linear',
        repeat: -1,
        paused: true
      }
    )

    // Start animation only when component is visible
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            animation.play()
          } else {
            animation.pause()
          }
        })
      },
      { threshold: 0.1 }
    )

    observer.observe(container)
    return () => {
      animation.kill()
      observer.disconnect()
    }
  }, [])

  useEffect(() => {
    AOS.init({
      once: true,
      disable: 'mobile'
    })
  }, [])

  // Memoized impact items
  const impactItems = useMemo<ImpactItem[]>(
    () => [
      {
        id: 'sectors',
        className:
          'blue-gradient-border absolute w-[362px] h-[280px] top-[146px] left-0 flex flex-col gap-[28px] p-6 items-end',
        content: (
          <>
            <div className="flex flex-col gap-2">
              <Typography variant="h3" weight="medium">
                12+
              </Typography>
              <Typography variant="body3">{t('sectors')}</Typography>
            </div>
            <img src="/assets/impact/folder.png" alt={t('sectors')} className="w-[157px] h-[128px]" />
          </>
        )
      },
      {
        id: 'smart',
        className:
          'blue-gradient-border absolute w-[253px] h-[65px] top-[22px] left-[162px] p-[6px] flex items-center before:rounded-[54px]  gap-[9px]',
        content: (
          <>
            <div className="flex items-center justify-center w-[53px] h-[53px] rounded-full bg-primary-blue">
              <Typography variant="h5">#</Typography>
            </div>
            <Typography variant="body1" weight="medium">
              {t('smart')}
            </Typography>
          </>
        )
      },
      {
        id: 'government',
        className: 'blue-gradient-border absolute w-[269px] h-[160px] top-[93px] left-[488px] p-6 flex flex-col gap-2 ',
        content: (
          <>
            <Typography variant="h3" weight="medium">
              725
            </Typography>
            <Typography variant="body3">{t('government')}</Typography>
          </>
        )
      },
      {
        id: 'learners',
        className:
          'blue-gradient-border absolute w-[309px] h-[223px] top-[35px] right-[556px] flex flex-col gap-[23px] px-8 py-[38px]',
        content: (
          <>
            <Typography variant="h3" weight="medium">
              230K+
            </Typography>
            <Typography variant="body3">{t('learners')}</Typography>
          </>
        )
      },
      {
        id: 'active',
        className:
          'blue-gradient-border absolute w-[362px] h-[316px] bottom-0 left-[619px] flex flex-col gap-[28px] p-6 items-end ',
        content: (
          <>
            <div className="flex flex-col gap-2">
              <Typography variant="h3" weight="medium">
                6
              </Typography>
              <Typography variant="body3">{t('active')}</Typography>
            </div>
            <img
              src="/assets/impact/planet.png"
              alt="Planet"
              className="w-[228px] h-[228px] absolute bottom-[-17px] right-[-21px]"
            />
          </>
        )
      },
      {
        id: 'numbers',
        className:
          'blue-gradient-border absolute w-[296px] h-[65px] bottom-[231px] right-[390px] flex items-center before:rounded-[54px]  gap-[9px]',
        content: (
          <>
            <div className="flex items-center justify-center w-[53px] h-[53px] rounded-full bg-primary-blue">
              <Typography variant="h5">#</Typography>
            </div>
            <Typography variant="body1" weight="medium">
              {t('numbers')}
            </Typography>
          </>
        )
      },
      {
        id: 'average',
        className:
          'blue-gradient-border absolute w-[362px] h-[308px] bottom-[27px] right-[16px] flex flex-col gap-3 px-[26px] py-[31px]',
        content: (
          <>
            <Typography variant="h3" weight="medium">
              9.6
            </Typography>
            <Typography variant="body3">{t('average')}</Typography>
            <img src="/assets/impact/image.png" alt="Graph" className="w-full" />
          </>
        )
      }
    ],
    [t]
  )

  return (
    <section className="pt-32 pb-[89px] bg-black flex flex-col gap-[52px] overflow-hidden" aria-label={t('title')}>
      <div className="flex flex-col gap-4 text-center text-white px-4">
        <Typography
          variant={screenSize === 'desktop' ? 'h3' : 'h5'}
          weight="medium"
          data-aos="fade"
          data-aos-offset={screenSize === 'mobile' ? '-100' : '-50'}>
          {t('title')}
        </Typography>
        <Typography
          variant="body3"
          className="text-description"
          data-aos="fade"
          data-aos-offset={screenSize === 'mobile' ? '-100' : '-50'}>
          {t('subtitle')}
        </Typography>
      </div>

      <div
        ref={containerRef}
        className="relative h-[672px] min-w-[1705px] bg-black overflow-hidden"
        role="region"
        aria-label={t('impactStats')}>
        <div ref={wrapperRef} className="absolute flex">
          {[...Array(2)].map((_, groupIdx) => (
            <div
              key={groupIdx}
              className="relative flex-shrink-0 text-white"
              style={{ width: '1705px', height: '633px' }}
              aria-hidden={groupIdx === 1}>
              {impactItems.map((item) => (
                <div key={item.id} className={item.className} role="figure" aria-label={t(item.id)}>
                  {item.content}
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
