'use client'

import React from 'react'
import { useEffect, useRef, useMemo, useCallback, useState } from 'react'
import { gsap } from 'gsap'
import { useLocale, useTranslations } from 'next-intl'
import { Typography } from '@/components/ui'

import Lottie, { type LottieRefCurrentProps, type LottieComponentProps } from 'lottie-react'

import { BuildingIcon, BusinessIcon, EducationIcon, SmileIcon } from '@/components/icons'
import { get, set } from 'idb-keyval'

// Types
type AnimationData = {
  v: string
  fr: number
  ip: number
  op: number
  w: number
  h: number
  nm: string
  ddd: number
  assets: any[]
  layers: any[]
  [key: string]: any
}

interface AnimationPath {
  path: string
  className: string
}

interface AnimationItem {
  animation: AnimationData | null
  className: string
}

const animationCache: Record<string, AnimationData> = {}

export const ImpactSection = () => {
  const t = useTranslations('ImpactSection')
  const locale = useLocale()
  const isArabic = locale == 'ar'
  const containerRef = useRef<HTMLDivElement>(null)
  const wrapperRef = useRef<HTMLDivElement>(null)
  const sectionRef = useRef<HTMLDivElement>(null)
  const [isMobile, setIsMobile] = useState<boolean>(false)
  const [animations, setAnimations] = useState<AnimationItem[]>([])
  const [isTablet, setIsTablet] = useState<boolean>(false)
  const [isDesktop, setIsDesktop] = useState<boolean>(true)
  const [isVisible, setIsVisible] = useState<boolean>(false)

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

  const GROUP_COUNT = 2
  const ANIMATION_COUNT = 9
  const lottieRefs = useRef(
    Array.from({ length: ANIMATION_COUNT }, () =>
      Array.from({ length: GROUP_COUNT }, () => React.createRef<LottieRefCurrentProps>())
    )
  ).current

  useEffect(() => {
    const section = sectionRef.current
    if (!section) return

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0]
        setIsVisible(entry.isIntersecting)

        if (!entry.isIntersecting) {
          lottieRefs.forEach((animationGroup) => {
            animationGroup.forEach((ref) => {
              ref.current?.stop()
            })
          })
        }
      },
      {
        rootMargin: '100px',
        threshold: 0.1
      }
    )

    observer.observe(section)

    return () => {
      observer.disconnect()
    }
  }, [])

  const loadAnimation = useCallback(
    async (path: string): Promise<AnimationData | null> => {
      if (animationCache[path]) return animationCache[path]

      const cached = await get(path)
      if (cached) {
        animationCache[path] = cached
        return cached as AnimationData
      }

      try {
        const response = await fetch(path)
        const data = (await response.json()) as AnimationData
        animationCache[path] = data
        await set(path, data)
        return data
      } catch (error) {
        console.error(`❌ Failed to load animation: ${path}`, error)
        return null
      }
    },
    [isMobile]
  )

  const animationPaths = useMemo<AnimationPath[]>(() => {
    return [
      {
        path: `/assets/lottie/impact/${!isMobile ? 'desktop' : 'mobile'}/${locale}/1.json`,
        className:
          'absolute w-[167px] h-[243px] left-[0px] top-[52px] md:w-[362px] md:h-[280px] md:top-[146px] md:left-[30px] lg:left-0'
      },
      {
        path: `/assets/lottie/impact/${!isMobile ? 'desktop' : 'mobile'}/${locale}/2.json`,
        className:
          'absolute w-[171px] h-[227px] right-[14px] bottom-[0px] md:w-[362px] md:h-[308px] md:bottom-[27px] md:right-[16px]'
      },
      {
        path: `/assets/lottie/impact/${!isMobile ? 'desktop' : 'mobile'}/${locale}/3.json`,
        className:
          'absolute w-[139px] h-[31px] left-[80px] top-[0px] md:w-[253px] md:h-[65px] md:top-[22px] md:left-[162px]'
      },
      {
        path: `/assets/lottie/impact/${!isMobile ? 'desktop' : 'mobile'}/${locale}/4.json`,
        className:
          'absolute w-[162px] h-[24px] right-[242px] top-[120px] md:w-[296px] md:h-[65px] md:top-[341px] md:right-[390px]'
      },
      {
        path: `/assets/lottie/impact/${!isMobile ? 'desktop' : 'mobile'}/en/5.json`,
        className:
          'absolute w-[87px] h-[29px] left-[223px] md:w-[156px] md:h-[52px]  bottom-[30px] md:bottom-[151px] md:left-[421px]'
      },
      {
        path: `/assets/lottie/impact/${!isMobile ? 'desktop' : 'mobile'}/${locale}/6.json`,
        className:
          'absolute w-[146px] h-[110px] right-[232px] top-[5px] md:w-[309px] md:h-[223px]  md:top-[35px] md:right-[556px]'
      },
      {
        path: `/assets/lottie/impact/${!isMobile ? 'desktop' : 'mobile'}/${locale}/7.json`,
        className:
          'absolute w-[136px] h-[132px] left-[213px] top-[43px] md:w-[269px] md:h-[160px] md:top-[93px] md:left-[488px]'
      },
      {
        path: `/assets/lottie/impact/${!isMobile ? 'desktop' : 'mobile'}/${locale}/8.json`,
        className:
          'absolute w-[154px] h-[192px] left-[352px] bottom-[17px] md:w-[362px] md:h-[316px] md:bottom-0 md:left-[619px]'
      },
      {
        path: `/assets/lottie/impact/${!isMobile ? 'desktop' : 'mobile'}/en/5.json`,
        className:
          'absolute w-[87px] h-[29px] right-[103px] top-[121px] md:w-[156px] md:h-[52px] md:top-[133px] md:right-[251px]'
      }
    ]
  }, [locale, isMobile])

  useEffect(() => {
    const loadAllAnimations = async () => {
      const loadedAnimations = await Promise.all(
        animationPaths.map(async ({ path, className }) => {
          const data = await loadAnimation(path)
          return { animation: data, className }
        })
      )
      setAnimations(loadedAnimations)
    }

    loadAllAnimations()
  }, [animationPaths, loadAnimation, isMobile])

  useEffect(() => {
    const wrapper = wrapperRef.current
    const container = containerRef.current
    if (!wrapper || !container) return

    const fromX = isArabic ? (isMobile ? 200 : isTablet ? 1000 : 1500) : isMobile ? -200 : isTablet ? -1000 : -1500
    const toX = isArabic ? fromX - 200 : fromX + 200

    const ctx = gsap.context(() => {
      gsap.fromTo(
        wrapper,
        { x: fromX },
        {
          x: toX,
          ease: 'none',
          scrollTrigger: {
            trigger: container,
            start: 'top bottom',
            end: 'bottom top',
            scrub: true
          }
        }
      )
    }, container)

    return () => ctx.revert()
  }, [locale, isMobile, isTablet])

  useEffect(() => {
    if (animations.length === 0 || !isVisible) return

    let timeouts: NodeJS.Timeout[] = []
    let intervals: NodeJS.Timeout[] = []

    const STAGGER = 600

    const playAllStaggered = () => {
      if (!isVisible) return

      animations.forEach((_, i) => {
        timeouts.push(
          setTimeout(() => {
            if (!isVisible) return

            for (let group = 0; group < GROUP_COUNT; group++) {
              const ref = lottieRefs[i][group].current
              ref?.stop()
              ref?.play()
            }
          }, i * STAGGER)
        )
      })
    }

    if (isVisible) {
      playAllStaggered()

      const intervalDuration = 3000 + (ANIMATION_COUNT - 1) * STAGGER
      const interval = setInterval(() => {
        if (isVisible) {
          playAllStaggered()
        }
      }, intervalDuration)
      intervals.push(interval)
    }

    return () => {
      timeouts.forEach(clearTimeout)
      intervals.forEach(clearInterval)

      lottieRefs.forEach((animationGroup) => {
        animationGroup.forEach((ref) => {
          ref.current?.stop()
        })
      })
    }
  }, [animations, isMobile, isVisible])

  return (
    <section
      ref={sectionRef}
      className="pt-32 pb-[80px] bg-black flex flex-col gap-[52px] overflow-hidden max-md:pt-20 max-lg:pb-[100px]">
      <div className="flex flex-col gap-4 text-center text-white px-4">
        <Typography
          variant={isDesktop ? 'h3' : 'h5'}
          weight="medium"
          data-aos="fade"
          data-aos-offset={isMobile ? '-100' : '-50'}>
          {t('title')}
        </Typography>
        <Typography variant="body3" data-aos="fade" data-aos-offset={isMobile ? '-100' : '-50'}>
          {t('subtitle')}
        </Typography>
      </div>

      <div
        ref={containerRef}
        className="relative h-[408px] min-w-[786px]  md:h-[672px] md:min-w-[1905px] max-[1705]:min-w-[1705px] bg-black overflow-hidden ">
        <div ref={wrapperRef} className="absolute flex">
          {Array.from({ length: isMobile ? 1 : GROUP_COUNT }).map((_, groupIdx) => (
            <div
              key={groupIdx}
              className="relative flex-shrink-0"
              style={{ width: isMobile ? '768px' : '1705px', height: isMobile ? '408px' : '633px' }}>
              <div className="blue-gradient-border rounded-[10px] absolute w-[48px] h-[48px]  md:w-[100px] md:h-[100px] bottom-[113px] md:bottom-[17px]  left-[264px] flex items-center justify-center ">
                <BusinessIcon />
              </div>
              <div className="blue-gradient-border rounded-[10px] absolute w-[48px] h-[48px]  md:w-[100px] md:h-[100px] top-[15px] md:top-[30px] right-[50px] flex items-center justify-center ">
                <BuildingIcon />
              </div>
              <div className="blue-gradient-border rounded-[10px] absolute w-[48px] h-[48px]  md:w-[100px] md:h-[100px] top-0 right-[380px] md:right-[438px] flex items-center justify-center ">
                <EducationIcon />
              </div>
              {/*   <div className="blue-gradient-border rounded-[10px] absolute w-[48px] h-[48px]  md:w-[100px] md:h-[100px] bottom-[40px] md:bottom-[58px] right-[600px] md:right-[507px] flex items-center justify-center ">
                <SmileIcon />
              </div> */}
              {animations.map(
                ({ animation, className }, i) =>
                  animation && (
                    <Lottie
                      key={`${groupIdx}-${i}`}
                      lottieRef={lottieRefs[i][groupIdx]}
                      animationData={animation}
                      autoplay={false}
                      className={className}
                      loop={false}
                      style={{
                        visibility: isVisible ? 'visible' : 'hidden'
                      }}
                    />
                  )
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
