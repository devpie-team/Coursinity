'use client'

import { useState } from 'react'
import { X } from 'lucide-react'
import { Button } from '../primitives/button'
import { TreeLines } from '../icons'
import ToggleLanguage from '../ToggleLanguage'
import { usePathname, useRouter } from 'next/navigation'
import { useLocale } from 'next-intl'
import { useTranslations } from 'use-intl'

export const MobileMenu = () => {
  const [isOpen, setIsOpen] = useState(false)
  const pathname = usePathname()
  const router = useRouter()
  const locale = useLocale()
  const t = useTranslations('Header')

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
            <ToggleLanguage
              value={locale !== 'en'}
              onToggle={(isEn) => {
                const newLocale = !isEn ? 'en' : 'ar'
                const newPath = `/${newLocale}${pathname.slice(locale.length + 1)}`
                router.replace(newPath)
              }}
            />
          </div>
          <Button variant="purple">{t('button')}</Button>
        </div>
      )}
    </>
  )
}
