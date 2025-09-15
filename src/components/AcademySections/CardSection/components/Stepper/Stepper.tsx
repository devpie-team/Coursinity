'use client'
import { cn } from '@/lib/utils'
import { ChevronLeftIcon } from 'lucide-react'
import { useLocale } from 'next-intl'

type TStepperProps = {
  current: number
  total: number
  onPrev: () => void
  onNext: () => void
  onGo: (page: number) => void
  rtl?: boolean
  className?: string
}

export const Stepper = ({ current, total, onPrev, onNext, onGo, rtl, className }: TStepperProps) => {
  if (total <= 1) return null

  const locale = useLocale()

  return (
    <div className={cn('flex items-center gap-6', className)} dir={rtl ? 'rtl' : 'ltr'}>
      <button
        type="button"
        onClick={() => onGo(0)}
        className="grid place-items-center w-8 h-8 rounded-full text-white/60 hover:text-white/90 disabled:opacity-30"
        disabled={current === 0}
        aria-label="Previous">
        <span className="text-xl leading-none">
          <ChevronLeftIcon
            className={cn(
              'h-6 w-6 stroke-[#FFFFFF] group-hover:stroke-[#FFFFFF]/50 transition',
              locale == 'ar' ? ' -scale-x-100' : ''
            )}
          />
        </span>
      </button>

      <div className="flex items-center gap-4">
        {Array.from({ length: total }).map((_, i) => {
          const active = i === current
          return (
            <button
              key={i}
              type="button"
              onClick={() => onGo(i)}
              aria-current={active}
              className={cn(
                'w-14 h-14 rounded-full border-[1.5px] grid place-items-center transition-colors',
                active
                  ? 'border-white text-white'
                  : 'border-white/30 text-white/80 hover:border-white/60 hover:text-white'
              )}>
              <span className="text-2xl font-medium">{i + 1}</span>
            </button>
          )
        })}
      </div>

      {/* Next */}
      <button
        type="button"
        onClick={() => onGo(1)}
        className="grid place-items-center w-8 h-8 rounded-full text-white/60 hover:text-white/90 disabled:opacity-30"
        disabled={current === 1}
        aria-label="Next">
        <span className="text-xl leading-none">
          {' '}
          <ChevronLeftIcon
            className={cn(
              'h-6 w-6 stroke-[#FFFFFF] group-hover:stroke-[#FFFFFF]/50 transition',
              locale == 'ar' ? '' : '-scale-x-100'
            )}
          />
        </span>
      </button>
    </div>
  )
}
