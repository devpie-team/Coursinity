import CustomSelect from '@/components/CustomSelect/CustomSelect'
import { Button } from '@/components/primitives/button'
import { Checkbox } from '@/components/primitives/checkbox'
import { Input } from '@/components/primitives/input'
import { Typography } from '@/components/ui'
import { cn } from '@/lib/utils'
import { useTranslations } from 'next-intl'

type ContactFormProps = {
  className?: string
}

export const ContactForm = ({ className }: ContactFormProps) => {
  const t = useTranslations('ContactForm')

  return (
    <div className={cn('', className)}>
      <form className="grid grid-cols-2 gap-4 max-md:grid-cols-1">
        <Input label={t('first_name')} placeholder={t('first_name_placeholder')} className="w-full" />
        <Input label={t('last_name')} placeholder={t('last_name_placeholder')} className="w-full" />
        <Input label={t('business_email')} placeholder={t('business_email_placeholder')} className="w-full" />
        <Input
          label={t('phone_number')}
          placeholder={t('phone_number_placeholder')}
          className="w-full"
          type="tel"
          inputMode="tel"
          pattern="^\+?[0-9]*$"
        />
        <Input label={t('company_name')} placeholder={t('company_name_placeholder')} className="w-full" />
        <Input label={t('job_title')} placeholder={t('job_title_placeholder')} className="w-full" />

        <CustomSelect
          options={t.raw('number_of_employees_options')}
          label={t('number_of_employees')}
          placeholder={t('number_of_employees_placeholder')}
          className="w-full"
        />
        <CustomSelect
          options={t.raw('areas_of_interest_options')}
          label={t('areas_of_interest')}
          placeholder={t('areas_of_interest_placeholder')}
          className="w-full"
        />

        <div className="col-span-2 max-md:col-span-1 flex flex-col gap-[6px]">
          <Typography className="text-sm" weight="medium">
            {t('additional_info')}
          </Typography>
          <textarea
            className="p-5 text-md font-normal h-[120px] border border-secondary-400 rounded-2xl active:border-description hover:border-description outline-none focus:border-description resize-none"
            placeholder={t('additional_info_placeholder')}
          />
        </div>

        <div className="col-span-2 max-md:col-span-1 flex flex-col gap-3 mt-1">
          <div className="flex items-center gap-3">
            <Checkbox />
            <Typography variant="caption">
              {t('agreement_1')}
              <a href="/terms" className="underline">
                {t('agreement_terms')}
              </a>
              {t('agreement_and')}
              <a href="/privacy" className="underline">
                {t('agreement_privacy')}
              </a>
            </Typography>
          </div>
          <Button variant="purple" className="w-[190px] mt-1">
            {t('submit')}
          </Button>
        </div>
      </form>
    </div>
  )
}
