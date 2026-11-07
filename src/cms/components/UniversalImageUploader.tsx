import React, { useState, useRef } from 'react';
import {
  Upload,
  Image as ImageIcon,
  FolderOpen,
  Trash2,
  X,
  ExternalLink,
  Check,
  Sparkles,
} from 'lucide-react';
import { MediaGalleryModal } from './MediaGalleryModal';
import { contentService } from '../services/ContentServiceFactory';

export interface ImagePreset {
  label: string;
  url: string;
}

interface UniversalImageUploaderProps {
  label?: string;
  helperText?: string;
  value: string;
  onChange: (url: string) => void;
  placeholder?: string;
  aspectRatio?: 'auto' | '1/1' | '16/9' | '16/10' | '4/3';
  presets?: ImagePreset[];
  compact?: boolean;
  className?: string;
  galleryTitle?: string;
}

export const UniversalImageUploader: React.FC<UniversalImageUploaderProps> = ({
  label = 'Image Asset',
  helperText,
  value,
  onChange,
  placeholder = 'https://... or data:image/...',
  aspectRatio = '16/10',
  presets,
  compact = false,
  className = '',
  galleryTitle,
}) => {
  const [isMediaModalOpen, setIsMediaModalOpen] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === 'string') {
        onChange(reader.result);
        // Also upload to media library in the background so it is available in the gallery!
        contentService.uploadMedia(file).catch(() => {});
      }
    };
    reader.readAsDataURL(file);
    e.target.value = '';
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = (Array.from(e.dataTransfer.files || []) as File[]).find((f) =>
      f.type.startsWith('image/')
    );
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === 'string') {
        onChange(reader.result);
        contentService.uploadMedia(file).catch(() => {});
      }
    };
    reader.readAsDataURL(file);
  };

  const aspectClass =
    aspectRatio === '1/1'
      ? 'aspect-square'
      : aspectRatio === '16/9'
      ? 'aspect-[16/9]'
      : aspectRatio === '4/3'
      ? 'aspect-[4/3]'
      : aspectRatio === '16/10'
      ? 'aspect-[16/10]'
      : '';

  if (compact) {
    return (
      <div className={`space-y-1.5 ${className}`}>
        {label && (
          <div className="flex items-center justify-between">
            <label className="block text-[11px] font-bold text-slate-700">{label}</label>
            <div className="flex items-center gap-1.5">
              <button
                type="button"
                onClick={() => setIsMediaModalOpen(true)}
                className="text-[10px] font-bold text-[#0EA5E9] hover:text-[#0284C7] flex items-center gap-1 cursor-pointer"
                title="Pop out Media Gallery"
              >
                <FolderOpen className="w-3 h-3 text-[#0EA5E9]" />
                <span>Media Gallery</span>
              </button>
            </div>
          </div>
        )}

        <input
          type="file"
          ref={fileInputRef}
          accept="image/*"
          onChange={handleFileUpload}
          className="hidden"
        />

        <div
          onDragOver={(e) => {
            e.preventDefault();
            setIsDragging(true);
          }}
          onDragLeave={() => setIsDragging(false)}
          onDrop={handleDrop}
          className={`flex items-center gap-2 p-1.5 rounded-xl border-2 transition-all ${
            isDragging
              ? 'border-[#0EA5E9] bg-sky-50 ring-2 ring-[#0EA5E9]/30'
              : 'border-slate-200 bg-white hover:border-slate-300'
          }`}
        >
          {/* Small thumbnail preview */}
          <div
            onClick={() => fileInputRef.current?.click()}
            className="w-10 h-10 rounded-lg overflow-hidden bg-slate-100 border border-slate-200 shrink-0 flex items-center justify-center cursor-pointer hover:opacity-80"
            title="Click to browse device or drag image here"
          >
            {value ? (
              <img
                src={value}
                alt="Thumbnail"
                className="w-full h-full object-cover"
                onError={(e) => {
                  (e.target as HTMLElement).style.display = 'none';
                }}
              />
            ) : (
              <ImageIcon className="w-4 h-4 text-slate-400" />
            )}
          </div>

          {/* URL text input */}
          <input
            type="text"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder="Drop file or paste URL..."
            className="flex-1 min-w-0 px-2 py-1 text-[11px] font-mono text-slate-800 bg-transparent border-0 focus:outline-hidden"
          />

          {/* Actions */}
          <div className="flex items-center gap-1 shrink-0">
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="p-1 rounded-lg hover:bg-slate-100 text-slate-500 hover:text-slate-800 cursor-pointer"
              title="Upload file from device"
            >
              <Upload className="w-3.5 h-3.5" />
            </button>
            <button
              type="button"
              onClick={() => setIsMediaModalOpen(true)}
              className="p-1 rounded-lg hover:bg-sky-50 text-[#0EA5E9] cursor-pointer"
              title="Choose from Media Gallery"
            >
              <FolderOpen className="w-3.5 h-3.5" />
            </button>
            {value && (
              <button
                type="button"
                onClick={() => onChange('')}
                className="p-1 rounded-lg hover:bg-red-50 text-slate-400 hover:text-red-600 cursor-pointer"
                title="Clear image"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>

        {helperText && <p className="text-[10px] text-slate-400">{helperText}</p>}

        <MediaGalleryModal
          isOpen={isMediaModalOpen}
          onClose={() => setIsMediaModalOpen(false)}
          onSelectImage={(url) => onChange(url)}
          selectedUrl={value}
          title={galleryTitle || `Choose ${label} from Media Gallery`}
        />
      </div>
    );
  }

  // Full Rich Card Mode
  return (
    <div
      onDragOver={(e) => {
        e.preventDefault();
        setIsDragging(true);
      }}
      onDragLeave={() => setIsDragging(false)}
      onDrop={handleDrop}
      className={`p-4 rounded-2xl border-2 transition-all space-y-3 font-inter ${
        isDragging
          ? 'border-[#0EA5E9] bg-sky-50/80 ring-4 ring-[#0EA5E9]/20'
          : 'bg-slate-50 border-slate-200'
      } ${className}`}
    >
      <input
        type="file"
        ref={fileInputRef}
        accept="image/*"
        onChange={handleFileUpload}
        className="hidden"
      />

      {/* Header with Title and Action Buttons */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
        <div>
          <h4 className="font-bold text-xs sm:text-sm text-slate-900 flex items-center gap-2">
            <span>{label}</span>
            {isDragging && (
              <span className="text-[10px] font-bold text-sky-700 bg-sky-100 px-2 py-0.5 rounded-full animate-pulse">
                Drop image to upload!
              </span>
            )}
          </h4>
          {helperText ? (
            <p className="text-[11px] text-slate-500">{helperText}</p>
          ) : (
            <p className="text-[11px] text-slate-500">
              Drag & drop image file, choose from Media Gallery, or paste a direct link.
            </p>
          )}
        </div>

        <div className="flex items-center gap-2">
          {/* Upload / Drop Button */}
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            className="px-3 py-1.5 rounded-xl bg-white border border-slate-300 hover:bg-slate-100 text-slate-700 font-bold text-xs flex items-center gap-1.5 transition-colors cursor-pointer shadow-2xs"
          >
            <Upload className="w-3.5 h-3.5 text-[#0EA5E9]" />
            <span>Upload Device</span>
          </button>

          {/* Pop out Media Gallery Button */}
          <button
            type="button"
            onClick={() => setIsMediaModalOpen(true)}
            className="px-3 py-1.5 rounded-xl bg-[#1E3A5F] hover:bg-[#2D5D86] text-white font-bold text-xs flex items-center gap-1.5 transition-colors cursor-pointer shadow-2xs"
          >
            <FolderOpen className="w-3.5 h-3.5 text-[#7DD3FC]" />
            <span>Media Gallery</span>
          </button>

          {/* Delete / Clear button */}
          {value && (
            <button
              type="button"
              onClick={() => onChange('')}
              className="p-1.5 rounded-xl bg-red-50 hover:bg-red-100 text-red-600 transition-colors cursor-pointer"
              title="Remove image"
            >
              <Trash2 className="w-3.5 h-3.5 text-red-500" />
            </button>
          )}
        </div>
      </div>

      {/* Main Preview & Drop Area + URL bar */}
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
        {/* Interactive Drop Box / Thumbnail */}
        <div
          onClick={() => {
            if (!value) fileInputRef.current?.click();
            else setIsMediaModalOpen(true);
          }}
          className={`w-36 sm:w-44 ${aspectClass} rounded-2xl overflow-hidden border-2 border-dashed shrink-0 shadow-xs flex items-center justify-center relative group cursor-pointer transition-all ${
            isDragging
              ? 'border-[#0EA5E9] bg-sky-100/70 scale-102'
              : value
              ? 'border-slate-300 bg-slate-900 hover:border-[#0EA5E9]'
              : 'border-slate-300 bg-white hover:border-[#0EA5E9] hover:bg-sky-50/40'
          }`}
          title={value ? 'Click to change from Media Gallery' : 'Click to browse or drop file here'}
        >
          {value ? (
            <>
              <img
                src={value}
                alt={label}
                className="w-full h-full object-contain p-1"
                onError={(e) => {
                  (e.target as HTMLElement).style.display = 'none';
                }}
              />
              <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center text-white text-[10px] font-bold gap-1 p-2 text-center">
                <FolderOpen className="w-4 h-4 text-[#38BDF8]" />
                <span>Change Image</span>
              </div>
            </>
          ) : (
            <div className="flex flex-col items-center justify-center p-2 text-center text-slate-500">
              <Upload className="w-6 h-6 mb-1 text-slate-400 group-hover:text-[#0EA5E9] transition-colors" />
              <span className="text-[10px] font-bold text-slate-700">Drag & Drop Image</span>
              <span className="text-[9px] text-slate-400">or click to browse</span>
            </div>
          )}
        </div>

        {/* Input Details */}
        <div className="flex-1 space-y-2 w-full">
          <div>
            <label className="block text-[11px] font-bold text-slate-600 mb-1">
              Direct Image URL or Asset Path
            </label>
            <input
              type="url"
              value={value}
              onChange={(e) => onChange(e.target.value)}
              placeholder={placeholder}
              className="w-full px-3.5 py-2 rounded-xl border border-slate-300 bg-white text-slate-800 text-xs font-mono focus:border-[#0EA5E9] focus:outline-hidden"
            />
          </div>

          {/* Quick presets if provided */}
          {presets && presets.length > 0 && (
            <div>
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">
                Quick Presets
              </span>
              <div className="flex flex-wrap gap-1.5">
                {presets.map((p, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => onChange(p.url)}
                    className="px-2 py-0.5 rounded-md bg-white border border-slate-200 text-[10px] text-slate-600 hover:text-[#1E3A5F] hover:border-slate-400 cursor-pointer"
                  >
                    {p.label}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Media Gallery Pop-out Modal */}
      <MediaGalleryModal
        isOpen={isMediaModalOpen}
        onClose={() => setIsMediaModalOpen(false)}
        onSelectImage={(url) => onChange(url)}
        selectedUrl={value}
        title={galleryTitle || `Choose ${label} from Media Gallery`}
      />
    </div>
  );
};
