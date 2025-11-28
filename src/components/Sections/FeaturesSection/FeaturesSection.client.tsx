'use client'

import { CheckCircleIcon } from '@/components/icons'
import DealIcon from '@/components/icons/DealIcon'
import DiplomaIcon from '@/components/icons/DiplomaIcon'
import { Typography } from '@/components/ui'
import { cn } from '@/lib/utils'
import { useEffect, useState } from 'react'
import AOS from 'aos'
import 'aos/dist/aos.css'
import { FadeInOnView } from '@/components/FadeInOnView/FadeInOnView'
import { useTranslations } from 'next-intl'

const certificationsLeft = [
  { src: '/assets/certifications/CompTia.png', alt: 'CompTIA logo', padding: 'py-2' },
  { src: '/assets/certifications/Microsoft_Partner.png', alt: 'Microsoft logo', padding: 'py-2' },
  { src: '/assets/certifications/IoSCM.png', alt: 'Institute of Supply Chain Managment logo', padding: 'p-[6px]' },
  { src: '/assets/certifications/Axelos.png', alt: 'Axelos logo', padding: 'py-2' }
]

const certificationsRight = [
  { src: '/assets/certifications/Dubai_Courts.png', alt: 'Dubai_Courts logo', padding: 'py-3' },
  { src: '/assets/certifications/Bahri_Ship_Mgmt.png', alt: 'Bahri_Ship_Mgmt logo', padding: 'py-[3px]' },
  { src: '/assets/certifications/dubai_digital.png', alt: 'Digital_Dubai logo', padding: 'py-2' },
  { src: '/assets/certifications/Minestry_of_Health.png', alt: 'Ministry of Health logo', padding: 'py-2' }
]
type FeaturesClientProps = {
  t: ReturnType<typeof useTranslations<'Features'>>
  locale: string
}
export const FeaturesClient = ({ t, locale }: FeaturesClientProps) => {
  const [mounted, setMounted] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const [isTablet, setIsTablet] = useState(false)
  const [isDesktop, setIsDesktop] = useState(true)

  const isArabic = locale === 'ar'

  useEffect(() => setMounted(true), [])

  useEffect(() => {
    const update = () => {
      const w = window.innerWidth
      setIsMobile(w < 768)
      setIsTablet(w >= 768 && w <= 1024)
      setIsDesktop(w > 1024)
    }

    update()
    window.addEventListener('resize', update)
    return () => window.removeEventListener('resize', update)
  }, [])

  useEffect(() => {
    import('aos').then((AOS) => AOS.default.init())
  }, [])

  if (!mounted) return null

  return (
    <section className="flex justify-center bg-white px-[140px] pb-[140px] max-lg:px-6 max-lg:pt-20 max-lg:pb-0 max-md:px-4">
      <div
        className={cn(
          isTablet || isMobile
            ? 'flex gap-4 max-md:flex-col'
            : 'flex justify-center max-w-[1150px] p-8 rounded-[20px] gap-8 bg-[linear-gradient(180deg,_rgba(255,255,255,0.16)_0%,_rgba(30,141,194,0.16)_100%)]'
        )}>
        {/* LEFT */}
        <div className="flex flex-col bg-white border rounded-2xl p-8 flex-1 max-lg:px-5 max-lg:py-6 order-2">
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

            <div className="flex flex-grow flex-col gap-4 max-lg:gap-3">
              {
                //@ts-ignore
                t.raw('certified.items').map((item, i) => {
                  const limited = !isDesktop ? item.split(' ').slice(0, 2).join(' ') : item
                  return (
                    <div className="flex gap-4 items-center" key={i}>
                      <CheckCircleIcon size={isTablet ? 24 : 28} />
                      <Typography variant={isDesktop ? 'body2' : 'caption'}>{limited}</Typography>
                    </div>
                  )
                })
              }

              <div className="grid grid-cols-2 grid-rows-2 mt-auto gap-3">
                {certificationsLeft.map((c, i) => (
                  <div key={i} className="flex justify-center items-center">
                    <img src={c.src} alt={c.alt} className={`max-h-[48px] ${c.padding}`} />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT */}
        <div className="flex flex-col bg-white border rounded-2xl p-8 flex-1 max-lg:px-5 max-lg:py-6 order-1">
          <div className="mb-6 max-lg:mb-2">
            <DealIcon width={!isDesktop ? 40 : 64} height={isTablet ? 40 : 64} />
          </div>

          <div className="flex flex-col flex-grow gap-8 max-lg:gap-6">
            <div className="flex flex-col gap-4">
              <FadeInOnView>
                <Typography variant={isDesktop ? 'h4' : 'body1'}>{t('trusted.title')}</Typography>
              </FadeInOnView>

              <FadeInOnView>
                <Typography variant="button" className="text-[#6E6E6E]">
                  {t('trusted.subtitle')}
                </Typography>
              </FadeInOnView>
            </div>

            {!isDesktop && <div className="border-t" />}

            <div className="flex flex-col gap-4 flex-grow">
              {
                //@ts-ignore
                t.raw('trusted.items').map(({ title, description }, i) => (
                  <div key={i} className="flex gap-4 items-start">
                    <CheckCircleIcon size={isTablet ? 24 : 28} />
                    <div>
                      <Typography variant={isDesktop ? 'body2' : 'caption'}>
                        {title}
                        {isDesktop && ':'}
                      </Typography>
                      {isDesktop && (
                        <Typography variant="body2" className="text-[#6E6E6E]">
                          {description}
                        </Typography>
                      )}
                    </div>
                  </div>
                ))
              }

              <div className="grid grid-cols-2 grid-rows-2 gap-4 mt-4">
                {certificationsRight.map((c, i) => (
                  <div key={i} className="flex justify-center items-center">
                    <img src={c.src} alt={c.alt} className={`max-h-[64px] ${c.padding}`} />
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
