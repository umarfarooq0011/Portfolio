import React, { useRef, useEffect } from "react";
import { useFrame } from "@react-three/fiber";
import { Sphere, Torus, Trail, Float } from "@react-three/drei";
import * as THREE from "three";
import gsap from "gsap";

const Target = () => {
  const torusRef1 = useRef();
  const torusRef2 = useRef();
  const nucleusRef = useRef();
  const electronRef1 = useRef();
  const electronRef2 = useRef();
  const electronRef3 = useRef();

  // 🌀 GSAP Animation for Orbit Rotation
  useEffect(() => {
    gsap.to(torusRef1.current.rotation, {
      y: Math.PI * 2,
      duration: 6,
      repeat: -1,
      ease: "power1.inOut",
    });

    gsap.to(torusRef2.current.rotation, {
      x: Math.PI * 2,
      duration: 8,
      repeat: -1,
      ease: "power1.inOut",
    });
  }, []);

  // 🔄 Electron Circular Motion
  useFrame((state) => {
    const time = state.clock.getElapsedTime();

    electronRef1.current.position.set(
      Math.sin(time * 2) * 1.2, // X
      Math.cos(time * 2) * 0.8, // Y
      0
    );

    electronRef2.current.position.set(
      Math.sin(time * 2.5) * 1.1, // X
      Math.cos(time * 2.5) * 0.9, // Y
      0.4
    );

    electronRef3.current.position.set(
      Math.sin(time * 3) * 1.3, // X
      Math.cos(time * 3) * 0.7, // Y
      -0.4
    );
  });

  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={0.8}>
      {/* 🌟 Softly Glowing Nucleus */}
      <Sphere ref={nucleusRef} args={[0.5, 64, 64]}>
        <meshStandardMaterial
          color={new THREE.Color(0.2, 0.4, 1)} // Soft natural blue
          emissive={new THREE.Color(0.1, 0.3, 0.9)} // Subtle glow
          emissiveIntensity={1.3} // Balanced brightness
          roughness={0.5} // Softer surface
          metalness={0.2} // Slight metallic reflection
        />
      </Sphere>

      {/* 🌀 Rotating Electron Orbits */}
      <mesh ref={torusRef1} scale={[1.1, 1.1, 1.1]}>
        <torusGeometry args={[1.2, 0.08, 32, 100]} />
        <meshStandardMaterial
          color={new THREE.Color(0.3, 0.3, 0.8)} // Muted blue
          emissive={new THREE.Color(0.1, 0.2, 0.7)}
          emissiveIntensity={0.8}
          roughness={0.4}
          metalness={0.5}
        />
      </mesh>

      <mesh ref={torusRef2} scale={[1.2, 1.2, 1.2]} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[1.1, 0.1, 32, 100]} />
        <meshStandardMaterial
          color={new THREE.Color(0.2, 0.3, 0.7)}
          emissive={new THREE.Color(0.1, 0.1, 0.6)}
          emissiveIntensity={0.7}
          roughness={0.3}
          metalness={0.6}
        />
      </mesh>

      {/* ⚡ Orbiting Electrons with Reflective Look */}
      <Electron ref={electronRef1} />
      <Electron ref={electronRef2} />
      <Electron ref={electronRef3} />
    </Float>
  );
};

// ⚛️ Electron Component with Realistic Reflection
const Electron = React.forwardRef((props, ref) => {
  return (
    <Trail width={1.2} length={6} color={new THREE.Color(0.6, 0.7, 1)} attenuation={(t) => t * t}>
      <mesh ref={ref}>
        <sphereGeometry args={[0.12, 32, 32]} />
        <meshStandardMaterial
          color={new THREE.Color(1, 1, 1)} // **White electrons**
          emissive={new THREE.Color(0.5, 0.5, 0.8)}
          emissiveIntensity={0.4} // **Softer glow**
          roughness={0.1} // **Glass-like smoothness**
          metalness={0.9} // **Reflective metallic effect**
        />
      </mesh>
    </Trail>
  );
});

export default Target;
