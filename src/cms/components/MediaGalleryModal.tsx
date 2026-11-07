import React, { useState, useEffect, useRef } from 'react';
import {
  X,
  Search,
  Upload,
  Image as ImageIcon,
  Check,
  ExternalLink,
  Plus,
  Sparkles,
} from 'lucide-react';
import { MediaItem } from '../types/schema';
import { contentService } from '../services/ContentServiceFactory';

interface MediaGalleryModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectImage: (imageUrl: string, mediaItem?: MediaItem) => void;
  title?: string;
  selectedUrl?: string;
}

export const MediaGalleryModal: React.FC<MediaGalleryModalProps> = ({
  isOpen,
  onClose,
  onSelectImage,
  title = 'Media Gallery • Select Image Asset',
  selectedUrl,
}) => {
  const [mediaItems, setMediaItems] = useState<MediaItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState<'gallery' | 'upload' | 'url'>('gallery');
  const [directUrlInput, setDirectUrlInput] = useState('');
  const [isUploading, setIsUploading] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      loadMedia();
    }
  }, [isOpen]);

  // Handle ESC key to close
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  const loadMedia = async () => {
    setIsLoading(true);
    try {
      const items = await contentService.getMediaLibrary();
      setMediaItems(items || []);
    } catch (err) {
      console.error('Failed to load media library', err);
    } finally {
      setIsLoading(false);
    }
  };

  if (!isOpen) return null;

  const filteredItems = mediaItems.filter((item) => {
    if (!searchQuery.trim()) return true;
    const q = searchQuery.toLowerCase();
    return (
      (item.fileName || '').toLowerCase().includes(q) ||
      (item.altText || '').toLowerCase().includes(q) ||
      (item.caption || '').toLowerCase().includes(q)
    );
  });

  const handleUploadFiles = async (files: File[]) => {
    if (!files.length) return;
    setIsUploading(true);
    try {
      let lastUploaded: MediaItem | null = null;
      for (const file of files) {
        const uploaded = await contentService.uploadMedia(file);
        lastUploaded = uploaded;
      }
      await loadMedia();
      if (lastUploaded) {
        // Automatically select the uploaded image!
        onSelectImage(lastUploaded.url, lastUploaded);
        onClose();
      }
    } catch (err) {
      console.error('Upload failed', err);
    } finally {
      setIsUploading(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const files = (Array.from(e.dataTransfer.files || []) as File[]).filter((f) =>
      f.type.startsWith('image/')
    );
    if (files.length) {
      handleUploadFiles(files);
    }
  };

  const handleSelect = (url: string, item?: MediaItem) => {
    onSelectImage(url, item);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-black/60 backdrop-blur-xs font-inter animate-fade-in">
      <div
        className="w-full max-w-4xl max-h-[90vh] bg-white rounded-3xl shadow-2xl border border-slate-200 flex flex-col overflow-hidden animate-scale-in"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Top Header */}
        <div className="px-6 py-4 border-b border-slate-200 bg-slate-50 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-[#0EA5E9] to-[#38BDF8] flex items-center justify-center text-white shadow-xs">
              <ImageIcon className="w-4 h-4 text-white" />
            </div>
            <div>
              <h3 className="font-urbanist font-extrabold text-base text-[#1E3A5F]">
                {title}
              </h3>
              <p className="text-[11px] text-slate-500">
                Choose an existing asset from the library, upload a new image, or paste an external URL.
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-xl text-slate-400 hover:text-slate-800 hover:bg-slate-200 transition-colors cursor-pointer"
            title="Close modal (Esc)"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Switcher & Search Bar */}
        <div className="px-6 py-3 border-b border-slate-100 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 bg-white">
          <div className="flex items-center gap-1.5 bg-slate-100 p-1 rounded-xl">
            <button
              type="button"
              onClick={() => setActiveTab('gallery')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                activeTab === 'gallery'
                  ? 'bg-white text-[#1E3A5F] shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Media Assets ({mediaItems.length})
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('upload')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                activeTab === 'upload'
                  ? 'bg-white text-[#1E3A5F] shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Upload className="w-3.5 h-3.5 text-[#0EA5E9]" />
              <span>Upload New</span>
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('url')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                activeTab === 'url'
                  ? 'bg-white text-[#1E3A5F] shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Direct Link
            </button>
          </div>

          {activeTab === 'gallery' && (
            <div className="relative flex-1 sm:max-w-xs">
              <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search assets by name or keyword..."
                className="w-full pl-8 pr-3 py-1.5 rounded-xl border border-slate-200 bg-slate-50 text-xs text-slate-800 focus:bg-white focus:border-[#0EA5E9] focus:outline-hidden"
              />
            </div>
          )}
        </div>

        {/* Modal Body */}
        <div className="flex-1 overflow-y-auto p-6 min-h-[320px] max-h-[60vh]">
          {/* TAB 1: MEDIA GALLERY GRID */}
          {activeTab === 'gallery' && (
            <div className="space-y-4">
              {isLoading ? (
                <div className="py-16 text-center text-slate-400 text-xs">
                  Loading assets...
                </div>
              ) : filteredItems.length === 0 ? (
                <div className="py-16 text-center space-y-3">
                  <div className="w-12 h-12 rounded-2xl bg-slate-100 flex items-center justify-center text-slate-400 mx-auto">
                    <ImageIcon className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="font-bold text-sm text-slate-700">No media assets found</h4>
                    <p className="text-xs text-slate-500 mt-0.5">
                      {searchQuery
                        ? `No results match "${searchQuery}"`
                        : 'Upload an image asset to start populating your gallery.'}
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => setActiveTab('upload')}
                    className="px-4 py-2 rounded-xl bg-[#1E3A5F] hover:bg-[#2D5D86] text-white text-xs font-bold inline-flex items-center gap-1.5 cursor-pointer shadow-xs"
                  >
                    <Upload className="w-3.5 h-3.5 text-[#7DD3FC]" />
                    <span>Upload First Asset</span>
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 sm:gap-4">
                  {filteredItems.map((item) => {
                    const isCurrent = selectedUrl && (selectedUrl === item.url || selectedUrl.includes(item.fileName));
                    return (
                      <div
                        key={item.id}
                        onClick={() => handleSelect(item.url, item)}
                        className={`group relative rounded-2xl border overflow-hidden cursor-pointer bg-slate-50 hover:bg-white transition-all hover:shadow-lg hover:scale-[1.02] flex flex-col ${
                          isCurrent
                            ? 'border-[#0EA5E9] ring-2 ring-[#0EA5E9]/40 shadow-md'
                            : 'border-slate-200 hover:border-[#0EA5E9]'
                        }`}
                      >
                        {/* Thumbnail View */}
                        <div className="aspect-[4/3] w-full bg-slate-100 overflow-hidden relative flex items-center justify-center">
                          <img
                            src={item.url}
                            alt={item.altText || item.fileName}
                            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                            loading="lazy"
                            onError={(e) => {
                              (e.target as HTMLElement).style.display = 'none';
                            }}
                          />
                          {isCurrent && (
                            <div className="absolute top-2 right-2 px-2 py-0.5 rounded-full bg-[#0EA5E9] text-white text-[9.5px] font-black shadow-md flex items-center gap-1">
                              <Check className="w-2.5 h-2.5" />
                              <span>Current</span>
                            </div>
                          )}
                          <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-2.5">
                            <span className="w-full py-1 text-center rounded-lg bg-white/95 text-[#1E3A5F] font-bold text-[10.5px] shadow-sm">
                              Click to Choose
                            </span>
                          </div>
                        </div>

                        {/* File Details */}
                        <div className="p-2.5 space-y-0.5 bg-white">
                          <span className="font-bold text-xs text-slate-800 block truncate" title={item.fileName}>
                            {item.fileName}
                          </span>
                          <div className="flex items-center justify-between text-[10px] text-slate-400">
                            <span>{item.width && item.height ? `${item.width}×${item.height}` : 'Asset'}</span>
                            <span>{item.altText ? '• Alt set' : ''}</span>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          )}

          {/* TAB 2: DRAG & DROP UPLOAD */}
          {activeTab === 'upload' && (
            <div className="space-y-4">
              <input
                type="file"
                ref={fileInputRef}
                multiple
                accept="image/*"
                onChange={(e) => {
                  const files = Array.from(e.target.files || []) as File[];
                  handleUploadFiles(files);
                  e.target.value = '';
                }}
                className="hidden"
              />

              <div
                onDragOver={(e) => {
                  e.preventDefault();
                  setIsDragging(true);
                }}
                onDragLeave={() => setIsDragging(false)}
                onDrop={handleDrop}
                onClick={() => fileInputRef.current?.click()}
                className={`p-10 rounded-3xl border-2 border-dashed transition-all cursor-pointer text-center flex flex-col items-center justify-center gap-3 ${
                  isDragging
                    ? 'border-[#0EA5E9] bg-sky-50 ring-4 ring-[#0EA5E9]/20 scale-[1.01]'
                    : 'border-slate-300 bg-slate-50 hover:bg-sky-50/50 hover:border-[#0EA5E9]'
                }`}
              >
                <div className="w-14 h-14 rounded-2xl bg-white border border-slate-200 flex items-center justify-center text-[#0EA5E9] shadow-sm">
                  <Upload className={`w-7 h-7 transition-transform ${isDragging ? 'scale-115 -translate-y-1' : ''}`} />
                </div>
                <div>
                  <h4 className="font-urbanist font-extrabold text-base text-[#1E3A5F]">
                    {isDragging ? 'Drop images here to upload & select!' : 'Drag & drop image files here'}
                  </h4>
                  <p className="text-xs text-slate-500 mt-1 max-w-sm mx-auto">
                    or <span className="text-[#0EA5E9] font-bold underline">click to browse</span> from your device. Supports PNG, JPG, WebP, SVG, and GIF.
                  </p>
                </div>
                <div className="flex items-center gap-2 text-[11px] text-slate-400">
                  <Sparkles className="w-3.5 h-3.5 text-[#0EA5E9]" />
                  <span>Images uploaded here are automatically saved to your media library and selected</span>
                </div>
              </div>

              {isUploading && (
                <div className="p-4 rounded-2xl bg-sky-50 border border-sky-200 text-center text-xs font-bold text-sky-800 animate-pulse">
                  Uploading and processing image asset...
                </div>
              )}
            </div>
          )}

          {/* TAB 3: DIRECT URL / EXTERNAL LINK */}
          {activeTab === 'url' && (
            <div className="space-y-4 max-w-lg mx-auto py-4">
              <div className="space-y-2">
                <label className="block text-xs font-bold text-slate-700">
                  Direct Image URL (Unsplash, Cloud CDN, or Hosted Photo)
                </label>
                <div className="flex gap-2">
                  <input
                    type="url"
                    value={directUrlInput}
                    onChange={(e) => setDirectUrlInput(e.target.value)}
                    placeholder="https://images.unsplash.com/... or https://..."
                    className="flex-1 px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs text-slate-800 focus:border-[#0EA5E9] focus:outline-hidden"
                  />
                  <button
                    type="button"
                    disabled={!directUrlInput.trim()}
                    onClick={() => handleSelect(directUrlInput.trim())}
                    className="px-4 py-2.5 rounded-xl bg-[#0EA5E9] hover:bg-[#0284C7] disabled:opacity-40 text-white font-bold text-xs transition-colors cursor-pointer"
                  >
                    Select URL
                  </button>
                </div>
              </div>

              {directUrlInput && (
                <div className="p-3 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                    URL Preview
                  </span>
                  <div className="h-40 w-full rounded-xl overflow-hidden bg-slate-900 flex items-center justify-center">
                    <img
                      src={directUrlInput}
                      alt="Preview"
                      className="max-h-full max-w-full object-contain"
                      onError={(e) => {
                        (e.target as HTMLElement).style.display = 'none';
                      }}
                    />
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="px-6 py-3 border-t border-slate-200 bg-slate-50 flex items-center justify-between text-xs text-slate-500">
          <span>Click any image to select immediately</span>
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-1.5 rounded-xl border border-slate-300 hover:bg-slate-200 text-slate-700 font-bold transition-colors cursor-pointer"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};
