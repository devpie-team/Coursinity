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

export default function HomePage() {
  const t = useTranslations('HomePage')
  return (
    <>
      <Header />
      <HeroSection />
      <FutureSection />
      <GrowthStepSection />
      <AiTeamSection />
      {/* <StackSection /> */}
      <BuildSection />
      <ImpactSection />
      <TeamTrainingSection />
      <FeaturesSection />
      <Footer />
    </>
  )
}
