import { useRef, useState, useMemo } from 'react'
import * as THREE from 'three'
import { useThree } from '@react-three/fiber'
import { RippleEffect } from './RippleEffect'
import { SlideText } from './SlideText'

type Slide3DProps = {
  text: string
  baseColor?: THREE.ColorRepresentation
  rippleColor?: THREE.ColorRepresentation
  scale?: number | [number, number, number]
  isActive?: boolean
  offsetFromCenter?: number
  side?: 'left' | 'right'
  rippleCenterUv?: [number, number]
  waveFrequency?: number
  waveSpeed?: number
  waveDecay?: number
  rippleOpacity?: number
  rippleEmissiveIntensity?: number
}

export function Slide3D({
  text,
  baseColor = '#ed8a82',
  rippleColor = '#ed8a82',
  scale = 1,
  isActive = false,
  offsetFromCenter,
  side,
  rippleCenterUv,
  waveFrequency,
  waveSpeed,
  waveDecay,
  rippleOpacity,
  rippleEmissiveIntensity,
}: Slide3DProps) {
  const groupRef = useRef<THREE.Group>(null!)
  const meshRef = useRef<THREE.Mesh>(null)
  const [isHovered, setIsHovered] = useState(false)
  const { camera } = useThree()
  const baseScale = typeof scale === 'number' ? scale : scale[0]

  // Створюємо кольори
  const base = useMemo(() => new THREE.Color(baseColor), [baseColor])
  const ripple = useMemo(() => new THREE.Color(rippleColor), [rippleColor])

  // --- Створення геометрії (без змін) ---
  const roundedRectShape = useMemo(() => {
    const shape = new THREE.Shape()
    const width = 0.85
    const height = 0.6
    const radius = 0.05
    shape.moveTo(-width / 2 + radius, -height / 2)
    shape.lineTo(width / 2 - radius, -height / 2)
    shape.quadraticCurveTo(width / 2, -height / 2, width / 2, -height / 2 + radius)
    shape.lineTo(width / 2, height / 2 - radius)
    shape.quadraticCurveTo(width / 2, height / 2, width / 2 - radius, height / 2)
    shape.lineTo(-width / 2 + radius, height / 2)
    shape.quadraticCurveTo(-width / 2, height / 2, -width / 2, height / 2 - radius)
    shape.lineTo(-width / 2, -height / 2 + radius)
    shape.quadraticCurveTo(-width / 2, -height / 2, -width / 2 + radius, -height / 2)
    return shape
  }, [])

  const geometry = useMemo(
    () =>
      new THREE.ExtrudeGeometry(roundedRectShape, {
        depth: 0.01,
        bevelEnabled: true,
        bevelSize: 0.015,
        bevelThickness: 0.005,
        bevelSegments: 2,
        bevelOffset: 0
      }),
    [roundedRectShape]
  )

  const rippleCenter = rippleCenterUv || [0.5, 0.5]

  return (
    <group
      ref={groupRef}
      scale={scale}
      onPointerOver={() => setIsHovered(true)}
      onPointerOut={() => setIsHovered(false)}>
      {/* Фоновий меш */}
      <mesh ref={meshRef} geometry={geometry}>
        <meshPhysicalMaterial
          color={base}
          metalness={1}
          roughness={0.5}
          clearcoat={0.8}
          clearcoatRoughness={1}
          reflectivity={0.5}
          transparent={true}
          opacity={0.5}
          toneMapped={true}
          emissive={base}
          emissiveIntensity={0.01}
        />
      </mesh>

      {/* Хвилі */}
      <RippleEffect 
        geometry={geometry} 
        baseColor={base} 
        rippleColor={ripple} 
        rippleCenter={rippleCenter}
        waveFrequency={waveFrequency}
        waveSpeed={waveSpeed}
        waveDecay={waveDecay}
        opacity={rippleOpacity}
        emissiveIntensity={rippleEmissiveIntensity}
      />

      {/* Текст */}
      <SlideText 
        text={text} 
        offsetFromCenter={offsetFromCenter} 
        side={side} 
      />
    </group>
  )
}
