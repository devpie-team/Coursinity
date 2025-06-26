import * as THREE from 'three'
import { useRef, useMemo } from 'react'
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
  showHalfTorus?: boolean
  startAngle?: number
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
  scrollSpeed = 0.0001,
  showHalfTorus = false,
  startAngle = 0
}: TorusOfSpheresProps) {
  const meshRef = useRef<THREE.InstancedMesh>(null!)
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
    
    // Якщо showHalfTorus = true, створюємо частинки тільки для частини торуса
    const effectiveSphereCount = showHalfTorus ? Math.floor(sphereCount * 0.625) : sphereCount
    const angleRange = showHalfTorus ? Math.PI * 1.25 : Math.PI * 2
    
    for (let i = 0; i < effectiveSphereCount; i++) {
      const angle = startAngle + (i / effectiveSphereCount) * angleRange
      const randomOffset = {
        x: (Math.random() - 0.5) * randomness,
        y: (Math.random() - 0.5) * randomness,
        z: (Math.random() - 0.5) * randomness
      }
      const size = Math.random() * maxSphereSize
      const color = colorVariations[Math.floor(Math.random() * colorVariations.length)]
      const opacity = Math.random() * 0.7 + 0.3
      const speed = animationSpeed + Math.random() * 0.03

      data.push({
        initialAngle: angle,
        scrollAngle: 0,
        randomOffset,
        size,
        color,
        opacity,
        speed
      })
    }
    return data
  }, [sphereCount, maxSphereSize, randomness, animationSpeed, showHalfTorus, startAngle])

  // Створюємо атрибути для кольорів
  const instanceColors = useMemo(() => {
    const effectiveSphereCount = showHalfTorus ? Math.floor(sphereCount * 0.625) : sphereCount
    const colors = new Float32Array(effectiveSphereCount * 3)
    animationData.forEach((data, i) => data.color.toArray(colors, i * 3))
    return new THREE.InstancedBufferAttribute(colors, 3)
  }, [sphereCount, animationData, showHalfTorus])

  const dummy = new THREE.Object3D()

  useFrame((state) => {
    if (!meshRef.current) return

    const elapsedTime = state.clock.getElapsedTime()
    const scrollValue = scrollProgressRef.current.value
    const scrollDelta = scrollValue - lastScrollValue.current
    lastScrollValue.current = scrollValue

    animationData.forEach((d, i) => {
      d.scrollAngle += scrollDelta * -scrollSpeed
      let newAngle = d.initialAngle + d.scrollAngle + elapsedTime * d.speed
      
      // Якщо showHalfTorus = true, телепортуємо частинки
      if (showHalfTorus) {
        const endAngle = startAngle + Math.PI * 1.25
        // Якщо частинка виходить за межі частини торуса, телепортуємо її на початок
        if (newAngle > endAngle) {
          newAngle = startAngle + (newAngle - endAngle)
        } else if (newAngle < startAngle) {
          newAngle = endAngle - (startAngle - newAngle)
        }
      }

      dummy.position.set(
        radius * Math.cos(newAngle) + d.randomOffset.x,
        d.randomOffset.y,
        radius * Math.sin(newAngle) + d.randomOffset.z
      )
      dummy.scale.setScalar(d.size)
      dummy.updateMatrix()
      meshRef.current.setMatrixAt(i, dummy.matrix)
    })

    meshRef.current.instanceMatrix.needsUpdate = true
  })

  return (
    <instancedMesh 
      ref={meshRef} 
      args={[undefined, undefined, showHalfTorus ? Math.floor(sphereCount * 0.625) : sphereCount]} 
      position={position} 
      rotation={rotation}
    >
      <sphereGeometry args={[1, 8, 8]}>
        <primitive object={instanceColors} attach="attributes-color" />
      </sphereGeometry>
      <meshStandardMaterial
        vertexColors
        toneMapped={false}
        roughness={0.1}
        metalness={1}
        emissive={0x1e3a8a}
        emissiveIntensity={0.2}
        transparent={true}
        depthWrite={false}
      />
    </instancedMesh>
  )
}
