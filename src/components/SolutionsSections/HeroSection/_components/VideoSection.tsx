'use client'
import React, { useEffect, useRef, useState } from 'react'
import ReactPlayer from 'react-player'
import './VideoSection.style.css'
import Lottie, { LottieRefCurrentProps } from 'lottie-react'
import hero from '../../../../../public/assets/lottie/solutions/hero/hero.json'
import { useLocale } from 'next-intl'

export const VideoSection = () => {
  const lottieRef = useRef<LottieRefCurrentProps>(null)
  const sectionRef = useRef<HTMLElement>(null)
  const locale = useLocale()
  const [isClient, setIsClient] = useState(false)
  const [key, setKey] = useState(0)

  useEffect(() => {
    setIsClient(true)

    const timer = setTimeout(() => {
      setKey((prev) => prev + 1)
    }, 300)

    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    if (!sectionRef.current) return

    const observer = new window.IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          lottieRef.current?.setSpeed(0.5)
          lottieRef.current?.goToAndPlay(0, true)
        }
      },
      { threshold: 0.5 }
    )
    observer.observe(sectionRef.current)
    return () => observer.disconnect()
  }, [])

  return (
    <section
      ref={sectionRef}
      className="relative flex items-center justify-center mt-[60px] max-md:mb-[-10px] h-[650px] max-lg:h-[515px] max-md:h-[290px]  z-0 ">
      <div className="first-block absolute flex flex-col items-center justify-between px-2 bg-white/20 rounded-t-[20px] max-md:rounded-t-lg  w-[850px] max-lg:w-[675px] max-md:w-[350px] h-[600px] max-lg:h-[480px] max-md:h-[250px] backdrop-blur-[72px] z-30 bottom-[-2px] max-lg:bottom-[-5px]  custom-shadow ">
        <Lottie
          lottieRef={lottieRef}
          animationData={hero}
          loop={false}
          className="absolute z-20 lg:left-[-166px] lg:bottom-[150px] max-lg:left-[20px] max-md:left-[15px] max-lg:top-[56px] max-md:top-[34px] max-lg:w-[120px] max-md:w-[62px] max-lg:h-[152px] max-md:h-[80px]"
        />
        <img src="/Toolbar.png" alt="Toolbar" />
        {isClient && (
          <ReactPlayer
            key={`player-${locale}-${key}`}
            src="https://cdn.shopify.com/videos/c/o/v/2c4c5ecb05f649578bec5aac380730e1.mp4"
            width="100%"
            height="auto"
            playing
            muted={true}
            playsInline
            loop
            controls={false}
            style={{ borderRadius: '16px 16px 0 0', overflow: 'hidden' }}
            onError={(e) => console.error('ReactPlayer error:', e)}
          />
        )}
      </div>
      <div className="second-block absolute bg-gradient-to-b from-white/10 to-white/0 rounded-t-[20px] w-[880px] max-lg:w-[700px] max-md:w-[360px] h-[505px] max-lg:h-[402px] max-md:h-[208px] backdrop-blur-[40px]  z-20  bottom-[40px]"></div>
      <div className="third-block absolute bg-gradient-to-b from-white/5 to-white/0 rounded-t-[20px] w-[910px] max-lg:w-[725px] max-md:w-[375px] h-[540px] max-lg:h-[433px] max-md:h-[224px] bottom-[-40px] z-10 shadow-[0_4px_80px_16px_rgba(9,19,21,0.16)]"></div>
    </section>
  )
}
