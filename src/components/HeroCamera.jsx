import { useFrame } from "@react-three/fiber";
import React, { useRef } from "react";
import { easing } from "maath";

const HeroCamera = ({ children, responsiveValues }) => {
  const groupRef = useRef();

  useFrame((state, delta) => {
    // Move the camera smoothly
    easing.damp3(state.camera.position, [0, 0, 35], 0.25, delta);

    if (groupRef.current) {
      // Rotate the group based on mouse movement
      const x = (state.pointer.x * Math.PI) / 8; // Smooth rotation based on pointer
      const y = (state.pointer.y * Math.PI) / 6;

      easing.dampE(groupRef.current.rotation, [y, -x, 0], 0.2, delta);
    }
  });

  return (
    <group ref={groupRef}>
      {/* ✅ Add a Directional Light from the left side */}
      <directionalLight
        position={[-10, 10, 10]} // Left side light source
        intensity={6} // Adjust brightness
        castShadow // Enable shadows for realism
      />

       <spotLight
        position={[0, 5, 10]} // Spotlight above
        intensity={4} // Focused brightness
        angle={0.3}
        penumbra={1}
        castShadow
      />

      {/* ✅ Optional: Add another light from the right to balance the lighting */}
      <directionalLight
        position={[0, 5, 15]} // Right side light
        intensity={1.2} // Slightly dimmer
      />

      {/* ✅ Optional: Ambient light for global illumination */}
      <ambientLight intensity={0.5} />

      {children}
    </group>
  );
};

export default HeroCamera;
