'use client'

import CustomSelect from '@/components/CustomSelect/CustomSelect'
import { Button } from '@/components/primitives/button'
import { Checkbox } from '@/components/primitives/checkbox'
import { Input } from '@/components/primitives/input'
import { Typography } from '@/components/ui'
import { SuccessModal } from '@/components/SuccessModal'
import { cn } from '@/lib/utils'
import { useTranslations, useLocale } from 'next-intl'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { useState } from 'react'

// Схема валідації
const contactFormSchema = z.object({
  firstName: z.string().min(1, 'First name is required'),
  lastName: z.string().min(1, 'Last name is required'),
  businessEmail: z.string().email('Invalid email address'),
  phoneNumber: z.string().min(1, 'Phone number is required'),
  companyName: z.string().min(1, 'Company name is required'),
  jobTitle: z.string().min(1, 'Job title is required'),
  numberOfEmployees: z.string().min(1, 'Please select number of employees'),
  areasOfInterest: z.string().min(1, 'Please select areas of interest'),
  additionalInfo: z.string().optional(),
  agreement: z.boolean().refine((val) => val === true, 'You must agree to the terms')
})

type ContactFormData = z.infer<typeof contactFormSchema>

type ContactFormProps = {
  className?: string
  onSuccess?: () => void
}

export const ContactForm = ({ className, onSuccess }: ContactFormProps) => {
  const t = useTranslations('ContactForm')
  const locale = useLocale()
  const isArabic = locale === 'ar'

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    watch,
    setValue,
    reset
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      firstName: '',
      lastName: '',
      businessEmail: '',
      phoneNumber: '',
      companyName: '',
      jobTitle: '',
      numberOfEmployees: '',
      areasOfInterest: '',
      additionalInfo: '',
      agreement: false
    }
  })

  const onSubmit = async (data: ContactFormData) => {
    try {
      const res = await fetch('/api/hubspot', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      })

      if (res.ok) {
        // Очистити форму
        reset()
        // Викликати callback успіху
        onSuccess?.()
      }
    } catch (error) {
      console.error('Error submitting form:', error)
    }
  }

  return (
    <div className={cn('', className, isArabic ? 'font-kanun-ar' : 'font-poppins')}>
      <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-2 gap-4 max-md:grid-cols-1">
        <div className="min-w-0">
          <Input
            label={t('first_name')}
            placeholder={t('first_name_placeholder')}
            className="w-full"
            {...register('firstName')}
          />
          {errors.firstName && (
            <Typography variant="caption" className="text-red-500 mt-1">
              {errors.firstName.message}
            </Typography>
          )}
        </div>

        <div className="min-w-0">
          <Input
            label={t('last_name')}
            placeholder={t('last_name_placeholder')}
            className="w-full"
            {...register('lastName')}
          />
          {errors.lastName && (
            <Typography variant="caption" className="text-red-500 mt-1">
              {errors.lastName.message}
            </Typography>
          )}
        </div>

        <div className="min-w-0">
          <Input
            label={t('business_email')}
            placeholder={t('business_email_placeholder')}
            className="w-full"
            type="email"
            {...register('businessEmail')}
          />
          {errors.businessEmail && (
            <Typography variant="caption" className="text-red-500 mt-1">
              {errors.businessEmail.message}
            </Typography>
          )}
        </div>

        <div className="min-w-0 ">
          <Input
            label={t('phone_number')}
            placeholder={t('phone_number_placeholder')}
            className="w-full "
            type="tel"
            inputMode="tel"
            pattern="^\+\d{7,15}$"
            {...register('phoneNumber', {
              required: 'Phone number is required!',
              pattern: {
                value: /^\+\d{7,15}$/,
                message: 'Wrong number'
              }
            })}
            onInput={(e) => {
              const input = e.target as HTMLInputElement
              const cleaned = input.value.replace(/[^\d+]/g, '')
              setValue('phoneNumber', cleaned, { shouldValidate: true })
            }}
          />
          {errors.phoneNumber && (
            <Typography variant="caption" className="text-red-500 mt-1">
              {errors.phoneNumber.message}
            </Typography>
          )}
        </div>

        <div className="min-w-0">
          <Input
            label={t('company_name')}
            placeholder={t('company_name_placeholder')}
            className="w-full"
            {...register('companyName')}
          />
          {errors.companyName && (
            <Typography variant="caption" className="text-red-500 mt-1">
              {errors.companyName.message}
            </Typography>
          )}
        </div>

        <div className="min-w-0">
          <Input
            label={t('job_title')}
            placeholder={t('job_title_placeholder')}
            className="w-full"
            {...register('jobTitle')}
          />
          {errors.jobTitle && (
            <Typography variant="caption" className="text-red-500 mt-1">
              {errors.jobTitle.message}
            </Typography>
          )}
        </div>

        <div className="min-w-0">
          <CustomSelect
            options={t.raw('number_of_employees_options')}
            label={t('number_of_employees')}
            placeholder={t('number_of_employees_placeholder')}
            className="w-full"
            value={watch('numberOfEmployees')}
            onChange={(value: string) => setValue('numberOfEmployees', value)}
          />
          {errors.numberOfEmployees && (
            <Typography variant="caption" className="text-red-500 mt-1">
              {errors.numberOfEmployees.message}
            </Typography>
          )}
        </div>

        <div className="min-w-0">
          <CustomSelect
            options={t.raw('areas_of_interest_options')}
            label={t('areas_of_interest')}
            placeholder={t('areas_of_interest_placeholder')}
            className="w-full"
            value={watch('areasOfInterest')}
            onChange={(value: string) => setValue('areasOfInterest', value)}
          />
          {errors.areasOfInterest && (
            <Typography variant="caption" className="text-red-500 mt-1">
              {errors.areasOfInterest.message}
            </Typography>
          )}
        </div>

        <div className="col-span-2 max-md:col-span-1 flex flex-col gap-[6px] min-w-0">
          <Typography className="text-sm" weight="medium">
            {t('additional_info')}
          </Typography>
          <textarea
            className="p-5 text-md font-normal h-[120px] border border-secondary-400 rounded-2xl transition-all duration-300 active:border-description hover:border-description outline-none focus:border-description resize-none"
            placeholder={t('additional_info_placeholder')}
            {...register('additionalInfo')}
          />
        </div>

        <div className="col-span-2 max-md:col-span-1 flex flex-col gap-3 mt-1 min-w-0">
          <div className="flex items-center gap-3">
            <Checkbox
              checked={watch('agreement')}
              onCheckedChange={(checked) => setValue('agreement', checked as boolean)}
            />
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
          {errors.agreement && (
            <Typography variant="caption" className="text-red-500">
              {errors.agreement.message}
            </Typography>
          )}

          <Button type="submit" variant="purple" className="w-[190px] mt-1 max-md:w-full" disabled={isSubmitting}>
            {isSubmitting ? 'Submitting...' : t('submit')}
          </Button>
        </div>
      </form>
    </div>
  )
}
