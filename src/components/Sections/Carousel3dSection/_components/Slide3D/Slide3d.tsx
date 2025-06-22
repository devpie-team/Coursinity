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
  isMobile?: boolean
  locale?: string
  opacityFadePower?: number
  fadeStartDistance?: number
  fadeEndDistance?: number
}

export function Slide3D({
  text,
  baseColor = '#000000',
  rippleColor = '#ffffff',
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
  isMobile = false,
  locale,
  opacityFadePower,
  fadeStartDistance,
  fadeEndDistance
}: Slide3DProps) {
  const groupRef = useRef<THREE.Group>(null!)
  const meshRef = useRef<THREE.Mesh>(null)
  const [isHovered, setIsHovered] = useState(false)
  const { camera } = useThree()
  const baseScale = typeof scale === 'number' ? scale : scale[0]

  // Створюємо кольори
  const base = useMemo(() => new THREE.Color(baseColor), [baseColor])
  const ripple = useMemo(() => new THREE.Color(rippleColor), [rippleColor])

  // Створюємо градієнтну текстуру для слайда
  const gradientTexture = useMemo(() => {
    const canvas = document.createElement('canvas')
    const ctx = canvas.getContext('2d')!

    canvas.width = 256
    canvas.height = 256

    // Створюємо радіальний градієнт
    const gradient = ctx.createRadialGradient(128, 128, 0, 128, 128, 128)
    gradient.addColorStop(0, String(baseColor))
    gradient.addColorStop(1, String(rippleColor))

    ctx.fillStyle = gradient
    ctx.fillRect(0, 0, canvas.width, canvas.height)

    const texture = new THREE.CanvasTexture(canvas)
    texture.needsUpdate = true

    return texture
  }, [baseColor, rippleColor])

  // --- Створення геометрії (без змін) ---
  const roundedRectShape = useMemo(() => {
    const shape = new THREE.Shape()
    const width = isMobile ? 0.5 : 0.85
    const height = isMobile ? 0.4 : 0.6
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
          map={gradientTexture}
          metalness={0.5}
          roughness={0.5}
          clearcoat={0.1}
          clearcoatRoughness={1}
          reflectivity={0.5}
          transparent={true}
          opacity={0.85}
          toneMapped={true}
          emissive={base}
          emissiveIntensity={0}
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
        isMobile={isMobile}
        locale={locale}
        opacityFadePower={opacityFadePower}
        fadeStartDistance={fadeStartDistance}
        fadeEndDistance={fadeEndDistance}
      />
    </group>
  )
}
