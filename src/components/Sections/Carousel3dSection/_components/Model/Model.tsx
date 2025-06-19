import { useRef, useEffect } from 'react'
import { useFrame } from '@react-three/fiber'
import { useGLTF } from '@react-three/drei'
import * as THREE from 'three'

type MyModelProps = {
  rotationY: number
  position?: [number, number, number]
}

export function MyModel({ rotationY, position = [0, 0, 0] }: MyModelProps) {
  const model = useGLTF('/assets/3d/models/spiral.glb')
  const ref = useRef<THREE.Group>(null)

  useFrame(() => {
    if (ref.current) {
      ref.current.rotation.y = rotationY
    }
  })

  return <primitive ref={ref} object={model.scene} position={position} scale={0.7} />
}
