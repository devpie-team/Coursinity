'use client'

import { useTranslations } from 'next-intl'
import {
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

export default function HomePage() {
  const t = useTranslations('HomePage')
  return (
    <>
      <Header />
      <HeroSection />
      <FutureSection />
      <StackSection />
      <GrowthStepSection />
      <AiTeamSection />
      <InspirationSection />

      <BuildSection />
      <ImpactSection />
      <TeamTrainingSection />
      <DataDrivenSection />
      <FeaturesSection />
      <TestimonialsSection />
      <Footer />
    </>
  )
}
