import React, { useState } from 'react';
import {
  Image as ImageIcon,
  Upload,
  Copy,
  Check,
  Trash2,
  Search,
  ExternalLink,
  Plus,
  FileCheck,
} from 'lucide-react';
import { MediaItem } from '../types/schema';

interface MediaLibraryViewProps {
  mediaItems: MediaItem[];
  onUploadMedia: (file: File) => Promise<MediaItem>;
  onDeleteMedia: (id: string) => Promise<boolean>;
}

export const MediaLibraryView: React.FC<MediaLibraryViewProps> = ({
  mediaItems,
  onUploadMedia,
  onDeleteMedia,
}) => {
  const [search, setSearch] = useState('');
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);

  const filteredItems = mediaItems.filter(
    (m) =>
      m.fileName.toLowerCase().includes(search.toLowerCase()) ||
      m.altText.toLowerCase().includes(search.toLowerCase())
  );

  const handleCopy = (url: string, id: string) => {
    navigator.clipboard.writeText(url);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleFileInput = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    try {
      await onUploadMedia(file);
    } finally {
      setIsUploading(false);
    }
  };

  const formatSize = (bytes: number) => {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1048576) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / 1048576).toFixed(1)} MB`;
  };

  return (
    <div className="w-full max-w-6xl mx-auto space-y-6 animate-fade-up font-inter text-[#1E3A5F]">
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-[#BCD5E6]">
        <div>
          <h2 className="font-urbanist font-extrabold text-2xl text-[#1E3A5F]">
            Media Library
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Manage high-res product cutouts, lifestyle assets, and schematics.
          </p>
        </div>

        {/* Upload Trigger */}
        <label className="px-5 py-2.5 rounded-full bg-[#1E3A5F] hover:bg-[#2D5D86] text-white font-extrabold text-xs transition-all shadow-md cursor-pointer flex items-center gap-2 self-start sm:self-auto">
          <Upload className="w-4 h-4 text-[#7DD3FC]" />
          <span>{isUploading ? 'Uploading...' : 'Upload Media Asset'}</span>
          <input
            type="file"
            accept="image/*"
            onChange={handleFileInput}
            className="hidden"
            disabled={isUploading}
          />
        </label>
      </div>

      {/* Search Bar */}
      <div className="flex items-center gap-2 p-2 rounded-xl bg-white border border-[#BCD5E6] max-w-md shadow-2xs">
        <Search className="w-4 h-4 text-slate-400 ml-1.5" />
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Filter by filename or alt text..."
          className="w-full text-xs text-[#1E3A5F] focus:outline-none bg-transparent"
        />
      </div>

      {/* Grid of Assets */}
      {filteredItems.length === 0 ? (
        <div className="p-12 text-center rounded-2xl border-2 border-dashed border-[#BCD5E6] bg-white">
          <ImageIcon className="w-10 h-10 text-slate-300 mx-auto mb-2" />
          <h4 className="font-bold text-sm text-[#1E3A5F]">No media assets found</h4>
          <p className="text-xs text-slate-500 mt-1">
            Upload images to populate your portfolio & WPBakery element choices.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {filteredItems.map((item) => (
            <div
              key={item.id}
              className="rounded-2xl border-2 border-[#BCD5E6] bg-white overflow-hidden shadow-xs hover:border-[#0EA5E9] hover:shadow-md transition-all flex flex-col justify-between group"
            >
              <div className="h-44 bg-slate-100 overflow-hidden relative">
                <img
                  src={item.url}
                  alt={item.altText}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <span className="absolute bottom-2 left-2 px-2 py-0.5 rounded-md bg-black/60 text-white text-[10px] font-mono backdrop-blur-xs">
                  {formatSize(item.size)}
                </span>
              </div>

              <div className="p-3.5 flex-1 flex flex-col justify-between">
                <div>
                  <h5 className="font-bold text-xs text-[#1E3A5F] truncate" title={item.fileName}>
                    {item.fileName}
                  </h5>
                  <p className="text-[11px] text-slate-500 truncate mt-0.5" title={item.altText}>
                    Alt: {item.altText || 'None'}
                  </p>
                </div>

                <div className="mt-3 pt-2.5 border-t border-slate-100 flex items-center justify-between">
                  <button
                    type="button"
                    onClick={() => handleCopy(item.url, item.id)}
                    className="px-2.5 py-1 rounded-lg bg-[#EFF6FB] hover:bg-[#E0F2FE] text-[11px] font-bold text-[#1E3A5F] flex items-center gap-1 cursor-pointer transition-colors"
                  >
                    {copiedId === item.id ? (
                      <>
                        <Check className="w-3 h-3 text-emerald-600" />
                        <span>Copied!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3 h-3 text-[#0EA5E9]" />
                        <span>Copy URL</span>
                      </>
                    )}
                  </button>

                  <button
                    type="button"
                    onClick={() => onDeleteMedia(item.id)}
                    className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg cursor-pointer transition-colors"
                    title="Delete Asset"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
