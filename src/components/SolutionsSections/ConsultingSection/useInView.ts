import { useEffect, useState, RefObject } from 'react'

export function useInView<T extends HTMLElement>(ref: React.RefObject<T>, options?: IntersectionObserverInit) {
  const [inView, setInView] = useState(false)

  useEffect(() => {
    if (!ref.current) return
    const observer = new IntersectionObserver(([entry]) => setInView(entry.isIntersecting), options)
    observer.observe(ref.current)
    return () => observer.disconnect()
  }, [ref, options])

  return inView
}
