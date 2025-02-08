import React, { useRef } from 'react'
import { useGLTF } from '@react-three/drei'
import { OrbitControls } from '@react-three/drei' // Import OrbitControls
import { useFrame } from '@react-three/fiber'

const EarthGlobe = (props) => {
  const { nodes, materials } = useGLTF('models/earth-v1.glb')
  const globeRef = useRef()

  // Set the slower, constant rotation speed
  const rotationSpeed = 0.010 // Slow rotation speed

  // Continuous rotation logic
  useFrame(() => {
    if (globeRef.current) {
      globeRef.current.rotation.y += rotationSpeed // Apply slow, consistent rotation
    }
  })

  return (
    <group {...props} dispose={null}>
      <mesh
        ref={globeRef}
        castShadow
        receiveShadow
        geometry={nodes.Object_4.geometry}
        material={materials['Scene_-_Root']}
        scale={2.00}
      />
      {/* OrbitControls for mouse/touch interaction */}
      <OrbitControls enableZoom={false} /> {/* Disable zoom if preferred */}
    </group>
  )
}

useGLTF.preload('models/earth-v1.glb')

export default EarthGlobe
