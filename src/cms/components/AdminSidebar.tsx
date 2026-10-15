import React from 'react';
import {
  LayoutDashboard,
  Layers,
  FileText,
  Sparkles,
  Menu,
  Sliders,
  PanelTop,
  PanelBottom,
  MousePointerClick,
  PhoneCall,
  Image as ImageIcon,
  Settings,
  CloudUpload,
  LogOut,
  ExternalLink,
  ChevronRight,
  ShieldCheck,
  CheckCircle2,
} from 'lucide-react';

export type AdminActiveSection =
  | { type: 'dashboard' }
  | { type: 'page'; slug: string }
  | { type: 'global'; key: 'navigation' | 'header' | 'footer' | 'buttons' | 'contact' | 'settings' }
  | { type: 'media' }
  | { type: 'publishing' };

interface AdminSidebarProps {
  activeSection: AdminActiveSection;
  onSelectSection: (section: AdminActiveSection) => void;
  onLogout: () => void;
  onReturnToHome: () => void;
  pageCount: number;
}

export const AdminSidebar: React.FC<AdminSidebarProps> = ({
  activeSection,
  onSelectSection,
  onLogout,
  onReturnToHome,
  pageCount,
}) => {
  const isPageActive = (slug: string) =>
    activeSection.type === 'page' && activeSection.slug === slug;

  const isGlobalActive = (key: string) =>
    activeSection.type === 'global' && activeSection.key === key;

  return (
    <aside className="w-64 sm:w-72 bg-[#1E3A5F] text-white flex flex-col h-full shrink-0 border-r border-[#2D5D86] select-none font-inter">
      {/* Brand Header */}
      <div className="p-4 sm:p-5 border-b border-white/10 bg-[#162C47]">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-gradient-to-tr from-[#0EA5E9] to-[#38BDF8] flex items-center justify-center font-urbanist font-black text-sm text-[#1E3A5F] shadow-md">
              R
            </div>
            <div>
              <h2 className="font-urbanist font-extrabold text-sm tracking-tight text-white leading-tight">
                RUSSELL ADMIN CMS
              </h2>
              <span className="text-[10px] font-semibold text-[#7DD3FC] tracking-wider uppercase">
                v1.0 • Enterprise
              </span>
            </div>
          </div>
        </div>

        {/* Live Status Pill */}
        <div className="mt-3 flex items-center gap-2 px-2.5 py-1 rounded-full bg-white/10 border border-white/10 text-[11px] font-semibold text-emerald-300">
          <span className="w-2 h-2 rounded-full bg-emerald-400 shadow-[0_0_8px_#34D399] animate-pulse" />
          <span>Live & Synced (100% Operational)</span>
        </div>
      </div>

      {/* Navigation Groups (Scrollable) */}
      <div className="flex-1 overflow-y-auto p-3 space-y-5 text-xs text-slate-200">
        {/* 1. Dashboard Overview */}
        <div>
          <button
            type="button"
            onClick={() => onSelectSection({ type: 'dashboard' })}
            className={`w-full px-3 py-2.5 rounded-xl font-bold flex items-center gap-2.5 transition-all cursor-pointer ${
              activeSection.type === 'dashboard'
                ? 'bg-[#0EA5E9] text-white shadow-md'
                : 'hover:bg-white/10 text-white/80 hover:text-white'
            }`}
          >
            <LayoutDashboard className="w-4 h-4 text-inherit" />
            <span>Dashboard</span>
          </button>
        </div>

        {/* 2. WEBSITE PAGES */}
        <div className="space-y-1">
          <div className="px-3 py-1 flex items-center justify-between text-[10px] font-extrabold uppercase tracking-wider text-slate-400">
            <span>Website Pages</span>
            <span className="px-1.5 py-0.2 rounded-full bg-white/10 text-[9px] font-mono">
              {pageCount}
            </span>
          </div>

          {[
            { slug: 'homepage', label: 'Homepage', icon: Layers },
            { slug: 'about', label: 'About', icon: FileText },
            { slug: 'work', label: 'Work', icon: Sparkles },
          ].map((page) => {
            const Icon = page.icon;
            const active = isPageActive(page.slug);
            return (
              <button
                key={page.slug}
                type="button"
                onClick={() => onSelectSection({ type: 'page', slug: page.slug })}
                className={`w-full px-3 py-2 rounded-xl font-medium flex items-center justify-between transition-all cursor-pointer ${
                  active
                    ? 'bg-[#0EA5E9] text-white font-bold shadow-md'
                    : 'hover:bg-white/10 text-slate-300 hover:text-white'
                }`}
              >
                <div className="flex items-center gap-2.5 truncate">
                  <Icon className="w-3.5 h-3.5 shrink-0" />
                  <span className="truncate">{page.label}</span>
                </div>
                {active && <span className="w-1.5 h-1.5 rounded-full bg-white" />}
              </button>
            );
          })}
        </div>

        {/* 3. NAVIGATION */}
        <div className="space-y-1">
          <div className="px-3 py-1 text-[10px] font-extrabold uppercase tracking-wider text-slate-400">
            Navigation
          </div>
          <button
            type="button"
            onClick={() => onSelectSection({ type: 'global', key: 'navigation' })}
            className={`w-full px-3 py-2 rounded-xl font-medium flex items-center gap-2.5 transition-all cursor-pointer ${
              isGlobalActive('navigation')
                ? 'bg-[#0EA5E9] text-white font-bold shadow-md'
                : 'hover:bg-white/10 text-slate-300 hover:text-white'
            }`}
          >
            <Menu className="w-3.5 h-3.5" />
            <span>Navigation Menu</span>
          </button>
        </div>

        {/* 4. GLOBAL CONTENT */}
        <div className="space-y-1">
          <div className="px-3 py-1 text-[10px] font-extrabold uppercase tracking-wider text-slate-400">
            Global Content
          </div>
          {[
            { key: 'header' as const, label: 'Header', icon: PanelTop },
            { key: 'footer' as const, label: 'Footer', icon: PanelBottom },
            { key: 'buttons' as const, label: 'Buttons / CTAs', icon: MousePointerClick },
            { key: 'contact' as const, label: 'Contact Information', icon: PhoneCall },
          ].map((item) => {
            const Icon = item.icon;
            const active = isGlobalActive(item.key);
            return (
              <button
                key={item.key}
                type="button"
                onClick={() => onSelectSection({ type: 'global', key: item.key })}
                className={`w-full px-3 py-2 rounded-xl font-medium flex items-center gap-2.5 transition-all cursor-pointer ${
                  active
                    ? 'bg-[#0EA5E9] text-white font-bold shadow-md'
                    : 'hover:bg-white/10 text-slate-300 hover:text-white'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{item.label}</span>
              </button>
            );
          })}
        </div>

        {/* 5. MEDIA */}
        <div className="space-y-1">
          <div className="px-3 py-1 text-[10px] font-extrabold uppercase tracking-wider text-slate-400">
            Media
          </div>
          <button
            type="button"
            onClick={() => onSelectSection({ type: 'media' })}
            className={`w-full px-3 py-2 rounded-xl font-medium flex items-center gap-2.5 transition-all cursor-pointer ${
              activeSection.type === 'media'
                ? 'bg-[#0EA5E9] text-white font-bold shadow-md'
                : 'hover:bg-white/10 text-slate-300 hover:text-white'
            }`}
          >
            <ImageIcon className="w-3.5 h-3.5" />
            <span>Media Library</span>
          </button>
        </div>

        {/* 6. SETTINGS & PUBLISHING */}
        <div className="space-y-1">
          <div className="px-3 py-1 text-[10px] font-extrabold uppercase tracking-wider text-slate-400">
            Settings
          </div>
          <button
            type="button"
            onClick={() => onSelectSection({ type: 'global', key: 'settings' })}
            className={`w-full px-3 py-2 rounded-xl font-medium flex items-center gap-2.5 transition-all cursor-pointer ${
              isGlobalActive('settings')
                ? 'bg-[#0EA5E9] text-white font-bold shadow-md'
                : 'hover:bg-white/10 text-slate-300 hover:text-white'
            }`}
          >
            <Settings className="w-3.5 h-3.5" />
            <span>Website Settings</span>
          </button>
          <button
            type="button"
            onClick={() => onSelectSection({ type: 'publishing' })}
            className={`w-full px-3 py-2 rounded-xl font-medium flex items-center gap-2.5 transition-all cursor-pointer ${
              activeSection.type === 'publishing'
                ? 'bg-[#0EA5E9] text-white font-bold shadow-md'
                : 'hover:bg-white/10 text-slate-300 hover:text-white'
            }`}
          >
            <CloudUpload className="w-3.5 h-3.5" />
            <span>Publishing & History</span>
          </button>
        </div>
      </div>

      {/* Sidebar Footer User Card & Logout */}
      <div className="p-3.5 border-t border-white/10 bg-[#162C47] space-y-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 min-w-0">
            <div className="w-8 h-8 rounded-full bg-[#0EA5E9] text-[#1E3A5F] font-black text-xs flex items-center justify-center shrink-0">
              RT
            </div>
            <div className="min-w-0">
              <span className="block font-bold text-xs text-white truncate">Russell Taga-an</span>
              <span className="block text-[10px] text-[#7DD3FC] truncate">Administrator</span>
            </div>
          </div>
          <button
            type="button"
            onClick={onLogout}
            title="Sign out of CMS"
            className="p-1.5 rounded-lg text-slate-400 hover:text-red-400 hover:bg-white/10 cursor-pointer transition-colors"
          >
            <LogOut className="w-4 h-4" />
          </button>
        </div>

        <button
          type="button"
          onClick={onReturnToHome}
          className="w-full py-1.5 px-2 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-[11px] font-semibold text-slate-300 hover:text-white flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
        >
          <span>Return to Portfolio</span>
          <ExternalLink className="w-3 h-3 text-[#7DD3FC]" />
        </button>
      </div>
    </aside>
  );
};
