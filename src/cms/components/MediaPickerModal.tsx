import React, { useState, useEffect, useRef } from 'react';
import {
  X,
  Search,
  Upload,
  Image as ImageIcon,
  Check,
  Trash2,
  ExternalLink,
  Plus,
  Loader2,
  Filter,
} from 'lucide-react';
import { MediaItem } from '../types/schema';
import { contentService } from '../services/ContentServiceFactory';

interface MediaPickerModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectImage: (imageUrl: string, mediaItem?: MediaItem) => void;
  title?: string;
  selectedImageUrl?: string;
}

export const MediaPickerModal: React.FC<MediaPickerModalProps> = ({
  isOpen,
  onClose,
  onSelectImage,
  title = 'Select Image from Media Library',
  selectedImageUrl,
}) => {
  const [mediaList, setMediaList] = useState<MediaItem[]>([]);
  const [search, setSearch] = useState('');
  const [selectedItem, setSelectedItem] = useState<MediaItem | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Load media items on open
  useEffect(() => {
    if (isOpen) {
      loadMedia();
    }
  }, [isOpen]);

  const loadMedia = async () => {
    setIsLoading(true);
    try {
      const items = await contentService.getMediaLibrary();
      setMediaList(items);
      // Auto highlight matching item if any
      if (selectedImageUrl) {
        const match = items.find((m) => m.url === selectedImageUrl);
        if (match) setSelectedItem(match);
      }
    } catch (err) {
      console.error('Failed to load media library:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const readFileAsDataUrl = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  };

  const handleProcessFiles = async (files: File[]) => {
    const imgFiles = files.filter((f) => f.type.startsWith('image/'));
    if (!imgFiles.length) return;

    setIsUploading(true);
    try {
      for (const file of imgFiles) {
        // Read as persistent base64 data URL
        const base64 = await readFileAsDataUrl(file);
        const uploaded = await contentService.uploadMedia({
          name: file.name,
          type: file.type,
          base64,
          size: file.size,
        });
        setMediaList((prev) => [uploaded, ...prev]);
        setSelectedItem(uploaded);
      }
    } catch (err) {
      console.error('Upload failed:', err);
    } finally {
      setIsUploading(false);
    }
  };

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    handleProcessFiles(files);
    e.target.value = '';
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const files = Array.from(e.dataTransfer.files || []);
    handleProcessFiles(files);
  };

  const handleConfirmSelect = () => {
    if (selectedItem) {
      onSelectImage(selectedItem.url, selectedItem);
      onClose();
    }
  };

  if (!isOpen) return null;

  const filteredMedia = mediaList.filter(
    (item) =>
      item.fileName.toLowerCase().includes(search.toLowerCase()) ||
      item.altText?.toLowerCase().includes(search.toLowerCase())
  );

  const formatSize = (bytes: number) => {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1048576) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / 1048576).toFixed(1)} MB`;
  };

  return (
    <div
      className="fixed inset-0 z-50 bg-[#0F172A]/75 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 animate-fade-in font-inter select-none"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-2xl sm:rounded-3xl shadow-2xl border border-[#BCD5E6] w-full max-w-4xl max-h-[90vh] flex flex-col overflow-hidden animate-scale-in"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="px-5 py-4 border-b border-[#BCD5E6] flex items-center justify-between bg-[#162C47] text-white">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-[#0EA5E9] to-[#38BDF8] flex items-center justify-center text-[#1E3A5F] shadow-sm">
              <ImageIcon className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-urbanist font-extrabold text-base tracking-tight text-white leading-tight">
                {title}
              </h3>
              <p className="text-[11px] text-[#7DD3FC]">
                Browse media assets or drop a new image to insert immediately
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-xl hover:bg-white/10 text-white/80 hover:text-white transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Toolbar: Search + Quick Upload Button */}
        <div className="px-5 py-3 border-b border-[#BCD5E6]/60 bg-[#F8FAFC] flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search images by name or tag..."
              className="w-full pl-9 pr-3 py-1.5 text-xs bg-white rounded-xl border border-[#BCD5E6] text-[#1E3A5F] focus:outline-none focus:ring-2 focus:ring-[#0EA5E9]"
            />
          </div>

          <div className="flex items-center gap-2">
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              multiple
              onChange={handleFileInputChange}
              className="hidden"
            />
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              disabled={isUploading}
              className="px-3.5 py-1.5 rounded-xl bg-[#0EA5E9] hover:bg-[#0284C7] text-white text-xs font-bold transition-all shadow-xs flex items-center gap-1.5 cursor-pointer disabled:opacity-50"
            >
              {isUploading ? (
                <>
                  <Loader2 className="w-3.5 h-3.5 animate-spin" />
                  <span>Uploading...</span>
                </>
              ) : (
                <>
                  <Upload className="w-3.5 h-3.5" />
                  <span>Upload New</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Main Body: Drag & Drop Dropzone + Media Grid */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-4">
          {/* Quick Dropzone */}
          <div
            onDragOver={(e) => {
              e.preventDefault();
              setIsDragging(true);
            }}
            onDragLeave={() => setIsDragging(false)}
            onDrop={handleDrop}
            onClick={() => fileInputRef.current?.click()}
            className={`p-4 rounded-xl border-2 border-dashed transition-all cursor-pointer text-center flex items-center justify-center gap-3 ${
              isDragging
                ? 'border-[#0EA5E9] bg-sky-50 ring-4 ring-[#0EA5E9]/20'
                : 'border-[#BCD5E6] bg-slate-50/70 hover:border-[#0EA5E9] hover:bg-sky-50/30'
            }`}
          >
            <div className="w-8 h-8 rounded-lg bg-sky-100 flex items-center justify-center text-[#0EA5E9]">
              <Upload className="w-4 h-4" />
            </div>
            <div className="text-left">
              <span className="text-xs font-bold text-[#1E3A5F]">
                {isDragging ? 'Drop images to upload' : 'Drag & drop image here to upload & use'}
              </span>
              <p className="text-[10px] text-slate-500">
                Supports PNG, JPG, SVG, WebP, GIF • Stored permanently in Media Gallery
              </p>
            </div>
          </div>

          {/* Media Items Grid */}
          {isLoading ? (
            <div className="py-16 flex flex-col items-center justify-center text-slate-400 gap-2">
              <Loader2 className="w-6 h-6 animate-spin text-[#0EA5E9]" />
              <span className="text-xs">Loading media assets...</span>
            </div>
          ) : filteredMedia.length === 0 ? (
            <div className="py-16 text-center text-slate-400">
              <ImageIcon className="w-10 h-10 mx-auto text-slate-300 mb-2" />
              <p className="text-xs font-semibold">No media items found</p>
              <p className="text-[10px] text-slate-400 mt-0.5">
                Drop an image above or click Upload New to add one
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
              {filteredMedia.map((item) => {
                const isSelected = selectedItem?.id === item.id || selectedItem?.url === item.url;
                return (
                  <div
                    key={item.id}
                    onClick={() => setSelectedItem(item)}
                    onDoubleClick={() => {
                      setSelectedItem(item);
                      onSelectImage(item.url, item);
                      onClose();
                    }}
                    className={`group relative rounded-xl border-2 overflow-hidden bg-white transition-all cursor-pointer aspect-square flex flex-col justify-between ${
                      isSelected
                        ? 'border-[#0EA5E9] ring-3 ring-[#0EA5E9]/30 shadow-md'
                        : 'border-[#BCD5E6] hover:border-slate-400 hover:shadow-xs'
                    }`}
                  >
                    {/* Thumbnail Image */}
                    <div className="w-full h-full flex items-center justify-center p-2 bg-slate-50/50">
                      <img
                        src={item.url}
                        alt={item.altText || item.fileName}
                        className="max-h-full max-w-full object-contain select-none transition-transform group-hover:scale-105"
                      />
                    </div>

                    {/* Checkmark Badge */}
                    {isSelected && (
                      <div className="absolute top-2 right-2 w-6 h-6 rounded-full bg-[#0EA5E9] text-white flex items-center justify-center shadow-md animate-scale-in">
                        <Check className="w-3.5 h-3.5 stroke-[3]" />
                      </div>
                    )}

                    {/* Bottom Metadata bar */}
                    <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent p-2 text-white text-[10px] truncate opacity-90 group-hover:opacity-100 transition-opacity">
                      <p className="font-semibold truncate">{item.fileName}</p>
                      <p className="text-[9px] text-slate-300 font-mono">
                        {formatSize(item.size)}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Footer: Selection Details & Action Buttons */}
        <div className="px-5 py-3 border-t border-[#BCD5E6] bg-slate-50 flex items-center justify-between gap-3">
          <div className="text-xs text-slate-600 truncate max-w-[60%]">
            {selectedItem ? (
              <span className="flex items-center gap-1.5 truncate">
                <span className="font-bold text-[#1E3A5F]">Selected:</span>
                <span className="font-mono text-[11px] truncate">{selectedItem.fileName}</span>
              </span>
            ) : (
              <span className="text-slate-400 italic text-[11px]">No image selected</span>
            )}
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl text-xs font-bold text-slate-600 hover:bg-slate-200 transition-colors cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="button"
              disabled={!selectedItem}
              onClick={handleConfirmSelect}
              className="px-5 py-2 rounded-xl bg-[#1E3A5F] hover:bg-[#2D5D86] text-white text-xs font-bold transition-all shadow-md cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed flex items-center gap-1.5"
            >
              <Check className="w-3.5 h-3.5 text-[#38BDF8]" />
              <span>Use Selected Image</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
