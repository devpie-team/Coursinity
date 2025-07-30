import { FadeInOnView } from '@/components/FadeInOnView/FadeInOnView'
import { Typography } from '@/components/ui'
import { useLocale, useTranslations } from 'next-intl'
import { useEffect, useRef, useState } from 'react'
import Lottie, { LottieRefCurrentProps } from 'lottie-react'
import { useInView } from './useInView'

import lottie1En from '../../../../public/assets/lottie/consulting/en/con_1.json'
import lottie2En from '../../../../public/assets/lottie/consulting/en/con_2.json'
import lottie3En from '../../../../public/assets/lottie/consulting/en/con_3.json'
import lottie4En from '../../../../public/assets/lottie/consulting/en/con_4.json'
import lottie1Ar from '../../../../public/assets/lottie/consulting/ar/con_1.json'
import lottie2Ar from '../../../../public/assets/lottie/consulting/ar/con_2.json'
import lottie3Ar from '../../../../public/assets/lottie/consulting/ar/con_3.json'
import lottie4Ar from '../../../../public/assets/lottie/consulting/ar/con_4.json'

export const ConsultingSection = () => {
  const [isDesktop, setIsDesktop] = useState(false)
  const [isTablet, setIsTablet] = useState(false)

  const t = useTranslations('S_ConsultingSection')
  const locale = useLocale()
  const isArabic = locale == 'ar'

  const lottie1 = isArabic ? lottie1Ar : lottie1En
  const lottie2 = isArabic ? lottie2Ar : lottie2En
  const lottie3 = isArabic ? lottie3Ar : lottie3En
  const lottie4 = isArabic ? lottie4Ar : lottie4En

  useEffect(() => {
    const checkScreenSize = () => {
      const width = window.innerWidth
      setIsDesktop(width > 1024)
      setIsTablet(width >= 768 && width <= 1024)
    }

    checkScreenSize()
    window.addEventListener('resize', checkScreenSize)
    return () => window.removeEventListener('resize', checkScreenSize)
  }, [])

  const lottieRefs = [
    useRef<LottieRefCurrentProps | null>(null),
    useRef<LottieRefCurrentProps | null>(null),
    useRef<LottieRefCurrentProps | null>(null),
    useRef<LottieRefCurrentProps | null>(null)
  ]
  const cardRefs = [
    useRef<HTMLDivElement | null>(null),
    useRef<HTMLDivElement | null>(null),
    useRef<HTMLDivElement | null>(null),
    useRef<HTMLDivElement | null>(null)
  ]

  const [wasInView, setWasInView] = useState([false, false, false])
  const inViews = cardRefs.map((ref) => useInView(ref as React.RefObject<HTMLElement>, { threshold: 0.3 }))

  useEffect(() => {
    inViews.forEach((inView, i) => {
      const lottie = lottieRefs[i]?.current
      if (!lottie) return

      if (inView && !wasInView[i]) {
        lottie.stop?.()
        lottie.goToAndPlay?.(0, true)
        setWasInView((was) => {
          const arr = [...was]
          arr[i] = true
          return arr
        })
      }

      if (!inView && wasInView[i]) {
        lottie.stop?.()
        setWasInView((was) => {
          const arr = [...was]
          arr[i] = false
          return arr
        })
      }
    })
  }, [inViews, wasInView])

  return (
    <section className="py-[120px]  max-lg:pt-[80px] flex flex-col items-center text-center justify-center bg-white gap-[40px] px-[150px] max-lg:px-6 max-md:px-4">
      <div className="flex flex-col max-w-full scaleText opacityText">
        <FadeInOnView>
          <Typography variant={isDesktop ? 'h3' : 'h5'} weight="medium">
            {t('title')}
          </Typography>
        </FadeInOnView>
        <FadeInOnView>
          <Typography variant="body3" weight="regular" className="text-description">
            {t('subtitle')}
          </Typography>
        </FadeInOnView>
      </div>
      <div className="flex flex-col items-center justify-center gap-5">
        <div className="flex max-lg:flex-col gap-5 w-full justify-center">
          <div
            className="flex items-center max-lg:flex-col px-10 py-8 gap-5 h-[500px] w-[753px] max-lg:w-full border border-black/8 rounded-[20px] bg-[linear-gradient(to_bottom,rgba(217,45,32,0.16),rgba(255,255,255,0.16))]"
            ref={cardRefs[0]}>
            <div className="text-left flex flex-col gap-1 leading-7">
              <Typography variant={!isTablet && !isDesktop ? 'body2' : 'body1'} className="leading-7">
                {t(`cards.0.title`)}
              </Typography>
              <Typography variant={!isTablet && !isDesktop ? 'body2' : 'body1'} className="opacity-65 leading-7">
                {t(`cards.0.description`)}
              </Typography>
            </div>
            <Lottie
              animationData={lottie1}
              lottieRef={lottieRefs[0]}
              loop={false}
              className="max-w-[365px] max-h-[243px] min-w-[365px] min-h-[243px] max-lg:min-w-[330px] max-lg:min-h-[300px]"
            />
          </div>{' '}
          <div
            className="flex flex-col gap-10 h-[500px] w-[367px] max-lg:w-full pb-10 border border-black/8 rounded-[20px] bg-[linear-gradient(to_bottom,rgba(118,98,235,0.16),rgba(255,255,255,0.16))] overflow-hidden"
            ref={cardRefs[1]}>
            <Lottie
              animationData={lottie2}
              lottieRef={lottieRefs[1]}
              loop={false}
              className="min-w-[367px] min-h-[300px] max-lg:min-w-[330px] max-lg:min-h-[300px]"
            />
            <div className="text-left flex mx-10 flex-col gap-1 ">
              <Typography variant={!isTablet && !isDesktop ? 'body2' : 'body1'} className="leading-7">
                {t(`cards.1.title`)}
              </Typography>
              <Typography variant={!isTablet && !isDesktop ? 'body2' : 'body1'} className="opacity-65 leading-7">
                {t(`cards.1.description`)}
              </Typography>
            </div>
          </div>
        </div>
        <div className="flex max-lg:flex-col gap-5 w-full items-center justify-center">
          <div
            className="flex flex-col max-lg:justify-between max-lg:pb-5 gap-10 h-[500px] w-[367px] max-lg:w-full border border-black/8 rounded-[20px] bg-[linear-gradient(to_bottom,rgba(30,141,194,0.16),rgba(255,255,255,0.16))]"
            ref={cardRefs[2]}>
            <Lottie
              animationData={lottie3}
              lottieRef={lottieRefs[2]}
              loop={false}
              className="min-w-[313px] min-h-[292px] max-lg:min-w-[330px] max-lg:min-h-[300px]"
            />
            <div className="text-left flex mx-10 max-lg:mx-5 flex-col gap-1 ">
              <Typography variant={!isTablet && !isDesktop ? 'body2' : 'body1'} className="leading-7">
                {t(`cards.2.title`)}
              </Typography>
              <Typography variant={!isTablet && !isDesktop ? 'body2' : 'body1'} className="opacity-65 leading-7">
                {t(`cards.2.description`)}
              </Typography>
            </div>
          </div>
          <div
            className="flex flex-col max-lg:justify-between items-center px-10 pb-10 max-lg:px-5 max-lg:pb-5 gap-[66px] h-[500px] w-[753px] max-lg:w-full border border-black/8 rounded-[20px] bg-[linear-gradient(to_bottom,rgba(118,98,235,0.16),rgba(255,255,255,0.16))]"
            ref={cardRefs[3]}>
            <Lottie
              animationData={lottie4}
              lottieRef={lottieRefs[3]}
              loop={false}
              className="max-w-[568px] max-h-[238px] max-lg:min-w-[330px] max-lg:min-h-[300px]"
            />
            <div className="text-left flex flex-col gap-1 self-start">
              <Typography variant={!isTablet && !isDesktop ? 'body2' : 'body1'} className="leading-7">
                {t(`cards.3.title`)}
              </Typography>
              <Typography variant={!isTablet && !isDesktop ? 'body2' : 'body1'} className="opacity-65 leading-7">
                {t(`cards.3.description`)}
              </Typography>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
