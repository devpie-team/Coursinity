import { Button } from '@/components/primitives/button'
import { Typography } from '@/components/ui'
import Lottie, { LottieRefCurrentProps } from 'lottie-react'
import Lottie1En from '../../../../public/assets/lottie/academy/hero_section/hero_1.json'
import { useInView } from 'react-intersection-observer'
import { useEffect, useRef, useState } from 'react'
import { GrowthSection } from '../GrowthSection'
import { useLocale } from 'next-intl'

export const HeroSection = () => {
  const lottieRef = useRef<LottieRefCurrentProps>(null)
  const { ref: ref, inView: inView } = useInView({ triggerOnce: false })
  const [isMobile, setIsMobile] = useState(false)
  const [isTablet, setIsTablet] = useState(false)
  const [isDesktop, setIsDesktop] = useState(true)
  const locale = useLocale()
  const isArabic = locale === 'ar'

  useEffect(() => {
    const checkScreenSize = () => {
      const width = window.innerWidth
      setIsMobile(width < 768)
      setIsTablet(width >= 768 && width <= 1024)
      setIsDesktop(width > 1024)
    }
    checkScreenSize()
    window.addEventListener('resize', checkScreenSize)
    return () => window.removeEventListener('resize', checkScreenSize)
  }, [])

  useEffect(() => {
    if (inView && lottieRef.current) {
      lottieRef.current.stop()
      lottieRef.current.play()
    }
  }, [inView])

  return (
    <section className="bg-gradient-to-b from-gray-50 via-teal-500 to-white">
      <div className="flex flex-col gap-[70px] pt-[200px] px-4 items-center max-md:pt-[120px]">
        <div className="flex flex-col gap-8 items-center">
          <button className="h-[30px]  px-6 py-5 flex items-center max-lg:mb-4  bg-white text-primary-green border border-secondary-400   hover:shadow-[0px_12px_30px_0px_#A578F240] active:bg-none active:bg-secondary-green active:shadow-none disabled:pointer-events-none  disabled:bg-opacity-20 disabled:text-opacity-90 rounded-full leading-4 font-medium transition-all duration-300">
            Academy
          </button>
          <div className="flex flex-col items-center gap-8 text-center max-w-[950px]">
            <Typography variant={isDesktop ? 'h1' : 'h3'} weight="medium">
              Your Academy, Built With You, Not For You
            </Typography>
            <Typography variant={isDesktop ? 'body2' : 'body3'} weight="medium">
              Lead with a platform that looks like your brand, trains your team and checks every compliance box
            </Typography>
            <Button variant="academy" className="max-md:w-full">
              Book Your Custom Demo
            </Button>
          </div>
        </div>
        <div className="max-w-[1080px]  z-10 overflow-hidden " ref={ref}>
          <Lottie lottieRef={lottieRef} animationData={Lottie1En} loop={false} className="z-10"></Lottie>
        </div>
      </div>

      <GrowthSection />
    </section>
  )
}
