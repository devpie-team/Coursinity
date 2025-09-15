'use client'

import Link from 'next/link'
import { cn } from '@/lib/utils'

type Props = {
  current: number // текущая страница (1-based)
  total: number // всего страниц
  onPageChange?: (p: number) => void
  hrefBuilder?: (p: number) => string
  className?: string
}

type Item = number | '...'

function range(start: number, end: number) {
  return Array.from({ length: Math.max(0, end - start + 1) }, (_, i) => start + i)
}

/**
 * Правило:
 * - если total <= 6: показываем все страницы
 * - если total >= 7: выводим [1,2,3, '…', total-2, total-1, total]
 *   (три слева, «три точки» посередине, три справа)
 *   Текущая страница может не попасть в видимый ряд — это намеренно.
 */
function buildItems(total: number): Item[] {
  if (total <= 0) return []
  if (total <= 6) return range(1, total)
  return [1, 2, 3, '...', total - 2, total - 1, total]
}

export default function Pagination({ current, total, onPageChange, hrefBuilder, className }: Props) {
  if (total <= 1) return null

  const items = buildItems(total)

  const baseBtn = 'w-10 h-10 rounded-full flex items-center justify-center text-base transition'
  const numberBtn = 'text-gray-500 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-primary/30'
  const activeBtn = 'bg-gray-100 text-black font-medium'

  return (
    <nav className={cn('flex items-center justify-center gap-4 select-none', className)} aria-label="Pagination">
      {items.map((it, idx) => {
        if (it === '...') {
          return (
            <span key={`dots-${idx}`} className="px-2 text-gray-400" aria-hidden>
              …
            </span>
          )
        }

        const page = it as number
        const isActive = page === current

        if (hrefBuilder) {
          return (
            <Link
              key={page}
              href={hrefBuilder(page)}
              aria-current={isActive ? 'page' : undefined}
              className={cn(baseBtn, isActive ? activeBtn : numberBtn)}>
              {page}
            </Link>
          )
        }

        return (
          <button
            key={page}
            type="button"
            aria-current={isActive ? 'page' : undefined}
            onClick={() => onPageChange?.(page)}
            className={cn(baseBtn, isActive ? activeBtn : numberBtn)}>
            {page}
          </button>
        )
      })}
    </nav>
  )
}
