import * as THREE from 'three'
import { useMemo, useRef, forwardRef } from 'react'
import { useFrame } from '@react-three/fiber'

type TorusOfSpheresProps = {
  radius?: number
  sphereCount?: number
  maxSphereSize?: number
  randomness?: number
  position?: [number, number, number]
  rotation?: [number, number, number] // Обертання торуса
  scrollProgressRef: React.MutableRefObject<{ value: number }>
  animationSpeed?: number // Швидкість анімації кульок
  scrollSpeed?: number // Швидкість реакції на скрол
}

// Компонент однієї кульки, що приймає ref
const Sphere = forwardRef<
  THREE.Mesh,
  { position: [number, number, number]; size: number; color: THREE.Color; opacity: number }
>(({ position, size, color, opacity }, ref) => {
  return (
    <mesh ref={ref} position={position}>
      <sphereGeometry args={[size, 16, 16]} />
      <meshStandardMaterial
        color={color}
        roughness={0.1}
        metalness={1}
        emissive={color}
        emissiveIntensity={0.2}
        transparent={true}
        opacity={opacity}
      />
    </mesh>
  )
})
Sphere.displayName = 'Sphere'

export function Torus({
  radius = 2.7,
  sphereCount = 1000,
  maxSphereSize = 0.01,
  randomness = 0.2,
  position = [0, 0, 0],
  rotation = [0, 0, 0],
  scrollProgressRef,
  animationSpeed = 0.0001,
  scrollSpeed = 0.0001
}: TorusOfSpheresProps) {
  const groupRef = useRef<THREE.Group>(null!)
  const lastScrollValue = useRef(0)

  const animationData = useMemo(() => {
    const data = []
    const colorVariations = [
      new THREE.Color(0x1e3a8a),
      new THREE.Color(0x3b82f6),
      new THREE.Color(0x60a5fa),
      new THREE.Color(0x93c5fd),
      new THREE.Color(0x06b6d4),
      new THREE.Color(0x6366f1),
      new THREE.Color(0x8b5cf6),
      new THREE.Color(0x5b21b6)
    ]
    for (let i = 0; i < sphereCount; i++) {
      const angle = (i / sphereCount) * Math.PI * 2
      const randomOffset = {
        x: (Math.random() - 0.5) * randomness,
        y: (Math.random() - 0.5) * randomness,
        z: (Math.random() - 0.5) * randomness
      }
      const size = Math.random() * maxSphereSize
      const color = colorVariations[Math.floor(Math.random() * colorVariations.length)]
      const opacity = Math.random() * 0.7 + 0.3
      const speed = animationSpeed + Math.random() * 0.03 // Випадкова швидкість для кожної кульки

      data.push({
        initialAngle: angle,
        scrollAngle: 0, // Окремий кут для скролу
        randomOffset,
        size,
        color,
        opacity,
        speed
      })
    }
    return data
  }, [radius, sphereCount, maxSphereSize, randomness, animationSpeed])

  useFrame((state) => {
    const elapsedTime = state.clock.getElapsedTime()

    // Обробка скролу
    const scrollValue = scrollProgressRef.current.value
    const scrollDelta = scrollValue - lastScrollValue.current
    lastScrollValue.current = scrollValue

    groupRef.current.children.forEach((mesh, i) => {
      const data = animationData[i]
      if (mesh && data) {
        // Оновлюємо кут скролу для кожної кульки окремо
        data.scrollAngle += scrollDelta * -scrollSpeed

        const newAngle = data.initialAngle + data.scrollAngle + elapsedTime * data.speed
        mesh.position.set(
          radius * Math.cos(newAngle) + data.randomOffset.x,
          data.randomOffset.y,
          radius * Math.sin(newAngle) + data.randomOffset.z
        )
      }
    })
  })

  return (
    <group ref={groupRef} position={position} rotation={rotation}>
      {animationData.map((props, i) => (
        <Sphere
          key={i}
          position={[
            radius * Math.cos(props.initialAngle) + props.randomOffset.x,
            props.randomOffset.y,
            radius * Math.sin(props.initialAngle) + props.randomOffset.z
          ]}
          {...props}
        />
      ))}
    </group>
  )
}
