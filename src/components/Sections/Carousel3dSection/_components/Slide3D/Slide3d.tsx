import { useRef, useState, useMemo, useEffect } from 'react'
import * as THREE from 'three'
import { useFrame, useThree } from '@react-three/fiber'
import { TextGeometry } from 'three/addons/geometries/TextGeometry.js'
import { FontLoader } from 'three/addons/loaders/FontLoader.js'

type Slide3DProps = {
  text: string
  scale?: number | [number, number, number]
  isActive?: boolean
  offsetFromCenter?: number
  side?: 'left' | 'right'
}

export function Slide3D({ text, scale = 1, isActive = false, offsetFromCenter, side }: Slide3DProps) {
  const groupRef = useRef<THREE.Group>(null!)
  const meshRef = useRef<THREE.Mesh>(null)
  const textMeshRef = useRef<THREE.Mesh>(null)
  const materialRef = useRef<THREE.MeshPhysicalMaterial>(null!)
  const [isHovered, setIsHovered] = useState(false)
  const { camera } = useThree()
  const baseScale = typeof scale === 'number' ? scale : scale[0]

  // Для плавної анімації позиції тексту
  const currentTextPositionX = useRef(0)
  const currentTextOpacity = useRef(1)
  const currentTextFontSize = useRef(0.08)

  // --- Створення геометрії (без змін) ---
  const roundedRectShape = useMemo(() => {
    const shape = new THREE.Shape()
    const width = 0.85
    const height = 0.6
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

  const geometry = useMemo(
    () =>
      new THREE.ExtrudeGeometry(roundedRectShape, {
        depth: 0.01,
        bevelEnabled: true,
        bevelSize: 0.0,
        bevelThickness: 0.005,
        bevelSegments: 2,
        bevelOffset: 0
      }),
    [roundedRectShape]
  )

  // Створюємо геометрію тексту
  const textGeometry = useMemo(() => {
    const loader = new FontLoader()
    const font = loader.parse(require('three/examples/fonts/helvetiker_regular.typeface.json'))

    const geometry = new TextGeometry(text, {
      font: font,
      size: 0.06,
      depth: 0.0001,
      curveSegments: 12,
      bevelEnabled: true,
      bevelThickness: 0.0001,
      bevelSize: 0.002,

      bevelSegments: 2
    })

    // Центруємо геометрію
    geometry.computeBoundingBox()
    const boundingBox = geometry.boundingBox!
    const centerOffset = -0.5 * (boundingBox.max.x - boundingBox.min.x)
    geometry.translate(centerOffset, 0, 0)

    return geometry
  }, [text])

  useFrame(() => {
    if (!groupRef.current) return

    const worldPosition = new THREE.Vector3()
    groupRef.current.getWorldPosition(worldPosition)
    const distanceFromCamera = camera.position.distanceTo(worldPosition)

    // Обчислюємо цільові значення для тексту
    const targetFontSize = offsetFromCenter !== undefined ? 0.07 - Math.min(offsetFromCenter, 1) * 0.03 : 0.08

    const targetPositionX =
      offsetFromCenter !== undefined
        ? side === 'left'
          ? 0 - Math.min(offsetFromCenter, 1) * 0.4
          : side === 'right'
          ? 0 + Math.min(offsetFromCenter, 1) * 0.4
          : 0 - Math.min(offsetFromCenter, 1) * 0.4
        : 0

    const targetOpacity = offsetFromCenter !== undefined ? Math.max(0, 1 - Math.min(offsetFromCenter, 1) * 1) : 1

    // Плавна інтерполяція до цільових значень
    const lerpFactor = 0.1
    currentTextPositionX.current = THREE.MathUtils.lerp(currentTextPositionX.current, targetPositionX, lerpFactor)
    currentTextOpacity.current = THREE.MathUtils.lerp(currentTextOpacity.current, targetOpacity, lerpFactor)
    currentTextFontSize.current = THREE.MathUtils.lerp(currentTextFontSize.current, targetFontSize, lerpFactor)

    // Оновлюємо позицію і розмір тексту
    if (textMeshRef.current) {
      textMeshRef.current.position.x = currentTextPositionX.current
      textMeshRef.current.scale.setScalar(currentTextFontSize.current / 0.08)
      materialRef.current.opacity = currentTextOpacity.current
    }

    /*  const targetScale = isHovered ? baseScale * 1.15 : isActive ? baseScale * 1.1 : baseScale
    groupRef.current.scale.lerp(new THREE.Vector3(targetScale, targetScale, targetScale), 0.1) */
  })

  return (
    <group
      ref={groupRef}
      scale={scale}
      onPointerOver={() => setIsHovered(true)}
      onPointerOut={() => setIsHovered(false)}>
      <mesh ref={meshRef} geometry={geometry}>
        <meshPhysicalMaterial
          color={'#4b5669'}
          metalness={1}
          roughness={0.5}
          clearcoat={0.8}
          clearcoatRoughness={1}
          reflectivity={0.5}
          transparent={true}
          opacity={0.7}
          toneMapped={true}
          emissive={'#03034f'} // Світіння
          emissiveIntensity={0.01}
        />
      </mesh>

      {/* Text with TextGeometry */}
      <mesh ref={textMeshRef} geometry={textGeometry} position={[0, 0, 0.06]}>
        <meshPhysicalMaterial ref={materialRef} color="white" metalness={5} transparent={true} opacity={0} />
      </mesh>
    </group>
  )
}
