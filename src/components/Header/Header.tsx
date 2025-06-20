'use client'

import { useEffect, useRef, useState } from 'react'
import { useLocale, useTranslations } from 'next-intl'
import { usePathname, useRouter } from 'next/navigation'
import ToggleLanguage from '../ToggleLanguage'
import { useHeaderVisibility } from './HeaderVisibilityContext'
import { Button } from '../primitives/button'
import { X } from 'lucide-react'
import { CaretDown, LogoIcon, TreeLines } from '../icons'
import { HeaderDropdown } from '../HeaderDropdown'
import { Typography } from '../ui'

export const Header = () => {
  const t = useTranslations('Header')
  const headerRef = useRef<HTMLDivElement>(null)

  const [isOpen, setIsOpen] = useState(false)
  const [opened, setOpened] = useState(false)
  const [start, setStart] = useState(true)
  const [isScrolledDown, setIsScrolledDown] = useState(false)
  const [isDesktop, setIsDesktop] = useState(true)

  const lastScrollRef = useRef(0)

  const locale = useLocale()
  const pathname = usePathname()
  const router = useRouter()
  const { isVisible } = useHeaderVisibility()

  useEffect(() => {
    const handleScroll = () => {
      const currentScroll = window.scrollY

      setStart(currentScroll <= 10)

      if ((currentScroll > lastScrollRef.current && currentScroll > 50 && !isOpen) || (!isVisible && !isOpen)) {
        setIsScrolledDown(true)
      } else {
        setIsScrolledDown(false)
      }

      lastScrollRef.current = currentScroll
    }

    window.addEventListener('scroll', handleScroll, { passive: true })

    return () => window.removeEventListener('scroll', handleScroll)
  }, [isOpen, isVisible])

  useEffect(() => {
    const checkScreenSize = () => {
      const width = window.innerWidth
      setIsDesktop(width > 1024)
    }
    checkScreenSize()
    window.addEventListener('resize', checkScreenSize)
    return () => window.removeEventListener('resize', checkScreenSize)
  }, [])

  useEffect(() => {
    if (isOpen) {
      document.body.classList.add('overflow-hidden')
    } else {
      document.body.classList.remove('overflow-hidden')
    }
  }, [isOpen])

  const headerClasses = [
    'fixed',
    'top-0',
    'left-0',
    'w-full',
    'z-50',
    'px-[115px]',
    'max-lg:px-6',
    'flex',
    'items-center',
    'justify-between',
    'py-[20px]',
    'transition-transform',
    'duration-500',
    'ease-in-out',
    isScrolledDown ? '-translate-y-full' : 'translate-y-0',
    !start || isOpen ? 'bg-white' : 'bg-transparent',
    !start && 'shadow-[0px_12px_30px_0px_#0000000D]'
  ]
    .filter(Boolean)
    .join(' ')

  return (
    <header ref={headerRef} className={headerClasses}>
      <LogoIcon className="h-[14px] w-[127px]" />
      {isDesktop && <HeaderDropdown start={start} />}
      {isDesktop ? (
        <div className="flex items-center gap-[18px]">
          <ToggleLanguage
            value={locale !== 'en'}
            onToggle={(isEn) => {
              const newLocale = !isEn ? 'en' : 'ar'
              const newPath = `/${newLocale}${pathname.slice(locale.length + 1)}`
              router.replace(newPath)
            }}
          />
          <button
            className="flex button-gradient h-[56px] rounded-full px-6 py-4 text-center items-center justify-center
                text-white text-body3 !bg-black
                transition-all w-[200px]">
            {t('button')}
          </button>
        </div>
      ) : (
        <button onClick={() => setIsOpen((prev) => !prev)} className="p-2 z-[51]">
          {!isOpen ? <TreeLines /> : <X className="w-6 h-6" />}
        </button>
      )}

      {!isDesktop && (
        <div
          className={`absolute inset-0 z-50 bg-white px-6 py-6 flex flex-col justify-between md:h-[300px] top-[79px] h-[calc(100vh-79px)]
            transition-opacity duration-300 ease-in-out
            ${isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}>
          <div className="flex flex-col gap-8 items-center">
            <ToggleLanguage
              value={locale !== 'en'}
              onToggle={(isEn) => {
                const newLocale = !isEn ? 'en' : 'ar'
                const newPath = `/${newLocale}${pathname.slice(locale.length + 1)}`
                router.replace(newPath)
              }}
            />
            <div className="flex flex-col gap-4 items-center">
              <div
                className="gap-[10px] flex items-center cursor-pointer select-none "
                onClick={() => setOpened((v) => !v)}>
                <Typography weight="medium" variant="h6">
                  {t('services')}
                </Typography>
                <div className={`transition-transform duration-300 ${opened ? 'rotate-180' : ''}`}>
                  <CaretDown />
                </div>
              </div>
              {opened && (
                <div className="flex flex-col gap-[6px]">
                  <button className="py-[7px]">
                    <Typography>{t('academy')}</Typography>
                  </button>
                  <button className="py-[7px]">
                    <Typography>{t('smarter')}</Typography>
                  </button>
                </div>
              )}
              <Typography weight="medium" variant="h6">
                {t('blog')}
              </Typography>
            </div>
          </div>
          <Button variant="purple">{t('button')}</Button>
        </div>
      )}
    </header>
  )
}
