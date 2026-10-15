import React, { useState, useEffect } from 'react';
import {
  Layers,
  Eye,
  Sliders,
  Save,
  Plus,
  RefreshCw,
  Flame,
  Smartphone,
  Tablet,
  Monitor,
  Download,
  Upload,
  CheckCircle2,
  AlertCircle,
  FileText,
  Split,
  Edit3,
  LogOut,
  ExternalLink,
  CloudCheck,
  Check,
  Globe,
} from 'lucide-react';
import { PageDocument, RowBlock, GlobalConfigurations, MediaItem } from '../types/schema';
import { PageSummary } from '../repositories/ContentRepository';
import { contentService } from '../services/ContentServiceFactory';
import { LocalStorageContentService } from '../services/LocalStorageContentService';
import { WpBakeryBuilder } from './WpBakeryBuilder';
import { LivePageRenderer } from './LivePageRenderer';
import { PropertyInspector, SelectedItem } from './PropertyInspector';
import { FirebaseGuideModal } from './FirebaseGuideModal';
import { AdminSidebar, AdminActiveSection } from './AdminSidebar';
import { DashboardOverviewView } from './DashboardOverviewView';
import { GlobalContentEditor, GlobalSectionKey } from './GlobalContentEditor';
import { MediaLibraryView } from './MediaLibraryView';
import { useAuth } from '../auth/AuthContext';

type StudioViewMode = 'split' | 'builder' | 'preview';
type DeviceViewport = 'desktop' | 'tablet' | 'mobile';

interface CmsStudioProps {
  onExitAdmin?: () => void;
}

export const CmsStudio: React.FC<CmsStudioProps> = ({ onExitAdmin }) => {
  const { user, logout } = useAuth();

  // Navigation state
  const [activeSection, setActiveSection] = useState<AdminActiveSection>({ type: 'dashboard' });

  // Data states
  const [pages, setPages] = useState<PageSummary[]>([]);
  const [currentPage, setCurrentPage] = useState<PageDocument | null>(null);
  const [globals, setGlobals] = useState<GlobalConfigurations | null>(null);
  const [mediaItems, setMediaItems] = useState<MediaItem[]>([]);

  // Editor states
  const [selectedItem, setSelectedItem] = useState<SelectedItem | null>(null);
  const [viewMode, setViewMode] = useState<StudioViewMode>('split');
  const [deviceViewport, setDeviceViewport] = useState<DeviceViewport>('desktop');
  const [isFirebaseGuideOpen, setIsFirebaseGuideOpen] = useState(false);
  const [isJsonModalOpen, setIsJsonModalOpen] = useState(false);
  const [isPreviewModalOpen, setIsPreviewModalOpen] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [hasPendingChanges, setHasPendingChanges] = useState(false);
  const [saveToast, setSaveToast] = useState<string | null>(null);
  const [lastPublishedTime, setLastPublishedTime] = useState<string>('Just now');

  // Load pages, globals, and media on mount
  useEffect(() => {
    loadAllData();
  }, []);

  const loadAllData = async (preferredSlug?: string) => {
    const pageList = await contentService.listPages();
    setPages(pageList);

    const globalConfig = await contentService.getGlobals();
    setGlobals(globalConfig);

    const mediaList = await contentService.getMediaLibrary();
    setMediaItems(mediaList);

    // If a page slug was specified or if currently on a page, load it
    const targetSlug = preferredSlug || (activeSection.type === 'page' ? activeSection.slug : 'homepage');
    const fullDoc = await contentService.getPageBySlug(targetSlug);
    if (fullDoc) setCurrentPage(fullDoc);
  };

  const handleSelectSection = async (section: AdminActiveSection) => {
    setSelectedItem(null);
    setActiveSection(section);

    if (section.type === 'page') {
      const doc = await contentService.getPageBySlug(section.slug);
      if (doc) setCurrentPage(doc);
    }
  };

  const handlePublishChanges = async () => {
    setIsSaving(true);
    try {
      if (currentPage && activeSection.type === 'page') {
        await contentService.savePage(currentPage);
      }
      const nowStr = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
      setLastPublishedTime(`Today at ${nowStr}`);
      setHasPendingChanges(false);
      await loadAllData();
      showToast('All changes successfully committed and published live!');
    } catch (err) {
      console.error(err);
      showToast('Failed to publish changes.');
    } finally {
      setIsSaving(false);
    }
  };

  const handleSaveGlobals = async (updated: Partial<GlobalConfigurations>) => {
    const res = await contentService.saveGlobals(updated);
    setGlobals(res);
    setHasPendingChanges(false);
  };

  const handleUploadMedia = async (file: File) => {
    const item = await contentService.uploadMedia(file);
    const updated = await contentService.getMediaLibrary();
    setMediaItems(updated);
    showToast(`Uploaded ${item.fileName}`);
    return item;
  };

  const handleDeleteMedia = async (id: string) => {
    await contentService.deleteMedia(id);
    const updated = await contentService.getMediaLibrary();
    setMediaItems(updated);
    showToast('Asset removed from library.');
    return true;
  };

  const showToast = (msg: string) => {
    setSaveToast(msg);
    setTimeout(() => setSaveToast(null), 3000);
  };

  // ---------------- Inspector Updating Handlers ----------------
  const handleUpdateRow = (rowId: string, updatedSettings: Partial<RowBlock['settings']>) => {
    if (!currentPage) return;
    const sections = (currentPage.sections || []).map((row) => {
      if (row.id !== rowId) return row;
      return {
        ...row,
        settings: {
          ...row.settings,
          ...updatedSettings,
        },
      };
    });
    const updatedPage = { ...currentPage, sections };
    setCurrentPage(updatedPage);
    setHasPendingChanges(true);
    const updatedRow = sections.find((r) => r.id === rowId);
    if (updatedRow) setSelectedItem({ type: 'row', row: updatedRow });
  };

  const handleUpdateColumn = (rowId: string, colId: string, updatedCol: any) => {
    if (!currentPage) return;
    const sections = (currentPage.sections || []).map((row) => {
      if (row.id !== rowId) return row;
      return {
        ...row,
        columns: row.columns.map((col) => {
          if (col.id !== colId) return col;
          return {
            ...col,
            ...updatedCol,
          };
        }),
      };
    });
    const updatedPage = { ...currentPage, sections };
    setCurrentPage(updatedPage);
    setHasPendingChanges(true);
    const foundCol = sections.find((r) => r.id === rowId)?.columns.find((c) => c.id === colId);
    if (foundCol) setSelectedItem({ type: 'column', rowId, column: foundCol });
  };

  const handleUpdateElement = (
    rowId: string,
    colId: string,
    elId: string,
    updatedElement: any
  ) => {
    if (!currentPage) return;
    const sections = (currentPage.sections || []).map((row) => {
      if (row.id !== rowId) return row;
      return {
        ...row,
        columns: row.columns.map((col) => {
          if (col.id !== colId) return col;
          return {
            ...col,
            elements: col.elements.map((el) => {
              if (el.id !== elId) return el;
              return {
                ...el,
                ...updatedElement,
              };
            }),
          };
        }),
      };
    });
    const updatedPage = { ...currentPage, sections };
    setCurrentPage(updatedPage);
    setHasPendingChanges(true);
    const foundEl = sections
      .find((r) => r.id === rowId)
      ?.columns.find((c) => c.id === colId)
      ?.elements.find((e) => e.id === elId);
    if (foundEl) setSelectedItem({ type: 'element', rowId, colId, element: foundEl });
  };

  const handleDeleteElement = (rowId: string, colId: string, elId: string) => {
    if (!currentPage) return;
    const sections = (currentPage.sections || []).map((row) => {
      if (row.id !== rowId) return row;
      return {
        ...row,
        columns: row.columns.map((col) => {
          if (col.id !== colId) return col;
          return {
            ...col,
            elements: col.elements.filter((el) => el.id !== elId),
          };
        }),
      };
    });
    setCurrentPage({ ...currentPage, sections });
    setHasPendingChanges(true);
    setSelectedItem(null);
  };

  const handleDuplicateElement = (rowId: string, colId: string, elId: string) => {
    if (!currentPage) return;
    const sections = (currentPage.sections || []).map((row) => {
      if (row.id !== rowId) return row;
      return {
        ...row,
        columns: row.columns.map((col) => {
          if (col.id !== colId) return col;
          const elIdx = col.elements.findIndex((e) => e.id === elId);
          if (elIdx === -1) return col;
          const original = col.elements[elIdx];
          const cloned = {
            ...JSON.parse(JSON.stringify(original)),
            id: `el_${Date.now()}_copy`,
          };
          const elements = [...col.elements];
          elements.splice(elIdx + 1, 0, cloned);
          return { ...col, elements };
        }),
      };
    });
    setCurrentPage({ ...currentPage, sections });
    setHasPendingChanges(true);
  };

  const viewportWidthClass =
    deviceViewport === 'mobile'
      ? 'max-w-sm'
      : deviceViewport === 'tablet'
      ? 'max-w-2xl'
      : 'w-full';

  return (
    <div className="w-full h-screen max-h-screen flex overflow-hidden bg-[#F4F8FB] font-inter text-[#1E3A5F]">
      {/* =========================================================================
          LEFT SIDEBAR NAVIGATION (Enterprise Dashboard Architecture)
         ========================================================================= */}
      <AdminSidebar
        activeSection={activeSection}
        onSelectSection={handleSelectSection}
        onLogout={() => {
          logout();
          if (onExitAdmin) onExitAdmin();
        }}
        onReturnToHome={() => {
          if (onExitAdmin) onExitAdmin();
        }}
        pageCount={pages.length}
      />

      {/* =========================================================================
          MAIN WORKSPACE CONTENT AREA
         ========================================================================= */}
      <div className="flex-1 flex flex-col min-w-0 h-full overflow-hidden">
        {/* TOP STATUS & ACTION BAR */}
        <header className="px-5 py-3 bg-white border-b border-[#BCD5E6] flex flex-wrap items-center justify-between gap-3 shadow-2xs z-20 shrink-0 select-none">
          {/* Left: Status Indicator */}
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-slate-50 border border-[#BCD5E6] text-xs font-bold text-[#1E3A5F]">
              <span
                className={`w-2 h-2 rounded-full ${
                  hasPendingChanges
                    ? 'bg-amber-500 shadow-[0_0_8px_#F59E0B] animate-pulse'
                    : 'bg-emerald-500 shadow-[0_0_8px_#10B981]'
                }`}
              />
              <span>
                {hasPendingChanges
                  ? '● Draft Changes Pending'
                  : '● All Changes Published & Live'}
              </span>
            </div>

            {activeSection.type === 'page' && currentPage && (
              <span className="hidden sm:inline text-xs font-semibold text-slate-500">
                Editing: <strong className="text-[#1E3A5F]">{currentPage.title}</strong>
              </span>
            )}
          </div>

          {/* Center: WPBakery View Mode Selector (When editing a page) */}
          {activeSection.type === 'page' && (
            <div className="flex items-center gap-1 p-0.5 rounded-xl bg-[#EFF6FB] border border-[#BCD5E6]">
              <button
                type="button"
                onClick={() => setViewMode('split')}
                className={`px-3 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                  viewMode === 'split'
                    ? 'bg-white text-[#1E3A5F] shadow-xs border border-[#BCD5E6]'
                    : 'text-slate-500 hover:text-[#1E3A5F]'
                }`}
              >
                <Split className="w-3.5 h-3.5 text-[#0EA5E9]" />
                <span>Side-by-Side</span>
              </button>
              <button
                type="button"
                onClick={() => setViewMode('builder')}
                className={`px-3 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                  viewMode === 'builder'
                    ? 'bg-white text-[#1E3A5F] shadow-xs border border-[#BCD5E6]'
                    : 'text-slate-500 hover:text-[#1E3A5F]'
                }`}
              >
                <Edit3 className="w-3.5 h-3.5 text-[#0EA5E9]" />
                <span>Visual Builder</span>
              </button>
              <button
                type="button"
                onClick={() => {
                  setViewMode('preview');
                  setSelectedItem(null);
                }}
                className={`px-3 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                  viewMode === 'preview'
                    ? 'bg-white text-[#1E3A5F] shadow-xs border border-[#BCD5E6]'
                    : 'text-slate-500 hover:text-[#1E3A5F]'
                }`}
              >
                <Eye className="w-3.5 h-3.5 text-[#0EA5E9]" />
                <span>Live Output</span>
              </button>
            </div>
          )}

          {/* Right: Actions (Preview Website, Publish Changes, Firebase, Schema) */}
          <div className="flex items-center gap-2">
            {/* Viewport switch in preview/split */}
            {activeSection.type === 'page' && viewMode !== 'builder' && (
              <div className="hidden sm:flex items-center gap-1 px-1 py-0.5 rounded-lg bg-[#EFF6FB] border border-[#BCD5E6]">
                <button
                  type="button"
                  onClick={() => setDeviceViewport('desktop')}
                  className={`p-1 rounded ${deviceViewport === 'desktop' ? 'bg-white text-[#1E3A5F] shadow-xs' : 'text-slate-400'}`}
                  title="Desktop"
                >
                  <Monitor className="w-3.5 h-3.5" />
                </button>
                <button
                  type="button"
                  onClick={() => setDeviceViewport('tablet')}
                  className={`p-1 rounded ${deviceViewport === 'tablet' ? 'bg-white text-[#1E3A5F] shadow-xs' : 'text-slate-400'}`}
                  title="Tablet"
                >
                  <Tablet className="w-3.5 h-3.5" />
                </button>
                <button
                  type="button"
                  onClick={() => setDeviceViewport('mobile')}
                  className={`p-1 rounded ${deviceViewport === 'mobile' ? 'bg-white text-[#1E3A5F] shadow-xs' : 'text-slate-400'}`}
                  title="Mobile"
                >
                  <Smartphone className="w-3.5 h-3.5" />
                </button>
              </div>
            )}

            {/* Firebase Guide Button */}
            <button
              type="button"
              onClick={() => setIsFirebaseGuideOpen(true)}
              className="px-2.5 py-1.5 rounded-lg bg-amber-50 hover:bg-amber-100 border border-amber-300 text-amber-900 font-bold text-xs flex items-center gap-1.5 transition-all cursor-pointer shadow-2xs"
            >
              <Flame className="w-3.5 h-3.5 text-amber-600 fill-amber-500" />
              <span className="hidden md:inline">Firebase Readiness</span>
            </button>

            {/* Inspect NoSQL JSON Document */}
            {currentPage && (
              <button
                type="button"
                onClick={() => setIsJsonModalOpen(true)}
                title="Inspect Firestore JSON Schema"
                className="p-1.5 rounded-lg bg-white border border-[#BCD5E6] hover:bg-[#EFF6FB] text-slate-600 hover:text-[#1E3A5F] cursor-pointer"
              >
                <FileText className="w-4 h-4" />
              </button>
            )}

            {/* Preview Website Modal */}
            <button
              type="button"
              onClick={() => setIsPreviewModalOpen(true)}
              className="px-3.5 py-1.5 rounded-full bg-white hover:bg-[#EFF6FB] border-2 border-[#BCD5E6] text-[#1E3A5F] font-bold text-xs transition-all shadow-2xs cursor-pointer flex items-center gap-1.5"
            >
              <Eye className="w-3.5 h-3.5 text-[#0EA5E9]" />
              <span className="hidden sm:inline">Preview Website</span>
            </button>

            {/* Publish Changes Button */}
            <button
              type="button"
              onClick={handlePublishChanges}
              disabled={isSaving}
              className="px-5 py-1.5 rounded-full bg-[#1E3A5F] hover:bg-[#2D5D86] text-white font-extrabold text-xs transition-all shadow-md cursor-pointer flex items-center gap-1.5 disabled:opacity-50"
            >
              <Save className="w-3.5 h-3.5 text-[#7DD3FC]" />
              <span>{isSaving ? 'Publishing...' : 'Publish Changes'}</span>
            </button>
          </div>
        </header>

        {/* WORKSPACE BODY */}
        <div className="flex-1 flex min-h-0 relative overflow-hidden">
          {/* VIEW 1: OVERVIEW DASHBOARD */}
          {activeSection.type === 'dashboard' && (
            <div className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8">
              <DashboardOverviewView
                pages={pages}
                mediaCount={mediaItems.length}
                lastPublishedTime={lastPublishedTime}
                onSelectPage={(slug) => handleSelectSection({ type: 'page', slug })}
                onSelectNavMenu={() => handleSelectSection({ type: 'global', key: 'navigation' })}
                onOpenPublicSite={() => {
                  if (onExitAdmin) onExitAdmin();
                }}
              />
            </div>
          )}

          {/* VIEW 2: WPBakery PAGE VISUAL BUILDER */}
          {activeSection.type === 'page' && currentPage && (
            <div className="flex-1 flex min-h-0 overflow-hidden">
              {/* BUILDER FULL CANVAS */}
              {viewMode === 'builder' && (
                <div className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8">
                  <WpBakeryBuilder
                    page={currentPage}
                    selectedItem={selectedItem}
                    onSelectItem={setSelectedItem}
                    onUpdatePage={(up) => {
                      setCurrentPage(up);
                      setHasPendingChanges(true);
                    }}
                  />
                </div>
              )}

              {/* SPLIT VIEW (Side-by-Side Builder & Live Viewport) */}
              {viewMode === 'split' && (
                <div className="flex-1 flex min-h-0 divide-x divide-[#BCD5E6]">
                  {/* Left: Wireframe builder */}
                  <div className="w-1/2 overflow-y-auto p-4 bg-[#F8FAFC]">
                    <div className="mb-3 px-3 py-1 bg-white border border-[#BCD5E6] rounded-lg text-xs font-bold text-[#1E3A5F] flex items-center justify-between">
                      <span className="flex items-center gap-1.5">
                        <Edit3 className="w-3.5 h-3.5 text-[#0EA5E9]" />
                        <span>WPBakery Block Structure (Edit Mode)</span>
                      </span>
                      <span className="text-[10px] text-slate-400 font-mono">
                        {currentPage.sections.length} Rows
                      </span>
                    </div>
                    <WpBakeryBuilder
                      page={currentPage}
                      selectedItem={selectedItem}
                      onSelectItem={setSelectedItem}
                      onUpdatePage={(up) => {
                        setCurrentPage(up);
                        setHasPendingChanges(true);
                      }}
                    />
                  </div>

                  {/* Right: Live Viewport Output */}
                  <div className="w-1/2 overflow-y-auto p-4 bg-[#E2E8F0]/40 flex justify-center">
                    <div
                      className={`bg-white rounded-2xl shadow-xl overflow-hidden border border-[#BCD5E6] transition-all my-2 ${viewportWidthClass} h-fit min-h-[500px]`}
                    >
                      <div className="p-2 bg-slate-100 border-b border-slate-200 text-center text-[10px] font-bold text-slate-500 uppercase tracking-widest">
                        Live Viewport Output • {currentPage.title}
                      </div>
                      <LivePageRenderer page={currentPage} />
                    </div>
                  </div>
                </div>
              )}

              {/* LIVE FULL OUTPUT VIEW */}
              {viewMode === 'preview' && (
                <div className="flex-1 overflow-y-auto p-4 sm:p-8 bg-slate-100/60 flex justify-center">
                  <div
                    className={`bg-white rounded-2xl shadow-2xl overflow-hidden border border-[#BCD5E6] transition-all my-2 ${viewportWidthClass} h-fit min-h-screen`}
                  >
                    <LivePageRenderer page={currentPage} />
                  </div>
                </div>
              )}

              {/* Slide-out Inspector for WPBakery Blocks */}
              {selectedItem && (
                <PropertyInspector
                  selectedItem={selectedItem}
                  onClose={() => setSelectedItem(null)}
                  onUpdateRow={handleUpdateRow}
                  onUpdateColumn={handleUpdateColumn}
                  onUpdateElement={handleUpdateElement}
                  onDeleteElement={handleDeleteElement}
                  onDuplicateElement={handleDuplicateElement}
                />
              )}
            </div>
          )}

          {/* VIEW 3: GLOBAL CONFIGURATIONS */}
          {activeSection.type === 'global' && globals && (
            <div className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8">
              <GlobalContentEditor
                sectionKey={activeSection.key}
                globals={globals}
                onSaveGlobals={handleSaveGlobals}
              />
            </div>
          )}

          {/* VIEW 4: MEDIA LIBRARY */}
          {activeSection.type === 'media' && (
            <div className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8">
              <MediaLibraryView
                mediaItems={mediaItems}
                onUploadMedia={handleUploadMedia}
                onDeleteMedia={handleDeleteMedia}
              />
            </div>
          )}

          {/* VIEW 5: PUBLISHING & HISTORY */}
          {activeSection.type === 'publishing' && (
            <div className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8 max-w-4xl mx-auto space-y-6">
              <div className="pb-3 border-b border-[#BCD5E6]">
                <h2 className="font-urbanist font-extrabold text-2xl text-[#1E3A5F]">
                  Publishing & Cloud Synchronization
                </h2>
                <p className="text-xs text-slate-500 mt-0.5">
                  View release history, staging state, and live Firestore replication.
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-white border-2 border-[#BCD5E6] shadow-xs space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-bold text-sm text-[#1E3A5F]">Current Production Release</h4>
                    <p className="text-xs text-slate-500 mt-0.5">
                      Last published: {lastPublishedTime} by Russell Taga-an
                    </p>
                  </div>
                  <span className="px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 text-xs font-bold">
                    Active & Live
                  </span>
                </div>

                <div className="p-3.5 rounded-xl bg-[#EFF6FB] border border-[#BCD5E6] text-xs space-y-2">
                  <div className="flex items-center gap-2 font-bold text-[#1E3A5F]">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                    <span>3 Core Pages Compiled:</span>
                  </div>
                  <ul className="list-disc pl-5 text-slate-600 space-y-1 text-[11px]">
                    <li>Homepage (Hero 3/5 + 2/5, Profile Orbit, Client Tech Marquee)</li>
                    <li>About (Profile Card, Executive Narrative, Verified Experience Timeline)</li>
                    <li>Work (Featured Systems Showcase, 25K+ SKU Matrix, Category Filter Grid)</li>
                  </ul>
                </div>

                <button
                  type="button"
                  onClick={handlePublishChanges}
                  className="px-6 py-2.5 rounded-full bg-[#1E3A5F] hover:bg-[#2D5D86] text-white font-extrabold text-xs transition-all shadow-md cursor-pointer"
                >
                  Force Full Cloud Re-Sync
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* =========================================================================
          MODAL: FULL PREVIEW WEBSITE
         ========================================================================= */}
      {isPreviewModalOpen && currentPage && (
        <div className="fixed inset-0 z-50 bg-[#1E3A5F]/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="w-full max-w-5xl h-[85vh] bg-white rounded-3xl border-2 border-[#BCD5E6] shadow-2xl flex flex-col overflow-hidden animate-fade-up">
            <div className="px-5 py-3.5 bg-slate-100 border-b border-slate-200 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Globe className="w-4 h-4 text-[#0EA5E9]" />
                <span className="font-urbanist font-extrabold text-sm text-[#1E3A5F]">
                  Website Preview • {currentPage.title}
                </span>
              </div>
              <button
                type="button"
                onClick={() => setIsPreviewModalOpen(false)}
                className="text-slate-400 hover:text-[#1E3A5F] font-bold text-sm cursor-pointer"
              >
                ✕ Close Preview
              </button>
            </div>
            <div className="flex-1 overflow-y-auto p-4 sm:p-8">
              <LivePageRenderer page={currentPage} />
            </div>
          </div>
        </div>
      )}

      {/* =========================================================================
          FIREBASE CHECKLIST MODAL
         ========================================================================= */}
      <FirebaseGuideModal
        isOpen={isFirebaseGuideOpen}
        onClose={() => setIsFirebaseGuideOpen(false)}
      />

      {/* =========================================================================
          JSON SCHEMA MODAL
         ========================================================================= */}
      {isJsonModalOpen && currentPage && (
        <div className="fixed inset-0 z-50 bg-[#1E3A5F]/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="w-full max-w-2xl bg-white rounded-2xl border-2 border-[#BCD5E6] shadow-2xl p-6 flex flex-col max-h-[80vh] animate-fade-up">
            <div className="flex items-center justify-between pb-3 border-b border-[#BCD5E6]">
              <div className="flex items-center gap-2">
                <FileText className="w-4 h-4 text-[#0EA5E9]" />
                <h3 className="font-urbanist font-extrabold text-sm text-[#1E3A5F]">
                  Firestore NoSQL Document (`/pages/{currentPage.id}`)
                </h3>
              </div>
              <button
                onClick={() => setIsJsonModalOpen(false)}
                className="text-slate-400 hover:text-[#1E3A5F] cursor-pointer"
              >
                ✕
              </button>
            </div>
            <div className="flex-1 overflow-y-auto mt-3">
              <pre className="p-3.5 rounded-xl bg-slate-900 text-emerald-400 font-mono text-[10px] leading-relaxed">
                {JSON.stringify(currentPage, null, 2)}
              </pre>
            </div>
            <div className="mt-4 pt-3 border-t border-[#BCD5E6] flex justify-end">
              <button
                type="button"
                onClick={() => {
                  navigator.clipboard.writeText(JSON.stringify(currentPage, null, 2));
                  showToast('Document JSON copied to clipboard!');
                  setIsJsonModalOpen(false);
                }}
                className="px-4 py-2 rounded-full bg-[#1E3A5F] text-white text-xs font-bold cursor-pointer hover:bg-[#2D5D86]"
              >
                Copy JSON Payload
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Toast Feedback */}
      {saveToast && (
        <div className="fixed bottom-6 right-6 z-50 px-4 py-2.5 rounded-xl bg-[#1E3A5F] text-white text-xs font-bold shadow-xl border border-sky-400 flex items-center gap-2 animate-fade-up">
          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          <span>{saveToast}</span>
        </div>
      )}
    </div>
  );
};
