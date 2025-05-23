import { useTranslations } from 'next-intl'
import { FeaturesSection, HeroSection } from '@/components/Sections'

export default function HomePage() {
  const t = useTranslations('HomePage')
  return (
    <>
      <HeroSection />
      <FeaturesSection />
    </>
  )
}
