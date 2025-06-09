'use client'

import { useEffect, useRef, useState } from 'react'
import { useLocale, useTranslations } from 'next-intl'
import { usePathname, useRouter } from 'next/navigation'
import { gsap } from 'gsap'
import ToggleLanguage from '../ToggleLanguage'
import { Button } from '../primitives/button'
import { TreeLines } from '../icons'
import { MobileMenu } from './MobileMenu'

export const Header = () => {
  const t = useTranslations('Header')
  const headerRef = useRef<HTMLDivElement>(null)
  const [lastScroll, setLastScroll] = useState(0)

  const locale = useLocale()
  const pathname = usePathname()
  const router = useRouter()

  useEffect(() => {
    const handleScroll = () => {
      const currentScroll = window.scrollY
      if (headerRef.current) {
        if (currentScroll > lastScroll && currentScroll > 50) {
          gsap.to(headerRef.current, { opacity: 0, duration: 0.7, ease: 'power2.out' })
        } else {
          gsap.to(headerRef.current, { opacity: 1, duration: 0.7, ease: 'power2.out' })
        }
      }
      setLastScroll(currentScroll)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [lastScroll])

  const [isMobile, setIsMobile] = useState<boolean>(false)
  const [isTablet, setIsTablet] = useState<boolean>(false)
  const [isDesktop, setIsDesktop] = useState<boolean>(true)

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

  return (
    <header
      ref={headerRef}
      className="fixed bg-white top-0 left-0 w-full z-50 px-[115px] max-lg:px-6 flex items-center
    justify-between py-[20px]"
      style={{ boxShadow: '0px 12px 30px 0px #0000000D' }}>
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

          <button
            className="button-gradient h-[56px] rounded-full px-6 py-5 text-center 
                text-white text-caption !bg-black
                transition-all  ">
           {t('button')}
          </button>

        </div>
      ) : (
        <MobileMenu />
      )}
    </header>
  )
}
