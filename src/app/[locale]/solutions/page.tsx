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
import { ConsultingSection } from '@/components/SolutionsSections/ConsultingSection'
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
      {/*  {loading && <Loader loading={loading} />} */}

      <Header />
      <div className=" bg-[linear-gradient(180deg,_#F9FAFB_0%,_#A578F2_57.98%,_#F9FAFB_100%)]">
        <HeroSection loading />
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
