'use client'

import { CheckCircleIcon } from '@/components/icons'
import { PlayCircleIcon } from '@/components/icons/PlayCircleIcon'
import { Typography } from '@/components/ui'
import { useState } from 'react'

export const GrowthStepSection = () => {
  const [activeIndex, setActiveIndex] = useState(1)

  // Для визначення позиції слайда відносно центру
  const getRelativePosition = (index: number) => {
    const diff = (index - activeIndex + 3) % 3
    if (diff === 0) return 'left'
    if (diff === 1) return 'center'
    if (diff === 2) return 'right'
    return ''
  }

  const handleClick = (index: number) => {
    const position = getRelativePosition(index)
    if (position === 'left') {
      setActiveIndex((prev) => (prev + 2) % 3) // -1
    } else if (position === 'right') {
      setActiveIndex((prev) => (prev + 1) % 3) // +1
    }
    // якщо центр — нічого
  }

  const getStyles = (index: number) => {
    const position = getRelativePosition(index)

    if (position === 'left') {
      return 'z-0 opacity-40 rotate-[-5deg] -translate-x-[110%] w-[900px] h-[600px] transform scale-[70%] bg-custom-gradient custom-shadow-secondary'
    }
    if (position === 'center') {
      return 'z-10 opacity-100 rotate-0 -translate-x-1/2 w-[900px] h-[600px] bg-custom-gradient custom-shadow'
    }
    if (position === 'right') {
      return 'z-0 opacity-40 rotate-[5deg] translate-x-[50%] w-[900px] h-[600px] transform scale-[70%] bg-custom-gradient custom-shadow-secondary top-1/2 left-1/3 -translate-y-1/2'
    }

    return ''
  }

  return (
    <section className="relative flex bg-black h-[1240px] overflow-hidden">
      <div
        className={`absolute flex flex-col top-1/2 left-1/2 -translate-y-1/2 transition-all duration-700 ease-in-out
         rounded-2xl justify-between cursor-pointer py-10 ${getStyles(1)}`}
        onClick={() => handleClick(1)}>
        <div className="flex gap-5 items-center justify-center p-1">
          <Typography variant="h4" weight="medium" className="text-white">
            Coursinity Solutions
          </Typography>
          <div>
            <PlayCircleIcon />
          </div>
        </div>
        <div className="flex items-center justify-center">
          <img src="/assets/growth/growth_3.png" alt="growth_3" className="w-[430px] h-[240px] object-contain " />
        </div>
        <div className="flex    ">
          <div className="flex flex-col h-[148px] w-[271px] gap-5 p-5">
            <div>
              <CheckCircleIcon size="32" fill="white" />
            </div>
            <Typography variant="body2" weight="semibold" className="text-white opacity-80">
              Self-paced training journeys
            </Typography>
          </div>
          <div className="flex flex-col h-[148px] w-[271px] gap-5 p-5">
            <div>
              <CheckCircleIcon size="32" fill="white" />
            </div>
            <Typography variant="body2" weight="semibold" className="text-white opacity-80">
              Built-in assessments and progress tracking
            </Typography>
          </div>
          <div className="flex flex-col h-[148px] w-[271px] gap-5 p-5">
            <div>
              <CheckCircleIcon size="32" fill="white" />
            </div>
            <Typography variant="body2" weight="semibold" className="text-white opacity-80">
              Fully branded internal academies
            </Typography>
          </div>
        </div>
      </div>

      <div
        className={`absolute flex flex-col top-1/2 left-1/2 -translate-y-1/2 transition-all duration-700 ease-in-out
         rounded-2xl justify-between cursor-pointer py-10 ${getStyles(2)}`}
        onClick={() => handleClick(2)}>
        <div className="flex gap-5 items-center justify-center p-1">
          <Typography variant="h4" weight="medium" className="text-white">
            Coursinity Academy
          </Typography>
          <div>
            <PlayCircleIcon />
          </div>
        </div>
        <div>
          <img
            src="/assets/growth/growth_1.png"
            alt="growth_1"
            className="top-[0px]   absolute object-contain w-full"
          />
        </div>
        <div className="flex    ">
          <div className="flex flex-col h-[148px] w-[271px] gap-5 p-5">
            <div>
              <CheckCircleIcon size="32" fill="white" />
            </div>
            <Typography variant="body2" weight="semibold" className="text-white opacity-80">
              Fully branded internal academies
            </Typography>
          </div>
          <div className="flex flex-col h-[148px] w-[271px] gap-5 p-5">
            <div>
              <CheckCircleIcon size="32" fill="white" />
            </div>
            <Typography variant="body2" weight="semibold" className="text-white opacity-80">
              Reporting, analytics, and certification tracking
            </Typography>
          </div>
          <div className="flex flex-col h-[148px] w-[271px] gap-5 p-5">
            <div>
              <CheckCircleIcon size="32" fill="white" />
            </div>
            <Typography variant="body2" weight="semibold" className="text-white opacity-80">
              LMS platforms integrated with your systems
            </Typography>
          </div>
        </div>
      </div>

      <div
        className={`absolute flex flex-col top-1/2 left-1/2 -translate-y-1/2 transition-all duration-700 ease-in-out
         rounded-2xl justify-between cursor-pointer py-10 ${getStyles(0)}`}
        onClick={() => handleClick(0)}>
        <div className="flex gap-5 items-center justify-center p-1">
          <Typography variant="h4" weight="medium" className="text-white">
            Coursinity AI
          </Typography>
          <div>
            <PlayCircleIcon />
          </div>
        </div>
        <div className="flex items-center justify-center">
          <img src="/assets/growth/growth_2.png" alt="growth_2" className="w-[300px] h-[300px] object-contain " />
        </div>
        <div className="flex    ">
          <div className="flex flex-col h-[148px] w-[271px] gap-5 p-5">
            <div>
              <CheckCircleIcon size="32" fill="white" />
            </div>
            <Typography variant="body2" weight="semibold" className="text-white opacity-80">
              Role-specific AI use cases
            </Typography>
          </div>
          <div className="flex flex-col h-[148px] w-[271px] gap-5 p-5">
            <div>
              <CheckCircleIcon size="32" fill="white" />
            </div>
            <Typography variant="body2" weight="semibold" className="text-white opacity-80">
              Ongoing support, updates, and libraries
            </Typography>
          </div>
          <div className="flex flex-col h-[148px] w-[271px] gap-5 p-5">
            <div>
              <CheckCircleIcon size="32" fill="white" />
            </div>
            <Typography variant="body2" weight="semibold" className="text-white opacity-80">
              Hands-on prompt coaching
            </Typography>
          </div>
        </div>
      </div>
    </section>
  )
}
