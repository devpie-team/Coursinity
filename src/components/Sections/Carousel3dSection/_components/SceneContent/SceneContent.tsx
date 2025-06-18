'use client'

import { useRef, useState, useMemo, useEffect } from 'react'
import { useFrame } from '@react-three/fiber'
import { ParticlePlane } from '../ParticlePlane/ParticlePlane'
import { LightingSetup } from '../LightingSetup/LightingSetup'
import { AnimatedSlide } from '../AnimatedSlide/AnimatedSlide'
import { CentralPillar } from '../CentralPillar/CentralPillar'

interface SlideData {
  text: string
  colors: string[]
}

interface SpiralParams {
  radius: number
  verticalSpacing: number
  spiralTurns: number
  circleCenter: [number, number, number]
  totalSlides: number
  startOffset: number
  endOffset: number
}

interface SceneContentProps {
  isMobile: boolean
  scrollProgressRef: React.MutableRefObject<{ value: number }>
  slidesData: SlideData[]
}

export const SceneContent = ({ isMobile, scrollProgressRef, slidesData }: SceneContentProps) => {
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0)
  const effectStrengthRef = useRef(0)
  const lastRotationRef = useRef(0)
  const lastScrollTimeRef = useRef(Date.now())

  // Перевірка безпеки для slidesData
  const safeSlidesData = useMemo(() => {
    if (!slidesData || !Array.isArray(slidesData)) {
      console.warn('slidesData is not properly defined, using fallback data')
      return [
        { text: 'AI Transformation', colors: ['#FF6B6B', '#4ECDC4', '#45B7D1'] },
        { text: 'Immersive VR Labs', colors: ['#A8E6CF', '#DCEDC1', '#FFD3B6'] }
      ]
    }
    return slidesData.map((slide) => ({
      text: slide.text || 'Default Text',
      colors: Array.isArray(slide.colors) && slide.colors.length >= 3 ? slide.colors : ['#FF6B6B', '#4ECDC4', '#45B7D1']
    }))
  }, [slidesData])

  const spiralParams: SpiralParams = useMemo(
    () => ({
      radius: isMobile ? 0.6 : 1.4,
      verticalSpacing: 0.25,
      spiralTurns: isMobile ? 2 : 1.5,
      circleCenter: [0, -0.1, -0.4],
      totalSlides: safeSlidesData.length,
      startOffset: isMobile ? 8 : 10,
      endOffset: isMobile ? 8 : 10
    }),
    [isMobile, safeSlidesData.length]
  )

  const fixedPositions = useMemo(() => {
    const { radius, verticalSpacing, spiralTurns, circleCenter, totalSlides, startOffset, endOffset } = spiralParams
    const positions = []
    for (let pos = -startOffset; pos < totalSlides + endOffset; pos++) {
      const posProgress = pos / totalSlides
      const posAngle = posProgress * spiralTurns * 2 * Math.PI
      const x = circleCenter[0] + radius * Math.sin(posAngle)
      const z = circleCenter[2] + radius * Math.cos(posAngle)
      const y = circleCenter[1] - pos * verticalSpacing
      positions.push({ x, y, z })
    }
    return positions
  }, [spiralParams])

  useFrame(() => {
    const progress = scrollProgressRef.current.value
    const newIndex = Math.round((progress / safeSlidesData.length) * (safeSlidesData.length - 1))
    if (newIndex !== currentSlideIndex) setCurrentSlideIndex(newIndex)

    const currentTime = Date.now()
    const deltaTime = (currentTime - lastScrollTimeRef.current) / 1000
    const rotationDelta = Math.abs(progress - lastRotationRef.current)
    const velocity = rotationDelta / Math.max(deltaTime, 0.016)
    effectStrengthRef.current = Math.min(velocity * 2, 1)
    lastScrollTimeRef.current = currentTime
    lastRotationRef.current = progress
  })

  return (
    <>
      <LightingSetup
        rotation={scrollProgressRef.current.value}
        effectStrength={effectStrengthRef.current}
        currentSlideIndex={currentSlideIndex}
        slidesData={safeSlidesData}
      />
      <ParticlePlane
        position={[0, 0, -5]}
        startY={-4}
        endY={-3.4}
        width={8}
        height={4}
        depth={6}
        particleCount={isMobile ? 10000 : 16000}
        particleSize={0.01}
        randomness={150}
        waveIntensity={50}
        waveSpeed={0.01}
        scrollProgressRef={scrollProgressRef}
      />
      {safeSlidesData.map((slide, i) => (
        <AnimatedSlide
          key={i}
          index={i}
          data={slide}
          scrollProgressRef={scrollProgressRef}
          fixedPositions={fixedPositions}
          isMobile={isMobile}
          spiralParams={spiralParams}
          currentSlideIndex={currentSlideIndex}
        />
      ))}
      <CentralPillar scrollProgressRef={scrollProgressRef} circleCenter={spiralParams.circleCenter} />
    </>
  )
}
