import React, { useState } from 'react';
import {
  Menu,
  Sliders,
  Save,
  CheckCircle2,
  Plus,
  Trash2,
  ExternalLink,
  ShieldCheck,
  Mail,
  Phone,
  MapPin,
  Clock,
  Globe,
  ArrowRight,
  Layers,
  RotateCcw,
  Sparkles,
  ArrowUp,
  ArrowDown,
  Eye,
  EyeOff,
  Share2,
  Upload,
  Image as ImageIcon,
  X,
} from 'lucide-react';
import {
  GlobalConfigurations,
  NavigationMenuItem,
  ConnectSocialItem,
  ConnectSocialsConfig,
} from '../types/schema';
import {
  DEFAULT_CONNECT_ITEMS,
  AVAILABLE_PLATFORMS,
  SocialPlatformIcon,
  ConnectSocialBar,
} from '../../components/ConnectSocialBar';

export type GlobalSectionKey =
  | 'navigation'
  | 'header'
  | 'footer'
  | 'buttons'
  | 'contact'
  | 'settings';

interface GlobalContentEditorProps {
  sectionKey: GlobalSectionKey;
  globals: GlobalConfigurations;
  onSaveGlobals: (updated: Partial<GlobalConfigurations>) => Promise<void>;
}

export const GlobalContentEditor: React.FC<GlobalContentEditorProps> = ({
  sectionKey,
  globals,
  onSaveGlobals,
}) => {
  const [formData, setFormData] = useState<GlobalConfigurations>(JSON.parse(JSON.stringify(globals)));
  const [isSaving, setIsSaving] = useState(false);
  const [toast, setToast] = useState<string | null>(null);

  const handleSave = async () => {
    setIsSaving(true);
    try {
      await onSaveGlobals(formData);
      setToast('Global configurations successfully saved!');
      setTimeout(() => setToast(null), 3000);
    } finally {
      setIsSaving(false);
    }
  };

  // ---------------- Navigation Helpers ----------------
  const handleAddNavItem = () => {
    const newItem: NavigationMenuItem = {
      id: `nav_${Date.now()}`,
      label: 'New Link',
      path: '#section',
      isActive: true,
    };
    setFormData({
      ...formData,
      navigation: {
        ...formData.navigation,
        items: [...formData.navigation.items, newItem],
      },
    });
  };

  const handleDeleteNavItem = (id: string) => {
    setFormData({
      ...formData,
      navigation: {
        ...formData.navigation,
        items: formData.navigation.items.filter((item) => item.id !== id),
      },
    });
  };

  const handleUpdateNavItem = (id: string, updates: Partial<NavigationMenuItem>) => {
    setFormData({
      ...formData,
      navigation: {
        ...formData.navigation,
        items: formData.navigation.items.map((item) =>
          item.id === id ? { ...item, ...updates } : item
        ),
      },
    });
  };

  // ---------------- CONNECT Socials Helpers ----------------
  const currentConnectSocials: ConnectSocialsConfig = formData.footer.connectSocials || {
    enabled: true,
    flipIntervalSec: 1.0,
    items: DEFAULT_CONNECT_ITEMS,
  };

  const updateConnectSocials = (updates: Partial<ConnectSocialsConfig>) => {
    setFormData({
      ...formData,
      footer: {
        ...formData.footer,
        connectSocials: {
          ...currentConnectSocials,
          ...updates,
        },
      },
    });
  };

  const handleUpdateConnectItem = (index: number, updates: Partial<ConnectSocialItem>) => {
    const updatedItems = [...currentConnectSocials.items];
    updatedItems[index] = { ...updatedItems[index], ...updates };
    updateConnectSocials({ items: updatedItems });
  };

  const handleAddConnectTile = (type: 'generic' | 'upwork' = 'generic') => {
    const isUpwork = type === 'upwork';
    const newTile: ConnectSocialItem = isUpwork
      ? {
          id: `upwork_${Date.now()}`,
          letter: 'U',
          platform: 'upwork',
          label: 'Upwork',
          url: 'https://www.upwork.com/freelancers/~017d47884cc6a6c3ac',
          color: '#14A800',
          bgColor: '#F0FDF4',
          enabled: true,
        }
      : {
          id: `custom_${Date.now()}`,
          letter: 'S',
          platform: 'website',
          label: 'Portfolio Link',
          url: 'https://',
          color: '#0EA5E9',
          bgColor: '#F0F9FF',
          enabled: true,
        };
    updateConnectSocials({ items: [...currentConnectSocials.items, newTile] });
  };

  const handleUploadTileIconPic = (index: number, file: File) => {
    if (!file) return;
    if (file.size > 3 * 1024 * 1024) {
      alert('Icon image must be under 3MB.');
      return;
    }
    const reader = new FileReader();
    reader.onload = (e) => {
      const base64 = e.target?.result as string;
      if (base64) {
        handleUpdateConnectItem(index, { customIconUrl: base64 });
      }
    };
    reader.readAsDataURL(file);
  };

  const handleDeleteConnectTile = (index: number) => {
    if (currentConnectSocials.items.length <= 1) return;
    const updatedItems = currentConnectSocials.items.filter((_, idx) => idx !== index);
    updateConnectSocials({ items: updatedItems });
  };

  const handleMoveConnectTile = (index: number, direction: 'up' | 'down') => {
    const targetIndex = direction === 'up' ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= currentConnectSocials.items.length) return;
    const updatedItems = [...currentConnectSocials.items];
    const [moved] = updatedItems.splice(index, 1);
    updatedItems.splice(targetIndex, 0, moved);
    updateConnectSocials({ items: updatedItems });
  };

  const handleResetToDefaultConnect = () => {
    updateConnectSocials({
      enabled: true,
      flipIntervalSec: 1.0,
      items: JSON.parse(JSON.stringify(DEFAULT_CONNECT_ITEMS)),
    });
  };

  return (
    <div className="w-full max-w-4xl mx-auto space-y-6 animate-fade-up font-inter text-[#1E3A5F]">
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-[#BCD5E6]">
        <div>
          <h2 className="font-urbanist font-extrabold text-2xl text-[#1E3A5F] capitalize">
            {sectionKey === 'navigation' && 'Navigation Menu Settings'}
            {sectionKey === 'header' && 'Header Configuration'}
            {sectionKey === 'footer' && 'Footer & Copyright Controls'}
            {sectionKey === 'buttons' && 'Buttons & Global CTAs'}
            {sectionKey === 'contact' && 'Contact & Social Information'}
            {sectionKey === 'settings' && 'Website & SEO Settings'}
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Synchronizes globally across all rendered pages and public storefronts.
          </p>
        </div>

        <button
          type="button"
          onClick={handleSave}
          disabled={isSaving}
          className="px-5 py-2.5 rounded-full bg-[#1E3A5F] hover:bg-[#2D5D86] text-white font-extrabold text-xs transition-all shadow-md cursor-pointer flex items-center gap-2 self-start sm:self-auto disabled:opacity-50"
        >
          <Save className="w-3.5 h-3.5 text-[#7DD3FC]" />
          <span>{isSaving ? 'Saving...' : 'Save Global Changes'}</span>
        </button>
      </div>

      {/* Toast Alert */}
      {toast && (
        <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-600" />
          <span>{toast}</span>
        </div>
      )}

      {/* =========================================================================
          1. NAVIGATION MENU
         ========================================================================= */}
      {sectionKey === 'navigation' && (
        <div className="space-y-5">
          <div className="p-5 rounded-2xl bg-white border-2 border-[#BCD5E6] shadow-xs space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-slate-100">
              <h3 className="font-bold text-sm text-[#1E3A5F] flex items-center gap-2">
                <Menu className="w-4 h-4 text-[#0EA5E9]" />
                <span>Header Navigation Links</span>
              </h3>
              <button
                type="button"
                onClick={handleAddNavItem}
                className="px-3 py-1 rounded-lg bg-[#EFF6FB] hover:bg-[#E0F2FE] border border-[#BCD5E6] text-xs font-bold text-[#1E3A5F] flex items-center gap-1 cursor-pointer"
              >
                <Plus className="w-3 h-3 text-[#0EA5E9]" />
                <span>Add Link</span>
              </button>
            </div>

            <div className="space-y-2.5">
              {formData.navigation.items.map((item, idx) => (
                <div
                  key={item.id}
                  className="p-3 rounded-xl border border-[#BCD5E6] bg-[#F8FAFC] flex flex-wrap items-center gap-3"
                >
                  <span className="w-6 h-6 rounded-md bg-white border border-[#BCD5E6] text-slate-500 font-bold text-xs flex items-center justify-center shrink-0">
                    {idx + 1}
                  </span>
                  <div className="flex-1 min-w-[140px]">
                    <span className="block text-[10px] font-bold text-slate-400 mb-0.5">Label</span>
                    <input
                      type="text"
                      value={item.label}
                      onChange={(e) => handleUpdateNavItem(item.id, { label: e.target.value })}
                      className="w-full px-2.5 py-1.5 rounded-lg border border-[#BCD5E6] bg-white text-xs font-bold text-[#1E3A5F]"
                    />
                  </div>
                  <div className="flex-1 min-w-[140px]">
                    <span className="block text-[10px] font-bold text-slate-400 mb-0.5">Path / Anchor</span>
                    <input
                      type="text"
                      value={item.path}
                      onChange={(e) => handleUpdateNavItem(item.id, { path: e.target.value })}
                      className="w-full px-2.5 py-1.5 rounded-lg border border-[#BCD5E6] bg-white text-xs text-[#1E3A5F]"
                    />
                  </div>
                  <button
                    type="button"
                    onClick={() => handleDeleteNavItem(item.id)}
                    className="p-2 text-slate-400 hover:text-red-600 cursor-pointer self-end mb-0.5"
                    title="Delete Link"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-white border-2 border-[#BCD5E6] shadow-xs space-y-4">
            <h3 className="font-bold text-sm text-[#1E3A5F]">Header Action Button (CTA)</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div>
                <label className="block font-bold text-[#1E3A5F] mb-1">Button Label</label>
                <input
                  type="text"
                  value={formData.navigation.ctaButtonLabel}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      navigation: { ...formData.navigation, ctaButtonLabel: e.target.value },
                    })
                  }
                  className="w-full px-3 py-2 rounded-xl border border-[#BCD5E6] bg-white text-xs font-bold"
                />
              </div>
              <div>
                <label className="block font-bold text-[#1E3A5F] mb-1">Target Link / Anchor</label>
                <input
                  type="text"
                  value={formData.navigation.ctaButtonLink}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      navigation: { ...formData.navigation, ctaButtonLink: e.target.value },
                    })
                  }
                  className="w-full px-3 py-2 rounded-xl border border-[#BCD5E6] bg-white text-xs"
                />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* =========================================================================
          2. HEADER SETTINGS
         ========================================================================= */}
      {sectionKey === 'header' && (
        <div className="p-5 rounded-2xl bg-white border-2 border-[#BCD5E6] shadow-xs space-y-4 text-xs">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block font-bold text-[#1E3A5F] mb-1">Logo Brand Title</label>
              <input
                type="text"
                value={formData.header.logoTitle}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    header: { ...formData.header, logoTitle: e.target.value },
                  })
                }
                className="w-full px-3 py-2 rounded-xl border border-[#BCD5E6] bg-white font-bold"
              />
            </div>
            <div>
              <label className="block font-bold text-[#1E3A5F] mb-1">Logo Subtitle</label>
              <input
                type="text"
                value={formData.header.logoSubtitle}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    header: { ...formData.header, logoSubtitle: e.target.value },
                  })
                }
                className="w-full px-3 py-2 rounded-xl border border-[#BCD5E6] bg-white"
              />
            </div>
          </div>

          <div>
            <label className="block font-bold text-[#1E3A5F] mb-1">Status Badge Text</label>
            <input
              type="text"
              value={formData.header.statusText}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  header: { ...formData.header, statusText: e.target.value },
                })
              }
              className="w-full px-3 py-2 rounded-xl border border-[#BCD5E6] bg-white"
            />
          </div>

          <div className="flex items-center justify-between pt-3 border-t border-slate-100">
            <div>
              <span className="font-bold text-[#1E3A5F] block">Sticky Header</span>
              <span className="text-[11px] text-slate-500">
                Fixes the navigation bar to the top of viewport while scrolling.
              </span>
            </div>
            <input
              type="checkbox"
              checked={formData.header.sticky}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  header: { ...formData.header, sticky: e.target.checked },
                })
              }
              className="w-4 h-4 rounded text-[#0EA5E9]"
            />
          </div>
        </div>
      )}

      {/* =========================================================================
          3. FOOTER SETTINGS & "CONNECT" FLIPPING SOCIAL TILES
         ========================================================================= */}
      {sectionKey === 'footer' && (
        <div className="space-y-6">
          {/* Card 1: Copyright & Brand Text */}
          <div className="p-5 rounded-2xl bg-white border-2 border-[#BCD5E6] shadow-xs space-y-4 text-xs">
            <div className="flex items-center justify-between pb-2 border-b border-slate-100">
              <h3 className="font-bold text-sm text-[#1E3A5F] flex items-center gap-2">
                <Layers className="w-4 h-4 text-[#0EA5E9]" />
                <span>Footer Brand & Copyright Line</span>
              </h3>
              <span className="text-[11px] text-slate-400">Public Visitor View</span>
            </div>

            <div>
              <label className="block font-bold text-[#1E3A5F] mb-1">
                Copyright Line (Displayed below the CONNECT socials bar)
              </label>
              <input
                type="text"
                value={formData.footer.copyrightText}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    footer: { ...formData.footer, copyrightText: e.target.value },
                  })
                }
                placeholder="© 2026 Russell Taga-an • E-commerce Operations Manager & Catalog Systems Specialist"
                className="w-full px-3 py-2 rounded-xl border border-[#BCD5E6] bg-white font-semibold text-xs"
              />
            </div>

            <div>
              <label className="block font-bold text-[#1E3A5F] mb-1">Subtext / Secondary Line</label>
              <input
                type="text"
                value={formData.footer.subtext}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    footer: { ...formData.footer, subtext: e.target.value },
                  })
                }
                placeholder="Built with WPBakery Modular CMS"
                className="w-full px-3 py-2 rounded-xl border border-[#BCD5E6] bg-white text-xs"
              />
            </div>
          </div>

          {/* Card 2: "CONNECT" 1-Second Flipping Social Tiles */}
          <div className="p-5 rounded-2xl bg-white border-2 border-[#BCD5E6] shadow-xs space-y-5 text-xs">
            {/* Header & Master Controls */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-100">
              <div>
                <div className="flex items-center gap-2">
                  <Share2 className="w-4 h-4 text-[#0EA5E9]" />
                  <h3 className="font-bold text-sm text-[#1E3A5F]">
                    "CONNECT" Flipping Social Tiles
                  </h3>
                  <span className="px-2 py-0.5 rounded-full bg-[#E0F2FE] text-[#0369A1] font-extrabold text-[10px] tracking-wide uppercase">
                    1-Sec 3D Flip
                  </span>
                </div>
                <p className="text-[11px] text-slate-500 mt-1">
                  Square tiles with rounded corners placed directly above the copyright text. Each letter flips every second to reveal its social platform icon.
                </p>
              </div>

              <div className="flex items-center gap-2 flex-wrap">
                <button
                  type="button"
                  onClick={handleResetToDefaultConnect}
                  className="px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-[11px] flex items-center gap-1.5 transition-colors cursor-pointer"
                  title="Reset to default C-O-N-N-E-C-T tiles (Gmail, Facebook, Instagram, LinkedIn, WhatsApp, Threads, GitHub)"
                >
                  <RotateCcw className="w-3.5 h-3.5 text-slate-500" />
                  <span>Reset CONNECT</span>
                </button>

                <button
                  type="button"
                  onClick={() => handleAddConnectTile('upwork')}
                  className="px-3 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-[11px] flex items-center gap-1.5 transition-colors shadow-xs cursor-pointer"
                  title="Add an Upwork social tile (monogram 'U')"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>+ Upwork Tile</span>
                </button>

                <button
                  type="button"
                  onClick={() => handleAddConnectTile('generic')}
                  className="px-3 py-1.5 rounded-xl bg-[#0EA5E9] hover:bg-[#0284C7] text-white font-bold text-[11px] flex items-center gap-1.5 transition-colors shadow-xs cursor-pointer"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Add Letter Tile</span>
                </button>
              </div>
            </div>

            {/* Global Flipping Bar Settings */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-4 rounded-xl bg-[#F8FAFC] border border-[#BCD5E6]">
              {/* Enabled Switch */}
              <div className="flex items-center justify-between">
                <div>
                  <span className="font-bold text-[#1E3A5F] block">Enable CONNECT Bar</span>
                  <span className="text-[11px] text-slate-500">
                    Display flipping social tiles in the public visitor footer.
                  </span>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={currentConnectSocials.enabled !== false}
                    onChange={(e) => updateConnectSocials({ enabled: e.target.checked })}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-slate-200 peer-focus:outline-hidden rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#0EA5E9]"></div>
                </label>
              </div>

              {/* Flip Speed Interval */}
              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="font-bold text-[#1E3A5F] flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-[#0EA5E9]" />
                    <span>Flip Cycle Interval</span>
                  </label>
                  <span className="font-mono font-bold text-[#0EA5E9] bg-white px-2 py-0.5 rounded-md border border-[#BCD5E6]">
                    {(currentConnectSocials.flipIntervalSec || 1.0).toFixed(1)}s
                  </span>
                </div>
                <input
                  type="range"
                  min="0.5"
                  max="3.0"
                  step="0.1"
                  value={currentConnectSocials.flipIntervalSec || 1.0}
                  onChange={(e) =>
                    updateConnectSocials({ flipIntervalSec: parseFloat(e.target.value) })
                  }
                  className="w-full accent-[#0EA5E9] cursor-pointer"
                />
                <span className="text-[10px] text-slate-400 block mt-0.5">
                  Default is 1.0s (flips around 1 second between letters and icons).
                </span>
              </div>
            </div>

            {/* LIVE PREVIEW CONTAINER */}
            <div className="p-4 rounded-2xl bg-gradient-to-br from-slate-50 via-white to-[#F0F9FF] border-2 border-dashed border-[#BCD5E6] flex flex-col items-center justify-center space-y-2">
              <div className="flex items-center gap-2 self-start text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                <Sparkles className="w-3.5 h-3.5 text-[#0EA5E9]" />
                <span>Live Interactive Preview (Hover to pause & inspect)</span>
              </div>

              {/* Rendered Live Tile Bar */}
              <div className="w-full py-2">
                <ConnectSocialBar config={currentConnectSocials} />
              </div>

              {/* Preview Footer Copyright placeholder */}
              <div className="text-[10px] font-semibold text-slate-400 text-center select-none pt-1 border-t border-slate-200/60 w-full">
                {formData.footer.copyrightText ||
                  '© 2026 Russell Taga-an • E-commerce Operations Manager & Catalog Systems Specialist'}
              </div>
            </div>

            {/* LETTER TILES LIST */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="font-bold text-xs text-[#1E3A5F]">
                  Configured Tiles ({currentConnectSocials.items.length})
                </span>
                <span className="text-[11px] text-slate-400">
                  Target letters spelling: "CONNECT"
                </span>
              </div>

              <div className="space-y-3">
                {currentConnectSocials.items.map((item, idx) => (
                  <div
                    key={item.id || `tile-${idx}`}
                    className={`p-3.5 rounded-xl border transition-all ${
                      item.enabled !== false
                        ? 'border-[#BCD5E6] bg-white shadow-2xs'
                        : 'border-slate-200 bg-slate-50 opacity-60'
                    }`}
                  >
                    <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3">
                      {/* Left: Tile Preview & Order Control */}
                      <div className="flex items-center gap-3">
                        <span className="w-6 h-6 rounded-md bg-slate-100 text-slate-500 font-mono font-bold text-xs flex items-center justify-center shrink-0">
                          {idx + 1}
                        </span>

                        {/* Interactive Square Tile Preview */}
                        <div
                          className="w-10 h-10 rounded-xl border border-[#BCD5E6] flex items-center justify-center shadow-xs shrink-0 select-none transition-transform hover:scale-105"
                          style={{ backgroundColor: item.bgColor || '#FFFFFF' }}
                          title={`Letter: ${item.letter} • Icon: ${item.platform}${item.customIconUrl ? ' (Custom Pic)' : ''}`}
                        >
                          <div className="flex items-center gap-1">
                            <span className="font-urbanist font-black text-sm text-[#1E3A5F]">
                              {item.letter}
                            </span>
                            <span className="text-slate-300">/</span>
                            <SocialPlatformIcon
                              platform={item.platform}
                              customIconUrl={item.customIconUrl}
                              className="w-4 h-4"
                            />
                          </div>
                        </div>

                        {/* Letter Input */}
                        <div className="w-14">
                          <label className="block text-[10px] font-bold text-slate-400 mb-0.5">
                            Letter
                          </label>
                          <input
                            type="text"
                            maxLength={2}
                            value={item.letter}
                            onChange={(e) =>
                              handleUpdateConnectItem(idx, {
                                letter: e.target.value.toUpperCase(),
                              })
                            }
                            className="w-full px-2 py-1.5 rounded-lg border border-[#BCD5E6] bg-white text-center font-urbanist font-black text-sm text-[#1E3A5F] focus:ring-1 focus:ring-[#0EA5E9]"
                          />
                        </div>

                        {/* Platform Selector */}
                        <div className="w-36">
                          <label className="block text-[10px] font-bold text-slate-400 mb-0.5">
                            Platform Icon
                          </label>
                          <select
                            value={item.platform}
                            onChange={(e) => {
                              const newPlatform = e.target.value;
                              const platMeta = AVAILABLE_PLATFORMS.find(
                                (p) => p.value === newPlatform
                              );
                              const updates: Partial<ConnectSocialItem> = {
                                platform: newPlatform,
                                label: platMeta?.label || newPlatform,
                                bgColor: platMeta?.defaultBg || item.bgColor,
                              };
                              if (
                                newPlatform === 'upwork' &&
                                (!item.url ||
                                  item.url.includes('mailto:') ||
                                  item.url.includes('facebook') ||
                                  item.url.includes('instagram') ||
                                  item.url.includes('threads') ||
                                  item.url === 'https://')
                              ) {
                                updates.url = 'https://www.upwork.com/freelancers/~017d47884cc6a6c3ac';
                              }
                              handleUpdateConnectItem(idx, updates);
                            }}
                            className="w-full px-2 py-1.5 rounded-lg border border-[#BCD5E6] bg-white text-xs font-semibold text-[#1E3A5F] focus:ring-1 focus:ring-[#0EA5E9]"
                          >
                            {AVAILABLE_PLATFORMS.map((plat) => (
                              <option key={plat.value} value={plat.value}>
                                {plat.label}
                              </option>
                            ))}
                          </select>
                        </div>
                      </div>

                      {/* Center: Label and URL Target */}
                      <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-2 min-w-0">
                        <div>
                          <label className="block text-[10px] font-bold text-slate-400 mb-0.5">
                            Tooltip / Label
                          </label>
                          <input
                            type="text"
                            value={item.label}
                            onChange={(e) =>
                              handleUpdateConnectItem(idx, { label: e.target.value })
                            }
                            placeholder="e.g. Gmail"
                            className="w-full px-2.5 py-1.5 rounded-lg border border-[#BCD5E6] bg-white text-xs font-semibold text-[#1E3A5F]"
                          />
                        </div>

                        <div>
                          <label className="block text-[10px] font-bold text-slate-400 mb-0.5">
                            Target URL (mailto: or https://)
                          </label>
                          <input
                            type="text"
                            value={item.url}
                            onChange={(e) =>
                              handleUpdateConnectItem(idx, { url: e.target.value })
                            }
                            placeholder="mailto:... or https://..."
                            className="w-full px-2.5 py-1.5 rounded-lg border border-[#BCD5E6] bg-white text-xs text-[#1E3A5F] font-mono"
                          />
                        </div>
                      </div>

                      {/* Right: Background Color & Actions */}
                      <div className="flex items-center gap-2 shrink-0 self-end lg:self-center">
                        {/* Background Color Picker */}
                        <div className="flex items-center gap-1.5">
                          <label className="text-[10px] font-bold text-slate-400">Bg:</label>
                          <input
                            type="color"
                            value={item.bgColor || '#FFFFFF'}
                            onChange={(e) =>
                              handleUpdateConnectItem(idx, { bgColor: e.target.value })
                            }
                            className="w-7 h-7 p-0.5 rounded-lg border border-[#BCD5E6] cursor-pointer"
                            title="Tile backface background color"
                          />
                        </div>

                        {/* Visibility Toggle */}
                        <button
                          type="button"
                          onClick={() =>
                            handleUpdateConnectItem(idx, {
                              enabled: item.enabled === false ? true : false,
                            })
                          }
                          className={`p-1.5 rounded-lg border cursor-pointer transition-colors ${
                            item.enabled !== false
                              ? 'border-emerald-200 text-emerald-600 bg-emerald-50 hover:bg-emerald-100'
                              : 'border-slate-200 text-slate-400 bg-slate-100 hover:bg-slate-200'
                          }`}
                          title={item.enabled !== false ? 'Tile Enabled' : 'Tile Hidden'}
                        >
                          {item.enabled !== false ? (
                            <Eye className="w-3.5 h-3.5" />
                          ) : (
                            <EyeOff className="w-3.5 h-3.5" />
                          )}
                        </button>

                        {/* Move Up */}
                        <button
                          type="button"
                          onClick={() => handleMoveConnectTile(idx, 'up')}
                          disabled={idx === 0}
                          className="p-1.5 rounded-lg border border-[#BCD5E6] text-slate-600 hover:bg-slate-100 disabled:opacity-30 cursor-pointer disabled:cursor-not-allowed"
                          title="Move Left / Earlier"
                        >
                          <ArrowUp className="w-3.5 h-3.5" />
                        </button>

                        {/* Move Down */}
                        <button
                          type="button"
                          onClick={() => handleMoveConnectTile(idx, 'down')}
                          disabled={idx === currentConnectSocials.items.length - 1}
                          className="p-1.5 rounded-lg border border-[#BCD5E6] text-slate-600 hover:bg-slate-100 disabled:opacity-30 cursor-pointer disabled:cursor-not-allowed"
                          title="Move Right / Later"
                        >
                          <ArrowDown className="w-3.5 h-3.5" />
                        </button>

                        {/* Delete Tile */}
                        <button
                          type="button"
                          onClick={() => handleDeleteConnectTile(idx)}
                          disabled={currentConnectSocials.items.length <= 1}
                          className="p-1.5 rounded-lg border border-red-200 text-red-500 hover:bg-red-50 disabled:opacity-30 cursor-pointer disabled:cursor-not-allowed"
                          title="Delete Tile"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>

                    {/* Sub-row: Change Icon Picture (Custom Picture / Drag & Drop / Image Upload / URL) */}
                    <div
                      onDragOver={(e) => e.preventDefault()}
                      onDrop={(e) => {
                        e.preventDefault();
                        const file = (Array.from(e.dataTransfer.files || []) as File[]).find((f) =>
                          f.type.startsWith('image/')
                        );
                        if (file) handleUploadTileIconPic(idx, file);
                      }}
                      className="pt-2.5 mt-2.5 border-t border-slate-100 flex flex-wrap items-center justify-between gap-3 bg-[#F8FAFC]/90 hover:bg-[#F0F9FF] border border-dashed border-transparent hover:border-[#0EA5E9] -mx-3.5 -mb-3.5 p-3 rounded-b-xl transition-all"
                    >
                      <div className="flex items-center gap-2">
                        <ImageIcon className="w-3.5 h-3.5 text-[#0EA5E9]" />
                        <span className="font-bold text-[11px] text-[#1E3A5F]">
                          Icon Picture:
                        </span>
                        {item.customIconUrl ? (
                          <div className="flex items-center gap-1.5 px-2 py-0.5 rounded-md bg-emerald-50 border border-emerald-200 text-emerald-700 text-[10px] font-extrabold">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                            <span>Custom Pic Active</span>
                          </div>
                        ) : (
                          <span className="text-[10px] text-slate-500 font-medium">
                            Preset SVG ({item.platform}) • Drag & drop photo here
                          </span>
                        )}
                      </div>

                      <div className="flex-1 flex flex-wrap items-center justify-end gap-2 min-w-[280px]">
                        {/* Upload File / Drop Button */}
                        <label className="px-2.5 py-1 rounded-lg bg-white hover:bg-slate-50 border border-[#BCD5E6] text-slate-700 font-bold text-[11px] flex items-center gap-1.5 cursor-pointer shadow-2xs hover:border-[#0EA5E9] transition-all">
                          <Upload className="w-3 h-3 text-[#0EA5E9]" />
                          <span>{item.customIconUrl ? 'Change / Drop Pic' : 'Upload / Drop Pic'}</span>
                          <input
                            type="file"
                            accept="image/png,image/jpeg,image/svg+xml,image/webp,image/gif"
                            onChange={(e) => {
                              const file = e.target.files?.[0];
                              if (file) handleUploadTileIconPic(idx, file);
                              e.target.value = '';
                            }}
                            className="hidden"
                          />
                        </label>

                        {/* Direct URL input */}
                        <div className="flex items-center gap-1 flex-1 min-w-[160px] max-w-[280px]">
                          <input
                            type="text"
                            placeholder="Drop file or paste Icon Pic URL"
                            value={
                              item.customIconUrl && !item.customIconUrl.startsWith('data:')
                                ? item.customIconUrl
                                : ''
                            }
                            onChange={(e) =>
                              handleUpdateConnectItem(idx, {
                                customIconUrl: e.target.value.trim() || undefined,
                              })
                            }
                            className="w-full px-2 py-1 rounded-lg border border-[#BCD5E6] bg-white text-[11px] font-mono text-[#1E3A5F] focus:ring-1 focus:ring-[#0EA5E9]"
                          />
                        </div>

                        {/* Reset to vector icon button */}
                        {item.customIconUrl && (
                          <button
                            type="button"
                            onClick={() => handleUpdateConnectItem(idx, { customIconUrl: undefined })}
                            className="px-2 py-1 rounded-lg bg-red-50 hover:bg-red-100 text-red-600 border border-red-200 font-bold text-[10px] flex items-center gap-1 cursor-pointer transition-colors"
                            title="Remove custom picture and revert to vector icon"
                          >
                            <X className="w-3 h-3" />
                            <span>Reset to SVG</span>
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* =========================================================================
          4. BUTTONS & CTAS
         ========================================================================= */}
      {sectionKey === 'buttons' && (
        <div className="p-5 rounded-2xl bg-white border-2 border-[#BCD5E6] shadow-xs space-y-4 text-xs">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block font-bold text-[#1E3A5F] mb-1">Primary CTA Label</label>
              <input
                type="text"
                value={formData.buttons.primaryCtaLabel}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    buttons: { ...formData.buttons, primaryCtaLabel: e.target.value },
                  })
                }
                className="w-full px-3 py-2 rounded-xl border border-[#BCD5E6] bg-white font-bold"
              />
            </div>
            <div>
              <label className="block font-bold text-[#1E3A5F] mb-1">Primary CTA Link</label>
              <input
                type="text"
                value={formData.buttons.primaryCtaTarget}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    buttons: { ...formData.buttons, primaryCtaTarget: e.target.value },
                  })
                }
                className="w-full px-3 py-2 rounded-xl border border-[#BCD5E6] bg-white"
              />
            </div>
            <div>
              <label className="block font-bold text-[#1E3A5F] mb-1">Secondary CTA Label</label>
              <input
                type="text"
                value={formData.buttons.secondaryCtaLabel}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    buttons: { ...formData.buttons, secondaryCtaLabel: e.target.value },
                  })
                }
                className="w-full px-3 py-2 rounded-xl border border-[#BCD5E6] bg-white font-bold"
              />
            </div>
            <div>
              <label className="block font-bold text-[#1E3A5F] mb-1">Secondary CTA Link</label>
              <input
                type="text"
                value={formData.buttons.secondaryCtaTarget}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    buttons: { ...formData.buttons, secondaryCtaTarget: e.target.value },
                  })
                }
                className="w-full px-3 py-2 rounded-xl border border-[#BCD5E6] bg-white"
              />
            </div>
          </div>
        </div>
      )}

      {/* =========================================================================
          5. CONTACT INFORMATION
         ========================================================================= */}
      {sectionKey === 'contact' && (
        <div className="p-5 rounded-2xl bg-white border-2 border-[#BCD5E6] shadow-xs space-y-4 text-xs">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block font-bold text-[#1E3A5F] mb-1">Email Address</label>
              <input
                type="email"
                value={formData.contact.email}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    contact: { ...formData.contact, email: e.target.value },
                  })
                }
                className="w-full px-3 py-2 rounded-xl border border-[#BCD5E6] bg-white"
              />
            </div>
            <div>
              <label className="block font-bold text-[#1E3A5F] mb-1">Phone Number</label>
              <input
                type="text"
                value={formData.contact.phone}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    contact: { ...formData.contact, phone: e.target.value },
                  })
                }
                className="w-full px-3 py-2 rounded-xl border border-[#BCD5E6] bg-white"
              />
            </div>
            <div>
              <label className="block font-bold text-[#1E3A5F] mb-1">Location</label>
              <input
                type="text"
                value={formData.contact.location}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    contact: { ...formData.contact, location: e.target.value },
                  })
                }
                className="w-full px-3 py-2 rounded-xl border border-[#BCD5E6] bg-white"
              />
            </div>
            <div>
              <label className="block font-bold text-[#1E3A5F] mb-1">Timezone Alignments</label>
              <input
                type="text"
                value={formData.contact.timezones}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    contact: { ...formData.contact, timezones: e.target.value },
                  })
                }
                className="w-full px-3 py-2 rounded-xl border border-[#BCD5E6] bg-white"
              />
            </div>
            <div>
              <label className="block font-bold text-[#1E3A5F] mb-1">Upwork Profile URL</label>
              <input
                type="text"
                value={formData.contact.upworkUrl}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    contact: { ...formData.contact, upworkUrl: e.target.value },
                  })
                }
                className="w-full px-3 py-2 rounded-xl border border-[#BCD5E6] bg-white"
              />
            </div>
            <div>
              <label className="block font-bold text-[#1E3A5F] mb-1">GitHub URL</label>
              <input
                type="text"
                value={formData.contact.githubUrl || ''}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    contact: { ...formData.contact, githubUrl: e.target.value },
                  })
                }
                className="w-full px-3 py-2 rounded-xl border border-[#BCD5E6] bg-white"
              />
            </div>
          </div>
        </div>
      )}

      {/* =========================================================================
          6. WEBSITE SETTINGS & SEO
         ========================================================================= */}
      {sectionKey === 'settings' && (
        <div className="p-5 rounded-2xl bg-white border-2 border-[#BCD5E6] shadow-xs space-y-4 text-xs">
          <div>
            <label className="block font-bold text-[#1E3A5F] mb-1">Global Site Name</label>
            <input
              type="text"
              value={formData.settings.siteName}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  settings: { ...formData.settings, siteName: e.target.value },
                })
              }
              className="w-full px-3 py-2 rounded-xl border border-[#BCD5E6] bg-white font-bold"
            />
          </div>

          <div>
            <label className="block font-bold text-[#1E3A5F] mb-1">Global Meta Description</label>
            <textarea
              rows={3}
              value={formData.settings.siteDescription}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  settings: { ...formData.settings, siteDescription: e.target.value },
                })
              }
              className="w-full p-3 rounded-xl border border-[#BCD5E6] bg-white"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block font-bold text-[#1E3A5F] mb-1">Favicon URL</label>
              <input
                type="text"
                value={formData.settings.faviconUrl}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    settings: { ...formData.settings, faviconUrl: e.target.value },
                  })
                }
                className="w-full px-3 py-2 rounded-xl border border-[#BCD5E6] bg-white"
              />
            </div>
            <div>
              <label className="block font-bold text-[#1E3A5F] mb-1">Default OG Social Image</label>
              <input
                type="text"
                value={formData.settings.defaultOgImage}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    settings: { ...formData.settings, defaultOgImage: e.target.value },
                  })
                }
                className="w-full px-3 py-2 rounded-xl border border-[#BCD5E6] bg-white"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
