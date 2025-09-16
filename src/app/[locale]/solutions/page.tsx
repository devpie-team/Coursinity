'use client'

import { useLocale, useTranslations } from 'next-intl'
import { useEffect, useState } from 'react'
import AOS from 'aos'

import { Header } from '@/components/Header'
import Footer from '@/components/Footer/Footer'
import { HeroSection } from '@/components/SolutionsSections/HeroSection/HeroSection'
import StepScroll from '@/components/SolutionsSections/HeroSection/_components/StepScrollSection'
import { TestimonialsSection } from '@/components/Sections'
import { CardSection } from '@/components/SolutionsSections/CardSection'
import { CultureAlignedSection } from '@/components/SolutionsSections/CultureAlignedSection'
import { PathSection } from '@/components/SolutionsSections/PathSection'
import { CustomTrainingSection } from '@/components/SolutionsSections/CustomTrainingSection'
import { ConsultingSection } from '@/components/SolutionsSections/ConsultingSection'
import { Loader } from '@/components/Loader'
import { VideoSection } from '@/components/SolutionsSections/HeroSection/_components/VideoSection'

export default function HomePage() {
  const t = useTranslations('HomePage')
  const locale = useLocale()

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
    const check = () => {
      const w = window.innerWidth
      setIsMobile(w < 768)
      setIsTablet(w >= 768 && w <= 1024)
    }
    check()
    window.addEventListener('resize', check)
    return () => window.removeEventListener('resize', check)
  }, [])

  return (
    <>
      {loading && <Loader loading={loading} onFinish={() => setLoading(false)} />}

      <Header />
      <div className="relative">
        <div
          className="absolute inset-0 bg-[linear-gradient(180deg,_#F9FAFB_0%,_#A578F2_57.98%,_#F9FAFB_100%)] bg-cover bg-repeat -z-10"
          style={{ backgroundPosition: 'center 2000%' }}
        />
        <HeroSection key={locale} loading={loading} />
        <VideoSection key={locale} loading={loading} />
        <StepScroll />
      </div>

      <CardSection />
      <CultureAlignedSection />
      <CustomTrainingSection />
      <PathSection />
      <ConsultingSection />
      <TestimonialsSection />

      <Footer />
    </>
  )
}
