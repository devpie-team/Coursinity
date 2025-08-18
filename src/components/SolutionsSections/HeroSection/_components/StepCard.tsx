'use client'

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
  openPercent?: number
}

export const StepCard = forwardRef<HTMLDivElement, StepCardProps>(
  ({ title, description, number, isOpen, isLast = false, isCompleted = false, onClick, openPercent = 0 }, ref) => {
    const localRef = useRef<HTMLDivElement | null>(null)
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

    const setRefs = (el: HTMLDivElement | null) => {
      if (typeof ref === 'function') ref(el)
      else if (ref) (ref as React.MutableRefObject<HTMLDivElement | null>).current = el
      localRef.current = el
    }

    return (
      <div
        ref={setRefs}
        className="transition-all duration-300 ease-out "
        style={{
          height: isOpen ? (isDesktop ? '150px' : isTablet ? '130px' : '115px') : isDesktop ? '86px' : '60px'
        }}>
        <div className="flex gap-4 items-start cursor-pointer" onClick={onClick}>
          <div className="flex flex-col w-6 min-w-[24px] items-center relative">
            <Typography variant={isDesktop ? 'h4' : 'h6'} weight="medium" className="flex items-center justify-center">
              <span
                className={`flex justify-center items-center transition-all duration-300 ease-out ${
                  isCompleted ? 'scale-100 opacity-100' : 'scale-0 opacity-0'
                }`}>
                <GradientTickIcon />
              </span>
              <span
                className={`absolute transition-all duration-300 ${
                  isCompleted ? 'opacity-0 scale-0' : 'opacity-100 scale-100'
                }`}>
                {number}
              </span>
            </Typography>

            {!isLast && (
              <span
                className="absolute left-1/2 top-full translate-x-[-50%] rounded-full"
                style={{
                  marginTop: `${isDesktop ? 8 : 0}px`,
                  height: `${(isDesktop ? 30 : 24) + openPercent * (isDesktop ? 60 : 44)}px`,
                  width: '3px',
                  background: isOpen
                    ? 'linear-gradient(180deg, rgba(30,141,194,0.64) -7.93%, rgba(165,120,242,0.64) 25.83%, rgba(30,141,194,0.64) 105.37%)'
                    : '#D0D5DD'
                }}
              />
            )}
          </div>

          <div className="flex flex-col ">
            <Typography
              variant={isDesktop ? 'h4' : isTablet ? 'h6' : 'body1'}
              weight="medium"
              className="flex items-center h-10 ">
              {title}
            </Typography>
            <Typography
              variant={isMobile ? 'body3' : 'body2'}
              className="text-description transition-opacity duration-300"
              style={{ opacity: isOpen ? 1 : 0 }}>
              {description}
            </Typography>
          </div>
        </div>
      </div>
    )
  }
)

StepCard.displayName = 'StepCard'
