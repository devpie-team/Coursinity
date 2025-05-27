import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useTranslations } from 'next-intl'
import { RotatedCard } from './components/RotatedCard/RotatedCard'
import { Typography } from '@/components/ui'
import { DartIcon, LayersIcon, MoonIcon, PlanetIcon, SectorIcon, StarIcon } from '@/components/icons'

gsap.registerPlugin(ScrollTrigger)

const CARDS = [
  { icon: <LayersIcon />, rotation: '1.85deg', top: '47px' },
  { icon: <DartIcon />, rotation: '-3.26deg', top: '96px' },
  { icon: <SectorIcon />, rotation: '2.71deg', top: '0px' },
  { icon: <PlanetIcon />, rotation: '-1.85deg', top: '0px' },
  { icon: <MoonIcon />, rotation: '3.22deg', top: '32px' },
  { icon: <StarIcon />, rotation: '-3.6deg', top: '0px' }
]

export const BuildSection = () => {
  const t = useTranslations('Build')
  const scrollWrapperBuildRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!scrollWrapperBuildRef.current) return

    let sections = gsap.utils.toArray('.horizontal-container .page')

    const scrollWrapper = scrollWrapperBuildRef.current as HTMLElement

    gsap.to(sections, {
      xPercent: -310,
      ease: 'none',
      scrollTrigger: {
        trigger: scrollWrapper,
        pin: true,
        start: 'bottom bottom',
        end: () => '+=' + scrollWrapper.offsetWidth,
        scrub: 1
      }
    })
  }, [])

  return (
    <section
      className="build-section flex flex-col items-center gap-12 pt-[140px] px-10 max-w-[100vw] bg-black pb-[150px] text-white"
      ref={scrollWrapperBuildRef}>
      <div className="flex flex-col items-center gap-4">
        <Typography variant="h3">{t('title')}</Typography>
        <Typography variant="body3" className="text-[#FFFFFFA3]">
          {t('subtitle')}
        </Typography>
      </div>

      <div className="horizontal-container flex h-[536px] items-center gap-[26px] pb-[100px] overflow-hidden w-full">
        {CARDS.map(({ icon, rotation, top }, id) => (
          <RotatedCard
            key={id}
            title={t(`cards.${id}.title`)}
            subtitle={t(`cards.${id}.subtitle`)}
            icon={icon}
            rotation={rotation}
            id={id}
            top={top}
          />
        ))}
      </div>
    </section>
  )
}
