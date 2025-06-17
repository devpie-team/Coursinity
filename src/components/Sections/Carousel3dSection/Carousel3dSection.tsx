'use client'

import { useRef, useEffect, useState } from 'react'
import { Canvas } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { PerformanceMonitor } from '@react-three/drei'
import { SceneContent } from './_components/SceneContent/SceneContent'
import { useHeaderVisibility } from '@/components/Header/HeaderVisibilityContext'

gsap.registerPlugin(ScrollTrigger)

const slidesData = [
  { text: 'AI Transformation', colors: ['#FF6B6B', '#4ECDC4', '#45B7D1'] },
  { text: 'Immersive VR Labs', colors: ['#A8E6CF', '#DCEDC1', '#FFD3B6'] },
  { text: 'Tailored Journeys', colors: ['#FF9A9E', '#FECFEF', '#FECFEF'] },
  { text: 'Beyond-Class Engagement', colors: ['#A8E6CF', '#FF8B94', '#FFC3A0'] },
  { text: 'Live Coaching', colors: ['#FFD93D', '#FF6B6B', '#4ECDC4'] },
  { text: 'Reusable Programs', colors: ['#6C5CE7', '#A29BFE', '#FD79A8'] },
  { text: 'Gamified Learning', colors: ['#00B894', '#00CEC9', '#74B9FF'] },
  { text: 'On-Job Upskilling', colors: ['#FDCB6E', '#E17055', '#D63031'] },
  { text: 'Success Partners', colors: ['#6C5CE7', '#A29BFE', '#FD79A8'] },
  { text: 'Evergreen Paths', colors: ['#00B894', '#00CEC9', '#74B9FF'] },
  { text: 'Hybrid Delivery', colors: ['#FDCB6E', '#E17055', '#D63031'] },
  { text: 'Audit-Ready Compliance', colors: ['#6C5CE7', '#A29BFE', '#FD79A8'] },
  { text: 'White-Label Academies', colors: ['#00B894', '#00CEC9', '#74B9FF'] },
  { text: 'Certifications', colors: ['#FDCB6E', '#E17055', '#D63031'] }
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

  const { hideHeaderForSection, showHeaderForSection } = useHeaderVisibility()
  const sectionId = useRef(Math.random()?.toString())

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          hideHeaderForSection(sectionId.current)
        } else {
          showHeaderForSection(sectionId.current)
        }
      },
      { threshold: 0.5 }
    )

    if (sectionRef.current) observer.observe(sectionRef.current)
    return () => {
      if (sectionRef.current) observer.unobserve(sectionRef.current)
      showHeaderForSection(sectionId.current)
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
          camera={{ position: [0, -0.1, isMobile ? 1.4 : 1.65], fov: isMobile ? 75 : 70 }}
          style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}>
          <PerformanceMonitor onIncline={() => setDpr(2)} onDecline={() => setDpr(1)}>
            {/*  <OrbitControls
              enableZoom={false}
              enablePan={false}
              minPolarAngle={Math.PI / 4}
              maxPolarAngle={Math.PI / 2}
              rotateSpeed={0.5}
            /> */}
            <SceneContent isMobile={isMobile} scrollProgressRef={scrollProxy} slidesData={slidesData} />
          </PerformanceMonitor>
        </Canvas>
      </div>
    </section>
  )
}
