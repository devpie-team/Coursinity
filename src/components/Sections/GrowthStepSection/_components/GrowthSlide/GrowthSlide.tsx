'use client'

import { useCallback, useEffect, useMemo, useState } from 'react'
import { Typography } from '@/components/ui'
import { CheckCircleIcon } from '@/components/icons'
import { PlayCircleIcon } from '@/components/icons/PlayCircleIcon'
import clsx from 'clsx'
import { cn } from '@/lib/utils'
import { useTranslations } from 'next-intl'
import { useResponsiveBreakpoints } from '@/hooks/useResponsiveBreakpoints'

type SlideData = {
  id: number
  title: string
  image: string
  imageClasses?: string
  bullets: string[]
}

type Props = {
  index: number
  activeIndex: number
  onClick: (index: number, position: 'left' | 'right' | 'center') => void
  data: SlideData
  showDetails: boolean
}

const getRelativePosition = (index: number, activeIndex: number): 'left' | 'right' | 'center' => {
  if (index === activeIndex) return 'center'
  if ((index + 1) % 3 === activeIndex) return 'left'
  return 'right'
}

// Memoize styles to prevent recalculation
const getStyles = (position: string) => {
  if (position === 'left') {
    return 'z-0 opacity-40 rotate-[-5deg] -translate-x-[115%] w-[900px] h-[600px] transform scale-[70%] bg-custom-gradient custom-shadow-secondary top-1/2 left-[50vw] -translate-y-1/2 transition-all duration-500 ease-out will-change-transform max-[1150px]:scale-[0.5] max-lg:h-[292px] max-lg:w-[401px] max-lg:scale-[0.7] max-md:w-[310px] max-md:h-[270px] max-md:left-[45vw] max-md:rotate-[0deg]'
  }
  if (position === 'center') {
    return 'z-10 opacity-100 rotate-0 -translate-x-1/2 w-[900px] h-[600px] bg-custom-gradient custom-shadow top-1/2 left-1/2 -translate-y-1/2 transition-all duration-500 ease-out will-change-transform max-[1150px]:transform max-[1150px]:scale-[0.8] max-lg:h-[292px] max-lg:w-[401px] max-lg:scale-[1] max-md:w-[310px] max-md:h-[270px]'
  }
  if (position === 'right') {
    return 'z-0 opacity-40 rotate-[5deg] translate-x-[7vw] w-[900px] h-[600px] transform scale-[70%] bg-custom-gradient custom-shadow-secondary top-1/2 left-1/2 -translate-y-1/2 transition-all duration-500 ease-out will-change-transform max-[1440px]:translate-x-[10vw] max-[1150px]:transform max-[1150px]:scale-[0.5] max-lg:h-[292px] max-lg:w-[401px] max-lg:scale-[0.7] max-md:w-[310px] max-md:h-[270px] max-md:rotate-[0deg]'
  }
  return ''
}

export const GrowthSlide = ({ index, activeIndex, onClick, data, showDetails }: Props) => {
  const t = useTranslations('GrowthStepSection')
  const [isMobile, setIsMobile] = useState(false)
  const [isTablet, setIsTablet] = useState(false)
  const [isDesktop, setIsDesktop] = useState(true)

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

  const position = useMemo(() => getRelativePosition(index, activeIndex), [index, activeIndex])
  const style = useMemo(() => getStyles(position), [position])
  const shouldShowText = useMemo(() => isDesktop || showDetails, [isDesktop, showDetails])

  const handleSlideClick = useCallback(
    (e: React.MouseEvent) => {
      e.stopPropagation()
      if (!isDesktop && position === 'center' && !showDetails) {
        onClick(index, position) // тригер глобального setDetailsShownFor
      } else {
        onClick(index, position) // переключення між слайдами
      }
    },
    [isDesktop, position, showDetails, onClick, index]
  )

  return (
    <div
      className={clsx(
        'absolute flex flex-col rounded-2xl justify-between cursor-pointer py-10 overflow-hidden max-lg:px-[30px] max-lg:pb-[10px] max-lg:pt-6 max-lg:justify-between growth-slide',
        style
      )}
      onClick={handleSlideClick}>
      <div className={cn(!isDesktop && showDetails && 'flex flex-col gap-4')}>
        <div className="flex gap-5 items-center justify-center max-lg:gap-2">
          <Typography variant={isDesktop ? 'h4' : 'body1'} weight="medium" className="text-white">
            {data.title}
          </Typography>
          <div>
            <PlayCircleIcon size={isDesktop ? '40px' : '27px'} />
          </div>
        </div>
        {!isDesktop && showDetails && index === 0 && (
          <div>
            <Typography variant="caption" weight="regular" className="text-white">
              {t('common.subtitle')}
            </Typography>
          </div>
        )}
      </div>

      <div className="flex items-center justify-center w-full">
        {shouldShowText ? (
          <div className="flex flex-col w-full">
            {isDesktop && (
              <div className="flex justify-center mb-6">
                <img
                  src={data.image}
                  alt={data.title}
                  draggable={false}
                  loading="lazy"
                  className={clsx('object-contain', data.imageClasses)}
                />
              </div>
            )}
            <div className="flex px-10 max-lg:p-0 max-lg:flex-col max-lg:gap-2 max-lg:mb-8 max-md:mb-0">
              {data.bullets.map((text, i) => (
                <div
                  key={i}
                  className="flex flex-col h-[148px] w-[271px] gap-5 p-5 max-lg:gap-2 max-lg:max-h-[40px] max-lg:w-full max-lg:p-0 max-lg:flex-row">
                  <div>
                    <CheckCircleIcon size={isDesktop ? '32px' : '16px'} fill="white" />
                  </div>
                  <Typography
                    variant={isDesktop ? 'body2' : 'subtitle'}
                    weight={isDesktop ? 'semibold' : 'regular'}
                    className="text-white opacity-80">
                    {text}
                  </Typography>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <img
            src={data.image}
            alt={data.title}
            draggable={false}
            loading="lazy"
            className={clsx('object-contain', data.imageClasses)}
          />
        )}
      </div>
    </div>
  )
}
