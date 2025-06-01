import { Typography } from '@/components/ui'
import { DoubleQuotesIcon } from '@/components/icons/DoubleQuotesIcon'
import { useEffect, useState } from 'react'

type Testimonial = {
  company: string
  feedback: string
  userImg: string
  userName: string
  userPosition: string
}
type Position = 'left' | 'center' | 'right'

export const TestimonialCard = ({ data, position }: { data: Testimonial; position: Position }) => {
  const [isMobile, setIsMobile] = useState<boolean>(false)
  const [isTablet, setIsTablet] = useState<boolean>(false)
  const [isDesktop, setIsDesktop] = useState<boolean>(true)

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

  let positionClass = ''
  if (position === 'left')
    positionClass =
      'absolute scale-[70%]  opacity-40 translate-y-[160px] -translate-x-[350px]  z-0 transition-all duration-700 pointer-events-none max-[1600px]:scale-[55%]  max-lg:translate-y-0  max-lg:scale-100 max-lg:opacity-80 max-lg:-translate-x-[120%]'
  if (position === 'center')
    positionClass = 'absolute   scale-100 opacity-100 z-10 transition-all duration-700 pointer-events-auto '
  if (position === 'right')
    positionClass =
      'absolute scale-[70%] opacity-40 -translate-y-[160px] translate-x-[425px] z-0 transition-all duration-700 pointer-events-none max-[1600px]:scale-[55%]   max-lg:-translate-y-0  max-lg:scale-100 max-lg:opacity-80 max-lg:translate-x-[120%]'

  return (
    <div
      className={`w-[880px] h-[440px] p-4 bg-secondary-300 rounded-[20px] flex gap-12 max-lg:w-[710px] max-lg:h-[290px] ${positionClass}`}>
      <div className="flex flex-col justify-between p-4">
        <Typography variant={isDesktop ? 'h6' : 'body3'} weight="medium">
          Business Types
        </Typography>
        <div className="flex flex-col gap-3 items-start">
          <div className="bg-secondary-100 rounded-[8px] p-[10px]">
            <Typography variant={isDesktop ? 'body2' : 'body3'} weight="medium" className="text-primary-purple">
              Corporation
            </Typography>
          </div>
          <div className="flex gap-3">
            <div className="bg-secondary-100 rounded-[8px] p-[10px]">
              <Typography variant={isDesktop ? 'body2' : 'body3'} weight="medium" className="text-primary-purple">
                LLC
              </Typography>
            </div>
            <div className="bg-secondary-100 rounded-[8px] p-[10px]">
              <Typography variant={isDesktop ? 'body2' : 'body3'} weight="medium" className="text-primary-purple">
                Other
              </Typography>
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-col bg-white p-5 gap-[10px] max-w-[560px]">
        <div>
          <DoubleQuotesIcon />
        </div>
        <div className="flex flex-col gap-8">
          <div className="flex flex-col gap-2">
            <Typography variant={isDesktop ? 'h6' : 'body2'} weight="medium">
              {data.company}
            </Typography>
            <Typography variant={isDesktop ? 'h6' : 'caption'} weight="regular" className="text-description">
              {data.feedback}
            </Typography>
          </div>
          <div className="flex gap-[20px] p-[10px] rounded-[5px]">
            <img src={data.userImg} alt={data.userName} className="object-cover" />
            <div className="flex flex-col gap-1">
              <Typography variant={isDesktop ? 'body1' : 'body3'} weight="medium">
                {data.userName}
              </Typography>
              <Typography variant={isDesktop ? 'body3' : 'caption'} weight="regular" className="text-description">
                {data.userPosition}
              </Typography>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
