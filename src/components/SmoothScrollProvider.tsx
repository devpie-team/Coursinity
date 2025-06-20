'use client'
import { useEffect } from 'react'
import Lenis from '@studio-freight/lenis'

declare global {
  interface Window {
    lenis?: Lenis
  }
}

export default function SmoothScrollProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    const isMobile =
      window.innerWidth <= 1024 ||
      /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)

    if (isMobile) {
      return
    }

    const lenis = new Lenis({
      lerp: 0.09,
      smoothWheel: true,
      touchMultiplier: 1.5,
      infinite: false
    })
    window.lenis = lenis

    function raf(time: number) {
      lenis.raf(time)
      requestAnimationFrame(raf)
    }
    requestAnimationFrame(raf)
    return () => {
      lenis.destroy()
      delete window.lenis
    }
  }, [])

  return <>{children}</>
}
