import { GradientTickIcon } from '@/components/icons/GradientTickIcon'
import { Typography } from '@/components/ui'
import React, { forwardRef, useEffect, useRef, useState } from 'react'

type StepCardProps = {
  title: string
  description: string
  number: number
  isOpen: boolean
  isLast?: boolean
  isCompleted?: boolean
  onClick?: () => void
}

export const StepCard = forwardRef<HTMLDivElement, StepCardProps>(
  ({ title, description, number, isOpen, isLast = false, isCompleted = false, onClick }, ref) => {
    const localRef = useRef<HTMLDivElement | null>(null)
    const [openPercent, setOpenPercent] = useState(0)
    const [isMobile, setIsMobile] = useState(false)
    const [isTablet, setIsTablet] = useState(false)
    const [isDesktop, setIsDesktop] = useState(true)
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
    const CLOSED_HEIGHT = 86
    const OPEN_HEIGHT = isDesktop ? 150 : 120

    const setRefs = (el: HTMLDivElement | null) => {
      if (typeof ref === 'function') ref(el)
      else if (ref) (ref as React.MutableRefObject<HTMLDivElement | null>).current = el
      localRef.current = el
    }

    useEffect(() => {
      const update = () => {
        const node = localRef.current
        if (!node) return
        const height = node.offsetHeight
        const percent = Math.max(0, Math.min(1, (height - CLOSED_HEIGHT) / (OPEN_HEIGHT - CLOSED_HEIGHT)))
        setOpenPercent(percent)
      }

      update()
      const ro = new ResizeObserver(update)
      if (localRef.current) ro.observe(localRef.current)
      return () => ro.disconnect()
    }, [])

    return (
      <div ref={setRefs} className="transition-all overflow-hidden">
        <div className="flex gap-4 items-start cursor-pointer" onClick={onClick}>
          <div className="flex flex-col w-6 min-w-[24px] items-center relative">
            <Typography variant={isDesktop ? 'h4' : 'h6'} weight="medium" className=" flex items-center justify-center">
              <span
                className={`flex justify-center items-center transition-all duration-300 ease-out ${
                  isCompleted ? 'scale-100 opacity-100' : 'scale-0 opacity-0'
                }`}>
                <GradientTickIcon />
              </span>
              <span
                className={`absolute transition-all duration-200 ${
                  isCompleted ? 'opacity-0 scale-0' : 'opacity-100 scale-100'
                }`}>
                {number}
              </span>
            </Typography>

            {!isLast && (
              <span
                className="absolute left-1/2 top-full translate-x-[-50%] rounded-full transition-[height,margin-top,background] duration-700"
                style={{
                  marginTop: isOpen ? '6px' : '12px',
                  height: isOpen ? ` ${isDesktop ? 96 : 64}px` : '20px',
                  width: '3px',
                  background: isOpen
                    ? 'linear-gradient(180deg, rgba(30,141,194,0.64) -7.93%, rgba(165,120,242,0.64) 25.83%, rgba(30,141,194,0.64) 105.37%)'
                    : '#D0D5DD'
                }}
              />
            )}
          </div>

          <div className="flex flex-col">
            <Typography variant={isDesktop ? 'h4' : 'h6'} weight="medium">
              {title}
            </Typography>
            <Typography
              variant="body2"
              className="text-description transition-opacity duration-300"
              style={{ opacity: openPercent }}>
              {description}
            </Typography>
          </div>
        </div>
      </div>
    )
  }
)

StepCard.displayName = 'StepCard'
