import { useRef, useEffect } from 'react'
import { useFrame } from '@react-three/fiber'
import { useGLTF } from '@react-three/drei'
import { MutableRefObject } from 'react'
import * as THREE from 'three'
import { EyesMaterial } from './materials/EyesMaterial'
import { FaceMaterial } from './materials/FaceMaterial'
import { ArmsMaterial } from './materials/ArmsMaterial'
import { LegsMaterial } from './materials/LegsMaterial'
import { RobeMaterial } from './materials/RobeMaterial'
import { KeffiyeahMaterial } from './materials/KeffiyeahMaterial'
import { AgalsMaterial } from './materials/AgalsMaterial'
import { GroomMaterial } from './materials/GroomMaterial'

type MyModelProps = {
  rotationY: MutableRefObject<number>
  position?: [number, number, number]
}

export function MyModel({ rotationY, position = [0, 0, 0] }: MyModelProps) {
  const model = useGLTF('/assets/3d/models/arab_new.glb')
  const ref = useRef<THREE.Group>(null)

  const eyesMaterial = EyesMaterial()
  const faceMaterial = FaceMaterial()
  const armsMaterial = ArmsMaterial()
  const legsMaterial = LegsMaterial()
  const robeMaterial = RobeMaterial()
  const keffiyeahMaterial = KeffiyeahMaterial()
  const agal1Material = AgalsMaterial({ forAgal: 1 })
  const agal2Material = AgalsMaterial({ forAgal: 2 })
  const beardMaterial = GroomMaterial({ partName: 'Beard' })
  const eyebrowsMaterial = GroomMaterial({ partName: 'Eyebrows' })
  const mustacheMaterial = GroomMaterial({ partName: 'Mustache' })

  // Create eyes material with the same settings as EyesMaterial
  const eyesTextureMaterial = new THREE.MeshPhysicalMaterial({
    map: eyesMaterial.map,
    normalMap: eyesMaterial.normalMap,
    metalness: 0.0,
    roughness: 0.2, // matches Blender value
    ior: 1.5, // Index of Refraction like Blender
    transmission: 0.0, // no subsurface or glass
    side: THREE.FrontSide
  })

  // Apply materials to model
  useEffect(() => {
    if (model.scene) {
      // Log all mesh names first
      console.log('All meshes in model:')
      model.scene.traverse((child) => {
        if (child instanceof THREE.Mesh) {
          console.log('Mesh name:', child.name)
        }
      })

      // Then apply materials
      model.scene.traverse((child) => {
        if (child instanceof THREE.Mesh) {
          const meshName = child.name.toLowerCase()
          console.log('Processing mesh:', meshName, {
            geometry: child.geometry.type,
            vertices: child.geometry.attributes.position.count,
            material: child.material?.type
          })

          // Apply materials based on mesh name
          if (meshName === 'face002') {
            console.log('Applying face material to Face002')
            child.material = faceMaterial
          } else if (meshName === 'face003') {
            console.log('Applying eyes material to Face003')
            child.material = eyesTextureMaterial
          } else if (meshName.includes('béziercircle')) {
            console.log('Found BézierCircle mesh:', {
              name: child.name,
              position: child.position.toArray(),
              scale: child.scale.toArray()
            })
            // Поки що не застосовуємо матеріал, тільки логуємо інформацію
          } else if (meshName.includes('body')) {
            console.log('Applying arms material to body:', meshName)
            child.material = armsMaterial
          } else if (meshName.includes('robe')) {
            child.material = robeMaterial
          } else if (meshName.includes('keffiyeah')) {
            child.material = keffiyeahMaterial
          } else if (meshName.includes('agal1')) {
            child.material = agal1Material
          } else if (meshName.includes('agal2')) {
            child.material = agal2Material
          } else if (meshName.includes('beard')) {
            child.material = beardMaterial
          } else if (meshName.includes('eyebrows')) {
            child.material = eyebrowsMaterial
          } else if (meshName.includes('mustache')) {
            child.material = mustacheMaterial
          } else if (meshName.includes('legs')) {
            child.material = legsMaterial
          }

          // Enable shadows for all meshes
          child.castShadow = true
          child.receiveShadow = true
        }
      })
    }
  }, [])

  useFrame(() => {
    if (ref.current) {
      ref.current.rotation.y = rotationY.current
    }
  })

  return <primitive ref={ref} object={model.scene} position={position} scale={2} />
}
