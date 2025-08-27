import * as React from 'react'
import { Typography } from '@/components/ui'
import { cn } from '@/lib/utils'
import { useLocale } from 'next-intl'

export type CardProps = {
  className?: string
  title: string
  imageSrc: string
  imageAlt?: string
}

export const Card: React.FC<CardProps> = ({ className, title, imageSrc, imageAlt = '' }) => {
  const [isMobile, setIsMobile] = React.useState(false)
  const [isTablet, setIsTablet] = React.useState(false)
  const [isDesktop, setIsDesktop] = React.useState(true)
  const locale = useLocale()
  const isArabic = locale === 'ar'

  React.useEffect(() => {
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
      className={cn(
        'lc-card opacity-0 will-change-transform origin-center', // важливо для коректного повороту
        'absolute',
        'w-[425px] h-[425px] rounded-3xl max-lg:w-[360px] max-lg:h-[360px] max-md:w-[260px] max-md:h-[260px]',
        'bg-gradient-to-b from-white/5 to-cyan-600/5',
        'border border-white/20 backdrop-blur-lg',
        'shadow-[0px_12px_30px_0px_rgba(0,0,0,0.05)]',
        className
      )}>
      {/* абсолютний контейнер, щоб inset-0 та bottom-0 на зображенні працювали коректно */}
      <div className="absolute inset-0 p-10 max-lg:p-6 flex flex-col  items-center text-center">
        <Typography variant={isDesktop ? 'h5' : 'body2'} weight="medium" className="text-white">
          {title}
        </Typography>
        <img src={imageSrc} alt={imageAlt} className="absolute bottom-0 max-md:max-h-[260px]" />
      </div>
    </div>
  )
}
