'use client'

import { useRef, useEffect, useState } from 'react'
import gsap from 'gsap'
import { LogoIcon } from '../icons'
import { useLocale } from 'next-intl'

type TLoading = {
  loading?: boolean
  onFinish?: () => void
  shortLoading?: boolean
}

export const Loader = ({ onFinish, shortLoading }: TLoading) => {
  const maskRef = useRef<HTMLDivElement>(null)
  const iconRef = useRef<HTMLDivElement>(null)
  const topBlockRef = useRef<HTMLDivElement>(null)
  const bottomBlockRef = useRef<HTMLDivElement>(null)
  const locale = useLocale()
  const isArabic = locale === 'ar'

  const [loading, setLoading] = useState(true)
  const [isMobile, setIsMobile] = useState(false)
  const [isTablet, setIsTablet] = useState(false)

  useEffect(() => {
    const checkScreenSize = () => {
      const width = window.innerWidth
      setIsMobile(width < 768)
      setIsTablet(width >= 768 && width <= 1024)
    }
    checkScreenSize()
    window.addEventListener('resize', checkScreenSize)
    return () => window.removeEventListener('resize', checkScreenSize)
  }, [])

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), isMobile ? 6000 : isTablet ? 6500 : 5700)
    return () => clearTimeout(timer)
  }, [isMobile, isTablet])

  useEffect(() => {
    if (loading) {
      document.body.classList.add('no-scroll')
    } else {
      document.body.classList.remove('no-scroll')
    }

    return () => {
      document.body.classList.remove('no-scroll')
    }
  }, [loading])

  useEffect(() => {
    const mask = maskRef.current
    const icon = iconRef.current
    const top = topBlockRef.current
    const bottom = bottomBlockRef.current
    if (!mask || !icon || !top || !bottom) return

    // скиди станів (залишаємо як було)
    gsap.set(icon, { opacity: 1 })
    gsap.set(top, { y: '0%' })
    gsap.set(bottom, { y: '0%' })
    gsap.set(mask, { x: '0%' })

    // якщо не loading — просто тримаємо все скинутим
    if (!loading) return

    // будуємо таймлайн з onComplete => onFinish()
    const tl = gsap.timeline({
      onComplete: () => {
        onFinish?.()
      }
    })

    // 1) маска
    tl.fromTo(mask, { x: '0%' }, { x: isArabic ? '-100%' : '100%', duration: shortLoading ? 1.5 : 3, ease: 'linear' })

    // 2) фейд логотипу (після маски)
    tl.to(icon, { opacity: 0, duration: shortLoading ? 0.5 : 1, ease: 'power2.out' })

    // 3) верхній/нижній блоки одночасно (після фейду)
    tl.to(top, { y: '-100%', duration: shortLoading ? 0.5 : 1, ease: 'power2.inOut' }).to(
      bottom,
      { y: '100%', duration: shortLoading ? 0.5 : 1, ease: 'power2.inOut' },
      '<'
    )

    return () => {
      tl.kill()
    }
  }, [loading, isArabic, onFinish])

  if (!loading) return null

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center "
      style={{ pointerEvents: 'all', opacity: loading ? 1 : 0, transition: 'opacity 0.7s' }}>
      {/* Блоки, которые открывают коллаж */}
      <div
        ref={topBlockRef}
        className="fixed top-0 left-0 w-full h-[50vh] z-20"
        style={{
          background: "url('/collage-top.jpg') center/cover, #fff", // или любой бэкграунд
          willChange: 'transform'
        }}
      />
      <div
        ref={bottomBlockRef}
        className="fixed bottom-0 left-0 w-full h-[50vh] z-20"
        style={{
          background: "url('/collage-bottom.jpg') center/cover, #fff", // или любой бэкграунд
          willChange: 'transform'
        }}
      />

      <div ref={iconRef} className="relative z-30">
        {isArabic ? (
          <img
            src="/assets/logos/logo_arabic.png"
            alt="Coursinity Arabic Logo"
            style={{ width: '270px', height: '70px' }}
          />
        ) : (
          <LogoIcon />
        )}
        <div
          ref={maskRef}
          className="pointer-events-none absolute inset-0 z-10"
          style={{
            background: 'linear-gradient(to right, white 100%, transparent 85%)',
            opacity: 0.8,
            mixBlendMode: 'lighten',
            transition: 'none'
          }}
        />
      </div>
    </div>
  )
}
