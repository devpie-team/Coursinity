import { useLoader } from '@react-three/fiber'
import * as THREE from 'three'
import { useEffect } from 'react'

interface GroomMaterialProps {
  partName?: string
}

export function GroomMaterial({ partName }: GroomMaterialProps = {}) {
  const prefix = partName ? partName.toLowerCase() : 'groom'
  const baseColorMap = useLoader(THREE.TextureLoader, `/assets/3d/textures/groom/T_${prefix}_BC.PNG`)
  const normalMap = useLoader(THREE.TextureLoader, `/assets/3d/textures/groom/T_${prefix}_N.PNG`)
  const sssMap = useLoader(THREE.TextureLoader, `/assets/3d/textures/groom/T_${prefix}_Scatter.PNG`)
  const srmfMap = useLoader(THREE.TextureLoader, `/assets/3d/textures/groom/T_${prefix}_SRMF.PNG`)

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
      console.error(`Error setting up ${prefix} textures:`, error)
    }
  }, [baseColorMap, normalMap, sssMap, srmfMap, prefix])

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
