import { useMemo, useRef } from 'react'
import * as THREE from 'three'
import { SlideData } from '../../types'

interface LightingSetupProps {
  rotation: number
  effectStrength: number
  currentSlideIndex: number
  slidesData: SlideData[]
  isMobile: boolean
}

export function LightingSetup({
  rotation,
  effectStrength,
  currentSlideIndex,
  slidesData,
  isMobile
}: LightingSetupProps) {
  const mainLightingRef = useRef<THREE.Group>(null)
  const slideLightingRef = useRef<THREE.Group>(null)

  return (
    <group ref={mainLightingRef}>
      {/* Мʼяке загальне освітлення */}
      <ambientLight intensity={0.5} />
      <ambientLight intensity={0.25} />

      {/* Основне спрямоване світло з тінями */}
      <directionalLight position={[2, 4, 2]} intensity={2.2} shadow-bias={-0.0001} />

      {/* Кольоровий PointLight, який можна анімувати */}
      <pointLight
        position={[-3, 2, 3]}
        intensity={1}
        distance={10}
        color={slidesData?.[currentSlideIndex]?.colors?.[0] || '#84ff00'}
      />

      {/* Яскравий SpotLight для акценту */}
      <spotLight position={[0, 6, 4]} angle={0.5} intensity={1.5} color="#fff" />

      {/* Додаткове синьо-блакитне освітлення */}
      <spotLight position={isMobile ? [0, 1, 0.5] : [0, 1, 1]} intensity={isMobile ? 10 : 100} color={'#0b1736'} />
      <spotLight position={isMobile ? [0, -1, 0.5] : [0, -1, 1]} intensity={isMobile ? 10 : 100} color={'#0b1736'} />
      <spotLight position={isMobile ? [0, 0.5, 2.5] : [0, 0.5, 3]} intensity={20.2} distance={20} color={'#4b4359'} />
      <spotLight position={isMobile ? [0, -1, 3] : [0, -1, 3]} intensity={20.2} distance={3} color={'#4b4359'} />
    </group>
  )
}
