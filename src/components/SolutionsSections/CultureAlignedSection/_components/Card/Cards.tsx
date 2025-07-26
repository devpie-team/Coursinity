import { Typography } from '@/components/ui'
import React, { forwardRef } from 'react'

type CardProps = {
  title: string
  description: string
  className?: string
}

export const Card = forwardRef<HTMLDivElement, CardProps>(({ title, description, className = '' }, ref) => {
  return (
    <div
      ref={ref}
      className={`flex flex-col gap-2 bg-[linear-gradient(180deg,_rgba(255,255,255,0.06)_0%,_rgba(30,141,194,0.06)_100%)] w-[300px] p-6 rounded-2xl blue-gradient-border backdrop-blur-[10px] ${className}`}>
      <Typography variant="body3" weight="medium" className="text-white">
        {title}
      </Typography>
      <Typography variant="caption" weight="regular" className="text-white opacity-70">
        {description}
      </Typography>
    </div>
  )
})

Card.displayName = 'Card'
