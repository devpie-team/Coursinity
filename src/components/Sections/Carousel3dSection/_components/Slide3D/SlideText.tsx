import { useRef, useMemo } from 'react'
import * as THREE from 'three'
import { useFrame, useThree, extend } from '@react-three/fiber'
import { shaderMaterial } from '@react-three/drei'

type SlideTextProps = {
  text: string
  offsetFromCenter?: number
  side?: 'left' | 'right'
  isMobile?: boolean
  locale?: string
  opacityFadePower?: number
  fadeStartDistance?: number
  fadeEndDistance?: number
}

// Кастомний шейдер матеріал для глітч ефекту
const TextGlitchMaterial = shaderMaterial(
  {
    u_texture: null,
    u_time: 0,
    u_glitchIntensity: 0.0,
    u_opacity: 1,
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
      
      // Відсікаємо прозорі пікселі, щоб уникнути проблем з сортуванням
      if (color.a < 0.1) {
        discard;
      }
      
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
      
      // Збільшуємо яскравість тексту, щоб перекрити фон
      // Чим менша прозорість, тим більше підмішуємо білого кольору для ефекту світіння
      float brightness = 1.0 - u_opacity;
      color.rgb = mix(color.rgb, vec3(1.0), brightness * 0.8);
      
      // Встановлюємо фінальний колір та прозорість
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

export function SlideText({
  text,
  offsetFromCenter,
  side,
  isMobile = false,
  locale,
  opacityFadePower = 4,
  fadeStartDistance = 0.8,
  fadeEndDistance = 1.5
}: SlideTextProps) {
  const textMeshRef = useRef<THREE.Mesh>(null)
  const textShaderRef = useRef<THREE.ShaderMaterial>(null!)
  const { camera, clock } = useThree()

  // Для плавної анімації позиції тексту
  const currentTextPositionX = useRef(0)
  const currentTextOpacity = useRef(1)
  const currentTextFontSize = useRef(isMobile ? 0.06 : 0.08)

  // Створюємо текстуру тексту з canvas
  const textTexture = useMemo(() => {
    const canvas = document.createElement('canvas')
    const ctx = canvas.getContext('2d')!

    // Налаштування canvas
    canvas.width = 2048
    canvas.height = 512

    // Створюємо градієнт
    const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height)
    gradient.addColorStop(0, '#ffffff') // Білий
    gradient.addColorStop(0.3, '#e6e6e6') // Світло-сірий
    gradient.addColorStop(0.7, '#cccccc') // Сірий
    gradient.addColorStop(1, '#ffffff') // Знову білий

    // Налаштування тексту
    ctx.fillStyle = gradient

    // Визначаємо шрифт залежно від мови
    const fontSize = isMobile ? 120 : 142
    const fontFamily = locale === 'ar' ? 'Arial, sans-serif' : 'Arial, sans-serif'
    ctx.font = `bold ${fontSize}px ${fontFamily}`

    if (locale === 'ar') {
      ctx.direction = 'rtl'
    }
    ctx.textAlign = 'center'
    ctx.textBaseline = 'middle'

    const PADDING = isMobile ? 900 : 700
    const textMetrics = ctx.measureText(text)

    if (textMetrics.width > canvas.width - PADDING) {
      // Текст задовгий, розбиваємо на два рядки
      const words = text.split(' ')
      if (words.length > 1) {
        let bestSplitIndex = -1
        let minDiff = Infinity
        // Шукаємо найкращу точку розриву, щоб рядки були приблизно однакової довжини
        for (let i = 1; i < words.length; i++) {
          const line1 = words.slice(0, i).join(' ')
          const line2 = words.slice(i).join(' ')
          const diff = Math.abs(line1.length - line2.length)
          if (diff < minDiff) {
            minDiff = diff
            bestSplitIndex = i
          }
        }

        const line1 = words.slice(0, bestSplitIndex).join(' ')
        const line2 = words.slice(bestSplitIndex).join(' ')
        const lineHeight = fontSize + 5 // Відступ між рядками

        ctx.fillText(line1, canvas.width / 2, canvas.height / 2 - lineHeight / 2)
        ctx.fillText(line2, canvas.width / 2, canvas.height / 2 + lineHeight / 2)
      } else {
        ctx.fillText(text, canvas.width / 2, canvas.height / 2) // Слово задовге, але все одно малюємо
      }
    } else {
      // Текст вміщається, малюємо як один рядок
      ctx.fillText(text, canvas.width / 2, canvas.height / 2)
    }

    const texture = new THREE.CanvasTexture(canvas)
    texture.needsUpdate = true
    return texture
  }, [text, isMobile, locale])

  // Створюємо геометрію для тексту (площина)
  const textGeometry = useMemo(() => {
    const aspectRatio = 512 / 128 // width / height
    const width = isMobile ? 0.8 : 1.2
    const height = width / aspectRatio

    return new THREE.PlaneGeometry(width, height)
  }, [isMobile])

  // Анімація тексту
  useFrame((state) => {
    const t = state.clock.getElapsedTime()

    const offset = offsetFromCenter ?? 0

    // Для візуальних ефектів (рух, розмір) використовуємо обмежене зміщення, щоб уникнути артефактів
    const visualOffset = Math.min(offset, fadeEndDistance)

    // Обчислюємо цільові значення для тексту
    const baseFontSize = isMobile ? 0.06 : 0.08
    const targetFontSize = baseFontSize - (visualOffset / fadeEndDistance) * 0.03

    const targetPositionX = (side === 'left' ? -visualOffset : visualOffset) * 0.4

    // Нова, точна логіка для контролю прозорості
    const progress = Math.min(1.0, Math.max(0.0, (offset - fadeStartDistance) / (fadeEndDistance - fadeStartDistance)))
    const targetOpacity = 1.0 - Math.pow(progress, opacityFadePower)

    // Плавна інтерполяція до цільових значень
    const lerpFactor = 0.1
    currentTextPositionX.current = THREE.MathUtils.lerp(currentTextPositionX.current, targetPositionX, lerpFactor)
    currentTextOpacity.current = THREE.MathUtils.lerp(currentTextOpacity.current, targetOpacity, lerpFactor)
    currentTextFontSize.current = THREE.MathUtils.lerp(currentTextFontSize.current, targetFontSize, lerpFactor)

    // Виводимо в консоль дані для центрального слайда

    // Оновлюємо позицію і розмір тексту
    if (textMeshRef.current) {
      textMeshRef.current.position.x = currentTextPositionX.current
      textMeshRef.current.scale.setScalar(currentTextFontSize.current / baseFontSize)
      if (textShaderRef.current && textShaderRef.current.uniforms && textShaderRef.current.uniforms.u_opacity) {
        textShaderRef.current.uniforms.u_opacity.value = currentTextOpacity.current
      }
    }

    // Анімація глітч ефекту
    if (textShaderRef.current && textShaderRef.current.uniforms) {
      const time = clock.getElapsedTime()

      // Інтенсивність глітчу залежить від offset
      const baseGlitchIntensity = visualOffset > 0.1 ? Math.min(visualOffset, 1) : 0

      // Додаємо випадкові спайки тільки якщо є offset
      const randomSpike = visualOffset > 0.1 && Math.random() > 0.95 ? 1.0 : 0.0
      const glitchIntensity = Math.max(baseGlitchIntensity * 0.8, randomSpike * 0.6)

      textShaderRef.current.uniforms.u_glitchIntensity.value = glitchIntensity
      textShaderRef.current.uniforms.u_offset.value = visualOffset
      textShaderRef.current.uniforms.u_time.value = time
    }
  })

  return (
    <mesh ref={textMeshRef} geometry={textGeometry} position={[0, 0, 0.06]}>
      {/* @ts-ignore */}
      <textGlitchMaterial
        ref={textShaderRef}
        u_texture={textTexture}
        transparent={true}
        side={THREE.DoubleSide}
        depthWrite={true}
      />
    </mesh>
  )
}
