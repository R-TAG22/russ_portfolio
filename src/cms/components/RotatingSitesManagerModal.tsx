import React, { useState, useEffect } from 'react';
import {
  X,
  Plus,
  Sparkles,
  Layers,
  RotateCcw,
  RotateCw,
  ExternalLink,
  Edit3,
  Copy,
  Trash2,
  Check,
  Save,
  Globe,
  RefreshCw,
  Image as ImageIcon,
  FolderOpen,
} from 'lucide-react';
import { StoreOrbitItem } from '../types/schema';
import { contentService } from '../services/ContentServiceFactory';
import { RotatingSiteEditModal } from './RotatingSiteEditModal';
import { UniversalImageUploader } from './UniversalImageUploader';

interface RotatingSitesManagerModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSaved?: () => void;
}

export const RotatingSitesManagerModal: React.FC<RotatingSitesManagerModalProps> = ({
  isOpen,
  onClose,
  onSaved,
}) => {
  const [sites, setSites] = useState<StoreOrbitItem[]>([]);
  const [centerPortrait, setCenterPortrait] = useState<string>('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [editingSite, setEditingSite] = useState<StoreOrbitItem | null>(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  useEffect(() => {
    if (isOpen) {
      loadSites();
    }
  }, [isOpen]);

  // Handle ESC
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen && !isEditModalOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, isEditModalOpen, onClose]);

  const loadSites = async () => {
    setIsLoading(true);
    try {
      const page = await contentService.getPageBySlug('homepage');
      const orbitEl = page?.sections
        ?.flatMap((s) => s.columns)
        ?.flatMap((c) => c.elements)
        ?.find((e) => e.type === 'profileOrbit');

      const orbitContent = (orbitEl?.content as any)?.data;
      if (orbitContent?.rotatingSites && orbitContent.rotatingSites.length > 0) {
        setSites(orbitContent.rotatingSites);
      } else {
        const globals = await contentService.getGlobals();
        if (globals?.rotatingSites && globals.rotatingSites.length > 0) {
          setSites(globals.rotatingSites);
        } else {
          // Default initial set
          setSites(DEFAULT_FALLBACK_SITES);
        }
      }

      if (orbitContent?.imageUrl) {
        setCenterPortrait(orbitContent.imageUrl);
      }
    } catch (err) {
      console.error('Failed to load rotating sites', err);
      setSites(DEFAULT_FALLBACK_SITES);
    } finally {
      setIsLoading(false);
    }
  };

  if (!isOpen) return null;

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleSaveAll = async (updatedSites = sites, updatedPortrait = centerPortrait) => {
    setIsSaving(true);
    try {
      // 1. Update homepage section element
      const page = await contentService.getPageBySlug('homepage');
      if (page) {
        let found = false;
        const newSections = page.sections.map((row) => ({
          ...row,
          columns: row.columns.map((col) => ({
            ...col,
            elements: col.elements.map((el) => {
              if (el.type === 'profileOrbit') {
                found = true;
                const existingData = (el.content as any)?.data || {};
                return {
                  ...el,
                  content: {
                    type: 'profileOrbit',
                    data: {
                      ...existingData,
                      rotatingSites: updatedSites,
                      imageUrl: updatedPortrait || existingData.imageUrl,
                    },
                  },
                } as any;
              }
              return el;
            }),
          })),
        }));

        if (found) {
          await contentService.savePage({
            ...page,
            sections: newSections as any,
          });
        }
      }

      // 2. Also save to globals for multi-source fallback
      await contentService.saveGlobals({
        rotatingSites: updatedSites,
      });

      // 3. Dispatch broadcast event for live re-render
      window.dispatchEvent(
        new CustomEvent('content_service_rotating_sites_updated', {
          detail: { sites: updatedSites, centerPortrait: updatedPortrait },
        })
      );

      showToast('Rotating sites successfully saved and live on Homepage!');
      if (onSaved) onSaved();
    } catch (err) {
      console.error('Failed to save rotating sites', err);
      showToast('Error saving rotating sites.');
    } finally {
      setIsSaving(false);
    }
  };

  const handleAddSite = () => {
    setEditingSite(null);
    setIsEditModalOpen(true);
  };

  const handleEditSite = (site: StoreOrbitItem) => {
    setEditingSite(site);
    setIsEditModalOpen(true);
  };

  const handleSaveSiteModal = async (savedSite: StoreOrbitItem) => {
    let updated: StoreOrbitItem[];
    const exists = sites.findIndex((s) => s.id === savedSite.id);
    if (exists >= 0) {
      updated = sites.map((s) => (s.id === savedSite.id ? savedSite : s));
    } else {
      updated = [...sites, savedSite];
    }
    setSites(updated);
    await handleSaveAll(updated);
  };

  const handleDuplicateSite = async (site: StoreOrbitItem) => {
    const duplicated: StoreOrbitItem = {
      ...site,
      id: `store_${Date.now()}_${Math.random().toString(36).substr(2, 4)}`,
      name: `${site.name} (Copy)`,
      angle: (site.angle + 30) % 360,
    };
    const updated = [...sites, duplicated];
    setSites(updated);
    await handleSaveAll(updated);
    showToast(`Duplicated "${site.name}".`);
  };

  const handleDeleteSite = async (id: string) => {
    const updated = sites.filter((s) => s.id !== id);
    setSites(updated);
    setDeleteConfirmId(null);
    await handleSaveAll(updated);
    showToast('Rotating site removed.');
  };

  const handleSwitchOrbit = async (id: string) => {
    const updated = sites.map((s) => {
      if (s.id === id) {
        const nextOrbit = s.orbitIndex === 1 ? 2 : 1;
        return {
          ...s,
          orbitIndex: nextOrbit,
          radius: nextOrbit === 1 ? 295 : 390,
          size: nextOrbit === 1 ? 72 : 70,
        };
      }
      return s;
    });
    setSites(updated);
    await handleSaveAll(updated);
    showToast('Switched orbit layer.');
  };

  const handleAutoDistributeAngles = async () => {
    const inner = sites.filter((s) => s.orbitIndex === 1);
    const outer = sites.filter((s) => s.orbitIndex !== 1);

    const innerStep = inner.length ? 360 / inner.length : 0;
    const outerStep = outer.length ? 360 / outer.length : 0;

    const distributed = sites.map((s) => {
      if (s.orbitIndex === 1) {
        const idx = inner.findIndex((it) => it.id === s.id);
        return { ...s, angle: Math.round(idx * innerStep) };
      } else {
        const idx = outer.findIndex((it) => it.id === s.id);
        return { ...s, angle: Math.round(idx * outerStep) };
      }
    });

    setSites(distributed);
    await handleSaveAll(distributed);
    showToast('Angles evenly distributed across orbit rings!');
  };

  const innerOrbitSites = sites.filter((s) => s.orbitIndex === 1);
  const outerOrbitSites = sites.filter((s) => s.orbitIndex !== 1);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-black/60 backdrop-blur-xs font-inter animate-fade-in">
      <div
        className="w-full max-w-4xl max-h-[92vh] bg-white rounded-3xl shadow-2xl border border-slate-200 flex flex-col overflow-hidden animate-scale-in"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Toast Notification */}
        {toastMessage && (
          <div className="absolute top-4 right-6 z-50 px-4 py-2 rounded-xl bg-slate-900 text-white text-xs font-bold shadow-xl flex items-center gap-2 animate-bounce">
            <Check className="w-4 h-4 text-emerald-400" />
            <span>{toastMessage}</span>
          </div>
        )}

        {/* Top Header */}
        <div className="px-6 py-4 border-b border-slate-200 bg-slate-50 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-[#1E3A5F] to-[#0EA5E9] flex items-center justify-center text-white shadow-md">
              <Sparkles className="w-5 h-5 text-[#7DD3FC]" />
            </div>
            <div>
              <h3 className="font-urbanist font-extrabold text-lg text-[#1E3A5F]">
                Homepage Rotating Sites & Orbit Visualization
              </h3>
              <p className="text-xs text-slate-500">
                Manage concentric orbiting client stores, logos, URLs, and central portrait on the Homepage.
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-xl text-slate-400 hover:text-slate-800 hover:bg-slate-200 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Action Toolbar */}
        <div className="px-6 py-3 border-b border-slate-200 bg-white flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-slate-700">
              {sites.length} Active Stores
            </span>
            <span className="text-[11px] text-slate-400">
              ({innerOrbitSites.length} Inner • {outerOrbitSites.length} Outer)
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handleAutoDistributeAngles}
              className="px-3 py-1.5 rounded-xl border border-slate-300 hover:bg-slate-100 text-slate-700 font-bold text-xs flex items-center gap-1.5 transition-colors cursor-pointer"
              title="Evenly space out all stores along each orbit ring"
            >
              <RefreshCw className="w-3.5 h-3.5 text-[#0EA5E9]" />
              <span>Auto-Distribute Angles</span>
            </button>

            <button
              type="button"
              onClick={handleAddSite}
              className="px-4 py-1.5 rounded-xl bg-[#0EA5E9] hover:bg-[#0284C7] text-white font-extrabold text-xs flex items-center gap-1.5 transition-all cursor-pointer shadow-xs hover:scale-102"
            >
              <Plus className="w-4 h-4" />
              <span>+ Add Rotating Site</span>
            </button>
          </div>
        </div>

        {/* Body Content */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {/* Section 1: Russell's Center Hub Portrait with UniversalImageUploader */}
          <div className="p-4 rounded-2xl bg-[#F8FAFC] border border-slate-200 space-y-3">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-bold text-xs sm:text-sm text-slate-800 flex items-center gap-2">
                  <ImageIcon className="w-4 h-4 text-[#0EA5E9]" />
                  <span>Center Hub Hero Portrait</span>
                </h4>
                <p className="text-[11px] text-slate-500">
                  The central photo inside the morphing liquid blob framed by the rotating orbits.
                </p>
              </div>
            </div>

            <UniversalImageUploader
              label="Portrait Image"
              value={centerPortrait}
              onChange={(url) => {
                setCenterPortrait(url);
                handleSaveAll(sites, url);
              }}
              aspectRatio="1/1"
              galleryTitle="Select Hero Portrait from Media Gallery"
              placeholder="Leave blank to use Russell's default cutout photo..."
              helperText="Upload transparent cutout or photo (PNG, WebP). Drag & drop, browse device, or choose from Media Gallery."
            />
          </div>

          {/* Section 2: Inner Orbit Layer (Radius 295px • CCW 36s) */}
          <div className="space-y-3">
            <div className="flex items-center justify-between pb-2 border-b border-slate-200">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-[#0EA5E9]" />
                <h4 className="font-bold text-sm text-[#1E3A5F]">
                  Inner Orbit (Layer 1 • Radius 295px • CCW 36s)
                </h4>
                <span className="px-2 py-0.5 rounded-full bg-sky-100 text-[#0284C7] font-bold text-[10px]">
                  {innerOrbitSites.length} stores
                </span>
              </div>
            </div>

            {innerOrbitSites.length === 0 ? (
              <div className="p-6 rounded-2xl border-2 border-dashed border-slate-200 text-center text-xs text-slate-400">
                No stores currently in the inner orbit ring. Click "+ Add Rotating Site" or switch an outer store to inner.
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {innerOrbitSites.map((site) => (
                  <SiteItemCard
                    key={site.id}
                    site={site}
                    onEdit={() => handleEditSite(site)}
                    onDuplicate={() => handleDuplicateSite(site)}
                    onDelete={() => handleDeleteSite(site.id)}
                    onSwitchOrbit={() => handleSwitchOrbit(site.id)}
                    isConfirmingDelete={deleteConfirmId === site.id}
                    onStartConfirmDelete={() => setDeleteConfirmId(site.id)}
                    onCancelConfirmDelete={() => setDeleteConfirmId(null)}
                  />
                ))}
              </div>
            )}
          </div>

          {/* Section 3: Outer Orbit Layer (Radius 390px • CW 48s) */}
          <div className="space-y-3">
            <div className="flex items-center justify-between pb-2 border-b border-slate-200">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-[#1E3A5F]" />
                <h4 className="font-bold text-sm text-[#1E3A5F]">
                  Outer Orbit (Layer 2 • Radius 390px • CW 48s)
                </h4>
                <span className="px-2 py-0.5 rounded-full bg-slate-200 text-slate-700 font-bold text-[10px]">
                  {outerOrbitSites.length} stores
                </span>
              </div>
            </div>

            {outerOrbitSites.length === 0 ? (
              <div className="p-6 rounded-2xl border-2 border-dashed border-slate-200 text-center text-xs text-slate-400">
                No stores currently in the outer orbit ring.
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {outerOrbitSites.map((site) => (
                  <SiteItemCard
                    key={site.id}
                    site={site}
                    onEdit={() => handleEditSite(site)}
                    onDuplicate={() => handleDuplicateSite(site)}
                    onDelete={() => handleDeleteSite(site.id)}
                    onSwitchOrbit={() => handleSwitchOrbit(site.id)}
                    isConfirmingDelete={deleteConfirmId === site.id}
                    onStartConfirmDelete={() => setDeleteConfirmId(site.id)}
                    onCancelConfirmDelete={() => setDeleteConfirmId(null)}
                  />
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Modal Footer */}
        <div className="px-6 py-3.5 border-t border-slate-200 bg-slate-50 flex items-center justify-between text-xs">
          <span className="text-slate-500">
            Changes are saved to both CMS and public live homepage immediately.
          </span>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl border border-slate-300 hover:bg-slate-200 text-slate-700 font-bold transition-colors cursor-pointer"
            >
              Done
            </button>
            <button
              type="button"
              disabled={isSaving}
              onClick={() => handleSaveAll()}
              className="px-5 py-2 rounded-xl bg-[#1E3A5F] hover:bg-[#2D5D86] text-white font-extrabold flex items-center gap-1.5 transition-colors cursor-pointer shadow-xs"
            >
              <Save className="w-3.5 h-3.5 text-[#7DD3FC]" />
              <span>{isSaving ? 'Saving...' : 'Save & Publish Live'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Rotating Site Add / Edit Modal */}
      <RotatingSiteEditModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        onSave={handleSaveSiteModal}
        initialSite={editingSite}
        existingSitesCount={{
          inner: innerOrbitSites.length,
          outer: outerOrbitSites.length,
        }}
      />
    </div>
  );
};

// ---------------- Helper Card for Site Items ----------------
interface SiteItemCardProps {
  site: StoreOrbitItem;
  onEdit: () => void;
  onDuplicate: () => void;
  onDelete: () => void;
  onSwitchOrbit: () => void;
  isConfirmingDelete: boolean;
  onStartConfirmDelete: () => void;
  onCancelConfirmDelete: () => void;
}

const SiteItemCard: React.FC<SiteItemCardProps> = ({
  site,
  onEdit,
  onDuplicate,
  onDelete,
  onSwitchOrbit,
  isConfirmingDelete,
  onStartConfirmDelete,
  onCancelConfirmDelete,
}) => {
  return (
    <div className="p-3.5 rounded-2xl border border-slate-200 bg-white hover:border-[#0EA5E9] hover:shadow-md transition-all flex flex-col justify-between gap-3 group">
      <div className="flex items-start gap-3">
        {/* Planet Icon / Favicon / Logo Preview */}
        <div className="w-12 h-12 rounded-full bg-slate-50 border-2 border-[#1E3A5F] shadow-xs flex items-center justify-center p-1 shrink-0 relative overflow-hidden">
          {site.logoUrl ? (
            <img
              src={site.logoUrl}
              alt={site.name}
              className="w-full h-full object-contain rounded-full"
              onError={(e) => {
                (e.target as HTMLElement).style.display = 'none';
              }}
            />
          ) : site.faviconDomain ? (
            <img
              src={`https://www.google.com/s2/favicons?domain=${site.faviconDomain}&sz=128`}
              alt={site.name}
              className="w-full h-full object-contain rounded-full p-0.5"
              onError={(e) => {
                (e.target as HTMLElement).style.display = 'none';
              }}
            />
          ) : (
            <span className="font-urbanist font-black text-xs text-[#1E3A5F]">
              {site.fallbackInitials || 'ST'}
            </span>
          )}
        </div>

        {/* Details */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-1.5">
            <h5 className="font-bold text-xs sm:text-sm text-slate-900 truncate">
              {site.name}
            </h5>
            <span className="text-[10px] font-mono font-bold text-[#0EA5E9]">
              {site.angle}°
            </span>
          </div>
          <p className="text-[11px] text-slate-500 truncate">{site.sublabel}</p>
          <a
            href={site.url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[10.5px] font-mono text-[#0284C7] hover:underline truncate block"
          >
            {site.url}
          </a>
        </div>
      </div>

      {/* Card Actions Footer */}
      <div className="flex items-center justify-between pt-2 border-t border-slate-100 text-xs">
        <button
          type="button"
          onClick={onSwitchOrbit}
          className="text-[10.5px] font-bold text-slate-600 hover:text-[#0EA5E9] flex items-center gap-1 cursor-pointer transition-colors"
          title="Move to other orbit layer"
        >
          {site.orbitIndex === 1 ? (
            <>
              <RotateCw className="w-3 h-3 text-slate-400" />
              <span>Move to Outer</span>
            </>
          ) : (
            <>
              <RotateCcw className="w-3 h-3 text-slate-400" />
              <span>Move to Inner</span>
            </>
          )}
        </button>

        <div className="flex items-center gap-1.5">
          <button
            type="button"
            onClick={onEdit}
            className="px-2.5 py-1 rounded-lg bg-slate-100 hover:bg-[#1E3A5F] hover:text-white text-slate-700 font-bold text-[11px] flex items-center gap-1 transition-all cursor-pointer"
          >
            <Edit3 className="w-3 h-3" />
            <span>Edit</span>
          </button>

          <button
            type="button"
            onClick={onDuplicate}
            className="p-1.5 rounded-lg hover:bg-slate-100 text-slate-400 hover:text-slate-700 cursor-pointer"
            title="Duplicate site"
          >
            <Copy className="w-3 h-3" />
          </button>

          {isConfirmingDelete ? (
            <div className="flex items-center gap-1 bg-red-600 text-white px-2 py-0.5 rounded-lg animate-fade-in">
              <span className="text-[9.5px] font-bold">Delete?</span>
              <button
                type="button"
                onClick={onDelete}
                className="px-1.5 py-0.2 rounded bg-white text-red-600 font-black text-[9px] cursor-pointer"
              >
                Yes
              </button>
              <button
                type="button"
                onClick={onCancelConfirmDelete}
                className="px-1 py-0.2 rounded bg-red-800 text-white font-bold text-[9px] cursor-pointer"
              >
                No
              </button>
            </div>
          ) : (
            <button
              type="button"
              onClick={onStartConfirmDelete}
              className="p-1.5 rounded-lg hover:bg-red-50 text-slate-400 hover:text-red-600 cursor-pointer"
              title="Delete site"
            >
              <Trash2 className="w-3 h-3" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

// ---------------- Default Fallback Sites ----------------
const DEFAULT_FALLBACK_SITES: StoreOrbitItem[] = [
  {
    id: 'store-diyative',
    name: 'DIYATIVE',
    sublabel: '3D Wooden Models & Kits • Visit ↗',
    url: 'https://diyative.com/',
    angle: 45,
    radius: 295,
    size: 72,
    orbitIndex: 1,
    flyInDelay: 0.4,
    fallbackInitials: 'DIY',
    faviconDomain: 'diyative.com',
  },
  {
    id: 'store-skin-by-brownlee',
    name: 'Skin by Brownlee & Co.',
    sublabel: 'Clinical Skincare DTC • Visit ↗',
    url: 'https://skinbybrownleeandco.com/',
    angle: 225,
    radius: 295,
    size: 72,
    orbitIndex: 1,
    flyInDelay: 0.6,
    fallbackInitials: 'SB',
    faviconDomain: 'skinbybrownleeandco.com',
  },
  {
    id: 'store-willow-bath',
    name: 'Willow Bath & Vanity',
    sublabel: 'Shopify & Home Depot • Visit ↗',
    url: 'https://willowbathandvanity.com/',
    angle: 30,
    radius: 390,
    size: 70,
    orbitIndex: 2,
    flyInDelay: 0.8,
    fallbackInitials: 'WB',
    faviconDomain: 'willowbathandvanity.com',
  },
  {
    id: 'store-sultans-fabrics',
    name: "Sultan's Fine Fabrics",
    sublabel: 'Luxury Textiles • Visit ↗',
    url: 'https://www.sultansfinefabrics.com/',
    angle: 150,
    radius: 390,
    size: 70,
    orbitIndex: 2,
    flyInDelay: 1.0,
    fallbackInitials: 'SF',
    faviconDomain: 'sultansfinefabrics.com',
  },
  {
    id: 'store-canton-roast',
    name: 'Canton Roast',
    sublabel: 'Online Ordering • Visit ↗',
    url: 'https://cantonroast.com/',
    angle: 270,
    radius: 390,
    size: 70,
    orbitIndex: 2,
    flyInDelay: 1.2,
    fallbackInitials: 'CR',
    faviconDomain: 'cantonroast.com',
  },
];
