import { Text } from '@react-three/drei'
import { useRef, useState, useMemo } from 'react'
import * as THREE from 'three'
import { useFrame } from '@react-three/fiber'

// Types
interface Slide3DProps {
  text: string
  position: [number, number, number]
  rotation: [number, number, number]
  scale?: number | [number, number, number]
  opacity?: number
  index: number
}

interface SlideGradient {
  main: [string, string]
}

// Gradient palette
const slideGradients: SlideGradient[] = [
  { main: ['#FF6B6B', '#FF8E8E'] }, // Кораловий
  { main: ['#9F7AEA', '#B794F4'] }, // Теплий фіолетовий
  { main: ['#48BB78', '#68D391'] }, // Теплий зелений
  { main: ['#63B3ED', '#90CDF4'] }, // Теплий голубий
  { main: ['#FF9F43', '#FFB976'] }, // Помаранчевий
  { main: ['#B794F4', '#C4B5FD'] }, // Світлий фіолетовий
  { main: ['#68D391', '#9AE6B4'] }, // Світлий зелений
  { main: ['#90CDF4', '#BEE3F8'] }, // Світлий голубий
  { main: ['#FF6B6B', '#FF8E8E'] }, // Червоний
  { main: ['#9F7AEA', '#B794F4'] }, // Фіолетовий
  { main: ['#48BB78', '#68D391'] }, // Зелений
  { main: ['#63B3ED', '#90CDF4'] }, // Голубий
  { main: ['#FF9F43', '#FFB976'] }, // Абрикосовий
  { main: ['#B794F4', '#C4B5FD'] } // Світлий фіолетовий
]

function createGradientTexture(colors: [string, string]) {
  const canvas = document.createElement('canvas')
  canvas.width = 256
  canvas.height = 256
  const ctx = canvas.getContext('2d')!
  const gradient = ctx.createLinearGradient(0, 0, 256, 256)
  gradient.addColorStop(0, colors[0])
  gradient.addColorStop(1, colors[1])
  ctx.fillStyle = gradient
  ctx.fillRect(0, 0, 256, 256)
  return new THREE.CanvasTexture(canvas)
}

function createTextGradientTexture() {
  return createGradientTexture(['#FFFFFF', '#F5F5F5'])
}

export function Slide3D({ text, position, rotation, scale = 1, opacity = 1, index }: Slide3DProps) {
  const groupRef = useRef<THREE.Group>(null)
  const textRef = useRef<any>(null)

  const colors = slideGradients[index % slideGradients.length]
  const mainTexture = useMemo(() => createGradientTexture(colors.main), [index])
  const textTexture = useMemo(() => createTextGradientTexture(), [])

  const roundedShape = useMemo(() => {
    const shape = new THREE.Shape()
    const w = 0.6,
      h = 0.4,
      r = 0.05
    shape.moveTo(-w / 2 + r, -h / 2)
    shape.lineTo(w / 2 - r, -h / 2)
    shape.quadraticCurveTo(w / 2, -h / 2, w / 2, -h / 2 + r)
    shape.lineTo(w / 2, h / 2 - r)
    shape.quadraticCurveTo(w / 2, h / 2, w / 2 - r, h / 2)
    shape.lineTo(-w / 2 + r, h / 2)
    shape.quadraticCurveTo(-w / 2, h / 2, -w / 2, h / 2 - r)
    shape.lineTo(-w / 2, -h / 2 + r)
    shape.quadraticCurveTo(-w / 2, -h / 2, -w / 2 + r, -h / 2)
    return shape
  }, [])

  return (
    <group ref={groupRef} position={position} rotation={rotation} scale={scale}>
      {/* Main Shape */}
      <mesh>
        <extrudeGeometry
          args={[
            roundedShape,
            {
              depth: 0.01,
              bevelEnabled: true,
              bevelThickness: 0.005,
              bevelSize: 0.01,
              bevelSegments: 2
            }
          ]}
        />
        <meshPhysicalMaterial map={mainTexture} metalness={0.6} roughness={0.3} transparent side={THREE.DoubleSide} />
      </mesh>

      {/* Text */}
      <Text
        ref={textRef}
        position={[0, 0, 0.04]}
        fontSize={0.04}
        anchorX="center"
        anchorY="middle"
        material-transparent
        material-map={textTexture}
        material-opacity={opacity}
        material-toneMapped={false}
        material-depthWrite={false}
        material-side={THREE.DoubleSide}
        material-blending={THREE.AdditiveBlending}
        material-vertexColors>
        {text}
      </Text>

      {/* Glow */}
      <Text
        position={[0, 0, 0.041]}
        fontSize={0.041}
        anchorX="center"
        anchorY="middle"
        material-transparent
        material-color="#FFFFFF"
        material-opacity={opacity * 0.3}
        material-toneMapped={false}
        material-depthWrite={false}
        material-side={THREE.DoubleSide}
        material-blending={THREE.AdditiveBlending}
        material-vertexColors>
        {text}
      </Text>
    </group>
  )
}
