import React, { useState, useEffect } from 'react';
import {
  X,
  ExternalLink,
  Globe,
  Sparkles,
  Layers,
  RotateCcw,
  RotateCw,
  Image as ImageIcon,
  Check,
} from 'lucide-react';
import { StoreOrbitItem } from '../types/schema';
import { UniversalImageUploader } from './UniversalImageUploader';

interface RotatingSiteEditModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (site: StoreOrbitItem) => void;
  initialSite?: StoreOrbitItem | null;
  existingSitesCount?: { inner: number; outer: number };
}

export const RotatingSiteEditModal: React.FC<RotatingSiteEditModalProps> = ({
  isOpen,
  onClose,
  onSave,
  initialSite,
  existingSitesCount = { inner: 2, outer: 3 },
}) => {
  const [formData, setFormData] = useState<Partial<StoreOrbitItem>>({
    name: '',
    sublabel: '',
    url: '',
    orbitIndex: 2,
    angle: 0,
    fallbackInitials: '',
    faviconDomain: '',
    logoUrl: '',
    size: 70,
  });

  useEffect(() => {
    if (initialSite) {
      setFormData({ ...initialSite });
    } else {
      // Create new rotating site defaults
      const countInOrbit = existingSitesCount.outer;
      const autoAngle = Math.round((360 / Math.max(1, countInOrbit + 1)) * countInOrbit) % 360;
      setFormData({
        id: `store_${Date.now()}`,
        name: '',
        sublabel: 'E-Commerce Store • Visit ↗',
        url: 'https://',
        orbitIndex: 2,
        angle: autoAngle,
        radius: 390,
        size: 70,
        flyInDelay: 0.8,
        fallbackInitials: 'ST',
        faviconDomain: '',
        logoUrl: '',
      });
    }
  }, [initialSite, isOpen]);

  // Handle ESC key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleNameChange = (name: string) => {
    const initials = name
      .split(' ')
      .filter(Boolean)
      .map((w) => w[0])
      .join('')
      .toUpperCase()
      .slice(0, 3);

    setFormData((prev) => ({
      ...prev,
      name,
      fallbackInitials: prev.fallbackInitials || initials,
    }));
  };

  const handleUrlChange = (url: string) => {
    let domain = '';
    try {
      const clean = url.replace(/^https?:\/\//i, '').split('/')[0];
      domain = clean.replace(/^www\./i, '');
    } catch {}

    setFormData((prev) => ({
      ...prev,
      url,
      faviconDomain: domain || prev.faviconDomain,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name?.trim()) return;

    const orbit = formData.orbitIndex || 2;
    const defaultRadius = orbit === 1 ? 295 : 390;
    const defaultSize = orbit === 1 ? 72 : 70;

    const completedSite: StoreOrbitItem = {
      id: formData.id || `store_${Date.now()}`,
      name: formData.name.trim(),
      sublabel: formData.sublabel?.trim() || 'Client Store • Visit ↗',
      url: formData.url?.trim() || 'https://',
      orbitIndex: orbit,
      radius: formData.radius || defaultRadius,
      size: formData.size || defaultSize,
      angle: formData.angle !== undefined ? formData.angle : 0,
      flyInDelay: formData.flyInDelay || 0.8,
      fallbackInitials:
        formData.fallbackInitials?.trim() ||
        formData.name.slice(0, 2).toUpperCase(),
      faviconDomain: formData.faviconDomain?.trim(),
      logoUrl: formData.logoUrl?.trim(),
    };

    onSave(completedSite);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-black/60 backdrop-blur-xs font-inter animate-fade-in">
      <div
        className="w-full max-w-2xl bg-white rounded-3xl shadow-2xl border border-slate-200 flex flex-col max-h-[90vh] overflow-hidden animate-scale-in"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="px-6 py-4 border-b border-slate-200 bg-slate-50 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-2xl bg-gradient-to-tr from-[#1E3A5F] to-[#0EA5E9] flex items-center justify-center text-white shadow-xs">
              <Sparkles className="w-5 h-5 text-[#7DD3FC]" />
            </div>
            <div>
              <h3 className="font-urbanist font-extrabold text-base text-[#1E3A5F]">
                {initialSite ? 'Edit Rotating Site' : 'Add New Rotating Site'}
              </h3>
              <p className="text-[11px] text-slate-500">
                Configure store logo, target URL, and orbit rotation ring on the Homepage.
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-xl text-slate-400 hover:text-slate-800 hover:bg-slate-200 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-6 space-y-5">
          {/* Live Planet Preview Card */}
          <div className="p-4 rounded-2xl bg-gradient-to-br from-[#F4F8FB] to-[#E2EEF8] border border-[#BCD5E6] flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              {/* Rotating Planet Badge Mockup */}
              <div
                className="w-16 h-16 rounded-full bg-white border-2 border-[#1E3A5F] shadow-lg flex items-center justify-center p-1.5 relative overflow-hidden shrink-0"
                style={{
                  boxShadow: '0 8px 20px rgba(30,58,95,0.22)',
                }}
              >
                {formData.logoUrl ? (
                  <img
                    src={formData.logoUrl}
                    alt={formData.name || 'Logo'}
                    className="w-full h-full object-contain rounded-full"
                    onError={(e) => {
                      (e.target as HTMLElement).style.display = 'none';
                    }}
                  />
                ) : formData.faviconDomain ? (
                  <img
                    src={`https://www.google.com/s2/favicons?domain=${formData.faviconDomain}&sz=128`}
                    alt={formData.name || 'Favicon'}
                    className="w-full h-full object-contain rounded-full p-1"
                    onError={(e) => {
                      (e.target as HTMLElement).style.display = 'none';
                    }}
                  />
                ) : (
                  <span className="font-urbanist font-black text-xs text-[#1E3A5F]">
                    {formData.fallbackInitials || 'ST'}
                  </span>
                )}
                <div className="absolute -top-0.5 -right-0.5 w-4 h-4 rounded-full bg-[#1E3A5F] text-white flex items-center justify-center">
                  <ExternalLink className="w-2.5 h-2.5" />
                </div>
              </div>

              <div>
                <span className="font-urbanist font-extrabold text-sm text-[#1E3A5F] block">
                  {formData.name || 'Store Name Preview'}
                </span>
                <span className="text-xs text-slate-600 block">
                  {formData.sublabel || 'Sublabel / Category preview'}
                </span>
                <span className="text-[10px] text-[#0EA5E9] font-mono block truncate max-w-xs">
                  {formData.url || 'https://store.com'}
                </span>
              </div>
            </div>

            <div className="px-3 py-1.5 rounded-xl bg-white/90 border border-[#BCD5E6] text-right shrink-0">
              <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">
                Orbit Ring
              </span>
              <span className="text-xs font-black text-[#1E3A5F] flex items-center gap-1 justify-end">
                {formData.orbitIndex === 1 ? (
                  <>
                    <RotateCcw className="w-3.5 h-3.5 text-[#0EA5E9]" />
                    <span>Inner (295px • CCW)</span>
                  </>
                ) : (
                  <>
                    <RotateCw className="w-3.5 h-3.5 text-[#0284C7]" />
                    <span>Outer (390px • CW)</span>
                  </>
                )}
              </span>
            </div>
          </div>

          {/* Store Name & Sublabel */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Store / Client Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                required
                value={formData.name || ''}
                onChange={(e) => handleNameChange(e.target.value)}
                placeholder="e.g. Willow Bath & Vanity"
                className="w-full px-3.5 py-2 rounded-xl border border-slate-300 text-xs text-slate-800 focus:border-[#0EA5E9] focus:outline-hidden"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Sublabel / Tagline
              </label>
              <input
                type="text"
                value={formData.sublabel || ''}
                onChange={(e) => setFormData({ ...formData, sublabel: e.target.value })}
                placeholder="e.g. Shopify & Home Depot • Visit ↗"
                className="w-full px-3.5 py-2 rounded-xl border border-slate-300 text-xs text-slate-800 focus:border-[#0EA5E9] focus:outline-hidden"
              />
            </div>
          </div>

          {/* Website URL & Auto-Favicon Domain */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="sm:col-span-2">
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Website URL
              </label>
              <div className="relative">
                <Globe className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="url"
                  value={formData.url || ''}
                  onChange={(e) => handleUrlChange(e.target.value)}
                  placeholder="https://willowbathandvanity.com/"
                  className="w-full pl-9 pr-3.5 py-2 rounded-xl border border-slate-300 text-xs text-slate-800 font-mono focus:border-[#0EA5E9] focus:outline-hidden"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Fallback Monogram
              </label>
              <input
                type="text"
                maxLength={4}
                value={formData.fallbackInitials || ''}
                onChange={(e) => setFormData({ ...formData, fallbackInitials: e.target.value.toUpperCase() })}
                placeholder="WB"
                className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs text-slate-800 font-black tracking-widest text-center uppercase focus:border-[#0EA5E9] focus:outline-hidden"
              />
            </div>
          </div>

          {/* Orbit Selection & Angle */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-4 rounded-2xl bg-slate-50 border border-slate-200">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">
                Orbit Rotation Layer
              </label>
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => setFormData({ ...formData, orbitIndex: 1, radius: 295, size: 72 })}
                  className={`p-2.5 rounded-xl border text-center transition-all cursor-pointer ${
                    formData.orbitIndex === 1
                      ? 'bg-[#1E3A5F] text-white border-[#1E3A5F] shadow-xs'
                      : 'bg-white text-slate-700 border-slate-300 hover:border-slate-400'
                  }`}
                >
                  <span className="block font-bold text-xs">Inner Orbit</span>
                  <span className="block text-[10px] opacity-75">CCW • 36s spin</span>
                </button>
                <button
                  type="button"
                  onClick={() => setFormData({ ...formData, orbitIndex: 2, radius: 390, size: 70 })}
                  className={`p-2.5 rounded-xl border text-center transition-all cursor-pointer ${
                    formData.orbitIndex === 2
                      ? 'bg-[#1E3A5F] text-white border-[#1E3A5F] shadow-xs'
                      : 'bg-white text-slate-700 border-slate-300 hover:border-slate-400'
                  }`}
                >
                  <span className="block font-bold text-xs">Outer Orbit</span>
                  <span className="block text-[10px] opacity-75">CW • 48s spin</span>
                </button>
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="text-xs font-bold text-slate-700">Orbit Starting Angle</label>
                <span className="text-xs font-mono font-bold text-[#0EA5E9]">{formData.angle || 0}°</span>
              </div>
              <input
                type="range"
                min={0}
                max={359}
                step={5}
                value={formData.angle || 0}
                onChange={(e) => setFormData({ ...formData, angle: parseInt(e.target.value, 10) })}
                className="w-full accent-[#0EA5E9] cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-slate-400 mt-1 font-mono">
                <span>0°</span>
                <span>90°</span>
                <span>180°</span>
                <span>270°</span>
                <span>359°</span>
              </div>
            </div>
          </div>

          {/* Logo Image Upload with UniversalImageUploader (Drag & Drop + Media Gallery Popout!) */}
          <div>
            <UniversalImageUploader
              label="Store Logo Image"
              helperText="Upload custom store logo (PNG, SVG, WebP) with transparent background, or choose from Media Gallery. If left empty, Google Favicon is used automatically."
              value={formData.logoUrl || ''}
              onChange={(url) => setFormData({ ...formData, logoUrl: url })}
              aspectRatio="1/1"
              galleryTitle="Choose Store Logo from Media Gallery"
              placeholder="https://... or upload file"
            />
          </div>

          {/* Modal Action Buttons */}
          <div className="pt-3 border-t border-slate-200 flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl border border-slate-300 text-slate-700 font-bold text-xs hover:bg-slate-100 transition-colors cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2.5 rounded-xl bg-[#0EA5E9] hover:bg-[#0284C7] text-white font-extrabold text-xs shadow-md transition-all cursor-pointer flex items-center gap-1.5 hover:scale-[1.02]"
            >
              <Check className="w-4 h-4" />
              <span>{initialSite ? 'Update Rotating Site' : 'Add Rotating Site'}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
