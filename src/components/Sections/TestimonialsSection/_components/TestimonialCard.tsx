import { Typography } from '@/components/ui'
import { DoubleQuotesIcon } from '@/components/icons/DoubleQuotesIcon'
import { useTranslations } from 'next-intl'

type Testimonial = {
  company: string
  feedback: string
  userImg: string
  userName: string
  userPosition: string
}
type Position = 'left' | 'center' | 'right'

type TestimonialCardProps = {
  data: Testimonial
  position: Position
  isDesktop: boolean
}

export const TestimonialCard = ({ data, position, isDesktop }: TestimonialCardProps) => {
  const t = useTranslations('TestimonialsSection')
  let positionClass = ''
  if (position === 'left')
    positionClass =
      'absolute scale-[70%] opacity-40 translate-y-[160px] -translate-x-[350px] z-0 transition-all duration-700 pointer-events-none max-[1600px]:scale-[55%] max-lg:translate-y-0 max-lg:scale-100 max-lg:opacity-80 max-lg:-translate-x-[150%]'
  if (position === 'center')
    positionClass = 'absolute scale-100 opacity-100 z-10 transition-all duration-700 pointer-events-auto '
  if (position === 'right')
    positionClass =
      'absolute scale-[70%] opacity-40 -translate-y-[160px] translate-x-[425px] z-0 transition-all duration-700 pointer-events-none max-[1600px]:scale-[55%] max-lg:-translate-y-0 max-lg:scale-100 max-lg:opacity-80 max-lg:translate-x-[150%]'

  const businessTypes: string[] = t.raw('businessTypes')

  return (
    <div
      className={`w-[880px] h-[440px] p-4 bg-secondary-300 rounded-[20px] flex gap-12 max-lg:w-[710px] max-lg:h-[290px] max-md:flex-col max-md:w-[343px] max-md:h-[480px] max-md:gap-[18px] max-md:p-[10px] justify-between ${positionClass}`}>
      <div className="flex flex-col justify-between p-4 order-1 max-md:order-2 max-md:p-0 max-md:gap-4">
        <Typography variant={isDesktop ? 'h6' : 'body3'} weight="medium" className="max-md:px-2">
          {t('businessTypesTitle')}
        </Typography>
        <div className="flex flex-col gap-3 items-start max-md:flex-row">
          <div className="bg-secondary-100 rounded-[8px] p-[10px]">
            <Typography variant={isDesktop ? 'body2' : 'body3'} weight="medium" className="text-primary-purple">
              {businessTypes[0]}
            </Typography>
          </div>
          <div className="flex gap-3">
            <div className="bg-secondary-100 rounded-[8px] p-[10px]">
              <Typography variant={isDesktop ? 'body2' : 'body3'} weight="medium" className="text-primary-purple">
                {businessTypes[1]}
              </Typography>
            </div>
            <div className="bg-secondary-100 rounded-[8px] p-[10px]">
              <Typography variant={isDesktop ? 'body2' : 'body3'} weight="medium" className="text-primary-purple">
                {businessTypes[2]}
              </Typography>
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-col bg-white p-5 gap-[10px] rounded-2xl max-w-[560px] order-2 max-md:order-1 max-md:p-4">
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
          <div className="flex gap-[20px] p-[10px] rounded-[5px] bg-secondary-300 max-md:gap-3 items-center">
            <img
              src={data.userImg}
              alt={data.userName}
              className="object-cover h-[60px] w-[60px] aspect-square rounded-[10px] max-lg:h-[40px] max-lg:w-[40px]"
            />
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
