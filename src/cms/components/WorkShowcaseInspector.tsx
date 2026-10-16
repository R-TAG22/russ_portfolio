import React, { useState } from 'react';
import {
  Plus,
  Trash2,
  Edit3,
  ArrowUp,
  ArrowDown,
  ShoppingBag,
  Layers,
  Sparkles,
  ExternalLink,
  Tag,
  Sliders,
  Check,
  X,
  Copy,
} from 'lucide-react';
import { WorkShowcaseContent, WorkShowcaseProject } from '../types/schema';
import { WorkProjectEditModal } from './WorkProjectEditModal';

interface WorkShowcaseInspectorProps {
  content: WorkShowcaseContent;
  onUpdateContent: (updatedContent: WorkShowcaseContent) => void;
}

export const WorkShowcaseInspector: React.FC<WorkShowcaseInspectorProps> = ({
  content,
  onUpdateContent,
}) => {
  const [editingProject, setEditingProject] = useState<WorkShowcaseProject | null>(null);
  const [editingProjectIndex, setEditingProjectIndex] = useState<number | null>(null);
  const [deleteConfirmIndex, setDeleteConfirmIndex] = useState<number | null>(null);

  // Category filter state
  const [newCategoryInput, setNewCategoryInput] = useState('');
  const [editingFilterIndex, setEditingFilterIndex] = useState<number | null>(null);
  const [editingFilterText, setEditingFilterText] = useState('');

  const projects = content.projects || [];
  const filters = content.filters || ['All', 'Catalog Architecture', 'Marketplace Ops', 'Automation'];

  // --- Filter Category Management ---
  const handleAddCategory = () => {
    const trimmed = newCategoryInput.trim();
    if (!trimmed) return;
    if (!filters.includes(trimmed)) {
      const updatedFilters = [...filters, trimmed];
      onUpdateContent({ ...content, filters: updatedFilters });
    }
    setNewCategoryInput('');
  };

  const handleStartRenameFilter = (idx: number, currentText: string) => {
    setEditingFilterIndex(idx);
    setEditingFilterText(currentText);
  };

  const handleSaveRenameFilter = (idx: number) => {
    const trimmed = editingFilterText.trim();
    if (!trimmed) {
      setEditingFilterIndex(null);
      return;
    }
    const oldName = filters[idx];
    const updatedFilters = [...filters];
    updatedFilters[idx] = trimmed;

    // Also update any projects that used this category name
    const updatedProjects = projects.map((p) =>
      p.category === oldName ? { ...p, category: trimmed } : p
    );

    onUpdateContent({
      ...content,
      filters: updatedFilters,
      projects: updatedProjects,
    });
    setEditingFilterIndex(null);
  };

  const handleDeleteCategory = (idx: number) => {
    const filterToDelete = filters[idx];
    if (filterToDelete === 'All') return; // protect default All
    const updatedFilters = filters.filter((_, i) => i !== idx);
    onUpdateContent({ ...content, filters: updatedFilters });
  };

  // --- Project Reordering & Actions ---
  const handleMoveProject = (index: number, direction: 'up' | 'down') => {
    const targetIndex = direction === 'up' ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= projects.length) return;
    const updated = [...projects];
    const temp = updated[index];
    updated[index] = updated[targetIndex];
    updated[targetIndex] = temp;
    onUpdateContent({ ...content, projects: updated });
  };

  const handleOpenAddProject = () => {
    const newProj: WorkShowcaseProject = {
      id: `proj_${Date.now()}`,
      title: 'New Client Storefront',
      client: 'Brand / Direct-to-Consumer',
      category: filters[1] || 'Catalog Architecture',
      metrics: '1,000+ SKUs',
      description: 'Engineered comprehensive product catalog systems, variant matrix mapping, and inventory pipelines.',
      highlights: [
        'Nested variant attribute hierarchies and SKU generation',
        'Multi-channel inventory synchronization flat-files',
      ],
      tags: ['Shopify Plus', 'Metafields'],
      imageUrl: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80',
      galleryImages: [],
      url: 'https://shopify.com',
      actionLabel: 'View Architecture →',
    };
    setEditingProject(newProj);
    setEditingProjectIndex(null); // indicates new project
  };

  const handleOpenEditProject = (index: number) => {
    setEditingProject(projects[index]);
    setEditingProjectIndex(index);
  };

  const handleDuplicateProject = (index: number) => {
    const source = projects[index];
    const duplicated: WorkShowcaseProject = {
      ...source,
      id: `proj_${Date.now()}`,
      title: `${source.title} (Copy)`,
    };
    const updated = [...projects];
    updated.splice(index + 1, 0, duplicated);
    onUpdateContent({ ...content, projects: updated });
  };

  const handleConfirmDelete = (index: number) => {
    const updated = projects.filter((_, i) => i !== index);
    onUpdateContent({ ...content, projects: updated });
    setDeleteConfirmIndex(null);
  };

  const handleSaveModalProject = (savedProject: WorkShowcaseProject) => {
    let updated: WorkShowcaseProject[];
    if (editingProjectIndex !== null && editingProjectIndex >= 0) {
      updated = [...projects];
      updated[editingProjectIndex] = savedProject;
    } else {
      updated = [...projects, savedProject];
    }
    onUpdateContent({ ...content, projects: updated });
  };

  return (
    <div className="space-y-5 text-xs text-[#1E3A5F]">
      {/* 1. Header Information */}
      <div className="space-y-3 pb-3 border-b border-[#BCD5E6]">
        <div>
          <label className="block font-bold text-[#1E3A5F] mb-1">Grid Headline</label>
          <input
            type="text"
            value={content.headline || ''}
            onChange={(e) => onUpdateContent({ ...content, headline: e.target.value })}
            className="w-full px-3 py-1.5 rounded-lg border border-[#BCD5E6] bg-white text-[#1E3A5F] font-bold"
            placeholder="Verified Storefronts & Client Case Studies"
          />
        </div>
        <div>
          <label className="block font-bold text-[#1E3A5F] mb-1">Subhead / Context</label>
          <input
            type="text"
            value={content.subhead || ''}
            onChange={(e) => onUpdateContent({ ...content, subhead: e.target.value })}
            className="w-full px-3 py-1.5 rounded-lg border border-[#BCD5E6] bg-white text-[#1E3A5F]"
            placeholder="Enterprise catalog matrices, automated inventory reconciliation..."
          />
        </div>
      </div>

      {/* 2. Category Filter Management */}
      <div className="space-y-3 pb-3 border-b border-[#BCD5E6]">
        <div className="flex items-center justify-between">
          <label className="block font-bold text-[#1E3A5F]">Category Filter Pills</label>
          <span className="text-[10px] text-slate-400 font-mono">{filters.length} active</span>
        </div>

        {/* Existing filters list */}
        <div className="space-y-1.5">
          {filters.map((filter, idx) => (
            <div
              key={idx}
              className="px-2.5 py-1.5 rounded-xl bg-[#F4F8FB] border border-[#BCD5E6] flex items-center justify-between gap-2"
            >
              {editingFilterIndex === idx ? (
                <div className="flex items-center gap-1.5 flex-1">
                  <input
                    type="text"
                    autoFocus
                    value={editingFilterText}
                    onChange={(e) => setEditingFilterText(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') handleSaveRenameFilter(idx);
                      if (e.key === 'Escape') setEditingFilterIndex(null);
                    }}
                    className="flex-1 px-2 py-0.5 rounded border border-[#0EA5E9] bg-white text-[#1E3A5F] font-bold text-xs"
                  />
                  <button
                    type="button"
                    onClick={() => handleSaveRenameFilter(idx)}
                    className="p-1 rounded bg-[#0EA5E9] text-white hover:bg-[#0284C7] cursor-pointer"
                  >
                    <Check className="w-3 h-3" />
                  </button>
                  <button
                    type="button"
                    onClick={() => setEditingFilterIndex(null)}
                    className="p-1 rounded text-slate-400 hover:text-slate-600 cursor-pointer"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </div>
              ) : (
                <>
                  <div className="flex items-center gap-2 truncate">
                    <span className="w-2 h-2 rounded-full bg-[#0EA5E9]" />
                    <span className="font-bold text-xs text-[#1E3A5F] truncate">{filter}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <button
                      type="button"
                      onClick={() => handleStartRenameFilter(idx, filter)}
                      title="Rename category"
                      className="p-1 rounded-md text-slate-400 hover:text-[#1E3A5F] hover:bg-slate-200 transition-colors cursor-pointer"
                    >
                      <Edit3 className="w-3 h-3" />
                    </button>
                    {filter !== 'All' && (
                      <button
                        type="button"
                        onClick={() => handleDeleteCategory(idx)}
                        title="Delete category"
                        className="p-1 rounded-md text-slate-400 hover:text-red-600 hover:bg-red-50 transition-colors cursor-pointer"
                      >
                        <Trash2 className="w-3 h-3" />
                      </button>
                    )}
                  </div>
                </>
              )}
            </div>
          ))}
        </div>

        {/* Add new filter category */}
        <div className="flex gap-2">
          <input
            type="text"
            value={newCategoryInput}
            onChange={(e) => setNewCategoryInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                e.preventDefault();
                handleAddCategory();
              }
            }}
            placeholder="New Category (e.g. Creative Media)"
            className="flex-1 px-3 py-1.5 rounded-lg border border-[#BCD5E6] bg-white text-[#1E3A5F] focus:border-[#0EA5E9] focus:outline-hidden"
          />
          <button
            type="button"
            onClick={handleAddCategory}
            className="px-3 py-1.5 rounded-lg bg-[#1E3A5F] hover:bg-[#2D5D86] text-white font-bold flex items-center gap-1 cursor-pointer"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Add</span>
          </button>
        </div>
      </div>

      {/* 3. Project List & Reordering */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-extrabold text-[#1E3A5F] flex items-center gap-1.5">
              <ShoppingBag className="w-4 h-4 text-[#0EA5E9]" />
              <span>Projects & Case Studies</span>
            </h3>
            <p className="text-[10px] text-slate-400">
              Drag/reorder, edit details, and add gallery photos.
            </p>
          </div>
          <button
            type="button"
            onClick={handleOpenAddProject}
            className="px-3 py-1.5 rounded-xl bg-[#0EA5E9] hover:bg-[#0284C7] text-white font-bold flex items-center gap-1 shadow-xs transition-colors cursor-pointer"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Add Project</span>
          </button>
        </div>

        {/* Project Cards in Inspector */}
        <div className="space-y-2">
          {projects.map((proj, idx) => (
            <div
              key={proj.id || idx}
              className="p-3 rounded-2xl bg-white border border-[#BCD5E6] hover:border-[#0EA5E9] shadow-2xs transition-all flex flex-col gap-2"
            >
              <div className="flex items-center justify-between gap-2">
                {/* Reorder controls */}
                <div className="flex items-center gap-1">
                  <button
                    type="button"
                    disabled={idx === 0}
                    onClick={() => handleMoveProject(idx, 'up')}
                    className="p-1 rounded-md text-slate-400 hover:text-[#1E3A5F] hover:bg-slate-100 disabled:opacity-20 cursor-pointer"
                    title="Move up"
                  >
                    <ArrowUp className="w-3.5 h-3.5" />
                  </button>
                  <button
                    type="button"
                    disabled={idx === projects.length - 1}
                    onClick={() => handleMoveProject(idx, 'down')}
                    className="p-1 rounded-md text-slate-400 hover:text-[#1E3A5F] hover:bg-slate-100 disabled:opacity-20 cursor-pointer"
                    title="Move down"
                  >
                    <ArrowDown className="w-3.5 h-3.5" />
                  </button>
                </div>

                {/* Category Pill & Metrics */}
                <div className="flex items-center gap-1.5 truncate">
                  <span className="px-2 py-0.5 rounded-md bg-[#EFF6FB] text-[#0EA5E9] font-bold text-[10px] border border-[#BCD5E6] truncate">
                    {proj.category}
                  </span>
                  {proj.metrics && (
                    <span className="text-[10px] font-mono font-bold text-slate-400 truncate">
                      {proj.metrics}
                    </span>
                  )}
                </div>

                {/* Actions: Edit, Duplicate, Delete */}
                <div className="flex items-center gap-1">
                  <button
                    type="button"
                    onClick={() => handleDuplicateProject(idx)}
                    title="Duplicate project"
                    className="p-1 rounded-md text-slate-400 hover:text-[#1E3A5F] hover:bg-slate-100 transition-colors cursor-pointer"
                  >
                    <Copy className="w-3.5 h-3.5" />
                  </button>
                  <button
                    type="button"
                    onClick={() => handleOpenEditProject(idx)}
                    title="Edit project details"
                    className="p-1 rounded-md bg-[#EFF6FB] text-[#0EA5E9] hover:bg-[#0EA5E9] hover:text-white transition-colors cursor-pointer"
                  >
                    <Edit3 className="w-3.5 h-3.5" />
                  </button>
                  <button
                    type="button"
                    onClick={() => setDeleteConfirmIndex(idx)}
                    title="Delete project"
                    className="p-1 rounded-md text-slate-400 hover:text-red-600 hover:bg-red-50 transition-colors cursor-pointer"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              {/* Title & Preview Strip */}
              <div className="flex items-center gap-2.5">
                {proj.imageUrl && (
                  <div className="w-12 h-9 rounded-lg overflow-hidden bg-slate-100 border border-slate-200 shrink-0">
                    <img
                      src={proj.imageUrl}
                      alt={proj.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}
                <div className="min-w-0 flex-1">
                  <h4 className="font-bold text-xs text-[#1E3A5F] truncate">{proj.title}</h4>
                  <p className="text-[10px] text-slate-500 truncate">{proj.client}</p>
                </div>
              </div>

              {/* Delete confirmation dialog inline */}
              {deleteConfirmIndex === idx && (
                <div className="p-2.5 rounded-xl bg-red-50 border border-red-200 flex items-center justify-between gap-2 mt-1 animate-fade-in">
                  <span className="text-[11px] font-bold text-red-700">Delete this project?</span>
                  <div className="flex items-center gap-1">
                    <button
                      type="button"
                      onClick={() => handleConfirmDelete(idx)}
                      className="px-2 py-0.5 rounded-md bg-red-600 text-white font-bold text-[10px] cursor-pointer"
                    >
                      Confirm
                    </button>
                    <button
                      type="button"
                      onClick={() => setDeleteConfirmIndex(null)}
                      className="px-2 py-0.5 rounded-md bg-white border border-slate-300 text-slate-600 text-[10px] cursor-pointer"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              )}
            </div>
          ))}

          {projects.length === 0 && (
            <div className="p-6 rounded-2xl border-2 border-dashed border-[#BCD5E6] text-center space-y-2">
              <ShoppingBag className="w-6 h-6 text-slate-300 mx-auto" />
              <p className="text-slate-500 text-xs">No projects in this showcase yet.</p>
              <button
                type="button"
                onClick={handleOpenAddProject}
                className="px-3.5 py-1.5 rounded-xl bg-[#0EA5E9] text-white font-bold text-xs cursor-pointer"
              >
                + Add First Project
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Edit Project Full Modal */}
      {editingProject && (
        <WorkProjectEditModal
          project={editingProject}
          availableCategories={filters}
          isOpen={true}
          onClose={() => {
            setEditingProject(null);
            setEditingProjectIndex(null);
          }}
          onSave={handleSaveModalProject}
        />
      )}
    </div>
  );
};
