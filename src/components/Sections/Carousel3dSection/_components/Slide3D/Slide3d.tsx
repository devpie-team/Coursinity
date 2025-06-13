import { Text } from '@react-three/drei'
import { useRef, useState, useMemo } from 'react'
import * as THREE from 'three'
import { useFrame } from '@react-three/fiber'

type Slide3DProps = {
  text: string
  position: [number, number, number]
  rotation: [number, number, number]
  scale?: number | [number, number, number]
  opacity?: number
}

export function Slide3D({ text, position, rotation, scale = 1, opacity = 1 }: Slide3DProps) {
  const meshRef = useRef<THREE.Mesh>(null)
  const groupRef = useRef<THREE.Group>(null)
  const borderMeshRef = useRef<THREE.Mesh>(null)
  const [isHovered, setIsHovered] = useState(false)
  const textRef = useRef<any>(null)

  // Convert scale prop to number if it's an array
  const baseScale = typeof scale === 'number' ? scale : scale[0]

  // Calculate distance from camera for effects
  const distanceFromCamera = useMemo(() => {
    const cameraPosition = new THREE.Vector3(0, 0, 2)
    const slidePosition = new THREE.Vector3(...position)
    return cameraPosition.distanceTo(slidePosition)
  }, [position])

  // Create gradient texture for text
  const textGradient = useMemo(() => {
    const canvas = document.createElement('canvas')
    canvas.width = 256
    canvas.height = 256
    const context = canvas.getContext('2d')!
    const gradient = context.createLinearGradient(0, 0, 256, 256)
    gradient.addColorStop(0, '#FFFFFF') // Pure white
    gradient.addColorStop(0.5, '#E6E6E6') // Light gray
    gradient.addColorStop(1, '#F5F5F5') // Off-white
    context.fillStyle = gradient
    context.fillRect(0, 0, 256, 256)
    const texture = new THREE.CanvasTexture(canvas)
    texture.needsUpdate = true
    return texture
  }, [])

  // Create gradient texture for background
  const gradientTexture = new THREE.CanvasTexture(
    (() => {
      const canvas = document.createElement('canvas')
      canvas.width = 256
      canvas.height = 256
      const context = canvas.getContext('2d')!
      const gradient = context.createLinearGradient(0, 0, 256, 256)
      gradient.addColorStop(0, '#4ac3ff')
      gradient.addColorStop(0.5, '#151d21')
      gradient.addColorStop(1, '#e591fa')
      context.fillStyle = gradient
      context.fillRect(0, 0, 256, 256)
      return canvas
    })()
  )
  gradientTexture.needsUpdate = true

  // Create rounded rectangle shape
  const roundedRectShape = new THREE.Shape()
  const width = 0.6
  const height = 0.4
  const radius = 0.05

  roundedRectShape.moveTo(-width / 2 + radius, -height / 2)
  roundedRectShape.lineTo(width / 2 - radius, -height / 2)
  roundedRectShape.quadraticCurveTo(width / 2, -height / 2, width / 2, -height / 2 + radius)
  roundedRectShape.lineTo(width / 2, height / 2 - radius)
  roundedRectShape.quadraticCurveTo(width / 2, height / 2, width / 2 - radius, height / 2)
  roundedRectShape.lineTo(-width / 2 + radius, height / 2)
  roundedRectShape.quadraticCurveTo(-width / 2, height / 2, -width / 2, height / 2 - radius)
  roundedRectShape.lineTo(-width / 2, -height / 2 + radius)
  roundedRectShape.quadraticCurveTo(-width / 2, -height / 2, -width / 2 + radius, -height / 2)

  // Create border shape (slightly larger than main shape)
  const borderShape = useMemo(() => {
    const shape = new THREE.Shape()
    const width = 0.62 // Трохи більше ніж основний shape (0.6)
    const height = 0.42 // Трохи більше ніж основний shape (0.4)
    const radius = 0.06 // Трохи більше ніж основний shape (0.05)

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

  const extrudeSettings = {
    steps: 1,
    depth: 0.01,
    bevelEnabled: true,
    bevelThickness: 0.01,
    bevelSize: 0.0001,
    bevelSegments: 0.5
  }

  useFrame(() => {
    if (groupRef.current) {
      // Smooth scale animation with respect to base scale
      const targetScale = isHovered ? baseScale * 1.15 : baseScale
      groupRef.current.scale.lerp(new THREE.Vector3(targetScale, targetScale, targetScale), 0.1)

      // Smooth Z rotation animation
      const targetZ = isHovered ? -0.05 : rotation[2]
      groupRef.current.rotation.z = THREE.MathUtils.lerp(groupRef.current.rotation.z, targetZ, 0.1)

      // Subtle text animation
      if (textRef.current) {
        const time = Date.now() * 0.001
        textRef.current.position.z = 0.01 + Math.sin(time) * 0.002
        textRef.current.material.opacity = opacity * (0.9 + Math.sin(time * 2) * 0.1)
      }

      // Update material properties based on distance
      if (meshRef.current && borderMeshRef.current) {
        const material = meshRef.current.material as THREE.MeshPhysicalMaterial
        const borderMaterial = borderMeshRef.current.material as THREE.MeshPhysicalMaterial
        const distanceEffect = Math.max(0, Math.min(1, (distanceFromCamera - 1) / 2))

        // Налаштування для ближніх слайдів (перші 3)
        if (distanceFromCamera < 1.4) {
          material.opacity = 0.5 * opacity * (1 + (1.5 - distanceFromCamera) * 0.3)
          material.emissiveIntensity = 0.2 + (1.5 - distanceFromCamera) * 0.3
          material.metalness = 0.5
          material.roughness = 0.3

          // Бордер для ближніх слайдів
          if (borderMaterial) {
            borderMaterial.opacity = 0.15 * opacity * (1 + (1.5 - distanceFromCamera) * 0.3)
            borderMaterial.emissiveIntensity = 0.5 + (1.5 - distanceFromCamera) * 0.5
          }
        }
        // Налаштування для дальніх слайдів
        else {
          material.opacity = 0.3 * opacity * (1 - distanceEffect * 0.5)
          material.emissiveIntensity = 0.2 * (1 - distanceEffect)
          material.metalness = 0.5 + distanceEffect * 0.5
          material.roughness = 0.6 + distanceEffect * 0.8

          // Бордер для дальніх слайдів
          if (borderMaterial) {
            borderMaterial.opacity = 0.15 * opacity * (1 - distanceEffect * 0.7)
            borderMaterial.emissiveIntensity = 0.5 * (1 - distanceEffect * 0.8)
          }
        }
      }
    }
  })

  return (
    <group
      ref={groupRef}
      position={position}
      rotation={[rotation[0], rotation[1], rotation[2]]}
      scale={scale}
      onPointerOver={() => setIsHovered(true)}
      onPointerOut={() => setIsHovered(false)}>
      {/* Border mesh */}
      <mesh ref={borderMeshRef} position={[0, 0, -0.001]} receiveShadow>
        <extrudeGeometry args={[borderShape, { ...extrudeSettings, depth: 0.005 }]} />
        <meshPhysicalMaterial
          transparent={true}
          opacity={0.15 * opacity}
          map={gradientTexture}
          side={THREE.DoubleSide}
          depthWrite={false}
          metalness={0.3}
          roughness={0.5}
          emissive={new THREE.Color(0x000000)}
          emissiveIntensity={0.5}
        />
      </mesh>

      {/* Main mesh */}
      <mesh ref={meshRef} position={[0, 0, 0]} receiveShadow castShadow>
        <extrudeGeometry args={[roundedRectShape, extrudeSettings]} />
        <meshPhysicalMaterial
          transparent={true}
          opacity={0.3 * opacity}
          map={gradientTexture}
          side={THREE.DoubleSide}
          depthWrite={false}
          metalness={0.5}
          roughness={0.2}
          emissive={new THREE.Color(0x000000)}
          emissiveIntensity={0.2}
        />
      </mesh>

      {/* Main text with gradient and glow */}
      <Text
        ref={textRef}
        position={[0, 0, 0.01]}
        fontSize={0.04}
        anchorX="center"
        anchorY="middle"
        material-transparent={true}
        material-map={textGradient}
        material-opacity={opacity}
        material-toneMapped={false}
        material-blending={THREE.AdditiveBlending}>
        {text}
      </Text>

      {/* Glow effect */}
      <Text
        position={[0, 0, 0.01]}
        fontSize={0.041}
        anchorX="center"
        anchorY="middle"
        material-transparent={true}
        material-color="#FFFFFF"
        material-opacity={opacity * 0.3}
        material-toneMapped={false}
        material-blending={THREE.AdditiveBlending}>
        {text}
      </Text>
    </group>
  )
}
