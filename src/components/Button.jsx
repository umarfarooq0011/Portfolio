import React from "react";

const Button = ({ name, href }) => {
  return (
    <div className="relative flex items-center justify-center">
      <a
        href={href} // Use href here
        className="relative flex items-center px-8 py-4 bg-gray-700 hover:bg-gray-800 transition-all duration-300 rounded-md shadow-lg text-white font-semibold tracking-wide text-lg w-[250px] h-[50px] whitespace-nowrap"
      >
        {/* Pinging Green Dot Inside the Button (Left Side) */}
        <div className="absolute left-8 w-3 h-3 bg-green-600 rounded-full animate-ping"></div>
        <div className="absolute left-8 w-3 h-3 bg-green-600 rounded-full"></div>

        {/* Button Text - Dynamic Name */}
        <span className="ml-8">{name}</span>
      </a>
    </div>
  );
};

export default Button;
