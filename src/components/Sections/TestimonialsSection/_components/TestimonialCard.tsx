'use client'

import { Typography } from '@/components/ui'
import { DoubleQuotesIcon } from '@/components/icons/DoubleQuotesIcon'
import { useLocale, useTranslations } from 'next-intl'
import { cn } from '@/lib/utils'
import { useEffect, useRef } from 'react'

type Testimonial = {
  company: string
  feedback: string
  userImg: string
  userName: string
  userPosition: string
  businessTypes?: string[]
}
type Position = 'left' | 'center' | 'right'

type TestimonialCardProps = {
  data: Testimonial
  position: Position
  isDesktop: boolean
}

// 👇 Хук для блокування Lenis прокрутки
const usePreventLenisScroll = (ref: React.RefObject<HTMLElement | null>) => {
  useEffect(() => {
    const el = ref.current
    if (!el) return

    const handleWheel = (e: WheelEvent) => {
      const isScrollable = el.scrollHeight > el.clientHeight || el.scrollWidth > el.clientWidth

      if (isScrollable) {
        e.stopPropagation()
      }
    }

    el.addEventListener('wheel', handleWheel, { passive: false })
    return () => el.removeEventListener('wheel', handleWheel)
  }, [ref])
}

export const TestimonialCard = ({ data, position, isDesktop }: TestimonialCardProps) => {
  const t = useTranslations('TestimonialsSection')
  const locale = useLocale()
  const isArabic = locale === 'ar'
  const scrollContainerRef = useRef<HTMLDivElement>(null)

  usePreventLenisScroll(scrollContainerRef)

  let positionClass = ''
  if (position === 'left')
    positionClass = isArabic
      ? 'absolute scale-[70%] opacity-40 translate-y-[160px] translate-x-[350px] z-0 transition-all duration-700 pointer-events-none max-[1600px]:scale-[55%] max-lg:translate-y-0 max-lg:scale-100 max-lg:opacity-80 max-lg:translate-x-[150%]'
      : 'absolute scale-[70%] opacity-40 translate-y-[160px] -translate-x-[350px] z-0 transition-all duration-700 pointer-events-none max-[1600px]:scale-[55%] max-lg:translate-y-0 max-lg:scale-100 max-lg:opacity-80 max-lg:-translate-x-[150%]'
  if (position === 'center')
    positionClass = 'absolute scale-100 opacity-100 z-10 transition-all duration-700 pointer-events-auto'
  if (position === 'right')
    positionClass = isArabic
      ? 'absolute scale-[70%] opacity-40 -translate-y-[160px] -translate-x-[425px] z-0 transition-all duration-700 pointer-events-none max-[1600px]:scale-[55%] max-lg:-translate-y-0 max-lg:scale-100 max-lg:opacity-80 max-lg:-translate-x-[150%]'
      : 'absolute scale-[70%] opacity-40 -translate-y-[160px] translate-x-[425px] z-0 transition-all duration-700 pointer-events-none max-[1600px]:scale-[55%] max-lg:-translate-y-0 max-lg:scale-100 max-lg:opacity-80 max-lg:translate-x-[150%]'

  const businessTypes = data.businessTypes?.filter((type) => type.trim() !== '') || []

  return (
    <div
      className={cn(
        `w-[880px] h-[440px] p-4 bg-secondary-300 rounded-[20px] flex gap-12 max-lg:gap-4 max-lg:w-[710px] max-lg:h-auto max-md:flex-col max-md:w-[343px] max-md:gap-[18px] max-md:p-[10px] justify-between ${positionClass}`,
        isArabic && 'max-md:h-[500px]'
      )}>
      <div className="flex flex-col justify-between p-4 max-lg:p-2 order-1 max-md:order-2 max-md:p-0 max-md:gap-4">
        <Typography variant={isDesktop ? 'h6' : 'body3'} weight="medium" className="max-md:px-2">
          {t('businessTypesTitle')}
        </Typography>

        {businessTypes.length > 0 && (
          <div className="flex flex-wrap gap-3 max-w-[300px]">
            {businessTypes.map((type, index) => (
              <div key={index} className="bg-secondary-100 rounded-[8px] px-3 py-2 whitespace-nowrap">
                <Typography variant={isDesktop ? 'body2' : 'body3'} weight="medium" className="text-primary-purple">
                  {type}
                </Typography>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="flex flex-col bg-white p-5 gap-[10px] rounded-2xl max-w-[560px] order-2 max-md:order-1 max-md:p-4">
        <div>
          <DoubleQuotesIcon />
        </div>
        <div className="flex flex-col gap-8">
          <div className="flex flex-col gap-2">
            <Typography variant={isDesktop ? 'h6' : 'body2'} weight="medium">
              {data.company}
            </Typography>
            <div
              ref={scrollContainerRef}
              className={cn(
                isDesktop
                  ? 'max-h-[170px] overflow-y-auto pr-2 pl-2 lenis-exclude scroll-smooth-custom'
                  : 'max-h-none overflow-visible',
                'text-description'
              )}>
              <Typography variant={isDesktop ? 'h6' : 'caption'} weight="regular">
                {data.feedback}
              </Typography>
            </div>
          </div>

          <div className="flex gap-[20px] p-[10px] rounded-[5px] bg-secondary-300 max-md:gap-3 items-center">
            <img
              src={data.userImg}
              alt={data.userName}
              className="object-cover h-[60px] w-[60px] aspect-square rounded-[10px] max-lg:h-[40px] max-lg:w-[40px]"
            />
            <div className="flex flex-col gap-1">
              <Typography variant={isDesktop ? 'body1' : 'body3'} weight="medium">
                {data.userName}
              </Typography>
              <Typography variant={isDesktop ? 'body3' : 'caption'} weight="regular" className="text-description">
                {data.userPosition}
              </Typography>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
