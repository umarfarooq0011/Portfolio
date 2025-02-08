import React, { useState, useEffect, useRef, Suspense, useMemo } from "react";
import "../index.css";
import { dynamicText } from "../constants/DynamicText";
import { CSSTransition } from "react-transition-group";
import { Canvas } from "@react-three/fiber";
import { PerspectiveCamera } from "@react-three/drei";

// Lazy load components for better performance
const Computerroom = React.lazy(() => import("../components/ComputerRoom"));
const Target = React.lazy(() => import("../components/Target"));
const ReactLogo = React.lazy(() => import("../components/ReactLogo"));
const Cube = React.lazy(() => import("../components/Cube"));
import HeroCamera from "../components/HeroCamera";
import Button from "../components/Button";
import CanvasLoader from "../components/CanvasLoader";

// Hero text component for fast LCP (Largest Contentful Paint)
const HeroText = () => (
  <p className="text-xl font-medium text-center font-stretch-ultra-expanded sm:text-3xl">
    Hi, I’m{" "}
    <span className="text-[#7d3cff] font-bold">Omer</span>
    <span className="custom-wave text-4xl">👋</span>
  </p>
);

const Hero = () => {
  const [responsiveValues, setResponsiveValues] = useState({
    position: [1.4, 0.8, 7.0],
    rotation: [0.4, -1.2, -0.2],
    scale: [1.1, 1.1, 1.1],
  });
  const [targetPosition, setTargetPosition] = useState([-3.5, 5, 3]);
  const [reactLogoValues, setReactLogoValues] = useState({
    position: [7, 5, 2],
    scale: [1, 1, 1],
  });

  // Update values based on window size (optimized for responsiveness)
  useEffect(() => {
    const updateValues = () => {
      const width = window.innerWidth;

      if (width < 480) {
        setResponsiveValues({
          position: [0.8, 0.4, 4.5],
          rotation: [0.2, -0.6, -0.1],
          scale: [0.6, 0.6, 0.6],
        });
        setTargetPosition([-4.2, 4.5, 2]);
        setReactLogoValues({
          position: [5, 3.8, 0.6],
          scale: [0.5, 0.5, 0.5],
        });
      } else if (width < 768) {
        setResponsiveValues({
          position: [1.0, 0.5, 5.0],
          rotation: [0.3, -0.8, -0.15],
          scale: [0.8, 0.8, 0.8],
        });
        setTargetPosition([-4.5, 6.2, 2]);
        setReactLogoValues({
          position: [5.5, 5.5, 2.2],
          scale: [0.6, 0.6, 0.6],
        });
      } else if (width < 1024) {
        setResponsiveValues({
          position: [1.2, 0.7, 6.0],
          rotation: [0.35, -1.0, -0.18],
          scale: [1.0, 1.0, 1.0],
        });
        setTargetPosition([-7.8, 11, 2.5]);
        setReactLogoValues({
          position: [6.8, 6, 2.5],
          scale: [0.8, 0.8, 0.8],
        });
      } else {
        setResponsiveValues({
          position: [1.4, 0.8, 7.0],
          rotation: [0.4, -1.2, -0.2],
          scale: [1.1, 1.1, 1.1],
        });
        setTargetPosition([-12, 7.2, 2.5]);
        setReactLogoValues({
          position: [10, 5.5, 8],
          scale: [1, 1, 1],
        });
      }
    };

    updateValues();
    window.addEventListener("resize", updateValues);
    return () => window.removeEventListener("resize", updateValues);
  }, []);

  // Animation logic for dynamic text
  const [currentIndex, setCurrentIndex] = useState(0);
  const [inProp, setInProp] = useState(true);
  const nodeRef = useRef(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setInProp(false);
      setTimeout(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % dynamicText.length);
        setInProp(true);
      }, 800);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  // Memoize positions for better performance
  const memoizedResponsiveValues = useMemo(() => responsiveValues, [responsiveValues]);
  const memoizedTargetPosition = useMemo(() => targetPosition, [targetPosition]);
  const memoizedReactLogoValues = useMemo(() => reactLogoValues, [reactLogoValues]);

  return (
    <section className="min-h-screen w-full flex flex-col overflow-x-hidden" id="home" aria-label="Hero section">
      {/* Hero Text */}
      <div className="w-full px-2 mx-auto flex flex-col lg:mt-24 sm:mt-36 mt-20 c-space gap-3">
        <Suspense fallback={<p>Loading...</p>}>
          <HeroText />
        </Suspense>
        <CSSTransition in={inProp} timeout={800} classNames="fade" unmountOnExit nodeRef={nodeRef}>
          <p
            ref={nodeRef}
            className="text-lg sm:text-2xl font-light text-center mt-4"
            style={{
              fontFamily: "'JetBrains Mono', monospace",
              color: "#7d3cff",
              fontWeight: "600",
              transform: "scale(1.05)",
              letterSpacing: "0.02em",
            }}
          >
            {dynamicText[currentIndex]}
          </p>
        </CSSTransition>
      </div>

      {/* 3D Canvas */}
      <div className="w-full h-full absolute inset-0 mt-10 sm:mt-16 md:mt-20 lg:mt-25 xl:mt-32">
        <Canvas shadows className="w-full h-full">
          <Suspense fallback={<CanvasLoader />}>
            <PerspectiveCamera makeDefault position={[0, 0, 35]} />
            <HeroCamera responsiveValues={memoizedResponsiveValues}>
              <ambientLight intensity={0.8} />
              <directionalLight position={[-10, 10, 10]} intensity={5} castShadow />
              <spotLight position={[0, 5, 10]} intensity={4} angle={0.3} penumbra={1} castShadow shadow-mapSize-width={1024} shadow-mapSize-height={1024} />

              {/* 3D Components */}
              <Suspense fallback={<CanvasLoader />}>
                <Computerroom position={memoizedResponsiveValues.position} rotation={memoizedResponsiveValues.rotation} scale={memoizedResponsiveValues.scale} />
              </Suspense>

              <group position={memoizedTargetPosition}>
                <Suspense fallback={null}>
                  <Target />
                </Suspense>
              </group>

              <group position={memoizedReactLogoValues.position} scale={memoizedReactLogoValues.scale}>
                <Suspense fallback={null}>
                  <ReactLogo />
                </Suspense>
              </group>

              <group>
                <Suspense fallback={null}>
                  <Cube />
                </Suspense>
              </group>
            </HeroCamera>
          </Suspense>
        </Canvas>
      </div>

      {/* Optimized Button */}
      <a href="#about" className="absolute bottom-7 left-0 right-0 w-full z-10 c-space">
        <Button name="Build Together" />
      </a>
    </section>
  );
};

export default Hero;
