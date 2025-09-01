import { Typography } from '@/components/ui'
import { useTranslations } from 'next-intl'
import { ReactNode } from 'react'

type TCardProps = {
  id: number
  bigIcon: ReactNode
  smallIcon1: ReactNode
  smallIcon2: ReactNode
  smallIcon3: ReactNode
}
export const Card = ({ id, bigIcon, smallIcon1, smallIcon2, smallIcon3 }: TCardProps) => {
  const t = useTranslations('AC_CardSection')

  return (
    <div className="w-[400px] max-md:w-[300px] h-[436px] rounded-2xl border border-[#FFFFFF29] text-left flex flex-col gap-16 p-6 bg-[linear-gradient(180deg,rgba(255,255,255,0.06)_0%,rgba(30,141,194,0.06)_100%)]">
      {bigIcon}
      <div className="flex flex-col gap-8">
        <div className="flex flex-col gap-4 ">
          <Typography variant="h6" className="text-white">
            {t(`cards.${id}.title`)}
          </Typography>
          <Typography variant="body3" className="text-description">
            {t(`cards.${id}.subtitle`)}
          </Typography>
        </div>
        <div className="flex flex-col gap-4 ">
          <div className="flex items-center gap-3">
            {smallIcon1}
            <Typography variant="subtitle" className="text-white">
              {t(`cards.${id}.item_1`)}
            </Typography>
          </div>
          <div className="flex items-center gap-3">
            {smallIcon2}
            <Typography variant="subtitle" className="text-white">
              {t(`cards.${id}.item_2`)}
            </Typography>
          </div>
          <div className="flex items-center gap-3">
            {smallIcon3}
            <Typography variant="subtitle" className="text-white">
              {t(`cards.${id}.item_3`)}
            </Typography>
          </div>
        </div>
      </div>
    </div>
  )
}
