import React, { useState } from 'react';
import {
  Plus,
  MoveUp,
  MoveDown,
  Settings,
  Trash2,
  Copy,
  Columns as ColumnsIcon,
  Maximize2,
  Layers,
  Sparkles,
  Radio,
  X,
} from 'lucide-react';
import {
  PageDocument,
  RowBlock,
  ColumnBlock,
  ElementBlock,
  ColumnWidth,
  ElementType,
  RotatingSiteItem,
} from '../types/schema';
import { ELEMENT_REGISTRY } from '../registry/ElementRegistry';
import { SelectedItem } from './PropertyInspector';
import { RotatingSiteEditModal } from './RotatingSiteEditModal';

interface WpBakeryBuilderProps {
  page: PageDocument;
  selectedItem: SelectedItem | null;
  onSelectItem: (item: SelectedItem | null) => void;
  onUpdatePage: (updatedPage: PageDocument) => void;
  onSelectProjectCard?: (
    rowId: string,
    colId: string,
    elId: string,
    project: any,
    projectIndex: number
  ) => void;
  onDeleteProjectCard?: (
    rowId: string,
    colId: string,
    elId: string,
    project: any,
    projectIndex: number
  ) => void;
  onAddProjectCard?: (rowId: string, colId: string, elId: string) => void;
}

export const WpBakeryBuilder: React.FC<WpBakeryBuilderProps> = ({
  page,
  selectedItem,
  onSelectItem,
  onUpdatePage,
  onSelectProjectCard,
  onDeleteProjectCard,
  onAddProjectCard,
}) => {
  const [deleteConfirmProjectKey, setDeleteConfirmProjectKey] = useState<string | null>(null);
  const [editingRotatingSite, setEditingRotatingSite] = useState<{
    rowId: string;
    colId: string;
    elId: string;
    site: RotatingSiteItem | null;
  } | null>(null);
  const [deleteConfirmSiteKey, setDeleteConfirmSiteKey] = useState<string | null>(null);

  const handleSaveRotatingSite = (savedSite: RotatingSiteItem) => {
    if (!editingRotatingSite) return;
    const { rowId, colId, elId } = editingRotatingSite;
    const updatedSections = page.sections.map((r) => {
      if (r.id !== rowId) return r;
      return {
        ...r,
        columns: r.columns.map((c) => {
          if (c.id !== colId) return c;
          return {
            ...c,
            elements: c.elements.map((e) => {
              if (e.id !== elId || e.type !== 'profileOrbit') return e;
              const content = (e.content as any)?.data || {};
              const currentSites = (content.rotatingSites || []) as RotatingSiteItem[];
              const existingIdx = currentSites.findIndex((s) => s.id === savedSite.id);
              let updatedSites: RotatingSiteItem[];
              if (existingIdx >= 0) {
                updatedSites = [...currentSites];
                updatedSites[existingIdx] = savedSite;
              } else {
                updatedSites = [...currentSites, savedSite];
              }
              const newContent = {
                ...e.content,
                data: {
                  ...content,
                  rotatingSites: updatedSites,
                },
              };
              window.dispatchEvent(
                new CustomEvent('rotating-sites-updated', { detail: { rotatingSites: updatedSites } })
              );
              return { ...e, content: newContent };
            }),
          };
        }),
      };
    });
    onUpdatePage({ ...page, sections: updatedSections });
    setEditingRotatingSite(null);
  };

  const handleDeleteRotatingSite = (rowId: string, colId: string, elId: string, siteId: string) => {
    const updatedSections = page.sections.map((r) => {
      if (r.id !== rowId) return r;
      return {
        ...r,
        columns: r.columns.map((c) => {
          if (c.id !== colId) return c;
          return {
            ...c,
            elements: c.elements.map((e) => {
              if (e.id !== elId || e.type !== 'profileOrbit') return e;
              const content = (e.content as any)?.data || {};
              const currentSites = (content.rotatingSites || []) as RotatingSiteItem[];
              const updatedSites = currentSites.filter((s) => s.id !== siteId);
              const newContent = {
                ...e.content,
                data: {
                  ...content,
                  rotatingSites: updatedSites,
                },
              };
              window.dispatchEvent(
                new CustomEvent('rotating-sites-updated', { detail: { rotatingSites: updatedSites } })
              );
              return { ...e, content: newContent };
            }),
          };
        }),
      };
    });
    onUpdatePage({ ...page, sections: updatedSections });
    setDeleteConfirmSiteKey(null);
  };

  // Modal states for adding elements or picking column layout
  const [targetColForElement, setTargetColForElement] = useState<{
    rowId: string;
    colId: string;
  } | null>(null);

  const [targetRowForColumns, setTargetRowForColumns] = useState<string | null>(null);

  // ---------------- Row Operations ----------------
  const handleAddRow = () => {
    const newRowId = `row_${Date.now()}`;
    const newColId = `col_${Date.now()}`;
    const newRow: RowBlock = {
      id: newRowId,
      type: 'row',
      settings: {
        layoutWidth: 'boxed',
        bgType: 'none',
        padding: { top: 24, bottom: 24, left: 16, right: 16 },
        margin: { top: 0, bottom: 16 },
      },
      columns: [
        {
          id: newColId,
          type: 'column',
          width: '1/1',
          settings: {
            verticalAlign: 'top',
            textAlign: 'left',
            padding: { top: 8, bottom: 8, left: 8, right: 8 },
            margin: {},
          },
          elements: [],
        },
      ],
    };

    onUpdatePage({
      ...page,
      sections: [...(page.sections || []), newRow],
    });
  };

  const handleMoveRow = (rowIndex: number, direction: 'up' | 'down') => {
    const sections = [...(page.sections || [])];
    const targetIndex = direction === 'up' ? rowIndex - 1 : rowIndex + 1;
    if (targetIndex < 0 || targetIndex >= sections.length) return;

    const [moved] = sections.splice(rowIndex, 1);
    sections.splice(targetIndex, 0, moved);
    onUpdatePage({ ...page, sections });
  };

  const handleDeleteRow = (rowId: string) => {
    onUpdatePage({
      ...page,
      sections: (page.sections || []).filter((r) => r.id !== rowId),
    });
    if (selectedItem?.type === 'row' && selectedItem.row.id === rowId) {
      onSelectItem(null);
    }
  };

  const handleDuplicateRow = (row: RowBlock) => {
    const clonedRow: RowBlock = {
      ...JSON.parse(JSON.stringify(row)),
      id: `row_${Date.now()}_copy`,
      columns: row.columns.map((col) => ({
        ...JSON.parse(JSON.stringify(col)),
        id: `col_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`,
        elements: col.elements.map((el) => ({
          ...JSON.parse(JSON.stringify(el)),
          id: `el_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`,
        })),
      })),
    };

    const sections = [...(page.sections || [])];
    const idx = sections.findIndex((r) => r.id === row.id);
    sections.splice(idx + 1, 0, clonedRow);
    onUpdatePage({ ...page, sections });
  };

  const handleApplyColumnPreset = (rowId: string, widths: ColumnWidth[]) => {
    const sections = (page.sections || []).map((row) => {
      if (row.id !== rowId) return row;

      const existingElements = row.columns.flatMap((c) => c.elements);
      const newColumns: ColumnBlock[] = widths.map((w, idx) => ({
        id: `col_${Date.now()}_${idx}`,
        type: 'column',
        width: w,
        settings: {
          verticalAlign: 'top',
          textAlign: 'left',
          padding: { top: 8, bottom: 8, left: 8, right: 8 },
          margin: {},
        },
        elements: idx === 0 ? existingElements : [],
      }));

      return {
        ...row,
        columns: newColumns,
      };
    });

    onUpdatePage({ ...page, sections });
    setTargetRowForColumns(null);
  };

  // ---------------- Element Operations ----------------
  const handleAddElement = (type: ElementType) => {
    if (!targetColForElement) return;
    const { rowId, colId } = targetColForElement;

    const entry = ELEMENT_REGISTRY[type];
    if (!entry) return;

    const newElement: ElementBlock = {
      id: `el_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`,
      type,
      settings: entry.defaultSettings(),
      content: entry.defaultContent(),
    };

    const sections = (page.sections || []).map((row) => {
      if (row.id !== rowId) return row;
      return {
        ...row,
        columns: row.columns.map((col) => {
          if (col.id !== colId) return col;
          return {
            ...col,
            elements: [...col.elements, newElement],
          };
        }),
      };
    });

    onUpdatePage({ ...page, sections });
    setTargetColForElement(null);
    onSelectItem({ type: 'element', rowId, colId, element: newElement });
  };

  const handleMoveElement = (
    rowId: string,
    colId: string,
    elIndex: number,
    direction: 'up' | 'down'
  ) => {
    const sections = (page.sections || []).map((row) => {
      if (row.id !== rowId) return row;
      return {
        ...row,
        columns: row.columns.map((col) => {
          if (col.id !== colId) return col;
          const elements = [...col.elements];
          const targetIdx = direction === 'up' ? elIndex - 1 : elIndex + 1;
          if (targetIdx < 0 || targetIdx >= elements.length) return col;
          const [moved] = elements.splice(elIndex, 1);
          elements.splice(targetIdx, 0, moved);
          return { ...col, elements };
        }),
      };
    });

    onUpdatePage({ ...page, sections });
  };

  return (
    <div className="w-full max-w-6xl mx-auto space-y-4 pb-20 select-none">
      {/* Visual Canvas Rows */}
      {(page.sections || []).length === 0 ? (
        <div className="p-12 text-center rounded-2xl border-2 border-dashed border-[#BCD5E6] bg-white">
          <Layers className="w-10 h-10 text-[#0EA5E9] mx-auto mb-3" />
          <h3 className="font-urbanist font-extrabold text-lg text-[#1E3A5F]">
            Empty Layout Canvas
          </h3>
          <p className="text-xs text-slate-500 max-w-sm mx-auto mt-1 mb-4">
            Start structuring your page by adding your first WPBakery visual row and responsive column grid.
          </p>
          <button
            type="button"
            onClick={handleAddRow}
            className="px-5 py-2.5 rounded-full bg-[#1E3A5F] hover:bg-[#2D5D86] text-white text-xs font-bold transition-all shadow-md cursor-pointer inline-flex items-center gap-2"
          >
            <Plus className="w-4 h-4" />
            <span>Add First Row Block</span>
          </button>
        </div>
      ) : (
        page.sections.map((row, rowIndex) => (
          <div
            key={row.id}
            className={`rounded-2xl border-2 transition-all bg-white shadow-xs ${
              selectedItem?.type === 'row' && selectedItem.row.id === row.id
                ? 'border-[#0EA5E9] ring-2 ring-[#0EA5E9]/20'
                : 'border-[#BCD5E6]'
            }`}
          >
            {/* Row Toolbar (WPBakery Header Bar) */}
            <div className="px-3.5 py-2 bg-[#F1F6FA] border-b border-[#BCD5E6] flex items-center justify-between rounded-t-2xl">
              <div className="flex items-center gap-2">
                <span className="px-2 py-0.5 rounded-md bg-[#1E3A5F] text-white text-[10px] font-extrabold uppercase tracking-wider">
                  Row #{rowIndex + 1}
                </span>
                <span className="text-[11px] font-semibold text-slate-600">
                  {row.settings.layoutWidth === 'full' ? 'Full-Width' : 'Boxed'} •{' '}
                  {row.columns.length} Col{row.columns.length > 1 ? 's' : ''}
                </span>
              </div>

              {/* Row Action Controls */}
              <div className="flex items-center gap-1">
                <button
                  type="button"
                  onClick={() => setTargetRowForColumns(row.id)}
                  title="Change Column Grid Layout"
                  className="px-2 py-1 rounded-md bg-white border border-[#BCD5E6] hover:bg-[#E0F2FE] text-[11px] font-bold text-[#1E3A5F] transition-all cursor-pointer flex items-center gap-1"
                >
                  <ColumnsIcon className="w-3 h-3 text-[#0EA5E9]" />
                  <span>Columns</span>
                </button>
                <button
                  type="button"
                  onClick={() => handleMoveRow(rowIndex, 'up')}
                  disabled={rowIndex === 0}
                  title="Move Row Up"
                  className="p-1 rounded-md text-slate-500 hover:text-[#1E3A5F] disabled:opacity-30 cursor-pointer"
                >
                  <MoveUp className="w-3.5 h-3.5" />
                </button>
                <button
                  type="button"
                  onClick={() => handleMoveRow(rowIndex, 'down')}
                  disabled={rowIndex === (page.sections?.length || 0) - 1}
                  title="Move Row Down"
                  className="p-1 rounded-md text-slate-500 hover:text-[#1E3A5F] disabled:opacity-30 cursor-pointer"
                >
                  <MoveDown className="w-3.5 h-3.5" />
                </button>
                <button
                  type="button"
                  onClick={() => handleDuplicateRow(row)}
                  title="Duplicate Row"
                  className="p-1 rounded-md text-slate-500 hover:text-[#1E3A5F] cursor-pointer"
                >
                  <Copy className="w-3.5 h-3.5" />
                </button>
                <button
                  type="button"
                  onClick={() => onSelectItem({ type: 'row', row })}
                  title="Row Settings"
                  className="p-1 rounded-md text-[#0EA5E9] hover:bg-[#E0F2FE] cursor-pointer"
                >
                  <Settings className="w-3.5 h-3.5" />
                </button>
                <button
                  type="button"
                  onClick={() => handleDeleteRow(row.id)}
                  title="Delete Row"
                  className="p-1 rounded-md text-slate-400 hover:text-red-600 hover:bg-red-50 cursor-pointer"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Row Column Grid */}
            <div className="p-3 sm:p-4 bg-[#F8FAFC]/50 rounded-b-2xl">
              <div className="flex flex-wrap -mx-1.5 sm:-mx-2">
                {row.columns.map((col) => {
                  const widthClass =
                    col.width === '1/1'
                      ? 'w-full'
                      : col.width === '1/2'
                      ? 'w-full md:w-1/2'
                      : col.width === '1/3'
                      ? 'w-full md:w-1/3'
                      : col.width === '2/3'
                      ? 'w-full md:w-2/3'
                      : col.width === '1/4'
                      ? 'w-full sm:w-1/2 md:w-1/4'
                      : col.width === '3/4'
                      ? 'w-full md:w-3/4'
                      : col.width === '3/5'
                      ? 'w-full md:w-3/5'
                      : col.width === '2/5'
                      ? 'w-full md:w-2/5'
                      : col.width === '1/5'
                      ? 'w-full md:w-1/5'
                      : 'w-full md:w-4/5';

                  const isColSelected =
                    selectedItem?.type === 'column' &&
                    selectedItem.column.id === col.id;

                  return (
                    <div key={col.id} className={`px-1.5 sm:px-2 mb-3 md:mb-0 ${widthClass}`}>
                      <div
                        className={`min-h-[140px] rounded-xl border-2 border-dashed p-3 flex flex-col justify-between transition-all bg-white ${
                          isColSelected
                            ? 'border-[#0EA5E9] bg-sky-50/30'
                            : 'border-[#BCD5E6] hover:border-slate-400'
                        }`}
                      >
                        {/* Column Micro Header */}
                        <div className="flex items-center justify-between pb-2 mb-2 border-b border-slate-100">
                          <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-[#EFF6FB] text-[#2D5D86] border border-[#BCD5E6]">
                            {col.width}
                          </span>
                          <button
                            type="button"
                            onClick={() =>
                              onSelectItem({
                                type: 'column',
                                rowId: row.id,
                                column: col,
                              })
                            }
                            className="text-[10px] font-semibold text-slate-500 hover:text-[#0EA5E9] flex items-center gap-1 cursor-pointer"
                          >
                            <Settings className="w-3 h-3" />
                            <span>Edit Column</span>
                          </button>
                        </div>

                        {/* Column Elements List */}
                        <div className="space-y-2 flex-1">
                          {col.elements.map((el, elIndex) => {
                            const entry = ELEMENT_REGISTRY[el.type];
                            const isElSelected =
                              selectedItem?.type === 'element' &&
                              selectedItem.element.id === el.id;

                            return (
                              <div
                                key={el.id}
                                className={`rounded-lg border transition-all ${
                                  isElSelected
                                    ? 'bg-[#E0F2FE] border-[#0EA5E9] shadow-xs'
                                    : 'bg-white border-[#BCD5E6] hover:border-[#0EA5E9]'
                                }`}
                              >
                                <div
                                  onClick={() =>
                                    onSelectItem({
                                      type: 'element',
                                      rowId: row.id,
                                      colId: col.id,
                                      element: el,
                                    })
                                  }
                                  className="p-2.5 flex items-center justify-between cursor-pointer"
                                >
                                  <div className="flex items-center gap-2 min-w-0 pr-2">
                                    {entry ? (
                                      <entry.icon className="w-4 h-4 text-[#0EA5E9] shrink-0" />
                                    ) : (
                                      <Layers className="w-4 h-4 text-slate-400 shrink-0" />
                                    )}
                                    <div className="min-w-0">
                                      <span className="block text-xs font-bold text-[#1E3A5F] truncate">
                                        {entry?.label || el.type}
                                      </span>
                                      <span className="block text-[10px] text-slate-500 truncate">
                                        {el.type === 'heading' && (el.content as any).data?.text}
                                        {el.type === 'ctaButton' && (el.content as any).data?.label}
                                        {el.type === 'showcaseCard' &&
                                          (el.content as any).data?.title}
                                        {el.type === 'image' && (el.content as any).data?.altText}
                                        {el.type === 'richText' && 'HTML Text Block'}
                                        {el.type === 'gallery' && 'Multi-Image Grid'}
                                        {el.type === 'customHtml' && 'Embed / Shortcode'}
                                        {el.type === 'workShowcase' &&
                                          `${((el.content as any).data?.projects || []).length} Project Cards (Willow Bath, etc.)`}
                                      </span>
                                    </div>
                                  </div>

                                  <div
                                    className="flex items-center gap-1 shrink-0"
                                    onClick={(e) => e.stopPropagation()}
                                  >
                                    <button
                                      type="button"
                                      onClick={() =>
                                        handleMoveElement(
                                          row.id,
                                          col.id,
                                          elIndex,
                                          'up'
                                        )
                                      }
                                      disabled={elIndex === 0}
                                      className="p-1 text-slate-400 hover:text-[#1E3A5F] disabled:opacity-20 cursor-pointer"
                                    >
                                      <MoveUp className="w-3 h-3" />
                                    </button>
                                    <button
                                      type="button"
                                      onClick={() =>
                                        handleMoveElement(
                                          row.id,
                                          col.id,
                                          elIndex,
                                          'down'
                                        )
                                      }
                                      disabled={elIndex === col.elements.length - 1}
                                      className="p-1 text-slate-400 hover:text-[#1E3A5F] disabled:opacity-20 cursor-pointer"
                                    >
                                      <MoveDown className="w-3 h-3" />
                                    </button>
                                    <button
                                      type="button"
                                      onClick={() =>
                                        onSelectItem({
                                          type: 'element',
                                          rowId: row.id,
                                          colId: col.id,
                                          element: el,
                                        })
                                      }
                                      className="p-1 text-[#0EA5E9] hover:bg-sky-100 rounded cursor-pointer"
                                    >
                                      <Settings className="w-3 h-3" />
                                    </button>
                                  </div>
                                </div>

                                {/* Special Project Cards Quick-Access for workShowcase */}
                                {el.type === 'workShowcase' && (
                                  <div
                                    className="px-3 pb-3 pt-1 border-t border-slate-100 space-y-1.5"
                                    onClick={(e) => e.stopPropagation()}
                                  >
                                    <div className="flex items-center justify-between text-[10.5px] font-bold">
                                      <span className="flex items-center gap-1 text-[#0EA5E9]">
                                        <Sparkles className="w-3 h-3 text-[#0EA5E9]" />
                                        <span>Sample Work Cards ({((el.content as any).data?.projects || []).length})</span>
                                      </span>
                                      <div className="flex items-center gap-1.5">
                                        {onAddProjectCard && (
                                          <button
                                            type="button"
                                            onClick={() => onAddProjectCard(row.id, col.id, el.id)}
                                            className="px-2 py-0.5 rounded bg-[#143020] hover:bg-[#1E442D] text-white text-[9.5px] font-bold flex items-center gap-1 cursor-pointer transition-colors shadow-2xs"
                                            title="Add a new work card"
                                          >
                                            <Plus className="w-2.5 h-2.5 text-[#4ADE80]" />
                                            <span>Add Card</span>
                                          </button>
                                        )}
                                        <span className="text-[9.5px] text-slate-400">Click to edit 👈</span>
                                      </div>
                                    </div>
                                    <div className="space-y-1.5 max-h-56 overflow-y-auto pr-1">
                                      {((el.content as any).data?.projects || []).map((proj: any, pIdx: number) => {
                                        const cardKey = `${el.id}_${proj.id || pIdx}`;
                                        const isConfirmingDelete = deleteConfirmProjectKey === cardKey;

                                        return (
                                          <div
                                            key={proj.id || pIdx}
                                            className="p-1.5 rounded-lg bg-slate-50 hover:bg-[#E0F2FE]/50 border border-slate-200 flex items-center justify-between gap-2 text-xs font-semibold text-[#1E3A5F] transition-colors group/card"
                                          >
                                            <div
                                              onClick={() => onSelectProjectCard?.(row.id, col.id, el.id, proj, pIdx)}
                                              className="flex items-center gap-1.5 min-w-0 flex-1 cursor-pointer"
                                              title={`Click to edit ${proj.title} on Left Panel`}
                                            >
                                              <span className="w-1.5 h-1.5 rounded-full bg-[#0EA5E9] shrink-0" />
                                              <span className="truncate text-[11px] font-bold group-hover/card:text-[#0EA5E9]">
                                                {proj.title}
                                              </span>
                                            </div>

                                            <div className="flex items-center gap-1 shrink-0" onClick={(e) => e.stopPropagation()}>
                                              <button
                                                type="button"
                                                onClick={() => onSelectProjectCard?.(row.id, col.id, el.id, proj, pIdx)}
                                                className="text-[9.5px] px-2 py-0.5 rounded bg-white text-slate-600 hover:text-[#0EA5E9] border border-slate-200 group-hover/card:border-[#0EA5E9] cursor-pointer font-bold"
                                                title="Edit card details"
                                              >
                                                Edit 👈
                                              </button>

                                              {/* Delete Button with Confirmation */}
                                              {isConfirmingDelete ? (
                                                <div className="flex items-center gap-1 bg-red-50 border border-red-200 px-1.5 py-0.5 rounded animate-fade-in">
                                                  <span className="text-[9px] font-bold text-red-700">Delete?</span>
                                                  <button
                                                    type="button"
                                                    onClick={() => {
                                                      setDeleteConfirmProjectKey(null);
                                                      onDeleteProjectCard?.(row.id, col.id, el.id, proj, pIdx);
                                                    }}
                                                    className="px-1.5 py-0.5 rounded bg-red-600 hover:bg-red-700 text-white font-extrabold text-[9px] cursor-pointer shadow-2xs"
                                                  >
                                                    Yes
                                                  </button>
                                                  <button
                                                    type="button"
                                                    onClick={() => setDeleteConfirmProjectKey(null)}
                                                    className="px-1 py-0.5 rounded bg-slate-200 hover:bg-slate-300 text-slate-700 font-bold text-[9px] cursor-pointer"
                                                  >
                                                    No
                                                  </button>
                                                </div>
                                              ) : (
                                                <button
                                                  type="button"
                                                  onClick={() => setDeleteConfirmProjectKey(cardKey)}
                                                  className="p-1 rounded text-slate-400 hover:text-red-600 hover:bg-red-50 transition-colors cursor-pointer"
                                                  title={`Delete "${proj.title}"`}
                                                >
                                                  <Trash2 className="w-3 h-3 text-red-500" />
                                                </button>
                                              )}
                                            </div>
                                          </div>
                                        );
                                      })}
                                      {((el.content as any).data?.projects || []).length === 0 && (
                                        <div className="p-3 text-center text-[10px] text-slate-400 border border-dashed border-slate-200 rounded-lg">
                                          No cards in this showcase yet.
                                        </div>
                                      )}
                                    </div>
                                  </div>
                                )}

                                {/* Special Rotating Client Sites Quick-Access for profileOrbit */}
                                {el.type === 'profileOrbit' && (
                                  <div
                                    className="px-3 pb-3 pt-1 border-t border-slate-100 space-y-1.5"
                                    onClick={(e) => e.stopPropagation()}
                                  >
                                    <div className="flex items-center justify-between text-[10.5px] font-bold">
                                      <span className="flex items-center gap-1 text-[#0EA5E9]">
                                        <Radio className="w-3 h-3 text-[#0EA5E9]" />
                                        <span>
                                          Rotating Client Sites (
                                          {((el.content as any).data?.rotatingSites || []).length}
                                          )
                                        </span>
                                      </span>
                                      <button
                                        type="button"
                                        onClick={() =>
                                          setEditingRotatingSite({
                                            rowId: row.id,
                                            colId: col.id,
                                            elId: el.id,
                                            site: null,
                                          })
                                        }
                                        className="px-2 py-0.5 rounded bg-[#143020] hover:bg-[#1E442D] text-white text-[9.5px] font-bold flex items-center gap-1 cursor-pointer transition-colors shadow-2xs"
                                        title="Add a new rotating site"
                                      >
                                        <Plus className="w-2.5 h-2.5 text-[#4ADE80]" />
                                        <span>Add Rotating Site</span>
                                      </button>
                                    </div>

                                    <div className="space-y-1.5 max-h-56 overflow-y-auto pr-1">
                                      {((el.content as any).data?.rotatingSites || []).map(
                                        (site: any, sIdx: number) => {
                                          const siteKey = `${el.id}_${site.id || sIdx}`;
                                          const isConfirming = deleteConfirmSiteKey === siteKey;

                                          return (
                                            <div
                                              key={site.id || sIdx}
                                              className="p-1.5 rounded-lg bg-slate-50 hover:bg-[#E0F2FE]/50 border border-slate-200 flex items-center justify-between gap-2 text-xs font-semibold text-[#1E3A5F] transition-colors group/site"
                                            >
                                              <div
                                                onClick={() =>
                                                  setEditingRotatingSite({
                                                    rowId: row.id,
                                                    colId: col.id,
                                                    elId: el.id,
                                                    site,
                                                  })
                                                }
                                                className="flex items-center gap-2 min-w-0 flex-1 cursor-pointer"
                                                title={`Click to edit ${site.name}`}
                                              >
                                                <div className="w-6 h-6 rounded-full bg-white border border-slate-200 flex items-center justify-center overflow-hidden shrink-0">
                                                  {site.logoUrl ? (
                                                    <img
                                                      src={site.logoUrl}
                                                      alt=""
                                                      className="w-full h-full object-contain rounded-full"
                                                    />
                                                  ) : site.faviconDomain ? (
                                                    <img
                                                      src={`https://www.google.com/s2/favicons?domain=${site.faviconDomain}&sz=64`}
                                                      alt=""
                                                      className="w-full h-full object-contain rounded-full"
                                                      onError={(e) => {
                                                        (e.target as HTMLElement).style.display =
                                                          'none';
                                                      }}
                                                    />
                                                  ) : (
                                                    <span className="text-[9px] font-bold text-[#1E3A5F]">
                                                      {site.fallbackInitials || 'ST'}
                                                    </span>
                                                  )}
                                                </div>
                                                <div className="min-w-0 flex-1">
                                                  <div className="flex items-center gap-1">
                                                    <span className="truncate text-[11px] font-bold group-hover/site:text-[#0EA5E9]">
                                                      {site.name}
                                                    </span>
                                                    <span className="text-[8.5px] px-1 py-0.2 rounded-full bg-slate-200/80 text-slate-700 font-semibold">
                                                      {site.orbitIndex === 2 ? 'Outer' : 'Inner'}
                                                    </span>
                                                  </div>
                                                  <span className="text-[9.5px] text-slate-400 truncate block">
                                                    {site.sublabel || site.url}
                                                  </span>
                                                </div>
                                              </div>

                                              <div
                                                className="flex items-center gap-1 shrink-0"
                                                onClick={(e) => e.stopPropagation()}
                                              >
                                                <button
                                                  type="button"
                                                  onClick={() =>
                                                    setEditingRotatingSite({
                                                      rowId: row.id,
                                                      colId: col.id,
                                                      elId: el.id,
                                                      site,
                                                    })
                                                  }
                                                  className="text-[9.5px] px-2 py-0.5 rounded bg-white text-slate-600 hover:text-[#0EA5E9] border border-slate-200 group-hover/site:border-[#0EA5E9] cursor-pointer font-bold"
                                                  title="Edit rotating site"
                                                >
                                                  Edit 👈
                                                </button>

                                                {/* Delete Button with Confirmation */}
                                                {isConfirming ? (
                                                  <div className="flex items-center gap-1 bg-red-50 border border-red-200 px-1.5 py-0.5 rounded animate-fade-in">
                                                    <span className="text-[9px] font-bold text-red-700">
                                                      Delete?
                                                    </span>
                                                    <button
                                                      type="button"
                                                      onClick={() =>
                                                        handleDeleteRotatingSite(
                                                          row.id,
                                                          col.id,
                                                          el.id,
                                                          site.id
                                                        )
                                                      }
                                                      className="px-1.5 py-0.5 rounded bg-red-600 hover:bg-red-700 text-white font-extrabold text-[9px] cursor-pointer shadow-2xs"
                                                    >
                                                      Yes
                                                    </button>
                                                    <button
                                                      type="button"
                                                      onClick={() => setDeleteConfirmSiteKey(null)}
                                                      className="px-1 py-0.5 rounded bg-slate-200 hover:bg-slate-300 text-slate-700 font-bold text-[9px] cursor-pointer"
                                                    >
                                                      No
                                                    </button>
                                                  </div>
                                                ) : (
                                                  <button
                                                    type="button"
                                                    onClick={() =>
                                                      setDeleteConfirmSiteKey(siteKey)
                                                    }
                                                    className="p-1 rounded text-slate-400 hover:text-red-600 hover:bg-red-50 transition-colors cursor-pointer"
                                                    title={`Delete "${site.name}"`}
                                                  >
                                                    <Trash2 className="w-3 h-3 text-red-500" />
                                                  </button>
                                                )}
                                              </div>
                                            </div>
                                          );
                                        }
                                      )}
                                      {((el.content as any).data?.rotatingSites || []).length ===
                                        0 && (
                                        <div className="p-3 text-center text-[10px] text-slate-400 border border-dashed border-slate-200 rounded-lg">
                                          No rotating sites configured yet. Click "Add Rotating Site"
                                          above.
                                        </div>
                                      )}
                                    </div>
                                  </div>
                                )}
                              </div>
                            );
                          })}
                        </div>

                        {/* Add Element Button (+) */}
                        <button
                          type="button"
                          onClick={() =>
                            setTargetColForElement({
                              rowId: row.id,
                              colId: col.id,
                            })
                          }
                          className="mt-3 w-full py-2 border border-dashed border-[#BCD5E6] hover:border-[#0EA5E9] hover:bg-[#F0F9FF] rounded-lg text-xs font-bold text-[#2D5D86] hover:text-[#0EA5E9] transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                        >
                          <Plus className="w-3.5 h-3.5" />
                          <span>Add Element</span>
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        ))
      )}

      {/* Canvas Bottom Action: Add Row */}
      <div className="pt-2 flex justify-center">
        <button
          type="button"
          onClick={handleAddRow}
          className="px-6 py-2.5 rounded-full bg-white hover:bg-[#EFF6FB] border-2 border-[#BCD5E6] hover:border-[#0EA5E9] text-[#1E3A5F] font-extrabold text-xs transition-all shadow-xs flex items-center gap-2 cursor-pointer"
        >
          <Plus className="w-4 h-4 text-[#0EA5E9]" />
          <span>Add New Row</span>
        </button>
      </div>

      {/* =========================================================================
          MODAL: ADD ELEMENT PICKER (Categorized)
         ========================================================================= */}
      {targetColForElement && (
        <div className="fixed inset-0 z-50 bg-[#1E3A5F]/40 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="w-full max-w-2xl bg-white rounded-2xl border-2 border-[#BCD5E6] shadow-2xl overflow-hidden animate-fade-up">
            <div className="px-5 py-3.5 bg-[#F4F8FB] border-b border-[#BCD5E6] flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-[#0EA5E9]" />
                <h3 className="font-urbanist font-extrabold text-base text-[#1E3A5F]">
                  Add WPBakery Element
                </h3>
              </div>
              <button
                onClick={() => setTargetColForElement(null)}
                className="p-1 text-slate-400 hover:text-[#1E3A5F] rounded-lg cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="p-5 max-h-[70vh] overflow-y-auto space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {Object.values(ELEMENT_REGISTRY).map((entry) => {
                  const Icon = entry.icon;
                  return (
                    <div
                      key={entry.type}
                      onClick={() => handleAddElement(entry.type)}
                      className="p-3.5 rounded-xl border border-[#BCD5E6] hover:border-[#0EA5E9] hover:bg-sky-50/40 transition-all cursor-pointer flex items-start gap-3 group"
                    >
                      <div className="p-2.5 rounded-lg bg-[#EFF6FB] text-[#0EA5E9] group-hover:bg-[#0EA5E9] group-hover:text-white transition-colors shrink-0">
                        <Icon className="w-5 h-5" />
                      </div>
                      <div>
                        <div className="flex items-center gap-1.5">
                          <h4 className="font-bold text-xs text-[#1E3A5F]">
                            {entry.label}
                          </h4>
                          <span className="text-[9px] px-1.5 py-0.2 rounded bg-slate-100 text-slate-500 font-medium">
                            {entry.category}
                          </span>
                        </div>
                        <p className="mt-1 text-[11px] text-slate-500 leading-snug">
                          {entry.description}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* =========================================================================
          MODAL: COLUMN GRID PRESET PICKER
         ========================================================================= */}
      {targetRowForColumns && (
        <div className="fixed inset-0 z-50 bg-[#1E3A5F]/40 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="w-full max-w-md bg-white rounded-2xl border-2 border-[#BCD5E6] shadow-2xl p-5 animate-fade-up">
            <div className="flex items-center justify-between pb-3 border-b border-[#BCD5E6]/70 mb-4">
              <h3 className="font-urbanist font-extrabold text-sm text-[#1E3A5F]">
                Select Column Layout Grid
              </h3>
              <button
                onClick={() => setTargetRowForColumns(null)}
                className="text-slate-400 hover:text-[#1E3A5F] cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-2 text-xs">
              {[
                { label: '1/1 (Single Full Column)', widths: ['1/1' as ColumnWidth] },
                { label: '3/5 + 2/5 (Hero Split: 60% Left + 40% Right)', widths: ['3/5' as ColumnWidth, '2/5' as ColumnWidth] },
                { label: '2/5 + 3/5 (40% Left + 60% Right)', widths: ['2/5' as ColumnWidth, '3/5' as ColumnWidth] },
                { label: '1/2 + 1/2 (Two Equal Columns)', widths: ['1/2' as ColumnWidth, '1/2' as ColumnWidth] },
                { label: '1/3 + 1/3 + 1/3 (Three Equal Columns)', widths: ['1/3' as ColumnWidth, '1/3' as ColumnWidth, '1/3' as ColumnWidth] },
                { label: '2/3 + 1/3 (Wide Left + Sidebar Right)', widths: ['2/3' as ColumnWidth, '1/3' as ColumnWidth] },
                { label: '1/3 + 2/3 (Sidebar Left + Wide Right)', widths: ['1/3' as ColumnWidth, '2/3' as ColumnWidth] },
                { label: '1/4 + 1/4 + 1/4 + 1/4 (Four Columns)', widths: ['1/4' as ColumnWidth, '1/4' as ColumnWidth, '1/4' as ColumnWidth, '1/4' as ColumnWidth] },
              ].map((preset, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() =>
                    handleApplyColumnPreset(targetRowForColumns, preset.widths)
                  }
                  className="w-full p-2.5 rounded-xl border border-[#BCD5E6] hover:border-[#0EA5E9] hover:bg-sky-50 text-left font-bold text-[#1E3A5F] transition-all cursor-pointer flex items-center justify-between"
                >
                  <span>{preset.label}</span>
                  <div className="flex items-center gap-1 w-24 h-4">
                    {preset.widths.map((w, wIdx) => {
                      const flexGrow = w === '2/3' ? 'flex-[2]' : 'flex-1';
                      return (
                        <span
                          key={wIdx}
                          className={`${flexGrow} h-full bg-[#BCD5E6] rounded-xs`}
                        />
                      );
                    })}
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      {/* Rotating Site Add/Edit Modal */}
      {editingRotatingSite && (
        <RotatingSiteEditModal
          site={editingRotatingSite.site}
          isOpen={true}
          onClose={() => setEditingRotatingSite(null)}
          onSave={handleSaveRotatingSite}
          onDelete={(siteId) => {
            handleDeleteRotatingSite(
              editingRotatingSite.rowId,
              editingRotatingSite.colId,
              editingRotatingSite.elId,
              siteId
            );
          }}
        />
      )}
    </div>
  );
};
