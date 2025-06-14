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
import { LightingSetup } from './_components/LightingSetup/LightingSetup'

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

// Add useMediaQuery hook
const useMediaQuery = (query: string) => {
  const [matches, setMatches] = useState(false)

  useEffect(() => {
    const media = window.matchMedia(query)
    if (media.matches !== matches) {
      setMatches(media.matches)
    }
    const listener = () => setMatches(media.matches)
    media.addEventListener('change', listener)
    return () => media.removeEventListener('change', listener)
  }, [matches, query])

  return matches
}

export function Carousel3dSection() {
  const isMobile = useMediaQuery('(max-width: 768px)')
  const sectionRef = useRef(null)
  const containerRef = useRef(null)
  const [rotation, setRotation] = useState(0)
  const rotationY = useRef(0)
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0)
  const [modelY, setModelY] = useState(-2.7)
  const [effectStrength, setEffectStrength] = useState(0)
  const lastScrollTime = useRef(Date.now())
  const lastRotation = useRef(0)

  const triggerLength = window.innerHeight * slidesData.length * 1.2

  // Adjust parameters based on screen size
  const radius = isMobile ? 0.6 : 1
  const verticalSpacing = isMobile ? 0.15 : 0.15
  const spiralTurns = isMobile ? 2 : 1.5
  const circleCenter = [0, -0.1, 0]

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
          const newY = -2.7 - self.progress * 0.3
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

  return (
    <section
      ref={sectionRef}
      style={{
        position: 'relative',
        height: `100vh`,
        background: '#0D0D0D',
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
            width: isMobile ? 1200 : 2000,
            height: isMobile ? 900 : 1600,
            zIndex: 10
          }}
          camera={{ position: [0, 0, isMobile ? 1.5 : 2], fov: isMobile ? 75 : 70 }}>
          <LightingSetup
            rotation={rotation}
            effectStrength={effectStrength}
            currentSlideIndex={currentSlideIndex}
            slidesData={slidesData}
          />

          {/* <Float speed={2} rotationIntensity={0.2} floatIntensity={0.2}>
            <MyModel rotationY={rotationY.current} position={[0, modelY, 0]} />
          </Float> */}

          <ParticlePlane
            position={[0, 0, -5]}
            startY={-4}
            endY={-1.7}
            width={8}
            height={4}
            depth={6}
            particleCount={15000}
            particleSize={0.01}
            randomness={150}
            waveIntensity={50}
            waveSpeed={0.01}
            scrollProgress={rotation * 0.3}
          />

          {/* 3D Spiral Carousel - Fixed Positions System */}
          {slidesData.map((slide, i) => {
            // Use the responsive parameters
            const totalSlides = slidesData.length

            // Generate extended positions on spiral
            const fixedPositions = []
            const startOffset = isMobile ? 8 : 10
            const endOffset = isMobile ? 8 : 10
            const totalPositions = totalSlides + startOffset + endOffset

            for (let pos = -startOffset; pos < totalSlides + endOffset; pos++) {
              const posProgress = pos / totalSlides
              const posAngle = posProgress * spiralTurns * 2 * Math.PI
              const posX = circleCenter[0] + radius * Math.sin(posAngle)
              const posZ = circleCenter[2] + radius * Math.cos(posAngle)
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
            const normalizedDistance = Math.min(distanceFromCamera / (radius * 2), 1)

            // Face camera with consistent right inclination
            const rotationY = Math.atan2(x - circleCenter[0], z - circleCenter[2])
            const rotationX = 0
            const rotationZ = -0.05

            // Adjust scale for mobile
            const scale = isMobile ? 0.7 : 1.0

            // Adjust opacity calculations for mobile
            const proximityOpacity = Math.max(isMobile ? 0.4 : 0.3, 1.2 - normalizedDistance)
            const heightOpacity = Math.max(isMobile ? 0.5 : 0.4, 1.0 + (y - circleCenter[1]) * 0.05)
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

          {/* <OrbitControls
            enableZoom={true}
            enablePan={true}
            enableRotate={true}
            minDistance={2}
            maxDistance={10}
            minPolarAngle={Math.PI / 4}
            maxPolarAngle={(Math.PI * 3) / 4}
          /> */}

          {/* Post-processing Effects */}
          <EffectComposer>
            <Noise premultiply opacity={0.2} blendFunction={BlendFunction.OVERLAY} />
          </EffectComposer>
        </Canvas>
      </div>
    </section>
  )
}
