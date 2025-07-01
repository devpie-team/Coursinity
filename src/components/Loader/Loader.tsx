import { useRef, useEffect } from 'react'
import gsap from 'gsap'
import { LogoIcon } from '../icons'
import { useLocale } from 'next-intl'

type TLoading = {
  loading?: boolean
}

export const Loader = ({ loading }: TLoading) => {
  const maskRef = useRef<HTMLDivElement>(null)
  const iconRef = useRef<HTMLDivElement>(null)
  const topBlockRef = useRef<HTMLDivElement>(null)
  const bottomBlockRef = useRef<HTMLDivElement>(null)
  const locale = useLocale()
  const isArabic = locale === 'ar'

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
    if (loading && maskRef.current && iconRef.current && topBlockRef.current && bottomBlockRef.current) {
      gsap.fromTo(
        maskRef.current,
        { x: '0%' },
        {
          x: '100%',
          duration: 3,
          ease: 'linear',
          onComplete: () => {
            gsap.to(iconRef.current, {
              opacity: 0,
              duration: 1,
              ease: 'power2.out',
              onComplete: () => {
                gsap.to(topBlockRef.current, {
                  y: '-100%',
                  duration: 1,
                  ease: 'power2.inOut'
                })
                gsap.to(bottomBlockRef.current, {
                  y: '100%',
                  duration: 1,
                  ease: 'power2.inOut'
                })
              }
            })
          }
        }
      )

      gsap.set(iconRef.current, { opacity: 1 })
      gsap.set(topBlockRef.current, { y: '0%' })
      gsap.set(bottomBlockRef.current, { y: '0%' })
    } else if (maskRef.current && iconRef.current && topBlockRef.current && bottomBlockRef.current) {
      gsap.set(maskRef.current, { x: '0%' })
      gsap.set(iconRef.current, { opacity: 1 })
      gsap.set(topBlockRef.current, { y: '0%' })
      gsap.set(bottomBlockRef.current, { y: '0%' })
    }
  }, [loading])

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
            style={{ width: '270px', height: '54px' }}
          />
        ) : (
          <LogoIcon />
        )}
        <div
          ref={maskRef}
          className="pointer-events-none absolute inset-0 z-10"
          style={{
            background: 'linear-gradient(to right, white 0%, transparent 85%)',
            opacity: 0.8,
            mixBlendMode: 'lighten',
            transition: 'none'
          }}
        />
      </div>
    </div>
  )
}
