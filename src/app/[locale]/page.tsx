'use client'

import { useTranslations } from 'next-intl'
import { BuildSection, FeaturesSection, HeroSection } from '@/components/Sections'
import { AiTeamSection } from '@/components/Sections/AiTeamSection'
import { FutureSection } from '@/components/Sections/FutureSection'
import { TeamTrainingSection } from '@/components/Sections/TeamTrainingSection'
import { Header } from '@/components/Header'

export default function HomePage() {
  const t = useTranslations('HomePage')
  return (
    <>
      <Header />
      <HeroSection />
      <FutureSection />
      <AiTeamSection />
      <BuildSection />
      <TeamTrainingSection />
      <FeaturesSection />
    </>
  )
}
