'use client'

import { useRef, memo } from 'react'
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
}

export const AnimatedSlide = memo(
  ({ index, data, scrollProgressRef, fixedPositions, isMobile, spiralParams }: AnimatedSlideProps) => {
    const groupRef = useRef<Group>(null)

    useFrame(() => {
      if (!groupRef.current) return
      const rotation = scrollProgressRef.current.value

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
      groupRef.current.position.set(x, y, z)
      groupRef.current.rotation.set(0, rotationY, -0.05)

      const distanceFromCamera = Math.sqrt(x * x + (z - 2) * (z - 2))
      const normalizedDistance = Math.min(distanceFromCamera / (radius * 2), 1)
      const proximityOpacity = Math.max(isMobile ? 0.4 : 0.3, 1.2 - normalizedDistance)
      const heightOpacity = Math.max(isMobile ? 0.5 : 0.4, 1.0 + (y - circleCenter[1]) * 0.05)
      const opacity = Math.min(proximityOpacity, heightOpacity)

      groupRef.current.traverse((child: Object3D) => {
        if (child instanceof Mesh && child.material && 'opacity' in child.material) {
          child.material.opacity = opacity
          child.material.transparent = true
        }
      })
    })

    return (
      <group ref={groupRef}>
        <Slide3D text={data.text} scale={isMobile ? 0.7 : 1.0} />
      </group>
    )
  }
)
AnimatedSlide.displayName = 'AnimatedSlide'
