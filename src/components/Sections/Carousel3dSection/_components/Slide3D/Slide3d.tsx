import { Text } from '@react-three/drei'
import { useRef, useState, useMemo } from 'react'
import * as THREE from 'three'
import { useFrame, useThree } from '@react-three/fiber'

// 1. ВИДАЛЯЄМО НЕПОТРІБНІ ПРОПСИ
// Тепер компонент приймає лише `text` та опціональний `scale`.
// Позицією, обертанням та прозорістю керує батьківський компонент `AnimatedSlide`.
type Slide3DProps = {
  text: string
  scale?: number | [number, number, number]
}

export function Slide3D({ text, scale = 1 }: Slide3DProps) {
  const groupRef = useRef<THREE.Group>(null!) // Використовуємо ref для доступу до самого себе
  const meshRef = useRef<THREE.Mesh>(null)
  const borderMeshRef = useRef<THREE.Mesh>(null)
  const textRef = useRef<any>(null)

  const [isHovered, setIsHovered] = useState(false)
  const { camera } = useThree() // Отримуємо камеру для розрахунку відстані

  // Конвертуємо scale, якщо він є масивом
  const baseScale = typeof scale === 'number' ? scale : scale[0]

  // 2. ВИДАЛЯЄМО useMemo з залежністю від `position`
  // Розрахунок відстані тепер буде відбуватись у useFrame, бо позиція динамічна.

  // --- Створення текстур (без змін) ---
  const textGradient = useMemo(() => {
    // ... ваш код для створення градієнту тексту ...
    const canvas = document.createElement('canvas')
    canvas.width = 256
    canvas.height = 256
    const context = canvas.getContext('2d')!
    const gradient = context.createLinearGradient(0, 0, 256, 256)
    gradient.addColorStop(0, '#FFFFFF')
    gradient.addColorStop(0.5, '#E6E6E6')
    gradient.addColorStop(1, '#F5F5F5')
    context.fillStyle = gradient
    context.fillRect(0, 0, 256, 256)
    const texture = new THREE.CanvasTexture(canvas)
    texture.needsUpdate = true
    return texture
  }, [])

  const gradientTexture = useMemo(
    () =>
      new THREE.CanvasTexture(
        (() => {
          // ... ваш код для створення градієнту фону ...
          const canvas = document.createElement('canvas')
          canvas.width = 256
          canvas.height = 256
          const context = canvas.getContext('2d')!
          const gradient = context.createLinearGradient(0, 0, 256, 256)
          gradient.addColorStop(0, '#4ac3ff')
          gradient.addColorStop(0.5, '#151d21')
          gradient.addColorStop(1, '#e591fa')
          context.fillStyle = gradient
          context.fillRect(0, 0, 256, 256)
          return canvas
        })()
      ),
    []
  )
  // --- Кінець створення текстур ---

  // --- Створення геометрії (без змін) ---
  const roundedRectShape = useMemo(() => {
    const shape = new THREE.Shape()
    const width = 0.6
    const height = 0.4
    const radius = 0.05
    shape.moveTo(-width / 2 + radius, -height / 2)
    shape.lineTo(width / 2 - radius, -height / 2)
    shape.quadraticCurveTo(width / 2, -height / 2, width / 2, -height / 2 + radius)
    shape.lineTo(width / 2, height / 2 - radius)
    shape.quadraticCurveTo(width / 2, height / 2, width / 2 - radius, height / 2)
    shape.lineTo(-width / 2 + radius, height / 2)
    shape.quadraticCurveTo(-width / 2, height / 2, -width / 2, height / 2 - radius)
    shape.lineTo(-width / 2, -height / 2 + radius)
    shape.quadraticCurveTo(-width / 2, -height / 2, -width / 2 + radius, -height / 2)
    return shape
  }, [])

  const borderShape = useMemo(() => {
    const shape = new THREE.Shape()
    const width = 0.62
    const height = 0.42
    const radius = 0.06
    shape.moveTo(-width / 2 + radius, -height / 2)
    shape.lineTo(width / 2 - radius, -height / 2)
    shape.quadraticCurveTo(width / 2, -height / 2, width / 2, -height / 2 + radius)
    shape.lineTo(width / 2, height / 2 - radius)
    shape.quadraticCurveTo(width / 2, height / 2, width / 2 - radius, height / 2)
    shape.lineTo(-width / 2 + radius, height / 2)
    shape.quadraticCurveTo(-width / 2, height / 2, -width / 2, height / 2 - radius)
    shape.lineTo(-width / 2, -height / 2 + radius)
    shape.quadraticCurveTo(-width / 2, -height / 2, -width / 2 + radius, -height / 2)
    return shape
  }, [])

  const extrudeSettings = {
    steps: 1,
    depth: 0.01,
    bevelEnabled: true,
    bevelThickness: 0.01,
    bevelSize: 0.0001,
    bevelSegments: 0.5
  }
  // --- Кінець створення геометрії ---

  useFrame(() => {
    if (!groupRef.current) return

    // 3. ОТРИМУЄМО ДИНАМІЧНІ ДАНІ НАПРЯМУ
    // Розраховуємо відстань до камери в кожному кадрі, використовуючи світову позицію групи
    const worldPosition = new THREE.Vector3()
    groupRef.current.getWorldPosition(worldPosition)
    const distanceFromCamera = camera.position.distanceTo(worldPosition)

    // Отримуємо прозорість з матеріалу, встановленого батьківським компонентом
    const parentOpacity = (meshRef.current?.material as THREE.MeshPhysicalMaterial)?.opacity || 1

    // Анімація при наведенні (Hover)
    const targetScale = isHovered ? baseScale * 1.15 : baseScale
    groupRef.current.scale.lerp(new THREE.Vector3(targetScale, targetScale, targetScale), 0.1)

    // Анімація тексту
    if (textRef.current) {
      const time = Date.now() * 0.001
      textRef.current.position.z = 0.01 + Math.sin(time) * 0.002
    }

    // Оновлення матеріалів на основі відстані
    if (meshRef.current && borderMeshRef.current) {
      const material = meshRef.current.material as THREE.MeshPhysicalMaterial
      const borderMaterial = borderMeshRef.current.material as THREE.MeshPhysicalMaterial

      // Встановлюємо прозорість, отриману від батька, щоб не перезаписувати її
      material.opacity = parentOpacity
      borderMaterial.opacity = parentOpacity * 0.3 // Бордер робимо менш прозорим

      const distanceEffect = Math.max(0, Math.min(1, (distanceFromCamera - 1) / 2))

      if (distanceFromCamera < 1.4) {
        material.emissiveIntensity = 0.2 + (1.5 - distanceFromCamera) * 0.3
        material.metalness = 0.5
        material.roughness = 0.3
        borderMaterial.emissiveIntensity = 0.5 + (1.5 - distanceFromCamera) * 0.5
      } else {
        material.emissiveIntensity = 0.2 * (1 - distanceEffect)
        material.metalness = 0.5 + distanceEffect * 0.5
        material.roughness = 0.6 + distanceEffect * 0.8
        borderMaterial.emissiveIntensity = 0.5 * (1 - distanceEffect * 0.8)
      }
    }
  })

  return (
    // 4. ГРУПА БІЛЬШЕ НЕ ПРИЙМАЄ position, rotation, opacity
    // Вона лише реагує на події миші та має початковий scale.
    <group
      ref={groupRef}
      scale={scale}
      onPointerOver={() => setIsHovered(true)}
      onPointerOut={() => setIsHovered(false)}>
      {/* Border mesh */}
      <mesh ref={borderMeshRef} position={[0, 0, -0.001]}>
        <extrudeGeometry args={[borderShape, { ...extrudeSettings, depth: 0.005 }]} />
        <meshPhysicalMaterial
          transparent={true}
          map={gradientTexture}
          side={THREE.DoubleSide}
          depthWrite={false}
          metalness={0.3}
          roughness={0.5}
          emissive={new THREE.Color(0x000000)}
        />
        <meshPhysicalMaterial map={mainTexture} metalness={0.6} roughness={0.3} transparent side={THREE.DoubleSide} />
      </mesh>

      {/* Main mesh */}
      <mesh ref={meshRef} position={[0, 0, 0]} castShadow>
        <extrudeGeometry args={[roundedRectShape, extrudeSettings]} />
        <meshPhysicalMaterial
          transparent={true}
          map={gradientTexture}
          side={THREE.DoubleSide}
          depthWrite={false}
          metalness={0.5}
          roughness={0.2}
          emissive={new THREE.Color(0x000000)}
        />
      </mesh>

      {/* Main text with gradient and glow */}
      <Text
        ref={textRef}
        position={[0, 0, 0.04]}
        fontSize={0.04}
        anchorX="center"
        anchorY="middle"
        material-transparent={true}
        material-map={textGradient}
        material-toneMapped={false}
        material-depthWrite={false}
        material-side={THREE.DoubleSide}
        material-blending={THREE.AdditiveBlending}
        material-vertexColors>
        {text}
      </Text>

      {/* Glow */}
      <Text
        position={[0, 0, 0.041]}
        fontSize={0.041}
        anchorX="center"
        anchorY="middle"
        material-transparent
        material-color="#FFFFFF"
        material-opacity={0.3} // Стала прозорість для ефекту світіння
        material-toneMapped={false}
        material-depthWrite={false}
        material-side={THREE.DoubleSide}
        material-blending={THREE.AdditiveBlending}
        material-vertexColors>
        {text}
      </Text>
    </group>
  )
}
