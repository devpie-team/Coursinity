'use client'

import * as React from 'react'
import { Typography } from '@/components/ui'
import { cn } from '@/lib/utils'
import { Button } from '@/components/primitives/button'
import IdeaIcon from '@/components/icons/IdeaIcon'
import { NotificationIcon } from '@/components/icons/NotificationIcon'

export type CardSessionProps = {
  className?: string
  title: string
  subtitle: string
  meta?: string
  cta?: string
}

export const CardSession: React.FC<CardSessionProps> = ({
  className,
  title,
  subtitle,
  meta = '',
  cta = 'Set a reminder'
}) => {
  const [isDesktop, setIsDesktop] = React.useState(true)

  React.useEffect(() => {
    const check = () => setIsDesktop(window.innerWidth > 1024)
    check()
    window.addEventListener('resize', check)
    return () => window.removeEventListener('resize', check)
  }, [])

  return (
    <div
      className={cn(
        'lc-card opacity-0 will-change-transform origin-center', // важливо для коректного повороту
        'absolute',
        'w-[425px] h-[425px] rounded-3xl max-lg:w-[260px] max-lg:h-[260px] max-md:w-[260px] max-md:h-[260px]',
        'bg-gradient-to-b from-white/5 to-cyan-600/5',
        'border border-white/20 backdrop-blur-lg',
        'shadow-[0px_12px_30px_0px_rgba(0,0,0,0.05)]',
        className
      )}>
      <div className="absolute inset-0 p-10 max-lg:p-6 flex flex-col justify-between text-start">
        <div className="flex flex-col gap-2">
          <Typography variant={isDesktop ? 'h6' : 'body1'} className="text-primary-green">
            {title}
          </Typography>
          <div className="flex flex-col gap-1">
            <Typography variant={isDesktop ? 'h5' : 'body2'} weight="medium" className="text-white">
              {subtitle}
            </Typography>

            <Typography variant="body3" className="text-white">
              {meta}
            </Typography>
          </div>
        </div>

        <Button leftIcon={<NotificationIcon />} variant="academy" className="flex gap-2 text-white">
          {cta}
        </Button>
      </div>
    </div>
  )
}
