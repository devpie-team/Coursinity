import { Typography } from '@/components/ui'
import { cn } from '@/lib/utils'
import React, { ElementType, ReactElement, forwardRef, useEffect, useRef, useState } from 'react'

import './Card.styles.css'
import gsap from 'gsap'

type TRotateCardProps = {
  bg: string
  icon: ReactElement<{ color?: string; className?: string; ref?: React.Ref<HTMLDivElement> }>
  title: string
  subtitle: string
  id: number
  innerRef: (el: HTMLDivElement) => void
  className?: string
  isSelected?: boolean
}

export const Card = forwardRef<HTMLDivElement, TRotateCardProps>((props, ref) => {
  const alwaysHovered = props.id == 5
  const [isDesktop, setIsDesktop] = useState(true)
  const [stateHovered, setIsHovered] = useState(alwaysHovered)

  const isHovered = alwaysHovered || stateHovered

  useEffect(() => {
    const checkScreenSize = () => setIsDesktop(window.innerWidth > 1024)
    checkScreenSize()
    window.addEventListener('resize', checkScreenSize)
    return () => window.removeEventListener('resize', checkScreenSize)
  }, [])

  const cardRef = useRef<HTMLDivElement>(null)
  const iconRef = useRef<HTMLDivElement>(null)
  const iconWrapperRef = useRef<HTMLDivElement>(null)
  const subtextRef = useRef<ElementType>(null)

  useEffect(() => {
    if (!cardRef.current || !iconWrapperRef.current || !subtextRef.current) return

    gsap.to(cardRef.current, {
      backgroundColor: isHovered ? props.bg : '#ffffff',
      color: isHovered ? '#ffffff' : '#000000',
      duration: 0.15,
      overwrite: 'auto',
      ease: 'power2.out'
    })

    gsap.to(subtextRef.current, {
      color: isHovered ? '#ffffff' : '#6e6e6e ',
      duration: 0.15,
      overwrite: 'auto',
      ease: 'power2.out'
    })
    gsap.to(iconWrapperRef.current, {
      backgroundColor: !isHovered ? props.bg : '#ffffff',
      color: isHovered ? props.bg : '#ffffff',

      duration: 0.15,
      overwrite: 'auto',
      ease: 'power2.out'
    })
  }, [isHovered, props.bg])

  const CardLayout = ({ top }: { top?: boolean }) => {
    return (
      <div
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className={cn(
          top && 'mt-5',
          'animation-wrapper group page flex flex-col w-[320px] max-md:w-[280px] h-[320px] max-md:h-[280px] items-start gap-8 p-6 pb-10 relative rounded-[10px] text-left transition-colors duration-500 ease-in-out'
        )}
        ref={cardRef}
        style={{
          zIndex: props.id,
          backgroundColor: !alwaysHovered ? '#ffffff' : props.bg,
          color: alwaysHovered ? '#ffffff' : ''
        }}>
        <div
          ref={iconWrapperRef}
          className={`flex items-center justify-center p-[10px] rounded-2xl w-[68px] h-[68px] transition-colors duration-500 ease-in-out ${props.bg}`}
          style={{
            backgroundColor: alwaysHovered ? 'white' : props.bg,
            color: alwaysHovered ? props.bg : 'white'
          }}>
          {React.isValidElement(props.icon) &&
            React.cloneElement(props.icon, {
              ref: iconRef,
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
            ref={subtextRef}
            variant={isDesktop ? 'body3' : 'caption'}
            weight="regular"
            className={cn(
              'leading-[24px] transition-colors duration-500 ease-in-out',
              alwaysHovered ? 'text-white' : 'text-description'
            )}>
            {props.subtitle}
          </Typography>
        </div>
      </div>
    )
  }

  return props.isSelected || isDesktop ? (
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
      <CardLayout />
    </div>
  ) : (
    <CardLayout top />
  )
})

Card.displayName = 'Card'
