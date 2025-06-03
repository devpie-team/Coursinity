import { Canvas } from '@react-three/fiber'
import { useRef, useEffect, useState, useMemo } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { MyModel } from './_components/Model/Model'
import { Slide3D } from './_components/Slide3D/Slide3d'
import * as THREE from 'three'
import { EffectComposer, Bloom } from '@react-three/postprocessing'

gsap.registerPlugin(ScrollTrigger)

const slidesData = [
  { text: 'AI-powered LMS', colors: ['#0D0D0D', '#1C8DC1', '#A578F2'] },
  { text: 'Metaverse & VR scenarios', colors: ['#0D0D0D', '#1E8DC2', '#A578F2'] },
  { text: 'Slide 3', colors: ['#0D0D0D', '#64B5E6', '#A578F2'] },
  { text: 'Slide 4', colors: ['#0D0D0D', '#4BA3D8', '#A578F2'] },
  { text: 'Slide 5', colors: ['#0D0D0D', '#1E8DC2', '#A578F2'] },
  { text: 'Slide 6', colors: ['#0D0D0D', '#64B5E6', '#A578F2'] },
  { text: 'Slide 7', colors: ['#0D0D0D', '#4BA3D8', '#A578F2'] },
  { text: 'Slide 8', colors: ['#0D0D0D', '#1C8DC1', '#A578F2'] }
]

// Create gradient texture for the background
const createGradientTexture = (colors: string[]) => {
  const canvas = document.createElement('canvas')
  canvas.width = 1024
  canvas.height = 1024
  const context = canvas.getContext('2d')!

  const gradient = context.createRadialGradient(
    canvas.width * 0.6583,
    canvas.height * 0.0648,
    0,
    canvas.width * 0.6583,
    canvas.height * 0.0648,
    canvas.width
  )

  gradient.addColorStop(0.69, colors[0])
  gradient.addColorStop(0.9, colors[1])
  gradient.addColorStop(1, colors[2])

  context.fillStyle = gradient
  context.fillRect(0, 0, canvas.width, canvas.height)

  const texture = new THREE.CanvasTexture(canvas)
  texture.needsUpdate = true
  return texture
}

export function Carousel3dSection() {
  const sectionRef = useRef(null)
  const containerRef = useRef(null)
  const [rotation, setRotation] = useState(0)
  const rotationY = useRef(0)
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0)

  const gradientTexture = useMemo(() => {
    const currentIndex = Math.floor(rotation)
    const nextIndex = Math.min(currentIndex + 1, slidesData.length - 1)
    const progress = rotation - currentIndex

    // Interpolate colors
    const currentColors = slidesData[currentIndex].colors
    const nextColors = slidesData[nextIndex].colors
    const interpolatedColors = currentColors.map((color, i) => {
      const current = new THREE.Color(color)
      const next = new THREE.Color(nextColors[i])
      return new THREE.Color(
        current.r + (next.r - current.r) * progress,
        current.g + (next.g - current.g) * progress,
        current.b + (next.b - current.b) * progress
      ).getHexString()
    })

    return createGradientTexture(interpolatedColors.map((c) => `#${c}`))
  }, [rotation])

  const triggerLength = window.innerHeight * (slidesData.length - 1) * 0.7

  useEffect(() => {
    let proxy = { rot: 0 }

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top top',
        end: `+=${triggerLength}px`,
        pin: true,
        pinSpacing: true,
        scrub: 1,
        anticipatePin: 1,
        onUpdate: (self) => {
          setCurrentSlideIndex(Math.floor(self.progress * (slidesData.length - 1)))
        }
      }
    })

    tl.to(proxy, {
      rot: slidesData.length - 1,
      ease: 'none',
      onUpdate: () => {
        setRotation(proxy.rot)
        rotationY.current = -proxy.rot * Math.PI * 0.33
      }
    })

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill())
      tl.kill()
    }
  }, [])

  const radius = 0.6

  return (
    <section
      ref={sectionRef}
      style={{
        position: 'relative',
        height: `100vh`,
        background: '#161616',
        overflow: 'hidden'
      }}>
      <div
        ref={containerRef}
        style={{
          position: 'relative',
          height: '100vh',
          width: '100%'
        }}>
        <Canvas
          shadows
          style={{
            position: 'absolute',
            left: '50%',
            top: '50%',
            transform: 'translate(-50%, -50%)',
            width: 1600,
            height: 1600,
            zIndex: 10
          }}
          camera={{ position: [0, 0, 4], fov: 70 }}>
          {/* Glowing background wall */}
          <mesh position={[0, 1.85, -0.3]} scale={[6, 7.3, 1]}>
            <planeGeometry />
            <meshBasicMaterial map={gradientTexture} transparent opacity={0.45} side={THREE.DoubleSide} />
          </mesh>

          <pointLight position={[4, 2, -2]} intensity={0.5} color="#A578F2" />
          <pointLight position={[-6, 4, -1]} intensity={20} color="#A578F2" />

          <spotLight position={[-4, 2, 2]} angle={2} penumbra={0} intensity={100} color="#2bb9ff" />
          <spotLight position={[0, 1, 2]} angle={2} penumbra={0} intensity={20} color="#A578F2" />

          <directionalLight
            castShadow
            position={[2, 5, 4]}
            intensity={0.8}
            shadow-mapSize-width={1024}
            shadow-mapSize-height={1024}
            shadow-camera-far={15}
            shadow-camera-left={-6}
            shadow-camera-right={6}
            shadow-camera-top={6}
            shadow-camera-bottom={-6}
          />
          <MyModel rotationY={rotationY} position={[0, -2.3, 0]} />
          {slidesData.map((slide, i) => {
            const angleStep = (2 * Math.PI) / slidesData.length
            const baseAngle = i * angleStep - rotation * angleStep
            const distanceFromActive = Math.abs(i - rotation)
            const x = radius * Math.sin(baseAngle)
            const y = -0.7 * (i - rotation)
            const z = radius * Math.cos(baseAngle)
            const rotationY = Math.atan2(x, z)
            const scale = Math.max(0.5, 1 - distanceFromActive * 0.3)

            return <Slide3D key={i} text={slide.text} position={[x, y, z]} rotation={[0, rotationY, 0]} scale={scale} />
          })}
        </Canvas>
      </div>
    </section>
  )
}
