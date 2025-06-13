import { useLoader } from '@react-three/fiber'
import * as THREE from 'three'
import { useEffect } from 'react'

export function LegsMaterial() {
  const baseColorMap = useLoader(THREE.TextureLoader, '/assets/3d/textures/legs/T_Legs_BC.PNG')
  const normalMap = useLoader(THREE.TextureLoader, '/assets/3d/textures/legs/T_Legs_N.PNG')
  const sssMap = useLoader(THREE.TextureLoader, '/assets/3d/textures/legs/T_Legs_Scatter.PNG')
  const srmfMap = useLoader(THREE.TextureLoader, '/assets/3d/textures/legs/T_Legs_SRMF.PNG')

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
      console.error('Error setting up legs textures:', error)
    }
  }, [baseColorMap, normalMap, sssMap, srmfMap])

  const material = new THREE.MeshPhysicalMaterial({
    map: baseColorMap,
    normalMap: normalMap,
    roughnessMap: srmfMap,
    metalnessMap: srmfMap,

    transmission: 0.5,
    thicknessMap: sssMap,
    thickness: 0.05,
    attenuationDistance: 0.2,
    attenuationColor: new THREE.Color(1.0, 0.2, 0.1),

    roughness: 0.1,
    metalness: 0.1,
    specularIntensity: 1.0,
    specularColor: new THREE.Color(0xffffff),
    side: THREE.FrontSide
  })

  return material
}
