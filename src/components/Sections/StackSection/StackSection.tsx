'use client'

import { useState } from 'react'
import { Typography } from '@/components/ui'
import { Button } from '@/components/primitives/button'
import Stepper from '@/components/Stepper'

import { StackCards } from './_components/StackCards/StackCards'

type Position = 'top' | 'middle' | 'bottom'
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
    img: '/assets/stack_section/stack_2.png'
  },
  {
    title: 'Step 3',
    subtitle: 'Tailor Training',
    description: 'Build training around your team’s unique needs.',
    img: '/assets/stack_section/stack_3.png'
  }
]

const getRelativePosition = (index: number, activeIndex: number): 'top' | 'middle' | 'bottom' => {
  if (index === activeIndex) return 'top'
  if ((index + 2) % 3 === activeIndex) return 'middle'
  return 'bottom'
}

export const StackSection = () => {
  const [activeIndex, setActiveIndex] = useState(0)

  return (
    <section className="flex gap-[120px] bg-primary-purple h-[900px] pt-[130px] px-[235px] text-white overflow-hidden">
      {/* Slides */}
      <div className="w-1/2 relative">
        <StackCards activeIndex={activeIndex} setActiveIndex={setActiveIndex} />
      </div>
      {/* Right section */}
      <div className="flex flex-col gap-[210px] max-w-[410px] ml-auto relative z-40 w-1/2">
        <div className="flex flex-col gap-8 ">
          <Typography variant="h3" weight="medium">
            Training Your Team. Your Smartest Investment
          </Typography>
          <Typography variant="body2" weight="regular">
            Coursinity turns your ambition into tailored training shaped by your goals, your team’s strengths, and your
            culture’s pulse.
          </Typography>
          <Button variant="secondary" className="w-[255px]">
            Talk to a Learning Advisor
          </Button>
        </div>
        <Stepper steps={3} activeStep={activeIndex + 1} onStepClick={(stepIndex) => setActiveIndex(stepIndex - 1)} />
      </div>
    </section>
  )
}
