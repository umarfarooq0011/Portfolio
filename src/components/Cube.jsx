import React, { useRef, useState, useEffect } from "react";
import { useFrame } from "@react-three/fiber";
import { Float } from "@react-three/drei";
import * as THREE from "three";

const Cube = () => {
  const cubeRef = useRef();

  // ✅ Responsive State (Position & Scale) **UNCHANGED**
  const [cubeProps, setCubeProps] = useState({
    position: [-10, -3, -6], // More left
    scale: [1.5, 1.5, 1.5], // Default size
  });

  // ✅ Handle responsiveness inside Cube.jsx (UNCHANGED)
  useEffect(() => {
    const updateCubeProps = () => {
      const width = window.innerWidth;

      if (width < 480) {
        setCubeProps({
          position: [-6.5, -2, -5], // More left
          scale: [0.8, 0.8, 0.8], // Smaller size
        });
      } else if (width < 768) {
        setCubeProps({
          position: [-11, -6, -6], // More left
          scale: [1.5, 1.5, 1.5],
        });
      } else if (width < 1024) {
        setCubeProps({
          position: [-5, -9, -7], // Shift further left for tablets
          scale: [2, 2, 2],
        });
      } else {
        setCubeProps({
          position: [-25, -9, -12], // Even further left for large screens
          scale: [2.5, 2.5, 2.5], // Normal size
        });
      }
    };

    updateCubeProps();
    window.addEventListener("resize", updateCubeProps);
    return () => window.removeEventListener("resize", updateCubeProps);
  }, []);

  // 🔄 Continuous Rotation
  useFrame(({ clock }) => {
    cubeRef.current.rotation.x = clock.getElapsedTime() * 0.4;
    cubeRef.current.rotation.y = clock.getElapsedTime() * 0.6;
  });

  return (
    <Float speed={2.5} rotationIntensity={1.2} floatIntensity={2.2}>
      <mesh ref={cubeRef} position={cubeProps.position} scale={cubeProps.scale} castShadow receiveShadow>
        {/* Cube Geometry */}
        <boxGeometry args={[1, 1, 1]} />

        {/* ✨ Realistic Metallic Material */}
        <meshPhysicalMaterial
          color={new THREE.Color("#3A3A3A")} // **Titanium Dark Grey**
          emissive={new THREE.Color("#8C8C8C")} // **Steel-like Glow**
          emissiveIntensity={0.5} // **Subtle Edge Glow**
          metalness={1} // **Perfectly Metallic**
          roughness={0.1} // **Smooth & Polished**
          clearcoat={1} // **Reflective Clear Layer**
          clearcoatRoughness={0.05} // **Glossy Shine**
          reflectivity={1} // **Strong Reflection**
          transmission={0.2} // **Semi-Transparent Metal**
          transparent={true}
          opacity={0.95}
        />
      </mesh>
    </Float>
  );
};

export default Cube;
