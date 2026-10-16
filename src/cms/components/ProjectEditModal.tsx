import React, { useState, useEffect } from 'react';
import {
  X,
  Plus,
  Trash2,
  MoveUp,
  MoveDown,
  Image as ImageIcon,
  CheckCircle2,
  ExternalLink,
  Layers,
  Sparkles,
  Tag,
  Link,
  FileText,
  Eye,
  Check,
} from 'lucide-react';
import { WorkShowcaseProject, WorkShowcaseGalleryImage } from '../types/schema';

interface ProjectEditModalProps {
  isOpen: boolean;
  project: WorkShowcaseProject | null;
  availableCategories: string[];
  onSave: (project: WorkShowcaseProject) => void;
  onClose: () => void;
}

const PRESET_TAG_SUGGESTIONS = [
  'Shopify Plus',
  'TikTok Shop',
  'Home Depot US',
  'WooCommerce',
  'Amazon Seller Central',
  'Wayfair',
  'Metafields',
  'Variant Matrices',
  'Photoshop Batch',
  'FBT Logistics',
  'SPS Health',
  'Automated Sync',
  'CSV Schemas',
  'DaVinci Resolve',
  'Premiere Pro',
];

export const ProjectEditModal: React.FC<ProjectEditModalProps> = ({
  isOpen,
  project,
  availableCategories,
  onSave,
  onClose,
}) => {
  const [activeTab, setActiveTab] = useState<'basic' | 'content' | 'gallery' | 'tags'>('basic');

  // Form states
  const [id, setId] = useState<string>('');
  const [title, setTitle] = useState<string>('');
  const [client, setClient] = useState<string>('');
  const [category, setCategory] = useState<string>('Catalog Architecture');
  const [customCategory, setCustomCategory] = useState<string>('');
  const [isCustomCategory, setIsCustomCategory] = useState<boolean>(false);
  const [metrics, setMetrics] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [highlights, setHighlights] = useState<string[]>([]);
  const [newHighlight, setNewHighlight] = useState<string>('');
  const [imageUrl, setImageUrl] = useState<string>('');
  const [galleryImages, setGalleryImages] = useState<WorkShowcaseGalleryImage[]>([]);
  const [tags, setTags] = useState<string[]>([]);
  const [newTagInput, setNewTagInput] = useState<string>('');
  const [url, setUrl] = useState<string>('');
  const [caseStudyUrl, setCaseStudyUrl] = useState<string>('');
  const [actionLabel, setActionLabel] = useState<string>('Visit Storefront ↗');

  useEffect(() => {
    if (project) {
      setId(project.id || `proj_${Date.now()}`);
      setTitle(project.title || '');
      setClient(project.client || '');
      const cat = project.category || 'Catalog Architecture';
      setCategory(cat);
      if (!availableCategories.includes(cat) && cat !== 'All') {
        setIsCustomCategory(true);
        setCustomCategory(cat);
      } else {
        setIsCustomCategory(false);
      }
      setMetrics(project.metrics || '');
      setDescription(project.description || '');
      setHighlights(project.highlights || []);
      setImageUrl(project.imageUrl || '');
      setGalleryImages(project.galleryImages || []);
      setTags(project.tags || []);
      setUrl(project.url || '');
      setCaseStudyUrl(project.caseStudyUrl || '');
      setActionLabel(project.actionLabel || 'Visit Storefront ↗');
    } else {
      // New project default
      setId(`proj_${Date.now()}`);
      setTitle('');
      setClient('');
      setCategory(availableCategories.filter((c) => c !== 'All')[0] || 'Catalog Architecture');
      setIsCustomCategory(false);
      setCustomCategory('');
      setMetrics('25K+ Active SKUs');
      setDescription('');
      setHighlights([
        'Architected multi-attribute variant matrix across retail channels.',
        'Eliminated inventory synchronization errors with automated workflows.',
      ]);
      setImageUrl('https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=800&q=80');
      setGalleryImages([
        {
          id: `img_${Date.now()}_1`,
          url: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=800&q=80',
          caption: 'Main Storefront Suite',
          altText: 'Catalog Suite',
        },
      ]);
      setTags(['Shopify Plus', 'Home Depot US', 'Metafields']);
      setUrl('');
      setCaseStudyUrl('');
      setActionLabel('Visit Storefront ↗');
    }
  }, [project, isOpen, availableCategories]);

  if (!isOpen) return null;

  const handleSave = () => {
    const finalCategory = isCustomCategory ? (customCategory.trim() || 'General') : category;
    const finalProject: WorkShowcaseProject = {
      id: id || `proj_${Date.now()}`,
      title: title.trim() || 'Untitled Case Study',
      client: client.trim() || 'Client Showcase',
      category: finalCategory,
      metrics: metrics.trim() || 'Verified Impact',
      description: description.trim(),
      highlights: highlights.filter((h) => h.trim().length > 0),
      imageUrl: imageUrl.trim() || 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=800&q=80',
      galleryImages: galleryImages.filter((g) => g.url.trim().length > 0),
      tags: tags.filter((t) => t.trim().length > 0),
      url: url.trim() || undefined,
      caseStudyUrl: caseStudyUrl.trim() || undefined,
      actionLabel: actionLabel.trim() || 'Visit Storefront ↗',
    };

    onSave(finalProject);
    onClose();
  };

  // Highlights handlers
  const handleAddHighlight = () => {
    if (!newHighlight.trim()) return;
    setHighlights([...highlights, newHighlight.trim()]);
    setNewHighlight('');
  };

  const handleRemoveHighlight = (index: number) => {
    setHighlights(highlights.filter((_, i) => i !== index));
  };

  const handleMoveHighlight = (index: number, direction: 'up' | 'down') => {
    const target = direction === 'up' ? index - 1 : index + 1;
    if (target < 0 || target >= highlights.length) return;
    const copy = [...highlights];
    const [item] = copy.splice(index, 1);
    copy.splice(target, 0, item);
    setHighlights(copy);
  };

  // Gallery handlers
  const handleAddGalleryImage = () => {
    const newImg: WorkShowcaseGalleryImage = {
      id: `img_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`,
      url: '',
      caption: '',
      altText: '',
    };
    setGalleryImages([...galleryImages, newImg]);
  };

  const handleUpdateGalleryImage = (index: number, field: keyof WorkShowcaseGalleryImage, value: string) => {
    const copy = [...galleryImages];
    copy[index] = { ...copy[index], [field]: value };
    setGalleryImages(copy);
  };

  const handleRemoveGalleryImage = (index: number) => {
    setGalleryImages(galleryImages.filter((_, i) => i !== index));
  };

  const handleMoveGalleryImage = (index: number, direction: 'up' | 'down') => {
    const target = direction === 'up' ? index - 1 : index + 1;
    if (target < 0 || target >= galleryImages.length) return;
    const copy = [...galleryImages];
    const [item] = copy.splice(index, 1);
    copy.splice(target, 0, item);
    setGalleryImages(copy);
  };

  // Tag handlers
  const handleAddTag = (tagToAdd?: string) => {
    const t = (tagToAdd || newTagInput).trim();
    if (!t) return;
    if (!tags.includes(t)) {
      setTags([...tags, t]);
    }
    if (!tagToAdd) setNewTagInput('');
  };

  const handleRemoveTag = (tagToRemove: string) => {
    setTags(tags.filter((t) => t !== tagToRemove));
  };

  return (
    <div className="fixed inset-0 z-50 bg-[#1E3A5F]/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-5 select-none font-inter animate-fade-in">
      <div className="w-full max-w-4xl bg-white rounded-2xl border-2 border-[#BCD5E6] shadow-2xl overflow-hidden flex flex-col max-h-[92vh] animate-fade-up">
        {/* Header */}
        <div className="px-6 py-4 bg-[#F4F8FB] border-b border-[#BCD5E6] flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-[#EFF6FB] text-[#0EA5E9] border border-[#BCD5E6]">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-urbanist font-extrabold text-lg text-[#1E3A5F]">
                  {project ? 'Edit Case Study Project' : 'Create New Case Study Project'}
                </h3>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-[#EFF6FB] text-[#0EA5E9] border border-[#BCD5E6]">
                  {isCustomCategory ? customCategory || 'Custom' : category}
                </span>
              </div>
              <p className="text-xs text-slate-500">
                Configure details, metrics, multiple gallery photos, and platform tags.
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-[#1E3A5F] hover:bg-slate-100 rounded-lg transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="px-6 bg-white border-b border-[#BCD5E6]/70 flex items-center gap-2 overflow-x-auto shrink-0 pt-2 text-xs font-bold">
          <button
            type="button"
            onClick={() => setActiveTab('basic')}
            className={`px-3.5 py-2 border-b-2 transition-all cursor-pointer flex items-center gap-1.5 ${
              activeTab === 'basic'
                ? 'border-[#0EA5E9] text-[#0EA5E9]'
                : 'border-transparent text-slate-500 hover:text-[#1E3A5F]'
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            <span>Basic Info & Links</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('content')}
            className={`px-3.5 py-2 border-b-2 transition-all cursor-pointer flex items-center gap-1.5 ${
              activeTab === 'content'
                ? 'border-[#0EA5E9] text-[#0EA5E9]'
                : 'border-transparent text-slate-500 hover:text-[#1E3A5F]'
            }`}
          >
            <FileText className="w-3.5 h-3.5" />
            <span>Description & Bullets ({highlights.length})</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('gallery')}
            className={`px-3.5 py-2 border-b-2 transition-all cursor-pointer flex items-center gap-1.5 ${
              activeTab === 'gallery'
                ? 'border-[#0EA5E9] text-[#0EA5E9]'
                : 'border-transparent text-slate-500 hover:text-[#1E3A5F]'
            }`}
          >
            <ImageIcon className="w-3.5 h-3.5" />
            <span>Multi-Photo Gallery ({galleryImages.length})</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('tags')}
            className={`px-3.5 py-2 border-b-2 transition-all cursor-pointer flex items-center gap-1.5 ${
              activeTab === 'tags'
                ? 'border-[#0EA5E9] text-[#0EA5E9]'
                : 'border-transparent text-slate-500 hover:text-[#1E3A5F]'
            }`}
          >
            <Tag className="w-3.5 h-3.5" />
            <span>Platform & Tool Tags ({tags.length})</span>
          </button>
        </div>

        {/* Modal Body / Tab Contents */}
        <div className="flex-1 overflow-y-auto p-6 space-y-5 text-xs text-[#1E3A5F]">
          {/* TAB 1: BASIC INFO & LINKS */}
          {activeTab === 'basic' && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block font-bold text-[#1E3A5F] mb-1">
                    Project Title <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="e.g. Willow Bath & Vanity Inc."
                    className="w-full px-3 py-2 rounded-xl border border-[#BCD5E6] bg-white text-[#1E3A5F] font-bold focus:outline-[#0EA5E9]"
                  />
                </div>

                <div>
                  <label className="block font-bold text-[#1E3A5F] mb-1">
                    Subtitle / Client Niche
                  </label>
                  <input
                    type="text"
                    value={client}
                    onChange={(e) => setClient(e.target.value)}
                    placeholder="e.g. Luxury Bathroom Vanities & Multi-Channel Ops"
                    className="w-full px-3 py-2 rounded-xl border border-[#BCD5E6] bg-white text-[#1E3A5F] focus:outline-[#0EA5E9]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block font-bold text-[#1E3A5F] mb-1">
                    Category Filter
                  </label>
                  {!isCustomCategory ? (
                    <div className="flex gap-2">
                      <select
                        value={category}
                        onChange={(e) => {
                          if (e.target.value === '__custom__') {
                            setIsCustomCategory(true);
                          } else {
                            setCategory(e.target.value);
                          }
                        }}
                        className="flex-1 px-3 py-2 rounded-xl border border-[#BCD5E6] bg-white text-[#1E3A5F] font-semibold"
                      >
                        {availableCategories
                          .filter((c) => c !== 'All')
                          .map((cat) => (
                            <option key={cat} value={cat}>
                              {cat}
                            </option>
                          ))}
                        <option value="__custom__">+ Enter Custom Category...</option>
                      </select>
                    </div>
                  ) : (
                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={customCategory}
                        onChange={(e) => setCustomCategory(e.target.value)}
                        placeholder="Type custom category name..."
                        className="flex-1 px-3 py-2 rounded-xl border border-[#BCD5E6] bg-white text-[#1E3A5F] font-semibold"
                      />
                      <button
                        type="button"
                        onClick={() => setIsCustomCategory(false)}
                        className="px-3 py-1 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-600 font-bold"
                      >
                        Reset
                      </button>
                    </div>
                  )}
                </div>

                <div>
                  <label className="block font-bold text-[#1E3A5F] mb-1">
                    Highlight Metric Badge (e.g. 25K+ Active SKUs)
                  </label>
                  <input
                    type="text"
                    value={metrics}
                    onChange={(e) => setMetrics(e.target.value)}
                    placeholder="e.g. 25K+ Active SKUs, 4.8★ SPS Score"
                    className="w-full px-3 py-2 rounded-xl border border-[#BCD5E6] bg-white text-[#1E3A5F] font-bold text-[#0EA5E9] focus:outline-[#0EA5E9]"
                  />
                </div>
              </div>

              {/* Links & CTA */}
              <div className="p-4 rounded-xl bg-[#EFF6FB]/60 border border-[#BCD5E6] space-y-3">
                <div className="flex items-center gap-2 font-bold text-[#1E3A5F]">
                  <Link className="w-4 h-4 text-[#0EA5E9]" />
                  <span>External Links & Action Button</span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  <div>
                    <label className="block font-semibold text-slate-600 mb-1">
                      Live Storefront URL
                    </label>
                    <input
                      type="text"
                      value={url}
                      onChange={(e) => setUrl(e.target.value)}
                      placeholder="https://willowbathandvanity.com/"
                      className="w-full px-3 py-1.5 rounded-lg border border-[#BCD5E6] bg-white text-[#1E3A5F]"
                    />
                  </div>

                  <div>
                    <label className="block font-semibold text-slate-600 mb-1">
                      Case Study / Document Link
                    </label>
                    <input
                      type="text"
                      value={caseStudyUrl}
                      onChange={(e) => setCaseStudyUrl(e.target.value)}
                      placeholder="https://..."
                      className="w-full px-3 py-1.5 rounded-lg border border-[#BCD5E6] bg-white text-[#1E3A5F]"
                    />
                  </div>

                  <div>
                    <label className="block font-semibold text-slate-600 mb-1">
                      Action Button Label
                    </label>
                    <input
                      type="text"
                      value={actionLabel}
                      onChange={(e) => setActionLabel(e.target.value)}
                      placeholder="Visit Storefront ↗"
                      className="w-full px-3 py-1.5 rounded-lg border border-[#BCD5E6] bg-white text-[#1E3A5F] font-bold"
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: DESCRIPTION & ACHIEVEMENTS */}
          {activeTab === 'content' && (
            <div className="space-y-4">
              <div>
                <label className="block font-bold text-[#1E3A5F] mb-1">
                  Summary / Main Description
                </label>
                <textarea
                  rows={4}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Explain the background, challenge, architecture implemented, and operational scale achieved..."
                  className="w-full p-3 rounded-xl border border-[#BCD5E6] bg-white text-[#1E3A5F] leading-relaxed focus:outline-[#0EA5E9]"
                />
              </div>

              {/* Dynamic Achievements List */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 font-bold text-[#1E3A5F]">
                    <CheckCircle2 className="w-4 h-4 text-[#0EA5E9]" />
                    <span>Key Achievements & Bullet Points ({highlights.length})</span>
                  </div>
                </div>

                {/* Add new bullet */}
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={newHighlight}
                    onChange={(e) => setNewHighlight(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        e.preventDefault();
                        handleAddHighlight();
                      }
                    }}
                    placeholder="Type key achievement and press Enter or click Add..."
                    className="flex-1 px-3 py-2 rounded-xl border border-[#BCD5E6] bg-white text-[#1E3A5F]"
                  />
                  <button
                    type="button"
                    onClick={handleAddHighlight}
                    className="px-4 py-2 rounded-xl bg-[#1E3A5F] hover:bg-[#2D5D86] text-white font-bold flex items-center gap-1.5 cursor-pointer shadow-xs"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Add Bullet</span>
                  </button>
                </div>

                {/* List of bullets */}
                <div className="space-y-2">
                  {highlights.map((bullet, idx) => (
                    <div
                      key={idx}
                      className="p-3 rounded-xl border border-[#BCD5E6] bg-[#F8FAFC] flex items-center justify-between gap-3 group hover:border-[#0EA5E9] transition-all"
                    >
                      <div className="flex items-start gap-2.5 flex-1">
                        <span className="w-5 h-5 rounded-full bg-[#E0F2FE] text-[#0369A1] font-bold flex items-center justify-center text-[10px] shrink-0 mt-0.5">
                          {idx + 1}
                        </span>
                        <input
                          type="text"
                          value={bullet}
                          onChange={(e) => {
                            const copy = [...highlights];
                            copy[idx] = e.target.value;
                            setHighlights(copy);
                          }}
                          className="flex-1 bg-transparent border-b border-transparent hover:border-slate-300 focus:border-[#0EA5E9] focus:outline-hidden text-xs text-[#1E3A5F]"
                        />
                      </div>

                      <div className="flex items-center gap-1 shrink-0">
                        <button
                          type="button"
                          onClick={() => handleMoveHighlight(idx, 'up')}
                          disabled={idx === 0}
                          className="p-1 text-slate-400 hover:text-[#1E3A5F] disabled:opacity-20 cursor-pointer"
                        >
                          <MoveUp className="w-3.5 h-3.5" />
                        </button>
                        <button
                          type="button"
                          onClick={() => handleMoveHighlight(idx, 'down')}
                          disabled={idx === highlights.length - 1}
                          className="p-1 text-slate-400 hover:text-[#1E3A5F] disabled:opacity-20 cursor-pointer"
                        >
                          <MoveDown className="w-3.5 h-3.5" />
                        </button>
                        <button
                          type="button"
                          onClick={() => handleRemoveHighlight(idx)}
                          className="p-1 text-slate-400 hover:text-red-600 cursor-pointer"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  ))}
                  {highlights.length === 0 && (
                    <p className="text-slate-400 italic text-center py-3">
                      No achievement bullets added yet.
                    </p>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: MULTI-PHOTO & MEDIA GALLERY */}
          {activeTab === 'gallery' && (
            <div className="space-y-5">
              {/* Primary Thumbnail */}
              <div className="p-4 rounded-xl border border-[#BCD5E6] bg-[#F8FAFC] space-y-2">
                <label className="block font-bold text-[#1E3A5F]">
                  Primary Card Thumbnail Image URL
                </label>
                <div className="flex flex-col sm:flex-row items-center gap-4">
                  <div className="w-28 h-20 rounded-xl overflow-hidden bg-slate-100 border border-[#BCD5E6] shrink-0 flex items-center justify-center">
                    {imageUrl ? (
                      <img
                        src={imageUrl}
                        alt="Preview"
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          (e.target as any).src =
                            'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=400&q=80';
                        }}
                      />
                    ) : (
                      <ImageIcon className="w-6 h-6 text-slate-400" />
                    )}
                  </div>
                  <div className="flex-1 w-full space-y-1">
                    <input
                      type="text"
                      value={imageUrl}
                      onChange={(e) => setImageUrl(e.target.value)}
                      placeholder="https://images.unsplash.com/photo-..."
                      className="w-full px-3 py-2 rounded-xl border border-[#BCD5E6] bg-white text-[#1E3A5F] font-mono text-[11px]"
                    />
                    <p className="text-[10px] text-slate-400">
                      Displayed on the main work cards and grid previews.
                    </p>
                  </div>
                </div>
              </div>

              {/* Gallery Images List */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-bold text-[#1E3A5F] flex items-center gap-2">
                      <ImageIcon className="w-4 h-4 text-[#0EA5E9]" />
                      <span>Multiple Photo Gallery ({galleryImages.length} Photos)</span>
                    </h4>
                    <p className="text-[11px] text-slate-500">
                      Add showroom photos, dimensional cutouts, and backend screenshots.
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={handleAddGalleryImage}
                    className="px-3.5 py-1.5 rounded-xl bg-[#0EA5E9] hover:bg-[#0284C7] text-white font-bold flex items-center gap-1.5 cursor-pointer shadow-xs"
                  >
                    <Plus className="w-4 h-4" />
                    <span>+ Add Photo URL</span>
                  </button>
                </div>

                <div className="space-y-3">
                  {galleryImages.map((img, idx) => (
                    <div
                      key={img.id || idx}
                      className="p-3.5 rounded-xl border border-[#BCD5E6] bg-white shadow-2xs space-y-2"
                    >
                      <div className="flex items-center justify-between pb-1 border-b border-slate-100">
                        <span className="font-bold text-[#1E3A5F] text-[11px]">
                          Photo #{idx + 1}
                        </span>
                        <div className="flex items-center gap-1">
                          <button
                            type="button"
                            onClick={() => handleMoveGalleryImage(idx, 'up')}
                            disabled={idx === 0}
                            className="p-1 text-slate-400 hover:text-[#1E3A5F] disabled:opacity-20 cursor-pointer"
                          >
                            <MoveUp className="w-3.5 h-3.5" />
                          </button>
                          <button
                            type="button"
                            onClick={() => handleMoveGalleryImage(idx, 'down')}
                            disabled={idx === galleryImages.length - 1}
                            className="p-1 text-slate-400 hover:text-[#1E3A5F] disabled:opacity-20 cursor-pointer"
                          >
                            <MoveDown className="w-3.5 h-3.5" />
                          </button>
                          <button
                            type="button"
                            onClick={() => handleRemoveGalleryImage(idx)}
                            className="p-1 text-slate-400 hover:text-red-600 cursor-pointer"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>

                      <div className="flex flex-col sm:flex-row items-center gap-3">
                        <div className="w-20 h-16 rounded-lg overflow-hidden bg-slate-100 border border-[#BCD5E6] shrink-0 flex items-center justify-center">
                          {img.url ? (
                            <img
                              src={img.url}
                              alt={img.altText || `Gallery ${idx + 1}`}
                              className="w-full h-full object-cover"
                              onError={(e) => {
                                (e.target as any).src =
                                  'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=300&q=80';
                              }}
                            />
                          ) : (
                            <ImageIcon className="w-5 h-5 text-slate-400" />
                          )}
                        </div>

                        <div className="flex-1 w-full space-y-2">
                          <input
                            type="text"
                            value={img.url}
                            onChange={(e) =>
                              handleUpdateGalleryImage(idx, 'url', e.target.value)
                            }
                            placeholder="Image URL (https://...)"
                            className="w-full px-2.5 py-1.5 rounded-lg border border-[#BCD5E6] bg-slate-50 font-mono text-[11px]"
                          />
                          <div className="grid grid-cols-2 gap-2">
                            <input
                              type="text"
                              value={img.caption || ''}
                              onChange={(e) =>
                                handleUpdateGalleryImage(idx, 'caption', e.target.value)
                              }
                              placeholder="Photo caption (e.g. Master suite vanity)"
                              className="w-full px-2.5 py-1 rounded-lg border border-[#BCD5E6]"
                            />
                            <input
                              type="text"
                              value={img.altText || ''}
                              onChange={(e) =>
                                handleUpdateGalleryImage(idx, 'altText', e.target.value)
                              }
                              placeholder="Alt text"
                              className="w-full px-2.5 py-1 rounded-lg border border-[#BCD5E6]"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}

                  {galleryImages.length === 0 && (
                    <div className="text-center py-6 border-2 border-dashed border-[#BCD5E6] rounded-xl bg-slate-50">
                      <ImageIcon className="w-8 h-8 text-slate-300 mx-auto mb-1" />
                      <p className="text-slate-500 font-semibold">No gallery photos yet</p>
                      <button
                        type="button"
                        onClick={handleAddGalleryImage}
                        className="mt-2 text-[#0EA5E9] font-bold hover:underline cursor-pointer"
                      >
                        + Add your first gallery image
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* TAB 4: PLATFORMS & TOOL TAGS */}
          {activeTab === 'tags' && (
            <div className="space-y-4">
              <div>
                <label className="block font-bold text-[#1E3A5F] mb-1">
                  Assigned Project Tags ({tags.length})
                </label>
                <div className="p-3.5 rounded-xl border border-[#BCD5E6] bg-slate-50 flex flex-wrap gap-1.5 min-h-[50px] items-center">
                  {tags.map((t) => (
                    <span
                      key={t}
                      className="px-2.5 py-1 rounded-lg bg-white border border-[#BCD5E6] text-xs font-bold text-[#1E3A5F] shadow-2xs flex items-center gap-1.5"
                    >
                      <span>{t}</span>
                      <button
                        type="button"
                        onClick={() => handleRemoveTag(t)}
                        className="text-slate-400 hover:text-red-500 cursor-pointer"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </span>
                  ))}
                  {tags.length === 0 && (
                    <span className="text-slate-400 italic">No tags selected.</span>
                  )}
                </div>
              </div>

              {/* Add custom tag */}
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
                  placeholder="Type a new tag (e.g. Klaviyo, Wayfair) and press Enter..."
                  className="flex-1 px-3 py-2 rounded-xl border border-[#BCD5E6] bg-white text-[#1E3A5F]"
                />
                <button
                  type="button"
                  onClick={() => handleAddTag()}
                  className="px-4 py-2 rounded-xl bg-[#1E3A5F] text-white font-bold flex items-center gap-1 cursor-pointer"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add Tag</span>
                </button>
              </div>

              {/* Quick Preset Tag Suggestions */}
              <div>
                <span className="block font-bold text-slate-500 text-[11px] mb-2">
                  Quick Add Presets:
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {PRESET_TAG_SUGGESTIONS.map((preset) => {
                    const isAdded = tags.includes(preset);
                    return (
                      <button
                        key={preset}
                        type="button"
                        onClick={() => {
                          if (isAdded) {
                            handleRemoveTag(preset);
                          } else {
                            handleAddTag(preset);
                          }
                        }}
                        className={`px-2.5 py-1 rounded-lg text-[11px] font-semibold transition-all cursor-pointer flex items-center gap-1 ${
                          isAdded
                            ? 'bg-[#E0F2FE] text-[#0284C7] border border-[#BAE6FD]'
                            : 'bg-white hover:bg-[#EFF6FB] text-slate-600 border border-[#BCD5E6]'
                        }`}
                      >
                        {isAdded ? <Check className="w-3 h-3" /> : <Plus className="w-3 h-3" />}
                        <span>{preset}</span>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer Actions */}
        <div className="px-6 py-4 bg-[#F4F8FB] border-t border-[#BCD5E6] flex items-center justify-between shrink-0">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-white hover:bg-slate-100 border border-[#BCD5E6] font-bold text-xs text-slate-600 transition-colors cursor-pointer"
          >
            Cancel
          </button>

          <button
            type="button"
            onClick={handleSave}
            className="px-6 py-2 rounded-xl bg-[#0EA5E9] hover:bg-[#0284C7] text-white font-extrabold text-xs transition-all shadow-md cursor-pointer flex items-center gap-2"
          >
            <CheckCircle2 className="w-4 h-4" />
            <span>Save Project Changes</span>
          </button>
        </div>
      </div>
    </div>
  );
};
