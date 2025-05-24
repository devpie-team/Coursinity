'use client'

import CheckCircleIcon from '@/components/icons/CheckCircleIcon'
import DealIcon from '@/components/icons/DealIcon'
import DiplomaIcon from '@/components/icons/DiplomaIcon'
import { Typography } from '@/components/ui'
import { cn } from '@/lib/utils'
import { useTranslations } from 'next-intl'
import { useEffect, useState } from 'react'

const certifications = [
  { src: '/assets/certifications/CompTia.png', alt: 'CompTIA logo' },
  { src: '/assets/certifications/Microsoft_Partner.png', alt: 'Microsoft logo' },
  { src: '/assets/certifications/Minestry_of_Health.png', alt: 'Ministry of Health logo' },
  { src: '/assets/certifications/Axelos.png', alt: 'Axelos logo' },
  { src: '/assets/certifications/Dubai_Courts.png', alt: 'Dubai_Courts logo' },
  { src: '/assets/certifications/Bahri_Ship_Mgmt.png', alt: 'Bahri_Ship_Mgmt logo' },
  { src: '/assets/certifications/Digital_Dubai.png', alt: 'AxDigital_Dubaielos logo' },
  { src: '/assets/certifications/Minestry_of_Health.png', alt: 'Ministry of Health logo' }
]
const certificationsLeft = certifications.slice(0, 4)
const certificationsRight = certifications.slice(4)

export const FeaturesSection = () => {
  const t = useTranslations('Features')
  const [isMobile, setIsMobile] = useState<boolean>(false)
  const [isTablet, setIsTablet] = useState<boolean>(false)
  const [isDesktop, setIsDesktop] = useState<boolean>(true)

  useEffect(() => {
    const checkScreenSize = () => {
      const width = window.innerWidth
      setIsMobile(width < 834)
      setIsTablet(width < 1440)
      setIsDesktop(width > 1440)
    }

    checkScreenSize()

    window.addEventListener('resize', checkScreenSize)
    return () => window.removeEventListener('resize', checkScreenSize)
  }, [])
  return (
    <div className="px-[140px] pb-[140px] max-[1440px]:px-6 max-[1440px]:pt-20 max-[1440px]:pb-0">
      <div
        className={cn(
          isTablet
            ? 'flex gap-8 max-[834px]:flex-col'
            : 'flex p-8 rounded-[20px] gap-8 bg-[linear-gradient(180deg,_rgba(255,255,255,0.16)_0%,_rgba(30,141,194,0.16)_100%)] '
        )}>
        {/* Left Block */}
        <div className="flex flex-col bg-white border rounded-2xl p-8 flex-1">
          <div className={cn(isDesktop ? 'mb-6' : 'mb-2')}>
            <DiplomaIcon width={isTablet ? 40 : 64} height={isTablet ? 40 : 64} />
          </div>

          <div className="flex flex-col flex-grow gap-8 max-[1440px]:gap-6">
            <div className={cn('flex flex-col gap-4', !isDesktop && 'flex-grow')}>
              <Typography variant={isDesktop ? 'h4' : 'body1'} weight="medium">
                {t('certified.title')}
              </Typography>
              <Typography variant="button" weight="regular" className="text-[#6E6E6E]">
                {t('certified.subtitle')}
              </Typography>
            </div>

            {!isDesktop && <div className="border-t" />}

            <div className={cn('flex flex-col gap-4 max-[1440px]:gap-3', isDesktop ? 'flex-grow' : 'mt-auto')}>
              {t.raw('certified.items').map((item: string, index: number) => {
                const limitedText = !isDesktop ? item.split(' ').slice(0, 2).join(' ') : item

                return (
                  <div className="flex gap-4 items-center" key={index}>
                    <div>
                      <CheckCircleIcon width={isTablet ? 24 : 28} height={isTablet ? 24 : 28} />
                    </div>
                    <Typography variant={isDesktop ? 'body2' : 'caption'} weight="regular">
                      {limitedText}
                    </Typography>
                  </div>
                )
              })}
              <div
                className={cn(
                  'grid grid-cols-2 grid-rows-2 place-items-center mt-auto gap-[10px]  ',
                  !isDesktop && 'pt-3'
                )}>
                {certificationsLeft.map(({ src, alt }, i) => (
                  <div
                    key={i}
                    className={cn(
                      'flex bg-secondary-300 rounded-[10px] justify-center items-center w-full h-16',
                      isDesktop ? 'h-16' : 'h-[42px] '
                    )}>
                    <img src={src} alt={alt} className="max-h-[64px]" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Right Block */}
        <div className="flex flex-col bg-white border rounded-2xl p-8 flex-1">
          <div className={cn(isDesktop ? 'mb-6' : 'mb-2')}>
            <DealIcon width={isTablet ? 40 : 64} height={isTablet ? 40 : 64} />
          </div>

          <div className="flex flex-col flex-grow gap-8 max-[1440px]:gap-6">
            <div className={cn('flex flex-col gap-4', !isDesktop && 'flex-grow')}>
              <Typography variant={isDesktop ? 'h4' : 'body1'} weight="medium">
                {t('trusted.title')}
              </Typography>
              <Typography variant="button" weight="regular" className="text-[#6E6E6E]">
                {t('trusted.subtitle')}
              </Typography>
            </div>

            {!isDesktop && <div className="border-t" />}

            <div className={cn('flex flex-col gap-4 max-[1440px]:gap-3', isDesktop ? 'flex-grow' : 'mt-auto')}>
              {t.raw('trusted.items').map((item: { title: string; description: string }, index: number) => (
                <div className="flex gap-4 items-center" key={index}>
                  <div>
                    <CheckCircleIcon width={isTablet ? 24 : 28} height={isTablet ? 24 : 28} />
                  </div>
                  <div className="flex flex-col gap-2">
                    <Typography variant={isDesktop ? 'body2' : 'caption'} weight="regular">
                      {item.title}
                      {isDesktop && ':'}
                    </Typography>
                    {isDesktop && (
                      <Typography variant="body2" weight="regular" className="text-[#6E6E6E]">
                        {item.description}
                      </Typography>
                    )}
                  </div>
                </div>
              ))}

              <div
                className={cn(
                  'grid grid-cols-2 grid-rows-2 place-items-center mt-auto gap-[10px]  ',
                  !isDesktop && 'pt-3'
                )}>
                {certificationsRight.map(({ src, alt }, i) => (
                  <div
                    key={i}
                    className={cn(
                      'flex bg-secondary-300 rounded-[10px] justify-center items-center w-full h-16',
                      isDesktop ? 'h-16' : 'h-[42px] '
                    )}>
                    <img src={src} alt={alt} className="max-h-[64px]" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
