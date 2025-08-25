import { useLocale, useTranslations } from 'next-intl'
import { Typography } from '../ui'
import { CaretDown } from '../icons'
import { useState, useRef, useEffect, useLayoutEffect } from 'react'
import { cn } from '@/lib/utils'

type THeaderDropdown = { start: boolean }

export const HeaderDropdown = ({ start }: { start: boolean }) => {
  const t = useTranslations('Header')
  const [opened, setOpened] = useState(false)
  const [mounted, setMounted] = useState(false)
  const [visible, setVisible] = useState(false)
  const wrapperRef = useRef<HTMLDivElement>(null)
  const menuRef = useRef<HTMLDivElement>(null)
  const locale = useLocale()
  const isArabic = locale === 'ar'

  // відкриття/закриття
  useLayoutEffect(() => {
    if (opened) {
      setMounted(true)
      requestAnimationFrame(() => setVisible(true)) // старт анімації
    } else {
      setVisible(false) // нехай схлопується
      // unmount зробимо на transitionend
    }
  }, [opened])

  // unmount рівно після завершення CSS-транзи
  useEffect(() => {
    const el = menuRef.current
    if (!el) return
    const onEnd = (e: TransitionEvent) => {
      if (e.target !== el) return // ігноруємо дітей
      if (!opened) setMounted(false) // закінчили схлопування — можна зняти з DOM
    }
    el.addEventListener('transitionend', onEnd)
    return () => el.removeEventListener('transitionend', onEnd)
  }, [opened])

  // закриття по кліку поза
  useEffect(() => {
    if (!opened) return
    const onDown = (e: MouseEvent) => {
      if (!wrapperRef.current?.contains(e.target as Node)) setOpened(false)
    }
    window.addEventListener('mousedown', onDown)
    return () => window.removeEventListener('mousedown', onDown)
  }, [opened])

  // закриття при скролі
  useEffect(() => {
    if (!opened) return
    const onScroll = () => setOpened(false)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [opened])

  return (
    <div
      ref={wrapperRef}
      className={`${
        start ? 'shadow-md' : ''
      } relative px-6 py-4 gap-6 flex items-center bg-white rounded-[40px] justify-self-center`}>
      <div
        className="gap-[10px] flex items-center cursor-pointer select-none"
        onPointerDown={() => setOpened((v) => !v)}>
        <Typography weight="medium" variant="caption">
          {t('services')}
        </Typography>
        <div className={`transition-transform duration-300 ${opened ? 'rotate-180' : ''}`}>
          <CaretDown />
        </div>
      </div>

      {mounted && (
        <div
          ref={menuRef}
          aria-hidden={!opened}
          className={[
            'absolute left-0 right-0 top-[50px] z-10 mt-2 min-w-[180px] py-2',
            'rounded-2xl bg-white shadow-lg border border-neutral-200 flex flex-col',

            'transform-gpu will-change-transform will-change-opacity',
            'transition-[opacity,transform] duration-200 ease-in-out',
            visible ? 'opacity-100 translate-y-0 pointer-events-auto' : 'opacity-0 -translate-y-2 pointer-events-none'
          ].join(' ')}>
          <a
            className={cn(
              'px-6 py-3 hover:bg-neutral-100 transition-colors rounded-2xl mx-[6px] ',
              isArabic ? 'text-right' : 'text-left'
            )}
            href={`/${locale}/solutions`}>
            {t('solutions')}
          </a>
        </div>
      )}

      <Typography weight="medium" variant="caption">
        {t('blog')}
      </Typography>
    </div>
  )
}
