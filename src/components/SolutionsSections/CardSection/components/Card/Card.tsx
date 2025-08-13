import { Typography } from '@/components/ui'
import { cn } from '@/lib/utils'
import React, { ReactElement, forwardRef, useEffect, useRef, useState } from 'react'

import './Card.styles.css'
import gsap from 'gsap'
import { useInView } from '@/components/SolutionsSections/ConsultingSection/useInView'

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
  const [isDesktop, setIsDesktop] = useState(true)

  useEffect(() => {
    const checkScreenSize = () => setIsDesktop(window.innerWidth > 1024)
    checkScreenSize()
    window.addEventListener('resize', checkScreenSize)
    return () => window.removeEventListener('resize', checkScreenSize)
  }, [])

  const cardRef = useRef<HTMLDivElement>(null)
  const iconRef = useRef<HTMLDivElement>(null)
  const iconWrapperRef = useRef<HTMLDivElement>(null)
  const subtextRef = useRef<HTMLDivElement>(null)

  const inView = useInView(cardRef as React.RefObject<HTMLElement>, { threshold: 0.3 })
  const prevInView = useRef<boolean>(false)

  const isActive = props.id === 5 ? inView : false

  useEffect(() => {
    if (!cardRef.current || !iconWrapperRef.current || !subtextRef.current) return

    if (props.id !== 5) {
      gsap.set(cardRef.current, {
        backgroundColor: '#ffffff',
        color: '#000000'
      })
      gsap.set(subtextRef.current, { color: '#6e6e6e' })
      gsap.set(iconWrapperRef.current, {
        backgroundColor: props.bg,
        color: '#ffffff'
      })
      return
    }

    if (prevInView.current === isActive) return
    prevInView.current = isActive

    const bgTo = isActive ? props.bg : '#ffffff'
    const textTo = isActive ? '#ffffff' : '#000000'
    const subTo = isActive ? '#ffffff' : '#6e6e6e'
    const iconBgTo = isActive ? '#ffffff' : props.bg
    const iconColorTo = isActive ? props.bg : '#ffffff'

    const ctx = gsap.context(() => {
      gsap.fromTo(
        cardRef.current,
        {
          backgroundColor: bgTo,
          color: textTo,
          duration: 0.2,
          overwrite: 'auto',
          ease: 'power2.out'
        },
        {
          backgroundColor: bgTo,
          color: textTo,
          duration: 0.2,
          overwrite: 'auto',
          ease: 'power2.out'
        }
      )
      gsap.fromTo(
        subtextRef.current,
        {
          color: subTo,
          duration: 0.2,
          overwrite: 'auto',
          ease: 'power2.out'
        },
        {
          color: subTo,
          duration: 0.2,
          overwrite: 'auto',
          ease: 'power2.out'
        }
      )
      gsap.fromTo(
        iconWrapperRef.current,
        {
          backgroundColor: iconBgTo,
          color: iconColorTo,
          duration: 0.2,
          overwrite: 'auto',
          ease: 'power2.out'
        },
        {
          backgroundColor: iconBgTo,
          color: iconColorTo,
          duration: 0.2,
          overwrite: 'auto',
          ease: 'power2.out'
        }
      )
    }, cardRef)

    return () => ctx.revert()
  }, [isActive, inView, props.id, props.bg])

  const CardLayout = ({ top }: { top?: boolean }) => {
    return (
      <div
        className={cn(
          top && 'mt-5',
          'animation-wrapper group page flex flex-col w-[320px] max-md:w-[280px] h-[320px] max-md:h-[280px] items-start gap-8 p-6 pb-10 relative rounded-[10px] transition-colors duration-500 ease-in-out'
        )}
        ref={cardRef}
        style={{ zIndex: props.id, background: 'white' }}>
        <div
          ref={iconWrapperRef}
          style={{ backgroundColor: props.bg }}
          className={cn(
            'flex items-center justify-center p-[10px] rounded-2xl w-[68px] h-[68px] transition-colors duration-500 ease-in-out text-white',
            props.bg
          )}>
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

          <div ref={subtextRef as unknown as React.Ref<HTMLDivElement>}>
            <Typography
              variant={isDesktop ? 'body3' : 'caption'}
              weight="regular"
              className="leading-[24px] transition-colors duration-500 ease-in-out ">
              {props.subtitle}
            </Typography>
          </div>
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
        className={cn('card-corner card-corner--tl', isActive ? 'card-corner--final-tl' : 'card-corner--init-tl')}>
        <path d="M41 1H21C9.95431 1 1 9.95431 1 21V41" stroke={props.bg} strokeWidth="2" />
      </svg>

      <span />

      <svg
        width="41"
        height="41"
        viewBox="0 0 41 41"
        fill="none"
        className={cn('card-corner card-corner--tr', isActive ? 'card-corner--final-tr' : 'card-corner--init-tr')}>
        <path d="M0 1H20C31.0457 1 40 9.95431 40 21V41" stroke={props.bg} strokeWidth="2" />
      </svg>

      <svg
        width="41"
        height="41"
        viewBox="0 0 41 41"
        fill="none"
        className={cn('card-corner card-corner--bl', isActive ? 'card-corner--final-bl' : 'card-corner--init-bl')}>
        <path d="M41 40H21C9.95431 40 1 31.0457 1 20V0" stroke={props.bg} strokeWidth="2" />
      </svg>

      <svg
        width="41"
        height="41"
        viewBox="0 0 41 41"
        fill="none"
        className={cn('card-corner card-corner--br', isActive ? 'card-corner--final-br' : 'card-corner--init-br')}>
        <path d="M0 40H20C31.0457 40 40 31.0457 40 20V0" stroke={props.bg} strokeWidth="2" />
      </svg>

      <CardLayout />
    </div>
  ) : (
    <CardLayout top />
  )
})

Card.displayName = 'Card'
