'use client'

import { Input } from '@/components/primitives/input'
import Cookies from 'js-cookie'
import { useState, useEffect } from 'react'
import { useDebounce } from './useDebouce'
import { useRouter } from 'next/navigation'
import { Typography } from '@/components/ui'
import { useTranslations } from 'next-intl'

export function SearchInput({ onSearch }: { onSearch?: (v: string) => void }) {
  const [value, setValue] = useState('')
  const router = useRouter()
  const t = useTranslations('BL_BlogPage')

  const debounced = useDebounce(value, 600)

  useEffect(() => {
    Cookies.set('search', debounced)
    router.refresh()
    onSearch?.(debounced)
  }, [debounced, onSearch])

  return (
    <div className="flex flex-col gap-1 w-full">
      <div className="cursor-pointer" onClick={() => setValue('')}>
        <Typography variant="subtitle">{t('label')}</Typography>
      </div>
      <Input
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
