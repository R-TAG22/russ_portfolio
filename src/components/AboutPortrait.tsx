import React from 'react';
import defaultAboutPhoto from '../assets/images/regenerated_image_1788105382320.jpg';

interface AboutPortraitProps {
  className?: string;
  enableRandomShapeInteraction?: boolean;
}

export const AboutPortrait: React.FC<AboutPortraitProps> = ({
  className = 'w-[500px] h-[500px]',
  enableRandomShapeInteraction = true,
}) => {
  return (
    <div
      id="about-portrait-wrapper"
      className={`relative flex items-center justify-center select-none group cursor-pointer ${className}`}
    >
      {/* Layer 0: Ambient Liquid Translucent Cyan & Steel Blue Glow matching dynamic shape */}
      <div
        className="absolute inset-[-14px] bg-gradient-to-tr from-[#38BDF8]/40 via-[#0EA5E9]/30 to-[#1E3A5F]/25 blur-2xl -z-20 animate-hero-glow pointer-events-none transition-transform duration-700 ease-out group-hover:scale-105"
      />

      {/* Layer 1: Liquid Steel Blue & Ice Cyan Outer Frame with Random Shape Changing Animation */}
      <div
        className="absolute inset-[-4px] bg-gradient-to-br from-[#38BDF8] via-[#1E3A5F] to-[#7DD3FC] opacity-80 -z-10 shadow-[0_10px_35px_rgba(30,58,95,0.3)] animate-hero-morph pointer-events-none transition-transform duration-700 ease-out group-hover:scale-[1.02]"
      />

      {/* Layer 2: Main Portrait Frame with Continuous Random Shape Changing Animation */}
      <div
        className="relative w-full h-full flex items-center justify-center overflow-hidden shadow-2xl border-4 border-white bg-white transition-transform duration-500 ease-out group-hover:scale-[1.02] animate-hero-morph"
        style={{ backgroundColor: '#FFFFFF' }}
      >
        <img
          src={defaultAboutPhoto}
          alt="Russell Taga-an - About"
          className="w-full h-full object-cover object-[35%_center] select-none transition-transform duration-700 ease-out scale-105 group-hover:scale-115 bg-[#ffffff] pointer-events-none"
          style={{ backgroundColor: '#ffffff' }}
        />
      </div>
    </div>
  );
};
