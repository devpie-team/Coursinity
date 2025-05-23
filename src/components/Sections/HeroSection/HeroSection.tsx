'use client'

import { Button } from '@/components/primitives/button'
import { Typography } from '@/components/ui'
import { useTranslations } from 'next-intl'
import { useEffect, useState } from 'react'

export const HeroSection = () => {
  const t = useTranslations('Hero')
  const [isMobile, setIsMobile] = useState<boolean>(false)
  const [isTablet, setIsTablet] = useState<boolean>(false)

  useEffect(() => {
    const checkScreenSize = () => {
      const width = window.innerWidth
      setIsMobile(width < 834)
      setIsTablet(width < 1440)
    }

    checkScreenSize()

    window.addEventListener('resize', checkScreenSize)
    return () => window.removeEventListener('resize', checkScreenSize)
  }, [])

  return (
    <section
      className="relative min-h-[900px] max-[834px]:min-h-[766px] max-[1440px]:min-h-[600px] w-full bg-cover bg-center bg-no-repeat h-[2000px]"
      style={{
        backgroundImage: `url('/assets/heroBg.png')`
      }}>
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="absolute z-1 top-0 left-0 right-0 bottom-0">
          <img src="/assets/glass.png" alt="Glass" className="w-full h-full object-cover opacity-70" />
        </div>

        <div className="flex flex-col gap-8 items-center z-10 text-center px-4 w-[893px] ">
          <div className="flex flex-col gap-6 max-[1440px]:gap-4 items-center">
            {isTablet ? (
              <div className=" leading-tight text-transparent bg-gradient-to-b from-[#1C8DC1] to-[#D3E7F0] bg-clip-text w-fit">
                <Typography variant="h3" weight="medium">
                  Spark a learning
                </Typography>
                <Typography variant="h3" weight="medium">
                  revolution.
                </Typography>
              </div>
            ) : (
              <div>
                <Typography variant="h1" as="span" weight="medium">
                  {t('title')}
                </Typography>
                <Typography
                  variant="h1"
                  as="span"
                  weight="medium"
                  className="bg-gradient-to-b from-[#1C8DC1] to-[#D3E7F0] bg-clip-text text-transparent">
                  {t('titleGradient')}
                </Typography>
              </div>
            )}
            <Typography variant={isTablet ? 'body3' : 'body1'} className="min-[1440px]:max-w-[693px]">
              {t(isTablet ? 'subtitleMobile' : 'subtitle')}
            </Typography>
          </div>
          <Button className="max-[1440px]:max-w-[425px] max-[1440px]:w-full" size="lg">
            {t('bookDemo')}
          </Button>
        </div>
      </div>
    </section>
  )
}
