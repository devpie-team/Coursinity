'use client'

import { useRef, memo, useState, useEffect } from 'react'
import { useFrame } from '@react-three/fiber'
import { Group, Mesh, Object3D } from 'three'
import { Slide3D } from '../Slide3D/Slide3d'
import { SlideData } from '../../types'

interface SpiralParams {
  radius: number
  verticalSpacing: number
  spiralTurns: number
  circleCenter: [number, number, number]
  totalSlides: number
  startOffset: number
  endOffset: number
}

interface AnimatedSlideProps {
  index: number
  data: SlideData
  locale: string
  scrollProgressRef: React.MutableRefObject<{ value: number }>
  fixedPositions: Array<{ x: number; y: number; z: number }>
  isMobile: boolean
  spiralParams: SpiralParams
  currentSlideIndex: number
  showModel?: boolean
  modelRotationY?: number
  modelPosition?: [number, number, number]
  waveFrequency?: number
  waveSpeed?: number
  waveDecay?: number
  rippleOpacity?: number
  rippleEmissiveIntensity?: number
  opacityFadePower?: number
  fadeStartDistance?: number
  fadeEndDistance?: number
}

export const AnimatedSlide = memo(
  ({
    index,
    data,
    locale,
    scrollProgressRef,
    fixedPositions,
    isMobile,
    spiralParams,
    currentSlideIndex,
    showModel = false,
    modelRotationY = 0,
    modelPosition = [0, 0, 0.1],
    waveFrequency,
    waveSpeed,
    waveDecay,
    rippleOpacity,
    rippleEmissiveIntensity,
    opacityFadePower,
    fadeStartDistance,
    fadeEndDistance
  }: AnimatedSlideProps) => {
    const groupRef = useRef<Group>(null)
    const [offsetFromCenter, setOffsetFromCenter] = useState(0)
    // Ripple center state
    const [rippleCenterUv, setRippleCenterUv] = useState<[number, number]>([0.5, 0.5])

    useFrame(() => {
      if (!groupRef.current) return
      const rotation = scrollProgressRef.current.value

      // Нормалізуємо різницю, враховуючи циклічність каруселі
      const totalSlides = spiralParams.totalSlides
      let signedOffset = index - rotation
      if (signedOffset < -totalSlides / 2) signedOffset += totalSlides
      if (signedOffset > totalSlides / 2) signedOffset -= totalSlides

      // Оновлюємо offsetFromCenter для анімації тексту
      setOffsetFromCenter(signedOffset)

      const { radius, verticalSpacing, circleCenter, startOffset } = spiralParams
      const slideOffset = index - rotation + startOffset
      const currentPositionIndex = Math.floor(slideOffset)
      const nextPositionIndex = currentPositionIndex + 1

      if (currentPositionIndex < 0 || nextPositionIndex >= fixedPositions.length) {
        groupRef.current.visible = false
        return
      }

      groupRef.current.visible = true
      const interpolationFactor = slideOffset - Math.floor(slideOffset)
      const currentPos = fixedPositions[currentPositionIndex]
      const nextPos = fixedPositions[nextPositionIndex]
      const x = currentPos.x + (nextPos.x - currentPos.x) * interpolationFactor
      const y = currentPos.y + (nextPos.y - currentPos.y) * interpolationFactor
      const z = currentPos.z + (nextPos.z - currentPos.z) * interpolationFactor

      const rotationY = Math.atan2(x - circleCenter[0], z - circleCenter[2])

      // Зробити центральний слайд ближче до камери з плавним переходом
      const maxZOffset = 0.05
      const transitionRange = 1.0 // Діапазон для плавного переходу
      const distanceFromCenter = Math.abs(signedOffset)
      const zOffset = Math.max(0, maxZOffset * (1 - distanceFromCenter / transitionRange))

      groupRef.current.position.set(x, y, z + zOffset)
      groupRef.current.rotation.set(0, rotationY, -0.05)
    })

    return (
      <group ref={groupRef}>
        <Slide3D
          text={data.text[locale as keyof typeof data.text] || data.text.en}
          baseColor={data.colors[1]}
          rippleColor={data.colors[2]}
          scale={isMobile ? 0.9 : 1.0}
          offsetFromCenter={Math.abs(offsetFromCenter)}
          side={offsetFromCenter < 0 ? 'left' : offsetFromCenter > 0 ? 'right' : undefined}
          isActive={Math.abs(offsetFromCenter) < 0.5}
          rippleCenterUv={[0, 0.8]}
          waveFrequency={waveFrequency}
          waveSpeed={waveSpeed}
          waveDecay={waveDecay}
          rippleOpacity={rippleOpacity}
          rippleEmissiveIntensity={rippleEmissiveIntensity}
          isMobile={isMobile}
          locale={locale}
          opacityFadePower={opacityFadePower}
          fadeStartDistance={fadeStartDistance}
          fadeEndDistance={fadeEndDistance}
        />
      </group>
    )
  }
)
AnimatedSlide.displayName = 'AnimatedSlide'
