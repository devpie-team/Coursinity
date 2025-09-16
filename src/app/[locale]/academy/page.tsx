'use client'

import { useLocale } from 'next-intl'
import { useEffect, useState } from 'react'
import AOS from 'aos'

import { Header } from '@/components/Header'
import Footer from '@/components/Footer/Footer'
import { Loader } from '@/components/Loader'
import {
  JourneySection,
  LearningCalendarSection,
  SkillSection,
  TrainingSection,
  CardSection
} from '@/components/AcademySections'
import { TestimonialsSection } from '@/components/Sections'
import { GrowthSection } from '@/components/AcademySections/GrowthSection'
import { HeroSection } from '@/components/AcademySections/HeroSection'

export default function HomePage() {
  const locale = useLocale()

  const [loading, setLoading] = useState(true)
  const [isMobile, setIsMobile] = useState(false)
  const [isTablet, setIsTablet] = useState(false)
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
    AOS.init({
      once: false,
      duration: 700,
      offset: 100,
      easing: 'ease-in-out',
      mirror: true
    })
  }, [])

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), isMobile ? 3000 : isTablet ? 3500 : 3500)
    return () => clearTimeout(timer)
  }, [isMobile, isTablet])

  return (
    <>
      {loading && <Loader loading={loading} onFinish={() => setLoading(false)} shortLoading />}
      <Header />
      <HeroSection canPlay={!loading} />
      <JourneySection />
      <LearningCalendarSection />
      <CardSection />
      <SkillSection />
      <TrainingSection />
      <TestimonialsSection />
      <Footer page="academy" />
    </>
  )
}
