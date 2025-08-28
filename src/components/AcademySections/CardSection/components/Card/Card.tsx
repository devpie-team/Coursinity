import { Typography } from '@/components/ui'
import { useTranslations } from 'next-intl'

type TCardProps = {
  id: number
}
export const Card = ({ id }: TCardProps) => {
  const t = useTranslations('AC_CardSection')

  return (
    <div className="w-[400px] h-[436px] rounded-2xl bg-slate-400 border-red-50 text-left flex flex-col gap-16 p-6">
      <div className="w-10 h-10 bg-fuchsia-400"></div>
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
          <Typography variant="subtitle" className="text-white">
            {t(`cards.${id}.item_1`)}
          </Typography>
          <Typography variant="subtitle" className="text-white">
            {t(`cards.${id}.item_2`)}
          </Typography>
          <Typography variant="subtitle" className="text-white">
            {t(`cards.${id}.item_3`)}
          </Typography>
        </div>
      </div>
    </div>
  )
}
