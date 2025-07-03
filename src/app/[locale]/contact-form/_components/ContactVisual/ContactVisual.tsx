'use client'
import { Typography } from '@/components/ui'
import { CompanyCard } from '../CompanyCard/CompanyCard'
import Lottie from 'lottie-react'
import { useEffect, useState } from 'react'
import { cn } from '@/lib/utils'
import { useLocale, useTranslations } from 'next-intl'

type ContactVisualProps = {
  className?: string
}

export const ContactVisual = ({ className }: ContactVisualProps) => {
  const [animationData1, setAnimationData1] = useState<any>(null)
  const [animationData2, setAnimationData2] = useState<any>(null)
  const t = useTranslations('ContactVisual')
  const [isMobile, setIsMobile] = useState(false)
  const [isTablet, setIsTablet] = useState(false)
  const [isDesktop, setIsDesktop] = useState(true)
  const locale = useLocale()
  const isArabic = locale == 'ar'

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
    fetch(
      isArabic
        ? '/assets/lottie/contact_form/contact_form_1_ar.json'
        : '/assets/lottie/contact_form/contact_form_1.json'
    )
      .then((res) => res.json())
      .then(setAnimationData1)
    fetch(
      isArabic
        ? '/assets/lottie/contact_form/contact_form_2_ar.json'
        : '/assets/lottie/contact_form/contact_form_2.json'
    )
      .then((res) => res.json())
      .then(setAnimationData2)
  }, [])

  return (
    <div className="relative order-1 max-md:order-2">
      <div className="absolute inset-0 z-0 pointer-events-none  overflow-hidden rotate-180 rounded-e-[22px] max-md:rounded-[22px]">
        <div
          className="
        bg-[radial-gradient(80%_60%_at_50%_70%,rgba(255,255,255,0.7)_60%,rgba(28,141,193,0.7)_85%,rgba(165,120,242,0.7)_100%)] blur-[80px]
        rounded-[inherit]
        w-full h-[755px] -translate-y-[50px]  
      "
        />
      </div>
      <div className={cn('', className)}>
        <div className="flex flex-col gap-8 z-5 text-center">
          <Typography variant={isMobile ? 'h6' : 'h3'} weight="medium">
            {t('title')}
          </Typography>
          <Typography variant="body2" weight="regular">
            {t('description')}
          </Typography>
        </div>
        <CompanyCard />

        <div className="relative border-gradient min-w-[275px] bg-[#E4EDF2] p-4 !rounded-full  text-center flex-1 max-md:w-[275px] self-center">
          <Typography variant="body3" weight="regular">
            {t('footer')}
          </Typography>
          <div className="absolute w-5 h-5 rounded-full bg-[#E4EDF2] bg-opacity-70 left-[-10px] bottom-[-10px]"></div>
          <div className="absolute w-[10px] h-[10px] rounded-full bg-[#E4EDF2] bg-opacity-70 left-[-20px] bottom-[-20px]"></div>
        </div>

        {animationData1 && (
          <Lottie
            animationData={animationData1}
            className="absolute w-[110px] h-[100px] right-[-30px] bottom-[100px] opacity-30 max-md:hidden"
            loop={false}
            autoplay={true}
          />
        )}
        {animationData2 && (
          <Lottie
            animationData={animationData2}
            className="absolute w-[180px] h-[80px] left-[20px] top-[200px] rotate-[-9.75deg] opacity-30 max-md:hidden"
            loop={false}
            autoplay={true}
          />
        )}
      </div>
    </div>
  )
}
