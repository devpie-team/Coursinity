'use client'

import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export const LogoSlider = () => {
  const trackRef = useRef(null)
  const [isContainerHovered, setIsContainerHovered] = useState(false)

  // Default grayscale logos
  const defaultLogos = [
    'assets/logos/comptia.png',
    'assets/logos/nebosh.png',
    'assets/logos/GInI.png',
    'assets/logos/iosh.png',
    'assets/logos/axelos.png',
    'assets/logos/microsoft.png',
    'assets/logos/IQF.png',
    'assets/logos/IoSCM.png',
    'assets/logos/IFA.png'
  ]

  // Colored logos for hover state
  const coloredLogos = [
    'assets/logos/comptia_colored.png',
    'assets/logos/nebosh_colored.png',
    'assets/logos/GInI_colored.png',
    'assets/logos/iosh_colored.png',
    'assets/logos/axelos_colored.png',
    'assets/logos/microsoft_colored.png',
    'assets/logos/IQF_colored.png',
    'assets/logos/IoSCM_colored.png',
    'assets/logos/IFA_colored.png'
  ]

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
      <div
        className="relative h-[200px] border-4 border-secondary-400 rounded-[40px] w-full overflow-hidden max-lg:h-[100px] transition-all duration-500 ease-in-out cursor-pointer hover:shadow-lg"
        onMouseEnter={() => setIsContainerHovered(true)}
        onMouseLeave={() => setIsContainerHovered(false)}>
        <div
          className="flex absolute gap-10  left-1/3 top-1/2 -translate-x-1/2 -translate-y-1/2 rotate-[7.5deg]"
          ref={trackRef}>
          {defaultLogos.map((src, i) => (
            <div
              key={i}
              className={`w-[160px] h-[160px] border border-secondary-400 bg-white rounded-[40px] flex items-center justify-center skew-x-[-30deg] max-[1440px]:h-[105px] max-[1440px]:w-[105px] p-5 transition-all duration-500 ease-in-out `}>
              <div className="relative w-full h-full flex items-center justify-center">
                <img
                  src={src}
                  alt=""
                  className={`absolute object-contain transition-all duration-500 ease-in-out transform ${
                    isContainerHovered ? 'opacity-0 ' : 'opacity-100 '
                  }`}
                />
                <img
                  src={coloredLogos[i]}
                  alt=""
                  className={`absolute object-contain transition-all duration-500 ease-in-out transform ${
                    isContainerHovered ? 'opacity-100 ' : 'opacity-0 '
                  }`}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
