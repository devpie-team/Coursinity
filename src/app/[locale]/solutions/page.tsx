'use client'

import { useLocale, useTranslations } from 'next-intl'

import { Header } from '@/components/Header'
import Footer from '@/components/Footer/Footer'

import { useEffect, useState } from 'react'
import AOS from 'aos'
import { HeroSection } from '@/components/SolutionsSections/HeroSection/HeroSection'

import StepScroll from '@/components/SolutionsSections/HeroSection/_components/StepScrollSection'

import { TestimonialsSection } from '@/components/Sections'
import { CardSection } from '@/components/SolutionsSections/CardSection'
import { CultureAlignedSection } from '@/components/SolutionsSections/CultureAlignedSection'
import { PathSection } from '@/components/SolutionsSections/PathSection'
import { CustomTrainingSection } from '@/components/SolutionsSections/CustomTrainingSection'
import { Loader } from '@/components/Loader'
import { VideoSection } from '@/components/SolutionsSections/HeroSection/_components/VideoSection'

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
      {/*  {loading && <Loader loading={loading} />} */}

      <Header />
      <div className="relative">
        <div
          className="absolute inset-0 bg-[repeating-linear-gradient(180deg,_#F9FAFB_0%,_#A578F2_110%)]  bg-cover bg- bg-no-repeat -z-10"
          style={{ backgroundPosition: 'center 2000%' }}
        />
        <HeroSection loading />
        <VideoSection />
      </div>
      <StepScroll />

      <CardSection />
      <CultureAlignedSection />
      <CustomTrainingSection />
      <PathSection />
      <TestimonialsSection />
      <Footer />
    </>
  )
}
