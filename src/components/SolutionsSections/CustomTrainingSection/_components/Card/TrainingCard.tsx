'use client'
import { Typography } from '@/components/ui'
import React, { forwardRef, useEffect, useState } from 'react'

type TrainingCardProps = {
  title: string
  description: string
  tags: string[]
  className?: string
}

export const TrainingCard = forwardRef<HTMLDivElement, TrainingCardProps>(
  ({ title, description, tags, className = '' }, ref) => {
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

    return (
      <div
        ref={ref}
        className={`absolute flex flex-col justify-between p-8  bg-[linear-gradient(180deg,_rgba(255,255,255,0.06)_0%,_rgba(30,141,194,0.06)_100%)] blue-gradient-border backdrop-blur-[10px] w-[440px] h-[360px]  text-start max-1150:w-[300px] max-1150:h-[280px] max-1150:p-4  ${className}`}>
        <div className="flex flex-col gap-2">
          <Typography variant="h5" weight="medium" className="text-white max-1150:text-xl">
            {title}
          </Typography>
          <Typography variant="body3" weight="regular" className="text-white opacity-80 max-1150:text-[13px] leading-6">
            {description}
          </Typography>
        </div>
        <div className="flex flex-col gap-2">
          {tags.map((tag, idx) => (
            <Typography
              key={idx}
              variant="caption"
              weight="regular"
              className="text-white/80 px-4 py-2 border border-white/15 rounded-xl max-lg:text-[13px]">
              {tag}
            </Typography>
          ))}
        </div>
      </div>
    )
  }
)

TrainingCard.displayName = 'TrainingCard'
