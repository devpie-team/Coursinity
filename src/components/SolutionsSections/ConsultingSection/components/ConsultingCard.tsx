import { Typography } from '@/components/ui'
import Lottie, { LottieRefCurrentProps } from 'lottie-react'

type LottieCardProps = {
  index: number
  lottieData: object
  title: string
  description: string
  layout: string
  refEl: React.RefObject<HTMLDivElement | null>
  lottieRef: React.RefObject<LottieRefCurrentProps | null>
  isMobile: boolean
  lottieClassName?: string
}

export const ConsultingCard = ({
  index,
  lottieData,
  title,
  description,
  layout,
  refEl,
  lottieRef,
  isMobile,
  lottieClassName
}: LottieCardProps) => {
  const sharedClasses = {
    text: 'leading-7',
    desc: 'opacity-65 leading-7'
  }

  const isWide = layout === 'wide'

  return (
    <div
      ref={refEl}
      style={{
        background: `linear-gradient(to bottom, rgba(${
          ['217,45,32', '118,98,235', '30,141,194', '118,98,235'][index]
        }, 0.16), rgba(255,255,255,0.16))`,
        justifyContent: index === 3 && !isMobile ? 'start' : undefined
      }}
      className={`flex ${
        index == 3
          ? ' flex-col-reverse items-center max-md:justify-between md:justify-[start] gap-[66px] max-lg:pt-0 max-md:pt-6 '
          : index == 0
          ? 'max-[1200px]:flex-col items-center '
          : 'justify-between '
      } ${isWide ? 'flex-row px-10 py-10 max-md:px-5 max-md:py-8 w-[753px] ' : 'flex-col pb-10 w-[367px] '}
      overflow-hidden max-lg:w-full h-[500px] max-md:h-fit border border-black/8 rounded-[20px] bg-[linear-gradient(to_bottom,rgba(${[
        ['217,45,32', '118,98,235', '30,141,194', '118,98,235'][index],
        '0.16'
      ].join(',')}),rgba(255,255,255,0.16))] gap-5`}>
      {isWide && (
        <div className="flex flex-col gap-1">
          <Typography variant={isMobile ? 'body2' : 'body1'} className={sharedClasses.text}>
            {title}
          </Typography>
          <Typography variant={isMobile ? 'body2' : 'body1'} className={sharedClasses.desc}>
            {description}
          </Typography>
        </div>
      )}
      <Lottie animationData={lottieData} lottieRef={lottieRef} loop={false} className={lottieClassName} />
      {!isWide && (
        <div className="flex mx-10 max-md:mx-5 flex-col gap-1 ">
          <Typography variant={isMobile ? 'body2' : 'body1'} className={sharedClasses.text}>
            {title}
          </Typography>
          <Typography variant={isMobile ? 'body2' : 'body1'} className={sharedClasses.desc}>
            {description}
          </Typography>
        </div>
      )}
    </div>
  )
}
