'use client'

import { useTranslations } from 'next-intl'
import { BuildSection, FeaturesSection, HeroSection } from '@/components/Sections'
import { AiTeamSection } from '@/components/Sections/AiTeamSection'
import { FutureSection } from '@/components/Sections/FutureSection'
import { TeamTrainingSection } from '@/components/Sections/TeamTrainingSection'
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
      <BuildSection />
      <TeamTrainingSection />
      <FeaturesSection />
      <Footer />
    </>
  )
}
