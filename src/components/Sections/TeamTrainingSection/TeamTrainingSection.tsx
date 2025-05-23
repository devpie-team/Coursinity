'use client'

import { useEffect, useState } from 'react'
import { useTranslations } from 'next-intl'
import { Button } from '@/components/primitives/button'
import { Typography } from '@/components/ui'

export const TeamTrainingSection = () => {
  const t = useTranslations('TeamTrainingSection')
  const [isMobile, setIsMobile] = useState(false)
  const [selectedIndex, setSelectedIndex] = useState<number | null>(0)

  useEffect(() => {
    const checkScreenSize = () => {
      const width = window.innerWidth
      setIsMobile(width < 834)
    }

    checkScreenSize()
    window.addEventListener('resize', checkScreenSize)
    return () => window.removeEventListener('resize', checkScreenSize)
  }, [])

  const features = [0, 1, 2, 3]
  const images = [
    '/assets/team_training/team_train_1.png',
    '/assets/team_training/team_train_2.png',
    '/assets/team_training/team_train_3.png',
    '/assets/team_training/team_train_4.png'
  ]

  return (
    <div className="flex pl-[140px] py-[85px] items-center ">
      <div className="flex flex-col gap-10">
        <div className="flex flex-col gap-4">
          <Typography variant="h3" weight="medium">
            {t('title')}
          </Typography>
          <Typography variant="body3" weight="regular" className="text-description">
            {t('description')}
          </Typography>
        </div>

        <div className="grid grid-cols-2 grid-rows-2 gap-[20px]">
          {features.map((i) => {
            const isSelected = selectedIndex === i
            return (
              <div
                key={i}
                onClick={() => setSelectedIndex(i)}
                className={`flex px-5 py-6 gap-4 border rounded-[20px] cursor-pointer transition-all text-black ${
                  isSelected ? 'bg-secondary-100 border-primary-purple ' : 'bg-white border-secondary-400 '
                }`}>
                <div
                  className={`flex h-8 w-8 rounded-full  text-body1 font-medium leading-[150%] justify-center items-center shrink-0 ${
                    isSelected ? 'bg-primary-purple text-white' : ' bg-secondary-100 text-primary-purple'
                  }`}>
                  {i + 1}
                </div>
                <Typography variant="body3" weight="regular">
                  {t(`items.${i}`)}
                </Typography>
              </div>
            )
          })}
        </div>

        <Button variant="primary" className="w-[200px]">
          {t('button')}
        </Button>
      </div>

      <div className="w-full flex justify-center ">
        {selectedIndex !== null && (
          <img
            src={images[selectedIndex]}
            alt={`Option ${selectedIndex + 1}`}
            className="h-[670px] w-[680px] object-contain "
          />
        )}
      </div>
    </div>
  )
}
