import { useRef, useMemo, useLayoutEffect } from 'react'
import * as THREE from 'three'
import { shaderMaterial } from '@react-three/drei'
import { extend, useFrame } from '@react-three/fiber'

const RippleMaterial = shaderMaterial(
  {
    u_time: 0,
    u_center: new THREE.Vector2(0, 0),
    u_resolution: new THREE.Vector2(0, 0),
    u_waveFrequency: 10.0,
    u_waveSpeed: 3.5,
    u_waveDecay: 3.0,
    u_baseColor: new THREE.Color(0.3, 0.4, 0.6),
    u_opacity: 0.7,
    u_metalness: 1.0,
    u_roughness: 0.3,
    u_clearcoat: 1.0,
    u_clearcoatRoughness: 0.5,
    u_reflectivity: 0.8,
    u_emissive: new THREE.Color(0.4, 0.5, 0.7),
    u_emissiveIntensity: 0.15,
    u_strength: 2.5
  },
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
  `
    precision mediump float;
    uniform float u_time;
    uniform vec2 u_center;
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

    varying vec2 vUv;
    varying vec3 vNormal;
    varying vec3 vViewPosition;

    void main() {
      vec2 uv = vUv;
      float dist = distance(uv, u_center);
      float ripple = sin(u_waveFrequency * dist - u_time * u_waveSpeed) * exp(-u_waveDecay * dist);

      vec3 rippleColor = u_emissive * ripple;
      vec3 color = mix(u_baseColor, rippleColor, 0.8);

      vec3 viewDir = normalize(vViewPosition);
      float fresnel = pow(1.0 - dot(viewDir, normalize(vNormal)), 3.0);
      color += fresnel * u_emissive * u_emissiveIntensity;

      gl_FragColor = vec4(color, u_opacity);
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
  rippleCenter?: [number, number]
  waveFrequency?: number
  waveSpeed?: number
  waveDecay?: number
  opacity?: number
  emissiveIntensity?: number
}

export function RippleEffect({ 
  geometry, 
  baseColor, 
  rippleColor, 
  rippleCenter,
  waveFrequency = 10.0,
  waveSpeed = 3.5,
  waveDecay = 3.0,
  opacity = 0.5,
  emissiveIntensity = 0.01
}: RippleEffectProps) {
  const rippleMaterialRef = useRef<THREE.ShaderMaterial>(null!)

  useFrame(({ clock }) => {
    if (rippleMaterialRef.current) {
      rippleMaterialRef.current.uniforms.u_time.value = clock.getElapsedTime()
      const center = rippleCenter || [0.5, 0.5]
      rippleMaterialRef.current.uniforms.u_center.value.set(center[0], center[1])
      rippleMaterialRef.current.uniforms.u_waveFrequency.value = waveFrequency
      rippleMaterialRef.current.uniforms.u_waveSpeed.value = waveSpeed
      rippleMaterialRef.current.uniforms.u_waveDecay.value = waveDecay
      rippleMaterialRef.current.uniforms.u_opacity.value = opacity
      rippleMaterialRef.current.uniforms.u_emissiveIntensity.value = emissiveIntensity
    }
  })

  useLayoutEffect(() => {
    const handleResize = () => {
      if (rippleMaterialRef.current) {
        rippleMaterialRef.current.uniforms.u_resolution.value.set(window.innerWidth, window.innerHeight)
      }
    }

    handleResize()
    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  return (
    <mesh geometry={geometry}>
      {/* @ts-ignore */}
      <rippleMaterial
        ref={rippleMaterialRef}
        u_baseColor={baseColor}
        u_emissive={rippleColor}
        transparent={true}
        blending={THREE.AdditiveBlending}
      />
    </mesh>
  )
}
