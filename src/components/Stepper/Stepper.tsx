import React from 'react'

type StepperProps = {
  steps: number
  activeStep: number
  onStepClick?: (step: number) => void
}

const Stepper = ({ steps, activeStep, onStepClick }: StepperProps) => {
  return (
    <div className="grid grid-cols-3 gap-4 w-fit">
      {Array.from({ length: steps }).map((_, i) => {
        const step = i + 1
        const isActive = step === activeStep

        return (
          <button
            key={step}
            onClick={() => onStepClick?.(step)}
            className={`w-12 h-12 flex items-center justify-center rounded-full border-[1.5px] 
               text-white text-[24px] leading-8 font-medium transition-all duration-300
              ${isActive ? 'border-white' : 'border-[#FFFFFF52]'}
            `}>
            {step}
          </button>
        )
      })}
    </div>
  )
}

export default Stepper
