import { Typography } from '@/components/ui'
import { cn } from '@/lib/utils'
import { ReactNode, forwardRef, useEffect, useState } from 'react'

type TRotateCardProps = {
  rotation: string
  icon: ReactNode
  title: string
  subtitle: string
  id: number
  innerRef: (el: HTMLDivElement) => void
  className?: string
}

export const RotatedCard = forwardRef<HTMLDivElement, TRotateCardProps>((props, ref) => {
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
      ref={props.innerRef}
      className={cn(
        `page text-white flex flex-col min-w-[400px] h-[400px] items-start gap-16 p-6 pb-8  relative rounded-[20px] overflow-hidden border border-solid border-[#ffffff66] [background:linear-gradient(180deg,rgba(255,255,255,0.06)_0%,rgba(30,141,194,0.06)_100%)] max-lg:min-w-[280px] max-lg:max-h-[330px] max-lg:max-w-[280px] max-lg:gap-12 max-lg:px-5 max-lg:pb-8`,
        props.className
      )}
      style={{ zIndex: props.id, marginLeft: props.id === 0 ? '10px' : '0px' }}>
      <div> {props.icon}</div>

      <div className="flex flex-col items-start gap-8 relative self-stretch w-full flex-[0_0_auto] max-lg:gap-4">
        <Typography variant={isDesktop ? 'h6' : 'body1'} weight="regular">
          {props.title}
        </Typography>
        <Typography
          variant={isDesktop ? 'body3' : 'caption'}
          weight="regular"
          className="text-white text-opacity-65 leading-[20px]">
          {props.subtitle}
        </Typography>
      </div>
    </div>
  )
})

RotatedCard.displayName = 'RotatedCard'
