'use client'

import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { MyModel } from '../Model/Model'

interface AnimatedModelProps {
  scrollProgressRef: React.MutableRefObject<{ value: number }>
}

export function AnimatedModel({ scrollProgressRef }: AnimatedModelProps) {
  const modelRef = useRef<THREE.Group>(null)

  useFrame((state) => {
    if (!modelRef.current) return

    const progress = scrollProgressRef.current.value
    const scrollTime = progress * 10
    const clockTime = state.clock.elapsedTime * 0.2
    const time = scrollTime + clockTime
    const effectiveTime = time * 0.3

    // Обертання моделі на основі скролу та часу
    modelRef.current.rotation.y = effectiveTime * 0.7

    // Перевертаємо модель догори ногами
    modelRef.current.rotation.x = Math.PI

    // Плавне опускання при скролі
    const startY = 1.5
    const endY = 0.2
    const currentY = startY - (progress / 5) * (startY - endY) // Ділимо на 5 для повільнішого опускання
    modelRef.current.position.y = currentY
  })

  return (
    <group>
      {/* SpotLight для моделі */}
      <group position={[0, 0, 0]}>
        <spotLight position={[0, 3, 0]} intensity={50} color="#4d2dc2" />
        <spotLight position={[0, 3, 0]} intensity={50} color="#A578F2" distance={0} decay={1.2} />
        <spotLight position={[0, -4, 0]} intensity={10} color="#ffffff" distance={0} decay={1.2} />
        <spotLight position={[0, 3, 4]} intensity={10} color="#440fbf" distance={0} decay={1.2} />
      </group>

      <group ref={modelRef}>
        <MyModel rotationY={0} position={[0, 3.4, 0]} />
      </group>
    </group>
  )
}
