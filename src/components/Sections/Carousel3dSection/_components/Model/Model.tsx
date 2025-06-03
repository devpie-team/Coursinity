import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { useGLTF } from '@react-three/drei'
import { MutableRefObject } from 'react'
import * as THREE from 'three'

type MyModelProps = {
  rotationY: MutableRefObject<number>
  position?: [number, number, number]
}

export function MyModel({ rotationY, position = [0, 0, 0] }: MyModelProps) {
  const model = useGLTF('/assets/3d/models/arab.glb')
  const ref = useRef<THREE.Group>(null)

  useFrame(() => {
    if (ref.current) {
      ref.current.rotation.y = rotationY.current
    }
  })

  return <primitive ref={ref} object={model.scene} position={position} scale={2} />
}
