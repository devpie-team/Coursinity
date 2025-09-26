'use client'
import Cookies from 'js-cookie'
import { useState, useEffect } from 'react'
import { useDebounce } from './useDebouce'
import { useRouter } from 'next/navigation'
import { useLocale, useTranslations } from 'next-intl'
import { Input } from '@/components/primitives/input'
import { Typography } from '@/components/ui'
import { cn } from '@/lib/utils'
import { motion, AnimatePresence } from 'framer-motion'

export function SearchInput({
  onSearch,
  onSearchStart
}: {
  onSearch?: (v: string) => void
  onSearchStart?: () => void
}) {
  const [value, setValue] = useState('')
  const locale = useLocale()
  const router = useRouter()
  const t = useTranslations('BL_BlogPage')
  const debounced = useDebounce(value, 600)

  useEffect(() => {
    onSearchStart?.()
    Cookies.set('search', debounced || '')
    router.refresh()
    onSearch?.(debounced)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debounced])

  return (
    <div className={cn('flex flex-col gap-1 w-full', locale == 'ar' && 'gap-2')}>
      <div className="relative w-fit">
        <Input
          isArabic={locale === 'ar'}
          search
          required={false}
          placeholder={t('search')}
          value={value}
          onChange={(e) => setValue(e.target.value)}
          className="rounded-full h-[48px] w-[300px] max-lg:w-[343px] max-md:w-full pr-16"
        />

        {/* Clear all */}
        <AnimatePresence>
          {value && (
            <motion.div
              key="clear-label"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 8 }}
              transition={{ duration: 0.25 }}
              className={cn('absolute left-0 -top-6 cursor-pointer', locale === 'ar' && 'right-0 -top-6')}
              onClick={() => setValue('')}>
              <Typography variant="subtitle">
                {t('label')} {/* тут у тебе “Clear all” */}
              </Typography>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}
