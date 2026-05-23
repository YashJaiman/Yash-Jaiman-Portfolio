import React from 'react';

const NoiseOverlay = () => {
  return (
    <div className="fixed inset-0 w-full h-full pointer-events-none z-[9999] opacity-[0.02] mix-blend-overlay hidden md:block" aria-hidden="true">
      <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
        <filter id="noiseFilter">
          <feTurbulence 
            type="fractalNoise" 
            baseFrequency="0.65" 
            numOctaves="3" 
            stitchTiles="stitch" />
        </filter>
        <rect width="100%" height="100%" filter="url(#noiseFilter)" />
      </svg>
    </div>
  );
};

export default NoiseOverlay;
