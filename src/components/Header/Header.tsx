'use client'

import { useEffect, useRef, useState } from 'react'
import { useLocale } from 'next-intl'
import { usePathname, useRouter } from 'next/navigation'
import { gsap } from 'gsap'
import ToggleLanguage from '../ToggleLanguage'
import { Button } from '../primitives/button'

export const Header = () => {
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
      className="fixed top-0 left-0 w-full z-50 px-[115px] flex items-center
    justify-between py-[20px]">
      <img src="/assets/logos/logos.png" alt="Logo" className="h-[14px] w-[326px] max-lg:w-[126px]" />
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
          <Button>Book a Demo Now</Button>
        </div>
      ) : (
        <></>
      )}
    </header>
  )
}
