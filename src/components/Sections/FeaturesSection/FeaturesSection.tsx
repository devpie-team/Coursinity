'use client'

import { CheckCircleIcon } from '@/components/icons'
import DealIcon from '@/components/icons/DealIcon'
import DiplomaIcon from '@/components/icons/DiplomaIcon'
import { Typography } from '@/components/ui'
import { cn } from '@/lib/utils'
import { useTranslations } from 'next-intl'
import { useEffect, useState } from 'react'
import AOS from 'aos'
import 'aos/dist/aos.css'
import { FadeInOnView } from '@/components/FadeInOnView/FadeInOnView'

const certificationsLeft = [
  { src: '/assets/certifications/CompTia.png', alt: 'CompTIA logo', padding: 'py-2' },
  { src: '/assets/certifications/Microsoft_Partner.png', alt: 'Microsoft logo', padding: 'py-2' },
  { src: '/assets/certifications/Minestry_of_Health.png', alt: 'Ministry of Health logo', padding: 'py-2' },
  { src: '/assets/certifications/Axelos.png', alt: 'Axelos logo', padding: 'py-2' }
]
const certificationsRight = [
  { src: '/assets/certifications/Dubai_Courts.png', alt: 'Dubai_Courts logo', padding: 'py-2' },
  { src: '/assets/certifications/Bahri_Ship_Mgmt.png', alt: 'Bahri_Ship_Mgmt logo', padding: 'py-[3px]' },
  { src: '/assets/certifications/dubai_digital.png', alt: 'Digital_Dubai logo', padding: 'py-1' },
  { src: '/assets/certifications/Minestry_of_Health.png', alt: 'Ministry of Health logo', padding: 'p-[6px]' }
]

export const FeaturesSection = () => {
  const t = useTranslations('Features')
  const [isMobile, setIsMobile] = useState<boolean>(false)
  const [isTablet, setIsTablet] = useState<boolean>(false)
  const [isDesktop, setIsDesktop] = useState<boolean>(true)

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
  useEffect(() => {
    AOS.init()
  }, [])

  return (
    <section className="bg-white px-[140px] pb-[140px] max-lg:px-6 max-lg:pt-20 max-lg:pb-0 max-[1400px]:px-[100px] max-[1250px]:px-[50px] max-md:px-4 ">
      <div
        className={cn(
          isTablet || isMobile
            ? 'flex gap-4 max-md:flex-col '
            : 'flex p-8 rounded-[20px] gap-8 bg-[linear-gradient(180deg,_rgba(255,255,255,0.16)_0%,_rgba(30,141,194,0.16)_100%)] '
        )}>
        {/* Left Block */}

        <div className="flex flex-col bg-white border rounded-2xl p-8 flex-1 max-lg:px-5 max-lg:py-6">
          <div className={cn(isDesktop ? 'mb-6' : 'mb-2')}>
            <DiplomaIcon size={!isDesktop ? 40 : 64} />
          </div>
          <div className="flex flex-col flex-grow gap-8 max-lg:gap-6">
            <div className={cn('flex flex-col gap-4', !isDesktop && 'flex-grow')}>
              <FadeInOnView>
                <Typography variant={isDesktop ? 'h4' : 'body1'} weight="medium">
                  {t('certified.title')}
                </Typography>
              </FadeInOnView>
              <FadeInOnView>
                <Typography variant="button" weight="regular" className="text-[#6E6E6E]">
                  {t('certified.subtitle')}
                </Typography>
              </FadeInOnView>
            </div>
            {!isDesktop && <div className="border-t" />}
            <div className="flex flex-grow flex-col gap-4 max-lg:gap-3 max-lg:flex-none">
              {t.raw('certified.items').map((item: string, index: number) => {
                const limitedText = !isDesktop ? item.split(' ').slice(0, 2).join(' ') : item
                return (
                  <div className="flex gap-4 items-center" key={index}>
                    <div>
                      <CheckCircleIcon size={isTablet ? 24 : 28} />
                    </div>
                    <Typography variant={isDesktop ? 'body2' : 'caption'} weight="regular">
                      {limitedText}
                    </Typography>
                  </div>
                )
              })}

              <div className="grid grid-cols-2 grid-rows-2 place-items-center mt-auto gap-[10px] max-lg:mt-0 max-lg:pt-3">
                {certificationsLeft.map(({ src, alt, padding }, i) => (
                  <div key={i} className="flex rounded-[10px] justify-center items-center w-full h-12 max-lg:h-10">
                    <img src={src} alt={alt} className={`max-h-[48px] max-lg:max-h-[42px] ${padding}`} />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Right Block */}

        <div className="flex flex-col bg-white border rounded-2xl p-8 flex-1 max-lg:px-5 max-lg:py-6">
          <div className="mb-6 max-lg:mb-2">
            <DealIcon width={!isDesktop ? 40 : 64} height={isTablet ? 40 : 64} />
          </div>
          <div className="flex flex-col flex-grow gap-8 max-lg:gap-6">
            <div className="flex flex-col gap-4 max-lg:flex-grow">
              <FadeInOnView>
                <Typography variant={isDesktop ? 'h4' : 'body1'} weight="medium">
                  {t('trusted.title')}
                </Typography>
              </FadeInOnView>
              <FadeInOnView>
                <Typography variant="button" weight="regular" className="text-[#6E6E6E]">
                  {t('trusted.subtitle')}
                </Typography>
              </FadeInOnView>
            </div>
            {!isDesktop && <div className="border-t" />}
            <div className={cn('flex flex-col gap-4 max-lg:gap-3', isDesktop ? 'flex-grow' : 'mt-auto')}>
              {t.raw('trusted.items').map((item: { title: string; description: string }, index: number) => (
                <div className="flex gap-4 items-center" key={index}>
                  <div>
                    <CheckCircleIcon size={isTablet ? 24 : 28} />
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

              <div className={cn('grid grid-cols-2 grid-rows-2 place-items-center  gap-4  mt-4', !isDesktop && 'pt-3')}>
                {certificationsRight.map(({ src, alt, padding }, i) => (
                  <div key={i} className="flex rounded-[10px] justify-center items-center w-full h-12 max-lg:h-[42px] ">
                    <img
                      src={src}
                      alt={alt}
                      className={`max-h-[64px] max-lg:max-h-[42px] 
                      ${padding}`}
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
