'use client'

import React, { useEffect, useRef, useState } from 'react'
import './VideoSection.style.css'
import Lottie, { LottieRefCurrentProps } from 'lottie-react'
import hero from '../../../../../public/assets/lottie/solutions/hero/hero.json'
import heroAr from '../../../../../public/assets/lottie/solutions/hero/hero_ar.json'
import { useLocale } from 'next-intl'

export const VideoSection = ({ loading }: { loading: boolean }) => {
  const lottieRef = useRef<LottieRefCurrentProps>(null)
  const sectionRef = useRef<HTMLElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)

  const dirRef = useRef<1 | -1>(1)

  const PAUSE_MS = 400
  const pauseRef = useRef<number | null>(null)

  const locale = useLocale()
  const isArabic = locale === 'ar'

  const handleLottieComplete = () => {
    const inst = lottieRef.current
    if (!inst) return

    dirRef.current = dirRef.current === 1 ? -1 : 1
    inst.setDirection(dirRef.current)

    if (pauseRef.current) {
      clearTimeout(pauseRef.current)
      pauseRef.current = null
    }

    pauseRef.current = window.setTimeout(() => {
      inst.play()
    }, PAUSE_MS)
  }

  useEffect(() => {
    if (!sectionRef.current) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          lottieRef.current?.setSpeed(0.5)

          if (pauseRef.current) {
            clearTimeout(pauseRef.current)
            pauseRef.current = null
          }
          lottieRef.current?.play()

          if (videoRef.current) {
            videoRef.current.muted = true
            videoRef.current.play().catch(() => {
              videoRef.current && (videoRef.current.controls = false)
            })
          }
        } else {
          if (pauseRef.current) {
            clearTimeout(pauseRef.current)
            pauseRef.current = null
          }
          lottieRef.current?.pause()
        }
      },
      { threshold: 0.5 }
    )

    observer.observe(sectionRef.current)

    return () => {
      if (sectionRef.current) observer.unobserve(sectionRef.current)
      observer.disconnect()
    }
  }, [loading])

  useEffect(() => {
    window.scrollBy({
      top: 3,
      left: 0,
      behavior: 'smooth'
    })
    if (!videoRef.current) return
    videoRef.current.muted = true
    videoRef.current.play().catch(() => {
      if (videoRef.current) videoRef.current.controls = false
    })
  }, [locale, loading])

  useEffect(() => {
    return () => {
      if (pauseRef.current) {
        clearTimeout(pauseRef.current)
        pauseRef.current = null
      }
    }
  }, [loading])

  useEffect(() => {
    if (!loading) return
    const v = videoRef.current
    if (!v) return

    let tries = 0
    const interval = setInterval(() => {
      v.play()
        .then(() => {
          console.log('Video started')
        })
        .catch(() => {
          console.log('Retry play attempt', tries)
        })
      tries++
    }, 1000)

    return () => clearInterval(interval)
  }, [loading])

  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    video.classList.add('inlinevideo')

    const handlePlayOnInteraction = () => {
      if (video.paused || video.ended) {
        video.play().catch((err) => {
          console.warn('Play error after user interaction:', err)
        })
      }
    }

    handlePlayOnInteraction()

    document.body.addEventListener('click', handlePlayOnInteraction, { once: true })
    document.body.addEventListener('touchstart', handlePlayOnInteraction, { once: true })

    return () => {
      document.body.removeEventListener('click', handlePlayOnInteraction)
      document.body.removeEventListener('touchstart', handlePlayOnInteraction)
    }
  }, [loading])

  function useDetectAppleDevice() {
    return /(iPhone|iPod|iPad)/i.test(navigator.userAgent)
  }

  const videoUrl = isArabic
    ? 'https://res.cloudinary.com/diflwl506/video/upload/v1755686782/Hero_Video_AR_ymunl8.mp4'
    : 'https://res.cloudinary.com/diflwl506/video/upload/v1755686595/heroVideo_lzfeam.mp4'

  if (!videoRef.current) null

  return (
    <section
      ref={sectionRef}
      className="relative flex items-center justify-center mt-[60px] max-md:mb-[-10px] h-[650px] max-lg:h-[515px] max-md:h-[290px] z-0">
      <div className="first-block absolute flex flex-col items-center justify-between px-2 bg-white/20 rounded-t-[20px] max-md:rounded-t-lg w-[850px] max-lg:w-[675px] max-md:w-[350px] h-[600px] max-lg:h-[480px] max-md:h-[250px] backdrop-blur-[72px] z-30 bottom-[-2px] max-lg:bottom-[-5px] custom-shadow">
        <Lottie
          lottieRef={lottieRef}
          animationData={isArabic ? heroAr : hero}
          autoplay
          loop={false}
          onComplete={handleLottieComplete}
          className="absolute z-20 lg:left-[-166px] lg:bottom-[150px] max-lg:left-[20px] max-md:left-[15px] max-lg:top-[56px] max-md:top-[34px] max-lg:w-[120px] max-md:w-[62px] max-lg:h-[152px] max-md:h-[80px]"
        />
        <img src="/Toolbar.png" alt="Toolbar" />
        <video
          id="myVideoID"
          ref={videoRef}
          src={videoUrl}
          width="100%"
          height="auto"
          playsInline
          autoPlay
          loop
          muted
          controls={false}
          className="inlinevideo"
          webkit-playsinline="true"
          style={{ borderRadius: '16px 16px 0 0', overflow: 'hidden' }}
        />
      </div>

      <div className="second-block absolute bg-gradient-to-b from-white/10 to-white/0 rounded-t-[20px] w-[880px] max-lg:w-[700px] max-md:w-[360px] h-[505px] max-lg:h-[402px] max-md:h-[208px] backdrop-blur-[40px] z-20 bottom-[40px]" />

      <div className="third-block absolute bg-gradient-to-b from-white/5 to-white/0 rounded-t-[20px] w-[910px] max-lg:w-[725px] max-md:w-[375px] h-[540px] max-lg:h-[433px] max-md:h-[224px] bottom-[-40px] z-10 shadow-[0_4px_80px_16px_rgba(9,19,21,0.16)]" />
    </section>
  )
}
