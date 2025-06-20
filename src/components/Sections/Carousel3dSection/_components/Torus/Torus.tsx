import * as THREE from 'three'
import { useMemo, useRef } from 'react'
import { useFrame } from '@react-three/fiber'

type TorusOfSpheresProps = {
  radius?: number
  sphereCount?: number
  maxSphereSize?: number
  randomness?: number
  position?: [number, number, number]
  rotation?: [number, number, number]
  scrollProgressRef: React.MutableRefObject<{ value: number }>
  animationSpeed?: number
  scrollSpeed?: number
}

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
  const meshRef = useRef<THREE.InstancedMesh>(null!)
  const lastScrollValue = useRef(0)

  // Створюємо дані для анімації один раз
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
      const speed = animationSpeed + Math.random() * 0.03

      data.push({
        initialAngle: angle,
        scrollAngle: 0,
        randomOffset,
        size,
        color,
        speed
      })
    }
    return data
  }, [sphereCount, randomness, maxSphereSize, animationSpeed])

  // Створюємо атрибути для кольорів
  const instanceColors = useMemo(() => {
    const colors = new Float32Array(sphereCount * 3)
    animationData.forEach((data, i) => data.color.toArray(colors, i * 3))
    return new THREE.InstancedBufferAttribute(colors, 3)
  }, [sphereCount, animationData])

  // Оптимізована анімація з використанням Object3D для оновлення матриць
  useFrame((state) => {
    if (!meshRef.current) return

    const elapsedTime = state.clock.getElapsedTime()
    const scrollValue = scrollProgressRef.current.value
    const scrollDelta = scrollValue - lastScrollValue.current
    lastScrollValue.current = scrollValue

    const tempObject = new THREE.Object3D()

    // Оновлюємо тільки матриці, не позиції окремо
    for (let i = 0; i < sphereCount; i++) {
      const data = animationData[i]
      data.scrollAngle += scrollDelta * -scrollSpeed

      const newAngle = data.initialAngle + data.scrollAngle + elapsedTime * data.speed

      tempObject.position.set(
        radius * Math.cos(newAngle) + data.randomOffset.x,
        data.randomOffset.y,
        radius * Math.sin(newAngle) + data.randomOffset.z
      )
      tempObject.scale.setScalar(data.size)
      tempObject.updateMatrix()
      meshRef.current.setMatrixAt(i, tempObject.matrix)
    }

    meshRef.current.instanceMatrix.needsUpdate = true
  })

  return (
    <instancedMesh ref={meshRef} args={[undefined, undefined, sphereCount]} position={position} rotation={rotation}>
      <sphereGeometry args={[1, 8, 8]}>
        <primitive object={instanceColors} attach="attributes-color" />
      </sphereGeometry>
      <meshStandardMaterial
        roughness={0.1}
        metalness={1}
        emissive={0x1e3a8a}
        emissiveIntensity={0.2}
        vertexColors={true}
        transparent={true}
        opacity={0.7}
        depthWrite={false}
      />
    </instancedMesh>
  )
}
