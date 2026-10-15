import React, { useState, useEffect, useRef } from 'react';
import { Camera } from 'lucide-react';
import defaultAboutPhoto from '../assets/images/regenerated_image_1788105382320.jpg';

interface AboutPortraitProps {
  className?: string;
  showUploadControl?: boolean;
}

export const AboutPortrait: React.FC<AboutPortraitProps> = ({
  className = 'w-[500px] h-[500px]',
  showUploadControl = true,
}) => {
  const [customPhoto, setCustomPhoto] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    try {
      const saved = localStorage.getItem('russell_about_custom_photo');
      if (saved) {
        setCustomPhoto(saved);
      }
    } catch {
      // Ignore localStorage read errors in restricted contexts
    }
  }, []);

  const [isDragging, setIsDragging] = useState(false);

  const processFile = (file: File) => {
    if (!file.type.startsWith('image/')) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement('canvas');
        const MAX_SIZE = 800;
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
          const compressedDataUrl = canvas.toDataURL('image/jpeg', 0.88);

          setCustomPhoto(compressedDataUrl);

          try {
            localStorage.setItem('russell_about_custom_photo', compressedDataUrl);
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

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) processFile(file);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (file) processFile(file);
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const activePhoto = customPhoto || defaultAboutPhoto;

  return (
    <div
      id="about-portrait-wrapper"
      className={`relative flex items-center justify-center select-none group ${className}`}
      onDrop={handleDrop}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
    >
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        accept="image/*"
        className="hidden"
      />

      {/* Layer 1: Ambient Translucent Cyan & Steel Blue Glow (No random morphing shapes) */}
      <div
        className="absolute inset-[-10px] sm:inset-[-14px] rounded-3xl sm:rounded-[36px] bg-gradient-to-tr from-[#38BDF8]/25 via-[#0EA5E9]/20 to-[#1E3A5F]/20 -z-10 blur-xl transition-transform duration-700 group-hover:scale-105"
      />

      {/* Layer 2: Clean, refined rounded frame with pure white background */}
      <div
        className={`relative w-full h-full rounded-3xl sm:rounded-[32px] flex items-center justify-center overflow-hidden transition-all duration-500 group-hover:scale-102 shadow-2xl border-4 sm:border-6 border-white bg-white ring-1 ring-[#38BDF8]/30 ${
          isDragging ? 'ring-4 ring-[#0EA5E9] ring-offset-2' : ''
        }`}
        style={{ backgroundColor: '#FFFFFF' }}
      >
        <img
          src={activePhoto}
          alt="Russell Taga-an - About"
          className="w-full h-full object-cover object-[35%_center] select-none transition-transform duration-500 scale-105 group-hover:scale-110 bg-[#ffffff]"
          style={{ backgroundColor: '#ffffff' }}
        />

        {/* Hover Upload Button */}
        {showUploadControl && (
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            className="absolute bottom-5 right-5 p-3 rounded-full bg-[#1E3A5F]/90 hover:bg-[#1E3A5F] text-white shadow-xl opacity-90 sm:opacity-0 group-hover:opacity-100 transition-all duration-300 transform scale-95 group-hover:scale-100 backdrop-blur-xs cursor-pointer z-30 flex items-center gap-1.5"
            title="Upload photo of Russell"
            aria-label="Upload photo of Russell"
          >
            <Camera className="w-5 h-5 text-[#7DD3FC]" />
            <span className="text-xs font-semibold pr-1 hidden sm:inline">Upload Photo</span>
          </button>
        )}
      </div>
    </div>
  );
};
