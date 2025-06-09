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
      y: 52.4,
      ease: 'sine.inOut',
      scrollTrigger: {
        trigger: trackRef.current,
        start: 'top bottom',
        end: 'bottom top',
        scrub: 1
      }
    })
  }, [])

  return (
    <div className="flex justify-center px-[150px] py-10 max-lg:px-6 max-lg:py-8 max-md:px-4">
      <div className="relative   h-[200px] border-4 border-secondary-400 rounded-[40px]  w-full overflow-hidden max-lg:h-[100px]">
        <div
          className="flex absolute gap-10  left-1/3 top-1/2 -translate-x-1/2 -translate-y-1/2 rotate-[7.5deg]"
          ref={trackRef}>
          {[
            'assets/logos/comptia.png',
            'assets/logos/nebosh.png',
            'assets/logos/GInI.png',
            'assets/logos/iosh.png',
            'assets/logos/axelos.png',
            'assets/logos/microsoft.png',
            'assets/logos/IQF.png',
            'assets/logos/IoSCM.png',
            'assets/logos/IFA.png'
          ].map((src, i) => (
            <div
              key={i}
              className="w-[160px] h-[160px] border border-secondary-400 bg-white rounded-[40px]  flex items-center justify-center skew-x-[-30deg] max-[1440px]:h-[105px] max-[1440px]:w-[105px] p-5">
              <img src={src} alt="" className=" object-contain" />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
