import { cn } from '@/lib/utils'
import React from 'react'

type SwipeStepperProps = {
  steps: number
  activeStep: number
  onStepClick?: (step: number) => void
  type: 'blue' | 'white' | 'green'
}

export const SwipeStepper = ({ steps, activeStep, onStepClick, type }: SwipeStepperProps) => {
  const isBlue = type === 'blue'
  const isGreen = type === 'green'

  return (
    <div className="flex flex-row gap-[10px] w-fit">
      {Array.from({ length: steps }).map((_, i) => {
        const step = i + 1
        const isActive = step === activeStep

        return (
          <button
            key={step}
            onClick={() => onStepClick?.(step)}
            className={cn(
              `w-12 max-350:w-8 h-1 flex items-center justify-center rounded-[99px]
               text-white text-[24px] leading-8 font-medium transition-all duration-300
              ${
                isActive
                  ? isBlue
                    ? 'bg-primary-blue'
                    : isGreen
                    ? 'bg-primary-green'
                    : 'bg-white'
                  : isBlue
                  ? 'bg-primary-blue opacity-40'
                  : isGreen
                  ? 'bg-primary-green opacity-40'
                  : 'bg-white opacity-40'
              }
            `,
              steps == 8 && 'w-[34px]'
            )}></button>
        )
      })}
    </div>
  )
}
