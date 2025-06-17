'use client'

import { useRef, memo, useState } from 'react'
import { useFrame } from '@react-three/fiber'
import { Group, Mesh, Object3D } from 'three'
import { Slide3D } from '../Slide3D/Slide3d'

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

interface AnimatedSlideProps {
  index: number
  data: SlideData
  scrollProgressRef: React.MutableRefObject<{ value: number }>
  fixedPositions: Array<{ x: number; y: number; z: number }>
  isMobile: boolean
  spiralParams: SpiralParams
  currentSlideIndex: number
}

export const AnimatedSlide = memo(
  ({
    index,
    data,
    scrollProgressRef,
    fixedPositions,
    isMobile,
    spiralParams,
    currentSlideIndex
  }: AnimatedSlideProps) => {
    const groupRef = useRef<Group>(null)
    const [offsetFromCenter, setOffsetFromCenter] = useState(0)

    useFrame(() => {
      if (!groupRef.current) return
      const rotation = scrollProgressRef.current.value

      // Нормалізуємо різницю, враховуючи циклічність каруселі
      const totalSlides = spiralParams.totalSlides
      let signedOffset = index - rotation
      if (signedOffset < -totalSlides / 2) signedOffset += totalSlides
      if (signedOffset > totalSlides / 2) signedOffset -= totalSlides
      console.log('signedOffset:', signedOffset)
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
      const distanceFromCenter = Math.abs(offsetFromCenter)
      const zOffset = Math.max(0, maxZOffset * (1 - distanceFromCenter / transitionRange))

      groupRef.current.position.set(x, y, z + zOffset)
      groupRef.current.rotation.set(0, rotationY, -0.05)
    })

    return (
      <group ref={groupRef}>
        <Slide3D
          text={data.text}
          baseColor={data.colors[1]}
          scale={isMobile ? 0.7 : 1.0}
          offsetFromCenter={Math.abs(offsetFromCenter)}
          side={offsetFromCenter < 0 ? 'left' : offsetFromCenter > 0 ? 'right' : undefined}
          isActive={Math.abs(offsetFromCenter) < 0.5}
        />
      </group>
    )
  }
)
AnimatedSlide.displayName = 'AnimatedSlide'
