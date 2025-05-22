import { useTranslations } from 'next-intl'
import { HeroSection } from '@/components/Sections'

export default function HomePage() {
  const t = useTranslations('HomePage')
  return (
    <>
      <HeroSection />
    </>
  )
}
