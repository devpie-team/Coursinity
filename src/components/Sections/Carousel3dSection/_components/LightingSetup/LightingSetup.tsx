import { useMemo } from 'react'
import * as THREE from 'three'

interface LightingSetupProps {
  rotation: number
  effectStrength: number
  currentSlideIndex: number
  slidesData: Array<{
    colors: string[]
  }>
}

export function LightingSetup({ rotation, effectStrength, currentSlideIndex, slidesData }: LightingSetupProps) {
  return (
    <>
      <fog attach="fog" args={['#0D0D0D', 8, 15]} />

      {/* Dynamic orbital lights that respond to scroll */}
      <pointLight
        position={[Math.sin(rotation * 1.3) * 3.5, 2.5, Math.cos(rotation * 1.3) * 3.5]}
        intensity={2.5 + effectStrength * 2}
        color={`hsl(${280 + rotation * 20}, 70%, 65%)`}
        distance={12}
        decay={1.2}
      />
      <pointLight
        position={[-Math.sin(rotation * 0.8) * 2.5, -1.5, -Math.cos(rotation * 0.8) * 2.5]}
        intensity={2 + effectStrength}
        color={`hsl(${200 + rotation * 15}, 80%, 60%)`}
        distance={10}
        decay={1}
      />

      {/* Subtle fill lighting that breathes */}
      <pointLight
        position={[0, -2, 1]}
        intensity={0.8 + Math.sin(rotation * 2) * 0.3}
        color="#4c1d95"
        distance={8}
        decay={2}
      />

      {/* Edge lighting for depth */}
      <pointLight
        position={[4, 0, -1]}
        intensity={1.2 + effectStrength * 0.8}
        color="#1e3a8a"
        distance={6}
        decay={1.5}
      />
      <pointLight
        position={[-4, 0, -1]}
        intensity={1.2 + effectStrength * 0.8}
        color="#3730a3"
        distance={6}
        decay={1.5}
      />

      {/* Original lighting setup */}
      <directionalLight castShadow position={[5, 3, 3]} intensity={1.5} />
      <directionalLight castShadow position={[30, 3, 3]} intensity={3} />
      <ambientLight position={[-3, 3, 10]} intensity={0.4} color="#f5ebd0" />
      <pointLight position={[0, 1, 1.6]} intensity={1} color="#faf6d4" distance={50} decay={2} castShadow />

      {/* Rotating color-changing spotlight */}
      <spotLight
        position={[Math.cos(rotation * 2) * 2, 1, Math.sin(rotation * 2) * 2]}
        intensity={3 + Math.sin(rotation * 3) * 1.5}
        color={`hsl(${(rotation * 60) % 360}, 80%, 60%)`}
        angle={0.6}
        penumbra={0.8}
        distance={4}
        decay={1.5}
        castShadow
      />

      {/* Pulsing rim light */}
      <pointLight
        position={[0, 3, -2]}
        intensity={2 + Math.sin(rotation * 4) * 1}
        color="#3b82f6"
        distance={6}
        decay={2}
      />

      {/* Ambient glow that follows active slide */}
      <pointLight
        position={[
          Math.sin((rotation * (2 * Math.PI)) / slidesData.length) * 1.5,
          0.5,
          0.2 + Math.cos((rotation * (2 * Math.PI)) / slidesData.length) * 1.5
        ]}
        intensity={1.5 + effectStrength}
        color="#8b5cf6"
        distance={3}
        decay={1}
      />
      <spotLight
        position={[0, -1.1, 1.1]}
        intensity={1.5}
        color="#726bff"
        angle={0.8}
        penumbra={0.5}
        distance={2}
        decay={2}
        castShadow
      />
    </>
  )
} 