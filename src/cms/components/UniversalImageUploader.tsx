import React, { useState, useRef } from 'react';
import {
  Upload,
  Image as ImageIcon,
  FolderOpen,
  Trash2,
  ExternalLink,
  Link as LinkIcon,
  Check,
  RefreshCw,
  Loader2,
} from 'lucide-react';
import { MediaPickerModal } from './MediaPickerModal';
import { contentService } from '../services/ContentServiceFactory';

interface UniversalImageUploaderProps {
  value?: string;
  onChange: (url: string) => void;
  onRemove?: () => void;
  label?: string;
  helperText?: string;
  aspectRatio?: 'square' | 'video' | 'portrait' | 'auto';
  placeholder?: string;
  compact?: boolean;
  className?: string;
}

export const UniversalImageUploader: React.FC<UniversalImageUploaderProps> = ({
  value,
  onChange,
  onRemove,
  label,
  helperText,
  aspectRatio = 'auto',
  placeholder = 'https://...',
  compact = false,
  className = '',
}) => {
  const [isMediaModalOpen, setIsMediaModalOpen] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [isManualUrlOpen, setIsManualUrlOpen] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const readFileAsDataUrl = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  };

  const handleProcessFile = async (file: File) => {
    if (!file.type.startsWith('image/')) return;
    setIsUploading(true);
    try {
      const base64 = await readFileAsDataUrl(file);
      // Automatically register to Media Library so it's reusable
      await contentService.uploadMedia({
        name: file.name,
        type: file.type,
        base64,
        size: file.size,
      });
      onChange(base64);
    } catch (err) {
      console.error('Failed to process image:', err);
    } finally {
      setIsUploading(false);
    }
  };

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files[0]) {
      handleProcessFile(files[0]);
    }
    e.target.value = '';
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const files = e.dataTransfer.files;
    if (files && files[0]) {
      handleProcessFile(files[0]);
    }
  };

  const handleRemove = () => {
    if (onRemove) {
      onRemove();
    } else {
      onChange('');
    }
  };

  const aspectClass =
    aspectRatio === 'square'
      ? 'aspect-square'
      : aspectRatio === 'video'
      ? 'aspect-video'
      : aspectRatio === 'portrait'
      ? 'aspect-[3/4]'
      : 'min-h-[110px]';

  return (
    <div className={`space-y-1.5 font-inter select-none ${className}`}>
      {label && (
        <div className="flex items-center justify-between">
          <label className="block text-xs font-bold text-[#1E3A5F]">{label}</label>
          {value && (
            <span className="text-[10px] text-emerald-600 font-semibold flex items-center gap-1">
              <Check className="w-3 h-3 text-emerald-500" /> Image set
            </span>
          )}
        </div>
      )}

      {/* When Image Exists: Show Preview with Controls */}
      {value ? (
        <div className="rounded-xl border border-[#BCD5E6] bg-slate-50/70 p-2 space-y-2">
          <div className="relative group rounded-lg overflow-hidden border border-slate-200 bg-white flex items-center justify-center max-h-48 min-h-[90px]">
            <img
              src={value}
              alt="Uploaded Preview"
              className="max-h-48 w-full object-contain select-none"
            />

            {/* Hover Overlay Controls */}
            <div className="absolute inset-0 bg-slate-900/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
              <button
                type="button"
                onClick={() => setIsMediaModalOpen(true)}
                className="px-2.5 py-1.5 rounded-lg bg-white/90 hover:bg-white text-[#1E3A5F] text-[11px] font-bold shadow-md flex items-center gap-1.5 transition-all cursor-pointer"
                title="Choose another image from Media Gallery"
              >
                <FolderOpen className="w-3.5 h-3.5 text-[#0EA5E9]" />
                <span>Media Gallery</span>
              </button>
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="px-2.5 py-1.5 rounded-lg bg-white/90 hover:bg-white text-[#1E3A5F] text-[11px] font-bold shadow-md flex items-center gap-1.5 transition-all cursor-pointer"
                title="Upload new file from device"
              >
                <Upload className="w-3.5 h-3.5 text-[#0EA5E9]" />
                <span>Upload</span>
              </button>
              <button
                type="button"
                onClick={handleRemove}
                className="p-1.5 rounded-lg bg-red-600 hover:bg-red-700 text-white shadow-md transition-all cursor-pointer"
                title="Remove image"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Action Row below preview */}
          <div className="flex items-center justify-between text-[11px] text-slate-500 pt-0.5">
            <div className="flex items-center gap-2 truncate max-w-[65%]">
              <button
                type="button"
                onClick={() => setIsMediaModalOpen(true)}
                className="text-[#0EA5E9] font-bold hover:underline flex items-center gap-1 cursor-pointer"
              >
                <FolderOpen className="w-3 h-3" />
                <span>Change via Media Gallery</span>
              </button>
              <span>•</span>
              <button
                type="button"
                onClick={() => setIsManualUrlOpen(!isManualUrlOpen)}
                className="hover:text-[#1E3A5F] underline cursor-pointer"
              >
                Edit URL
              </button>
            </div>

            <button
              type="button"
              onClick={handleRemove}
              className="text-red-500 hover:text-red-700 font-bold flex items-center gap-1 cursor-pointer"
            >
              <Trash2 className="w-3 h-3" />
              <span>Remove</span>
            </button>
          </div>
        </div>
      ) : (
        /* Empty State: Drag & Drop Zone + Action Buttons */
        <div
          onDragOver={(e) => {
            e.preventDefault();
            setIsDragging(true);
          }}
          onDragLeave={() => setIsDragging(false)}
          onDrop={handleDrop}
          className={`rounded-xl border-2 border-dashed transition-all p-3 sm:p-4 text-center flex flex-col items-center justify-center gap-2 ${
            isDragging
              ? 'border-[#0EA5E9] bg-sky-50 ring-4 ring-[#0EA5E9]/20'
              : 'border-[#BCD5E6] bg-white hover:border-[#0EA5E9] hover:bg-slate-50/60'
          } ${compact ? 'py-2.5 px-3' : 'py-5 px-4'}`}
        >
          <div
            onClick={() => fileInputRef.current?.click()}
            className="cursor-pointer flex flex-col items-center gap-1.5 w-full"
          >
            <div className="w-9 h-9 rounded-xl bg-[#EFF6FB] flex items-center justify-center text-[#0EA5E9] shadow-2xs">
              {isUploading ? (
                <Loader2 className="w-4 h-4 animate-spin text-[#0EA5E9]" />
              ) : (
                <Upload className="w-4 h-4" />
              )}
            </div>
            <div>
              <p className="text-xs font-bold text-[#1E3A5F]">
                {isDragging ? 'Drop image here' : 'Drag & drop image here'}
              </p>
              <p className="text-[10px] text-slate-400 mt-0.5">
                or click to browse from device (PNG, JPG, SVG, WebP)
              </p>
            </div>
          </div>

          {/* Action Row: Media Gallery Button & URL Option */}
          <div className="flex items-center gap-2 pt-1.5 border-t border-slate-100 w-full justify-center">
            <button
              type="button"
              onClick={() => setIsMediaModalOpen(true)}
              className="px-2.5 py-1 rounded-lg bg-[#EFF6FB] hover:bg-[#E0F2FE] border border-[#BCD5E6] text-[#0284C7] text-[11px] font-bold flex items-center gap-1.5 transition-colors cursor-pointer shadow-2xs"
            >
              <FolderOpen className="w-3 h-3 text-[#0EA5E9]" />
              <span>Choose from Media Gallery</span>
            </button>

            <button
              type="button"
              onClick={() => setIsManualUrlOpen(!isManualUrlOpen)}
              className="px-2 py-1 rounded-lg hover:bg-slate-100 text-slate-500 hover:text-[#1E3A5F] text-[10.5px] font-semibold flex items-center gap-1 transition-colors cursor-pointer"
            >
              <LinkIcon className="w-3 h-3" />
              <span>Paste URL</span>
            </button>
          </div>
        </div>
      )}

      {/* Manual URL Input dropdown if requested */}
      {isManualUrlOpen && (
        <div className="pt-1.5 animate-fade-in flex items-center gap-1.5">
          <input
            type="text"
            value={value || ''}
            onChange={(e) => onChange(e.target.value)}
            placeholder={placeholder}
            className="flex-1 px-3 py-1.5 text-xs bg-white rounded-lg border border-[#BCD5E6] text-[#1E3A5F] focus:outline-none focus:ring-1 focus:ring-[#0EA5E9]"
          />
          <button
            type="button"
            onClick={() => setIsManualUrlOpen(false)}
            className="px-2.5 py-1.5 rounded-lg bg-slate-200 hover:bg-slate-300 text-slate-700 text-xs font-bold cursor-pointer"
          >
            Done
          </button>
        </div>
      )}

      {helperText && <p className="text-[10px] text-slate-400">{helperText}</p>}

      {/* Hidden File Input */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileInputChange}
        className="hidden"
        disabled={isUploading}
      />

      {/* Popout Media Gallery Modal */}
      <MediaPickerModal
        isOpen={isMediaModalOpen}
        onClose={() => setIsMediaModalOpen(false)}
        selectedImageUrl={value}
        onSelectImage={(url) => {
          onChange(url);
          setIsMediaModalOpen(false);
        }}
        title={`Media Gallery • ${label || 'Select Image'}`}
      />
    </div>
  );
};
