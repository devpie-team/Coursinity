// hooks/useLottieAutoPlay.ts
'use client'
import { useEffect, useRef } from 'react'
import type { LottieRefCurrentProps } from 'lottie-react'

export function useLottieAutoPlay(
  cardRef: React.RefObject<HTMLElement | null>,
  lottieRef: React.RefObject<LottieRefCurrentProps | null>,
  { once = false, threshold = 0.3, rootMargin = '0px 0px -18% 0px' } = {}
) {
  const hasPlayed = useRef(false)

  useEffect(() => {
    const el = cardRef.current
    const anim = lottieRef.current
    if (!el || !anim) return

    // При маунте показываем 1-й кадр, но не играем
    anim.goToAndStop?.(0, true)

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          if (once && hasPlayed.current) return
          anim.goToAndPlay?.(0, true)
          hasPlayed.current = true
        } else if (!once) {
          // Не очищаем кадр: просто ставим на паузу
          anim.pause?.()
        }
      },
      { threshold, rootMargin }
    )

    io.observe(el)
    return () => io.disconnect()
  }, [cardRef, lottieRef, once, threshold, rootMargin])
}
