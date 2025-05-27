import React from 'react'

type SwipeStepperProps = {
  steps: number
  activeStep: number
  onStepClick?: (step: number) => void
}

export const SwipeStepper = ({ steps, activeStep, onStepClick }: SwipeStepperProps) => {
  return (
    <div className="grid grid-cols-3 gap-[10px] w-fit">
      {Array.from({ length: steps }).map((_, i) => {
        const step = i + 1
        const isActive = step === activeStep

        return (
          <button
            key={step}
            onClick={() => onStepClick?.(step)}
            className={`w-12 h-1 flex items-center justify-center rounded-[99px] border-[1.5px] 
              transition-colors text-white text-[24px] leading-8 font-medium
              ${isActive ? 'bg-white' : 'bg-white opacity-40'}
            `}></button>
        )
      })}
    </div>
  )
}
