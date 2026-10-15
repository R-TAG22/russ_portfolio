import React, { useState, useEffect, useRef } from 'react';
import { Camera } from 'lucide-react';
import defaultRussellPhoto from '../assets/images/regenerated_image_1788105616348.png';

interface RussellPortraitProps {
  className?: string;
  blobVariant?: 'green' | 'blue' | 'sage' | 'white';
  showUploadControl?: boolean;
}

export const RussellPortrait: React.FC<RussellPortraitProps> = ({
  className = 'w-full h-full',
  blobVariant = 'white',
  showUploadControl = true,
}) => {
  const [customPhoto, setCustomPhoto] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

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

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const img = new Image();
      img.onload = () => {
        // Compress and downscale on off-screen canvas to guarantee small size (<150KB)
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
    <div className={`relative flex items-center justify-center ${className}`}>
      {/* Hidden file input for uploading custom photo */}
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        accept="image/*"
        className="hidden"
      />

      {/* Organic Curved Blob Container with pure white background */}
      <div
        className="relative w-full h-full organic-blob-shape flex items-center justify-center overflow-hidden transition-transform duration-500 group-hover:scale-105 shadow-2xl border-4 border-white bg-white"
        style={{ backgroundColor: '#FFFFFF' }}
      >
        {activePhoto ? (
          /* Russell photo with white background */
          <img
            src={activePhoto}
            alt="Russell Taga-an"
            className="w-[500px] h-[500px] max-w-none object-cover object-top select-none transition-transform duration-500 scale-105 hover:scale-110 bg-[#ffffff]"
            style={{ backgroundColor: '#ffffff' }}
          />
        ) : (
          /* High-fidelity Vector Representation of Russell - 500px x 500px */
          <svg
            viewBox="70 65 260 330"
            className="w-[500px] h-[500px] max-w-none select-none transform scale-110 transition-transform duration-500 hover:scale-120 origin-center bg-white"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
              <defs>
                {/* Skin Tones */}
                <linearGradient id="skinBase" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#F7C8A0" />
                  <stop offset="100%" stopColor="#E5A675" />
                </linearGradient>
                <linearGradient id="skinShadow" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#D98E58" />
                  <stop offset="100%" stopColor="#C47A45" />
                </linearGradient>
                {/* Hair */}
                <linearGradient id="hairGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#221B17" />
                  <stop offset="100%" stopColor="#120E0C" />
                </linearGradient>
                {/* Tropical Green Leaf Pattern */}
                <pattern id="tropicalLeaf" width="40" height="25" patternUnits="userSpaceOnUse">
                  <path d="M 0 12 Q 10 0 20 12 Q 30 24 40 12" stroke="#1D4E2B" strokeWidth="3.5" fill="none" />
                  <path d="M 5 6 Q 12 2 18 8" stroke="#3A754B" strokeWidth="2" fill="none" opacity="0.8" />
                  <path d="M 22 18 Q 28 22 35 16" stroke="#3A754B" strokeWidth="2" fill="none" opacity="0.8" />
                </pattern>
                {/* White Shirt base */}
                <linearGradient id="whiteShirt" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#FFFFFF" />
                  <stop offset="100%" stopColor="#EEF2E8" />
                </linearGradient>
                {/* Watch Strap and Face */}
                <linearGradient id="watchDial" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#1E3A8A" />
                  <stop offset="100%" stopColor="#0F172A" />
                </linearGradient>
              </defs>

              {/* 1. Shoulders & Torso: White T-shirt with Green Tropical Stripes */}
              <g id="torso-and-shirt">
                {/* White shirt body base */}
                <path
                  d="M 100 310 C 120 280 150 270 200 270 C 250 270 280 280 300 310 L 330 460 C 330 475 310 480 200 480 C 90 480 70 475 70 460 Z"
                  fill="url(#whiteShirt)"
                />

                {/* Tropical Green Horizontal Stripe 1 (Chest upper) */}
                <path
                  d="M 90 325 C 130 318 190 315 200 315 C 210 315 270 318 310 325 L 316 350 C 270 342 210 340 200 340 C 190 340 130 342 84 350 Z"
                  fill="#245832"
                />
                {/* Leaves in Stripe 1 */}
                <path
                  d="M 90 325 C 130 318 190 315 200 315 C 210 315 270 318 310 325 L 316 350 C 270 342 210 340 200 340 C 190 340 130 342 84 350 Z"
                  fill="url(#tropicalLeaf)"
                  opacity="0.9"
                />

                {/* Tropical Green Horizontal Stripe 2 (Mid chest) */}
                <path
                  d="M 80 380 C 120 375 190 372 200 372 C 210 372 280 375 320 380 L 325 405 C 280 398 210 396 200 396 C 190 396 120 398 75 405 Z"
                  fill="#245832"
                />
                <path
                  d="M 80 380 C 120 375 190 372 200 372 C 210 372 280 375 320 380 L 325 405 C 280 398 210 396 200 396 C 190 396 120 398 75 405 Z"
                  fill="url(#tropicalLeaf)"
                  opacity="0.9"
                />

                {/* Collar Neckline with Green Tropical Trim */}
                <path
                  d="M 165 268 C 175 295 225 295 235 268 C 220 288 180 288 165 268 Z"
                  fill="#245832"
                />
              </g>

              {/* 2. Neck */}
              <g id="neck">
                <path
                  d="M 172 225 L 172 278 C 185 288 215 288 228 278 L 228 225 Z"
                  fill="url(#skinBase)"
                />
                {/* Neck Shadow under chin */}
                <path
                  d="M 172 225 C 185 245 215 245 228 225 C 220 250 180 250 172 225 Z"
                  fill="url(#skinShadow)"
                  opacity="0.5"
                />
                {/* Distinctive small birthmark/mole on lower neck */}
                <circle cx="188" cy="256" r="2" fill="#7A421E" />
              </g>

              {/* 3. Head & Face */}
              <g id="head-and-face">
                {/* Ears */}
                <ellipse cx="146" cy="180" rx="10" ry="16" fill="url(#skinBase)" />
                <path d="M 148 172 C 144 178 144 184 148 188" stroke="#C47A45" strokeWidth="2" fill="none" />
                <ellipse cx="254" cy="180" rx="10" ry="16" fill="url(#skinBase)" />
                <path d="M 252 172 C 256 178 256 184 252 188" stroke="#C47A45" strokeWidth="2" fill="none" />

                {/* Face Contour */}
                <path
                  d="M 152 150 C 150 200 156 226 182 238 C 194 243 206 243 218 238 C 244 226 250 200 248 150 C 248 115 152 115 152 150 Z"
                  fill="url(#skinBase)"
                />

                {/* Cheeks subtle warm highlight */}
                <ellipse cx="170" cy="188" rx="14" ry="8" fill="#F87171" opacity="0.15" />
                <ellipse cx="230" cy="188" rx="14" ry="8" fill="#F87171" opacity="0.15" />

                {/* Eyebrows */}
                <path
                  d="M 164 154 C 172 150 182 152 188 156"
                  stroke="#1A1513"
                  strokeWidth="4"
                  strokeLinecap="round"
                />
                <path
                  d="M 236 154 C 228 150 218 152 212 156"
                  stroke="#1A1513"
                  strokeWidth="4"
                  strokeLinecap="round"
                />

                {/* Eyes with warm, confident expression */}
                <ellipse cx="177" cy="166" rx="6.5" ry="4.5" fill="#FFFFFF" />
                <circle cx="177" cy="166" r="3.5" fill="#2E1B10" />
                <circle cx="178.5" cy="164.5" r="1.2" fill="#FFFFFF" />
                <path d="M 168 163 C 174 160 182 160 186 163" stroke="#221B17" strokeWidth="2" fill="none" />

                <ellipse cx="223" cy="166" rx="6.5" ry="4.5" fill="#FFFFFF" />
                <circle cx="223" cy="166" r="3.5" fill="#2E1B10" />
                <circle cx="224.5" cy="164.5" r="1.2" fill="#FFFFFF" />
                <path d="M 214 163 C 218 160 226 160 232 163" stroke="#221B17" strokeWidth="2" fill="none" />

                {/* Nose */}
                <path
                  d="M 198 160 L 197 185 C 193 187 207 187 203 185"
                  stroke="#C47A45"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  fill="none"
                />

                {/* Friendly Smile */}
                <path
                  d="M 182 198 C 192 208 208 208 218 198"
                  stroke="#8B3A1C"
                  strokeWidth="3.5"
                  strokeLinecap="round"
                  fill="none"
                />
                <path
                  d="M 186 199 C 194 204 206 204 214 199"
                  stroke="#FFFFFF"
                  strokeWidth="2"
                  strokeLinecap="round"
                  fill="none"
                />
                {/* Chin line */}
                <path d="M 194 220 C 198 222 202 222 206 220" stroke="#C47A45" strokeWidth="2" strokeLinecap="round" fill="none" />

                {/* Hair: Stylish Modern Cut with Volume & Side Fade */}
                <path
                  d="M 148 145 C 145 110 165 85 200 85 C 235 85 255 110 252 145 C 255 130 250 115 240 105 C 225 95 175 95 160 105 C 150 115 145 130 148 145 Z"
                  fill="url(#hairGrad)"
                />
                <path
                  d="M 152 135 C 158 118 178 112 200 112 C 222 112 242 118 248 135 C 242 125 224 122 200 122 C 176 122 158 125 152 135 Z"
                  fill="#3D2E26"
                />
              </g>

              {/* 4. Arms Crossed Confidently Pose (from Pic of Me 1.jpeg) */}
              <g id="crossed-arms">
                {/* Right Arm across */}
                <path
                  d="M 100 370 C 110 390 140 430 220 425 C 250 422 270 410 290 390"
                  stroke="url(#skinBase)"
                  strokeWidth="38"
                  strokeLinecap="round"
                  fill="none"
                />
                {/* Left Arm across with Watch */}
                <path
                  d="M 300 370 C 290 395 250 435 180 435 C 145 435 125 415 110 395"
                  stroke="url(#skinBase)"
                  strokeWidth="38"
                  strokeLinecap="round"
                  fill="none"
                />

                {/* Hand Resting on Bicep */}
                <path
                  d="M 260 380 C 275 372 292 376 295 390 C 290 402 275 405 260 395 Z"
                  fill="url(#skinBase)"
                />
                {/* Hand Fingers */}
                <path d="M 270 376 L 285 378" stroke="#C47A45" strokeWidth="2" strokeLinecap="round" />
                <path d="M 272 382 L 288 384" stroke="#C47A45" strokeWidth="2" strokeLinecap="round" />
                <path d="M 274 388 L 288 390" stroke="#C47A45" strokeWidth="2" strokeLinecap="round" />

                {/* Analog Watch on Left Wrist (as in pic) */}
                {/* Watch Strap */}
                <path
                  d="M 148 408 L 160 424"
                  stroke="#1C1917"
                  strokeWidth="10"
                  strokeLinecap="round"
                />
                {/* Watch Bezel / Case */}
                <circle cx="154" cy="416" r="10" fill="#E2E8F0" stroke="#94A3B8" strokeWidth="2" />
                {/* Watch Dial */}
                <circle cx="154" cy="416" r="7.5" fill="url(#watchDial)" />
                {/* Watch Hands */}
                <path d="M 154 416 L 154 412" stroke="#FFFFFF" strokeWidth="1.5" strokeLinecap="round" />
                <path d="M 154 416 L 158 416" stroke="#FFFFFF" strokeWidth="1.5" strokeLinecap="round" />
              </g>
            </svg>
          )}

          {/* Quick Upload / Replace Image Overlay Button on Hover */}
          {showUploadControl && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                fileInputRef.current?.click();
              }}
              title="Click to use/upload your photo file directly"
              className="absolute top-3 right-3 p-2 rounded-full bg-white/90 hover:bg-white text-[#2F5D3A] shadow-md border border-[#C9DAB0] opacity-0 group-hover:opacity-100 transition-all duration-300 transform group-hover:scale-110 cursor-pointer z-30 flex items-center gap-1.5 text-[11px] font-bold"
            >
              <Camera className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Upload</span>
            </button>
          )}
        </div>
    </div>
  );
};
