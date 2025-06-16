'use client'

import { useRef, useState, useMemo, useEffect } from 'react'
import { useFrame } from '@react-three/fiber'
import { ParticlePlane } from '../ParticlePlane/ParticlePlane'
import { LightingSetup } from '../LightingSetup/LightingSetup'
import { AnimatedSlide } from '../AnimatedSlide/AnimatedSlide'

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

  const spiralParams: SpiralParams = useMemo(
    () => ({
      radius: isMobile ? 0.6 : 1.4,
      verticalSpacing: 0.25,
      spiralTurns: isMobile ? 2 : 1.5,
      circleCenter: [0, -0.1, -0.4],
      totalSlides: slidesData.length,
      startOffset: isMobile ? 8 : 10,
      endOffset: isMobile ? 8 : 10
    }),
    [isMobile, slidesData.length]
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
    const newIndex = Math.round((progress / slidesData.length) * (slidesData.length - 1))
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
        slidesData={slidesData}
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
      {slidesData.map((slide, i) => (
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
    </>
  )
}
