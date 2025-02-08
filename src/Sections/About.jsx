import React, { useState, useCallback, Suspense } from "react";
import "../index.css"; // Ensure correct path for your CSS file
import Button from "./../components/Button";
import { MdMail } from "react-icons/md";
import { Canvas } from "@react-three/fiber";

// Lazy load EarthGlobe for performance improvement
const EarthGlobe = React.lazy(() => import("../constants/EarthGlobe"));

const About = () => {
  const [hasCopied, setHasCopied] = useState(false);

  const handleCopy = useCallback(() => {
    // Copy to clipboard
    navigator.clipboard.writeText("umarfarooq6153@gmail.com");
    setHasCopied(true);
    setTimeout(() => {
      setHasCopied(false);
    }, 2000);
  }, []);

  const handleNavigate = useCallback(() => {
    // Open the mail client in a separate window/tab
    window.open("mailto:umarfarooq6153@gmail.com", "_blank");
  }, []);

  return (
    <section className="my-18 min-h-screen mx-10" id="about">
      <div className="grid xl:grid-cols-3 xl:grid-rows-6 md:grid-cols-2 grid-cols-1 gap-6">
        {/* First Grid Item - Profile */}
        <div className="col-span-1 xl:row-span-3">
          <div className="w-full h-full bg-gray-900 rounded-lg sm:p-7 p-4 flex flex-col gap-5">
            <div className="relative">
              <img
                src="assets/Grid1.webp"
                alt="grid-1"
                className="w-full h-full object-cover rounded-lg shadow-xl transform transition duration-300 hover:scale-105"
                loading="lazy"
                width="500" // Set width and height to avoid layout shifts
                height="500"
              />
            </div>
            <div className="mt-4">
              <h1 className="text-3xl font-semibold text-white tracking-wide mb-3">
                Omer Awan
              </h1>
              <p className="text-lg text-gray-300 leading-relaxed">
                Front-end Engineer specializing in responsive, intuitive
                interfaces that combine creativity and functionality, with a
                focus on integrating dynamic
                <span className="text-3d-effect font-bold">
                  {" "}
                  3D websites
                </span>{" "}
                for enhanced user interaction.
              </p>
            </div>
          </div>
        </div>

        {/* Second Grid Item - Dev Stack */}
        <div className="col-span-1 xl:row-span-3">
          <div className="w-full h-full bg-gray-900 rounded-lg sm:p-7 p-4 flex flex-col gap-5">
            <div className="relative">
              <img
                src="assets/grid2.png"
                alt="grid-2"
                className="w-full h-full object-cover rounded-lg shadow-xl transform transition duration-300 hover:scale-105"
                loading="lazy"
                width="500"
                height="500"
              />
            </div>
            <div className="mt-4">
              <h1 className="text-3xl font-semibold text-white tracking-wide mb-3">
                Dev Stack
              </h1>
              <p className="text-lg text-gray-300 leading-relaxed">
                I specialize in JavaScript and ReactJS, with extensive
                experience using various third-party libraries to build dynamic,
                responsive, and visually appealing web applications.
              </p>
            </div>
          </div>
        </div>

        {/* Third Grid Item - Earth Globe and Contact */}
        <div className="col-span-1 xl:row-span-4">
          <div className="w-full h-full bg-[#111827] rounded-lg sm:p-7 p-4 flex flex-col gap-5">
            {/* Earth Globe */}
            <div className="rounded-3xl w-full xl:h-[400px] md:h-[370px] sm:h-[326px] h-fit flex justify-center items-center">
              <Suspense fallback={<div>Loading Earth Globe...</div>}>
                <Canvas>
                  <ambientLight intensity={0.5} />
                  <directionalLight position={[10, 10, 10]} intensity={1} />
                  <EarthGlobe />
                </Canvas>
              </Suspense>
            </div>

            {/* Timezone and Location */}
            <div className="mt-5">
              <p className="text-lg text-gray-300 leading-relaxed">
                I’m highly adaptable with time zone coordination and locations
              </p>
              <p className="text-lg text-gray-300 leading-relaxed">
                I’m located in Gujranwala, Pakistan, and open to remote work
              </p>
            </div>

            {/* Button */}
            <div className="mt-5">
              <Button name="Contact me" href="#contact" />
            </div>
          </div>
        </div>

        {/* Grid 4 */}
        <div className="xl:col-span-2 xl:row-span-3">
          <div className="w-full h-full bg-[#111827] rounded-lg sm:p-7 p-4 flex flex-col gap-5">
            <img
              src="assets/grid3.png"
              alt="grid-3"
              className="w-full xl:h-[400px] md:h-[370px] sm:h-[266px] h-fit object-contain"
              loading="lazy"
              width="500"
              height="500"
            />
            <div>
              <p className="text-3xl font-semibold text-white tracking-wide mb-3">
                Code Craze
              </p>
              <p className="text-lg text-gray-300 leading-relaxed">
                Driven by a passion for problem-solving, I create innovative
                solutions through code. Programming is more than a
                profession—it's a commitment to continuous learning and skill
                enhancement.
              </p>
            </div>
          </div>
        </div>

        {/* Grid 5 */}
        <div className="xl:col-span-1 xl:row-span-2">
          <div className="w-full h-full bg-[#111827] rounded-lg sm:p-7 p-4 flex flex-col gap-5">
            <img
              src="assets/grid4.png"
              alt="grid-4"
              className="w-full md:h-[126px] sm:h-[276px] h-fit object-cover sm:object-top"
              loading="lazy"
              width="500"
              height="500"
            />
            <div className="space-y-2">
              <p className="text-center text-3xl font-semibold text-white tracking-wide mb-3">
                Contact me
              </p>
              <div className="flex flex-col justify-center items-center gap-4">
                {/* Copy email */}
                <div
                  className="cursor-pointer flex justify-center items-center gap-2"
                  onClick={handleCopy}
                >
                  <img
                    src={hasCopied ? "assets/tick.svg" : "assets/copy.svg"}
                    alt="copy"
                    className="h-6 w-6"
                  />
                  <span className="text-lg font-medium text-white">
                    {hasCopied ? "Copied!" : "Copy Email"}
                  </span>
                </div>
                {/* Open mail client */}
                <div
                  className="cursor-pointer flex justify-center items-center gap-2"
                  onClick={handleNavigate}
                >
                  <MdMail className="text-3xl text-white" />
                  <span className="text-lg font-medium text-white">
                    Umarfarooq6153@gmail.com
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
