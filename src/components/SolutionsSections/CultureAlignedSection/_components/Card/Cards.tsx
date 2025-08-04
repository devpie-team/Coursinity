import { Typography } from '@/components/ui'
import { cn } from '@/lib/utils'
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
      className={cn(
        `flex flex-col gap-2 6 bg-[linear-gradient(101.93deg,_#0D0D0D_7.29%,_#043E5A_100%)] w-[300px] p-6 rounded-2xl blue-gradient-border  max-lg:w-[280px] max-md:p-4`,
        className
      )}>
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
