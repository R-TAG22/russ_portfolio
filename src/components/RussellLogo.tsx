import React from 'react';
import russLogoTransparent from '../assets/Russ-Logo.png';
import russLogoOriginal from '../assets/Russ-Logo.jpeg';

interface RussellLogoProps {
  className?: string;
  size?: number | string;
  useOriginalJpeg?: boolean;
  alt?: string;
}

/**
 * Russell's Brand Logo Component:
 * Sourced from the official repository:
 * https://github.com/R-TAG22/russ_portfolio/blob/b60f10b8f552414764f170a26e6c7661ba4b9f6a/src/assets/Russ-Logo.jpeg
 * Features the steel blue metallic arch and glowing translucent ice-blue wing.
 * Rendered crisp with zero random shape borders.
 */
export const RussellLogo: React.FC<RussellLogoProps> = ({
  className = 'w-full h-full object-contain',
  size,
  useOriginalJpeg = false,
  alt = 'Russell Logo',
}) => {
  const dimensionStyles: React.CSSProperties = size
    ? typeof size === 'number'
      ? { width: `${size}px`, height: `${size}px` }
      : { width: size, height: size }
    : {};

  return (
    <img
      src={useOriginalJpeg ? russLogoOriginal : russLogoTransparent}
      alt={alt}
      style={dimensionStyles}
      className={`select-none object-contain pointer-events-none ${className}`}
      loading="eager"
      decoding="async"
    />
  );
};
