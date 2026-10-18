import React, { useState, useEffect, useMemo } from 'react';
import {
  Search,
  Calendar,
  Clock,
  ArrowRight,
  Share2,
  Check,
  X,
  BookOpen,
  Tag,
  Sparkles,
  ChevronRight,
  ArrowLeft,
  ExternalLink,
  Flame,
  Layers,
} from 'lucide-react';
import { BlogPost } from '../cms/types/schema';
import { contentService } from '../cms/services/ContentServiceFactory';

interface BlogPageProps {
  onOpenHire: () => void;
  onNavigateToWork?: () => void;
}

export const BlogPage: React.FC<BlogPageProps> = ({ onOpenHire, onNavigateToWork }) => {
  const [blogs, setBlogs] = useState<BlogPost[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);
  const [copiedLink, setCopiedLink] = useState(false);

  // Load blog posts from storage
  useEffect(() => {
    loadBlogs();
  }, []);

  const loadBlogs = async () => {
    setIsLoading(true);
    try {
      const posts = await contentService.getBlogs();
      setBlogs(posts || []);
    } catch (err) {
      console.error('Failed to load blog posts', err);
    } finally {
      setIsLoading(false);
    }
  };

  // Derive categories
  const categories = useMemo(() => {
    const set = new Set<string>();
    blogs.forEach((b) => {
      if (b.category) set.add(b.category);
    });
    return ['All', ...Array.from(set)];
  }, [blogs]);

  // Filter posts based on category and search query
  const filteredPosts = useMemo(() => {
    return blogs.filter((post) => {
      if (post.status === 'draft') return false;

      const matchesCat = activeCategory === 'All' || post.category === activeCategory;
      if (!matchesCat) return false;

      if (!searchQuery.trim()) return true;
      const q = searchQuery.toLowerCase();
      const matchTitle = post.title.toLowerCase().includes(q);
      const matchSubtitle = (post.subtitle || '').toLowerCase().includes(q);
      const matchExcerpt = post.excerpt.toLowerCase().includes(q);
      const matchTags = (post.tags || []).some((t) => t.toLowerCase().includes(q));

      return matchTitle || matchSubtitle || matchExcerpt || matchTags;
    });
  }, [blogs, activeCategory, searchQuery]);

  // Featured post
  const featuredPost = useMemo(() => {
    return filteredPosts.find((p) => p.featured) || filteredPosts[0] || null;
  }, [filteredPosts]);

  // Standard posts (excluding the featured one if showing all)
  const gridPosts = useMemo(() => {
    if (activeCategory === 'All' && !searchQuery.trim() && featuredPost) {
      return filteredPosts.filter((p) => p.id !== featuredPost.id);
    }
    return filteredPosts;
  }, [filteredPosts, featuredPost, activeCategory, searchQuery]);

  const handleCopyLink = (post: BlogPost) => {
    const url = `${window.location.origin}${window.location.pathname}#blog-${post.slug}`;
    navigator.clipboard.writeText(url).then(() => {
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2500);
    });
  };

  return (
    <main className="w-full flex-1 max-w-[1920px] mx-auto px-4 sm:px-8 lg:px-16 py-6 sm:py-10 animate-fade-in font-inter text-[#1E3A5F]">
      {/* =========================================================================
          PAGE HERO & SEARCH SECTION
         ========================================================================= */}
      <section className="mb-10 sm:mb-14 text-center sm:text-left">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 pb-6 border-b border-[#BCD5E6]/70">
          <div className="max-w-2xl space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-50 border border-[#BCD5E6] text-[11px] font-bold text-[#0284C7] shadow-2xs">
              <Sparkles className="w-3.5 h-3.5 text-[#0EA5E9]" />
              <span>Engineering Log & Systems Blueprints</span>
            </div>
            <h1 className="font-urbanist font-black text-3xl sm:text-4xl lg:text-5xl text-[#1E3A5F] tracking-tight leading-tight">
              E-Commerce & Catalog Architecture Insights
            </h1>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed max-w-xl">
              Battle-tested architectural breakdowns: managing 25,000+ SKU variant matrices, multi-channel inventory pipelines, and high-conversion e-commerce operations.
            </p>
          </div>

          {/* Search Input */}
          <div className="w-full sm:w-80 relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search architecture, Shopify, EDI..."
              className="w-full pl-10 pr-4 py-2.5 rounded-2xl bg-white border border-[#BCD5E6] text-xs font-semibold text-[#1E3A5F] shadow-xs focus:outline-hidden focus:border-[#0EA5E9] focus:ring-2 focus:ring-[#0EA5E9]/20 transition-all placeholder:text-slate-400"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 p-1 cursor-pointer"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>

        {/* Category Pills Bar (Horizontal Scrollable on Mobile) */}
        <div className="flex items-center gap-2 pt-4 overflow-x-auto pb-2 scrollbar-none -mx-4 px-4 sm:mx-0 sm:px-0">
          {categories.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all shrink-0 cursor-pointer ${
                activeCategory === cat
                  ? 'bg-[#1E3A5F] text-white shadow-xs'
                  : 'bg-white hover:bg-slate-100 text-slate-600 border border-[#BCD5E6]'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </section>

      {/* =========================================================================
          FEATURED POST HERO BANNER (When viewing 'All' and no search)
         ========================================================================= */}
      {featuredPost && activeCategory === 'All' && !searchQuery.trim() && (
        <section className="mb-12">
          <div
            onClick={() => setSelectedPost(featuredPost)}
            className="group rounded-3xl bg-white border border-[#BCD5E6] shadow-md hover:shadow-2xl transition-all duration-300 overflow-hidden cursor-pointer grid grid-cols-1 lg:grid-cols-12 gap-0"
          >
            {/* Image Side (6 cols) */}
            <div className="lg:col-span-6 relative aspect-[16/10] lg:aspect-auto overflow-hidden bg-slate-900">
              <img
                src={featuredPost.coverImage}
                alt={featuredPost.title}
                className="w-full h-full object-cover group-hover:scale-104 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent lg:hidden" />
              
              <div className="absolute top-4 left-4 z-10 flex items-center gap-2">
                <span className="px-3 py-1 rounded-full bg-amber-400 text-slate-950 text-[10px] font-black uppercase tracking-wider shadow-md flex items-center gap-1">
                  <Flame className="w-3.5 h-3.5 text-slate-950 fill-slate-950" />
                  <span>Featured Blueprint</span>
                </span>
                <span className="px-2.5 py-1 rounded-full bg-white/90 backdrop-blur-xs text-slate-800 text-[10px] font-bold shadow-sm">
                  {featuredPost.category}
                </span>
              </div>
            </div>

            {/* Content Side (6 cols) */}
            <div className="lg:col-span-6 p-6 sm:p-8 lg:p-10 flex flex-col justify-between space-y-6">
              <div className="space-y-3.5">
                <div className="flex items-center gap-3 text-xs text-slate-500 font-semibold">
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5 text-slate-400" />
                    <span>{featuredPost.publishedAt}</span>
                  </span>
                  <span>•</span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5 text-slate-400" />
                    <span>{featuredPost.readTime}</span>
                  </span>
                </div>

                <h2 className="font-urbanist font-black text-2xl sm:text-3xl text-[#1E3A5F] group-hover:text-[#0EA5E9] transition-colors leading-tight">
                  {featuredPost.title}
                </h2>

                {featuredPost.subtitle && (
                  <p className="text-xs font-bold uppercase tracking-wider text-slate-500">
                    {featuredPost.subtitle}
                  </p>
                )}

                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  {featuredPost.excerpt}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap items-center gap-1.5 pt-1">
                  {(featuredPost.tags || []).map((t, tIdx) => (
                    <span
                      key={tIdx}
                      className="px-2.5 py-0.5 rounded-lg bg-sky-50 text-[#0284C7] text-[10.5px] font-bold border border-sky-100"
                    >
                      #{t}
                    </span>
                  ))}
                </div>
              </div>

              {/* Author & Action */}
              <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <img
                    src={featuredPost.authorAvatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=256&q=80'}
                    alt={featuredPost.authorName}
                    className="w-10 h-10 rounded-full object-cover border border-slate-200"
                  />
                  <div>
                    <h4 className="font-bold text-xs text-[#1E3A5F]">{featuredPost.authorName}</h4>
                    <p className="text-[10px] text-slate-500">{featuredPost.authorRole || 'Operations Architect'}</p>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedPost(featuredPost);
                  }}
                  className="px-4 py-2 rounded-xl bg-[#1E3A5F] hover:bg-[#2D5D86] text-white font-extrabold text-xs flex items-center gap-1.5 transition-all shadow-xs cursor-pointer group-hover:translate-x-1"
                >
                  <span>Read Blueprint</span>
                  <ArrowRight className="w-3.5 h-3.5 text-[#38BDF8]" />
                </button>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* =========================================================================
          POSTS GRID
         ========================================================================= */}
      <section className="space-y-6">
        <div className="flex items-center justify-between pb-2 border-b border-slate-200">
          <h3 className="font-urbanist font-extrabold text-lg text-[#1E3A5F]">
            {activeCategory === 'All' ? 'Latest Publications' : `${activeCategory} Articles`} ({gridPosts.length})
          </h3>
          {searchQuery && (
            <span className="text-xs text-slate-500">
              Filtering by: <strong>"{searchQuery}"</strong>
            </span>
          )}
        </div>

        {gridPosts.length === 0 ? (
          <div className="p-12 text-center rounded-3xl bg-white border border-dashed border-[#BCD5E6] space-y-3">
            <BookOpen className="w-10 h-10 text-slate-300 mx-auto" />
            <h4 className="font-bold text-sm text-slate-700">No matching articles found</h4>
            <p className="text-xs text-slate-400 max-w-sm mx-auto">
              Try adjusting your search query or selecting a different category.
            </p>
            <button
              type="button"
              onClick={() => {
                setActiveCategory('All');
                setSearchQuery('');
              }}
              className="px-4 py-2 rounded-xl bg-[#1E3A5F] text-white text-xs font-bold cursor-pointer"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {gridPosts.map((post) => (
              <article
                key={post.id}
                onClick={() => setSelectedPost(post)}
                className="group rounded-3xl bg-white border border-[#BCD5E6] shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col justify-between overflow-hidden cursor-pointer"
              >
                <div>
                  {/* Card Thumbnail */}
                  <div className="relative aspect-[16/10] w-full overflow-hidden bg-slate-900 select-none">
                    <img
                      src={post.coverImage}
                      alt={post.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent pointer-events-none" />
                    
                    <div className="absolute top-3 left-3">
                      <span className="px-2.5 py-1 rounded-full bg-white/95 backdrop-blur-xs text-slate-900 text-[9.5px] font-black uppercase tracking-wider border border-slate-200 shadow-sm">
                        {post.category}
                      </span>
                    </div>

                    <div className="absolute bottom-2.5 right-3 text-[10px] font-bold text-white/90 flex items-center gap-1 drop-shadow-sm">
                      <Clock className="w-3 h-3 text-[#38BDF8]" />
                      <span>{post.readTime}</span>
                    </div>
                  </div>

                  {/* Card Body */}
                  <div className="p-5 sm:p-6 space-y-2.5">
                    <div className="flex items-center gap-2 text-[11px] text-slate-400 font-medium">
                      <span>{post.publishedAt}</span>
                    </div>

                    <h4 className="font-urbanist font-black text-lg text-[#1E3A5F] group-hover:text-[#0EA5E9] transition-colors leading-snug">
                      {post.title}
                    </h4>

                    <p className="text-xs text-slate-600 leading-relaxed line-clamp-3">
                      {post.excerpt}
                    </p>

                    {/* Tag Pills */}
                    <div className="flex flex-wrap items-center gap-1.5 pt-2">
                      {(post.tags || []).slice(0, 3).map((tag, tIdx) => (
                        <span
                          key={tIdx}
                          className="px-2 py-0.5 rounded-md bg-slate-100 text-slate-600 text-[10px] font-semibold border border-slate-200"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Card Footer */}
                <div className="px-5 pb-5 pt-2 border-t border-slate-100 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <img
                      src={post.authorAvatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=256&q=80'}
                      alt={post.authorName}
                      className="w-7 h-7 rounded-full object-cover border border-slate-200"
                    />
                    <span className="text-xs font-bold text-slate-700">{post.authorName}</span>
                  </div>

                  <span className="text-xs font-bold text-[#0EA5E9] flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                    <span>Read Article</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </article>
            ))}
          </div>
        )}
      </section>

      {/* =========================================================================
          FULL ARTICLE READER MODAL
         ========================================================================= */}
      {selectedPost && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 bg-[#1E3A5F]/60 backdrop-blur-md flex items-center justify-center p-2 sm:p-4 md:p-6 overflow-y-auto animate-fade-in"
          onClick={() => setSelectedPost(null)}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-4xl max-h-[92vh] bg-white rounded-3xl shadow-2xl border border-[#BCD5E6] flex flex-col overflow-hidden animate-scale-up"
          >
            {/* Modal Top Action Bar */}
            <div className="px-6 py-4 bg-slate-50 border-b border-slate-200 flex items-center justify-between shrink-0">
              <button
                type="button"
                onClick={() => setSelectedPost(null)}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white border border-slate-200 hover:bg-slate-100 text-xs font-bold text-slate-700 transition-colors cursor-pointer"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Back to Articles</span>
              </button>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => handleCopyLink(selectedPost)}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white border border-slate-200 hover:bg-slate-100 text-xs font-bold text-slate-700 transition-colors cursor-pointer"
                  title="Copy direct link to article"
                >
                  {copiedLink ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-600" />
                      <span className="text-emerald-700">Link Copied!</span>
                    </>
                  ) : (
                    <>
                      <Share2 className="w-3.5 h-3.5 text-slate-500" />
                      <span>Share</span>
                    </>
                  )}
                </button>

                <button
                  type="button"
                  onClick={() => setSelectedPost(null)}
                  className="p-1.5 rounded-xl bg-white border border-slate-200 hover:bg-slate-200 text-slate-500 hover:text-slate-800 transition-colors cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Scrollable Reader Body */}
            <div className="flex-1 overflow-y-auto p-6 sm:p-10 lg:p-12 space-y-8 font-inter">
              {/* Header Meta */}
              <div className="space-y-4">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="px-3 py-1 rounded-full bg-[#1E3A5F] text-white text-[10px] font-black uppercase tracking-wider">
                    {selectedPost.category}
                  </span>
                  <span className="text-xs text-slate-400">•</span>
                  <span className="text-xs text-slate-500 font-semibold">{selectedPost.publishedAt}</span>
                  <span className="text-xs text-slate-400">•</span>
                  <span className="text-xs text-slate-500 font-semibold flex items-center gap-1">
                    <Clock className="w-3 h-3 text-slate-400" />
                    <span>{selectedPost.readTime}</span>
                  </span>
                </div>

                <h1 className="font-urbanist font-black text-2xl sm:text-3xl lg:text-4xl text-[#1E3A5F] tracking-tight leading-tight">
                  {selectedPost.title}
                </h1>

                {selectedPost.subtitle && (
                  <p className="text-sm font-semibold uppercase tracking-wider text-[#0EA5E9]">
                    {selectedPost.subtitle}
                  </p>
                )}

                {/* Author Card */}
                <div className="p-4 rounded-2xl bg-[#F8FAFC] border border-slate-200 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <img
                      src={selectedPost.authorAvatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=256&q=80'}
                      alt={selectedPost.authorName}
                      className="w-11 h-11 rounded-full object-cover border-2 border-white shadow-xs"
                    />
                    <div>
                      <h4 className="font-bold text-sm text-[#1E3A5F]">{selectedPost.authorName}</h4>
                      <p className="text-xs text-slate-500">{selectedPost.authorRole || 'Lead Operations & Catalog Architect'}</p>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => {
                      setSelectedPost(null);
                      onOpenHire();
                    }}
                    className="hidden sm:inline-flex px-3.5 py-1.5 rounded-xl bg-[#143020] hover:bg-[#1E442D] text-white text-xs font-bold transition-all shadow-xs cursor-pointer"
                  >
                    Work With Russell
                  </button>
                </div>
              </div>

              {/* Cover Image */}
              <div className="relative aspect-[16/9] w-full rounded-2xl overflow-hidden bg-slate-900 border border-slate-200 shadow-sm">
                <img
                  src={selectedPost.coverImage}
                  alt={selectedPost.title}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Executive Summary Callout */}
              <div className="p-5 rounded-2xl bg-sky-50/80 border-l-4 border-[#0EA5E9] text-xs sm:text-sm text-slate-700 leading-relaxed">
                <strong className="block text-[#0284C7] font-urbanist font-extrabold text-sm mb-1 uppercase tracking-wider">
                  Executive Briefing:
                </strong>
                {selectedPost.excerpt}
              </div>

              {/* Formatted Content */}
              <div className="prose prose-slate max-w-none text-sm sm:text-base leading-relaxed text-slate-700 space-y-4">
                {selectedPost.content.split('\n\n').map((paragraph, pIdx) => {
                  if (paragraph.startsWith('### ')) {
                    return (
                      <h3
                        key={pIdx}
                        className="font-urbanist font-extrabold text-xl sm:text-2xl text-[#1E3A5F] pt-4 pb-1 border-b border-slate-200"
                      >
                        {paragraph.replace('### ', '')}
                      </h3>
                    );
                  }
                  if (paragraph.startsWith('> ')) {
                    return (
                      <blockquote
                        key={pIdx}
                        className="p-4 my-3 rounded-xl bg-slate-100 border-l-4 border-slate-400 italic text-slate-800 text-sm"
                      >
                        {paragraph.replace('> ', '')}
                      </blockquote>
                    );
                  }
                  if (paragraph.startsWith('- ') || paragraph.startsWith('* ')) {
                    const items = paragraph.split('\n').map((item) => item.replace(/^[-*]\s*/, ''));
                    return (
                      <ul key={pIdx} className="list-disc pl-5 space-y-1.5 text-slate-700 text-sm">
                        {items.map((item, iIdx) => (
                          <li key={iIdx}>{item}</li>
                        ))}
                      </ul>
                    );
                  }
                  return (
                    <p key={pIdx} className="text-slate-700 leading-relaxed text-sm sm:text-base">
                      {paragraph}
                    </p>
                  );
                })}
              </div>

              {/* Tags & Architecture Scope Footer */}
              <div className="pt-6 border-t border-slate-200 flex flex-wrap items-center justify-between gap-4">
                <div className="flex flex-wrap items-center gap-1.5">
                  <span className="text-xs font-bold text-slate-400 mr-1">Architecture Tags:</span>
                  {(selectedPost.tags || []).map((tag, tIdx) => (
                    <span
                      key={tIdx}
                      className="px-2.5 py-1 rounded-lg bg-slate-100 text-slate-700 text-xs font-semibold border border-slate-200"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>

                <button
                  type="button"
                  onClick={() => {
                    setSelectedPost(null);
                    onOpenHire();
                  }}
                  className="px-5 py-2.5 rounded-full bg-[#143020] hover:bg-[#1E442D] text-white font-extrabold text-xs transition-all shadow-md flex items-center gap-2 cursor-pointer"
                >
                  <span>Discuss Your Project</span>
                  <ArrowRight className="w-3.5 h-3.5 text-[#4ADE80]" />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </main>
  );
};
