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

export default function HomePage() {
  const t = useTranslations('HomePage')
  return (
    <>
      <Header />
      <HeroSection />
      <FutureSection />
      <GrowthStepSection />
      <AiTeamSection />
      <InspirationSection />
      {/* <StackSection /> */}
      <BuildSection />
      <ImpactSection />
      <TeamTrainingSection />
      <FeaturesSection />
      <Footer />
    </>
  )
}
