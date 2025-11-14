'use client'

import Link from 'next/link'
import { cn } from '@/lib/utils'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { useLocale } from 'next-intl'

type Props = {
  current: number
  total: number
  onPageChange?: (p: number) => void
  hrefBuilder?: (p: number) => string
  className?: string
}

type Item = number | '...'

function buildItems(current: number, total: number): Item[] {
  const delta = 1
  const range: Item[] = []

  const left = Math.max(2, current - delta)
  const right = Math.min(total - 1, current + delta)

  range.push(1)

  if (left > 2) range.push('...')

  for (let i = left; i <= right; i++) {
    range.push(i)
  }

  if (right < total - 1) range.push('...')

  if (total > 1) range.push(total)

  return range
}

export default function Pagination({ current, total, onPageChange, hrefBuilder, className }: Props) {
  if (total <= 1) return null

  const locale = useLocale()

  const items = buildItems(current, total)

  const numberBtnBase = 'w-10 h-10 rounded-full flex items-center justify-center transition'
  const numberBtn = 'text-gray-500 hover:text-gray-900'
  const activeBtn = 'bg-gray-100 text-black font-medium'

  const arrowBase = 'w-10 h-10 flex items-center justify-center rounded-full transition'
  const arrowEnabled = 'text-gray-700 hover:bg-gray-100 cursor-pointer'
  const arrowDisabled = 'text-gray-300 cursor-default'

  const go = (p: number) => {
    if (p < 1 || p > total) return
    if (hrefBuilder) return hrefBuilder(p)
    return onPageChange?.(p)
  }

  return (
    <nav className={cn('flex items-center justify-center gap-2 select-none', className)} aria-label="Pagination">
      {/* ← Always visible */}
      {hrefBuilder ? (
        <Link
          href={current > 1 ? hrefBuilder(current - 1) : '#'}
          className={cn(arrowBase, current > 1 ? arrowEnabled : arrowDisabled)}>
          {locale === 'en' ? <ChevronLeft size={18} /> : <ChevronRight size={18} />}
        </Link>
      ) : (
        <button
          onClick={() => current > 1 && onPageChange?.(current - 1)}
          className={cn(arrowBase, current > 1 ? arrowEnabled : arrowDisabled)}>
          {locale === 'en' ? <ChevronLeft size={18} /> : <ChevronRight size={18} />}
        </button>
      )}

      {items.map((it, idx) => {
        if (it === '...') {
          return (
            <span key={`dots-${idx}`} className="px-2 text-gray-400">
              …
            </span>
          )
        }

        const page = it as number
        const active = page === current
        const btnClass = cn(numberBtnBase, active ? activeBtn : numberBtn)

        return hrefBuilder ? (
          <Link key={page} href={hrefBuilder(page)} aria-current={active ? 'page' : undefined} className={btnClass}>
            {page}
          </Link>
        ) : (
          <button
            key={page}
            onClick={() => onPageChange?.(page)}
            aria-current={active ? 'page' : undefined}
            className={btnClass}>
            {page}
          </button>
        )
      })}

      {/* → Always visible */}
      {hrefBuilder ? (
        <Link
          href={current < total ? hrefBuilder(current + 1) : '#'}
          className={cn(arrowBase, current < total ? arrowEnabled : arrowDisabled)}>
          {locale === 'en' ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
        </Link>
      ) : (
        <button
          onClick={() => current < total && onPageChange?.(current + 1)}
          className={cn(arrowBase, current < total ? arrowEnabled : arrowDisabled)}>
          {locale === 'en' ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
        </button>
      )}
    </nav>
  )
}
