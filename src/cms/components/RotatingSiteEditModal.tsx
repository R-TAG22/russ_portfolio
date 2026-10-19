import React, { useState, useEffect } from 'react';
import {
  X,
  Radio,
  ExternalLink,
  Trash2,
  Check,
  Globe,
  Sparkles,
  Layers,
} from 'lucide-react';
import { RotatingSiteItem } from '../types/schema';
import { UniversalImageUploader } from './UniversalImageUploader';

interface RotatingSiteEditModalProps {
  site?: RotatingSiteItem | null;
  isOpen: boolean;
  onClose: () => void;
  onSave: (site: RotatingSiteItem) => void;
  onDelete?: (id: string) => void;
}

export const RotatingSiteEditModal: React.FC<RotatingSiteEditModalProps> = ({
  site,
  isOpen,
  onClose,
  onSave,
  onDelete,
}) => {
  const [formData, setFormData] = useState<RotatingSiteItem>(() => ({
    id: site?.id || `site_${Date.now()}`,
    name: site?.name || '',
    sublabel: site?.sublabel || '',
    url: site?.url || '',
    logoUrl: site?.logoUrl || '',
    faviconDomain: site?.faviconDomain || '',
    fallbackInitials: site?.fallbackInitials || '',
    orbitIndex: site?.orbitIndex || 1,
    size: site?.size || 72,
  }));

  const [confirmDelete, setConfirmDelete] = useState(false);

  useEffect(() => {
    if (site) {
      setFormData({
        ...site,
        id: site.id || `site_${Date.now()}`,
      });
    } else {
      setFormData({
        id: `site_${Date.now()}`,
        name: '',
        sublabel: '',
        url: '',
        logoUrl: '',
        faviconDomain: '',
        fallbackInitials: '',
        orbitIndex: 1,
        size: 72,
      });
    }
    setConfirmDelete(false);
  }, [site, isOpen]);

  if (!isOpen) return null;

  // Auto extract domain and fallback initials if url or name changes
  const handleUrlChange = (urlVal: string) => {
    let domain = '';
    try {
      const parsed = new URL(urlVal.startsWith('http') ? urlVal : `https://${urlVal}`);
      domain = parsed.hostname.replace(/^www\./, '');
    } catch {
      domain = urlVal.replace(/^https?:\/\//, '').replace(/^www\./, '').split('/')[0];
    }
    setFormData((prev) => ({
      ...prev,
      url: urlVal,
      faviconDomain: prev.faviconDomain || domain,
    }));
  };

  const handleNameChange = (nameVal: string) => {
    // Generate 2-3 char initials
    const words = nameVal.trim().split(/\s+/);
    let initials = '';
    if (words.length >= 2) {
      initials = (words[0][0] + words[1][0]).toUpperCase();
    } else if (words.length === 1 && words[0]) {
      initials = words[0].slice(0, 3).toUpperCase();
    }
    setFormData((prev) => ({
      ...prev,
      name: nameVal,
      fallbackInitials: prev.fallbackInitials || initials,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim()) return;

    let fullUrl = formData.url.trim();
    if (fullUrl && !fullUrl.startsWith('http://') && !fullUrl.startsWith('https://')) {
      fullUrl = `https://${fullUrl}`;
    }

    onSave({
      ...formData,
      url: fullUrl,
      fallbackInitials:
        formData.fallbackInitials.trim() || formData.name.slice(0, 2).toUpperCase(),
    });
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 bg-[#0F172A]/75 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 animate-fade-in font-inter select-none"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-2xl sm:rounded-3xl shadow-2xl border border-[#BCD5E6] w-full max-w-xl max-h-[92vh] flex flex-col overflow-hidden animate-scale-in"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="px-5 py-4 border-b border-[#BCD5E6] flex items-center justify-between bg-[#162C47] text-white">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-[#0EA5E9] to-[#38BDF8] flex items-center justify-center text-[#1E3A5F] shadow-sm">
              <Radio className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-urbanist font-extrabold text-base tracking-tight text-white leading-tight">
                {site ? `Edit Rotating Site: ${site.name}` : 'Add New Rotating Site'}
              </h3>
              <p className="text-[11px] text-[#7DD3FC]">
                E-Commerce Client Storefront orbiting Russell on the Homepage
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

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-5 space-y-4 text-xs text-[#1E3A5F]">
          {/* 1. Store Name & Orbit Ring Selection */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block font-bold text-[#1E3A5F] mb-1">
                Store / Brand Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => handleNameChange(e.target.value)}
                placeholder="e.g. DIYATIVE, Skin by Brownlee & Co."
                className="w-full px-3 py-2 rounded-xl border border-[#BCD5E6] bg-white text-[#1E3A5F] font-semibold focus:outline-none focus:ring-2 focus:ring-[#0EA5E9]"
              />
            </div>

            <div>
              <label className="block font-bold text-[#1E3A5F] mb-1">Orbit Ring (Layer)</label>
              <div className="grid grid-cols-2 gap-1.5">
                <button
                  type="button"
                  onClick={() => setFormData({ ...formData, orbitIndex: 1 })}
                  className={`p-2 rounded-xl border text-center font-bold text-xs flex flex-col items-center gap-0.5 cursor-pointer transition-all ${
                    formData.orbitIndex === 1
                      ? 'bg-[#1E3A5F] text-white border-[#1E3A5F] shadow-xs'
                      : 'bg-white text-slate-600 border-[#BCD5E6] hover:bg-slate-50'
                  }`}
                >
                  <span className="font-urbanist">Inner Ring</span>
                  <span className="text-[9.5px] opacity-80 font-normal">Layer 1 (295px)</span>
                </button>

                <button
                  type="button"
                  onClick={() => setFormData({ ...formData, orbitIndex: 2 })}
                  className={`p-2 rounded-xl border text-center font-bold text-xs flex flex-col items-center gap-0.5 cursor-pointer transition-all ${
                    formData.orbitIndex === 2
                      ? 'bg-[#1E3A5F] text-white border-[#1E3A5F] shadow-xs'
                      : 'bg-white text-slate-600 border-[#BCD5E6] hover:bg-slate-50'
                  }`}
                >
                  <span className="font-urbanist">Outer Ring</span>
                  <span className="text-[9.5px] opacity-80 font-normal">Layer 2 (390px)</span>
                </button>
              </div>
            </div>
          </div>

          {/* 2. Sublabel / Tagline & Store URL */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block font-bold text-[#1E3A5F] mb-1">Sublabel / Category</label>
              <input
                type="text"
                value={formData.sublabel}
                onChange={(e) => setFormData({ ...formData, sublabel: e.target.value })}
                placeholder="e.g. 3D Wooden Models & Kits • Visit ↗"
                className="w-full px-3 py-2 rounded-xl border border-[#BCD5E6] bg-white text-[#1E3A5F] focus:outline-none focus:ring-2 focus:ring-[#0EA5E9]"
              />
            </div>

            <div>
              <label className="block font-bold text-[#1E3A5F] mb-1">Store Website URL</label>
              <input
                type="text"
                value={formData.url}
                onChange={(e) => handleUrlChange(e.target.value)}
                placeholder="https://example.com"
                className="w-full px-3 py-2 rounded-xl border border-[#BCD5E6] bg-white text-[#1E3A5F] focus:outline-none focus:ring-2 focus:ring-[#0EA5E9]"
              />
            </div>
          </div>

          {/* 3. Logo Image Upload with Drag & Drop AND Media Gallery Popout! */}
          <div className="pt-2 border-t border-[#BCD5E6]/60">
            <UniversalImageUploader
              label="Store Logo Image"
              helperText="Upload custom brand logo. Supports Drag & Drop or popout selection from Media Gallery. If left empty, site favicon or initials are used."
              value={formData.logoUrl}
              onChange={(newUrl) => setFormData({ ...formData, logoUrl: newUrl })}
              onRemove={() => setFormData({ ...formData, logoUrl: '' })}
              placeholder="https://... (or drop file/choose media)"
              aspectRatio="square"
            />
          </div>

          {/* 4. Advanced Settings: Fallback Initials & Favicon Domain */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 border-t border-[#BCD5E6]/60">
            <div>
              <label className="block font-bold text-[#1E3A5F] mb-1">Fallback Initials / Monogram</label>
              <input
                type="text"
                maxLength={4}
                value={formData.fallbackInitials}
                onChange={(e) => setFormData({ ...formData, fallbackInitials: e.target.value.toUpperCase() })}
                placeholder="e.g. DIY, WB, SB"
                className="w-full px-3 py-2 rounded-xl border border-[#BCD5E6] bg-white text-[#1E3A5F] font-mono font-bold uppercase focus:outline-none focus:ring-2 focus:ring-[#0EA5E9]"
              />
            </div>

            <div>
              <label className="block font-bold text-[#1E3A5F] mb-1">Favicon Domain</label>
              <input
                type="text"
                value={formData.faviconDomain}
                onChange={(e) => setFormData({ ...formData, faviconDomain: e.target.value })}
                placeholder="e.g. diyative.com"
                className="w-full px-3 py-2 rounded-xl border border-[#BCD5E6] bg-white text-[#1E3A5F] font-mono text-[11px] focus:outline-none focus:ring-2 focus:ring-[#0EA5E9]"
              />
            </div>
          </div>

          {/* 5. Live Badge Preview */}
          <div className="p-3 rounded-2xl bg-gradient-to-r from-[#EFF6FB] to-[#DBEAFE] border border-[#BCD5E6] flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-14 h-14 rounded-full bg-white border-2 border-[#1E3A5F] shadow-md flex items-center justify-center overflow-hidden p-1 relative">
                {formData.logoUrl ? (
                  <img
                    src={formData.logoUrl}
                    alt={formData.name || 'Logo'}
                    className="w-full h-full object-contain rounded-full"
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
                  <span className="font-urbanist font-black text-sm text-[#1E3A5F]">
                    {formData.fallbackInitials || 'RT'}
                  </span>
                )}
                <div className="absolute -top-0.5 -right-0.5 w-4 h-4 rounded-full bg-[#1E3A5F] text-white flex items-center justify-center">
                  <ExternalLink className="w-2.5 h-2.5" />
                </div>
              </div>

              <div>
                <span className="text-[10px] uppercase font-bold text-[#0EA5E9] tracking-wider">
                  Orbit Badge Preview • {formData.orbitIndex === 1 ? 'Inner Ring' : 'Outer Ring'}
                </span>
                <h5 className="font-bold text-sm text-[#1E3A5F] leading-tight">
                  {formData.name || 'Store Name'}
                </h5>
                <p className="text-[11px] text-slate-500">
                  {formData.sublabel || 'Storefront Tagline'}
                </p>
              </div>
            </div>
          </div>
        </form>

        {/* Footer Actions */}
        <div className="px-5 py-3 border-t border-[#BCD5E6] bg-slate-50 flex items-center justify-between gap-3">
          {site && onDelete ? (
            confirmDelete ? (
              <div className="flex items-center gap-1.5 animate-fade-in">
                <span className="text-[11px] font-bold text-red-600">Delete this rotating site?</span>
                <button
                  type="button"
                  onClick={() => {
                    onDelete(site.id);
                    onClose();
                  }}
                  className="px-2.5 py-1 rounded-lg bg-red-600 hover:bg-red-700 text-white font-bold text-xs cursor-pointer shadow-xs"
                >
                  Yes, Delete
                </button>
                <button
                  type="button"
                  onClick={() => setConfirmDelete(false)}
                  className="px-2 py-1 rounded-lg bg-slate-200 hover:bg-slate-300 text-slate-700 text-xs font-semibold cursor-pointer"
                >
                  Cancel
                </button>
              </div>
            ) : (
              <button
                type="button"
                onClick={() => setConfirmDelete(true)}
                className="text-red-500 hover:text-red-700 font-bold text-xs flex items-center gap-1 cursor-pointer"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>Delete Site</span>
              </button>
            )
          ) : (
            <div />
          )}

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
              onClick={handleSubmit}
              className="px-5 py-2 rounded-xl bg-[#1E3A5F] hover:bg-[#2D5D86] text-white text-xs font-bold transition-all shadow-md cursor-pointer flex items-center gap-1.5"
            >
              <Check className="w-3.5 h-3.5 text-[#38BDF8]" />
              <span>{site ? 'Save Rotating Site' : 'Add Rotating Site'}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
