import { Canvas } from '@react-three/fiber'
import { useRef, useEffect, useState, useMemo } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { MyModel } from './_components/Model/Model'
import { Slide3D } from './_components/Slide3D/Slide3d'
import { ParticlePlane } from './_components/ParticlePlane/ParticlePlane'
import * as THREE from 'three'
import { Float, Environment, OrbitControls } from '@react-three/drei'
import { EffectComposer, ChromaticAberration, Bloom, DepthOfField, Vignette, Noise } from '@react-three/postprocessing'
import { BlendFunction } from 'postprocessing'

gsap.registerPlugin(ScrollTrigger)

const slidesData = [
  { text: 'AI Transformation', colors: ['#0D0D0D', '#1C8DC1', '#A578F2'] },
  { text: 'Immersive VR Labs', colors: ['#0D0D0D', '#1E8DC2', '#A578F2'] },
  { text: 'Tailored Journeys', colors: ['#0D0D0D', '#64B5E6', '#A578F2'] },
  { text: 'Beyond-Class Engagement', colors: ['#0D0D0D', '#4BA3D8', '#A578F2'] },
  { text: 'Live Coaching', colors: ['#0D0D0D', '#1E8DC2', '#A578F2'] },
  { text: 'Reusable Programs', colors: ['#0D0D0D', '#64B5E6', '#A578F2'] },
  { text: 'Gamified Learning', colors: ['#0D0D0D', '#4BA3D8', '#A578F2'] },
  { text: 'On-Job Upskilling', colors: ['#0D0D0D', '#1C8DC1', '#A578F2'] },
  { text: 'Success Partners', colors: ['#0D0D0D', '#1C8DC1', '#A578F2'] },
  { text: 'Evergreen Paths', colors: ['#0D0D0D', '#1E8DC2', '#A578F2'] },
  { text: 'Hybrid Delivery', colors: ['#0D0D0D', '#64B5E6', '#A578F2'] },
  { text: 'Audit-Ready Compliance', colors: ['#0D0D0D', '#4BA3D8', '#A578F2'] },
  { text: 'White-Label Academies', colors: ['#0D0D0D', '#1E8DC2', '#A578F2'] },
  { text: 'Certifications', colors: ['#0D0D0D', '#64B5E6', '#A578F2'] }
]

export function Carousel3dSection() {
  const sectionRef = useRef(null)
  const containerRef = useRef(null)
  const [rotation, setRotation] = useState(0)
  const rotationY = useRef(0)
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0)
  const [modelY, setModelY] = useState(0)
  const [effectStrength, setEffectStrength] = useState(0)
  const lastScrollTime = useRef(Date.now())
  const lastRotation = useRef(0)

  const triggerLength = window.innerHeight * slidesData.length * 1.2

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
          const newY = -2.65 - self.progress * 0.3
          setModelY(newY)
        }
      }
    })

    tl.to(proxy, {
      rot: slidesData.length, // Full rotation through all 14 slides
      ease: 'none',
      onUpdate: () => {
        setRotation(proxy.rot)
        rotationY.current = -proxy.rot * Math.PI * 0.15 // Slower model rotation for 14 slides
      }
    })

    frameId = requestAnimationFrame(updateVelocity)

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill())
      tl.kill()
      cancelAnimationFrame(frameId)
    }
  }, [])

  const radius = 1
  const circleCenter = [0, -0.1, 0]

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
          camera={{ position: [0, 0, 2], fov: 70 }}>
          {/* Enhanced lighting setup with dynamic effects */}
          <fog attach="fog" args={['#161616', 8, 15]} />

          {/* Dynamic orbital lights that respond to scroll */}
          <pointLight
            position={[Math.sin(rotation * 1.3) * 3.5, 2.5, Math.cos(rotation * 1.3) * 3.5]}
            intensity={2.5 + effectStrength * 2}
            color={`hsl(${280 + rotation * 20}, 70%, 65%)`}
            distance={12}
            decay={1.2}
          />
          <pointLight
            position={[-Math.sin(rotation * 0.8) * 2.5, -1.5, -Math.cos(rotation * 0.8) * 2.5]}
            intensity={2 + effectStrength}
            color={`hsl(${200 + rotation * 15}, 80%, 60%)`}
            distance={10}
            decay={1}
          />

          {/* Subtle fill lighting that breathes */}
          <pointLight
            position={[0, -2, 1]}
            intensity={0.8 + Math.sin(rotation * 2) * 0.3}
            color="#4c1d95"
            distance={8}
            decay={2}
          />

          {/* Edge lighting for depth */}
          <pointLight
            position={[4, 0, -1]}
            intensity={1.2 + effectStrength * 0.8}
            color="#1e3a8a"
            distance={6}
            decay={1.5}
          />
          <pointLight
            position={[-4, 0, -1]}
            intensity={1.2 + effectStrength * 0.8}
            color="#3730a3"
            distance={6}
            decay={1.5}
          />

          {/* Original lighting setup */}
          <directionalLight castShadow position={[5, 3, 3]} intensity={1.5} />
          <directionalLight castShadow position={[30, 3, 3]} intensity={3} />
          <ambientLight position={[-3, 3, 10]} intensity={0.4} color="#f5ebd0" />
          <pointLight position={[0, 1, 1.6]} intensity={1} color="#faf6d4" distance={50} decay={2} castShadow />
          {/* Rotating color-changing spotlight */}
          <spotLight
            position={[Math.cos(rotation * 2) * 2, 1, Math.sin(rotation * 2) * 2]}
            intensity={3 + Math.sin(rotation * 3) * 1.5}
            color={`hsl(${(rotation * 60) % 360}, 80%, 60%)`}
            angle={0.6}
            penumbra={0.8}
            distance={4}
            decay={1.5}
            castShadow
          />

          {/* Pulsing rim light */}
          <pointLight
            position={[0, 3, -2]}
            intensity={2 + Math.sin(rotation * 4) * 1}
            color="#3b82f6"
            distance={6}
            decay={2}
          />

          {/* Ambient glow that follows active slide */}
          <pointLight
            position={[
              Math.sin((rotation * (2 * Math.PI)) / slidesData.length) * 1.5,
              0.5,
              0.2 + Math.cos((rotation * (2 * Math.PI)) / slidesData.length) * 1.5
            ]}
            intensity={1.5 + effectStrength}
            color="#8b5cf6"
            distance={3}
            decay={1}
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

          {/* Particle Plane */}
          <ParticlePlane
            position={[0, 1, -4]}
            width={6}
            height={3}
            depth={4}
            particleCount={20000}
            particleSize={0.01}
            randomness={150}
            waveIntensity={30}
            waveSpeed={0.01}
            scrollProgress={rotation * 0.3}
          />

          {/* 3D Spiral Carousel - Fixed Positions System */}
          {slidesData.map((slide, i) => {
            // 3D Spiral/Helix parameters
            const spiralTurns = 1.5
            const verticalSpacing = 0.15
            const spiralRadius = radius
            const totalSlides = slidesData.length

            // Generate extended positions on spiral (including positions before and after for natural flow)
            const fixedPositions = []
            const startOffset = 10 // Start spiral before position 0
            const endOffset = 10 // Continue spiral after last position
            const totalPositions = totalSlides + startOffset + endOffset

            for (let pos = -startOffset; pos < totalSlides + endOffset; pos++) {
              const posProgress = pos / totalSlides
              const posAngle = posProgress * spiralTurns * 2 * Math.PI
              const posX = circleCenter[0] + spiralRadius * Math.sin(posAngle)
              const posZ = circleCenter[2] + spiralRadius * Math.cos(posAngle)
              const posY = circleCenter[1] - pos * verticalSpacing
              fixedPositions.push({ x: posX, y: posY, z: posZ, angle: posAngle })
            }

            // Calculate which position this slide should be at - NO CYCLING
            const slideOffset = i - rotation + startOffset // Add offset to account for extended start
            const currentPositionIndex = Math.floor(slideOffset)
            const nextPositionIndex = currentPositionIndex + 1
            const interpolationFactor = slideOffset - Math.floor(slideOffset)

            // Ensure we don't go beyond available positions (finite spiral)
            if (
              currentPositionIndex < 0 ||
              nextPositionIndex < 0 ||
              currentPositionIndex >= fixedPositions.length - 1 ||
              nextPositionIndex >= fixedPositions.length
            ) {
              return null // Hide slides that go beyond spiral bounds
            }

            // Get current and next positions
            const currentPos = fixedPositions[currentPositionIndex]
            const nextPos = fixedPositions[nextPositionIndex]

            // Smooth interpolation between positions
            const x = currentPos.x + (nextPos.x - currentPos.x) * interpolationFactor
            const y = currentPos.y + (nextPos.y - currentPos.y) * interpolationFactor
            const z = currentPos.z + (nextPos.z - currentPos.z) * interpolationFactor

            // Interpolate rotation as well
            const currentAngle = currentPos.angle
            const nextAngle = nextPos.angle
            let angleDiff = nextAngle - currentAngle
            // Handle angle wrap-around
            if (angleDiff > Math.PI) angleDiff -= 2 * Math.PI
            if (angleDiff < -Math.PI) angleDiff += 2 * Math.PI
            const interpolatedAngle = currentAngle + angleDiff * interpolationFactor

            // Calculate distance from camera/front for effects
            const distanceFromCamera = Math.sqrt(x * x + (z - 2) * (z - 2))
            const normalizedDistance = Math.min(distanceFromCamera / (spiralRadius * 2), 1)

            // Face camera with consistent right inclination
            const rotationY = Math.atan2(x - circleCenter[0], z - circleCenter[2])
            const rotationX = 0
            const rotationZ = -0.06

            // All slides same size
            const scale = 1.0

            // Opacity based on distance and height
            const proximityOpacity = Math.max(0.3, 1.2 - normalizedDistance)
            const heightOpacity = Math.max(0.4, 1.0 + (y - circleCenter[1]) * 0.05)
            const opacity = Math.min(proximityOpacity, heightOpacity)

            return (
              <group key={i} visible={true}>
                <Slide3D
                  text={slide.text}
                  position={[x, y, z]}
                  rotation={[rotationX, rotationY, rotationZ]}
                  scale={scale}
                  opacity={opacity}
                />
              </group>
            )
          })}

          {/* Post-processing Effects */}
          <EffectComposer>
            <Noise premultiply opacity={0.2} blendFunction={BlendFunction.OVERLAY} />
          </EffectComposer>
        </Canvas>
      </div>
    </section>
  )
}
