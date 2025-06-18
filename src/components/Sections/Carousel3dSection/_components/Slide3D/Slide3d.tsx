import { useRef, useState, useMemo } from 'react'
import * as THREE from 'three'
import { useFrame, useThree, extend } from '@react-three/fiber'
import { shaderMaterial } from '@react-three/drei'
import { RippleEffect } from './RippleEffect'

type Slide3DProps = {
  text: string
  baseColor?: THREE.ColorRepresentation
  rippleColor?: THREE.ColorRepresentation
  scale?: number | [number, number, number]
  isActive?: boolean
  offsetFromCenter?: number
  side?: 'left' | 'right'
  rippleCenterUv?: [number, number]
}

// Кастомний шейдер матеріал для глітч ефекту
const TextGlitchMaterial = shaderMaterial(
  {
    u_texture: null,
    u_time: 0,
    u_glitchIntensity: 0.0,
    u_opacity: 1.0,
    u_offset: 0.0
  },
  // Vertex Shader
  `
    varying vec2 vUv;
    
    void main() {
      vUv = uv;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `,
  // Fragment Shader
  `
    uniform sampler2D u_texture;
    uniform float u_time;
    uniform float u_glitchIntensity;
    uniform float u_opacity;
    
    varying vec2 vUv;
    
    // Псевдовипадкова функція
    float random(vec2 st) {
      return fract(sin(dot(st.xy, vec2(12.9898, 78.233))) * 43758.5453123);
    }
    
    // Функція для створення глітч ефекту
    vec2 glitchUV(vec2 uv, float intensity) {
      vec2 glitched = uv;
      
      // Горизонтальний зсув
      float glitchLine = step(0.95, random(vec2(u_time * 10.0, floor(uv.y * 20.0))));
      float shift = random(vec2(u_time * 5.0, floor(uv.y * 10.0))) * 2.0 - 1.0;
      glitched.x += shift * intensity * 0.1 * glitchLine;
      
      // Вертикальний зсув
      float verticalGlitch = step(0.98, random(vec2(u_time * 8.0, floor(uv.x * 15.0))));
      float vShift = random(vec2(u_time * 3.0, floor(uv.x * 8.0))) * 2.0 - 1.0;
      glitched.y += vShift * intensity * 0.05 * verticalGlitch;
      
      // Розриви (tearing)
      float tear = step(0.99, random(vec2(u_time * 15.0, floor(uv.y * 30.0))));
      glitched.x += tear * intensity * 0.2 * (random(vec2(u_time, uv.y)) - 0.5);
      
      return glitched;
    }
    
    void main() {
      vec2 uv = vUv;
      
      // Застосовуємо глітч ефект
      vec2 glitchedUV = glitchUV(uv, u_glitchIntensity);
      
      // Отримуємо кольори з текстури
      vec4 color = texture2D(u_texture, glitchedUV);
      
      // Додаємо хроматичну аберацію
      float chromaShift = u_glitchIntensity * 0.02;
      vec4 redChannel = texture2D(u_texture, glitchedUV + vec2(chromaShift, 0.0));
      vec4 blueChannel = texture2D(u_texture, glitchedUV - vec2(chromaShift, 0.0));
      
      // Змішуємо канали
      color.r = redChannel.r;
      color.b = blueChannel.b;
      
      // Додаємо scan lines
      float scanLine = step(0.95, random(vec2(0.0, floor(uv.y * 50.0))));
      color.rgb *= 1.0 - scanLine * u_glitchIntensity * 0.3;
      
      // Додаємо шум
      float noise = random(uv + u_time * 0.1) * u_glitchIntensity * 0.1;
      color.rgb += noise;
      
      // Додаємо інверсію кольорів
      float invert = step(0.995, random(vec2(u_time * 20.0, floor(uv.y * 40.0))));
      color.rgb = mix(color.rgb, 1.0 - color.rgb, invert * u_glitchIntensity);
      
      gl_FragColor = vec4(color.rgb, color.a * u_opacity);
    }
  `
)

extend({ TextGlitchMaterial })

declare global {
  namespace JSX {
    interface IntrinsicElements {
      textGlitchMaterial: any
    }
  }
}

export function Slide3D({
  text,
  baseColor = '#ed8a82',
  rippleColor = '#ed8a82',
  scale = 1,
  isActive = false,
  offsetFromCenter,
  side,
  rippleCenterUv
}: Slide3DProps) {
  const groupRef = useRef<THREE.Group>(null!)
  const meshRef = useRef<THREE.Mesh>(null)
  const textMeshRef = useRef<THREE.Mesh>(null)
  const textShaderRef = useRef<THREE.ShaderMaterial>(null!)
  const [isHovered, setIsHovered] = useState(false)
  const { camera, clock } = useThree()
  const baseScale = typeof scale === 'number' ? scale : scale[0]

  // Для плавної анімації позиції тексту
  const currentTextPositionX = useRef(0)
  const currentTextOpacity = useRef(1)
  const currentTextFontSize = useRef(0.08)

  // Створюємо кольори
  const base = useMemo(() => new THREE.Color(baseColor), [baseColor])
  const ripple = useMemo(() => new THREE.Color(rippleColor), [rippleColor])

  const rippleCenter = rippleCenterUv || [0.5, 0.5]
  const rippleTime = clock.getElapsedTime()

  useFrame((state) => {
    if (!groupRef.current) return

    const t = state.clock.getElapsedTime()

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
      if (textShaderRef.current && textShaderRef.current.uniforms) {
        textShaderRef.current.uniforms.u_opacity.value = currentTextOpacity.current
      }
    }

    // Анімація глітч ефекту
    if (textShaderRef.current && textShaderRef.current.uniforms) {
      const time = clock.getElapsedTime()
      
      // Інтенсивність глітчу залежить від offset
      const offset = offsetFromCenter ?? 0
      const baseGlitchIntensity = offset > 0.1 ? Math.min(offset, 1) : 0
      
      // Додаємо випадкові спайки тільки якщо є offset
      const randomSpike = offset > 0.1 && Math.random() > 0.95 ? 1.0 : 0.0
      const glitchIntensity = Math.max(baseGlitchIntensity * 0.8, randomSpike * 0.6)
      
      textShaderRef.current.uniforms.u_glitchIntensity.value = glitchIntensity
      textShaderRef.current.uniforms.u_offset.value = offset
      textShaderRef.current.uniforms.u_time.value = time
    }
  })

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
        bevelSize: 0.015,
        bevelThickness: 0.005,
        bevelSegments: 2,
        bevelOffset: 0
      }),
    [roundedRectShape]
  )

  // Створюємо текстуру тексту з canvas
  const textTexture = useMemo(() => {
    const canvas = document.createElement('canvas')
    const ctx = canvas.getContext('2d')!

    // Налаштування canvas
    canvas.width = 512
    canvas.height = 128

    // Налаштування тексту
    ctx.fillStyle = 'white'
    ctx.font = 'bold 48px Arial, sans-serif'
    ctx.textAlign = 'center'
    ctx.textBaseline = 'middle'

    // Малюємо текст
    ctx.fillText(text, canvas.width / 2, canvas.height / 2)

    // Створюємо текстуру
    const texture = new THREE.CanvasTexture(canvas)
    texture.needsUpdate = true

    return texture
  }, [text])

  // Створюємо геометрію для тексту (площина)
  const textGeometry = useMemo(() => {
    const aspectRatio = 512 / 128 // width / height
    const width = 0.8
    const height = width / aspectRatio

    return new THREE.PlaneGeometry(width, height)
  }, [])

  return (
    <group
      ref={groupRef}
      scale={scale}
      onPointerOver={() => setIsHovered(true)}
      onPointerOut={() => setIsHovered(false)}>
      {/* Фоновий меш */}
      <mesh ref={meshRef} geometry={geometry}>
        <meshPhysicalMaterial
          color={base}
          metalness={1}
          roughness={0.5}
          clearcoat={0.8}
          clearcoatRoughness={1}
          reflectivity={0.5}
          transparent={true}
          opacity={0.5}
          toneMapped={true}
          emissive={base}
          emissiveIntensity={0.01}
        />
      </mesh>

      {/* Хвилі */}
      <RippleEffect geometry={geometry} baseColor={base} rippleColor={ripple} rippleCenter={rippleCenter} />

      {/* Text with PlaneGeometry and canvas texture */}
      <mesh ref={textMeshRef} geometry={textGeometry} position={[0, 0, 0.06]}>
        {/* @ts-ignore */}
        <textGlitchMaterial
          ref={textShaderRef}
          u_texture={textTexture}
          transparent={true}
          side={THREE.DoubleSide}
          depthWrite={false}
        />
      </mesh>
    </group>
  )
}
