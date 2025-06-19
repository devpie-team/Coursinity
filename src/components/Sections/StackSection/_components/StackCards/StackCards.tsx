'use client'

import { BadgeIcon } from '@/components/icons/BadgeIcon'
import { Typography } from '@/components/ui'
import { useTranslations } from 'next-intl'
import { useEffect, useState } from 'react'
import AOS from 'aos'
import 'aos/dist/aos.css'
type Position = 'top' | 'middle' | 'bottom'

const POSITIONS: Record<Position, string> = {
  top: 'top-[-10px] z-10 max-lg:top-[000px] max-md:top-[20px]',
  middle: 'top-[570px] z-20 max-lg:top-[555px] max-md:top-[555px]',
  bottom: 'top-[670px] z-30 max-lg:top-[660px] max-md:top-[655px]'
}

const getRelativePosition = (index: number, activeIndex: number): Position => {
  if (index === activeIndex) return 'top'
  if ((index + 2) % 3 === activeIndex) return 'middle'
  return 'bottom'
}

type StackCardsProps = {
  activeIndex: number
  setActiveIndex: (idx: number) => void
  isVisible: boolean
}

export const StackCards: React.FC<StackCardsProps> = ({ activeIndex, setActiveIndex, isVisible }) => {
  const [isMobile, setIsMobile] = useState<boolean>(false)
  const [isTablet, setIsTablet] = useState<boolean>(false)
  const [isDesktop, setIsDesktop] = useState<boolean>(true)
  const t = useTranslations('StackSection')

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

  const activeStyle = (step: number) => {
    return {
      opacity: isVisible && activeIndex + 1 == step ? 1 : 0,
      transition: 'opacity 800ms cubic-bezier(0.4, 0, 0.2, 1)',
      transitionDelay: isVisible && activeIndex + 1 == step ? '400ms' : '0ms'
    }
  }

  return (
    <>
      {/* Картка 1 */}
      <div
        className={`
          absolute left-1/2 -translate-x-1/2 h-[770px] w-[440px]
          bg-black bg-opacity-[32%] rounded-3xl backdrop-blur-[40px]
          flex flex-col justify-between cursor-pointer transition-all duration-500 ease-in-out mb-[100px]
          ${POSITIONS[getRelativePosition(0, activeIndex)]}
          ${activeIndex === 0 ? 'rounded-t-3xl' : ''}
        `}
        // onClick={() => setActiveIndex(0)}s
      >
        <div className="flex flex-col gap-2 px-[18px] pt-12 text-center justify-center items-center">
          <Typography variant="h4" weight="medium" className="opacity-65 mb-1">
            {t('steps.0.title')}
          </Typography>
          <Typography variant="h4" weight="medium" style={activeStyle(1)}>
            {t('steps.0.subtitle')}
          </Typography>
          <Typography
            variant="body3"
            weight="regular"
            className="opacity-80 w-[305px] text-center"
            style={activeStyle(1)}>
            {t('steps.0.description')}
          </Typography>
        </div>
        <div className="flex justify-center pb-[255px]">
          <img
            src="/assets/stack_section/stack_1.png"
            alt="Step 1"
            className=" object-cover max-md:absolute max-md:bottom-[50px]"
            style={activeStyle(1)}
          />
        </div>
        <img
          src="/assets/stack_section/stack_4.png"
          alt="stack_4"
          className="absolute object-cover top-[350px] left-[15px]"
          style={activeStyle(1)}
        />
        <img
          src="/assets/stack_section/stack_5.png"
          alt="stack_5"
          className="absolute object-cover top-[250px] right-[20px]"
          style={activeStyle(1)}
        />
      </div>

      {/* Картка 2 */}
      <div
        className={`
          absolute left-1/2 -translate-x-1/2 h-[730px] w-[440px]
          bg-black bg-opacity-[32%] rounded-3xl backdrop-blur-[40px]
          flex flex-col  cursor-pointer transition-all duration-500 ease-in-out 
          ${POSITIONS[getRelativePosition(1, activeIndex)]}
          ${activeIndex === 1 ? 'rounded-t-3xl' : ''}
        `}
        // onClick={() => setActiveIndex(1)}
      >
        <div className="flex flex-col gap-3 px-[18px] pt-12 text-center justify-center items-center">
          <Typography variant="h4" weight="medium" className="opacity-65 ">
            {t('steps.1.title')}
          </Typography>
          <Typography variant="h4" weight="medium" style={activeStyle(2)}>
            {t('steps.1.subtitle')}
          </Typography>
          {t('steps.1.button') && (
            <button
              style={activeStyle(2)}
              className="
                button-gradient
                h-14 rounded-full px-6 py-5 text-center mt-4
                text-white text-caption
                transition-all 
              ">
              {t('steps.1.button')}
            </button>
          )}
        </div>
        <div className="flex justify-center">
          <img
            src="/assets/stack_section/stack_2.png"
            alt="Step 2"
            className=" object-cover max-md:absolute max-md:bottom-12 "
            style={activeStyle(2)}
          />
        </div>
        {t('steps.1.badge') && (
          <div className=" absolute flex justify-center items-center gap-[10px] bg-white h-14  rounded-full p-4 text-[#18233D] top-[460px] left-[65px] max-md:top-[420px]">
            <span className="absolute w-4 h-4 bg-white rounded-full top-[40px] left-[0px]"></span>
            <span className="absolute w-2 h-2 bg-white rounded-full top-[56px] left-[-8px]"></span>
            <BadgeIcon />
            <Typography variant="caption" weight="medium">
              {t('steps.1.badge')}
            </Typography>
          </div>
        )}
      </div>

      {/* Картка 3 */}
      <div
        className={`
          absolute left-1/2 -translate-x-1/2 h-[770px] w-[440px]
          bg-black bg-opacity-[32%] rounded-3xl backdrop-blur-[40px]
          flex flex-col justify-between cursor-pointer transition-all duration-500 ease-in-out
          ${POSITIONS[getRelativePosition(2, activeIndex)]}
          ${activeIndex === 2 ? 'rounded-t-3xl' : ''}
        `}
        // onClick={() => setActiveIndex(2)}
      >
        <div className="flex flex-col gap-3 px-[18px] pt-12 text-center justify-center items-center">
          <Typography variant="h4" weight="medium" className="opacity-65 ">
            {t('steps.2.title')}
          </Typography>
          <Typography variant="h4" weight="medium" style={activeStyle(3)}>
            {t('steps.2.subtitle')}
          </Typography>
          {t('steps.2.button') && (
            <button
              style={activeStyle(3)}
              className="
                button-gradient
                h-14 rounded-full px-6 py-5 text-center mt-4
                text-white text-caption
                transition-all 
              ">
              {t('steps.2.button')}
            </button>
          )}
        </div>
        <div className="flex justify-center pb-[100px]" style={activeStyle(3)}>
          <img
            src="/assets/stack_section/stack_3.png"
            alt="Step 3"
            className=" object-cover max-md:absolute max-md:bottom-[120px]"
          />
        </div>
      </div>
    </>
  )
}
