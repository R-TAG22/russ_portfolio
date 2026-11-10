import React from 'react';
import {
  Globe,
  Clock,
  Layers,
  Image as ImageIcon,
  ArrowRight,
  FileText,
  Sparkles,
  CheckCircle2,
  ExternalLink,
  ShieldCheck,
  ChevronRight,
  Menu,
  Plus,
  RotateCw,
  Eye,
  EyeOff,
  BookOpen,
} from 'lucide-react';
import { PageSummary } from '../repositories/ContentRepository';

interface DashboardOverviewViewProps {
  pages: PageSummary[];
  mediaCount: number;
  lastPublishedTime: string;
  onSelectPage: (slug: string) => void;
  onSelectNavMenu: () => void;
  onOpenPublicSite: () => void;
  onOpenAddRotatingSite?: () => void;
  onOpenManageRotatingSites?: () => void;
  onToggleHidePage?: (slug: string) => void;
  isBlogHidden?: boolean;
  onToggleHideBlog?: () => void;
  onSelectBlogPage?: () => void;
}

export const DashboardOverviewView: React.FC<DashboardOverviewViewProps> = ({
  pages,
  mediaCount,
  lastPublishedTime,
  onSelectPage,
  onSelectNavMenu,
  onOpenPublicSite,
  onOpenAddRotatingSite,
  onOpenManageRotatingSites,
  onToggleHidePage,
  isBlogHidden = false,
  onToggleHideBlog,
  onSelectBlogPage,
}) => {
  const hiddenCount = pages.filter((p) => p.isHidden).length;
  const liveCount = pages.length - hiddenCount;
  const quickCards = [
    {
      id: 'rotating-sites',
      slug: 'homepage',
      title: 'Rotating Orbit Sites',
      category: 'Homepage Feature',
      description: 'Concentric orbiting store planets around Russell portrait with logo upload (drag & drop or Media Gallery) and live store links.',
      badge: 'Hero Orbit',
      icon: RotateCw,
      isOrbitAction: true,
    },
    {
      id: 'work',
      slug: 'work',
      title: 'Work Page',
      category: 'Client Portfolio',
      description: 'Filterable deployments: 25K+ SKU Matrix, Willow Bath, TikTok Shop 4.8★ SPS, and Proof of Work Gallery.',
      badge: 'Case Studies',
      icon: Sparkles,
    },
    {
      id: 'homepage',
      slug: 'homepage',
      title: 'Homepage',
      category: 'Primary Entry',
      description: 'Hero 3/5 + 2/5 layout, Profile Orbit with brand badges, and Client Tech Marquee.',
      badge: 'Core Hero',
      icon: Layers,
    },
    {
      id: 'about',
      slug: 'about',
      title: 'About',
      category: 'Executive Narrative',
      description: 'Profile Card, Executive Background, and Verified Career Milestones Timeline.',
      badge: 'Career History',
      icon: FileText,
    },
    {
      id: 'navigation',
      slug: 'navigation',
      title: 'Navigation Menu',
      category: 'Global Routing',
      description: 'Header link hierarchy, CTA booking button link, and top navigation ordering.',
      badge: 'Site Header',
      icon: Menu,
      isGlobalNav: true,
    },
    {
      id: 'blogs',
      slug: 'blogs',
      title: 'Blog & Articles',
      category: 'Technical Blueprints',
      description: 'Technical articles, DTC commerce blueprints, and variant management case studies for visitors.',
      badge: 'Insights',
      icon: BookOpen,
      isBlogAction: true,
    },
  ];

  return (
    <div className="w-full max-w-6xl mx-auto space-y-6 animate-fade-up">
      {/* Top Banner & Status Indicator */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-2 border-b border-[#BCD5E6]">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-xs font-bold text-emerald-800 mb-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_8px_#10B981] animate-pulse" />
            <span>Published & Live • Synced with Production</span>
          </div>
          <h1 className="font-urbanist font-extrabold text-2xl sm:text-3xl text-[#1E3A5F] tracking-tight">
            Website Overview
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Real-time management for storefronts, catalog architecture, and global site content.
          </p>
        </div>

        <button
          type="button"
          onClick={onOpenPublicSite}
          className="self-start sm:self-auto px-4 py-2 rounded-xl bg-white hover:bg-[#EFF6FB] border border-[#BCD5E6] font-bold text-xs text-[#1E3A5F] shadow-xs flex items-center gap-1.5 transition-all cursor-pointer"
        >
          <span>View Public Website</span>
          <ExternalLink className="w-3.5 h-3.5 text-[#0EA5E9]" />
        </button>
      </div>

      {/* Metrics Row (4 Cards) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Card 1: Website Status */}
        <div className="p-4 sm:p-5 rounded-2xl bg-white border-2 border-[#BCD5E6] shadow-xs flex flex-col justify-between">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400">
              Website Status
            </span>
            <div className="p-1.5 rounded-lg bg-emerald-50 text-emerald-600">
              <CheckCircle2 className="w-4 h-4" />
            </div>
          </div>
          <div>
            <div className="font-urbanist font-extrabold text-xl sm:text-2xl text-[#1E3A5F]">
              Published
            </div>
            <p className="mt-1 text-[11px] text-slate-500 leading-tight">
              The public website matches your CMS perfectly.
            </p>
          </div>
        </div>

        {/* Card 2: Last Published */}
        <div className="p-4 sm:p-5 rounded-2xl bg-white border-2 border-[#BCD5E6] shadow-xs flex flex-col justify-between">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400">
              Last Published
            </span>
            <div className="p-1.5 rounded-lg bg-sky-50 text-[#0EA5E9]">
              <Clock className="w-4 h-4" />
            </div>
          </div>
          <div>
            <div className="font-urbanist font-extrabold text-lg sm:text-xl text-[#1E3A5F] truncate">
              {lastPublishedTime || 'Just now'}
            </div>
            <p className="mt-1 text-[11px] text-slate-500 leading-tight">
              All public visitors currently see this release.
            </p>
          </div>
        </div>

        {/* Card 3: Active Pages */}
        <div className="p-4 sm:p-5 rounded-2xl bg-white border-2 border-[#BCD5E6] shadow-xs flex flex-col justify-between">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400">
              Active Pages
            </span>
            <div className="p-1.5 rounded-lg bg-[#EFF6FB] text-[#2D5D86]">
              <Layers className="w-4 h-4" />
            </div>
          </div>
          <div>
            <div className="font-urbanist font-extrabold text-xl sm:text-2xl text-[#1E3A5F]">
              {pages.length} Pages
            </div>
            <p className="mt-1 text-[11px] text-slate-500 leading-tight">
              {liveCount} Live • {hiddenCount} Hidden from public
            </p>
          </div>
        </div>

        {/* Card 4: Media Library */}
        <div className="p-4 sm:p-5 rounded-2xl bg-white border-2 border-[#BCD5E6] shadow-xs flex flex-col justify-between">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400">
              Media Assets
            </span>
            <div className="p-1.5 rounded-lg bg-purple-50 text-purple-600">
              <ImageIcon className="w-4 h-4" />
            </div>
          </div>
          <div>
            <div className="font-urbanist font-extrabold text-xl sm:text-2xl text-[#1E3A5F]">
              {mediaCount} Assets
            </div>
            <p className="mt-1 text-[11px] text-slate-500 leading-tight">
              High-res product cutouts and dashboard graphics.
            </p>
          </div>
        </div>
      </div>

      {/* Quick Launchpad Grid (6 Clickable Cards matching Reference Layout) */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <h3 className="font-urbanist font-extrabold text-base sm:text-lg text-[#1E3A5F] flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-[#0EA5E9]" />
            <span>Visual Block Editors & Quick Launchpad</span>
          </h3>
          <span className="text-xs text-slate-400 font-semibold">
            Click any card to open WPBakery Builder
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {quickCards.map((card) => {
            const Icon = card.icon;
            const isBlog = !!card.isBlogAction;
            const pageSummary = pages.find((p) => p.slug === card.slug);
            const isHidden = isBlog ? isBlogHidden : pageSummary?.isHidden;
            const isPage = (!card.isGlobalNav && !card.isOrbitAction) || isBlog;

            return (
              <div
                key={card.id}
                onClick={() => {
                  if (card.isGlobalNav) {
                    onSelectNavMenu();
                  } else if (card.isBlogAction) {
                    if (onSelectBlogPage) onSelectBlogPage();
                  } else {
                    onSelectPage(card.slug);
                  }
                }}
                className={`p-5 rounded-2xl bg-white border-2 hover:shadow-md transition-all cursor-pointer flex flex-col justify-between group ${
                  isPage && isHidden
                    ? 'border-amber-300 hover:border-amber-400 bg-amber-50/20'
                    : 'border-[#BCD5E6] hover:border-[#0EA5E9]'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-1.5 flex-wrap">
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-[#EFF6FB] text-[#0EA5E9] border border-[#BCD5E6]">
                        {card.badge}
                      </span>
                      {isPage && (
                        <span
                          className={`text-[10px] font-extrabold px-2 py-0.5 rounded-full border ${
                            isHidden
                              ? 'bg-amber-100 text-amber-800 border-amber-300'
                              : 'bg-emerald-100 text-emerald-800 border-emerald-300'
                          }`}
                        >
                          {isHidden ? 'Hidden' : 'Live'}
                        </span>
                      )}
                    </div>
                    <div className="p-2 rounded-xl bg-[#F8FAFC] group-hover:bg-[#0EA5E9] text-[#1E3A5F] group-hover:text-white transition-colors">
                      <Icon className="w-4 h-4" />
                    </div>
                  </div>
                  <h4 className="font-urbanist font-extrabold text-base text-[#1E3A5F] group-hover:text-[#0EA5E9] transition-colors">
                    {card.title}
                  </h4>
                  <p className="mt-1 text-xs text-slate-500 leading-relaxed">
                    {card.description}
                  </p>
                </div>

                {card.isOrbitAction ? (
                  <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between gap-2" onClick={(e) => e.stopPropagation()}>
                    <button
                      type="button"
                      onClick={() => onOpenAddRotatingSite ? onOpenAddRotatingSite() : onSelectPage('homepage')}
                      className="px-2.5 py-1 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-[11px] shadow-2xs flex items-center gap-1 cursor-pointer transition-all hover:scale-102"
                    >
                      <Plus className="w-3 h-3" />
                      <span>+ Add Site</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => onOpenManageRotatingSites ? onOpenManageRotatingSites() : onSelectPage('homepage')}
                      className="px-2.5 py-1 rounded-lg bg-[#1E3A5F] hover:bg-[#2D5D86] text-white font-bold text-[11px] shadow-2xs flex items-center gap-1 cursor-pointer transition-colors"
                    >
                      <Sparkles className="w-3 h-3 text-[#7DD3FC]" />
                      <span>Manage</span>
                    </button>
                  </div>
                ) : (
                  <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-[#0EA5E9]">
                    <div className="flex items-center gap-1">
                      <span>{card.isBlogAction ? 'Open Blog Manager' : 'Open WPBakery Editor'}</span>
                      <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </div>
                    {isPage && ((isBlog && onToggleHideBlog) || (!isBlog && onToggleHidePage)) && (
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          if (isBlog) {
                            if (onToggleHideBlog) onToggleHideBlog();
                          } else {
                            if (onToggleHidePage) onToggleHidePage(card.slug);
                          }
                        }}
                        className={`px-2 py-0.5 rounded-md text-[10px] font-bold border transition-colors cursor-pointer flex items-center gap-1 ${
                          isHidden
                            ? 'bg-amber-100 hover:bg-amber-200 text-amber-900 border-amber-300'
                            : 'bg-slate-100 hover:bg-slate-200 text-slate-600 border-slate-300'
                        }`}
                        title={
                          isHidden
                            ? `Click to make ${card.title} publicly visible`
                            : `Click to hide ${card.title} from public visitors`
                        }
                      >
                        {isHidden ? (
                          <>
                            <Eye className="w-3 h-3 text-emerald-600" />
                            <span>Unhide</span>
                          </>
                        ) : (
                          <>
                            <EyeOff className="w-3 h-3 text-amber-600" />
                            <span>Hide</span>
                          </>
                        )}
                      </button>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
