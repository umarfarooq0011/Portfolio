import React from "react";
import { Html, useProgress } from "@react-three/drei";

const CanvasLoader = () => {
  const { progress } = useProgress();

  return (
    <Html center>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
        }}
      >
        <span className="canvas-loader"></span>
        <p
          style={{
            fontSize: "14px",
            color: "#F1F1F1",
            fontWeight: "800",
            marginTop: "40px",
          }}
        >
          {progress !== 0 ? `${progress.toFixed(2)}%` : "Loading..."}
        </p>
      </div>
    </Html>
  );
};

export default CanvasLoader;
