import React, { useState } from 'react';
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
  Eye,
  Link2,
} from 'lucide-react';
import { WorkShowcaseProject, WorkShowcaseGalleryImage } from '../types/schema';

interface WorkProjectEditModalProps {
  project: WorkShowcaseProject;
  availableCategories: string[];
  isOpen: boolean;
  onClose: () => void;
  onSave: (updatedProject: WorkShowcaseProject) => void;
}

export const WorkProjectEditModal: React.FC<WorkProjectEditModalProps> = ({
  project,
  availableCategories,
  isOpen,
  onClose,
  onSave,
}) => {
  const [formData, setFormData] = useState<WorkShowcaseProject>(() => ({
    ...project,
    id: project.id || `proj_${Date.now()}`,
    highlights: project.highlights || [],
    galleryImages: project.galleryImages || [],
    tags: project.tags || [],
  }));

  const [newTagInput, setNewTagInput] = useState('');
  const [newBulletInput, setNewBulletInput] = useState('');
  const [activeTab, setActiveTab] = useState<'basic' | 'content' | 'gallery' | 'tags' | 'links'>('basic');

  if (!isOpen) return null;

  const handleFieldChange = <K extends keyof WorkShowcaseProject>(
    field: K,
    value: WorkShowcaseProject[K]
  ) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
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
  const handleAddGalleryImage = () => {
    const newImage: WorkShowcaseGalleryImage = {
      id: `img_${Date.now()}_${Math.random().toString(36).substr(2, 4)}`,
      url: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=80',
      caption: '',
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
    'Home Depot US',
    'TikTok Shop',
    'Photoshop Batch',
    'FBT Logistics',
    'Metafields',
    'WooCommerce',
    'Variant Matrices',
    'Inventory Automation',
    'Premiere Pro',
    'DaVinci Resolve',
    'CSV Architecture',
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-900/70 backdrop-blur-xs animate-fade-in">
      <div className="w-full max-w-4xl max-h-[92vh] bg-white rounded-3xl shadow-2xl border border-[#BCD5E6] flex flex-col overflow-hidden text-[#1E3A5F]">
        {/* Modal Header */}
        <div className="px-6 py-4 bg-[#F4F8FB] border-b border-[#BCD5E6] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-[#0EA5E9]/10 border border-[#0EA5E9]/30 flex items-center justify-center text-[#0EA5E9]">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h2 className="font-urbanist font-extrabold text-lg sm:text-xl text-[#1E3A5F]">
                {formData.title ? `Edit Project: ${formData.title}` : 'Add New Case Study'}
              </h2>
              <p className="text-xs text-slate-500">
                Detailed portfolio showcase, multi-photo gallery manager, and live storefront links.
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-[#1E3A5F] hover:bg-slate-200/60 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="px-6 py-2 bg-slate-50 border-b border-[#BCD5E6]/60 flex items-center gap-2 overflow-x-auto text-xs font-bold">
          {[
            { id: 'basic', label: '1. Basic Info & Metrics', icon: Layers },
            { id: 'content', label: '2. Description & Bullets', icon: FileText },
            { id: 'gallery', label: `3. Gallery (${formData.galleryImages?.length || 0})`, icon: ImageIcon },
            { id: 'tags', label: `4. Tech Tags (${formData.tags?.length || 0})`, icon: Tag },
            { id: 'links', label: '5. External Links & CTA', icon: Link2 },
          ].map((tab) => {
            const Icon = tab.icon;
            const active = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id as any)}
                className={`px-3 py-1.5 rounded-xl flex items-center gap-1.5 transition-all cursor-pointer whitespace-nowrap ${
                  active
                    ? 'bg-[#1E3A5F] text-white shadow-xs'
                    : 'text-slate-600 hover:bg-slate-200/60'
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
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-bold text-[#1E3A5F] mb-1">
                    Project Title <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.title}
                    onChange={(e) => handleFieldChange('title', e.target.value)}
                    placeholder="e.g. Willow Bath and Vanity Inc."
                    className="w-full px-3.5 py-2 rounded-xl border border-[#BCD5E6] bg-white text-[#1E3A5F] font-bold text-sm focus:border-[#0EA5E9] focus:outline-hidden"
                  />
                </div>

                <div>
                  <label className="block font-bold text-[#1E3A5F] mb-1">
                    Subtitle / Client / Niche
                  </label>
                  <input
                    type="text"
                    value={formData.client}
                    onChange={(e) => handleFieldChange('client', e.target.value)}
                    placeholder="e.g. Luxury Bathroom Vanities & Multi-Channel Ops"
                    className="w-full px-3.5 py-2 rounded-xl border border-[#BCD5E6] bg-white text-[#1E3A5F] focus:border-[#0EA5E9] focus:outline-hidden"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-bold text-[#1E3A5F] mb-1">
                    Category / Filter Tag
                  </label>
                  <div className="flex gap-2">
                    <select
                      value={formData.category}
                      onChange={(e) => handleFieldChange('category', e.target.value)}
                      className="w-1/2 px-3.5 py-2 rounded-xl border border-[#BCD5E6] bg-white text-[#1E3A5F] font-medium focus:border-[#0EA5E9] focus:outline-hidden"
                    >
                      {availableCategories
                        .filter((c) => c !== 'All')
                        .map((cat) => (
                          <option key={cat} value={cat}>
                            {cat}
                          </option>
                        ))}
                    </select>
                    <input
                      type="text"
                      value={formData.category}
                      onChange={(e) => handleFieldChange('category', e.target.value)}
                      placeholder="Or enter custom category"
                      className="w-1/2 px-3.5 py-2 rounded-xl border border-[#BCD5E6] bg-white text-[#1E3A5F] focus:border-[#0EA5E9] focus:outline-hidden"
                    />
                  </div>
                </div>

                <div>
                  <label className="block font-bold text-[#1E3A5F] mb-1">
                    Highlight Metric Badge
                  </label>
                  <input
                    type="text"
                    value={formData.metrics}
                    onChange={(e) => handleFieldChange('metrics', e.target.value)}
                    placeholder="e.g. 25,000+ Active SKUs or 4.8★ SPS Score"
                    className="w-full px-3.5 py-2 rounded-xl border border-[#BCD5E6] bg-white text-[#1E3A5F] font-mono font-bold focus:border-[#0EA5E9] focus:outline-hidden"
                  />
                </div>
              </div>

              {/* Primary Thumbnail Preview & URL */}
              <div className="p-4 rounded-2xl bg-[#F4F8FB] border border-[#BCD5E6] space-y-3">
                <div className="flex items-center justify-between">
                  <label className="block font-bold text-[#1E3A5F]">
                    Primary Thumbnail Image URL
                  </label>
                  <span className="text-[11px] text-slate-500">Card & Grid Hero Image</span>
                </div>
                <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
                  <div className="w-32 h-20 rounded-xl overflow-hidden bg-slate-200 border border-slate-300 shrink-0 shadow-xs flex items-center justify-center">
                    {formData.imageUrl ? (
                      <img
                        src={formData.imageUrl}
                        alt={formData.title}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          (e.target as HTMLElement).style.display = 'none';
                        }}
                      />
                    ) : (
                      <ImageIcon className="w-6 h-6 text-slate-400" />
                    )}
                  </div>
                  <input
                    type="url"
                    value={formData.imageUrl}
                    onChange={(e) => handleFieldChange('imageUrl', e.target.value)}
                    placeholder="https://images.unsplash.com/... or uploaded asset URL"
                    className="flex-1 px-3.5 py-2 rounded-xl border border-[#BCD5E6] bg-white text-[#1E3A5F] text-xs focus:border-[#0EA5E9] focus:outline-hidden"
                  />
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: DESCRIPTION & KEY ACHIEVEMENTS */}
          {activeTab === 'content' && (
            <div className="space-y-5 animate-fade-in">
              <div>
                <label className="block font-bold text-[#1E3A5F] mb-1">
                  Main Description & Operational Problem/Solution
                </label>
                <textarea
                  rows={4}
                  value={formData.description}
                  onChange={(e) => handleFieldChange('description', e.target.value)}
                  placeholder="Explain the store scale, catalog complexity, daily fulfillment processes, and technical systems engineered..."
                  className="w-full p-3.5 rounded-xl border border-[#BCD5E6] bg-white text-[#1E3A5F] leading-relaxed text-xs focus:border-[#0EA5E9] focus:outline-hidden"
                />
              </div>

              {/* Dynamic Achievements List */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-bold text-[#1E3A5F]">Key Achievements / Bullet Points</h3>
                    <p className="text-[11px] text-slate-500">
                      Specific verified deliverables, variant counts, SLA records, and automation workflows.
                    </p>
                  </div>
                  <span className="px-2 py-0.5 rounded-full bg-sky-100 text-[#0EA5E9] font-mono text-[10px] font-bold">
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
                    placeholder="e.g. Architected 25,000+ variant matrices with nested countertop, finish, and hardware logic..."
                    className="flex-1 px-3.5 py-2 rounded-xl border border-[#BCD5E6] bg-white text-[#1E3A5F] focus:border-[#0EA5E9] focus:outline-hidden"
                  />
                  <button
                    type="button"
                    onClick={handleAddBullet}
                    className="px-4 py-2 rounded-xl bg-[#0EA5E9] hover:bg-[#0284C7] text-white font-bold flex items-center gap-1.5 transition-colors cursor-pointer"
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
                      className="p-2.5 rounded-xl bg-[#F4F8FB] border border-[#BCD5E6] flex items-start gap-2.5 group"
                    >
                      <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                      <input
                        type="text"
                        value={bullet}
                        onChange={(e) => handleUpdateBullet(idx, e.target.value)}
                        className="flex-1 bg-transparent border-0 border-b border-transparent focus:border-[#0EA5E9] text-[#1E3A5F] font-medium text-xs focus:outline-hidden"
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
                  {(!formData.highlights || formData.highlights.length === 0) && (
                    <div className="p-4 rounded-xl border border-dashed border-[#BCD5E6] text-center text-slate-400">
                      No achievement bullet points added yet. Type a bullet point above and click "Add Bullet".
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: MULTI-PHOTO & MEDIA GALLERY MANAGER */}
          {activeTab === 'gallery' && (
            <div className="space-y-4 animate-fade-in">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-2 border-b border-slate-100">
                <div>
                  <h3 className="font-bold text-[#1E3A5F]">Project Gallery Photos</h3>
                  <p className="text-[11px] text-slate-500">
                    Add multiple screenshots, catalog matrices, high-resolution product photography, and UI clips.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={handleAddGalleryImage}
                  className="px-3.5 py-1.5 rounded-xl bg-[#0EA5E9] hover:bg-[#0284C7] text-white font-bold flex items-center gap-1.5 transition-colors cursor-pointer self-start sm:self-auto"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>+ Add Photo URL</span>
                </button>
              </div>

              {/* Gallery Items Grid / List */}
              <div className="space-y-3">
                {(formData.galleryImages || []).map((img, idx) => (
                  <div
                    key={img.id || idx}
                    className="p-3.5 rounded-2xl bg-[#F4F8FB] border border-[#BCD5E6] flex flex-col md:flex-row items-start md:items-center gap-3"
                  >
                    {/* Reorder Arrows */}
                    <div className="flex md:flex-col items-center gap-1 shrink-0">
                      <button
                        type="button"
                        disabled={idx === 0}
                        onClick={() => handleMoveGalleryImage(idx, 'up')}
                        className="p-1 rounded-md text-slate-400 hover:text-[#1E3A5F] hover:bg-slate-200 disabled:opacity-30 cursor-pointer"
                        title="Move photo up"
                      >
                        <ArrowUp className="w-3.5 h-3.5" />
                      </button>
                      <span className="text-[10px] font-mono font-bold text-slate-400 px-1">
                        #{idx + 1}
                      </span>
                      <button
                        type="button"
                        disabled={idx === (formData.galleryImages?.length || 0) - 1}
                        onClick={() => handleMoveGalleryImage(idx, 'down')}
                        className="p-1 rounded-md text-slate-400 hover:text-[#1E3A5F] hover:bg-slate-200 disabled:opacity-30 cursor-pointer"
                        title="Move photo down"
                      >
                        <ArrowDown className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    {/* Image Preview Thumbnail */}
                    <div className="w-24 h-16 rounded-xl overflow-hidden bg-slate-200 border border-slate-300 shrink-0 shadow-xs flex items-center justify-center">
                      {img.url ? (
                        <img
                          src={img.url}
                          alt={img.altText || 'Gallery item'}
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            (e.target as HTMLElement).style.display = 'none';
                          }}
                        />
                      ) : (
                        <ImageIcon className="w-5 h-5 text-slate-400" />
                      )}
                    </div>

                    {/* Image Fields: URL, Caption, Alt Text */}
                    <div className="flex-1 grid grid-cols-1 sm:grid-cols-3 gap-2 w-full">
                      <div className="sm:col-span-3">
                        <label className="block text-[10px] font-bold text-slate-500 mb-0.5">
                          Image URL
                        </label>
                        <input
                          type="url"
                          value={img.url}
                          onChange={(e) => handleUpdateGalleryImage(idx, 'url', e.target.value)}
                          placeholder="https://..."
                          className="w-full px-2.5 py-1.5 rounded-lg border border-[#BCD5E6] bg-white text-[#1E3A5F] font-mono text-xs focus:border-[#0EA5E9] focus:outline-hidden"
                        />
                      </div>
                      <div className="sm:col-span-2">
                        <label className="block text-[10px] font-bold text-slate-500 mb-0.5">
                          Caption / Highlight Detail
                        </label>
                        <input
                          type="text"
                          value={img.caption || ''}
                          onChange={(e) => handleUpdateGalleryImage(idx, 'caption', e.target.value)}
                          placeholder="e.g. Countertop & basin matrix detail view"
                          className="w-full px-2.5 py-1.5 rounded-lg border border-[#BCD5E6] bg-white text-[#1E3A5F] text-xs focus:border-[#0EA5E9] focus:outline-hidden"
                        />
                      </div>
                      <div>
                        <label className="block text-[10px] font-bold text-slate-500 mb-0.5">
                          Alt Text Tag
                        </label>
                        <input
                          type="text"
                          value={img.altText || ''}
                          onChange={(e) => handleUpdateGalleryImage(idx, 'altText', e.target.value)}
                          placeholder="e.g. Vanity Hardware"
                          className="w-full px-2.5 py-1.5 rounded-lg border border-[#BCD5E6] bg-white text-[#1E3A5F] text-xs focus:border-[#0EA5E9] focus:outline-hidden"
                        />
                      </div>
                    </div>

                    {/* Delete Gallery Image */}
                    <button
                      type="button"
                      onClick={() => handleRemoveGalleryImage(idx)}
                      className="p-2 rounded-xl text-slate-400 hover:text-red-600 hover:bg-red-50 transition-colors self-end md:self-center cursor-pointer"
                      title="Remove image"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}

                {(!formData.galleryImages || formData.galleryImages.length === 0) && (
                  <div className="p-8 rounded-2xl border-2 border-dashed border-[#BCD5E6] text-center space-y-2">
                    <ImageIcon className="w-8 h-8 text-slate-300 mx-auto" />
                    <p className="text-slate-500 font-medium">No additional gallery photos added yet.</p>
                    <button
                      type="button"
                      onClick={handleAddGalleryImage}
                      className="px-4 py-2 rounded-xl bg-white hover:bg-slate-50 border border-[#BCD5E6] text-[#0EA5E9] font-bold text-xs cursor-pointer"
                    >
                      + Add First Gallery Photo
                    </button>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* TAB 4: PLATFORM & TOOL TAGS */}
          {activeTab === 'tags' && (
            <div className="space-y-4 animate-fade-in">
              <div>
                <h3 className="font-bold text-[#1E3A5F]">Platform & Tool Tags (Pills)</h3>
                <p className="text-[11px] text-slate-500">
                  Tag the operational stack used for this project (e.g. Shopify Plus, Home Depot US, TikTok Shop, FBT Logistics).
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
                  className="flex-1 px-3.5 py-2 rounded-xl border border-[#BCD5E6] bg-white text-[#1E3A5F] focus:border-[#0EA5E9] focus:outline-hidden"
                />
                <button
                  type="button"
                  onClick={() => handleAddTag()}
                  className="px-4 py-2 rounded-xl bg-[#0EA5E9] hover:bg-[#0284C7] text-white font-bold transition-colors cursor-pointer"
                >
                  Add Tag
                </button>
              </div>

              {/* Active Tags Pills */}
              <div>
                <label className="block text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-2">
                  Active Tags ({formData.tags?.length || 0})
                </label>
                <div className="flex flex-wrap gap-2">
                  {(formData.tags || []).map((t) => (
                    <span
                      key={t}
                      className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#EFF6FB] border border-[#BCD5E6] text-[#1E3A5F] font-bold text-xs shadow-2xs"
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
                  {(!formData.tags || formData.tags.length === 0) && (
                    <span className="text-slate-400 italic">No tags selected.</span>
                  )}
                </div>
              </div>

              {/* Suggested Quick Add Chips */}
              <div className="pt-3 border-t border-slate-100">
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
                            : 'bg-white hover:bg-[#EFF6FB] text-slate-600 border-[#BCD5E6] hover:text-[#0EA5E9]'
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
                <h3 className="font-bold text-[#1E3A5F]">External Links & Action Button</h3>
                <p className="text-[11px] text-slate-500">
                  Configure live storefront destinations, architecture documentation links, and custom button labels.
                </p>
              </div>

              <div>
                <label className="block font-bold text-[#1E3A5F] mb-1">
                  Live Storefront URL
                </label>
                <div className="flex items-center gap-2">
                  <ExternalLink className="w-4 h-4 text-slate-400" />
                  <input
                    type="url"
                    value={formData.url || ''}
                    onChange={(e) => handleFieldChange('url', e.target.value)}
                    placeholder="https://willowbathandvanity.com/"
                    className="flex-1 px-3.5 py-2 rounded-xl border border-[#BCD5E6] bg-white text-[#1E3A5F] focus:border-[#0EA5E9] focus:outline-hidden"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-[#1E3A5F] mb-1">
                  Case Study / Documentation Link (Optional)
                </label>
                <div className="flex items-center gap-2">
                  <Link2 className="w-4 h-4 text-slate-400" />
                  <input
                    type="url"
                    value={formData.caseStudyUrl || ''}
                    onChange={(e) => handleFieldChange('caseStudyUrl', e.target.value)}
                    placeholder="https://notion.so/... or portfolio PDF link"
                    className="flex-1 px-3.5 py-2 rounded-xl border border-[#BCD5E6] bg-white text-[#1E3A5F] focus:border-[#0EA5E9] focus:outline-hidden"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-[#1E3A5F] mb-1">
                  Action Button Label
                </label>
                <input
                  type="text"
                  value={formData.actionLabel || ''}
                  onChange={(e) => handleFieldChange('actionLabel', e.target.value)}
                  placeholder="e.g. View Architecture → or Visit Storefront ↗"
                  className="w-full px-3.5 py-2 rounded-xl border border-[#BCD5E6] bg-white text-[#1E3A5F] font-semibold focus:border-[#0EA5E9] focus:outline-hidden"
                />
              </div>
            </div>
          )}

          {/* Modal Footer */}
          <div className="pt-4 border-t border-[#BCD5E6] flex items-center justify-between">
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2.5 rounded-xl border border-[#BCD5E6] hover:bg-slate-100 font-bold text-slate-600 transition-colors cursor-pointer"
            >
              Cancel
            </button>
            <div className="flex items-center gap-2">
              <button
                type="submit"
                className="px-6 py-2.5 rounded-xl bg-[#0EA5E9] hover:bg-[#0284C7] text-white font-extrabold shadow-md flex items-center gap-2 transition-all cursor-pointer"
              >
                <CheckCircle2 className="w-4 h-4" />
                <span>Save Project Changes</span>
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
