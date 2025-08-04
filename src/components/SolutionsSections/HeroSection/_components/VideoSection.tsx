'use client'
import React, { useEffect, useRef } from 'react'
import ReactPlayer from 'react-player'
import './VideoSection.style.css'
import Lottie, { LottieRefCurrentProps } from 'lottie-react'
import hero from '../../../../../public/assets/lottie/solutions/hero/hero.json'
import { Toolbar } from '../../../../../public/Toolbar'

export const VideoSection = () => {
  const lottieRef = useRef<LottieRefCurrentProps>(null)
  const sectionRef = useRef<HTMLElement>(null)

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
      className="relative flex items-center justify-center mt-[60px] max-md:mb-[-10px] h-[650px] max-lg:h-[515px] max-md:h-[290px] overflow-hidden z-0">
      <div className="absolute flex flex-col items-center justify-between px-2 bg-white/20 rounded-t-[20px] w-[850px] max-lg:w-[675px] max-md:w-[350px] h-[600px] max-lg:h-[480px] max-md:h-[250px] backdrop-blur-[72px] z-30 bottom-0 custom-shadow ">
        <Lottie
          lottieRef={lottieRef}
          animationData={hero}
          loop={false}
          className="absolute z-20 lg:left-[-166px] lg:bottom-[150px] max-lg:left-[20px] max-md:left-[15px] max-lg:top-[56px] max-md:top-[34px] max-lg:w-[120px] max-md:w-[62px] max-lg:h-[152px] max-md:h-[80px]"
        />
        {/* <Toolbar /> */}
        <img src="/Toolbar.png" alt="Toolbar" />
        <ReactPlayer
          src="/assets/video/heroVideo.mp4"
          width="100%"
          height="auto"
          playing
          muted={true}
          loop
          controls={false}
          style={{ borderRadius: '16px 16px 0 0', overflow: 'hidden' }}
        />
      </div>
      <div className="absolute bg-gradient-to-b from-white/10 to-white/0 rounded-t-[20px] w-[880px] max-lg:w-[700px] max-md:w-[360px] h-[505px] max-lg:h-[402px] max-md:h-[208px] backdrop-blur-[40px]  z-20  bottom-[40px]"></div>
      <div className="absolute bg-gradient-to-b from-white/5 to-white/0 rounded-t-[20px] w-[910px] max-lg:w-[725px] max-md:w-[375px] h-[540px] max-lg:h-[433px] max-md:h-[224px] bottom-[-40px] z-10 shadow-[0_4px_80px_16px_rgba(9,19,21,0.16)]"></div>
    </section>
  )
}
