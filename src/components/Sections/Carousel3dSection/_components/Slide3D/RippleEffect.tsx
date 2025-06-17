import { useRef, useEffect } from 'react'
import * as THREE from 'three'
import { shaderMaterial } from '@react-three/drei'
import { extend, useFrame } from '@react-three/fiber'

// Ripple shader
const RippleMaterial = shaderMaterial(
  {
    u_time: 0,
    u_center: new THREE.Vector2(5, 5),
    u_resolution: new THREE.Vector2(1, 1),
    u_waveFrequency: 10.0,
    u_waveSpeed: 3.5,
    u_waveDecay: 3.0,
    u_baseColor: new THREE.Color(0.2, 0.3, 0.8),
    u_opacity: 0.5,
    u_metalness: 1.0,
    u_roughness: 0.5,
    u_clearcoat: 0.8,
    u_clearcoatRoughness: 1.0,
    u_reflectivity: 0.5,
    u_emissive: new THREE.Color(0.011764, 0.011764, 0.309804),
    u_emissiveIntensity: 0.01,
    u_strength: 2.0
  },
  // Vertex Shader
  `
    varying vec2 vUv;
    varying vec3 vNormal;
    varying vec3 vViewPosition;

    void main() {
      vUv = uv;
      vNormal = normalize(normalMatrix * normal);
      vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
      vViewPosition = -mvPosition.xyz;
      gl_Position = projectionMatrix * mvPosition;
    }
  `,
  // Fragment Shader
  `
    uniform float u_time;
    uniform vec2 u_center;
    uniform vec2 u_resolution;
    uniform float u_waveFrequency;
    uniform float u_waveSpeed;
    uniform float u_waveDecay;
    uniform vec3 u_baseColor;
    uniform float u_opacity;
    uniform float u_metalness;
    uniform float u_roughness;
    uniform float u_clearcoat;
    uniform float u_clearcoatRoughness;
    uniform float u_reflectivity;
    uniform vec3 u_emissive;
    uniform float u_emissiveIntensity;
    uniform float u_strength;
    
    varying vec2 vUv;
    varying vec3 vNormal;
    varying vec3 vViewPosition;

    // Функція для обчислення фізичного освітлення
    vec3 calculateLighting(vec3 baseColor, float metalness, float roughness) {
      vec3 normal = normalize(vNormal);
      vec3 viewDir = normalize(vViewPosition);
      
      // Базове освітлення
      vec3 lighting = baseColor;
      
      // Металічність
      lighting = mix(lighting, baseColor * 0.5, metalness);
      
      // Шорсткість
      lighting = mix(lighting, lighting * 0.7, roughness);
      
      // Покриття
      float clearcoat = u_clearcoat * (1.0 - roughness);
      lighting = mix(lighting, lighting * 1.2, clearcoat);
      
      // Відбиття
      float reflection = u_reflectivity * (1.0 - roughness);
      lighting = mix(lighting, lighting * 1.5, reflection);
      
      // Світіння
      lighting += u_emissive * u_emissiveIntensity;
      
      return lighting;
    }

    void main() {
      float dist = distance(vUv, u_center);
      float ripple = sin(u_waveFrequency * dist - u_time * u_waveSpeed) * exp(-u_waveDecay * dist);
      
      vec3 rippleColor = vec3(0.294, 0.337, 0.412) * ripple;
      vec3 baseColor = mix(u_baseColor, rippleColor, 0.7);
      
      vec3 finalColor = calculateLighting(baseColor, u_metalness, u_roughness);
      
      gl_FragColor = vec4(finalColor, u_opacity);
    }
  `
)

extend({ RippleMaterial })

declare global {
  namespace JSX {
    interface IntrinsicElements {
      rippleMaterial: any
    }
  }
}

type RippleEffectProps = {
  geometry: THREE.BufferGeometry
  baseColor: THREE.Color
  rippleColor: THREE.Color
}

export function RippleEffect({ geometry, baseColor, rippleColor }: RippleEffectProps) {
  const rippleMaterialRef = useRef<THREE.ShaderMaterial>(null!)

  // Оновлення роздільної здатності при ресайзі
  useEffect(() => {
    const handleResize = () => {
      if (rippleMaterialRef.current) {
        rippleMaterialRef.current.uniforms.u_resolution.value.set(window.innerWidth, window.innerHeight)
      }
    }
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  // Анімація центру хвиль
  useFrame((state) => {
    if (rippleMaterialRef.current) {
      const t = state.clock.getElapsedTime()
      const x = 0.5 + 0.01 * Math.sin(t * 0.6)
      const y = 0.5 + 0.01 * Math.cos(t * 0.4)
      rippleMaterialRef.current.uniforms.u_center.value.set(x, y)
      rippleMaterialRef.current.uniforms.u_time.value = t
    }
  })

  return (
    <mesh geometry={geometry}>
      {/* @ts-ignore */}
      <rippleMaterial
        ref={rippleMaterialRef}
        u_center={new THREE.Vector2(0.5, 0.5)}
        u_resolution={new THREE.Vector2(window.innerWidth, window.innerHeight)}
        u_waveFrequency={10}
        u_waveSpeed={3.5}
        u_waveDecay={3}
        u_baseColor={baseColor}
        u_opacity={0.5}
        u_metalness={1.0}
        u_roughness={0.5}
        u_clearcoat={0.8}
        u_clearcoatRoughness={1.0}
        u_reflectivity={0.5}
        u_emissive={rippleColor}
        u_emissiveIntensity={0.01}
        u_strength={2}
        transparent={true}
        blending={THREE.AdditiveBlending}
      />
    </mesh>
  )
}
