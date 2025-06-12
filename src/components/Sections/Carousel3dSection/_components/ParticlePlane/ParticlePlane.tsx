import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

interface ParticlePlaneProps {
  position?: [number, number, number]
  width?: number
  height?: number
  depth?: number
  particleCount?: number
  particleSize?: number
  randomness?: number
  waveIntensity?: number
  waveSpeed?: number
  scrollProgress?: number
}

export function ParticlePlane({
  position = [0, 0, -2],
  width = 6,
  height = 4,
  depth = 2,
  particleCount = 16000,
  particleSize = 0.05,
  randomness = 0.2,
  waveIntensity = 0.5,
  waveSpeed = 1,
  scrollProgress = 0
}: ParticlePlaneProps) {

  // Use the exact particle count for volume filling
  const actualParticleCount = particleCount

  // Create positions and colors for particles
  const { positions, colors, basePositions } = useMemo(() => {
    const tempPositions = []
    const tempColors = []
    const tempBasePositions = []

    // Define blue-themed color variations with glow potential
    const colorVariations = [
      new THREE.Color(0x1e3a8a), // Dark blue
      new THREE.Color(0x3b82f6), // Bright blue
      new THREE.Color(0x60a5fa), // Light blue
      new THREE.Color(0x93c5fd), // Very light blue
      new THREE.Color(0x06b6d4), // Cyan blue
      new THREE.Color(0x6366f1), // Indigo purple
      new THREE.Color(0x8b5cf6), // Purple
      new THREE.Color(0x5b21b6)  // Dark purple
    ]

        // Generate particles in different formations with gaps
    let placedParticles = 0
    const maxAttempts = particleCount * 3
    let attempts = 0
    
    while (placedParticles < particleCount && attempts < maxAttempts) {
      attempts++
      
      // Choose formation type based on particle index
      const formationType = Math.floor(placedParticles / (particleCount / 4)) // 4 different formations
      let x = 0, y = 0, z = 0, shouldPlace = false
      
      switch (formationType) {
        case 0: // Circular formation
          {
            const radius = width * 0.3
            const angle = Math.random() * Math.PI * 2
            const distance = Math.sqrt(Math.random()) * radius
            x = Math.cos(angle) * distance
            z = Math.sin(angle) * distance
            y = (Math.random() - 0.5) * height * 0.8
            shouldPlace = true
          }
          break
          
        case 1: // Donut/Torus formation with gap in center
          {
            const outerRadius = width * 0.35
            const innerRadius = width * 0.15
            const angle = Math.random() * Math.PI * 2
            const distance = innerRadius + Math.random() * (outerRadius - innerRadius)
            x = Math.cos(angle) * distance
            z = Math.sin(angle) * distance
            y = (Math.random() - 0.5) * height * 0.6
            shouldPlace = true
          }
          break
          
        case 2: // Spiral formation
          {
            const spiralTurns = 3
            const t = Math.random()
            const angle = t * Math.PI * 2 * spiralTurns
            const radius = t * width * 0.3
            x = Math.cos(angle) * radius
            z = Math.sin(angle) * radius
            y = (Math.random() - 0.5) * height * 0.7
            shouldPlace = true
          }
          break
          
        case 3: // Wave formation with gaps
        default:
          {
            x = (Math.random() - 0.5) * width * 0.8
            z = (Math.random() - 0.5) * depth * 0.8
            // Create wave pattern with gaps
            const waveY = Math.sin(x * 3) * height * 0.2
            const gapPattern = Math.sin(x * 5) * Math.cos(z * 3)
            if (Math.abs(gapPattern) > 0.3) { // Create gaps
              y = waveY + (Math.random() - 0.5) * height * 0.3
              shouldPlace = true
            }
          }
          break
      }
      
      if (shouldPlace) {
        // Add randomness to position
        const randomOffsetX = (Math.random() - 0.5) * randomness * particleSize * 2
        const randomOffsetY = (Math.random() - 0.5) * randomness * particleSize * 2
        const randomOffsetZ = (Math.random() - 0.5) * randomness * particleSize * 2
        
        const finalX = x + randomOffsetX
        const finalY = y + randomOffsetY
        const finalZ = z + randomOffsetZ
        
        // Store both animated positions and base positions
        tempPositions.push(finalX, finalY, finalZ)
        tempBasePositions.push(finalX, finalY, finalZ)
        
        // Randomly select a color variation for each particle
        const randomColorIndex = Math.floor(Math.random() * colorVariations.length)
        const color = colorVariations[randomColorIndex]
        
        tempColors.push(color.r, color.g, color.b)
        
        placedParticles++
      }
    }

    return {
      positions: new Float32Array(tempPositions),
      colors: new Float32Array(tempColors),
      basePositions: new Float32Array(tempBasePositions)
    }
  }, [particleCount, width, height, depth, randomness, particleSize])

    // Create different particle shapes and instance data
  const particleShapes = useMemo(() => {
    // Create different geometries for variety
    const shapes = [
      new THREE.BoxGeometry(particleSize, particleSize, particleSize), // Cube
      new THREE.SphereGeometry(particleSize * 0.6, 8, 6), // Sphere
      new THREE.TetrahedronGeometry(particleSize * 0.8), // Tetrahedron
      new THREE.OctahedronGeometry(particleSize * 0.7), // Octahedron
      new THREE.ConeGeometry(particleSize * 0.5, particleSize * 1.2, 6), // Cone
    ]
    
    const tempMatrix = new THREE.Matrix4()
    const tempObject = new THREE.Object3D()
    
    // Create instance data for each shape
    return shapes.map((geometry, shapeIndex) => {
      const particlesPerShape = Math.floor(actualParticleCount / shapes.length)
      const instanceMatrix = new Float32Array(particlesPerShape * 16)
      const shapeColors = new Float32Array(particlesPerShape * 3)
      const shapePositions = new Float32Array(particlesPerShape * 3)
      
      for (let i = 0; i < particlesPerShape; i++) {
        const globalIndex = shapeIndex * particlesPerShape + i
        if (globalIndex < actualParticleCount) {
          const x = positions[globalIndex * 3]
          const y = positions[globalIndex * 3 + 1]
          const z = positions[globalIndex * 3 + 2]
          
          // Store positions for this shape
          shapePositions[i * 3] = x
          shapePositions[i * 3 + 1] = y
          shapePositions[i * 3 + 2] = z
          
          // Store colors for this shape
          shapeColors[i * 3] = colors[globalIndex * 3]
          shapeColors[i * 3 + 1] = colors[globalIndex * 3 + 1]
          shapeColors[i * 3 + 2] = colors[globalIndex * 3 + 2]
          
          tempObject.position.set(x, y, z)
          tempObject.scale.setScalar(1)
          tempObject.updateMatrix()
          
          tempMatrix.copy(tempObject.matrix)
          tempMatrix.toArray(instanceMatrix, i * 16)
        }
      }
      
      return {
        geometry,
        instanceMatrix,
        colors: shapeColors,
        positions: shapePositions,
        count: particlesPerShape
      }
    })
  }, [positions, colors, actualParticleCount, particleSize])

  // Create glowing material with instanceColor support
  const material = useMemo(() => {
    const mat = new THREE.MeshStandardMaterial({
      transparent: true,
      opacity: 0.8,
      vertexColors: false,
      emissive: new THREE.Color(0x2a1f5f), // Purple glow
      emissiveIntensity: 0.3,
      roughness: 0.1,
      metalness: 0.9,
    })
    return mat
  }, [])

  // Set up instanceColor on the mesh
  const setupInstanceColors = (mesh: THREE.InstancedMesh, shapeColors: Float32Array) => {
    if (mesh && shapeColors) {
      mesh.instanceColor = new THREE.InstancedBufferAttribute(shapeColors, 3)
      mesh.instanceColor.needsUpdate = true
    }
  }

    // Store mesh refs for each shape
  const meshRefs = useRef<THREE.InstancedMesh[]>([])

  // Animate the particles with wave motion based on scroll
  useFrame((state) => {
    if (meshRefs.current.length > 0) {
      // Use scroll progress as the primary animation driver
      const scrollTime = scrollProgress * waveSpeed
      const clockTime = state.clock.elapsedTime * 0.2 // Slow background animation
      const time = scrollTime + clockTime
      
      const tempMatrix = new THREE.Matrix4()
      const tempObject = new THREE.Object3D()
      
      // Animate each shape group
      particleShapes.forEach((shape, shapeIndex) => {
        const mesh = meshRefs.current[shapeIndex]
        if (!mesh || !shape.positions) return
        
        for (let i = 0; i < shape.count; i++) {
          // Get base position for this shape's particle
          const baseX = shape.positions[i * 3]
          const baseY = shape.positions[i * 3 + 1]
          const baseZ = shape.positions[i * 3 + 2]
          
          // Create variety in particle behavior based on global index
          const globalIndex = shapeIndex * shape.count + i
          const particleVariation = (globalIndex * 0.618033988749) % 1
          const speedMultiplier = 0.1 + particleVariation * 0.2
          const sizeMultiplier = 0.2 + particleVariation * 1.8
          
          // Scroll-influenced speed
          const scrollInfluence = 1 + Math.abs(scrollProgress) * 0.2 * speedMultiplier
          const effectiveTime = time * speedMultiplier * scrollInfluence
          
          // Calculate wave offset with varying speeds
          const waveOffsetX = Math.sin(effectiveTime + baseX * 2 + baseY * 1.5) * waveIntensity * 0.1 * speedMultiplier
          const waveOffsetZ = Math.sin(effectiveTime + baseZ * 3 + baseX * 2) * waveIntensity * 0.15 * speedMultiplier
          
          // Scroll-based flow animation
          const baseFlowSpeed = 0.5 + speedMultiplier * 1.0
          const scrollFlow = scrollProgress * baseFlowSpeed * scrollInfluence
          const flowOffset = (scrollFlow + globalIndex * 0.1) % (height + 2)
          let flowY = baseY + flowOffset - height / 2 - 1
          
          // Reset particles that go above the top
          if (flowY > height / 2 + 1) {
            flowY = -height / 2 - 1 + (flowY - (height / 2 + 1))
          }
          
          // Combine wave motion with flow
          const waveOffsetY = Math.cos(effectiveTime + baseY * 2 + baseX * 1.5) * waveIntensity * 0.1 * speedMultiplier
          
          // Apply motion
          const x = baseX + waveOffsetX
          const y = flowY + waveOffsetY
          const z = baseZ + waveOffsetZ
          
          // Add pulsating effect based on time and scroll
          const pulseFreq = 0.5 + particleVariation * 2.0 // Different pulse speeds
          const pulseEffect = 1 + Math.sin(effectiveTime * pulseFreq) * 0.3 * (1 + Math.abs(scrollProgress) * 0.5)
          const finalSize = sizeMultiplier * pulseEffect
          
          // Add rotation effect for some shapes
          const rotationSpeed = particleVariation * 2.0
          const rotationX = effectiveTime * rotationSpeed
          const rotationY = effectiveTime * rotationSpeed * 0.7
          const rotationZ = effectiveTime * rotationSpeed * 0.3
          
          tempObject.position.set(x, y, z)
          tempObject.scale.setScalar(finalSize)
          tempObject.rotation.set(rotationX, rotationY, rotationZ)
          tempObject.updateMatrix()
          
          tempMatrix.copy(tempObject.matrix)
          tempMatrix.toArray(mesh.instanceMatrix.array, i * 16)
        }
        
        mesh.instanceMatrix.needsUpdate = true
      })
    }
  })

  return (
    <group position={position}>
      {particleShapes.map((shape, index) => (
        <instancedMesh
          key={index}
          ref={(mesh) => {
            if (mesh) {
              meshRefs.current[index] = mesh
              setupInstanceColors(mesh, shape.colors)
            }
          }}
          args={[shape.geometry, material, shape.count]}
          instanceMatrix={new THREE.InstancedBufferAttribute(shape.instanceMatrix, 16)}
        />
      ))}
    </group>
  )
}
