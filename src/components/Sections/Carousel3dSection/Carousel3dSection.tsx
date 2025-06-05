import { Canvas } from '@react-three/fiber'
import { useRef, useEffect, useState, useMemo } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { MyModel } from './_components/Model/Model'
import { Slide3D } from './_components/Slide3D/Slide3d'
import * as THREE from 'three'
import { Float, Environment } from '@react-three/drei'
import { EffectComposer, ChromaticAberration, Bloom } from '@react-three/postprocessing'
import { BlendFunction } from 'postprocessing'

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
  const [modelY, setModelY] = useState(-4)
  const [effectStrength, setEffectStrength] = useState(0)
  const lastScrollTime = useRef(Date.now())
  const lastRotation = useRef(0)

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
    let frameId: number

    const updateVelocity = () => {
      const currentTime = Date.now()
      const deltaTime = (currentTime - lastScrollTime.current) / 1000 // Convert to seconds
      const rotationDelta = Math.abs(proxy.rot - lastRotation.current)

      // Calculate velocity in rotations per second
      const newVelocity = rotationDelta / Math.max(deltaTime, 0.016)
      setEffectStrength(Math.min(newVelocity * 2, 1)) // Cap at 1 and scale for effect

      lastScrollTime.current = currentTime
      lastRotation.current = proxy.rot
      frameId = requestAnimationFrame(updateVelocity)
    }

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
          const newY = -4 - self.progress * 0.3
          setModelY(newY)
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

    frameId = requestAnimationFrame(updateVelocity)

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill())
      tl.kill()
      cancelAnimationFrame(frameId)
    }
  }, [])

  const radius = 1.5
  const circleCenter = [0, -0.3, -0.5]
  const zScale = 1
  const xScale = 1.5

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
          width: '100vw'
        }}>
        <Canvas
          shadows
          style={{
            position: 'absolute',
            left: '50%',
            top: '50%',
            transform: 'translate(-50%, -50%)',
            width: 2000,
            height: 1600,
            zIndex: 10
          }}
          camera={{ position: [0, 0, 3.2], fov: 70 }}>
          <Environment preset="city" />

          {/* Background gradient mesh */}
          <mesh position={[0, 1.85, -0.3]} scale={[6, 7.3, 1]}>
            <planeGeometry />
            <meshBasicMaterial map={gradientTexture} transparent opacity={0.45} side={THREE.DoubleSide} />
          </mesh>

          {/* Original lighting setup */}
          <directionalLight castShadow position={[5, 3, 3]} intensity={1.5} />
          <directionalLight castShadow position={[30, 3, 3]} intensity={3} />
          <ambientLight position={[-3, 3, 10]} intensity={0.4} color="#f5ebd0" />
          <pointLight position={[0, 1, 1.6]} intensity={1} color="#faf6d4" distance={50} decay={2} castShadow />
          <spotLight
            position={[1, 0, 0]}
            intensity={5.5}
            color="#f6fa0a"
            angle={0.8}
            penumbra={0.5}
            distance={2}
            decay={2}
            castShadow
          />
          <spotLight
            position={[0, -1.1, 1.1]}
            intensity={1.5}
            color="#726bff"
            angle={0.8}
            penumbra={0.5}
            distance={2}
            decay={2}
            castShadow
          />

          <Float speed={2} rotationIntensity={0.2} floatIntensity={0.2}>
            <MyModel rotationY={rotationY} position={[0, modelY, 0]} />
          </Float>

          {/* Cards */}
          {slidesData.map((slide, i) => {
            const angleStep = (2 * Math.PI) / slidesData.length
            const baseAngle = i * angleStep - rotation * angleStep
            const distanceFromActive = Math.abs(i - rotation)

            // Show 3 slides by increasing threshold
            if (distanceFromActive > 1.5) return null

            const x = circleCenter[0] + radius * Math.sin(baseAngle) * xScale
            const waveAmplitude = 0.5
            const normalizedAngle = ((baseAngle % (2 * Math.PI)) + 2 * Math.PI) % (2 * Math.PI)
            const verticalOffset = Math.sin(normalizedAngle - Math.PI) * waveAmplitude
            const y = circleCenter[1] + verticalOffset
            const z = circleCenter[2] + radius * Math.cos(baseAngle) * zScale
            const rotationY = Math.atan2(xScale * Math.cos(baseAngle), -zScale * Math.sin(baseAngle)) - Math.PI / 2

            // Smooth scale transition between center and sides
            const maxScale = 1.2 // Scale at center
            const minScale = 0.6 // Scale at sides
            // Use a smooth interpolation based on distance
            const scale = maxScale - distanceFromActive * (maxScale - minScale)

            // Smoother opacity transition
            const opacity = Math.max(0, 1 - distanceFromActive / 1.5)

            return (
              <group key={i} visible={true}>
                <Slide3D
                  text={slide.text}
                  position={[x, y, z]}
                  rotation={[0, rotationY, 0]}
                  scale={scale}
                  opacity={opacity}
                />
              </group>
            )
          })}
        </Canvas>
      </div>
    </section>
  )
}
