'use client'

import { useState } from 'react'
import { X } from 'lucide-react'
import { Button } from '../primitives/button'
import { CaretDown, TreeLines } from '../icons'
import ToggleLanguage from '../ToggleLanguage'
import { usePathname, useRouter } from 'next/navigation'
import { useLocale } from 'next-intl'
import { useTranslations } from 'use-intl'
import { Typography } from '../ui'

export const MobileMenu = () => {
  const [isOpen, setIsOpen] = useState(false)
  const pathname = usePathname()
  const router = useRouter()
  const locale = useLocale()
  const t = useTranslations('Header')
  const [opened, setOpened] = useState(false)

  return (
    <>
      <button onClick={() => setIsOpen(true)} className="p-2">
        <TreeLines />
      </button>

      {isOpen && (
        <div className="fixed inset-0 z-50 bg-white px-6 py-6 flex flex-col justify-between md:h-[300px]">
          <div className="flex flex-col gap-8 items-center">
            <div className="flex justify-between items-center w-full">
              <img src="/assets/logos/mobileLogo.png" alt="Logo" className="h-[14px] w-[126px]" />
              <button onClick={() => setIsOpen(false)}>
                <X className="w-6 h-6" />
              </button>
            </div>
            <div
              className="gap-[10px] flex items-center cursor-pointer select-none "
              onClick={() => setOpened((v) => !v)}>
              <Typography weight="medium" variant="caption">
                {t('services')}
              </Typography>
              <div className={`transition-transform duration-300 ${opened ? 'rotate-180' : ''}`}>
                <CaretDown />
              </div>
              {opened && (
                <div
                  className="absolute py-1 left-0 right-0 top-[50px] z-10 mt-2 min-w-[180px] rounded-2xl bg-white shadow-lg border border-neutral-200
                     flex flex-col animate-fadeIn">
                  <button className="text-left px-6 py-3 hover:bg-neutral-100 transition-colors rounded-2xl mx-[6px]">
                    {t('academy')}
                  </button>
                  <button className="text-left px-6 py-3 hover:bg-neutral-100 transition-colors rounded-2xl mx-[6px]">
                    {t('smarter')}
                  </button>
                </div>
              )}
            </div>
            <ToggleLanguage
              value={locale !== 'en'}
              onToggle={(isEn) => {
                const newLocale = !isEn ? 'en' : 'ar'
                const newPath = `/${newLocale}${pathname.slice(locale.length + 1)}`
                router.replace(newPath)
              }}
            />
          </div>
          <Button variant="purple" className="mb-[env(safe-area-inset-bottom)]">
            {t('button')}
          </Button>
        </div>
      )}
    </>
  )
}
