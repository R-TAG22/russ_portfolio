import React, { useState, useEffect, useRef, useMemo } from 'react';
import { Camera, Shuffle, Sparkles } from 'lucide-react';
import defaultRussellPhoto from '../assets/images/regenerated_image_1788105616348.png';

interface RussellPortraitProps {
  className?: string;
  blobVariant?: 'green' | 'blue' | 'steel' | 'white';
  showUploadControl?: boolean;
  enableRandomShapeInteraction?: boolean;
}

// Curated organic blob shapes for smooth liquid transitions
const CURATED_BLOBS = [
  '60% 40% 30% 70% / 60% 30% 70% 40%',
  '45% 55% 70% 30% / 35% 65% 35% 65%',
  '70% 30% 50% 50% / 30% 60% 40% 70%',
  '50% 50% 30% 70% / 55% 45% 55% 45%',
  '40% 60% 65% 35% / 40% 45% 55% 60%',
  '65% 35% 40% 60% / 55% 35% 65% 45%',
  '35% 65% 60% 40% / 65% 50% 50% 35%',
  '58% 42% 48% 52% / 43% 57% 43% 57%',
  '73% 27% 55% 45% / 38% 68% 32% 62%',
  '42% 58% 33% 67% / 61% 37% 63% 39%',
];

/**
 * Generate a randomized organic CSS border-radius
 */
const generateRandomBlob = (): string => {
  const r1 = Math.floor(Math.random() * 38) + 32;
  const r2 = Math.floor(Math.random() * 38) + 32;
  const r3 = Math.floor(Math.random() * 38) + 32;
  const r4 = Math.floor(Math.random() * 38) + 32;
  const r5 = Math.floor(Math.random() * 38) + 32;
  const r6 = Math.floor(Math.random() * 38) + 32;
  const r7 = Math.floor(Math.random() * 38) + 32;
  const r8 = Math.floor(Math.random() * 38) + 32;
  return `${r1}% ${100 - r1}% ${r2}% ${100 - r2}% / ${r3}% ${r4}% ${100 - r4}% ${100 - r3}%`;
};

export const RussellPortrait: React.FC<RussellPortraitProps> = ({
  className = 'w-full h-full',
  blobVariant = 'white',
  showUploadControl = true,
  enableRandomShapeInteraction = true,
}) => {
  const [customPhoto, setCustomPhoto] = useState<string | null>(null);
  const [activeShape, setActiveShape] = useState<string>(CURATED_BLOBS[0]);
  const [morphCount, setMorphCount] = useState<number>(1);
  const [isPopping, setIsPopping] = useState<boolean>(false);
  const [showMorphNotification, setShowMorphNotification] = useState<boolean>(false);
  const [isHovered, setIsHovered] = useState<boolean>(false);
  const [mouseOffset, setMouseOffset] = useState<{ x: number; y: number }>({ x: 0, y: 0 });

  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const portraitContainerRef = useRef<HTMLDivElement | null>(null);
  const notifyTimeoutRef = useRef<number | null>(null);

  useEffect(() => {
    try {
      const saved = localStorage.getItem('russell_custom_photo');
      if (saved) {
        setCustomPhoto(saved);
      }
    } catch {
      // Ignore localStorage read errors in restricted contexts
    }
  }, []);

  // Cycle or roll a brand-new random shape
  const triggerRandomShape = (e?: React.MouseEvent) => {
    if (e) {
      e.stopPropagation();
    }
    if (!enableRandomShapeInteraction) return;

    // Pick random blob that is distinct from current
    let nextShape = generateRandomBlob();
    while (nextShape === activeShape) {
      nextShape = generateRandomBlob();
    }

    setActiveShape(nextShape);
    setMorphCount((prev) => prev + 1);
    setIsPopping(true);
    setShowMorphNotification(true);

    if (notifyTimeoutRef.current) {
      window.clearTimeout(notifyTimeoutRef.current);
    }
    notifyTimeoutRef.current = window.setTimeout(() => {
      setShowMorphNotification(false);
    }, 1800);

    setTimeout(() => {
      setIsPopping(false);
    }, 450);
  };

  // Interactive mouse tracking over portrait to create fluid organic distortion
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!enableRandomShapeInteraction || !portraitContainerRef.current) return;
    const rect = portraitContainerRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const relX = (e.clientX - centerX) / (rect.width / 2); // -1 to 1
    const relY = (e.clientY - centerY) / (rect.height / 2); // -1 to 1

    setMouseOffset({
      x: Math.max(-1, Math.min(1, relX)),
      y: Math.max(-1, Math.min(1, relY)),
    });
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setMouseOffset({ x: 0, y: 0 });
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  // Compute dynamic responsive border radius combining activeShape + mouse physics
  const dynamicBorderRadius = useMemo(() => {
    if (!enableRandomShapeInteraction) return '50%';
    if (!isHovered || (mouseOffset.x === 0 && mouseOffset.y === 0)) {
      return activeShape;
    }

    // Slightly modulate corner weights based on mouse position
    const dx = Math.round(mouseOffset.x * 12);
    const dy = Math.round(mouseOffset.y * 12);

    return `calc(55% + ${dx}px) calc(45% - ${dx}px) calc(48% - ${dy}px) calc(52% + ${dy}px) / calc(58% - ${dy}px) calc(42% + ${dy}px) calc(54% + ${dx}px) calc(46% - ${dx}px)`;
  }, [enableRandomShapeInteraction, isHovered, mouseOffset, activeShape]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement('canvas');
        const MAX_SIZE = 700;
        let width = img.width;
        let height = img.height;

        if (width > height) {
          if (width > MAX_SIZE) {
            height = Math.round((height * MAX_SIZE) / width);
            width = MAX_SIZE;
          }
        } else {
          if (height > MAX_SIZE) {
            width = Math.round((width * MAX_SIZE) / height);
            height = MAX_SIZE;
          }
        }

        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        if (ctx) {
          ctx.fillStyle = '#FFFFFF';
          ctx.fillRect(0, 0, width, height);
          ctx.drawImage(img, 0, 0, width, height);
          const compressedDataUrl = canvas.toDataURL('image/jpeg', 0.85);

          setCustomPhoto(compressedDataUrl);

          try {
            localStorage.setItem('russell_custom_photo', compressedDataUrl);
          } catch (storageErr) {
            console.warn('Storage quota exceeded, keeping photo in session memory:', storageErr);
          }
        } else {
          const rawResult = event.target?.result as string;
          setCustomPhoto(rawResult);
        }
      };
      img.src = event.target?.result as string;
    };
    reader.readAsDataURL(file);
  };

  const activePhoto = customPhoto || defaultRussellPhoto;

  return (
    <div
      ref={portraitContainerRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={() => triggerRandomShape()}
      className={`relative flex items-center justify-center cursor-pointer select-none group ${className}`}
      title={enableRandomShapeInteraction ? 'Click to morph into a new random shape!' : undefined}
    >
      {/* Hidden file input for uploading custom photo */}
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        accept="image/*"
        className="hidden"
      />

      {/* Layer 0: Ambient Liquid Translucent Cyan & Steel Blue Glow matching the dynamic shape */}
      {enableRandomShapeInteraction && (
        <div
          className="absolute inset-[-12px] bg-gradient-to-tr from-[#38BDF8]/40 via-[#0EA5E9]/30 to-[#1E3A5F]/25 blur-2xl -z-20 transition-all duration-700 ease-out"
          style={{
            borderRadius: dynamicBorderRadius,
            transform: isPopping ? 'scale(1.12)' : isHovered ? 'scale(1.06)' : 'scale(1.0)',
          }}
        />
      )}

      {/* Layer 1: Rotating/Pulsing Liquid Steel Blue Outer Border Frame */}
      {enableRandomShapeInteraction && (
        <div
          className="absolute inset-[-4px] bg-gradient-to-br from-[#38BDF8] via-[#1E3A5F] to-[#7DD3FC] opacity-75 -z-10 transition-all duration-700 ease-out shadow-[0_10px_35px_rgba(30,58,95,0.3)]"
          style={{
            borderRadius: dynamicBorderRadius,
            transform: isPopping ? 'scale(1.04) rotate(2deg)' : 'scale(1.0) rotate(0deg)',
          }}
        />
      )}

      {/* Layer 2: Main Portrait Frame with Dynamic Organic Shape */}
      <div
        className={`relative w-full h-full flex items-center justify-center overflow-hidden transition-all duration-700 ease-out shadow-2xl border-4 border-white bg-white ${
          isPopping ? 'scale-[0.97]' : 'scale-100 group-hover:scale-[1.02]'
        }`}
        style={{
          borderRadius: dynamicBorderRadius,
          backgroundColor: '#FFFFFF',
          transition: 'border-radius 0.65s cubic-bezier(0.34, 1.56, 0.64, 1), transform 0.4s ease-out',
        }}
      >
        {activePhoto ? (
          /* Russell photo with white background */
          <img
            src={activePhoto}
            alt="Russell Taga-an"
            className="w-[500px] h-[500px] max-w-none object-cover object-top select-none transition-transform duration-700 ease-out scale-105 group-hover:scale-110 bg-[#ffffff] pointer-events-none"
            style={{ backgroundColor: '#ffffff' }}
          />
        ) : (
          /* High-fidelity Vector Representation of Russell - 500px x 500px */
          <svg
            viewBox="70 65 260 330"
            className="w-[500px] h-[500px] max-w-none select-none transform scale-110 transition-transform duration-700 group-hover:scale-115 origin-center bg-white pointer-events-none"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              <linearGradient id="skinBase" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#F7C8A0" />
                <stop offset="100%" stopColor="#E5A675" />
              </linearGradient>
              <linearGradient id="skinShadow" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#D98E58" />
                <stop offset="100%" stopColor="#C47A45" />
              </linearGradient>
              <linearGradient id="hairGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#221B17" />
                <stop offset="100%" stopColor="#120E0C" />
              </linearGradient>
              <linearGradient id="whiteShirt" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#FFFFFF" />
                <stop offset="100%" stopColor="#EEF4F8" />
              </linearGradient>
              <linearGradient id="steelStripeGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#1E3E60" />
                <stop offset="100%" stopColor="#2D5D86" />
              </linearGradient>
              <linearGradient id="watchDial" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#1E3A5F" />
                <stop offset="100%" stopColor="#0F172A" />
              </linearGradient>
            </defs>

            <g id="torso-and-shirt">
              <path
                d="M 100 310 C 120 280 150 270 200 270 C 250 270 280 280 300 310 L 330 460 C 330 475 310 480 200 480 C 90 480 70 475 70 460 Z"
                fill="url(#whiteShirt)"
              />
              <path
                d="M 90 325 C 130 318 190 315 200 315 C 210 315 270 318 310 325 L 316 350 C 270 342 210 340 200 340 C 190 340 130 342 84 350 Z"
                fill="url(#steelStripeGrad)"
              />
              <path
                d="M 80 380 C 120 375 190 372 200 372 C 210 372 280 375 320 380 L 325 405 C 280 398 210 396 200 396 C 190 396 120 398 75 405 Z"
                fill="url(#steelStripeGrad)"
              />
              <path
                d="M 165 268 C 175 295 225 295 235 268 C 220 288 180 288 165 268 Z"
                fill="#1E3E60"
              />
            </g>

            <g id="neck">
              <path
                d="M 172 225 L 172 278 C 185 288 215 288 228 278 L 228 225 Z"
                fill="url(#skinBase)"
              />
              <path
                d="M 172 225 C 185 245 215 245 228 225 C 220 250 180 250 172 225 Z"
                fill="url(#skinShadow)"
                opacity="0.5"
              />
              <circle cx="188" cy="256" r="2" fill="#7A421E" />
            </g>

            <g id="head-and-face">
              <ellipse cx="146" cy="180" rx="10" ry="16" fill="url(#skinBase)" />
              <path d="M 148 172 C 144 178 144 184 148 188" stroke="#C47A45" strokeWidth="2" fill="none" />
              <ellipse cx="254" cy="180" rx="10" ry="16" fill="url(#skinBase)" />
              <path d="M 252 172 C 256 178 256 184 252 188" stroke="#C47A45" strokeWidth="2" fill="none" />

              <path
                d="M 152 150 C 150 200 156 226 182 238 C 194 243 206 243 218 238 C 244 226 250 200 248 150 C 248 115 152 115 152 150 Z"
                fill="url(#skinBase)"
              />

              <ellipse cx="170" cy="188" rx="14" ry="8" fill="#F87171" opacity="0.15" />
              <ellipse cx="230" cy="188" rx="14" ry="8" fill="#F87171" opacity="0.15" />

              <path d="M 164 154 C 172 150 182 152 188 156" stroke="#1A1513" strokeWidth="4" strokeLinecap="round" />
              <path d="M 236 154 C 228 150 218 152 212 156" stroke="#1A1513" strokeWidth="4" strokeLinecap="round" />

              <ellipse cx="177" cy="166" rx="6.5" ry="4.5" fill="#FFFFFF" />
              <circle cx="177" cy="166" r="3.5" fill="#2E1B10" />
              <circle cx="178.5" cy="164.5" r="1.2" fill="#FFFFFF" />
              <path d="M 168 163 C 174 160 182 160 186 163" stroke="#221B17" strokeWidth="2" fill="none" />

              <ellipse cx="223" cy="166" rx="6.5" ry="4.5" fill="#FFFFFF" />
              <circle cx="223" cy="166" r="3.5" fill="#2E1B10" />
              <circle cx="224.5" cy="164.5" r="1.2" fill="#FFFFFF" />
              <path d="M 214 163 C 218 160 226 160 232 163" stroke="#221B17" strokeWidth="2" fill="none" />

              <path d="M 198 160 L 197 185 C 193 187 207 187 203 185" stroke="#C47A45" strokeWidth="2.5" strokeLinecap="round" fill="none" />

              <path d="M 182 198 C 192 208 208 208 218 198" stroke="#8B3A1C" strokeWidth="3.5" strokeLinecap="round" fill="none" />
              <path d="M 186 199 C 194 204 206 204 214 199" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" fill="none" />
              <path d="M 194 220 C 198 222 202 222 206 220" stroke="#C47A45" strokeWidth="2" strokeLinecap="round" fill="none" />

              <path
                d="M 148 145 C 145 110 165 85 200 85 C 235 85 255 110 252 145 C 255 130 250 115 240 105 C 225 95 175 95 160 105 C 150 115 145 130 148 145 Z"
                fill="url(#hairGrad)"
              />
              <path
                d="M 152 135 C 158 118 178 112 200 112 C 222 112 242 118 248 135 C 242 125 224 122 200 122 C 176 122 158 125 152 135 Z"
                fill="#3D2E26"
              />
            </g>

            <g id="crossed-arms">
              <path
                d="M 100 370 C 110 390 140 430 220 425 C 250 422 270 410 290 390"
                stroke="url(#skinBase)"
                strokeWidth="38"
                strokeLinecap="round"
                fill="none"
              />
              <path
                d="M 300 370 C 290 395 250 435 180 435 C 145 435 125 415 110 395"
                stroke="url(#skinBase)"
                strokeWidth="38"
                strokeLinecap="round"
                fill="none"
              />

              <path
                d="M 260 380 C 275 372 292 376 295 390 C 290 402 275 405 260 395 Z"
                fill="url(#skinBase)"
              />
              <path d="M 270 376 L 285 378" stroke="#C47A45" strokeWidth="2" strokeLinecap="round" />
              <path d="M 272 382 L 288 384" stroke="#C47A45" strokeWidth="2" strokeLinecap="round" />
              <path d="M 274 388 L 288 390" stroke="#C47A45" strokeWidth="2" strokeLinecap="round" />

              <path d="M 148 408 L 160 424" stroke="#1C1917" strokeWidth="10" strokeLinecap="round" />
              <circle cx="154" cy="416" r="10" fill="#E2E8F0" stroke="#94A3B8" strokeWidth="2" />
              <circle cx="154" cy="416" r="7.5" fill="url(#watchDial)" />
              <path d="M 154 416 L 154 412" stroke="#FFFFFF" strokeWidth="1.5" strokeLinecap="round" />
              <path d="M 154 416 L 158 416" stroke="#FFFFFF" strokeWidth="1.5" strokeLinecap="round" />
            </g>
          </svg>
        )}

        {/* Quick Upload / Replace Image Overlay Button on Hover */}
        {showUploadControl && (
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              fileInputRef.current?.click();
            }}
            title="Click to use/upload your photo file directly"
            className="absolute top-4 right-4 p-2 rounded-full bg-white/95 hover:bg-white text-[#1E3A5F] shadow-md border border-[#BCD5E6] opacity-0 group-hover:opacity-100 transition-all duration-300 transform group-hover:scale-110 cursor-pointer z-30 flex items-center gap-1.5 text-[11px] font-bold"
          >
            <Camera className="w-3.5 h-3.5 text-[#2D5D86]" />
            <span className="hidden sm:inline">Upload</span>
          </button>
        )}

        {/* Interactive Random Shape Morph Trigger Button in Corner */}
        {enableRandomShapeInteraction && (
          <button
            type="button"
            onClick={triggerRandomShape}
            title="Click to generate another random shape"
            className="absolute top-4 left-4 p-2 rounded-full bg-[#1E3A5F]/90 hover:bg-[#1E3A5F] text-[#7DD3FC] shadow-md border border-[#38BDF8]/40 opacity-0 group-hover:opacity-100 transition-all duration-300 transform group-hover:scale-110 cursor-pointer z-30 flex items-center gap-1.5 text-[11px] font-bold backdrop-blur-xs"
          >
            <Shuffle className="w-3.5 h-3.5 text-[#38BDF8]" />
            <span className="hidden sm:inline">Morph Shape</span>
          </button>
        )}

        {/* Morph Ripple Notification Toast */}
        {showMorphNotification && (
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 bg-[#1E3A5F]/95 text-[#7DD3FC] border border-[#38BDF8]/70 px-3.5 py-1.5 rounded-full text-[11px] font-bold shadow-xl flex items-center gap-1.5 pointer-events-none z-40 animate-fade-down backdrop-blur-xs">
            <Sparkles className="w-3.5 h-3.5 text-[#38BDF8] animate-spin" />
            <span>Random Shape #{morphCount}</span>
          </div>
        )}
      </div>
    </div>
  );
};
