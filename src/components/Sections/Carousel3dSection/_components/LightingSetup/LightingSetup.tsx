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

      {/* Front lights for slides */}
      <pointLight
        position={[-0.05, 0.3, 1.5]}
        intensity={0.2}
        color="#A578F2" // Фіолетовий
        distance={3}
        decay={1.5}
      />
      <spotLight
        position={[-0.05, -0.5, 1.5]}
        intensity={0.1}
        color="#1C8DC1" // Синій
        distance={3}
        decay={1.5}
      />

      {/* Static orbital lights */}
      <pointLight
        position={[3.5, 2.5, 0]}
        intensity={2.5}
        color="#A578F2"
        distance={12}
        decay={1.2}
      />
      <pointLight
        position={[-2.5, -1.5, 0]}
        intensity={2}
        color="#1C8DC1"
        distance={10}
        decay={1}
      />

      {/* Static fill lighting */}
      <pointLight
        position={[0, -2, 1]}
        intensity={0.8}
        color="#4c1d95"
        distance={8}
        decay={2}
      />

      {/* Edge lighting for depth */}
      <pointLight
        position={[4, 0, -1]}
        intensity={1.2}
        color="#1e3a8a"
        distance={6}
        decay={1.5}
      />
      <pointLight
        position={[-4, 0, -1]}
        intensity={1.2}
        color="#3730a3"
        distance={6}
        decay={1.5}
      />

      {/* Original lighting setup */}
      <directionalLight castShadow position={[5, 3, 3]} intensity={1.5} />
      <directionalLight castShadow position={[8, 3, 3.5]} intensity={2} />
      <ambientLight position={[-3, 3, 10]} intensity={0.4} color="#f5ebd0" />
      <pointLight position={[0, 1, 1.6]} intensity={1} color="#faf6d4" distance={50} decay={10} castShadow />

      {/* Static spotlight */}
      <spotLight
        position={[2, 1, 0]}
        intensity={3}
        color="#8b5cf6"
        angle={0.6}
        penumbra={0.8}
        distance={4}
        decay={1.5}
        castShadow
      />

      {/* Static rim light */}
      <pointLight
        position={[0, 3, -2]}
        intensity={2}
        color="#3b82f6"
        distance={6}
        decay={2}
      />

      {/* Static ambient glow */}
      <pointLight
        position={[0, 0.5, 0.2]}
        intensity={1.5}
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
