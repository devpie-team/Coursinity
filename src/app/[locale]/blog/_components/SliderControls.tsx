import { useCallback } from 'react'
import { cn } from '@/lib/utils'
import { ChevronLeft, ChevronRight } from 'lucide-react' // можна замінити на свої іконки
import { useLocale } from 'next-intl'

type SliderControlsProps = {
  current: number
  total: number
  onPrev: () => void
  onNext: () => void
  onDotClick?: (idx: number) => void
}

export function SliderControls({ current, total, onPrev, onNext, onDotClick }: SliderControlsProps) {
  const locale = useLocale()

  return (
    <div className="flex items-center justify-between gap-6 w-full">
      <div className="flex gap-2">
        {Array.from({ length: total }).map((_, i) => (
          <button
            key={i}
            onClick={() => onDotClick?.(i)}
            className={cn(
              'h-2 w-2 rounded-full transition-colors',
              i === current ? 'bg-primary-blue' : 'bg-secondary-200'
            )}
            aria-label={`Go to slide ${i + 1}`}
          />
        ))}
      </div>

      <div className="flex gap-8">
        <button
          onClick={onPrev}
          className={cn(
            'h-12 w-12 rounded-full border flex items-center justify-center',
            current !== 0
              ? 'border-primary-blue text-primary-blue '
              : 'border-secondary-400 text-secondary-400 hover:bg-gray-100 cursor-not-allowed'
          )}
          disabled={current === 0}>
          {locale == 'en' ? <ChevronLeft size={18} /> : <ChevronRight size={18} />}
        </button>

        <button
          onClick={onNext}
          className={cn(
            'h-12 w-12 rounded-full border flex items-center justify-center',
            current !== total - 1
              ? 'border-primary-blue text-primary-blue '
              : 'border-secondary-400 text-secondary-400 hover:bg-gray-100 cursor-not-allowed'
          )}
          disabled={current === total - 1}>
          {locale == 'ar' ? <ChevronLeft size={18} /> : <ChevronRight size={18} />}
        </button>
      </div>
    </div>
  )
}
