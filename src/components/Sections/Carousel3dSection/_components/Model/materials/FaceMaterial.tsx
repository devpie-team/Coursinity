import { useLoader } from '@react-three/fiber'
import * as THREE from 'three'
import { useEffect } from 'react'

export function FaceMaterial() {
  const baseColorMap = useLoader(THREE.TextureLoader, '/assets/3d/textures/face/T_Face_BC.PNG')
  const normalMap = useLoader(THREE.TextureLoader, '/assets/3d/textures/face/T_Face_N.PNG')
  const sssMap = useLoader(THREE.TextureLoader, '/assets/3d/textures/face/T_Face_Scatter.PNG')
  const srmfMap = useLoader(THREE.TextureLoader, '/assets/3d/textures/face/T_Face_SRMF.PNG')

  useEffect(() => {
    try {
      baseColorMap.colorSpace = THREE.SRGBColorSpace
      normalMap.colorSpace = THREE.NoColorSpace
      sssMap.colorSpace = THREE.NoColorSpace
      srmfMap.colorSpace = THREE.NoColorSpace

      baseColorMap.flipY = false
      normalMap.flipY = false
      sssMap.flipY = false
      srmfMap.flipY = false
    } catch (error) {
      console.error('Error setting up face textures:', error)
    }
  }, [baseColorMap, normalMap, sssMap, srmfMap])

  const material = new THREE.MeshPhysicalMaterial({
    map: baseColorMap,
    normalMap: normalMap,
    roughnessMap: srmfMap,
    metalnessMap: srmfMap,

    // Subsurface Scattering
    transmission: 0.5,
    thicknessMap: sssMap, // scatter texture
    thickness: 0.05, // matches Blender scale
    attenuationDistance: 0.2, // approximated from average radius
    attenuationColor: new THREE.Color(1.0, 0.2, 0.1), // RGB radius converted to color

    roughness: 0.1,
    metalness: 0.1,
    specularIntensity: 1.0,
    specularColor: new THREE.Color(0xffffff),
    side: THREE.FrontSide
  })

  return material
}
