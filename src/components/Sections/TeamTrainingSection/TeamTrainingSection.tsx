import { useEffect, useState, useMemo, useCallback } from 'react'
import { useLocale, useTranslations } from 'next-intl'
import { Button } from '@/components/primitives/button'
import { Typography } from '@/components/ui'
import Lottie from 'lottie-react'
import AOS from 'aos'
import 'aos/dist/aos.css'

import teamTrain1 from '/assets/lottie/team_train/team_train_1.json'
import teamTrain2 from '/assets/lottie/team_train/team_train_2.json'
import teamTrain3 from '/assets/lottie/team_train/team_train_3.json'
import teamTrain4 from '/assets/lottie/team_train/team_train_4.json'
import teamTrain4Ar from '/assets/lottie/team_train/team_train_4_ar.json'

interface AnimationItem {
  type: 'lottie' | 'image'
  data: any
}

const animationCache: Record<string, any> = {}

export const TeamTrainingSection = () => {
  const t = useTranslations('TeamTrainingSection')
  const [isMobile, setIsMobile] = useState(false)
  const [isTablet, setIsTablet] = useState(false)
  const [isDesktop, setIsDesktop] = useState(true)
  const [selectedIndex, setSelectedIndex] = useState<number | null>(0)
  const [animations, setAnimations] = useState<(AnimationItem | null)[]>([null, null, null, null])
  const locale = useLocale()
  const isArabic = locale == 'ar'

  const ANIMATION_PATHS = useMemo(
    () => [
      { path: '/assets/lottie/team_train/team_train_1.json', type: 'lottie' },
      { path: '/assets/lottie/team_train/team_train_2.json', type: 'lottie' },
      { path: '/assets/lottie/team_train/team_train_3.json', type: 'lottie' },
      {
        path: isArabic
          ? '/assets/lottie/team_train/team_train_4_ar.json'
          : '/assets/lottie/team_train/team_train_4.json',
        type: 'lottie'
      }
    ],
    [isArabic]
  )

  const loadAnimation = useCallback(async (path: string) => {
    // Перевіряємо в пам'яті
    if (animationCache[path]) return animationCache[path]

    const cached = sessionStorage.getItem(path)
    if (cached) {
      const parsed = JSON.parse(cached)
      animationCache[path] = parsed
      return parsed
    }

    try {
      const response = await fetch(path)
      const data = await response.json()

      animationCache[path] = data
      sessionStorage.setItem(path, JSON.stringify(data))

      return data
    } catch (error) {
      console.error(`❌ Failed to load animation: ${path}`, error)
      return null
    }
  }, [])

  useEffect(() => {
    const loadAllAnimations = async () => {
      const loadedAnimations = await Promise.all(
        ANIMATION_PATHS.map(async (item) => {
          if (item.type === 'lottie') {
            const data = await loadAnimation(item.path)
            return { type: 'lottie' as const, data }
          }
          return { type: 'image' as const, data: item.path }
        })
      )
      setAnimations(loadedAnimations)
    }

    loadAllAnimations()
  }, [ANIMATION_PATHS, loadAnimation])

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
    AOS.init()
  }, [])

  const handleFeatureClick = (i: number) => {
    if (i === selectedIndex) return
    setSelectedIndex(i)
  }

  const renderAnimations = () => {
    return (
      <div className="relative w-full h-full">
        {animations.map((animation, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-300 ${
              selectedIndex === index ? 'opacity-100 z-10' : 'opacity-0 z-0'
            }`}
            style={{ pointerEvents: selectedIndex === index ? 'auto' : 'none' }}>
            {animation && animation.type === 'lottie' && (
              <Lottie
                animationData={animation.data}
                loop={true}
                className="w-full h-full"
                style={{ width: '100%', height: '100%' }}
              />
            )}
          </div>
        ))}
      </div>
    )
  }

  return (
    <section
      className={`bg-white flex ${isArabic ? 'pr-[140px]' : 'pl-[140px]'} py-[85px] gap-[50px]  ${
        isArabic ? 'max-[1250px]:pr-6' : 'max-[1250px]:pl-6'
      } max-lg:pb-0 max-lg:gap-5 max-md:flex-col justify-center overflow-hidden max-md:p-4`}>
      <div className="flex flex-col gap-10 max-w-[700px]">
        <div className="flex flex-col gap-4 ">
          <Typography variant={isDesktop ? 'h3' : 'h5'} weight="medium" data-aos-offset={isMobile ? '-100' : '-50'}>
            {t('title')}
          </Typography>
          <Typography
            variant="body3"
            weight="regular"
            className="text-description"
            data-aos-offset={isMobile ? '-100' : '-50'}>
            {t('description')}
          </Typography>
        </div>

        <div className="max-md:block hidden w-full h-[300px] relative">{renderAnimations()}</div>

        <div
          className="grid grid-cols-2 grid-rows-2 gap-[20px] max-[1200px]:flex max-[1200px]:flex-col"
          data-aos={isDesktop ? 'fade' : ''}>
          {[0, 1, 2, 3].map((i) => {
            const isSelected = selectedIndex === i
            return (
              <div
                key={i}
                onClick={() => handleFeatureClick(i)}
                className={`flex px-5 py-6 gap-4 border rounded-[20px] cursor-pointer transition-all duration-500 text-black max-lg:p-4 ${
                  isSelected ? 'bg-secondary-100 border-primary-purple' : 'bg-white border-secondary-400'
                }`}>
                <div
                  className={`flex h-8 w-8 rounded-full text-body1 font-medium leading-[150%] justify-center items-center shrink-0 max-lg:h-6 max-lg:w-6 max-lg:text-caption transition-all duration-300 ${
                    isSelected
                      ? 'bg-primary-purple text-white'
                      : 'bg-secondary-100 text-primary-purple hover:bg-secondary-200'
                  }`}>
                  {i + 1}
                </div>
                <Typography
                  variant={isDesktop ? 'body3' : 'caption'}
                  weight="regular"
                  className="leading-[140%] transition-all duration-300">
                  {t(`items.${i}`)}
                </Typography>
              </div>
            )
          })}
        </div>

        <button
          className="button-gradient h-[56px] rounded-full px-6 py-5 text-center
                text-white text-caption !bg-black
                transition-all w-[200px] max-lg:w-[343px]">
          {t('button')}
        </button>
      </div>

      <div className="flex items-start shrink-0 max-md:hidden max-lg:items-center" data-aos="fade-left">
        <div className="h-[570px] w-[570px] max-[1400px]:h-[500px] max-[1400px]:w-[510px] max-lg:w-[405px] max-lg:h-[410px] relative">
          {renderAnimations()}
        </div>
      </div>
    </section>
  )
}
