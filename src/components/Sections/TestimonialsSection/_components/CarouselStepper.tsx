import { ChevronLeftIcon } from '@/components/icons/ChevronLeftIcon'
import { useLocale } from 'next-intl'

type CarouselStepperProps = {
  total: number
  activeStep: number
  onPrev: () => void
  onNext: () => void
  onStepClick?: (idx: number) => void
}

export const CarouselStepper = ({ total, activeStep, onPrev, onNext, onStepClick }: CarouselStepperProps) => {
  const windowSize = 5
  let dots: number[] = []

  const windowStart = Math.floor(activeStep / windowSize) * windowSize

  const windowEnd = Math.min(windowStart + windowSize, total)

  dots = Array.from({ length: windowEnd - windowStart }, (_, i) => windowStart + i)
  const locale = useLocale()
  const isArabic = locale == 'ar'

  return (
    <div className="flex items-center gap-6 z-20">
      <button
        onClick={onPrev}
        className={`
            w-12 h-12 rounded-full border flex items-center justify-center
            ${
              activeStep === 0
                ? 'border-secondary-400 cursor-default'
                : 'border-primary-blue hover:bg-blue-50 transition'
            }
          `}
        disabled={activeStep === 0}>
        <ChevronLeftIcon stroke={activeStep === 0 ? '#D0D5DD' : '#1C8DC1'} className={isArabic ? '-scale-x-100' : ''} />
      </button>

      <div className="flex gap-3">
        {dots.map((slideIdx) => (
          <button
            key={slideIdx}
            onClick={() => onStepClick?.(slideIdx)}
            className={`
                w-[10px] h-[10px] rounded-full
                ${slideIdx === activeStep ? 'bg-primary-blue' : 'bg-primary-blue/30'}
                transition
              `}
            aria-label={`Go to slide ${slideIdx + 1}`}
          />
        ))}
      </div>

      <button
        onClick={onNext}
        className={`
            w-12 h-12 rounded-full border flex items-center justify-center
            ${
              activeStep === total - 1
                ? 'border-secondary-400 cursor-default'
                : 'border-primary-blue hover:bg-blue-50 transition'
            }
          `}
        disabled={activeStep === total - 1}>
        <ChevronLeftIcon
          className={isArabic ? '' : '-scale-x-100'}
          stroke={activeStep === total - 1 ? '#D0D5DD' : '#1C8DC1'}
        />
      </button>
    </div>
  )
}
