'use client'

import { useTranslations } from 'next-intl'
import { BuildSection, FeaturesSection, HeroSection } from '@/components/Sections'
import { AiTeamSection } from '@/components/Sections/AiTeamSection'

export default function HomePage() {
  const t = useTranslations('HomePage')
  return (
    <>
      <HeroSection />

      <AiTeamSection />
      <BuildSection />
      <FeaturesSection />
    </>
  )
}
