import React, { useState, useEffect } from 'react';
import {
  BookOpen,
  Plus,
  Search,
  Edit3,
  Trash2,
  Copy,
  ExternalLink,
  Eye,
  Check,
  X,
  Sparkles,
  Calendar,
  Clock,
  Tag,
  Upload,
  Image as ImageIcon,
  Flame,
  CheckCircle2,
  FileText,
} from 'lucide-react';
import { BlogPost } from '../types/schema';
import { contentService } from '../services/ContentServiceFactory';
import { UniversalImageUploader } from './UniversalImageUploader';

interface BlogManagementViewProps {
  onReturnToHome: () => void;
  onPreviewBlog?: (slug: string) => void;
}

const SAMPLE_COVER_IMAGES = [
  {
    label: 'Architecture & Scalability',
    url: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=1400&q=85',
  },
  {
    label: 'Modern Commerce & Code',
    url: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=1400&q=85',
  },
  {
    label: 'Packaging & Warehouse Logistics',
    url: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=1400&q=85',
  },
  {
    label: 'Data Analytics & Growth',
    url: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1400&q=85',
  },
];

const PRESET_CATEGORIES = [
  'DTC Architecture',
  'Catalog Management',
  'High-Velocity Operations',
  'Performance Engineering',
  'Supply Chain & EDI',
  'Shopify Plus & ERP',
];

export const BlogManagementView: React.FC<BlogManagementViewProps> = ({
  onReturnToHome,
  onPreviewBlog,
}) => {
  const [blogs, setBlogs] = useState<BlogPost[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [editingPost, setEditingPost] = useState<BlogPost | null>(null);
  const [isCreatingNew, setIsCreatingNew] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Form State for modal
  const [formData, setFormData] = useState<Partial<BlogPost>>({});
  const [tagInput, setTagInput] = useState('');
  const [isDraggingCover, setIsDraggingCover] = useState(false);

  useEffect(() => {
    loadBlogs();
  }, []);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const loadBlogs = async () => {
    setIsLoading(true);
    try {
      const data = await contentService.getBlogs();
      setBlogs(data || []);
    } catch (err) {
      console.error('Error loading blogs', err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleOpenCreateModal = () => {
    const newPost: BlogPost = {
      id: `blog_${Date.now()}`,
      slug: `new-article-${Date.now().toString().slice(-4)}`,
      title: 'Architectural Blueprint: High-Scale Commerce',
      subtitle: 'Technical breakdown of variant matrix and fulfillment pipelines.',
      excerpt: 'How we engineered high-velocity catalog sync for multi-million dollar brands.',
      content: `### Executive Overview\n\nScale is not about adding more servers—it is about removing friction from the data flow.\n\n### The Core Architecture\n\n- **Edge Caching**: Pre-rendered static responses at Cloudflare/Vercel edge.\n- **Variant Decoupling**: Separating heavy option matrices from client DOM hydration.\n- **Real-Time Inventory**: Event-driven webhooks updating stock levels within 500ms.\n\n### Practical Implementation\n\nBy keeping the checkout payload lean, checkout conversion lifted by **+28%** across mobile traffic.`,
      coverImage: SAMPLE_COVER_IMAGES[0].url,
      category: 'DTC Architecture',
      authorName: 'Russell Taga-an',
      authorRole: 'Senior E-Commerce Architect',
      authorAvatar:
        'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
      publishedAt: new Date().toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
      }),
      readTime: '5 min read',
      tags: ['Shopify Plus', 'Architecture', 'Performance'],
      featured: false,
      status: 'published',
      viewsCount: 0,
    };
    setFormData(newPost);
    setIsCreatingNew(true);
    setEditingPost(newPost);
  };

  const handleOpenEditModal = (post: BlogPost) => {
    setFormData({ ...post });
    setIsCreatingNew(false);
    setEditingPost(post);
  };

  const handleSavePost = async () => {
    if (!formData.title?.trim()) {
      alert('Please enter an article title.');
      return;
    }

    const slug =
      formData.slug?.trim() ||
      formData.title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)+/g, '');

    const postToSave: BlogPost = {
      id: formData.id || `blog_${Date.now()}`,
      slug,
      title: formData.title.trim(),
      subtitle: formData.subtitle || '',
      excerpt: formData.excerpt || '',
      content: formData.content || '',
      coverImage: formData.coverImage || SAMPLE_COVER_IMAGES[0].url,
      category: formData.category || 'DTC Architecture',
      authorName: formData.authorName || 'Russell Taga-an',
      authorRole: formData.authorRole || 'Senior E-Commerce Architect',
      authorAvatar:
        formData.authorAvatar ||
        'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
      publishedAt:
        formData.publishedAt ||
        new Date().toLocaleDateString('en-US', {
          month: 'short',
          day: 'numeric',
          year: 'numeric',
        }),
      readTime: formData.readTime || '5 min read',
      tags: formData.tags || ['Shopify Plus'],
      featured: !!formData.featured,
      status: formData.status || 'published',
      viewsCount: formData.viewsCount || 0,
    };

    try {
      await contentService.saveBlog(postToSave);
      await loadBlogs();
      setEditingPost(null);
      showToast(isCreatingNew ? 'New blog post published!' : 'Blog post updated successfully.');
    } catch (err) {
      console.error('Failed to save blog post', err);
      alert('Failed to save blog post.');
    }
  };

  const handleDeletePost = async (id: string, title: string) => {
    if (!window.confirm(`Are you sure you want to delete "${title}"?`)) return;
    try {
      await contentService.deleteBlog(id);
      await loadBlogs();
      showToast('Blog post deleted.');
    } catch (err) {
      console.error('Failed to delete blog post', err);
    }
  };

  const handleDuplicatePost = async (post: BlogPost) => {
    const duplicated: BlogPost = {
      ...post,
      id: `blog_${Date.now()}`,
      slug: `${post.slug}-copy-${Date.now().toString().slice(-4)}`,
      title: `${post.title} (Copy)`,
      status: 'draft',
      viewsCount: 0,
      publishedAt: new Date().toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
      }),
    };
    try {
      await contentService.saveBlog(duplicated);
      await loadBlogs();
      showToast('Blog post duplicated as draft.');
    } catch (err) {
      console.error('Failed to duplicate blog post', err);
    }
  };

  const handleToggleStatus = async (post: BlogPost) => {
    const nextStatus: 'published' | 'draft' = post.status === 'published' ? 'draft' : 'published';
    const updated: BlogPost = { ...post, status: nextStatus };
    try {
      await contentService.saveBlog(updated);
      await loadBlogs();
      showToast(`Post marked as ${nextStatus}.`);
    } catch (err) {
      console.error('Failed to toggle status', err);
    }
  };

  const handleAddTag = () => {
    if (!tagInput.trim()) return;
    const current = formData.tags || [];
    if (!current.includes(tagInput.trim())) {
      setFormData({ ...formData, tags: [...current, tagInput.trim()] });
    }
    setTagInput('');
  };

  const handleRemoveTag = (tagToRemove: string) => {
    const current = formData.tags || [];
    setFormData({ ...formData, tags: current.filter((t) => t !== tagToRemove) });
  };

  const handleCoverUpload = (files: FileList | null) => {
    if (!files || files.length === 0) return;
    const file = files[0];
    const reader = new FileReader();
    reader.onload = (e) => {
      if (e.target?.result) {
        setFormData((prev) => ({ ...prev, coverImage: e.target?.result as string }));
      }
    };
    reader.readAsDataURL(file);
  };

  // Filtered list
  const categories = ['All', ...Array.from(new Set(blogs.map((b) => b.category).filter(Boolean)))];

  const filteredBlogs = blogs.filter((b) => {
    const matchesCat = selectedCategory === 'All' || b.category === selectedCategory;
    if (!matchesCat) return false;
    if (!searchQuery.trim()) return true;
    const q = searchQuery.toLowerCase();
    return (
      b.title.toLowerCase().includes(q) ||
      (b.subtitle || '').toLowerCase().includes(q) ||
      b.excerpt.toLowerCase().includes(q) ||
      (b.tags || []).some((t) => t.toLowerCase().includes(q))
    );
  });

  return (
    <div className="w-full flex-1 flex flex-col min-h-0 bg-slate-50 font-inter text-[#1E3A5F]">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-5 right-5 z-50 px-4 py-2.5 rounded-xl bg-slate-900 text-white text-xs font-bold shadow-2xl flex items-center gap-2 animate-bounce">
          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Top Header Bar */}
      <div className="p-4 sm:p-6 bg-white border-b border-[#BCD5E6] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-1.5 rounded-lg bg-sky-100 text-[#0284C7]">
              <BookOpen className="w-5 h-5 text-[#0EA5E9]" />
            </span>
            <h1 className="font-urbanist font-black text-xl sm:text-2xl text-[#1E3A5F] tracking-tight">
              Blog & Engineering Blueprints Manager
            </h1>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Publish technical articles, e-commerce case studies, and SKU management blueprints to the visitor site.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            type="button"
            onClick={onReturnToHome}
            className="px-3.5 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs transition-all cursor-pointer"
          >
            ← View Site
          </button>

          <button
            type="button"
            onClick={handleOpenCreateModal}
            className="px-4 py-2 rounded-xl bg-[#0EA5E9] hover:bg-[#0284C7] text-white font-extrabold text-xs shadow-md flex items-center gap-2 transition-all hover:scale-105 cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>+ Add New Blog Post</span>
          </button>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="p-4 sm:px-6 bg-white/70 border-b border-[#BCD5E6]/60 flex flex-wrap items-center justify-between gap-3">
        {/* Categories Bar */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
          {categories.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1 rounded-full text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
                selectedCategory === cat
                  ? 'bg-[#1E3A5F] text-white shadow-xs'
                  : 'bg-white hover:bg-slate-100 text-slate-600 border border-slate-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Search Input */}
        <div className="w-full sm:w-72 relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search blogs by title or tag..."
            className="w-full pl-9 pr-3 py-1.5 rounded-xl bg-white border border-[#BCD5E6] text-xs font-semibold text-[#1E3A5F] focus:outline-hidden focus:border-[#0EA5E9]"
          />
        </div>
      </div>

      {/* Main Content Area: Posts Grid */}
      <div className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8">
        {isLoading ? (
          <div className="py-20 text-center text-slate-400 text-sm">Loading blog articles...</div>
        ) : filteredBlogs.length === 0 ? (
          <div className="py-16 text-center bg-white rounded-2xl border border-dashed border-slate-300 p-8 max-w-lg mx-auto">
            <BookOpen className="w-12 h-12 text-slate-300 mx-auto mb-3" />
            <h3 className="font-urbanist font-bold text-base text-slate-700">No blog posts found</h3>
            <p className="text-xs text-slate-500 mt-1 mb-4">
              Get started by publishing your first e-commerce breakdown or case study.
            </p>
            <button
              type="button"
              onClick={handleOpenCreateModal}
              className="px-4 py-2 rounded-xl bg-[#0EA5E9] text-white font-bold text-xs shadow-md hover:bg-[#0284C7] transition-all cursor-pointer"
            >
              + Create First Blog Post
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredBlogs.map((post) => (
              <article
                key={post.id}
                className="bg-white rounded-2xl border border-[#BCD5E6] shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col justify-between overflow-hidden group"
              >
                <div>
                  {/* Cover Image & Badges */}
                  <div className="relative aspect-[16/9] w-full overflow-hidden bg-slate-900">
                    {post.coverImage ? (
                      <img
                        src={post.coverImage}
                        alt={post.title}
                        className="w-full h-full object-cover group-hover:scale-104 transition-transform duration-500"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-slate-500">
                        <ImageIcon className="w-8 h-8" />
                      </div>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20" />

                    {/* Category Badge */}
                    <div className="absolute top-3 left-3">
                      <span className="px-2.5 py-1 rounded-full bg-white text-slate-900 text-[9.5px] font-black uppercase tracking-wider shadow-sm">
                        {post.category}
                      </span>
                    </div>

                    {/* Status Pill */}
                    <div className="absolute top-3 right-3 flex items-center gap-1.5">
                      {post.featured && (
                        <span className="px-2 py-0.5 rounded-full bg-amber-400 text-slate-900 text-[9px] font-black uppercase tracking-wider flex items-center gap-1 shadow-sm">
                          <Flame className="w-3 h-3 fill-slate-900" />
                          <span>Featured</span>
                        </span>
                      )}
                      <button
                        type="button"
                        onClick={() => handleToggleStatus(post)}
                        className={`px-2.5 py-0.5 rounded-full text-[9.5px] font-bold uppercase tracking-wider transition-all cursor-pointer shadow-sm ${
                          post.status === 'published'
                            ? 'bg-emerald-600 text-white hover:bg-emerald-700'
                            : 'bg-slate-700 text-white hover:bg-slate-800'
                        }`}
                        title="Click to toggle publish/draft"
                      >
                        {post.status}
                      </button>
                    </div>

                    {/* Metadata Strip */}
                    <div className="absolute bottom-2.5 left-3 right-3 flex items-center justify-between text-white text-[10px] font-medium">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3 h-3 text-sky-400" />
                        <span>{post.publishedAt}</span>
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-3 h-3 text-sky-400" />
                        <span>{post.readTime}</span>
                      </span>
                    </div>
                  </div>

                  {/* Body Content */}
                  <div className="p-5 space-y-2">
                    <h3 className="font-urbanist font-black text-base text-slate-900 uppercase tracking-tight line-clamp-2 group-hover:text-[#0EA5E9] transition-colors">
                      {post.title}
                    </h3>

                    {post.subtitle && (
                      <p className="font-bold text-[10px] uppercase tracking-wider text-slate-700 line-clamp-1">
                        {post.subtitle}
                      </p>
                    )}

                    <p className="text-xs text-slate-500 leading-relaxed font-normal line-clamp-3">
                      {post.excerpt}
                    </p>

                    {/* Tags */}
                    <div className="flex flex-wrap items-center gap-1 pt-2">
                      {(post.tags || []).slice(0, 4).map((t, tIdx) => (
                        <span
                          key={tIdx}
                          className="px-2 py-0.5 rounded-md bg-slate-100 text-slate-600 text-[10px] font-medium border border-slate-200"
                        >
                          #{t}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Card Actions Footer */}
                <div className="px-5 pb-5 pt-2 border-t border-slate-100 flex items-center justify-between gap-2">
                  <button
                    type="button"
                    onClick={() => handleOpenEditModal(post)}
                    className="flex-1 py-2 rounded-xl bg-[#1E3A5F] hover:bg-[#2D5D86] text-white font-bold text-xs flex items-center justify-center gap-1.5 transition-all cursor-pointer shadow-xs"
                  >
                    <Edit3 className="w-3.5 h-3.5 text-sky-300" />
                    <span>Edit Post</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => handleDuplicatePost(post)}
                    className="p-2 rounded-xl border border-slate-200 hover:bg-slate-100 text-slate-600 transition-all cursor-pointer"
                    title="Duplicate post"
                  >
                    <Copy className="w-3.5 h-3.5" />
                  </button>

                  {onPreviewBlog && (
                    <button
                      type="button"
                      onClick={() => onPreviewBlog(post.slug)}
                      className="p-2 rounded-xl border border-slate-200 hover:bg-slate-100 text-[#0EA5E9] transition-all cursor-pointer"
                      title="View on visitor site"
                    >
                      <Eye className="w-3.5 h-3.5" />
                    </button>
                  )}

                  <button
                    type="button"
                    onClick={() => handleDeletePost(post.id, post.title)}
                    className="p-2 rounded-xl border border-slate-200 hover:bg-red-50 text-slate-400 hover:text-red-600 transition-all cursor-pointer"
                    title="Delete post"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>

      {/* =========================================================================
          BLOG POST EDITOR MODAL
         ========================================================================= */}
      {editingPost && (
        <div className="fixed inset-0 z-50 bg-slate-900/70 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 overflow-y-auto animate-fade-in">
          <div className="bg-white rounded-3xl border border-[#BCD5E6] shadow-2xl w-full max-w-4xl max-h-[92vh] flex flex-col overflow-hidden animate-scale-in">
            {/* Modal Header */}
            <div className="px-6 py-4 bg-[#1E3A5F] text-white flex items-center justify-between shrink-0">
              <div className="flex items-center gap-2">
                <BookOpen className="w-5 h-5 text-sky-400" />
                <h3 className="font-urbanist font-black text-lg tracking-tight">
                  {isCreatingNew ? 'Create New Blog Post' : `Edit: ${formData.title}`}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setEditingPost(null)}
                className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-all cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Modal Body (Scrollable form) */}
            <div className="p-6 overflow-y-auto space-y-5 text-xs">
              {/* Title & Subtitle */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="font-bold text-slate-700">Article Title *</label>
                  <input
                    type="text"
                    value={formData.title || ''}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    placeholder="e.g., Architecting 25,000+ SKU Variant Matrices"
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs font-semibold focus:border-[#0EA5E9] focus:outline-hidden"
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-bold text-slate-700">Subtitle / Tagline</label>
                  <input
                    type="text"
                    value={formData.subtitle || ''}
                    onChange={(e) => setFormData({ ...formData, subtitle: e.target.value })}
                    placeholder="e.g., Technical Guide for Multi-Channel E-Commerce"
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs font-semibold focus:border-[#0EA5E9] focus:outline-hidden"
                  />
                </div>
              </div>

              {/* URL Slug & Category */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <div className="flex items-center justify-between">
                    <label className="font-bold text-slate-700">URL Slug</label>
                    <button
                      type="button"
                      onClick={() => {
                        if (formData.title) {
                          const s = formData.title
                            .toLowerCase()
                            .replace(/[^a-z0-9]+/g, '-')
                            .replace(/(^-|-$)+/g, '');
                          setFormData({ ...formData, slug: s });
                        }
                      }}
                      className="text-[10px] text-[#0EA5E9] hover:underline font-bold"
                    >
                      Auto-generate from title
                    </button>
                  </div>
                  <input
                    type="text"
                    value={formData.slug || ''}
                    onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                    placeholder="e.g., architecting-sku-variant-matrices"
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 font-mono text-xs focus:border-[#0EA5E9] focus:outline-hidden"
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-bold text-slate-700">Category</label>
                  <div className="flex gap-2">
                    <select
                      value={formData.category || 'DTC Architecture'}
                      onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs font-semibold focus:border-[#0EA5E9] focus:outline-hidden bg-white"
                    >
                      {PRESET_CATEGORIES.map((cat) => (
                        <option key={cat} value={cat}>
                          {cat}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>

              {/* Cover Image URL + Upload */}
              <div className="space-y-2 p-4 rounded-2xl bg-slate-50 border border-slate-200">
                <UniversalImageUploader
                  label="Article Cover Image"
                  helperText="Drag & drop image file, upload from device, or choose from Media Gallery."
                  value={formData.coverImage}
                  onChange={(url) => setFormData((prev) => ({ ...prev, coverImage: url }))}
                  onRemove={() => setFormData((prev) => ({ ...prev, coverImage: '' }))}
                  aspectRatio="video"
                />

                {/* Preset suggestions */}
                <div className="flex items-center gap-2 pt-1 flex-wrap">
                  <span className="text-[10.5px] text-slate-400 font-semibold">Presets:</span>
                  {SAMPLE_COVER_IMAGES.map((preset, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => setFormData({ ...formData, coverImage: preset.url })}
                      className="px-2 py-0.5 rounded-md bg-white hover:bg-slate-100 border border-slate-200 text-[10px] font-medium text-slate-600 transition-all cursor-pointer"
                    >
                      {preset.label}
                    </button>
                  ))}
                </div>

                {formData.coverImage ? (
                  <div className="mt-2 w-full h-36 rounded-xl overflow-hidden bg-slate-900 border border-slate-200 relative group">
                    <img
                      src={formData.coverImage}
                      alt="Cover Preview"
                      className="w-full h-full object-cover"
                    />
                    <button
                      type="button"
                      onClick={() => setFormData({ ...formData, coverImage: '' })}
                      className="absolute top-2 right-2 px-2.5 py-1 rounded-lg bg-red-600/90 hover:bg-red-700 text-white text-[10.5px] font-bold shadow-md cursor-pointer transition-all"
                    >
                      Remove Cover
                    </button>
                  </div>
                ) : (
                  <div
                    onClick={() => {
                      const input = document.querySelector('input[type="file"][accept="image/*"]') as HTMLInputElement;
                      input?.click();
                    }}
                    className={`mt-2 w-full h-24 rounded-xl border-2 border-dashed flex flex-col items-center justify-center cursor-pointer transition-all ${
                      isDraggingCover
                        ? 'border-[#0EA5E9] bg-sky-100/70'
                        : 'border-slate-300 bg-white/70 hover:border-slate-400 hover:bg-white'
                    }`}
                  >
                    <Upload className="w-5 h-5 text-slate-400 mb-1" />
                    <span className="text-[11px] font-bold text-slate-600">
                      Drag and drop cover photo here
                    </span>
                    <span className="text-[9.5px] text-slate-400">
                      or click to select an image from your device
                    </span>
                  </div>
                )}
              </div>

              {/* Excerpt / Summary */}
              <div className="space-y-1">
                <label className="font-bold text-slate-700">Excerpt / Brief Summary *</label>
                <textarea
                  rows={2}
                  value={formData.excerpt || ''}
                  onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
                  placeholder="A concise 1-2 sentence overview of what the reader will learn."
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs font-normal focus:border-[#0EA5E9] focus:outline-hidden leading-relaxed"
                />
              </div>

              {/* Full Content (Markdown Body) */}
              <div className="space-y-1">
                <div className="flex items-center justify-between">
                  <label className="font-bold text-slate-700 flex items-center gap-1.5">
                    <FileText className="w-3.5 h-3.5 text-slate-500" />
                    <span>Article Body (Markdown Supported) *</span>
                  </label>
                  <span className="text-[10px] text-slate-400">
                    Supports ### Headers, - Bullets, **Bold**
                  </span>
                </div>
                <textarea
                  rows={8}
                  value={formData.content || ''}
                  onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                  placeholder="Write the full technical breakdown or case study here..."
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 font-mono text-xs focus:border-[#0EA5E9] focus:outline-hidden leading-relaxed"
                />
              </div>

              {/* Tags, Read Time & Featured */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
                {/* Read Time */}
                <div className="space-y-1">
                  <label className="font-bold text-slate-700">Read Time</label>
                  <input
                    type="text"
                    value={formData.readTime || '5 min read'}
                    onChange={(e) => setFormData({ ...formData, readTime: e.target.value })}
                    placeholder="e.g., 6 min read"
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs font-semibold focus:border-[#0EA5E9] focus:outline-hidden"
                  />
                </div>

                {/* Status */}
                <div className="space-y-1">
                  <label className="font-bold text-slate-700">Publication Status</label>
                  <select
                    value={formData.status || 'published'}
                    onChange={(e) =>
                      setFormData({ ...formData, status: e.target.value as 'published' | 'draft' })
                    }
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs font-semibold focus:border-[#0EA5E9] focus:outline-hidden bg-white"
                  >
                    <option value="published">Published (Visible to Visitors)</option>
                    <option value="draft">Draft (Hidden)</option>
                  </select>
                </div>

                {/* Featured Toggle */}
                <div className="space-y-1 flex flex-col justify-end pb-1">
                  <label className="flex items-center gap-2 cursor-pointer select-none">
                    <input
                      type="checkbox"
                      checked={!!formData.featured}
                      onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
                      className="w-4 h-4 rounded text-[#0EA5E9] focus:ring-[#0EA5E9]"
                    />
                    <span className="font-bold text-slate-700">Featured Article</span>
                  </label>
                </div>
              </div>

              {/* Tags Section */}
              <div className="space-y-1 pt-2">
                <label className="font-bold text-slate-700">Tags</label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={tagInput}
                    onChange={(e) => setTagInput(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        e.preventDefault();
                        handleAddTag();
                      }
                    }}
                    placeholder="Add a tag (e.g. Shopify Plus, EDI, React) and press Enter"
                    className="flex-1 px-3 py-1.5 rounded-xl border border-slate-300 text-xs focus:border-[#0EA5E9] focus:outline-hidden"
                  />
                  <button
                    type="button"
                    onClick={handleAddTag}
                    className="px-3 py-1.5 rounded-xl bg-slate-200 hover:bg-slate-300 font-bold text-xs cursor-pointer"
                  >
                    Add Tag
                  </button>
                </div>

                <div className="flex flex-wrap gap-1.5 pt-1.5">
                  {(formData.tags || []).map((t, idx) => (
                    <span
                      key={idx}
                      className="px-2.5 py-1 rounded-lg bg-sky-50 text-sky-800 text-xs font-bold border border-sky-200 flex items-center gap-1.5"
                    >
                      <span>#{t}</span>
                      <button
                        type="button"
                        onClick={() => handleRemoveTag(t)}
                        className="text-sky-600 hover:text-red-600 cursor-pointer"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="px-6 py-4 bg-slate-100 border-t border-slate-200 flex items-center justify-between shrink-0">
              <button
                type="button"
                onClick={() => setEditingPost(null)}
                className="px-4 py-2 rounded-xl border border-slate-300 hover:bg-white text-slate-700 font-bold text-xs transition-all cursor-pointer"
              >
                Cancel
              </button>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={handleSavePost}
                  className="px-6 py-2.5 rounded-xl bg-[#0EA5E9] hover:bg-[#0284C7] text-white font-extrabold text-xs shadow-md transition-all hover:scale-105 cursor-pointer flex items-center gap-1.5"
                >
                  <Check className="w-4 h-4" />
                  <span>{isCreatingNew ? 'Publish Article' : 'Save Changes'}</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
