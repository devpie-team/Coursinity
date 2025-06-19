'use client'

import { useRef, useState } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { ParticlePlane } from '../ParticlePlane/ParticlePlane'
import { LightingSetup } from '../LightingSetup/LightingSetup'
import { AnimatedSlide } from '../AnimatedSlide/AnimatedSlide'
import { CentralPillar } from '../CentralPillar/CentralPillar'
import { AnimatedModel } from '../AnimatedModel/AnimatedModel'
import { useSpiralParams } from '../hooks/useSpiralParams'
import { SlideData } from '../../types'

interface SceneContentProps {
  isMobile: boolean
  scrollProgressRef: React.MutableRefObject<{ value: number }>
  slidesData: SlideData[]
  locale: string
  waveFrequency?: number
  waveSpeed?: number
  waveDecay?: number
  rippleOpacity?: number
  rippleEmissiveIntensity?: number
}

export const SceneContent = ({
  isMobile,
  scrollProgressRef,
  slidesData,
  locale,
  waveFrequency,
  waveSpeed,
  waveDecay,
  rippleOpacity,
  rippleEmissiveIntensity
}: SceneContentProps) => {
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0)
  const effectStrengthRef = useRef(0)
  const lastRotationRef = useRef(0)
  const lastScrollTimeRef = useRef(Date.now())

  // Використовуємо хук для spiralParams та fixedPositions
  const { spiralParams, fixedPositions } = useSpiralParams(isMobile, slidesData)

  useFrame(() => {
    const progress = scrollProgressRef.current.value
    const newIndex = Math.round((progress / slidesData.length) * (slidesData.length - 1))

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
        startY={-2}
        endY={-0.6}
        width={8}
        height={4}
        depth={6}
        particleCount={isMobile ? 5000 : 8000}
        particleSize={0.01}
        randomness={150}
        waveIntensity={50}
        waveSpeed={0.01}
        scrollProgressRef={scrollProgressRef}
      />

      {/* 3D модель з правильним обертанням */}
      {/* <AnimatedModel scrollProgressRef={scrollProgressRef} /> */}

      {slidesData.map((slide, i) => (
        <AnimatedSlide
          key={i}
          index={i}
          data={slide}
          locale={locale}
          scrollProgressRef={scrollProgressRef}
          fixedPositions={fixedPositions}
          isMobile={isMobile}
          spiralParams={spiralParams}
          currentSlideIndex={currentSlideIndex}
          waveFrequency={waveFrequency}
          waveSpeed={waveSpeed}
          waveDecay={waveDecay}
          rippleOpacity={rippleOpacity}
          rippleEmissiveIntensity={rippleEmissiveIntensity}
        />
      ))}
      <CentralPillar
        scrollProgressRef={scrollProgressRef}
        circleCenter={spiralParams.circleCenter}
        isMobile={isMobile}
      />
    </>
  )
}
