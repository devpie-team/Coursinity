import { Typography } from '@/components/ui'
import { useTranslations } from 'next-intl'

export const CompanyCard = () => {
  const t = useTranslations('CompanyCard')

  return (
    <div className="bg-white rounded-[6px] p-3 sm:p-4 w-full max-w-[280px] sm:max-w-[360px] mx-auto">
      <div className="relative flex flex-col gap-2 sm:gap-3">
        <div className="flex flex-col gap-1 sm:gap-[6px] text-center">
          <Typography variant="caption" weight="medium" className="sm:text-sm">
            {t('company')}
          </Typography>
          <Typography
            variant="caption"
            weight="regular"
            className="text-description text-xs sm:text-sm leading-relaxed">
            {t('review')}
          </Typography>
          {/* ...gradient/decoration divs... */}
        </div>
        <div className="flex gap-2 sm:gap-3 items-center justify-center">
          <img
            src="/assets/contact_form/contact_form_1.png"
            alt="contact_form_1"
            className="object-cover aspect-square rounded-[10px] h-[35px] w-[35px] sm:h-[40px] sm:w-[40px]"
          />
          <div className="flex flex-col gap-0 sm:gap-1">
            <Typography variant="caption" weight="medium" className="text-xs sm:text-sm">
              {t('author')}
            </Typography>
            <Typography variant="caption" weight="regular" className="text-description text-xs">
              {t('author_position')}
            </Typography>
          </div>
        </div>
      </div>
    </div>
  )
}
