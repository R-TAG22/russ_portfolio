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
} from 'lucide-react';
import { GlobalConfigurations, NavigationMenuItem } from '../types/schema';

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
          3. FOOTER SETTINGS
         ========================================================================= */}
      {sectionKey === 'footer' && (
        <div className="p-5 rounded-2xl bg-white border-2 border-[#BCD5E6] shadow-xs space-y-4 text-xs">
          <div>
            <label className="block font-bold text-[#1E3A5F] mb-1">Copyright Line</label>
            <input
              type="text"
              value={formData.footer.copyrightText}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  footer: { ...formData.footer, copyrightText: e.target.value },
                })
              }
              className="w-full px-3 py-2 rounded-xl border border-[#BCD5E6] bg-white font-semibold"
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
              className="w-full px-3 py-2 rounded-xl border border-[#BCD5E6] bg-white"
            />
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
