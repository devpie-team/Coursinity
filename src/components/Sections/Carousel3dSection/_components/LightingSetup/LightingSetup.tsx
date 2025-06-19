import { useMemo, useRef } from 'react'
import * as THREE from 'three'
import { SlideData } from '../../types'

interface LightingSetupProps {
  rotation: number
  effectStrength: number
  currentSlideIndex: number
  slidesData: SlideData[]
}

export function LightingSetup({ rotation, effectStrength, currentSlideIndex, slidesData }: LightingSetupProps) {
  const mainLightingRef = useRef<THREE.Group>(null)
  const slideLightingRef = useRef<THREE.Group>(null)

  return (
    <group ref={mainLightingRef}>
      {/* Мʼяке загальне освітлення */}
      <ambientLight intensity={0.5} />

      {/* Основне спрямоване світло з тінями */}
      <directionalLight
        position={[2, 4, 2]}
        intensity={2.2}
        castShadow
        shadow-mapSize-width={1024}
        shadow-mapSize-height={1024}
        shadow-bias={-0.0001}
      />

      {/* Кольоровий PointLight, який можна анімувати */}
      <pointLight
        position={[-3, 2, 3]}
        intensity={1}
        distance={10}
        color={slidesData?.[currentSlideIndex]?.colors?.[0] || '#84ff00'}
      />

      {/* Яскравий SpotLight для акценту */}
      <spotLight
        position={[0, 6, 4]}
        angle={0.5}
        penumbra={0.7}
        intensity={1.5}
        color="#fff"
        castShadow
        shadow-mapSize-width={1024}
        shadow-mapSize-height={1024}
      />

      {/* Додаткове синьо-блакитне освітлення */}
      <spotLight position={[1, 1, 0]} intensity={800.2} color={'#0b1736'} />
      <spotLight position={[0, 0.5, 3]} intensity={100.2} distance={3} color={'#423b57'} />
      <spotLight position={[0, -1, 3]} intensity={100.2} distance={3} color={'#423b57'} />
    </group>
  )
}
