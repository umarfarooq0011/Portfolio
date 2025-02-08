import React, { Suspense, useState, useCallback } from "react";
import { myProjects } from "../constants";
import { Canvas } from '@react-three/fiber';
import { Center, OrbitControls } from '@react-three/drei';
import CanvasLoader from './../components/CanvasLoader';
import DemoComputer from "../components/DemoComputer";

const Projects = () => {
  const [selectedProjectIndex, setSelectedProjectIndex] = useState(0);
  const currentProjects = myProjects[selectedProjectIndex];
  const projectCount = myProjects.length;

  const handleNavigation = useCallback((direction) => {
    setSelectedProjectIndex((prevIndex) => {
      if (direction === "previous") {
        return prevIndex === 0 ? projectCount - 1 : prevIndex - 1;
      } else {
        return prevIndex === projectCount - 1 ? 0 : prevIndex + 1;
      }
    });
  }, [projectCount]);

  return (
    <section className="sm:px-10 px-5 my-0 min-h-screen" id="work">
      <p className=" sm:text-4xl text-3xl font-semibold text-gray_gradient;">
        Work Gallery
      </p>
      <div className="grid lg:grid-cols-2 grid-cols-1 mt-12 gap-5 w-full">
        <div className="flex flex-col gap-5 relative sm:p-10 py-10 px-5 shadow-2xl shadow-black/90">
          {/* Spotlight Image */}
          <div className="absolute top-0 right-0">
            <img
              className="w-full h-96 object-cover rounded-xl"
              src={currentProjects.spotlight}
              alt="spotlight"
              loading="lazy"  // Lazy load image
              width="500" 
              height="500"
            />
          </div>

          <div
            className="p-3 backdrop-filter backdrop-blur-3xl w-fit rounded-lg"
            style={currentProjects.logoStyle}
          >
            <img
              className="w-10 h-10 shadow-sm"
              src={currentProjects.logo}
              alt="logo"
              loading="lazy"  // Lazy load logo
            />
          </div>

          <div className="flex flex-col gap-5 text-white my-5">
            <p className="text-white text-2xl font-medium">
              {currentProjects.title}
            </p>
            <p className="text-gray_light text-sm">{currentProjects.desc}</p>
            <p className="text-gray_light text-sm">{currentProjects.subdesc}</p>
          </div>

          <div className="flex items-center justify-between flex-wrap gap-5">
            <div className="flex items-center gap-3">
              {currentProjects.tags.map((tag, index) => (
                <div
                  key={index}
                  className="w-10 h-10 rounded-md p-2 shadow-black/90 bg-opacity-10 backdrop-filter backdrop-blur-lg flex justify-center items-center"
                >
                  <img src={tag.path} alt={tag.name} loading="lazy" />
                </div>
              ))}
            </div>
            <a
              href={currentProjects.href}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-2 text-white hover:text-gray-400 transition duration-300"
            >
              <p className="text-base transition duration-300 transform hover:scale-110">
                Visit the Site
              </p>
              <img
                className="w-6 h-6 transition duration-300 transform hover:scale-125 hover:animate-bounce"
                src="/assets/arrow-up.png"
                alt="arrow"
              />
            </a>
          </div>

          <div className="flex justify-between items-center mt-7">
            <button
              onClick={() => handleNavigation("previous")}
              className="w-10 h-10 p-3 cursor-pointer active:scale-95 transition-all rounded-full arrow-gradient"
            >
              <img
                className="w-full h-full object-contain"
                src="/assets/left-arrow.png"
                alt="left-arrow"
                loading="lazy"
              />
            </button>

            <button
              onClick={() => handleNavigation("next")}
              className="w-10 h-10 p-3 cursor-pointer active:scale-95 transition-all rounded-full arrow-gradient"
            >
              <img
                className="w-full h-full object-contain"
                src="/assets/right-arrow.png"
                alt="right-arrow"
                loading="lazy"
              />
            </button>
          </div>
        </div>

        {/* 3D Computer Section */}
        <div className="border border-black/100 bg-black/30 rounded-lg h-96 md:h-full">
          <Canvas>
            <ambientLight intensity={Math.PI} />
            <directionalLight position={[10, 10, 5]} />
            <Center>
              <Suspense fallback={<CanvasLoader />}>
                <group scale={2} position={[0, -3, 0]} rotation={[0, -0.1, 0]}>
                  <DemoComputer texture={currentProjects.texture} />
                </group>
              </Suspense>
            </Center>
            <OrbitControls maxPolarAngle={Math.PI / 2} enableZoom={false} />
          </Canvas>
        </div>
      </div>
    </section>
  );
};

export default Projects;
