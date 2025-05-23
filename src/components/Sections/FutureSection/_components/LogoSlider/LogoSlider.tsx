'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export const LogoSlider = () => {
  const trackRef = useRef(null)

  useEffect(() => {
    if (!trackRef.current) return

    gsap.to(trackRef.current, {
      x: 400,
      ease: 'sine.inOut',
      scrollTrigger: {
        trigger: trackRef.current,
        start: 'top bottom',
        end: 'bottom top',
        scrub: 1.25
      }
    })
  }, [])

  return (
    <div className="flex justify-center">
      <div className="relative   h-[200px] border-4 border-secondary-400 rounded-[40px]  w-[1140px] overflow-hidden">
        <div className="absolute left-1/3 top-1/4 -translate-x-1/2  ">
          <div className="flex gap-10 rotate-[7.5deg] " ref={trackRef}>
            {[
              'assets/logos/microsoft.png',
              'assets/logos/axelos.png',
              'assets/logos/iosh.png',
              'assets/logos/microsoft.png',
              'assets/logos/microsoft.png',
              'assets/logos/microsoft.png',
              'assets/logos/microsoft.png',
              'assets/logos/microsoft.png',
              'assets/logos/microsoft.png'
            ].map((src, i) => (
              <div
                key={i}
                className="w-[160px] h-[160px] border border-secondary-400 bg-white rounded-[40px]  flex items-center justify-center skew-x-[-30deg]">
                <img src={src} alt="" className=" object-contain" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
