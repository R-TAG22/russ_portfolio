import React, { useState, useRef } from 'react';
import {
  ArrowLeft,
  Sparkles,
  Trash2,
  Copy,
  ArrowUp,
  ArrowDown,
  Upload,
  Plus,
  Image as ImageIcon,
  Tag,
  ExternalLink,
  CheckCircle2,
  X,
  Hexagon,
  ChevronDown,
  Layers,
  FileText,
  Link2,
} from 'lucide-react';
import { WorkShowcaseProject, WorkShowcaseGalleryImage } from '../types/schema';

interface WorkCardLeftEditorProps {
  project: WorkShowcaseProject;
  allProjects: WorkShowcaseProject[];
  projectIndex: number;
  filters: string[];
  onUpdateProject: (updated: WorkShowcaseProject) => void;
  onSelectProjectIndex: (index: number) => void;
  onAddProject: () => void;
  onDuplicateProject: () => void;
  onDeleteProject: () => void;
  onMoveProject: (direction: 'up' | 'down') => void;
  onBackToStructure: () => void;
}

export const WorkCardLeftEditor: React.FC<WorkCardLeftEditorProps> = ({
  project,
  allProjects,
  projectIndex,
  filters,
  onUpdateProject,
  onSelectProjectIndex,
  onAddProject,
  onDuplicateProject,
  onDeleteProject,
  onMoveProject,
  onBackToStructure,
}) => {
  const [activeTab, setActiveTab] = useState<'content' | 'gallery' | 'tags' | 'links'>('content');
  const [newTagInput, setNewTagInput] = useState('');
  const [newBulletInput, setNewBulletInput] = useState('');
  const [isDragging, setIsDragging] = useState(false);
  const [isDraggingPrimary, setIsDraggingPrimary] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState(false);
  const primaryFileInputRef = useRef<HTMLInputElement>(null);
  const galleryFileInputRef = useRef<HTMLInputElement>(null);

  // Field change helper
  const handleFieldChange = <K extends keyof WorkShowcaseProject>(
    field: K,
    value: WorkShowcaseProject[K]
  ) => {
    onUpdateProject({
      ...project,
      [field]: value,
    });
  };

  // Primary image upload & drop
  const handlePrimaryUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
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

  // Gallery multi-file upload
  const handleGalleryUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []) as File[];
    if (!files.length) return;

    files.forEach((file: File) => {
      const reader = new FileReader();
      reader.onload = () => {
        if (typeof reader.result === 'string') {
          const newImg: WorkShowcaseGalleryImage = {
            id: `img_${Date.now()}_${Math.random().toString(36).substr(2, 4)}`,
            url: reader.result,
            caption: `${file.name.replace(/\.[^/.]+$/, '')} View`,
            altText: project.title || 'Proof Photo',
          };
          onUpdateProject({
            ...project,
            galleryImages: [...(project.galleryImages || []), newImg],
          });
        }
      };
      reader.readAsDataURL(file);
    });
  };

  // Add gallery image by URL
  const handleAddGalleryImageUrl = () => {
    const newImg: WorkShowcaseGalleryImage = {
      id: `img_${Date.now()}_${Math.random().toString(36).substr(2, 4)}`,
      url: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=80',
      caption: 'Storefront Catalog Architecture View',
      altText: project.title || 'Project image',
    };
    onUpdateProject({
      ...project,
      galleryImages: [...(project.galleryImages || []), newImg],
    });
  };

  // Delete gallery image
  const handleDeleteGalleryImage = (imgId: string) => {
    const updated = (project.galleryImages || []).filter((img) => img.id !== imgId);
    onUpdateProject({
      ...project,
      galleryImages: updated,
    });
  };

  // Update gallery image caption or url
  const handleUpdateGalleryImage = (
    imgId: string,
    field: keyof WorkShowcaseGalleryImage,
    value: string
  ) => {
    const updated = (project.galleryImages || []).map((img) => {
      if (img.id !== imgId) return img;
      return { ...img, [field]: value };
    });
    onUpdateProject({
      ...project,
      galleryImages: updated,
    });
  };

  // Bullets handlers
  const handleAddBullet = () => {
    if (!newBulletInput.trim()) return;
    const current = project.highlights || [];
    onUpdateProject({
      ...project,
      highlights: [...current, newBulletInput.trim()],
    });
    setNewBulletInput('');
  };

  const handleUpdateBullet = (index: number, val: string) => {
    const current = [...(project.highlights || [])];
    current[index] = val;
    onUpdateProject({
      ...project,
      highlights: current,
    });
  };

  const handleDeleteBullet = (index: number) => {
    const current = (project.highlights || []).filter((_, i) => i !== index);
    onUpdateProject({
      ...project,
      highlights: current,
    });
  };

  // Tags handlers
  const handleAddTag = (tagToAdd?: string) => {
    const tag = (tagToAdd || newTagInput).trim();
    if (!tag) return;
    const current = project.tags || [];
    if (!current.includes(tag)) {
      onUpdateProject({
        ...project,
        tags: [...current, tag],
      });
    }
    if (!tagToAdd) setNewTagInput('');
  };

  const handleRemoveTag = (tagToRemove: string) => {
    const current = (project.tags || []).filter((t) => t !== tagToRemove);
    onUpdateProject({
      ...project,
      tags: current,
    });
  };

  const tagSuggestions = [
    'Shopify Plus',
    'Home Depot US',
    'Photoshop Batch',
    'Metafields',
    'FBT Logistics',
    'TikTok Shop',
    'WooCommerce',
    'Variant Matrices',
    'Recharge API',
    'Tailwind CSS',
  ];

  return (
    <div className="flex flex-col h-full bg-[#F8FAFC] select-none font-inter text-[#1E3A5F]">
      {/* Top Header / Breadcrumb navigation */}
      <div className="p-3 bg-white border-b border-[#BCD5E6] flex flex-col gap-2 shrink-0">
        <div className="flex items-center justify-between">
          <button
            type="button"
            onClick={onBackToStructure}
            className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-bold text-slate-600 hover:text-[#0EA5E9] hover:bg-slate-100 transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to Block Structure</span>
          </button>

          {/* Quick Add New Card button */}
          <button
            type="button"
            onClick={onAddProject}
            className="px-2.5 py-1 rounded-lg bg-[#143020] hover:bg-[#1E442D] text-white text-[10.5px] font-extrabold flex items-center gap-1 shadow-2xs transition-all cursor-pointer"
          >
            <Plus className="w-3 h-3 text-[#4ADE80]" />
            <span>+ Add Card</span>
          </button>
        </div>

        {/* Card Switcher & Actions */}
        <div className="flex items-center justify-between gap-2 pt-1 border-t border-slate-100">
          <div className="flex items-center gap-2 min-w-0 flex-1">
            <span className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400 shrink-0">
              Editing Card:
            </span>
            <div className="relative flex-1 min-w-0">
              <select
                value={projectIndex}
                onChange={(e) => onSelectProjectIndex(Number(e.target.value))}
                className="w-full pl-2 pr-6 py-1 rounded-lg border border-slate-200 bg-slate-50 font-urbanist font-extrabold text-xs text-[#1E3A5F] truncate cursor-pointer focus:bg-white focus:border-[#0EA5E9]"
              >
                {allProjects.map((p, idx) => (
                  <option key={p.id || idx} value={idx}>
                    #{idx + 1} {p.title || 'Untitled Project'}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Card Management Tools */}
          <div className="flex items-center gap-1 shrink-0">
            <button
              type="button"
              disabled={projectIndex === 0}
              onClick={() => onMoveProject('up')}
              className="p-1 rounded-md text-slate-400 hover:text-slate-800 disabled:opacity-30 cursor-pointer"
              title="Move card up"
            >
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
            <button
              type="button"
              disabled={projectIndex === allProjects.length - 1}
              onClick={() => onMoveProject('down')}
              className="p-1 rounded-md text-slate-400 hover:text-slate-800 disabled:opacity-30 cursor-pointer"
              title="Move card down"
            >
              <ArrowDown className="w-3.5 h-3.5" />
            </button>
            <button
              type="button"
              onClick={onDuplicateProject}
              className="p-1 rounded-md text-slate-400 hover:text-[#0EA5E9] hover:bg-slate-100 transition-colors cursor-pointer"
              title="Duplicate this card"
            >
              <Copy className="w-3.5 h-3.5" />
            </button>
            {confirmDelete ? (
              <div className="flex items-center gap-1 bg-red-50 border border-red-200 px-1.5 py-0.5 rounded-lg animate-fade-in">
                <span className="text-[10px] font-bold text-red-700">Delete?</span>
                <button
                  type="button"
                  onClick={() => {
                    setConfirmDelete(false);
                    onDeleteProject();
                  }}
                  className="px-1.5 py-0.5 rounded bg-red-600 hover:bg-red-700 text-white font-extrabold text-[9.5px] cursor-pointer shadow-2xs"
                >
                  Yes
                </button>
                <button
                  type="button"
                  onClick={() => setConfirmDelete(false)}
                  className="px-1 py-0.5 rounded bg-slate-200 hover:bg-slate-300 text-slate-700 font-bold text-[9.5px] cursor-pointer"
                >
                  No
                </button>
              </div>
            ) : (
              <button
                type="button"
                onClick={() => setConfirmDelete(true)}
                className="p-1 rounded-md text-slate-400 hover:text-red-600 hover:bg-red-50 transition-colors cursor-pointer"
                title="Delete this card"
              >
                <Trash2 className="w-3.5 h-3.5 text-red-500" />
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Editor Tabs Navigation */}
      <div className="px-3 py-1.5 bg-slate-100 border-b border-[#BCD5E6] flex items-center gap-1.5 overflow-x-auto text-[11px] font-bold shrink-0">
        <button
          type="button"
          onClick={() => setActiveTab('content')}
          className={`px-3 py-1 rounded-lg flex items-center gap-1.5 transition-all cursor-pointer ${
            activeTab === 'content'
              ? 'bg-[#143020] text-white shadow-2xs font-extrabold'
              : 'text-slate-600 hover:bg-white'
          }`}
        >
          <FileText className="w-3 h-3" />
          <span>Text & Scope</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('gallery')}
          className={`px-3 py-1 rounded-lg flex items-center gap-1.5 transition-all cursor-pointer ${
            activeTab === 'gallery'
              ? 'bg-[#143020] text-white shadow-2xs font-extrabold'
              : 'text-slate-600 hover:bg-white'
          }`}
        >
          <ImageIcon className="w-3 h-3" />
          <span>Photos ({(project.galleryImages?.length || 0) + 1})</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('tags')}
          className={`px-3 py-1 rounded-lg flex items-center gap-1.5 transition-all cursor-pointer ${
            activeTab === 'tags'
              ? 'bg-[#143020] text-white shadow-2xs font-extrabold'
              : 'text-slate-600 hover:bg-white'
          }`}
        >
          <Tag className="w-3 h-3" />
          <span>Tags ({project.tags?.length || 0})</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('links')}
          className={`px-3 py-1 rounded-lg flex items-center gap-1.5 transition-all cursor-pointer ${
            activeTab === 'links'
              ? 'bg-[#143020] text-white shadow-2xs font-extrabold'
              : 'text-slate-600 hover:bg-white'
          }`}
        >
          <Link2 className="w-3 h-3" />
          <span>Links & CTA</span>
        </button>
      </div>

      {/* Editor Content Area (Scrollable) */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 text-xs">
        {/* ================================================================= */}
        {/* TAB 1: TEXT CONTENT & SCOPE                                      */}
        {/* ================================================================= */}
        {activeTab === 'content' && (
          <div className="space-y-3.5 animate-fade-in">
            {/* Project Title */}
            <div>
              <label className="block font-bold text-slate-800 mb-1">
                Project Title <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={project.title}
                onChange={(e) => handleFieldChange('title', e.target.value)}
                placeholder="e.g. Willow Bath and Vanity Inc."
                className="w-full px-3 py-1.5 rounded-xl border border-slate-300 bg-white font-urbanist font-extrabold text-sm text-[#1E3A5F] focus:border-[#0EA5E9] focus:outline-hidden"
              />
              <span className="text-[10px] text-slate-400">Card headline rendered in bold uppercase.</span>
            </div>

            {/* Subtitle / Niche */}
            <div>
              <label className="block font-bold text-slate-800 mb-1">
                Subtitle / Niche Tagline
              </label>
              <input
                type="text"
                value={project.subtitle || project.client || ''}
                onChange={(e) => {
                  handleFieldChange('subtitle', e.target.value);
                  handleFieldChange('client', e.target.value);
                }}
                placeholder="e.g. Luxury Bathroom Vanities & Multi-Channel Ops"
                className="w-full px-3 py-1.5 rounded-xl border border-slate-300 bg-white font-semibold text-xs text-slate-800 focus:border-[#0EA5E9] focus:outline-hidden"
              />
            </div>

            {/* Category & Badge */}
            <div className="grid grid-cols-2 gap-2.5">
              <div>
                <label className="block font-bold text-slate-800 mb-1">Category</label>
                <select
                  value={project.category}
                  onChange={(e) => handleFieldChange('category', e.target.value)}
                  className="w-full px-2.5 py-1.5 rounded-xl border border-slate-300 bg-white text-xs text-slate-800 focus:border-[#0EA5E9]"
                >
                  {filters.map((f) => (
                    <option key={f} value={f}>
                      {f}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block font-bold text-slate-800 mb-1">Domain Pill</label>
                <div className="flex items-center gap-1">
                  <Hexagon className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                  <input
                    type="text"
                    value={project.domainUrl || ''}
                    onChange={(e) => handleFieldChange('domainUrl', e.target.value)}
                    placeholder="willowbathandvanity.com"
                    className="w-full px-2.5 py-1.5 rounded-xl border border-slate-300 bg-white font-mono text-[11px] text-slate-800"
                  />
                </div>
              </div>
            </div>

            {/* Metric & Vitals */}
            <div className="grid grid-cols-2 gap-2.5">
              <div>
                <label className="block font-bold text-slate-800 mb-1">Metric Badge</label>
                <input
                  type="text"
                  value={project.metrics}
                  onChange={(e) => handleFieldChange('metrics', e.target.value)}
                  placeholder="25,000+ Active SKUs"
                  className="w-full px-2.5 py-1.5 rounded-xl border border-slate-300 bg-white text-emerald-700 font-bold text-xs"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-800 mb-1">Core Vitals Score</label>
                <input
                  type="text"
                  value={project.vitalsScore || ''}
                  onChange={(e) => handleFieldChange('vitalsScore', e.target.value)}
                  placeholder="99/100 Core Vitals"
                  className="w-full px-2.5 py-1.5 rounded-xl border border-slate-300 bg-white font-mono text-[11px] text-slate-800"
                />
              </div>
            </div>

            {/* Description / Summary */}
            <div>
              <label className="block font-bold text-slate-800 mb-1">
                Summary & Architecture Scope
              </label>
              <textarea
                rows={4}
                value={project.description}
                onChange={(e) => handleFieldChange('description', e.target.value)}
                placeholder="Architected 25,000+ variant matrices with nested countertop cutouts, finishes, and custom hardware logic across Shopify, WooCommerce, and Home Depot US with automated inventory flat-files..."
                className="w-full p-3 rounded-xl border border-slate-300 bg-white text-xs text-slate-800 leading-relaxed focus:border-[#0EA5E9] focus:outline-hidden"
              />
            </div>

            {/* Bullet Points / Deliverables */}
            <div className="p-3 rounded-2xl bg-white border border-slate-200 space-y-2.5">
              <div className="flex items-center justify-between">
                <span className="font-bold text-xs text-slate-900">
                  Key Achievements & Deliverables ({project.highlights?.length || 0})
                </span>
              </div>

              {/* Add Bullet */}
              <div className="flex gap-1.5">
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
                  placeholder="Add achievement bullet..."
                  className="flex-1 px-2.5 py-1.5 rounded-lg border border-slate-300 bg-slate-50 text-xs focus:bg-white"
                />
                <button
                  type="button"
                  onClick={handleAddBullet}
                  className="px-3 py-1.5 rounded-lg bg-[#143020] text-white text-xs font-bold hover:bg-[#1E442D] cursor-pointer"
                >
                  + Add
                </button>
              </div>

              {/* Bullet List */}
              <div className="space-y-1.5">
                {(project.highlights || []).map((bullet, bIdx) => (
                  <div
                    key={bIdx}
                    className="p-2 rounded-lg bg-slate-50 border border-slate-200 flex items-start gap-2"
                  >
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#10B981] shrink-0 mt-0.5" />
                    <input
                      type="text"
                      value={bullet}
                      onChange={(e) => handleUpdateBullet(bIdx, e.target.value)}
                      className="flex-1 bg-transparent border-0 text-xs text-slate-800 focus:outline-hidden"
                    />
                    <button
                      type="button"
                      onClick={() => handleDeleteBullet(bIdx)}
                      className="text-slate-400 hover:text-red-500 cursor-pointer"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Danger Zone: Delete Project Card */}
            <div className="p-3.5 rounded-2xl bg-red-50/80 border border-red-200 space-y-2 mt-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <h5 className="font-urbanist font-extrabold text-xs text-red-950 flex items-center gap-1.5">
                    <Trash2 className="w-3.5 h-3.5 text-red-600" />
                    <span>Delete This Work Card</span>
                  </h5>
                  <p className="text-[10px] text-red-700 leading-tight mt-0.5">
                    Permanently removes "{project.title || 'Untitled'}" from the portfolio showcase.
                  </p>
                </div>

                {confirmDelete ? (
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => {
                        setConfirmDelete(false);
                        onDeleteProject();
                      }}
                      className="px-3.5 py-1.5 rounded-xl bg-red-600 hover:bg-red-700 text-white font-extrabold text-xs shadow-xs transition-all cursor-pointer"
                    >
                      Confirm Delete
                    </button>
                    <button
                      type="button"
                      onClick={() => setConfirmDelete(false)}
                      className="px-2.5 py-1.5 rounded-xl bg-slate-200 text-slate-700 font-bold text-xs cursor-pointer"
                    >
                      Cancel
                    </button>
                  </div>
                ) : (
                  <button
                    type="button"
                    onClick={() => setConfirmDelete(true)}
                    className="px-3.5 py-1.5 rounded-xl bg-red-600 hover:bg-red-700 text-white font-bold text-xs flex items-center gap-1.5 shadow-xs transition-all cursor-pointer self-start sm:self-auto"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                    <span>Delete Card</span>
                  </button>
                )}
              </div>
            </div>
          </div>
        )}

        {/* ================================================================= */}
        {/* TAB 2: PHOTOS & MULTI-IMAGE GALLERY                              */}
        {/* ================================================================= */}
        {activeTab === 'gallery' && (
          <div className="space-y-4 animate-fade-in">
            {/* Primary Thumbnail Image with Drag and Drop */}
            <div
              onDragOver={(e) => {
                e.preventDefault();
                setIsDraggingPrimary(true);
              }}
              onDragLeave={() => setIsDraggingPrimary(false)}
              onDrop={handlePrimaryDrop}
              className={`p-3.5 rounded-2xl bg-white border-2 transition-all space-y-2.5 ${
                isDraggingPrimary
                  ? 'border-[#0EA5E9] bg-sky-50/70 ring-2 ring-[#0EA5E9]/30'
                  : 'border-slate-200 hover:border-slate-300'
              }`}
            >
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-bold text-xs text-slate-900 flex items-center gap-1.5">
                    <ImageIcon className="w-3.5 h-3.5 text-[#0EA5E9]" />
                    <span>Primary Card Mockup Photo</span>
                  </h4>
                  <p className="text-[10px] text-slate-400">Drag & drop photo here or upload/browse.</p>
                </div>
                <div className="flex items-center gap-1.5">
                  <label className="px-2.5 py-1 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs flex items-center gap-1 cursor-pointer shadow-2xs transition-colors">
                    <Upload className="w-3 h-3" />
                    <span>Upload Image</span>
                    <input
                      type="file"
                      ref={primaryFileInputRef}
                      accept="image/*"
                      className="hidden"
                      onChange={handlePrimaryUpload}
                    />
                  </label>
                  {project.imageUrl && (
                    <button
                      type="button"
                      onClick={() => handleFieldChange('imageUrl', '')}
                      className="px-2 py-1 rounded-lg bg-red-50 hover:bg-red-100 text-red-600 font-bold text-xs flex items-center gap-1 cursor-pointer transition-colors"
                      title="Delete Primary Photo"
                    >
                      <Trash2 className="w-3 h-3 text-red-500" />
                      <span>Delete</span>
                    </button>
                  )}
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div
                  onClick={() => primaryFileInputRef.current?.click()}
                  className={`w-28 h-20 rounded-xl overflow-hidden border-2 border-dashed shrink-0 flex items-center justify-center cursor-pointer transition-all ${
                    isDraggingPrimary
                      ? 'border-[#0EA5E9] bg-sky-100/70 scale-102'
                      : 'border-slate-300 bg-slate-50 hover:border-[#0EA5E9] hover:bg-slate-100'
                  }`}
                  title="Click or drag image file here"
                >
                  {project.imageUrl ? (
                    <img
                      src={project.imageUrl}
                      alt={project.title}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="flex flex-col items-center justify-center p-2 text-center text-slate-400">
                      <Upload className="w-5 h-5 mb-0.5 text-slate-400" />
                      <span className="text-[9px] font-bold">Drop Image</span>
                    </div>
                  )}
                </div>
                <div className="flex-1 space-y-1">
                  <span className="text-[10px] font-bold text-slate-400 block">Direct Image URL</span>
                  <input
                    type="url"
                    value={project.imageUrl}
                    onChange={(e) => handleFieldChange('imageUrl', e.target.value)}
                    placeholder="https://..."
                    className="w-full px-2.5 py-1.5 rounded-lg border border-slate-300 bg-white font-mono text-[10.5px] text-slate-800 focus:border-[#0EA5E9]"
                  />
                  <span className="text-[9.5px] text-slate-400 block">
                    Tip: Drag & drop any image file directly onto the box.
                  </span>
                </div>
              </div>
            </div>

            {/* Proof of Work Gallery (Multiple Photos) */}
            <div className="p-3 rounded-2xl bg-white border border-slate-200 space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-bold text-xs text-slate-900">
                    Proof of Work Gallery ({project.galleryImages?.length || 0} Photos)
                  </h4>
                  <p className="text-[10px] text-slate-400">
                    Visitors can browse all of these proof images.
                  </p>
                </div>
                <div className="flex items-center gap-1.5">
                  <label className="px-2.5 py-1 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-[10.5px] flex items-center gap-1 cursor-pointer shadow-2xs">
                    <Upload className="w-3 h-3" />
                    <span>Upload</span>
                    <input
                      type="file"
                      ref={galleryFileInputRef}
                      multiple
                      accept="image/*"
                      className="hidden"
                      onChange={handleGalleryUpload}
                    />
                  </label>
                  <button
                    type="button"
                    onClick={handleAddGalleryImageUrl}
                    className="px-2.5 py-1 rounded-lg bg-[#143020] hover:bg-[#1E442D] text-white font-bold text-[10.5px] flex items-center gap-1 cursor-pointer"
                  >
                    <Plus className="w-3 h-3" />
                    <span>Add URL</span>
                  </button>
                </div>
              </div>

              {/* Drag & Drop Upload Zone */}
              <div
                onDragOver={(e) => {
                  e.preventDefault();
                  setIsDragging(true);
                }}
                onDragLeave={() => setIsDragging(false)}
                onDrop={(e) => {
                  e.preventDefault();
                  setIsDragging(false);
                  const files = (Array.from(e.dataTransfer.files || []) as File[]).filter((f: File) =>
                    f.type.startsWith('image/')
                  );
                  if (files.length) {
                    files.forEach((file: File) => {
                      const reader = new FileReader();
                      reader.onload = () => {
                        if (typeof reader.result === 'string') {
                          const newImg: WorkShowcaseGalleryImage = {
                            id: `img_${Date.now()}_${Math.random().toString(36).substr(2, 4)}`,
                            url: reader.result,
                            caption: `${file.name.replace(/\.[^/.]+$/, '')} View`,
                            altText: project.title || 'Proof Photo',
                          };
                          onUpdateProject({
                            ...project,
                            galleryImages: [...(project.galleryImages || []), newImg],
                          });
                        }
                      };
                      reader.readAsDataURL(file);
                    });
                  }
                }}
                className={`p-3 rounded-xl border-2 border-dashed text-center transition-all ${
                  isDragging
                    ? 'border-[#0EA5E9] bg-sky-50 text-[#0284C7]'
                    : 'border-slate-300 hover:border-slate-400 bg-slate-50/50 text-slate-500'
                }`}
              >
                <div className="flex items-center justify-center gap-2 text-xs font-semibold">
                  <Upload className="w-4 h-4 text-[#0EA5E9]" />
                  <span>Drag & Drop proof photos here, or click Upload</span>
                </div>
              </div>

              {/* Gallery Photos List with Delete */}
              <div className="space-y-2">
                {(project.galleryImages || []).length === 0 ? (
                  <div className="p-4 rounded-xl border border-dashed border-slate-200 text-center text-slate-400 text-xs">
                    No additional gallery photos yet. Click <strong>Upload</strong> or <strong>Add URL</strong> to add proof images!
                  </div>
                ) : (
                  (project.galleryImages || []).map((img, iIdx) => (
                    <div
                      key={img.id || iIdx}
                      className="p-2 rounded-xl bg-slate-50 border border-slate-200 flex items-center gap-2.5 group"
                    >
                      {/* Thumbnail */}
                      <div className="w-16 h-12 rounded-lg overflow-hidden bg-slate-200 border border-slate-300 shrink-0">
                        <img
                          src={img.url}
                          alt={img.caption}
                          className="w-full h-full object-cover"
                        />
                      </div>

                      {/* Fields */}
                      <div className="flex-1 min-w-0 space-y-1">
                        <input
                          type="text"
                          value={img.caption}
                          onChange={(e) =>
                            handleUpdateGalleryImage(img.id, 'caption', e.target.value)
                          }
                          placeholder="Caption (e.g. Master Suite Showroom)"
                          className="w-full px-2 py-0.5 rounded border border-slate-200 bg-white text-[11px] font-semibold text-slate-800"
                        />
                        <input
                          type="url"
                          value={img.url}
                          onChange={(e) =>
                            handleUpdateGalleryImage(img.id, 'url', e.target.value)
                          }
                          placeholder="Photo URL"
                          className="w-full px-2 py-0.5 rounded border border-slate-200 bg-white font-mono text-[10px] text-slate-500"
                        />
                      </div>

                      {/* Delete button */}
                      <button
                        type="button"
                        onClick={() => handleDeleteGalleryImage(img.id)}
                        className="p-1.5 rounded-lg text-slate-400 hover:text-red-600 hover:bg-red-50 transition-colors cursor-pointer"
                        title="Delete this image"
                      >
                        <Trash2 className="w-4 h-4 text-red-500" />
                      </button>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        )}

        {/* ================================================================= */}
        {/* TAB 3: PLATFORM & TOOL TAGS                                      */}
        {/* ================================================================= */}
        {activeTab === 'tags' && (
          <div className="space-y-4 animate-fade-in">
            <div className="p-3 rounded-2xl bg-white border border-slate-200 space-y-3">
              <div>
                <h4 className="font-bold text-xs text-slate-900">
                  Platform & Tool Tags ({project.tags?.length || 0})
                </h4>
                <p className="text-[10px] text-slate-400">
                  Displayed as tech stack pills on the card.
                </p>
              </div>

              {/* Tag Pills */}
              <div className="flex flex-wrap gap-1.5">
                {(project.tags || []).map((t, tIdx) => (
                  <span
                    key={tIdx}
                    className="px-2.5 py-1 rounded-lg bg-slate-100 border border-slate-200 text-slate-700 text-xs font-semibold flex items-center gap-1.5"
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
              </div>

              {/* Add Custom Tag */}
              <div className="flex gap-1.5 pt-1">
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
                  placeholder="Add custom tag (e.g. Photoshop Batch)..."
                  className="flex-1 px-3 py-1.5 rounded-lg border border-slate-300 bg-white text-xs"
                />
                <button
                  type="button"
                  onClick={() => handleAddTag()}
                  className="px-3 py-1.5 rounded-lg bg-[#0EA5E9] text-white text-xs font-bold hover:bg-[#0284C7] cursor-pointer"
                >
                  + Add
                </button>
              </div>

              {/* Tag Suggestions */}
              <div className="pt-2 border-t border-slate-100">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1.5">
                  1-Click Suggestions:
                </span>
                <div className="flex flex-wrap gap-1">
                  {tagSuggestions.map((sug) => (
                    <button
                      key={sug}
                      type="button"
                      disabled={(project.tags || []).includes(sug)}
                      onClick={() => handleAddTag(sug)}
                      className="px-2 py-0.5 rounded-md bg-slate-100 hover:bg-slate-200 text-slate-600 text-[10.5px] disabled:opacity-40 cursor-pointer"
                    >
                      + {sug}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ================================================================= */}
        {/* TAB 4: EXTERNAL LINKS & ACTIONS                                  */}
        {/* ================================================================= */}
        {activeTab === 'links' && (
          <div className="space-y-4 animate-fade-in">
            <div className="p-3 rounded-2xl bg-white border border-slate-200 space-y-3">
              <div>
                <label className="block font-bold text-slate-800 mb-1">Live Storefront URL</label>
                <div className="flex items-center gap-1.5">
                  <input
                    type="url"
                    value={project.url || ''}
                    onChange={(e) => handleFieldChange('url', e.target.value)}
                    placeholder="https://willowbathandvanity.com/"
                    className="flex-1 px-3 py-1.5 rounded-xl border border-slate-300 bg-white font-mono text-xs text-slate-800"
                  />
                  {project.url && (
                    <a
                      href={project.url}
                      target="_blank"
                      rel="noreferrer"
                      className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700"
                      title="Open storefront"
                    >
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  )}
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-800 mb-1">
                  Case Study Document Link (Optional)
                </label>
                <input
                  type="url"
                  value={project.caseStudyUrl || ''}
                  onChange={(e) => handleFieldChange('caseStudyUrl', e.target.value)}
                  placeholder="https://..."
                  className="w-full px-3 py-1.5 rounded-xl border border-slate-300 bg-white font-mono text-xs text-slate-800"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-800 mb-1">
                  Action Button Label
                </label>
                <input
                  type="text"
                  value={project.actionLabel || ''}
                  onChange={(e) => handleFieldChange('actionLabel', e.target.value)}
                  placeholder="CASE STUDY & PROOF"
                  className="w-full px-3 py-1.5 rounded-xl border border-slate-300 bg-white font-extrabold text-xs text-slate-800"
                />
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Footer bar */}
      <div className="p-3 bg-white border-t border-[#BCD5E6] flex items-center justify-between text-xs shrink-0">
        <span className="text-[11px] text-emerald-600 font-bold flex items-center gap-1">
          <CheckCircle2 className="w-3.5 h-3.5" />
          <span>Live Synced to Viewport</span>
        </span>

        <button
          type="button"
          onClick={onBackToStructure}
          className="px-3.5 py-1.5 rounded-xl bg-[#143020] hover:bg-[#1E442D] text-white font-extrabold cursor-pointer"
        >
          Done Editing
        </button>
      </div>
    </div>
  );
};
