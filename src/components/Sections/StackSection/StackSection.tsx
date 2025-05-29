'use client'

import { useState } from 'react'
import { Typography } from '@/components/ui'
import { Button } from '@/components/primitives/button'
import Stepper from '@/components/Stepper'

const slideConfigs = [
  {
    title: 'Step 1',
    subtitle: 'Pinpoint the Skill Gaps',
    description: 'We uncover your goals and the skills your team needs next.',
    img: '/assets/stack_section/stack_1.png'
  },
  {
    title: 'Step 2',
    subtitle: 'Identify Priorities',
    description: 'Focus on what matters most for your growth.',
    img: '/assets/stack_section/stack_1.png'
  },
  {
    title: 'Step 3',
    subtitle: 'Tailor Training',
    description: 'Build training around your team’s unique needs.',
    img: '/assets/stack_section/stack_1.png'
  }
]

const POSITIONS = {
  top: 'top-0 z-10',
  middle: 'top-[570px] z-20',
  bottom: 'top-[670px] z-30'
}

// Функція визначає, яка позиція зараз у картки
const getRelativePosition = (index: number, activeIndex: number): 'top' | 'middle' | 'bottom' => {
  if (index === activeIndex) return 'top'
  if ((index + 1) % 3 === activeIndex) return 'middle'
  return 'bottom'
}

export const StackSection = () => {
  const [activeIndex, setActiveIndex] = useState(0)

  const handleClick = (idx: number) => {
    if (idx === activeIndex) return // вже top, нічого не робимо
    setActiveIndex(idx)
  }

  return (
    <section className="flex gap-[120px] bg-primary-purple h-[900px] pt-[130px] px-[235px] text-white relative overflow-hidden">
      {/* Slides */}
      {[0, 1, 2].map((i) => {
        const position = getRelativePosition(i, activeIndex)
        return (
          <div
            key={i}
            className={`absolute bg-black bg-opacity-[32%] w-[440px] rounded-3xl backdrop-blur-[40px] flex flex-col justify-between cursor-pointer transition-all duration-500 ease-in-out translate-x-[200px] translate-y-[140px] 
              ${POSITIONS[position]}
              ${position === 'top' ? 'rounded-t-3xl' : ''}
            `}
            style={{
              left: 0,
              right: 'auto'
            }}
            onClick={() => handleClick(i)}>
            <div className="flex flex-col gap-2 px-[18px] pt-12 text-center">
              <Typography variant="h4" weight="medium" className="opacity-65 mb-1">
                {slideConfigs[i].title}
              </Typography>
              <Typography variant="h4" weight="medium">
                {slideConfigs[i].subtitle}
              </Typography>
              <Typography variant="body3" weight="regular" className="opacity-80">
                {slideConfigs[i].description}
              </Typography>
            </div>
            <div className="flex justify-center pb-[55px]">
              <img src={slideConfigs[i].img} alt={`stack_${i + 1}`} className="object-contain max-w-none" />
            </div>
          </div>
        )
      })}

      {/* Right section */}
      <div className="flex flex-col gap-[210px] max-w-[410px] ml-auto relative z-40">
        <div className="flex flex-col gap-8 ">
          <Typography variant="h3" weight="medium">
            Training Your Team. Your Smartest Investment
          </Typography>
          <Typography variant="body2" weight="regular">
            Coursinity turns your ambition into tailored training shaped by your goals, your team’s strengths, and your
            culture’s pulse.
          </Typography>
          <Button variant="secondary">Talk to a Learning Advisor</Button>
        </div>
        <Stepper steps={3} activeStep={activeIndex + 1} />
      </div>
    </section>
  )
}
