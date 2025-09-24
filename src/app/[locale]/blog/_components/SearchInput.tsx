'use client'

import { Input } from '@/components/primitives/input'
import Cookies from 'js-cookie'
import { useState, useEffect } from 'react'
import { useDebounce } from './useDebouce'
import { useRouter } from 'next/navigation'
import { Typography } from '@/components/ui'
import { useLocale, useTranslations } from 'next-intl'
import { cn } from '@/lib/utils'

export function SearchInput({ onSearch }: { onSearch?: (v: string) => void }) {
  const [value, setValue] = useState('')
  const locale = useLocale()
  const router = useRouter()
  const t = useTranslations('BL_BlogPage')

  const debounced = useDebounce(value, 600)

  useEffect(() => {
    Cookies.set('search', debounced)
    router.refresh()
    onSearch?.(debounced)
  }, [debounced, onSearch])

  return (
    <div className={cn('flex flex-col gap-1 w-full', locale == 'ar' && 'gap-2')}>
      <div className="cursor-pointer" onClick={() => setValue('')}>
        <Typography variant="subtitle">{t('label')}</Typography>
      </div>
      <Input
        isArabic={locale === 'ar'}
        search
        required={false}
        placeholder="Search..."
        value={value}
        onChange={(e) => setValue(e.target.value)}
        className="rounded-full h-[48px] w-[300px] max-lg:w-[343px] max-md:w-full"
      />
    </div>
  )
}
