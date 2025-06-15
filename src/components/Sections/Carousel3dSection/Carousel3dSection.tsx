'use client'

import { useRef, useEffect, useState } from 'react'
import { Canvas } from '@react-three/fiber'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { PerformanceMonitor } from '@react-three/drei'
import { SceneContent } from './_components/SceneContent/SceneContent'

gsap.registerPlugin(ScrollTrigger)

const slidesData = [
  { text: 'AI Transformation', colors: ['#0D0D0D', '#1C8DC1', '#A578F2'] },
  { text: 'Immersive VR Labs', colors: ['#0D0D0D', '#1E8DC2', '#A578F2'] },
  { text: 'Tailored Journeys', colors: ['#0D0D0D', '#64B5E6', '#A578F2'] },
  { text: 'Beyond-Class Engagement', colors: ['#0D0D0D', '#4BA3D8', '#A578F2'] },
  { text: 'Live Coaching', colors: ['#0D0D0D', '#1E8DC2', '#A578F2'] },
  { text: 'Reusable Programs', colors: ['#0D0D0D', '#64B5E6', '#A578F2'] },
  { text: 'Gamified Learning', colors: ['#0D0D0D', '#4BA3D8', '#A578F2'] },
  { text: 'On-Job Upskilling', colors: ['#0D0D0D', '#1C8DC1', '#A578F2'] },
  { text: 'Success Partners', colors: ['#0D0D0D', '#1C8DC1', '#A578F2'] },
  { text: 'Evergreen Paths', colors: ['#0D0D0D', '#1E8DC2', '#A578F2'] },
  { text: 'Hybrid Delivery', colors: ['#0D0D0D', '#64B5E6', '#A578F2'] },
  { text: 'Audit-Ready Compliance', colors: ['#0D0D0D', '#4BA3D8', '#A578F2'] },
  { text: 'White-Label Academies', colors: ['#0D0D0D', '#1E8DC2', '#A578F2'] },
  { text: 'Certifications', colors: ['#0D0D0D', '#64B5E6', '#A578F2'] }
]

const useMediaQuery = (query: string): boolean => {
  const [matches, setMatches] = useState(false)
  useEffect(() => {
    const media = window.matchMedia(query)
    if (media.matches !== matches) setMatches(media.matches)
    const listener = () => setMatches(media.matches)
    window.addEventListener('change', listener)
    return () => window.removeEventListener('change', listener)
  }, [matches, query])
  return matches
}

export function Carousel3dSection() {
  const isMobile = useMediaQuery('(max-width: 768px)')
  const sectionRef = useRef(null)
  const scrollProxy = useRef({ value: 0 })
  const [dpr, setDpr] = useState(1.5)

  useEffect(() => {
    const triggerLength = window.innerHeight * slidesData.length * 1.2
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top top',
        end: `+=${triggerLength}px`,
        pin: true,
        scrub: 1
      }
    })
    tl.to(scrollProxy.current, { value: slidesData.length, ease: 'none' })
    return () => {
      tl.kill()
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill())
    }
  }, [])

  return (
    <section
      ref={sectionRef}
      style={{ position: 'relative', height: '100vh', background: '#0D0D0D', overflow: 'hidden' }}>
      <div style={{ position: 'relative', height: '100vh', width: '100vw' }}>
        <Canvas
          shadows
          dpr={dpr}
          camera={{ position: [0, 0, isMobile ? 1.4 : 1.65], fov: isMobile ? 75 : 70 }}
          style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}>
          <PerformanceMonitor onIncline={() => setDpr(2)} onDecline={() => setDpr(1)}>
            <SceneContent isMobile={isMobile} scrollProgressRef={scrollProxy} slidesData={slidesData} />
          </PerformanceMonitor>
        </Canvas>
      </div>
    </section>
  )
}
