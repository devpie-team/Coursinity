import { Typography } from '@/components/ui'
import { cn } from '@/lib/utils'
import React, { ReactElement, forwardRef, useEffect, useState } from 'react'

import './Card.styles.css'

type TRotateCardProps = {
  bg: string
  icon: ReactElement<{ color?: string; className?: string }>
  title: string
  subtitle: string
  id: number
  innerRef: (el: HTMLDivElement) => void
  className?: string
}

export const Card = forwardRef<HTMLDivElement, TRotateCardProps>((props, ref) => {
  const [isDesktop, setIsDesktop] = useState(true)
  const [isHovered, setIsHovered] = useState(false)

  useEffect(() => {
    const checkScreenSize = () => setIsDesktop(window.innerWidth > 1024)
    checkScreenSize()
    window.addEventListener('resize', checkScreenSize)
    return () => window.removeEventListener('resize', checkScreenSize)
  }, [])

  return (
    <div
      ref={props.innerRef}
      className={cn(
        'card-corners min-w-[400px] max-md:min-w-[320px] h-[400px] max-md:h-[320px] flex items-center justify-center relative rounded-[40px] bg-[rgba(232,221,252,0.11)] backdrop-blur-md',
        props.className
      )}>
      <svg
        width="41"
        height="41"
        viewBox="0 0 41 41"
        fill="none"
        className={cn('card-corner card-corner--tl', isHovered ? 'card-corner--final-tl' : 'card-corner--init-tl')}>
        <path d="M41 1H21C9.95431 1 1 9.95431 1 21V41" stroke={props.bg} stroke-width="2" />
      </svg>

      <span />
      <svg
        width="41"
        height="41"
        viewBox="0 0 41 41"
        fill="none"
        className={cn('card-corner card-corner--tr', isHovered ? 'card-corner--final-tr' : 'card-corner--init-tr')}>
        <path d="M0 1H20C31.0457 1 40 9.95431 40 21V41" stroke={props.bg} stroke-width="2" />
      </svg>

      <svg
        width="41"
        height="41"
        viewBox="0 0 41 41"
        fill="none"
        className={cn('card-corner card-corner--bl', isHovered ? 'card-corner--final-bl' : 'card-corner--init-bl')}>
        <path d="M41 40H21C9.95431 40 1 31.0457 1 20V0" stroke={props.bg} stroke-width="2" />
      </svg>
      <svg
        width="41"
        height="41"
        viewBox="0 0 41 41"
        fill="none"
        className={cn('card-corner card-corner--br', isHovered ? 'card-corner--final-br' : 'card-corner--init-br')}>
        <path d="M0 40H20C31.0457 40 40 31.0457 40 20V0" stroke={props.bg} stroke-width="2" />
      </svg>
      <div
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className={cn(
          'group page flex flex-col w-[320px] max-md:w-[280px] h-[320px] max-md:h-[280px] items-start gap-8 p-6 pb-10 relative rounded-[10px] text-left transition-colors duration-500 ease-in-out'
        )}
        style={{
          zIndex: props.id,
          backgroundColor: isHovered ? props.bg : '#ffffff',
          color: isHovered ? '#ffffff' : undefined
        }}>
        <div
          className={`flex items-center justify-center p-[10px] rounded-2xl w-[68px] h-[68px] transition-colors duration-500 ease-in-out ${props.bg}`}
          style={{
            backgroundColor: !isHovered ? props.bg : '#ffffff'
          }}>
          {React.isValidElement(props.icon) &&
            React.cloneElement(props.icon, {
              color: isHovered ? props.bg : '#fff',
              className: 'transition-colors duration-500 ease-in-out'
            })}
        </div>

        <div className="flex flex-col items-start gap-4 relative self-stretch w-full flex-[0_0_auto] max-lg:gap-4">
          <Typography
            variant={isDesktop ? 'h6' : 'body1'}
            weight="medium"
            className="transition-colors duration-500 ease-in-out">
            {props.title}
          </Typography>
          <Typography
            variant={isDesktop ? 'body3' : 'caption'}
            weight="regular"
            className="leading-[24px] text-description transition-colors duration-500 ease-in-out"
            style={{
              color: isHovered ? '#ffffff' : undefined
            }}>
            {props.subtitle}
          </Typography>
        </div>
      </div>
    </div>
  )
})

Card.displayName = 'Card'
