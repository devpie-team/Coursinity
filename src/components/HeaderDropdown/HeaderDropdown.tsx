import { useTranslations } from 'next-intl'
import { Typography } from '../ui'
import { CaretDown } from '../icons'
import { useState, useRef, useEffect } from 'react'

type THeaderDropdown = { start: boolean }

export const HeaderDropdown = ({ start }: THeaderDropdown) => {
  const t = useTranslations('Header')
  const [opened, setOpened] = useState(false)
  const [mounted, setMounted] = useState(false)
  const [show, setShow] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)
  const animTimeout = useRef<NodeJS.Timeout | null>(null)

  useEffect(() => {
    if (opened) {
      setMounted(true)
      requestAnimationFrame(() => setShow(true))
    } else {
      setShow(false)
      animTimeout.current = setTimeout(() => setMounted(false), 200)
    }
    return () => animTimeout.current && clearTimeout(animTimeout.current)
  }, [opened])

  useEffect(() => {
    if (!opened) return
    const handleClick = (e: MouseEvent) => {
      if (!dropdownRef.current?.contains(e.target as Node)) setOpened(false)
    }
    window.addEventListener('mousedown', handleClick)
    return () => window.removeEventListener('mousedown', handleClick)
  }, [opened])

  useEffect(() => {
    if (!opened) return
    const handleScroll = () => setOpened(false)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [opened])

  return (
    <div className={`${start ? 'shadow-md' : ''} relative px-6 py-4 gap-6 flex items-center bg-white rounded-[40px]`}>
      <div
        className="gap-[10px] flex items-center cursor-pointer select-none"
        onClick={() => setOpened((v) => !v)}
        ref={dropdownRef}>
        <Typography weight="medium" variant="caption">
          {t('services')}
        </Typography>
        <div className={`transition-transform duration-300 ${opened ? 'rotate-180' : ''}`}>
          <CaretDown />
        </div>

        {mounted && (
          <div
            className={`
              absolute py-1 left-0 right-0 top-[50px] z-10 mt-2 min-w-[180px] rounded-2xl bg-white shadow-lg border border-neutral-200 flex flex-col
              transition-all duration-200 ease-in-out
              ${show ? 'opacity-100 translate-y-0 pointer-events-auto' : 'opacity-0 -translate-y-2 pointer-events-none'}
            `}
            aria-hidden={!opened}>
            <button className="text-left px-6 py-3 hover:bg-neutral-100 transition-colors rounded-2xl mx-[6px]">
              {t('academy')}
            </button>
            <button className="text-left px-6 py-3 hover:bg-neutral-100 transition-colors rounded-2xl mx-[6px]">
              {t('smarter')}
            </button>
          </div>
        )}
      </div>
      <Typography weight="medium" variant="caption">
        {t('blog')}
      </Typography>
    </div>
  )
}
