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
  const { isVisible } = useHeaderVisibility() // лише читаємо, не впливаємо на layout

  // Скрол-логіка: визначаємо, що юзер скролить вниз (і вже пройшли 50px)
  useEffect(() => {
    const handleScroll = () => {
      const y = window.scrollY
      setStart(y <= 10)

      const goingDown = y > lastScrollRef.current
      const passed = y > 50
      // важливо: не враховуємо isVisible тут, щоб уникнути петлі
      setIsScrolledDown(!isOpen && goingDown && passed)

      lastScrollRef.current = y
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [isOpen])

  useEffect(() => {
    const checkScreenSize = () => setIsDesktop(window.innerWidth > 1024)
    checkScreenSize()
    window.addEventListener('resize', checkScreenSize)
    return () => window.removeEventListener('resize', checkScreenSize)
  }, [])

  useEffect(() => {
    document.body.classList.toggle('overflow-hidden', isOpen)
  }, [isOpen])

  useEffect(() => {
    document.documentElement.classList.toggle('header-open', isOpen)
    return () => document.documentElement.classList.remove('header-open')
  }, [isOpen])

  const headerClasses = [
    'site-header', // 👈 новий клас
    'fixed top-0 left-0 w-full z-50',
    'px-[115px] max-1150:px-[70px] max-lg:px-6',
    'grid items-center',
    !isDesktop ? 'grid-cols-2' : 'grid-cols-3',
    'py-[20px]',
    'transition-transform duration-500 ease-in-out',
    '[will-change:transform]',
    isScrolledDown ? '-translate-y-full' : 'translate-y-0', // локальний скрол-хайд
    !start || isOpen ? 'bg-white' : 'bg-transparent',
    !start ? 'shadow-[0px_12px_30px_0px_#0000000D]' : ''
  ]
    .filter(Boolean)
    .join(' ')

  return (
    <header ref={headerRef} className={headerClasses}>
      <a href={`/${locale}`}>
        <LogoIcon className="min-h-[32px] max-w-[121px] justify-self-start" />
      </a>

      {isDesktop && <HeaderDropdown start={start} />}

      {isDesktop ? (
        <div className="flex items-center gap-[18px] justify-self-end">
          <ToggleLanguage
            value={locale !== 'en'}
            onToggle={(isEn) => {
              const newLocale = !isEn ? 'en' : 'ar'
              const newPath = `/${newLocale}${pathname.slice(locale.length + 1)}`
              router.replace(newPath)
            }}
          />
          <a
            className="flex button-gradient h-[56px] rounded-full px-6 py-4 text-center items-center justify-center
                       text-white text-body3 !bg-black transition-all w-[200px]"
            href={`/${locale}/contact-form`}>
            {t('button')}
          </a>
        </div>
      ) : (
        <button onClick={() => setIsOpen((prev) => !prev)} className="p-2 z-[51] grid justify-self-end">
          {!isOpen ? <TreeLines /> : <X className="w-6 h-6" />}
        </button>
      )}

      {/* Мобільне меню */}
      {!isDesktop && (
        <div
          className={`absolute inset-0 z-50 bg-white px-6 py-6 flex flex-col justify-between
                      md:h-[300px] top-[79px] h-[calc(100dvh-79px)]
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
                className="gap-[10px] flex items-center cursor-pointer select-none"
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
                  <a className="py-[7px] px-2" href={`/${locale}/solutions`}>
                    <Typography>{t('solutions')}</Typography>
                  </a>
                </div>
              )}
              <a href={`/${locale}/blog`}>
                <Typography weight="medium" variant="h6">
                  {t('blog')}
                </Typography>
              </a>
            </div>
          </div>
          <a href={`/${locale}/blog`}>
            <Button variant="purple" className="w-full">
              {t('button')}
            </Button>
          </a>
        </div>
      )}
    </header>
  )
}
