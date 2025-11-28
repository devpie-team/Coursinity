import { HomePageClient } from './HomePageClient'

type HomePageProps = {
  locale: string
}

export default function HomePage({ locale }: HomePageProps) {
  return <HomePageClient locale={locale} />
}
