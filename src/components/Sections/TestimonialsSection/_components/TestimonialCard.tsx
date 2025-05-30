import { Typography } from '@/components/ui'
import { DoubleQuotesIcon } from '@/components/icons/DoubleQuotesIcon'

type Testimonial = {
  company: string
  feedback: string
  userImg: string
  userName: string
  userPosition: string
}
type Position = 'left' | 'center' | 'right'

export const TestimonialCard = ({ data, position }: { data: Testimonial; position: Position }) => {
  // Tailwind класів для плавного позиціонування
  let positionClass = ''
  if (position === 'left')
    positionClass =
      'absolute scale-[55%] opacity-40 top-[170px] left-[-100px] z-0 transition-all duration-700 pointer-event-none'
  if (position === 'center')
    positionClass =
      'absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 scale-100 opacity-100 z-10 transition-all duration-700'
  if (position === 'right')
    positionClass =
      'absolute scale-[55%] opacity-40 top-[-160px] right-[-200px] z-0 transition-all duration-700 pointer-event-none'

  return (
    <div className={`w-[880px] h-[440px] p-4 bg-secondary-300 rounded-[20px] flex gap-12 ${positionClass}`}>
      <div className="flex flex-col justify-between p-4 ">
        <Typography variant="h6" weight="medium">
          Business Types
        </Typography>
        <div className="flex flex-col gap-3 items-start">
          <div className="bg-secondary-100 rounded-[8px] p-[10px]">
            <Typography variant="body2" weight="medium" className="text-primary-purple">
              Corporation
            </Typography>
          </div>
          <div className="flex gap-3">
            <div className="bg-secondary-100 rounded-[8px] p-[10px]">
              <Typography variant="body2" weight="medium" className="text-primary-purple">
                LLC
              </Typography>
            </div>
            <div className="bg-secondary-100 rounded-[8px] p-[10px]">
              <Typography variant="body2" weight="medium" className="text-primary-purple">
                Other
              </Typography>
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-col bg-white p-5 gap-[10px] max-w-[560px]">
        <DoubleQuotesIcon />
        <div className="flex flex-col gap-8">
          <div className="flex flex-col gap-2">
            <Typography variant="h6" weight="medium">
              {data.company}
            </Typography>
            <Typography variant="h6" weight="regular" className="text-description">
              {data.feedback}
            </Typography>
          </div>
          <div className="flex gap-[20px] p-[10px] rounded-[5px]">
            <img src={data.userImg} alt={data.userName} className="object-cover" />
            <div className="flex flex-col gap-1">
              <Typography variant="body1" weight="medium">
                {data.userName}
              </Typography>
              <Typography variant="body3" weight="regular" className="text-description">
                {data.userPosition}
              </Typography>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
