'use client'

import { useEffect, useRef, useState, useLayoutEffect } from 'react'
import { useLocale, useTranslations } from 'next-intl'
import { usePathname, useRouter } from 'next/navigation'
import { gsap } from 'gsap'
import ToggleLanguage from '../ToggleLanguage'
import { useHeaderVisibility } from './HeaderVisibilityContext'
import { Button } from '../primitives/button'
import { X } from 'lucide-react'
import { TreeLines } from '../icons'

export const Header = () => {
  const t = useTranslations('Header')
  const headerRef = useRef<HTMLDivElement>(null)
  const mobileMenuRef = useRef<HTMLDivElement>(null)

  const [lastScroll, setLastScroll] = useState(0)
  const [isOpen, setIsOpen] = useState(false)
  const [showMenu, setShowMenu] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const [isTablet, setIsTablet] = useState(false)
  const [isDesktop, setIsDesktop] = useState(true)
  const [start, setStart] = useState(true)

  const locale = useLocale()
  const pathname = usePathname()
  const router = useRouter()
  const { isVisible } = useHeaderVisibility()

  useEffect(() => {
    const handleScroll = () => {
      const currentScroll = window.scrollY

      if (currentScroll <= 10) {
        setStart(true)
      } else if (start == true) {
        setStart(false)
      }

      if (headerRef.current) {
        if ((currentScroll > lastScroll && currentScroll > 50 && !isOpen) || (!isVisible && !isOpen)) {
          gsap.to(headerRef.current, { y: -100, duration: 0.5, ease: 'power2.inOut' })
        } else {
          gsap.to(headerRef.current, { y: 0, duration: 0.5, ease: 'power2.inOut' })
        }
      }
      setLastScroll(currentScroll)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [lastScroll, isOpen])

  useEffect(() => {
    const checkScreenSize = () => {
      const width = window.innerWidth
      setIsMobile(width < 768)
      setIsTablet(width >= 768 && width <= 1024)
      setIsDesktop(width > 1024)
    }
    checkScreenSize()
    window.addEventListener('resize', checkScreenSize)
    return () => window.removeEventListener('resize', checkScreenSize)
  }, [])

  useEffect(() => {
    if (isOpen) {
      setShowMenu(true)
    } else if (showMenu) {
      const timeout = setTimeout(() => setShowMenu(false), 300)
      return () => clearTimeout(timeout)
    }
  }, [isOpen, showMenu])

  useLayoutEffect(() => {
    if (showMenu && isOpen && mobileMenuRef.current) {
      gsap.fromTo(mobileMenuRef.current, { opacity: 0 }, { opacity: 1, duration: 0.4, ease: 'power2.out' })
    }
  }, [showMenu, isOpen])

  useEffect(() => {
    if (!isOpen && mobileMenuRef.current) {
      gsap.to(mobileMenuRef.current, {
        opacity: 0,
        duration: 0.3,
        ease: 'power2.in'
      })
    }
  }, [isOpen])

  return (
    <header
      ref={headerRef}
      className={`fixed ${
        !start ? 'bg-white' : ''
      } top-0 left-0 w-full z-50 px-[115px] max-lg:px-6 flex items-center justify-between py-[20px]`}
      style={{ boxShadow: !start ? '0px 12px 30px 0px #0000000D' : undefined }}>
      <img
        src={`/assets/logos/${isTablet || isMobile ? 'mobileLogo' : 'logos'}.png`}
        alt="Logo"
        className="h-[14px] w-[326px] max-lg:w-[126px]"
      />
      {isDesktop && <div />}
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
          <Button>{t('button')}</Button>
        </div>
      ) : (
        <button onClick={() => setIsOpen((prev) => !prev)} className="p-2">
          {!isOpen ? <TreeLines /> : <X className="w-6 h-6" />}
        </button>
      )}

      {showMenu && (
        <div
          ref={mobileMenuRef}
          className="absolute inset-0 z-50 bg-white px-6 py-6 flex flex-col justify-between md:h-[300px] bottom-0 top-[79px] h-[calc(100vh-79px)]"
          style={{ pointerEvents: isOpen ? 'auto' : 'none' }}>
          <div className="flex flex-col gap-8 items-center">
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
    </header>
  )
}
