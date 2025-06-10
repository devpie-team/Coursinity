import { useEffect, useState } from 'react'
import { useTranslations } from 'next-intl'
import { Button } from '@/components/primitives/button'
import { Typography } from '@/components/ui'
import Lottie from 'lottie-react'
import AOS from 'aos'
import 'aos/dist/aos.css'

interface AnimationItem {
  type: 'lottie' | 'image'
  data: any
}

const ANIMATION_PATHS = [
  { path: '/assets/lottie/team_train/team_train_1.json', type: 'lottie' },
  { path: '/assets/lottie/team_train/team_train_2.json', type: 'lottie' },
  { path: '/assets/lottie/team_train/team_train_3.json', type: 'lottie' },
  { path: '/assets/team_training/team_train_4.png', type: 'image' }
]

export const TeamTrainingSection = () => {
  const t = useTranslations('TeamTrainingSection')
  const [isMobile, setIsMobile] = useState(false)
  const [isTablet, setIsTablet] = useState(false)
  const [isDesktop, setIsDesktop] = useState(true)
  const [selectedIndex, setSelectedIndex] = useState<number | null>(0)
  const [pendingIndex, setPendingIndex] = useState<number | null>(null)
  const [fade, setFade] = useState(true)
  const [animations, setAnimations] = useState<(AnimationItem | null)[]>([null, null, null, null])

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
    ANIMATION_PATHS.forEach((item, idx) => {
      if (!animations[idx]) {
        if (item.type === 'lottie') {
          fetch(item.path)
            .then((res) => res.json())
            .then((json) => {
              setAnimations((prev) => {
                const updated = [...prev]
                updated[idx] = { type: 'lottie', data: json }
                return updated
              })
            })
        } else {
          setAnimations((prev) => {
            const updated = [...prev]
            updated[idx] = { type: 'image', data: item.path }
            return updated
          })
        }
      }
    })
  }, [])

  const features = [0, 1, 2, 3]

  const handleFeatureClick = (i: number) => {
    if (i === selectedIndex) return
    setFade(false)
    setPendingIndex(i)
    setTimeout(() => {
      setSelectedIndex(i)
      setFade(true)
      setPendingIndex(null)
    }, 250)
  }

  const renderAnimation = (animation: AnimationItem, className: string) => {
    if (animation.type === 'lottie') {
      return <Lottie animationData={animation.data} loop={true} style={{ width: '100%', height: '100%' }} />
    } else {
      return <img src={animation.data} alt="Training visualization" className={`w-full h-full object-contain`} />
    }
  }

  return (
    <section className="bg-white flex pl-[140px] py-[85px]  gap-[50px] max-[1250px]:px-6 max-lg:pb-0 max-lg:gap-5 max-md:flex-col justify-center overflow-hidden">
      <div className="flex flex-col gap-10 max-w-[700px]">
        <div className="flex flex-col gap-4 ">
          <Typography variant={isDesktop ? 'h3' : 'h5'} weight="medium" data-aos="fade-up" data-aos-offset="100">
            {t('title')}
          </Typography>
          <Typography variant="body3" weight="regular" className="text-description" data-aos="fade-up">
            {t('description')}
          </Typography>
        </div>
        {selectedIndex !== null && animations[selectedIndex] && (
          <div
            className={`max-md:block hidden w-full h-auto  object-contain rounded-xl transition-opacity duration-300`}
            style={{
              opacity: fade ? 1 : 0,
              pointerEvents: fade ? 'auto' : 'none'
            }}>
            {renderAnimation(animations[selectedIndex], 'w-full h-[300px]')}
          </div>
        )}

        <div
          className="grid grid-cols-2 grid-rows-2 gap-[20px]  max-[1200px]:flex max-[1200px]:flex-col "
          data-aos="fade-up">
          {features.map((i) => {
            const isSelected = selectedIndex === i
            return (
              <div
                key={i}
                onClick={() => handleFeatureClick(i)}
                className={`flex px-5 py-6 gap-4 border rounded-[20px] cursor-pointer transition-all duration-500 text-black max-lg:p-4 ${
                  isSelected ? 'bg-secondary-100 border-primary-purple' : 'bg-white border-secondary-400 '
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

        <Button variant="primary" className="w-[200px] max-lg:w-[343px]" data-aos="fade-up">
          {t('button')}
        </Button>
      </div>

      <div className="flex items-start shrink-0 max-md:hidden max-lg:items-center" data-aos="fade-left">
        {selectedIndex !== null && animations[selectedIndex] && (
          <div
            className="h-[570px] w-[570px] max-[1400px]:h-[500px] max-[1400px]:w-[510px] max-lg:w-[400px] max-lg:h-[410px] transition-opacity duration-300"
            style={{
              opacity: fade ? 1 : 0,
              pointerEvents: fade ? 'auto' : 'none'
            }}>
            {renderAnimation(animations[selectedIndex], 'w-full h-full')}
          </div>
        )}
      </div>
    </section>
  )
}
