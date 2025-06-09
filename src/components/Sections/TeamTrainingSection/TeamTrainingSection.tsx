import { useEffect, useState } from 'react'
import { useTranslations } from 'next-intl'
import { Button } from '@/components/primitives/button'
import { Typography } from '@/components/ui'
import Lottie from 'lottie-react'

const LOTTIE_PATHS = [
  '/assets/lottie/team_train/team_train_1.json',
  '/assets/lottie/team_train/team_train_2.json',
  '/assets/lottie/team_train/team_train_3.json',
  '/assets/team_training/team_training_4.png'
]

export const TeamTrainingSection = () => {
  const t = useTranslations('TeamTrainingSection')
  const [isMobile, setIsMobile] = useState(false)
  const [isTablet, setIsTablet] = useState(false)
  const [isDesktop, setIsDesktop] = useState(true)
  const [selectedIndex, setSelectedIndex] = useState<number | null>(0)
  const [animations, setAnimations] = useState<(any | null)[]>([null, null, null, null])

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
    LOTTIE_PATHS.forEach((path, idx) => {
      if (!animations[idx]) {
        fetch(path)
          .then((res) => res.json())
          .then((json) => {
            setAnimations((prev) => {
              const updated = [...prev]
              updated[idx] = json
              return updated
            })
          })
      }
    })
  }, [])

  const features = [0, 1, 2, 3]

  return (
    <section className="bg-white flex pl-[140px] py-[85px]  gap-[50px] max-[1250px]:px-6 max-lg:pb-0 max-lg:gap-5 max-md:flex-col justify-center">
      <div className="flex flex-col gap-10 max-w-[700px]">
        <div className="flex flex-col gap-4 ">
          <Typography variant={isDesktop ? 'h3' : 'h5'} weight="medium">
            {t('title')}
          </Typography>
          <Typography variant="body3" weight="regular" className="text-description">
            {t('description')}
          </Typography>
        </div>
        {selectedIndex !== null && animations[selectedIndex] && (
          <div className="max-md:block hidden w-full h-auto max-h-[300px] object-contain rounded-xl">
            <Lottie animationData={animations[selectedIndex]} loop={true} style={{ width: '100%', height: 300 }} />
          </div>
        )}

        <div className="grid grid-cols-2 grid-rows-2 gap-[20px]  max-[1200px]:flex max-[1200px]:flex-col ">
          {features.map((i) => {
            const isSelected = selectedIndex === i
            return (
              <div
                key={i}
                onClick={() => setSelectedIndex(i)}
                className={`flex px-5 py-6 gap-4 border rounded-[20px] cursor-pointer transition-all text-black max-lg:p-4 ${
                  isSelected ? 'bg-secondary-100 border-primary-purple ' : 'bg-white border-secondary-400 '
                }`}>
                <div
                  className={`flex h-8 w-8 rounded-full  text-body1 font-medium leading-[150%] justify-center items-center shrink-0 max-lg:h-6 max-lg:w-6 max-lg:text-caption ${
                    isSelected ? 'bg-primary-purple text-white' : ' bg-secondary-100 text-primary-purple'
                  }`}>
                  {i + 1}
                </div>
                <Typography variant={isDesktop ? 'body3' : 'caption'} weight="regular" className="leading-[140%] ">
                  {t(`items.${i}`)}
                </Typography>
              </div>
            )
          })}
        </div>

        <Button variant="primary" className="w-[200px] max-lg:w-[343px]">
          {t('button')}
        </Button>
      </div>

      <div className=" flex justify-center shrink-0 max-md:hidden">
        {selectedIndex !== null && animations[selectedIndex] && (
          <div className="h-[570px] w-[570px] max-[1400px]:h-[500px] max-[1400px]:w-[510px] max-lg:w-[400px] max-lg:h-[410px] ">
            <Lottie animationData={animations[selectedIndex]} loop={true} style={{ width: '100%', height: '100%' }} />
          </div>
        )}
      </div>
    </section>
  )
}
