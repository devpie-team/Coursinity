'use client'

import { useLocale, useTranslations } from 'next-intl'
import {
  AcademySection,
  AiTeamSection,
  BuildSection,
  FeaturesSection,
  FutureSection,
  HeroSection,
  ImpactSection,
  StackSection,
  TeamTrainingSection
} from '@/components/Sections'
import { Header } from '@/components/Header'
import Footer from '@/components/Footer/Footer'
import { GrowthStepSection } from '@/components/Sections/GrowthStepSection'
import { InspirationSection } from '@/components/Sections/InspirationSection'
import { DataDrivenSection } from '@/components/Sections/DataDrivenSection'
import { TestimonialsSection } from '@/components/Sections/TestimonialsSection'
import { Carousel3dSection } from '@/components/Sections/Carousel3dSection'
import { ImpactSectionNew } from '@/components/Sections/ImpactSection'
import { useEffect, useState } from 'react'
import AOS from 'aos'
import { Loader } from '@/components/Loader'

export default function HomePage() {
  const t = useTranslations('HomePage')
  const locale = useLocale()
  const isArabic = locale === 'ar'

  const [loading, setLoading] = useState(true)
  const [isMobile, setIsMobile] = useState(false)
  const [isTablet, setIsTablet] = useState(false)

  useEffect(() => {
    AOS.init({
      once: false,
      duration: 700,
      offset: 100,
      easing: 'ease-in-out',
      mirror: true
    })
  }, [])

  useEffect(() => {
    const checkScreenSize = () => {
      const width = window.innerWidth
      setIsMobile(width < 768)
      setIsTablet(width >= 768 && width <= 1024)
    }
    checkScreenSize()
    window.addEventListener('resize', checkScreenSize)
    return () => window.removeEventListener('resize', checkScreenSize)
  }, [])

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), isMobile ? 6000 : isTablet ? 6500 : 5700)
    return () => clearTimeout(timer)
  }, [isMobile, isTablet])

  return (
    <>
      {loading && <Loader loading={loading} />}
      <Header />
      <HeroSection loading={loading} />
      <FutureSection />
      <StackSection />
      <GrowthStepSection />
      <AiTeamSection />
      <Carousel3dSection />
      <InspirationSection />
      <BuildSection />
      <ImpactSectionNew />
      <AcademySection />
      <TeamTrainingSection />
      <DataDrivenSection />
      <FeaturesSection />
      <TestimonialsSection />
      <Footer />
    </>
  )
}
