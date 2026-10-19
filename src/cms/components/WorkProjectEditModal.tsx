import React, { useState, useRef } from 'react';
import {
  X,
  Plus,
  Trash2,
  ArrowUp,
  ArrowDown,
  Image as ImageIcon,
  ExternalLink,
  Tag,
  CheckCircle2,
  Sparkles,
  Layers,
  FileText,
  Link2,
  Upload,
  Globe,
  Hexagon,
  Eye,
import { WorkShowcaseProject, WorkShowcaseGalleryImage } from '../types/schema';
import { UniversalImageUploader } from './UniversalImageUploader';
import { MediaPickerModal } from './MediaPickerModal';

interface WorkProjectEditModalProps {
  project: WorkShowcaseProject;
  availableCategories: string[];
  isOpen: boolean;
  onClose: () => void;
  onSave: (updatedProject: WorkShowcaseProject) => void;
  onDelete?: (project: WorkShowcaseProject) => void;
}

export const WorkProjectEditModal: React.FC<WorkProjectEditModalProps> = ({
  project,
  availableCategories,
  isOpen,
  onClose,
  onSave,
  onDelete,
}) => {
  const [formData, setFormData] = useState<WorkShowcaseProject>(() => ({
    ...project,
    id: project.id || `proj_${Date.now()}`,
    title: project.title || '',
    client: project.client || '',
    subtitle: project.subtitle || project.client || '',
    domainUrl: project.domainUrl || (project.url ? project.url.replace(/^https?:\/\//, '').replace(/\/$/, '') : 'mystore.com'),
    category: project.category || 'Catalog Architecture',
    previewBadge: project.previewBadge || project.category || 'E-COMMERCE STORE',
    metrics: project.metrics || '+150% Conversion Lift',
    vitalsScore: project.vitalsScore || '99/100 Core Vitals',
    description: project.description || '',
    highlights: project.highlights || [],
    galleryImages: project.galleryImages || [],
    tags: project.tags || ['Shopify Plus', 'Tailwind CSS'],
    imageUrl: project.imageUrl || 'https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=1200&q=85',
    url: project.url || '',
    caseStudyUrl: project.caseStudyUrl || '',
    actionLabel: project.actionLabel || 'CASE STUDY',
  }));

  const [newTagInput, setNewTagInput] = useState('');
  const [newBulletInput, setNewBulletInput] = useState('');
  const [activeTab, setActiveTab] = useState<'basic' | 'content' | 'gallery' | 'tags' | 'links'>('basic');
  const [isDraggingPrimary, setIsDraggingPrimary] = useState(false);
  const [isDraggingGallery, setIsDraggingGallery] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const galleryFileInputRef = useRef<HTMLInputElement>(null);
  const [confirmDeleteProject, setConfirmDeleteProject] = useState(false);
  const [isGalleryMediaModalOpen, setIsGalleryMediaModalOpen] = useState(false);

  if (!isOpen) return null;

  const handleFieldChange = <K extends keyof WorkShowcaseProject>(
    field: K,
    value: WorkShowcaseProject[K]
  ) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  // Handle local file upload for primary thumbnail
  const handlePrimaryFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === 'string') {
        handleFieldChange('imageUrl', reader.result);
      }
    };
    reader.readAsDataURL(file);
  };

  const handlePrimaryDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDraggingPrimary(false);
    const file = (Array.from(e.dataTransfer.files || []) as File[]).find((f) =>
      f.type.startsWith('image/')
    );
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === 'string') {
        handleFieldChange('imageUrl', reader.result);
      }
    };
    reader.readAsDataURL(file);
  };

  // Handle local file upload for gallery
  const handleGalleryFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []) as File[];
    if (!files.length) return;

    files.forEach((file) => {
      const reader = new FileReader();
      reader.onload = () => {
        if (typeof reader.result === 'string') {
          const newImg: WorkShowcaseGalleryImage = {
            id: `img_${Date.now()}_${Math.random().toString(36).substr(2, 4)}`,
            url: reader.result,
            caption: `${file.name.replace(/\.[^/.]+$/, '')} View`,
            altText: formData.title || 'Project photo',
          };
          setFormData((prev) => ({
            ...prev,
            galleryImages: [...(prev.galleryImages || []), newImg],
          }));
        }
      };
      reader.readAsDataURL(file);
    });
  };

  const handleGalleryDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDraggingGallery(false);
    const files = (Array.from(e.dataTransfer.files || []) as File[]).filter((f) =>
      f.type.startsWith('image/')
    );
    if (!files.length) return;

    files.forEach((file) => {
      const reader = new FileReader();
      reader.onload = () => {
        if (typeof reader.result === 'string') {
          const newImg: WorkShowcaseGalleryImage = {
            id: `img_${Date.now()}_${Math.random().toString(36).substr(2, 4)}`,
            url: reader.result,
            caption: `${file.name.replace(/\.[^/.]+$/, '')} View`,
            altText: formData.title || 'Project photo',
          };
          setFormData((prev) => ({
            ...prev,
            galleryImages: [...(prev.galleryImages || []), newImg],
          }));
        }
      };
      reader.readAsDataURL(file);
    });
  };

  // Bullet points handlers
  const handleAddBullet = () => {
    if (!newBulletInput.trim()) return;
    const current = formData.highlights || [];
    setFormData((prev) => ({
      ...prev,
      highlights: [...current, newBulletInput.trim()],
    }));
    setNewBulletInput('');
  };

  const handleUpdateBullet = (index: number, value: string) => {
    const list = [...(formData.highlights || [])];
    list[index] = value;
    setFormData((prev) => ({ ...prev, highlights: list }));
  };

  const handleRemoveBullet = (index: number) => {
    const list = [...(formData.highlights || [])].filter((_, i) => i !== index);
    setFormData((prev) => ({ ...prev, highlights: list }));
  };

  // Gallery handlers
  const handleAddGalleryImage = (customUrl?: string) => {
    const newImage: WorkShowcaseGalleryImage = {
      id: `img_${Date.now()}_${Math.random().toString(36).substr(2, 4)}`,
      url: customUrl || 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=80',
      caption: 'Storefront interface showcase',
      altText: formData.title || 'Project photo',
    };
    setFormData((prev) => ({
      ...prev,
      galleryImages: [...(prev.galleryImages || []), newImage],
    }));
  };

  const handleUpdateGalleryImage = (
    index: number,
    field: keyof WorkShowcaseGalleryImage,
    val: string
  ) => {
    const gallery = [...(formData.galleryImages || [])];
    if (gallery[index]) {
      gallery[index] = { ...gallery[index], [field]: val };
      setFormData((prev) => ({ ...prev, galleryImages: gallery }));
    }
  };

  const handleMoveGalleryImage = (index: number, direction: 'up' | 'down') => {
    const gallery = [...(formData.galleryImages || [])];
    const targetIndex = direction === 'up' ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= gallery.length) return;
    const temp = gallery[index];
    gallery[index] = gallery[targetIndex];
    gallery[targetIndex] = temp;
    setFormData((prev) => ({ ...prev, galleryImages: gallery }));
  };

  const handleRemoveGalleryImage = (index: number) => {
    const gallery = [...(formData.galleryImages || [])].filter((_, i) => i !== index);
    setFormData((prev) => ({ ...prev, galleryImages: gallery }));
  };

  // Tags handlers
  const handleAddTag = (tagToAdd?: string) => {
    const tag = (tagToAdd !== undefined ? tagToAdd : newTagInput).trim();
    if (!tag) return;
    if (!(formData.tags || []).includes(tag)) {
      setFormData((prev) => ({
        ...prev,
        tags: [...(prev.tags || []), tag],
      }));
    }
    if (tagToAdd === undefined) setNewTagInput('');
  };

  const handleRemoveTag = (tagToRemove: string) => {
    setFormData((prev) => ({
      ...prev,
      tags: (prev.tags || []).filter((t) => t !== tagToRemove),
    }));
  };

  const tagSuggestions = [
    'Shopify Plus',
    'Recharge API',
    'Tailwind CSS',
    'Home Depot US',
    'TikTok Shop',
    'Photoshop Batch',
    'FBT Logistics',
    'Metafields',
    'WooCommerce',
    'Modern React',
    'Instant Search',
    'Stripe Payments',
    'Headless Shopify',
    'Variant Matrices',
    'Klaviyo Flows',
  ];

  const photoPresets = [
    { label: 'Skincare & Botanicals', url: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=1200&q=85' },
    { label: 'DTC Gadgets & Models', url: 'https://images.unsplash.com/photo-1513151233558-d860c5398176?auto=format&fit=crop&w=1200&q=85' },
    { label: 'Luxury Vanities & Interior', url: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=1200&q=85' },
    { label: 'Apparel & Outerwear', url: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=1200&q=85' },
    { label: 'Eco Goods & Refills', url: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&w=1200&q=85' },
    { label: 'Clinical Health / Socks', url: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=1200&q=85' },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-900/75 backdrop-blur-xs animate-fade-in">
      <div className="w-full max-w-4xl max-h-[92vh] bg-white rounded-3xl shadow-2xl border border-slate-300 flex flex-col overflow-hidden text-[#1E3A5F]">
        {/* Modal Header */}
        <div className="px-6 py-4 bg-slate-50 border-b border-slate-200 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-[#143020] flex items-center justify-center text-[#4ADE80] shadow-xs">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h2 className="font-urbanist font-extrabold text-lg sm:text-xl text-slate-900">
                {formData.title ? `Edit Card: ${formData.title}` : 'Add New Sample Work Card'}
              </h2>
              <p className="text-xs text-slate-500">
                Configure texts, live storefront links, browser frame domain, performance vitals, and photo gallery.
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-200/60 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="px-6 py-2 bg-slate-100 border-b border-slate-200 flex items-center gap-2 overflow-x-auto text-xs font-bold">
          {[
            { id: 'basic', label: '1. Titles & Browser Bar', icon: Layers },
            { id: 'content', label: '2. Description & Bullets', icon: FileText },
            { id: 'gallery', label: `3. Photos & Uploads (${(formData.galleryImages?.length || 0) + 1})`, icon: ImageIcon },
            { id: 'tags', label: `4. Platform Tags (${formData.tags?.length || 0})`, icon: Tag },
            { id: 'links', label: '5. Storefront Links & CTA', icon: Link2 },
          ].map((tab) => {
            const Icon = tab.icon;
            const active = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id as any)}
                className={`px-3.5 py-1.5 rounded-xl flex items-center gap-1.5 transition-all cursor-pointer whitespace-nowrap ${
                  active
                    ? 'bg-[#143020] text-white shadow-xs'
                    : 'text-slate-600 hover:bg-white hover:text-slate-900'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Modal Body / Scrollable Content */}
        <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-6 space-y-6 text-xs">
          {/* TAB 1: BASIC INFORMATION */}
          {activeTab === 'basic' && (
            <div className="space-y-4 animate-fade-in">
              {/* Project Title & Subtitle */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-bold text-slate-900 mb-1">
                    Project Card Title (H3) <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.title}
                    onChange={(e) => handleFieldChange('title', e.target.value)}
                    placeholder="e.g. GOLD & GROVE"
                    className="w-full px-3.5 py-2 rounded-xl border border-slate-300 bg-white text-slate-900 font-bold text-sm focus:border-[#10B981] focus:outline-hidden"
                  />
                  <span className="text-[10px] text-slate-400">Rendered in bold uppercase on the card.</span>
                </div>

                <div>
                  <label className="block font-bold text-slate-900 mb-1">
                    Card Subtitle / Line Tagline
                  </label>
                  <input
                    type="text"
                    value={formData.subtitle || ''}
                    onChange={(e) => {
                      handleFieldChange('subtitle', e.target.value);
                      handleFieldChange('client', e.target.value);
                    }}
                    placeholder="e.g. INTERNAL BLEMISH BLEND & SKIN-CLEARING BOTANICAL SUPPLEMENTS."
                    className="w-full px-3.5 py-2 rounded-xl border border-slate-300 bg-white text-slate-900 font-semibold focus:border-[#10B981] focus:outline-hidden"
                  />
                  <span className="text-[10px] text-slate-400">Uppercase tagline right below the title.</span>
                </div>
              </div>

              {/* Browser Bar Frame Settings */}
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
                <div className="flex items-center gap-2">
                  <div className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#EF4444]" />
                    <span className="w-2.5 h-2.5 rounded-full bg-[#F59E0B]" />
                    <span className="w-2.5 h-2.5 rounded-full bg-[#10B981]" />
                  </div>
                  <span className="font-extrabold text-xs text-slate-800">
                    Browser Window Frame Customization
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                  <div>
                    <label className="block text-[11px] font-bold text-slate-600 mb-1">
                      Browser URL Bar Domain
                    </label>
                    <div className="flex items-center gap-1.5">
                      <Hexagon className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                      <input
                        type="text"
                        value={formData.domainUrl || ''}
                        onChange={(e) => handleFieldChange('domainUrl', e.target.value)}
                        placeholder="e.g. goldandgrove.com"
                        className="w-full px-3 py-1.5 rounded-xl border border-slate-300 bg-white font-mono text-xs text-slate-800"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-slate-600 mb-1">
                      Vitals / Lighthouse Score Badge
                    </label>
                    <input
                      type="text"
                      value={formData.vitalsScore || ''}
                      onChange={(e) => handleFieldChange('vitalsScore', e.target.value)}
                      placeholder="e.g. 99/100 Core Vitals or 98/100 Lighthouse"
                      className="w-full px-3 py-1.5 rounded-xl border border-slate-300 bg-white font-mono text-xs text-slate-800"
                    />
                  </div>
                </div>
              </div>

              {/* Floating Badges */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-bold text-slate-900 mb-1">
                    Category Tag (Top-Left Floating Badge)
                  </label>
                  <input
                    type="text"
                    value={formData.previewBadge || ''}
                    onChange={(e) => {
                      handleFieldChange('previewBadge', e.target.value);
                      handleFieldChange('category', e.target.value);
                    }}
                    placeholder="e.g. SKIN NUTRITION & WELLNESS"
                    className="w-full px-3.5 py-2 rounded-xl border border-slate-300 bg-white text-slate-900 font-extrabold text-xs"
                  />
                  <span className="text-[10px] text-slate-400">White pill shown on top-left of image preview.</span>
                </div>

                <div>
                  <label className="block font-bold text-slate-900 mb-1">
                    Highlight Metric (Top-Right Floating Pill)
                  </label>
                  <input
                    type="text"
                    value={formData.metrics}
                    onChange={(e) => handleFieldChange('metrics', e.target.value)}
                    placeholder="e.g. +220% Subscription Retention or 25,000+ Active SKUs"
                    className="w-full px-3.5 py-2 rounded-xl border border-slate-300 bg-white text-[#15803D] font-mono font-bold text-xs"
                  />
                  <span className="text-[10px] text-slate-400">Green pill shown on top-right of image preview.</span>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: DESCRIPTION & KEY ACHIEVEMENTS */}
          {activeTab === 'content' && (
            <div className="space-y-5 animate-fade-in">
              <div>
                <label className="block font-bold text-slate-900 mb-1">
                  Card Main Description
                </label>
                <textarea
                  rows={4}
                  value={formData.description}
                  onChange={(e) => handleFieldChange('description', e.target.value)}
                  placeholder="Explain the store scale, catalog complexity, daily fulfillment processes, and technical systems engineered..."
                  className="w-full p-3.5 rounded-xl border border-slate-300 bg-white text-slate-900 leading-relaxed text-xs focus:border-[#10B981] focus:outline-hidden"
                />
              </div>

              {/* Dynamic Achievements List */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-bold text-slate-900">Key Deliverables & Bullets (Case Study)</h3>
                    <p className="text-[11px] text-slate-500">
                      Specific verified deliverables, variant counts, SLA records, and automation workflows.
                    </p>
                  </div>
                  <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-[#143020] font-mono text-[10px] font-bold">
                    {formData.highlights?.length || 0} bullets
                  </span>
                </div>

                {/* Add new bullet bar */}
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={newBulletInput}
                    onChange={(e) => setNewBulletInput(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        e.preventDefault();
                        handleAddBullet();
                      }
                    }}
                    placeholder="e.g. Re-engineered high-converting supplement subscription funnel..."
                    className="flex-1 px-3.5 py-2 rounded-xl border border-slate-300 bg-white text-slate-900 focus:border-[#10B981] focus:outline-hidden"
                  />
                  <button
                    type="button"
                    onClick={handleAddBullet}
                    className="px-4 py-2 rounded-xl bg-[#143020] hover:bg-[#1E442D] text-white font-bold flex items-center gap-1.5 transition-colors cursor-pointer"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Add Bullet</span>
                  </button>
                </div>

                {/* Bullets List */}
                <div className="space-y-2 mt-2">
                  {(formData.highlights || []).map((bullet, idx) => (
                    <div
                      key={idx}
                      className="p-2.5 rounded-xl bg-slate-50 border border-slate-200 flex items-start gap-2.5 group"
                    >
                      <CheckCircle2 className="w-4 h-4 text-[#10B981] shrink-0 mt-0.5" />
                      <input
                        type="text"
                        value={bullet}
                        onChange={(e) => handleUpdateBullet(idx, e.target.value)}
                        className="flex-1 bg-transparent border-0 border-b border-transparent focus:border-[#10B981] text-slate-900 font-medium text-xs focus:outline-hidden"
                      />
                      <button
                        type="button"
                        onClick={() => handleRemoveBullet(idx)}
                        className="p-1 rounded-lg text-slate-400 hover:text-red-600 hover:bg-red-50 transition-colors cursor-pointer"
                        title="Remove bullet"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: PHOTOS, UPLOADS & GALLERY */}
          {activeTab === 'gallery' && (
            <div className="space-y-6 animate-fade-in">
              {/* Primary Card Thumbnail Image */}
              <div className="p-4 rounded-2xl border border-slate-200 bg-slate-50 space-y-3">
                <UniversalImageUploader
                  label="Primary Card Mockup Photo"
                  helperText="The main screenshot displayed inside the macOS browser frame. Supports Drag & Drop, device upload, or popout selection from Media Gallery."
                  value={formData.imageUrl}
                  onChange={(url) => handleFieldChange('imageUrl', url)}
                  onRemove={() => handleFieldChange('imageUrl', '')}
                  aspectRatio="video"
                />

                {/* Quick photo presets */}
                <div className="pt-2 border-t border-slate-200">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">
                    Quick Stock Storefront Presets
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {photoPresets.map((p, pIdx) => (
                      <button
                        key={pIdx}
                        type="button"
                        onClick={() => handleFieldChange('imageUrl', p.url)}
                        className={`px-2.5 py-1 rounded-lg text-xs font-semibold border transition-all cursor-pointer ${
                          formData.imageUrl === p.url
                            ? 'bg-[#143020] text-white border-[#143020]'
                            : 'bg-white text-slate-600 border-slate-200 hover:border-[#10B981]'
                        }`}
                      >
                        {p.label}
                      </button>
                    ))}
                  </div>
                </div>
              </div>



              {/* Gallery Photos (Multiple Photos) */}
              <div className="space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-2 border-b border-slate-200">
                  <div>
                    <h3 className="font-bold text-slate-900">Additional Case Study Gallery Photos</h3>
                    <p className="text-[11px] text-slate-500">
                      Add screenshots of PDPs, cart drawers, variant matrices, and UI clips.
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <input
                      type="file"
                      ref={galleryFileInputRef}
                      accept="image/*"
                      onChange={handleGalleryFileUpload}
                      className="hidden"
                    />
                    <button
                      type="button"
                      onClick={() => galleryFileInputRef.current?.click()}
                      className="px-3 py-1.5 rounded-xl bg-white hover:bg-slate-100 border border-slate-300 text-slate-700 font-bold text-xs flex items-center gap-1.5 transition-colors cursor-pointer shadow-2xs"
                    >
                      <Upload className="w-3.5 h-3.5 text-[#10B981]" />
                      <span>Upload Photo</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => setIsGalleryMediaModalOpen(true)}
                      className="px-3 py-1.5 rounded-xl bg-sky-50 hover:bg-sky-100 border border-sky-200 text-[#0284C7] font-bold text-xs flex items-center gap-1.5 transition-colors cursor-pointer shadow-2xs"
                    >
                      <ImageIcon className="w-3.5 h-3.5 text-[#0EA5E9]" />
                      <span>Choose from Media Gallery</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => handleAddGalleryImage()}
                      className="px-3.5 py-1.5 rounded-xl bg-[#143020] hover:bg-[#1E442D] text-white font-bold text-xs flex items-center gap-1.5 transition-colors cursor-pointer"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      <span>+ Add Image URL</span>
                    </button>
                  </div>
                </div>

                {/* Drag & Drop Multi-photo Dropzone */}
                <div
                  onDragOver={(e) => {
                    e.preventDefault();
                    setIsDraggingGallery(true);
                  }}
                  onDragLeave={() => setIsDraggingGallery(false)}
                  onDrop={handleGalleryDrop}
                  onClick={() => galleryFileInputRef.current?.click()}
                  className={`p-6 rounded-2xl border-2 border-dashed transition-all cursor-pointer text-center flex flex-col items-center justify-center gap-2 ${
                    isDraggingGallery
                      ? 'border-[#10B981] bg-emerald-50 ring-4 ring-[#10B981]/20 scale-101'
                      : 'border-slate-300 bg-slate-50 hover:bg-slate-100/80 hover:border-slate-400'
                  }`}
                >
                  <div className="w-10 h-10 rounded-2xl bg-white border border-slate-200 flex items-center justify-center text-slate-500 shadow-xs">
                    <Upload className="w-5 h-5 text-[#10B981]" />
                  </div>
                  <div>
                    <span className="font-bold text-xs text-slate-800 block">
                      Drag & Drop Proof of Work Photos Here
                    </span>
                    <span className="text-[11px] text-slate-500">
                      or click to browse multiple image files from your computer (PNG, JPG, WebP)
                    </span>
                  </div>
                </div>

                {/* Gallery List */}
                <div className="space-y-3">
                  {(formData.galleryImages || []).map((img, idx) => (
                    <div
                      key={img.id || idx}
                      className="p-3 rounded-2xl bg-slate-50 border border-slate-200 flex flex-col sm:flex-row items-start sm:items-center gap-3"
                    >
                      {/* Reordering */}
                      <div className="flex sm:flex-col items-center gap-1 shrink-0">
                        <button
                          type="button"
                          disabled={idx === 0}
                          onClick={() => handleMoveGalleryImage(idx, 'up')}
                          className="p-1 rounded-md text-slate-400 hover:text-slate-800 disabled:opacity-30 cursor-pointer"
                          title="Move up"
                        >
                          <ArrowUp className="w-3.5 h-3.5" />
                        </button>
                        <span className="text-[10px] font-mono text-slate-400">#{idx + 1}</span>
                        <button
                          type="button"
                          disabled={idx === (formData.galleryImages?.length || 0) - 1}
                          onClick={() => handleMoveGalleryImage(idx, 'down')}
                          className="p-1 rounded-md text-slate-400 hover:text-slate-800 disabled:opacity-30 cursor-pointer"
                          title="Move down"
                        >
                          <ArrowDown className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      {/* Image Preview */}
                      <div className="w-20 h-14 rounded-xl overflow-hidden bg-slate-200 border border-slate-300 shrink-0">
                        {img.url ? (
                          <img src={img.url} alt={img.caption} className="w-full h-full object-cover" />
                        ) : (
                          <ImageIcon className="w-4 h-4 text-slate-400 mx-auto mt-5" />
                        )}
                      </div>

                      {/* Fields */}
                      <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-2 w-full">
                        <input
                          type="url"
                          value={img.url}
                          onChange={(e) => handleUpdateGalleryImage(idx, 'url', e.target.value)}
                          placeholder="Image URL..."
                          className="px-2.5 py-1.5 rounded-lg border border-slate-300 bg-white font-mono text-xs text-slate-800"
                        />
                        <input
                          type="text"
                          value={img.caption || ''}
                          onChange={(e) => handleUpdateGalleryImage(idx, 'caption', e.target.value)}
                          placeholder="Photo Caption..."
                          className="px-2.5 py-1.5 rounded-lg border border-slate-300 bg-white text-xs text-slate-800"
                        />
                      </div>

                      <button
                        type="button"
                        onClick={() => handleRemoveGalleryImage(idx)}
                        className="p-2 rounded-xl text-slate-400 hover:text-red-600 hover:bg-red-50 transition-colors cursor-pointer"
                        title="Delete photo"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  ))}

                  {(!formData.galleryImages || formData.galleryImages.length === 0) && (
                    <div className="p-6 rounded-2xl border border-dashed border-slate-300 text-center text-slate-400">
                      No additional gallery photos added yet. Click "+ Add Image URL" or "Upload Photo" above.
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* TAB 4: PLATFORM & TOOL TAGS */}
          {activeTab === 'tags' && (
            <div className="space-y-4 animate-fade-in">
              <div>
                <h3 className="font-bold text-slate-900">Platform & Tool Tags (Pills)</h3>
                <p className="text-[11px] text-slate-500">
                  Tag the operational stack used for this project (e.g. Shopify Plus, Recharge API, Tailwind CSS, Home Depot, TikTok Shop).
                </p>
              </div>

              {/* Tag Add Bar */}
              <div className="flex gap-2">
                <input
                  type="text"
                  value={newTagInput}
                  onChange={(e) => setNewTagInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault();
                      handleAddTag();
                    }
                  }}
                  placeholder="Type tag name and press Enter..."
                  className="flex-1 px-3.5 py-2 rounded-xl border border-slate-300 bg-white text-slate-900 focus:border-[#10B981] focus:outline-hidden"
                />
                <button
                  type="button"
                  onClick={() => handleAddTag()}
                  className="px-4 py-2 rounded-xl bg-[#143020] hover:bg-[#1E442D] text-white font-bold transition-colors cursor-pointer"
                >
                  Add Tag
                </button>
              </div>

              {/* Active Tags */}
              <div>
                <label className="block text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-2">
                  Active Tags ({formData.tags?.length || 0})
                </label>
                <div className="flex flex-wrap gap-2">
                  {(formData.tags || []).map((t) => (
                    <span
                      key={t}
                      className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-100 border border-slate-200 text-slate-800 font-bold text-xs"
                    >
                      <span>{t}</span>
                      <button
                        type="button"
                        onClick={() => handleRemoveTag(t)}
                        className="p-0.5 rounded-full hover:bg-red-100 hover:text-red-600 transition-colors cursor-pointer"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </span>
                  ))}
                </div>
              </div>

              {/* Suggested Quick Add Chips */}
              <div className="pt-3 border-t border-slate-200">
                <label className="block text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-2">
                  Quick Add Suggestions
                </label>
                <div className="flex flex-wrap gap-1.5">
                  {tagSuggestions.map((sug) => {
                    const isAdded = (formData.tags || []).includes(sug);
                    return (
                      <button
                        key={sug}
                        type="button"
                        disabled={isAdded}
                        onClick={() => handleAddTag(sug)}
                        className={`px-2.5 py-1 rounded-lg text-[11px] font-medium border transition-all cursor-pointer ${
                          isAdded
                            ? 'bg-slate-100 text-slate-400 border-slate-200 cursor-not-allowed'
                            : 'bg-white hover:bg-slate-100 text-slate-700 border-slate-300 hover:text-[#143020]'
                        }`}
                      >
                        + {sug}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          )}

          {/* TAB 5: EXTERNAL LINKS & ACTIONS */}
          {activeTab === 'links' && (
            <div className="space-y-4 animate-fade-in">
              <div>
                <h3 className="font-bold text-slate-900">External Links & Action Buttons</h3>
                <p className="text-[11px] text-slate-500">
                  Configure live storefront links and action buttons shown on the card.
                </p>
              </div>

              <div>
                <label className="block font-bold text-slate-900 mb-1">
                  Live Storefront Destination URL
                </label>
                <div className="flex items-center gap-2">
                  <ExternalLink className="w-4 h-4 text-slate-400" />
                  <input
                    type="url"
                    value={formData.url || ''}
                    onChange={(e) => handleFieldChange('url', e.target.value)}
                    placeholder="https://goldandgrove.com/"
                    className="flex-1 px-3.5 py-2 rounded-xl border border-slate-300 bg-white text-slate-900 focus:border-[#10B981] focus:outline-hidden"
                  />
                  {formData.url && (
                    <a
                      href={formData.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-3 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs flex items-center gap-1"
                    >
                      <span>Test Link</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  )}
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-900 mb-1">
                  Primary Action Button Label
                </label>
                <input
                  type="text"
                  value={formData.actionLabel || ''}
                  onChange={(e) => handleFieldChange('actionLabel', e.target.value)}
                  placeholder="CASE STUDY"
                  className="w-full px-3.5 py-2 rounded-xl border border-slate-300 bg-white text-slate-900 font-bold focus:border-[#10B981] focus:outline-hidden"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-900 mb-1">
                  Case Study / Documentation Link (Optional)
                </label>
                <div className="flex items-center gap-2">
                  <Link2 className="w-4 h-4 text-slate-400" />
                  <input
                    type="url"
                    value={formData.caseStudyUrl || ''}
                    onChange={(e) => handleFieldChange('caseStudyUrl', e.target.value)}
                    placeholder="https://..."
                    className="flex-1 px-3.5 py-2 rounded-xl border border-slate-300 bg-white text-slate-900 focus:border-[#10B981] focus:outline-hidden"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Modal Footer */}
          <div className="pt-4 border-t border-slate-200 flex items-center justify-between">
            {onDelete ? (
              confirmDeleteProject ? (
                <div className="flex items-center gap-1.5 bg-red-50 border border-red-200 px-2.5 py-1.5 rounded-xl animate-fade-in">
                  <span className="text-xs font-bold text-red-700">Delete this sample work card?</span>
                  <button
                    type="button"
                    onClick={() => {
                      onDelete(formData);
                      onClose();
                    }}
                    className="px-2.5 py-1 rounded-lg bg-red-600 hover:bg-red-700 text-white font-extrabold text-xs cursor-pointer shadow-xs"
                  >
                    Yes, Delete
                  </button>
                  <button
                    type="button"
                    onClick={() => setConfirmDeleteProject(false)}
                    className="px-2 py-1 rounded-lg bg-slate-200 hover:bg-slate-300 text-slate-700 font-bold text-xs cursor-pointer"
                  >
                    Cancel
                  </button>
                </div>
              ) : (
                <button
                  type="button"
                  onClick={() => setConfirmDeleteProject(true)}
                  className="px-3 py-2 rounded-xl text-red-600 hover:bg-red-50 font-bold text-xs flex items-center gap-1.5 cursor-pointer transition-colors"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  <span>Delete Sample Card</span>
                </button>
              )
            ) : (
              <div />
            )}

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={onClose}
                className="px-5 py-2.5 rounded-xl border border-slate-300 hover:bg-slate-100 font-bold text-slate-600 transition-colors cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-6 py-2.5 rounded-xl bg-[#143020] hover:bg-[#1E442D] text-white font-extrabold shadow-md flex items-center gap-2 transition-all cursor-pointer"
              >
                <CheckCircle2 className="w-4 h-4 text-[#4ADE80]" />
                <span>Save & Update Card</span>
              </button>
            </div>
          </div>
        </form>
      </div>

      {/* Popout Media Gallery for Gallery Photos */}
      <MediaPickerModal
        isOpen={isGalleryMediaModalOpen}
        onClose={() => setIsGalleryMediaModalOpen(false)}
        onSelectImage={(url) => {
          const newImg: WorkShowcaseGalleryImage = {
            id: `img_${Date.now()}_${Math.random().toString(36).substr(2, 4)}`,
            url,
            caption: '',
            altText: formData.title,
          };
          setFormData((prev) => ({
            ...prev,
            galleryImages: [...(prev.galleryImages || []), newImg],
          }));
          setIsGalleryMediaModalOpen(false);
        }}
        title={`Select Proof of Work Photo • ${formData.title || 'Work Card'}`}
      />
    </div>
  );
};
