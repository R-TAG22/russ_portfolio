import React, { useState } from 'react';
import {
  Layers,
  Plus,
  RotateCcw,
  Trash2,
  Edit3,
  Copy,
  ExternalLink,
  ChevronUp,
  ChevronDown,
  Search,
  Check,
  X,
  Sparkles,
  Image as ImageIcon,
} from 'lucide-react';
import { FooterLogoMarqueeConfig, FooterLogoMarqueeItem } from '../types/schema';
import { ALL_TOOL_LOGOS, DEFAULT_FOOTER_MARQUEE_ITEMS } from '../../data/toolsData';
import { UniversalImageUploader } from './UniversalImageUploader';

interface FooterMarqueeEditorProps {
  config?: FooterLogoMarqueeConfig;
  onChange: (updated: FooterLogoMarqueeConfig) => void;
}

export const FooterMarqueeEditor: React.FC<FooterMarqueeEditorProps> = ({
  config,
  onChange,
}) => {
  const currentConfig: FooterLogoMarqueeConfig = config || {
    enabled: true,
    items: DEFAULT_FOOTER_MARQUEE_ITEMS,
  };

  const items = currentConfig.items && currentConfig.items.length > 0
    ? currentConfig.items
    : DEFAULT_FOOTER_MARQUEE_ITEMS;

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilter, setSelectedFilter] = useState<'all' | 'ecommerce' | 'design' | 'marketing' | 'custom'>('all');
  const [editingItem, setEditingItem] = useState<FooterLogoMarqueeItem | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);
  const [showResetConfirm, setShowResetConfirm] = useState(false);

  const updateItems = (newItems: FooterLogoMarqueeItem[]) => {
    onChange({
      ...currentConfig,
      items: newItems,
    });
  };

  const handleToggleEnabled = (enabled: boolean) => {
    onChange({
      ...currentConfig,
      enabled,
    });
  };

  const handleAddNew = () => {
    const newItem: FooterLogoMarqueeItem = {
      id: `logo_${Date.now()}_${Math.random().toString(36).substr(2, 4)}`,
      name: '',
      category: 'E-commerce Tool',
      type: 'custom',
      logoUrl: '',
      linkUrl: '',
      enabled: true,
    };
    setEditingItem(newItem);
    setIsModalOpen(true);
  };

  const handleEdit = (item: FooterLogoMarqueeItem) => {
    setEditingItem({ ...item });
    setIsModalOpen(true);
  };

  const handleDuplicate = (item: FooterLogoMarqueeItem) => {
    const duplicated: FooterLogoMarqueeItem = {
      ...item,
      id: `logo_${Date.now()}_${Math.random().toString(36).substr(2, 4)}`,
      name: `${item.name} (Copy)`,
    };
    const idx = items.findIndex((i) => i.id === item.id);
    const newItems = [...items];
    newItems.splice(idx + 1, 0, duplicated);
    updateItems(newItems);
  };

  const handleDelete = (id: string) => {
    updateItems(items.filter((i) => i.id !== id));
    setDeleteConfirmId(null);
  };

  const handleMove = (index: number, direction: 'up' | 'down') => {
    const targetIndex = direction === 'up' ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= items.length) return;
    const newItems = [...items];
    const [moved] = newItems.splice(index, 1);
    newItems.splice(targetIndex, 0, moved);
    updateItems(newItems);
  };

  const handleToggleItemStatus = (id: string, enabled: boolean) => {
    updateItems(
      items.map((i) => (i.id === id ? { ...i, enabled } : i))
    );
  };

  const handleSaveModal = (savedItem: FooterLogoMarqueeItem) => {
    const exists = items.findIndex((i) => i.id === savedItem.id);
    if (exists >= 0) {
      updateItems(items.map((i) => (i.id === savedItem.id ? savedItem : i)));
    } else {
      updateItems([savedItem, ...items]);
    }
    setIsModalOpen(false);
    setEditingItem(null);
  };

  const handleResetToDefaults = () => {
    updateItems(DEFAULT_FOOTER_MARQUEE_ITEMS);
    setShowResetConfirm(false);
  };

  const filteredItems = items.filter((item) => {
    const matchesFilter = selectedFilter === 'all' || item.type === selectedFilter;
    if (!matchesFilter) return false;
    if (!searchQuery.trim()) return true;
    const q = searchQuery.toLowerCase();
    return (
      item.name.toLowerCase().includes(q) ||
      (item.category || '').toLowerCase().includes(q)
    );
  });

  const activeCount = items.filter((i) => i.enabled !== false).length;

  return (
    <div className="p-5 rounded-2xl bg-white border-2 border-[#BCD5E6] shadow-xs space-y-5 text-xs font-inter">
      {/* Header & Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-100">
        <div>
          <div className="flex items-center gap-2">
            <Layers className="w-4 h-4 text-[#0EA5E9]" />
            <h3 className="font-bold text-sm text-[#1E3A5F]">
              Footer Logo Marquee / Client & Tech Ticker
            </h3>
            <span className="px-2 py-0.5 rounded-full bg-[#E0F2FE] text-[#0369A1] font-extrabold text-[10px] tracking-wide uppercase">
              {activeCount} Active / {items.length} Total
            </span>
          </div>
          <p className="text-[11px] text-slate-500 mt-1">
            Endless scrolling brand ticker in the website footer. Add custom logos with drag-and-drop or Media Gallery, reorder, and customize links.
          </p>
        </div>

        <div className="flex items-center gap-2 flex-wrap">
          {showResetConfirm ? (
            <div className="flex items-center gap-1.5 p-1 bg-amber-50 rounded-xl border border-amber-200">
              <span className="text-[10px] font-bold text-amber-900 px-1">Reset all to default?</span>
              <button
                type="button"
                onClick={handleResetToDefaults}
                className="px-2 py-1 rounded-lg bg-amber-600 hover:bg-amber-700 text-white font-bold text-[10px] cursor-pointer"
              >
                Yes, Reset
              </button>
              <button
                type="button"
                onClick={() => setShowResetConfirm(false)}
                className="px-2 py-1 rounded-lg bg-white text-slate-600 font-bold text-[10px] cursor-pointer"
              >
                Cancel
              </button>
            </div>
          ) : (
            <button
              type="button"
              onClick={() => setShowResetConfirm(true)}
              className="px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-[11px] flex items-center gap-1.5 transition-colors cursor-pointer"
              title="Restore initial 22 tool logos"
            >
              <RotateCcw className="w-3.5 h-3.5 text-slate-500" />
              <span>Reset Defaults</span>
            </button>
          )}

          <button
            type="button"
            onClick={handleAddNew}
            className="px-3 py-1.5 rounded-xl bg-[#0EA5E9] hover:bg-[#0284C7] text-white font-bold text-[11px] flex items-center gap-1.5 transition-all cursor-pointer shadow-xs hover:scale-102"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>+ Add Marquee Logo</span>
          </button>
        </div>
      </div>

      {/* Global Marquee Ticker Settings */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-4 rounded-xl bg-[#F8FAFC] border border-[#BCD5E6]">
        <div className="flex items-center justify-between">
          <div>
            <span className="font-bold text-[#1E3A5F] block">Enable Footer Marquee Ticker</span>
            <span className="text-[11px] text-slate-500">
              Display the animated scrolling logo bar above the footer copyright line.
            </span>
          </div>
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={currentConfig.enabled !== false}
              onChange={(e) => handleToggleEnabled(e.target.checked)}
              className="sr-only peer"
            />
            <div className="w-11 h-6 bg-slate-200 peer-focus:outline-hidden rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#0EA5E9]"></div>
          </label>
        </div>

        <div className="flex items-center justify-between">
          <div>
            <span className="font-bold text-[#1E3A5F] block">Pause on Hover</span>
            <span className="text-[11px] text-slate-500">
              Freezes scrolling when visitor hovers over any brand badge.
            </span>
          </div>
          <span className="text-[11px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200">
            Active by Default
          </span>
        </div>
      </div>

      {/* Search & Filters */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pt-1">
        <div className="relative flex-1 max-w-sm">
          <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search logos by name or category..."
            className="w-full pl-8 pr-3 py-1.5 rounded-lg border border-[#BCD5E6] bg-white text-xs text-[#1E3A5F] focus:outline-[#0EA5E9]"
          />
        </div>

        <div className="flex items-center gap-1 overflow-x-auto pb-1 sm:pb-0">
          {(['all', 'ecommerce', 'design', 'marketing', 'custom'] as const).map((filter) => (
            <button
              key={filter}
              type="button"
              onClick={() => setSelectedFilter(filter)}
              className={`px-2.5 py-1 rounded-lg text-[10.5px] font-bold capitalize transition-all cursor-pointer ${
                selectedFilter === filter
                  ? 'bg-[#1E3A5F] text-white shadow-2xs'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {filter}
            </button>
          ))}
        </div>
      </div>

      {/* List of Logos */}
      <div className="space-y-2 max-h-[460px] overflow-y-auto pr-1">
        {filteredItems.map((item) => {
          const originalIndex = items.findIndex((i) => i.id === item.id);
          const isDeleting = deleteConfirmId === item.id;
          const builtIn = ALL_TOOL_LOGOS.find(
            (t) => t.id === item.id || t.name.toLowerCase() === item.name.toLowerCase()
          );

          return (
            <div
              key={item.id}
              className={`p-2.5 rounded-xl border transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-3 ${
                item.enabled === false
                  ? 'bg-slate-50/60 border-slate-200 opacity-60'
                  : 'bg-white border-[#BCD5E6] hover:border-[#0EA5E9] shadow-2xs'
              }`}
            >
              {/* Left: Reorder Controls + Logo Icon + Details */}
              <div className="flex items-center gap-3 min-w-0 flex-1">
                {/* Reorder Buttons */}
                <div className="flex flex-col gap-0.5 shrink-0">
                  <button
                    type="button"
                    onClick={() => handleMove(originalIndex, 'up')}
                    disabled={originalIndex === 0}
                    className="p-1 rounded text-slate-400 hover:text-[#1E3A5F] hover:bg-slate-100 disabled:opacity-20 cursor-pointer"
                    title="Move up"
                  >
                    <ChevronUp className="w-3.5 h-3.5" />
                  </button>
                  <button
                    type="button"
                    onClick={() => handleMove(originalIndex, 'down')}
                    disabled={originalIndex === items.length - 1}
                    className="p-1 rounded text-slate-400 hover:text-[#1E3A5F] hover:bg-slate-100 disabled:opacity-20 cursor-pointer"
                    title="Move down"
                  >
                    <ChevronDown className="w-3.5 h-3.5" />
                  </button>
                </div>

                {/* Logo Preview Badge */}
                <div className="w-10 h-10 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-center shrink-0 overflow-hidden p-1 shadow-2xs">
                  {item.logoUrl ? (
                    <img
                      src={item.logoUrl}
                      alt={item.name}
                      className="w-full h-full object-contain"
                    />
                  ) : builtIn ? (
                    <div className="scale-80 flex items-center justify-center">
                      {builtIn.icon}
                    </div>
                  ) : (
                    <span className="font-urbanist font-black text-xs text-[#1E3A5F]">
                      {item.name.slice(0, 2).toUpperCase() || 'LG'}
                    </span>
                  )}
                </div>

                {/* Information */}
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-xs text-[#1E3A5F] truncate">
                      {item.name || 'Untitled Logo'}
                    </span>
                    <span
                      className={`text-[9px] px-1.5 py-0.2 rounded font-bold uppercase tracking-wider ${
                        item.type === 'ecommerce'
                          ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                          : item.type === 'marketing'
                          ? 'bg-purple-50 text-purple-700 border border-purple-200'
                          : item.type === 'design'
                          ? 'bg-sky-50 text-sky-700 border border-sky-200'
                          : 'bg-amber-50 text-amber-700 border border-amber-200'
                      }`}
                    >
                      {item.type || 'tool'}
                    </span>
                  </div>

                  <div className="flex items-center gap-2 mt-0.5 text-[10.5px] text-slate-500">
                    <span className="truncate">{item.category || 'Platform Specialist'}</span>
                    {item.linkUrl && (
                      <span className="flex items-center gap-0.5 text-[#0EA5E9] font-mono text-[9.5px]">
                        <ExternalLink className="w-2.5 h-2.5" />
                        <span className="truncate max-w-[120px]">{item.linkUrl.replace(/^https?:\/\//, '')}</span>
                      </span>
                    )}
                  </div>
                </div>
              </div>

              {/* Right: Actions */}
              <div className="flex items-center gap-2 self-end sm:self-auto shrink-0">
                {/* Active Switch */}
                <label className="flex items-center gap-1.5 cursor-pointer select-none mr-1" title="Toggle visibility in ticker">
                  <input
                    type="checkbox"
                    checked={item.enabled !== false}
                    onChange={(e) => handleToggleItemStatus(item.id, e.target.checked)}
                    className="w-3.5 h-3.5 rounded text-[#0EA5E9]"
                  />
                  <span className="text-[10px] text-slate-500 font-semibold">
                    {item.enabled !== false ? 'Live' : 'Hidden'}
                  </span>
                </label>

                {/* Edit Button */}
                <button
                  type="button"
                  onClick={() => handleEdit(item)}
                  className="px-2.5 py-1 rounded-lg bg-sky-50 hover:bg-sky-100 text-[#0284C7] font-bold text-[10.5px] flex items-center gap-1 transition-colors cursor-pointer"
                >
                  <Edit3 className="w-3 h-3" />
                  <span>Edit</span>
                </button>

                {/* Duplicate Button */}
                <button
                  type="button"
                  onClick={() => handleDuplicate(item)}
                  className="p-1 rounded-lg text-slate-400 hover:text-[#1E3A5F] hover:bg-slate-100 transition-colors cursor-pointer"
                  title="Duplicate logo"
                >
                  <Copy className="w-3.5 h-3.5" />
                </button>

                {/* Delete Button / In-App Confirmation */}
                {isDeleting ? (
                  <div className="flex items-center gap-1 bg-red-50 p-0.5 rounded-lg border border-red-200 animate-fade-in">
                    <button
                      type="button"
                      onClick={() => handleDelete(item.id)}
                      className="px-2 py-0.5 rounded bg-red-600 hover:bg-red-700 text-white font-bold text-[10px] cursor-pointer"
                    >
                      Delete
                    </button>
                    <button
                      type="button"
                      onClick={() => setDeleteConfirmId(null)}
                      className="px-1.5 py-0.5 rounded bg-white text-slate-600 font-semibold text-[10px] cursor-pointer"
                    >
                      Cancel
                    </button>
                  </div>
                ) : (
                  <button
                    type="button"
                    onClick={() => setDeleteConfirmId(item.id)}
                    className="p-1 rounded-lg text-slate-400 hover:text-red-600 hover:bg-red-50 transition-colors cursor-pointer"
                    title="Delete logo"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>
            </div>
          );
        })}

        {filteredItems.length === 0 && (
          <div className="p-8 text-center bg-slate-50 rounded-xl border border-dashed border-slate-200">
            <p className="text-slate-500 font-bold">No marquee logos found matching your search.</p>
            <button
              type="button"
              onClick={handleAddNew}
              className="mt-2 px-3 py-1.5 rounded-lg bg-[#0EA5E9] text-white font-bold text-xs"
            >
              + Add New Marquee Logo
            </button>
          </div>
        )}
      </div>

      {/* Edit / Add Modal */}
      {isModalOpen && editingItem && (
        <div className="fixed inset-0 z-50 bg-[#1E3A5F]/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div
            className="w-full max-w-lg bg-white rounded-2xl border-2 border-[#BCD5E6] shadow-2xl flex flex-col max-h-[92vh] overflow-hidden animate-scale-in"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="px-5 py-3.5 border-b border-slate-100 flex items-center justify-between bg-slate-50">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-[#0EA5E9]/10 text-[#0EA5E9] flex items-center justify-center font-bold">
                  <Sparkles className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="font-urbanist font-black text-sm text-[#1E3A5F]">
                    {editingItem.name ? `Edit "${editingItem.name}"` : 'Add New Marquee Logo'}
                  </h4>
                  <p className="text-[11px] text-slate-500">
                    Custom logo image, brand name, and optional hyperlink.
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="p-1 rounded-lg text-slate-400 hover:text-[#1E3A5F] hover:bg-slate-200 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-5 space-y-4 overflow-y-auto flex-1">
              {/* Brand Name & Category */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">
                    Logo / Brand Name *
                  </label>
                  <input
                    type="text"
                    value={editingItem.name}
                    onChange={(e) => setEditingItem({ ...editingItem, name: e.target.value })}
                    placeholder="e.g. TikTok Shop, Klaviyo, Amazon"
                    className="w-full px-3 py-2 rounded-xl border border-[#BCD5E6] bg-white font-bold text-xs focus:outline-[#0EA5E9]"
                    required
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">
                    Category / Subtitle
                  </label>
                  <input
                    type="text"
                    value={editingItem.category}
                    onChange={(e) => setEditingItem({ ...editingItem, category: e.target.value })}
                    placeholder="e.g. Marketplace Ops, DTC Platform"
                    className="w-full px-3 py-2 rounded-xl border border-[#BCD5E6] bg-white text-xs focus:outline-[#0EA5E9]"
                  />
                </div>
              </div>

              {/* Type Category & Destination Link */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">
                    Tool Type Badge
                  </label>
                  <select
                    value={editingItem.type || 'ecommerce'}
                    onChange={(e) =>
                      setEditingItem({
                        ...editingItem,
                        type: e.target.value as any,
                      })
                    }
                    className="w-full px-3 py-2 rounded-xl border border-[#BCD5E6] bg-white text-xs focus:outline-[#0EA5E9]"
                  >
                    <option value="ecommerce">E-Commerce Platform</option>
                    <option value="design">Design & Visual Builder</option>
                    <option value="marketing">Marketing & CRM Automation</option>
                    <option value="custom">Custom Partner / Client Brand</option>
                  </select>
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">
                    Destination URL (Optional)
                  </label>
                  <input
                    type="text"
                    value={editingItem.linkUrl || ''}
                    onChange={(e) => setEditingItem({ ...editingItem, linkUrl: e.target.value })}
                    placeholder="https://... (Opens in new tab)"
                    className="w-full px-3 py-2 rounded-xl border border-[#BCD5E6] bg-white font-mono text-xs focus:outline-[#0EA5E9]"
                  />
                </div>
              </div>

              {/* Logo Image Upload with UniversalImageUploader (Drag & Drop + Media Gallery Popout!) */}
              <div>
                <UniversalImageUploader
                  label="Logo Graphic / Image (SVG, PNG, WebP)"
                  helperText="Upload transparent logo cutout via drag & drop, browse device, or choose from the Media Gallery. If empty, built-in vector or initials badge will be rendered."
                  value={editingItem.logoUrl || ''}
                  onChange={(url) => setEditingItem({ ...editingItem, logoUrl: url })}
                  aspectRatio="auto"
                  galleryTitle="Choose Marquee Logo from Media Gallery"
                  placeholder="https://... or upload logo image"
                />
              </div>

              {/* Status checkbox */}
              <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
                <div>
                  <span className="font-bold text-[#1E3A5F] block">Show in Ticker</span>
                  <span className="text-[11px] text-slate-500">
                    Uncheck to temporarily hide this logo from the public footer without deleting it.
                  </span>
                </div>
                <input
                  type="checkbox"
                  checked={editingItem.enabled !== false}
                  onChange={(e) => setEditingItem({ ...editingItem, enabled: e.target.checked })}
                  className="w-4 h-4 rounded text-[#0EA5E9]"
                />
              </div>
            </div>

            {/* Modal Footer */}
            <div className="px-5 py-3 bg-slate-50 border-t border-slate-100 flex items-center justify-end gap-2">
              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="px-4 py-2 rounded-xl border border-slate-300 hover:bg-slate-100 text-slate-700 font-bold text-xs cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="button"
                disabled={!editingItem.name.trim()}
                onClick={() => handleSaveModal(editingItem)}
                className="px-5 py-2 rounded-xl bg-[#0EA5E9] hover:bg-[#0284C7] text-white font-extrabold text-xs shadow-md transition-all cursor-pointer flex items-center gap-1.5 disabled:opacity-50"
              >
                <Check className="w-4 h-4" />
                <span>Save Logo Details</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
