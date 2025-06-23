import { useRef, useMemo } from 'react'
import * as THREE from 'three'
import { useFrame } from '@react-three/fiber'

interface CentralPillarProps {
  scrollProgressRef: React.MutableRefObject<{ value: number }>
  circleCenter?: [number, number, number]
  isMobile?: boolean
  position?: [number, number, number] // Позиція стовпа
  width?: number // Ширина стовпа
  particleCount?: number // Кількість частинок
  particleSize?: number // Розмір частинок
  animationSpeed?: number // Швидкість анімації частинок
  rotationSpeed?: number // Швидкість обертання стовпа
}

export function CentralPillar({
  scrollProgressRef,
  circleCenter = [0, -0.1, -0.4],
  isMobile,
  position = [0, 0, 0],
  width = 1.1,
  particleCount = isMobile ? 600 : 800,
  particleSize = isMobile ? 0.06 : 0.12,
  animationSpeed = 0.5,
  rotationSpeed = 0.7
}: CentralPillarProps) {
  const groupRef = useRef<THREE.Group>(null)
  const meshRef = useRef<THREE.InstancedMesh>(null)

  // Параметри частинок стовпа - збільшуємо для мобільної версії
  const pillarHeight = isMobile ? 6 : 5
  const pillarWidth = width // Використовуємо пропс width

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
      new THREE.Color(0x2c2c2c), // Темно-сірий (charcoal)
      new THREE.Color(0x3b3b3b), // Ще темніший сірий
      new THREE.Color(0x5a5a5a), // Графіт
      new THREE.Color(0x708090), // Сіро-блакитний (slate gray)
      new THREE.Color(0x778899), // Світлий слейт грей
      new THREE.Color(0xa9a9a9), // Темно-сірий
      new THREE.Color(0x8f9aa3), // Сіро-синій
      new THREE.Color(0xb0c4de), // Блідо-блакитно-сірий
      new THREE.Color(0x6c7b8b), // Синювато-сірий
      new THREE.Color(0x999999), // Стандартний сірий
      new THREE.Color(0xc0c0c0), // Сріблястий

      // Додані фіолетово-сірі відтінки
      new THREE.Color(0x6a5acd), // Середній слейт фіолетовий (slate blue)
      new THREE.Color(0x7b68ee), // Середній фіолетовий (medium slate blue)
      new THREE.Color(0x8470ff), // Світлий фіолетовий (light slate blue)
      new THREE.Color(0x836fff), // Сіро-фіолетовий
      new THREE.Color(0x9370db), // Орхідея/сіро-фіолетовий (medium purple)
      new THREE.Color(0xaaa9c3), // Сіро-лавандовий
      new THREE.Color(0x8b80b0) // Приглушено-фіолетовий
    ]

    // Розподіляємо частинки по стовпу - оптимізуємо для мобільної версії
    const particlesPerLayer = Math.max(1, Math.floor(particleCount / (pillarHeight / particleSize)))
    const layers = Math.max(1, Math.floor(pillarHeight / particleSize))
    const actualParticleCount = Math.min(particleCount, particlesPerLayer * layers)

    for (let layer = 0; layer < layers; layer++) {
      const y = (layer - layers / 2) * particleSize

      for (let i = 0; i < particlesPerLayer; i++) {
        // Перевіряємо, чи не перевищили ми загальну кількість частинок
        if (tempPositions.length / 3 >= actualParticleCount) break

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

        // Створюємо індивідуальний розмір для кожної частинки - збільшуємо для мобільної версії
        const sizeVariation = Math.random() * 0.8 + (isMobile ? 0.5 : 0.3) // Розмір від 0.5-1.3 для мобільної, 0.3-1.1 для десктопної
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
  }, [particleCount, pillarHeight, pillarWidth, particleSize, isMobile])

  // Створюємо матриці для instanced mesh
  const instanceMatrix = useMemo(() => {
    const particlesPerLayer = Math.max(1, Math.floor(particleCount / (pillarHeight / particleSize)))
    const layers = Math.max(1, Math.floor(pillarHeight / particleSize))
    const actualParticleCount = Math.min(particleCount, particlesPerLayer * layers)
    const matrix = new Float32Array(actualParticleCount * 16)
    const tempObject = new THREE.Object3D()

    for (let i = 0; i < actualParticleCount; i++) {
      const x = positions[i * 3]
      const y = positions[i * 3 + 1]
      const z = positions[i * 3 + 2]

      tempObject.position.set(x, y, z)
      tempObject.scale.setScalar(1)
      tempObject.updateMatrix()

      tempObject.matrix.toArray(matrix, i * 16)
    }

    return matrix
  }, [positions, particleCount, pillarHeight, particleSize])

  // Створюємо матеріал для частинок
  const material = useMemo(() => {
    return new THREE.MeshStandardMaterial({
      transparent: true,
      opacity: isMobile ? 1.0 : 0.9, // Збільшуємо непрозорість для мобільної версії
      emissive: new THREE.Color(0x4a5568), // Сіро-синій
      emissiveIntensity: isMobile ? 0.4 : 0.2, // Збільшуємо світіння для мобільної версії
      roughness: 0.4,
      metalness: 0.8
    })
  }, [isMobile])

  useFrame((state) => {
    if (!groupRef.current || !meshRef.current) return

    // Використовуємо таку ж логіку обертання, як у частинках
    const progress = scrollProgressRef.current.value
    const scrollTime = progress * 0.5
    const clockTime = state.clock.elapsedTime * 0.1 // Reduced background animation
    const time = scrollTime + clockTime
    const effectiveTime = time * 0.3

    // Обертання всього стовпа
    groupRef.current.rotation.y = effectiveTime * rotationSpeed

    // Анімуємо окремі частинки
    const tempObject = new THREE.Object3D()
    const tempMatrix = new THREE.Matrix4()

    const particlesPerLayer = Math.max(1, Math.floor(particleCount / (pillarHeight / particleSize)))
    const layers = Math.max(1, Math.floor(pillarHeight / particleSize))
    const actualParticleCount = Math.min(particleCount, particlesPerLayer * layers)

    for (let i = 0; i < actualParticleCount; i++) {
      const x = positions[i * 3]
      const y = positions[i * 3 + 1]
      const z = positions[i * 3 + 2]
      const speed = speeds[i]
      const size = sizes[i]

      // Simplified animation for each particle
      const particleTime = effectiveTime + i * 0.05 // Reduced variation
      const waveX = Math.sin(particleTime + x * 2) * 0.01 // Reduced amplitude
      const waveZ = Math.sin(particleTime + z * 2) * 0.01

      // Рух вгору/вниз на основі скролу з індивідуальною швидкістю
      const scrollMovement = progress * speed * animationSpeed
      let newY = y + scrollMovement

      // Зациклюємо частинки
      const pillarTop = pillarHeight / 2
      const pillarBottom = -pillarHeight / 2

      if (newY > pillarTop) {
        newY = pillarBottom + (newY - pillarTop)
      } else if (newY < pillarBottom) {
        newY = pillarTop - (pillarBottom - newY)
      }

      // Simplified wave animation
      const waveY = Math.cos(particleTime + y * 2) * 0.01

      // Simplified pulsation
      const pulse = 1 + Math.sin(particleTime * 1.5) * 0.05 * (speed * 0.2)
      const finalScale = (size / particleSize) * pulse

      tempObject.position.set(x + waveX, newY + waveY, z + waveZ)
      tempObject.scale.setScalar(finalScale)
      tempObject.updateMatrix()

      tempMatrix.copy(tempObject.matrix)
      tempMatrix.toArray(meshRef.current.instanceMatrix.array, i * 16)
    }

    meshRef.current.instanceMatrix.needsUpdate = true
  })

  return (
    <group ref={groupRef} position={position}>
      <instancedMesh
        ref={meshRef}
        args={[
          particleGeometry,
          material,
          (() => {
            const particlesPerLayer = Math.max(1, Math.floor(particleCount / (pillarHeight / particleSize)))
            const layers = Math.max(1, Math.floor(pillarHeight / particleSize))
            return Math.min(particleCount, particlesPerLayer * layers)
          })()
        ]}
        instanceMatrix={new THREE.InstancedBufferAttribute(instanceMatrix, 16)}>
        <instancedBufferAttribute attach="instanceColor" args={[colors, 3]} />
      </instancedMesh>
    </group>
  )
}
