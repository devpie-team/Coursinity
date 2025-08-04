'use client'

import { Typography } from '@/components/ui'
import { useEffect, useState, useRef } from 'react'
import { useLocale, useTranslations } from 'use-intl'

const TypingLoopText = () => {
  const t = useTranslations('S_TypingLoopText')
  const texts = t.raw('texts') as string[]

  const [currentTextIndex, setCurrentTextIndex] = useState(0)
  const [displayed, setDisplayed] = useState('')
  const [isDeleting, setIsDeleting] = useState(false)
  const [showCursor, setShowCursor] = useState(true)
  const [pauseStage, setPauseStage] = useState<'none' | 'wait' | 'hideCursor' | 'showCursor' | 'showCursorPause'>(
    'none'
  )
  const [hasFinishedCycle, setHasFinishedCycle] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)
  const [isMobile, setIsMobile] = useState(false)
  const [isTablet, setIsTablet] = useState(false)
  const [isDesktop, setIsDesktop] = useState(true)
  const locale = useLocale()
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

  useEffect(() => {
    const el = containerRef.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setCurrentTextIndex(0)
          setDisplayed('')
          setIsDeleting(false)
          setPauseStage('none')
          setShowCursor(true)
          setHasFinishedCycle(false)
        }
      },
      { threshold: 0.5 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    setCurrentTextIndex(0)
    setDisplayed('')
    setIsDeleting(false)
    setPauseStage('none')
    setShowCursor(true)
    setHasFinishedCycle(false)
  }, [locale])

  useEffect(() => {
    if (!hasFinishedCycle) return
    const interval = setInterval(() => {
      setShowCursor((v) => !v)
    }, 600)
    return () => clearInterval(interval)
  }, [hasFinishedCycle])

  useEffect(() => {
    if (hasFinishedCycle || texts.length === 0) return

    const fullText = texts[currentTextIndex]
    const isFull = displayed === fullText
    const isEmpty = displayed === ''
    let timeout: NodeJS.Timeout

    if (!isDeleting && !isFull) {
      timeout = setTimeout(() => {
        setDisplayed(fullText.slice(0, displayed.length + 1))
      }, 75)
    } else if (!isDeleting && isFull) {
      if (pauseStage === 'none') {
        timeout = setTimeout(() => setPauseStage('wait'), 300)
      } else if (pauseStage === 'wait') {
        setShowCursor(false)
        timeout = setTimeout(() => setPauseStage('hideCursor'), 200)
      } else if (pauseStage === 'hideCursor') {
        setShowCursor(true)
        timeout = setTimeout(() => setPauseStage('showCursor'), 200)
      } else if (pauseStage === 'showCursor') {
        timeout = setTimeout(() => setPauseStage('showCursorPause'), 200)
      } else if (pauseStage === 'showCursorPause') {
        if (currentTextIndex === texts.length - 1) {
          setHasFinishedCycle(true)
        } else {
          setIsDeleting(true)
          setPauseStage('none')
        }
      }
    } else if (isDeleting && !isEmpty) {
      timeout = setTimeout(() => {
        setDisplayed(fullText.slice(0, displayed.length - 1))
      }, 75)
    } else if (isDeleting && isEmpty) {
      timeout = setTimeout(() => {
        setIsDeleting(false)
        setCurrentTextIndex((prev) => prev + 1)
      }, 200)
    }

    return () => clearTimeout(timeout)
  }, [displayed, isDeleting, pauseStage, currentTextIndex, hasFinishedCycle, texts])

  const shouldHideText = isDeleting && displayed === ''

  return (
    <div
      ref={containerRef}
      className="flex relative px-6 py-4 border-2 border-dashed border-primary-purple min-h-[116px] max-lg:py-0 items-center max-lg:min-h-16 ">
      <Typography
        variant={isDesktop ? 'h1' : 'h3'}
        weight="regular"
        className="text-primary-purple flex items-center gap-4">
        <span className="whitespace-pre">{shouldHideText ? '\u00A0' : displayed}</span>
        <span className={`w-[4px] h-[64px] max-lg:h-10 max-lg:w-1 ${showCursor ? 'bg-primary-purple' : 'invisible'}`} />
      </Typography>

      {/* Dots */}
      {[
        'top-[-4px] left-[-4px]',
        'top-[-4px] right-[-4px]',
        'bottom-[-4px] left-[-4px]',
        'bottom-[-4px] right-[-4px]'
      ].map((pos, i) => (
        <span key={i} className={`absolute w-2 h-2 border-2 border-primary-purple bg-white rounded-full ${pos}`} />
      ))}
    </div>
  )
}

export default TypingLoopText
