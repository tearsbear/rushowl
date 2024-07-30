import React from "react";
import mapBackground from "../assets/map-background.png";

interface MapBackgroundProps {
  children: React.ReactNode;
}

const MapBackground: React.FC<MapBackgroundProps> = ({ children }) => (
  <div className="relative w-full lg:w-1/2">
    {" "}
    {/* Added overflow-hidden */}
    <img
      src={mapBackground}
      alt="Map Background"
      className="absolute inset-0 h-full w-full object-cover"
    />
    <div className="absolute inset-0 bg-[#1E1E1E] opacity-80 z-10"></div>
    <div className="relative z-20 flex flex-col justify-between h-full p-8 md:p-12 lg:p-16">
      {children}
    </div>
  </div>
);

export default MapBackground;
