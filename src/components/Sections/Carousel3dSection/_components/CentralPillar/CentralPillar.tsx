import { useRef, useMemo } from 'react'
import * as THREE from 'three'
import { useFrame } from '@react-three/fiber'

interface CentralPillarProps {
  scrollProgressRef: React.MutableRefObject<{ value: number }>
  circleCenter?: [number, number, number]
}

export function CentralPillar({ scrollProgressRef, circleCenter = [0, -0.1, -0.4] }: CentralPillarProps) {
  const groupRef = useRef<THREE.Group>(null)
  const meshRef = useRef<THREE.InstancedMesh>(null)

  // Параметри частинок стовпа
  const particleCount = 5000
  const pillarHeight = 8
  const pillarWidth = 1.3
  const particleSize = 0.08

  // Створюємо геометрію для кожної частинки
  const particleGeometry = useMemo(() => {
    return new THREE.BoxGeometry(particleSize, particleSize, particleSize)
  }, [particleSize])

  // Створюємо позиції частинок у формі стовпа
  const { positions, colors, speeds, sizes } = useMemo(() => {
    const tempPositions = []
    const tempColors = []
    const tempSpeeds = []
    const tempSizes = []

    // Кольори для частинок стовпа
    const colorVariations = [
      new THREE.Color(0x9400d3), // Темно-фіолетовий
      new THREE.Color(0x8a2be2), // Синьо-фіолетовий (blueviolet)
      new THREE.Color(0x7fffd4), // Бірюзовий блиск (aquamarine)
      new THREE.Color(0xdb7093), // Блідо-рожевий (pale violet red)
      new THREE.Color(0x00ffff), // Ціан (glow-style)
      new THREE.Color(0xff69b4), // Яскраво-рожевий (hotpink)
      new THREE.Color(0x1e90ff), // Світлий синій (dodger blue)
      new THREE.Color(0xba55d3), // Орхідея
      new THREE.Color(0xff1493), // Насичений рожевий
      new THREE.Color(0x483d8b), // Темний фіолетово-синій
      new THREE.Color(0xe0ffff)
    ]

    // Розподіляємо частинки по стовпу
    const particlesPerLayer = Math.floor(particleCount / (pillarHeight / particleSize))
    const layers = Math.floor(pillarHeight / particleSize)

    for (let layer = 0; layer < layers; layer++) {
      const y = (layer - layers / 2) * particleSize

      for (let i = 0; i < particlesPerLayer; i++) {
        // Розподіляємо частинки по квадрату в кожному шарі
        const x = (Math.random() - 0.5) * pillarWidth
        const z = (Math.random() - 0.5) * pillarWidth

        // Додаємо трохи випадковості для більш органічного вигляду
        const randomOffsetX = (Math.random() - 0.5) * particleSize * 0.3
        const randomOffsetY = (Math.random() - 0.5) * particleSize * 0.3
        const randomOffsetZ = (Math.random() - 0.5) * particleSize * 0.3

        tempPositions.push(x + randomOffsetX, y + randomOffsetY, z + randomOffsetZ)

        // Вибираємо випадковий колір
        const colorIndex = Math.floor(Math.random() * colorVariations.length)
        const color = colorVariations[colorIndex]
        tempColors.push(color.r, color.g, color.b)

        // Створюємо індивідуальну швидкість для кожної частинки
        const globalIndex = layer * particlesPerLayer + i
        const baseSpeed = 0.5 + Math.random() * 2.0 // Базова швидкість від 0.5 до 2.5
        const speedVariation = (globalIndex * 0.618033988749) % 1 // Золоте сечення для різноманітності
        const finalSpeed = baseSpeed + speedVariation * 1.0 // Додаткова варіація
        tempSpeeds.push(finalSpeed)

        // Створюємо індивідуальний розмір для кожної частинки
        const sizeVariation = Math.random() * 0.8 + 0.3 // Розмір від 0.3 до 1.1 від базового
        const individualSize = particleSize * sizeVariation
        tempSizes.push(individualSize)
      }
    }

    return {
      positions: new Float32Array(tempPositions),
      colors: new Float32Array(tempColors),
      speeds: new Float32Array(tempSpeeds),
      sizes: new Float32Array(tempSizes)
    }
  }, [particleCount, pillarHeight, pillarWidth, particleSize])

  // Створюємо матриці для instanced mesh
  const instanceMatrix = useMemo(() => {
    const matrix = new Float32Array(particleCount * 16)
    const tempObject = new THREE.Object3D()

    for (let i = 0; i < particleCount; i++) {
      const x = positions[i * 3]
      const y = positions[i * 3 + 1]
      const z = positions[i * 3 + 2]

      tempObject.position.set(x, y, z)
      tempObject.scale.setScalar(1)
      tempObject.updateMatrix()

      tempObject.matrix.toArray(matrix, i * 16)
    }

    return matrix
  }, [positions, particleCount])

  // Створюємо матеріал для частинок
  const material = useMemo(() => {
    return new THREE.MeshStandardMaterial({
      transparent: true,
      opacity: 0.9,
      emissive: new THREE.Color(0x333333),
      emissiveIntensity: 0.2,
      roughness: 0.2,
      metalness: 0.8
    })
  }, [])

  useFrame((state) => {
    if (!groupRef.current || !meshRef.current) return

    // Використовуємо таку ж логіку обертання, як у частинках
    const progress = scrollProgressRef.current.value
    const scrollTime = progress * 0.5
    const clockTime = state.clock.elapsedTime * 0.2
    const time = scrollTime + clockTime
    const effectiveTime = time * 0.3

    // Обертання всього стовпа
    groupRef.current.rotation.y = effectiveTime * 0.7

    // Анімуємо окремі частинки
    const tempObject = new THREE.Object3D()
    const tempMatrix = new THREE.Matrix4()

    for (let i = 0; i < particleCount; i++) {
      const x = positions[i * 3]
      const y = positions[i * 3 + 1]
      const z = positions[i * 3 + 2]
      const speed = speeds[i]
      const size = sizes[i]

      // Додаємо легку анімацію для кожної частинки
      const particleTime = effectiveTime + i * 0.1
      const waveX = Math.sin(particleTime + x * 2) * 0.02
      const waveZ = Math.sin(particleTime + z * 2) * 0.02

      // Рух вгору/вниз на основі скролу з індивідуальною швидкістю
      const scrollMovement = progress * speed
      let newY = y + scrollMovement

      // Зациклюємо частинки
      const pillarTop = pillarHeight / 2
      const pillarBottom = -pillarHeight / 2

      if (newY > pillarTop) {
        newY = pillarBottom + (newY - pillarTop)
      } else if (newY < pillarBottom) {
        newY = pillarTop - (pillarBottom - newY)
      }

      // Додаємо хвильову анімацію по Y
      const waveY = Math.cos(particleTime + y * 2) * 0.02

      // Пульсація розміру з урахуванням швидкості та базового розміру
      const pulse = 1 + Math.sin(particleTime * 2) * 0.1 * (speed * 0.3)
      const finalScale = (size / particleSize) * pulse // Нормалізуємо розмір та додаємо пульсацію

      tempObject.position.set(x + waveX, newY + waveY, z + waveZ)
      tempObject.scale.setScalar(finalScale)
      tempObject.updateMatrix()

      tempMatrix.copy(tempObject.matrix)
      tempMatrix.toArray(meshRef.current.instanceMatrix.array, i * 16)
    }

    meshRef.current.instanceMatrix.needsUpdate = true
  })

  return (
    <group ref={groupRef}>
      <instancedMesh
        ref={meshRef}
        args={[particleGeometry, material, particleCount]}
        instanceMatrix={new THREE.InstancedBufferAttribute(instanceMatrix, 16)}>
        <instancedBufferAttribute attach="instanceColor" args={[colors, 3]} />
      </instancedMesh>
    </group>
  )
}
