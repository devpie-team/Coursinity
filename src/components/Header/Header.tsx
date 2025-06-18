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

  // --- State Management ---
  const [isOpen, setIsOpen] = useState(false) // State for mobile menu
  const [start, setStart] = useState(true) // Is user at the top of the page?
  const [isScrolledDown, setIsScrolledDown] = useState(false) // Is user scrolling down?
  const [isMobile, setIsMobile] = useState(false)
  const [isTablet, setIsTablet] = useState(false)
  const [isDesktop, setIsDesktop] = useState(true)

  // --- Refs ---
  const lastScrollRef = useRef(0) // To track scroll position without re-renders

  // --- Hooks ---
  const locale = useLocale()
  const pathname = usePathname()
  const router = useRouter()
  const { isVisible } = useHeaderVisibility() // From context

  // --- Effect for Scroll Handling (Optimized) ---
  useEffect(() => {
    const handleScroll = () => {
      const currentScroll = window.scrollY

      // Update 'start' state for background/shadow
      setStart(currentScroll <= 10)

      // Determine scroll direction and hide/show header
      // Hide if: scrolling down, past 50px, menu is closed, or context says invisible
      if ((currentScroll > lastScrollRef.current && currentScroll > 50 && !isOpen) || (!isVisible && !isOpen)) {
        setIsScrolledDown(true)
      } else {
        setIsScrolledDown(false)
      }

      // Update last scroll position
      lastScrollRef.current = currentScroll
    }

    window.addEventListener('scroll', handleScroll, { passive: true })

    return () => window.removeEventListener('scroll', handleScroll)
    // Dependencies are external states that should trigger a re-evaluation of the logic
  }, [isOpen, isVisible])

  // --- Effect for Screen Size ---
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

  // --- Effect for Body Scroll Lock ---
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
    'transition-transform', // Added for CSS animation
    'duration-500', // Animation duration
    'ease-in-out', // Animation timing function
    isScrolledDown ? '-translate-y-full' : 'translate-y-0', // CSS class for hiding/showing
    !start || isOpen ? 'bg-white' : 'bg-transparent',
    !start && 'shadow-[0px_12px_30px_0px_#0000000D]'
  ]
    .filter(Boolean)
    .join(' ')

  return (
    <header ref={headerRef} className={headerClasses}>
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
            className="flex button-gradient h-[56px] rounded-full px-6 py-4 text-center items-center
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

      {/* --- Mobile Menu (Optimized with CSS Transitions) --- */}
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
          </div>
          <Button variant="purple">{t('button')}</Button>
        </div>
      )}
    </header>
  )
}
