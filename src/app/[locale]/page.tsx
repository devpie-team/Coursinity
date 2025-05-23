import { useTranslations } from 'next-intl'
import { FeaturesSection, HeroSection } from '@/components/Sections'
import { AiTeamSection } from '@/components/Sections/AiTeamSection'

export default function HomePage() {
  const t = useTranslations('HomePage')
  return (
    <>
      <HeroSection />
      <AiTeamSection />
      <FeaturesSection />
    </>
  )
}
