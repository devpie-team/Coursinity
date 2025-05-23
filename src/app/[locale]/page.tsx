import { useTranslations } from 'next-intl'
import { FeaturesSection, HeroSection } from '@/components/Sections'
import { AiTeamSection } from '@/components/Sections/AiTeamSection'
import { FutureSection } from '@/components/Sections/FutureSection'

export default function HomePage() {
  const t = useTranslations('HomePage')
  return (
    <>
      <HeroSection />
      <FutureSection />
      <AiTeamSection />
      <FeaturesSection />
    </>
  )
}
