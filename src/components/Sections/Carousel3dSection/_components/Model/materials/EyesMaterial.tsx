import { useLoader } from '@react-three/fiber'
import * as THREE from 'three'
import { useEffect, useMemo } from 'react'

export function EyesMaterial() {
  // Load textures with logging
  const baseColorMap = useLoader(THREE.TextureLoader, '/assets/3d/textures/eyes/T_EyeScleraL_BC.jpg')
  const normalMap = useLoader(THREE.TextureLoader, '/assets/3d/textures/eyes/T_EyeScleraL_N.jpg')

  useEffect(() => {
    // Log texture loading status
    console.log('Eye base color map:', {
      loaded: baseColorMap?.image !== undefined,
      image: baseColorMap?.image,
      source: baseColorMap?.source?.data?.src
    })
    console.log('Eye normal map:', {
      loaded: normalMap?.image !== undefined,
      image: normalMap?.image,
      source: normalMap?.source?.data?.src
    })

    try {
      baseColorMap.colorSpace = THREE.SRGBColorSpace
      normalMap.colorSpace = THREE.NoColorSpace
      baseColorMap.flipY = false
      normalMap.flipY = false
    } catch (error) {
      console.error('Error setting up eye textures:', error)
    }
  }, [baseColorMap, normalMap])

  // Create a test material with just color
  const material = useMemo(() => {
    // First try a simple colored material
    const testMaterial = new THREE.MeshStandardMaterial({
      color: 'white',
      metalness: 0.0,
      roughness: 0.1,
      side: THREE.FrontSide
    })

    // If textures loaded successfully, use them
    if (baseColorMap?.image && normalMap?.image) {
      return new THREE.MeshStandardMaterial({
        color: new THREE.Color(0xf0f0f0),
        map: baseColorMap,
        normalMap: normalMap,
        metalness: 0.0,
        roughness: 0.5,
        side: THREE.FrontSide,
        transparent: false,
        opacity: 1.0
      })
    }

    // Return test material if textures failed to load
    console.warn('Using fallback material for eyes - textures not loaded')
    return testMaterial
  }, [baseColorMap, normalMap])

  return material
}
