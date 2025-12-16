import { Loader } from '@/components/Loader'
import {
  AcademySection,
  AiTeamSection,
  BuildSection,
  FeaturesSection,
  FutureSection,
  HeroSection,
  TeamTrainingSection
} from '@/components/Sections'
import { Header } from '@/components/Header'
import Footer from '@/components/Footer/Footer'
import { GrowthStepSection } from '@/components/Sections/GrowthStepSection'
import { InspirationSection } from '@/components/Sections/InspirationSection'
import { DataDrivenSection } from '@/components/Sections/DataDrivenSection'
import { TestimonialsSection } from '@/components/Sections/TestimonialsSection'
import { Carousel3dSection } from '@/components/Sections/Carousel3dSection'
import { ImpactSectionNew } from '@/components/Sections/ImpactSection'
import { StackSectionNew } from '@/components/Sections/StackSection/StackSectionNew'

export function HomePageClient() {
  return (
    <>
      <Loader />
      <Header />
      <HeroSection />
      <FutureSection />
      <StackSectionNew />
      <GrowthStepSection />
      <AiTeamSection />
      <Carousel3dSection />
      <InspirationSection />
      <BuildSection />
      <ImpactSectionNew />
      <AcademySection />
      <TeamTrainingSection />
      <DataDrivenSection />
      <FeaturesSection />
      <TestimonialsSection />
      <Footer />
    </>
  )
}
