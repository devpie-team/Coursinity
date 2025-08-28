'use client'

import { useLocale } from 'next-intl'
import { useEffect, useState } from 'react'
import AOS from 'aos'

import { Header } from '@/components/Header'
import Footer from '@/components/Footer/Footer'
import { Loader } from '@/components/Loader'
import { JourneySection, LearningCalendarSection, SkillSection, TrainingSection } from '@/components/AcademySections'
import { TestimonialsSection } from '@/components/Sections'
import { GrowthSection } from '@/components/AcademySections/GrowthSection'
import { HeroSection } from '@/components/AcademySections/HeroSection'

export default function HomePage() {
  const locale = useLocale()

  const [loading, setLoading] = useState(true)

  useEffect(() => {
    AOS.init({
      once: false,
      duration: 700,
      offset: 100,
      easing: 'ease-in-out',
      mirror: true
    })
  }, [])

  return (
    <>
      {/* {loading && <Loader loading={loading} onFinish={() => setLoading(false)} />} */}

      <Header />
      <HeroSection />

      <JourneySection />
      <LearningCalendarSection />
      <SkillSection />
      <TrainingSection />
      <TestimonialsSection />
      <Footer />
    </>
  )
}
