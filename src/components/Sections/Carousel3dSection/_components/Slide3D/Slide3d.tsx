import { Text } from '@react-three/drei'
import { useRef } from 'react'
import * as THREE from 'three'

type Slide3DProps = {
  text: string
  position: [number, number, number]
  rotation: [number, number, number]
  scale?: number | [number, number, number]
  opacity?: number
}

export function Slide3D({ text, position, rotation, scale = 1, opacity = 1 }: Slide3DProps) {
  const meshRef = useRef<THREE.Mesh>(null)

  // Create gradient texture
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
  const width = 0.9
  const height = 0.6
  const radius = 0.1

  roundedRectShape.moveTo(-width / 2 + radius, -height / 2)
  roundedRectShape.lineTo(width / 2 - radius, -height / 2)
  roundedRectShape.quadraticCurveTo(width / 2, -height / 2, width / 2, -height / 2 + radius)
  roundedRectShape.lineTo(width / 2, height / 2 - radius)
  roundedRectShape.quadraticCurveTo(width / 2, height / 2, width / 2 - radius, height / 2)
  roundedRectShape.lineTo(-width / 2 + radius, height / 2)
  roundedRectShape.quadraticCurveTo(-width / 2, height / 2, -width / 2, height / 2 - radius)
  roundedRectShape.lineTo(-width / 2, -height / 2 + radius)
  roundedRectShape.quadraticCurveTo(-width / 2, -height / 2, -width / 2 + radius, -height / 2)

  const extrudeSettings = {
    steps: 1,
    depth: 0.01,
    bevelEnabled: true,
    bevelThickness: 0.02,
    bevelSize: 0,
    bevelSegments: 5
  }

  return (
    <group position={position} rotation={rotation} scale={scale}>
      <mesh position={[0, 0, 0]} receiveShadow castShadow>
        <extrudeGeometry args={[roundedRectShape, extrudeSettings]} />
        <meshPhysicalMaterial
          transparent={true}
          opacity={0.3 * opacity}
          map={gradientTexture}
          side={THREE.DoubleSide}
          depthWrite={false}
        />
      </mesh>

      <Text
        position={[0, 0, 0.02]}
        fontSize={0.07}
        color="#FFFFFF"
        anchorX="center"
        anchorY="middle"
        material-opacity={opacity}
        material-transparent={true}>
        {text}
      </Text>
    </group>
  )
}
