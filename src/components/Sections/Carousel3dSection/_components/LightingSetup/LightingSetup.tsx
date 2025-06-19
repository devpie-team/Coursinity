import { useMemo, useRef } from 'react'
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
  const mainLightingRef = useRef<THREE.Group>(null)
  const slideLightingRef = useRef<THREE.Group>(null)

  return (
    <group>
      {/* Основне освітлення */}
      <group ref={mainLightingRef}>
        <ambientLight intensity={0.3} />
        <directionalLight
          position={[5, 5, 5]}
          intensity={0.8}
          castShadow
          shadow-mapSize-width={2048}
          shadow-mapSize-height={2048}
        />
        <pointLight position={[-5, 5, 5]} intensity={0.5} />
        <pointLight position={[5, -5, 5]} intensity={0.3} />
        <pointLight position={[-5, -5, -5]} intensity={0.2} />
      </group>

      {/* Додаткове освітлення для слайдів */}
      <group ref={slideLightingRef}>
        <pointLight position={[0, 2, 2]} intensity={0.8} color="#ffffff" distance={10} decay={2} />
        <spotLight position={[0, 3, 0]} intensity={0.6} angle={Math.PI / 4} penumbra={0.3} castShadow />
      </group>
    </group>
  )
}
