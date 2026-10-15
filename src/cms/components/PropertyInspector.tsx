import React from 'react';
import { X, Sliders, Trash2, Copy, Layers, Eye } from 'lucide-react';
import { RowBlock, ColumnBlock, ElementBlock } from '../types/schema';
import { ELEMENT_REGISTRY } from '../registry/ElementRegistry';

export type SelectedItem =
  | { type: 'row'; row: RowBlock }
  | { type: 'column'; rowId: string; column: ColumnBlock }
  | { type: 'element'; rowId: string; colId: string; element: ElementBlock };

interface PropertyInspectorProps {
  selectedItem: SelectedItem | null;
  onClose: () => void;
  onUpdateRow: (rowId: string, updatedSettings: Partial<RowBlock['settings']>) => void;
  onUpdateColumn: (rowId: string, colId: string, updatedCol: Partial<ColumnBlock>) => void;
  onUpdateElement: (
    rowId: string,
    colId: string,
    elId: string,
    updatedElement: Partial<ElementBlock>
  ) => void;
  onDeleteElement: (rowId: string, colId: string, elId: string) => void;
  onDuplicateElement: (rowId: string, colId: string, elId: string) => void;
}

export const PropertyInspector: React.FC<PropertyInspectorProps> = ({
  selectedItem,
  onClose,
  onUpdateRow,
  onUpdateColumn,
  onUpdateElement,
  onDeleteElement,
  onDuplicateElement,
}) => {
  if (!selectedItem) return null;

  return (
    <aside className="w-80 sm:w-96 bg-white border-l border-[#BCD5E6] flex flex-col h-full shadow-xl z-30 select-none animate-slide-left">
      {/* Top Header */}
      <div className="p-3.5 border-b border-[#BCD5E6] flex items-center justify-between bg-[#F4F8FB]">
        <div className="flex items-center gap-2">
          <Sliders className="w-4 h-4 text-[#0EA5E9]" />
          <h3 className="font-urbanist font-extrabold text-sm text-[#1E3A5F]">
            {selectedItem.type === 'row' && 'Row Settings'}
            {selectedItem.type === 'column' && `Column (${selectedItem.column.width})`}
            {selectedItem.type === 'element' &&
              (ELEMENT_REGISTRY[selectedItem.element.type]?.label || 'Element Settings')}
          </h3>
        </div>
        <button
          onClick={onClose}
          className="p-1 rounded-lg text-slate-400 hover:text-[#1E3A5F] hover:bg-slate-200 transition-colors cursor-pointer"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      {/* Body Settings */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 text-xs font-inter text-[#1E3A5F]">
        {/* ROW INSPECTOR */}
        {selectedItem.type === 'row' && (
          <RowInspectorContent
            row={selectedItem.row}
            onUpdate={(settings) => onUpdateRow(selectedItem.row.id, settings)}
          />
        )}

        {/* COLUMN INSPECTOR */}
        {selectedItem.type === 'column' && (
          <ColumnInspectorContent
            column={selectedItem.column}
            onUpdate={(col) => onUpdateColumn(selectedItem.rowId, selectedItem.column.id, col)}
          />
        )}

        {/* ELEMENT INSPECTOR */}
        {selectedItem.type === 'element' && (
          <ElementInspectorContent
            element={selectedItem.element}
            onUpdate={(el) =>
              onUpdateElement(
                selectedItem.rowId,
                selectedItem.colId,
                selectedItem.element.id,
                el
              )
            }
            onDelete={() =>
              onDeleteElement(
                selectedItem.rowId,
                selectedItem.colId,
                selectedItem.element.id
              )
            }
            onDuplicate={() =>
              onDuplicateElement(
                selectedItem.rowId,
                selectedItem.colId,
                selectedItem.element.id
              )
            }
          />
        )}
      </div>
    </aside>
  );
};

// =========================================================================
// ROW SETTINGS FORM
// =========================================================================
const RowInspectorContent: React.FC<{
  row: RowBlock;
  onUpdate: (s: Partial<RowBlock['settings']>) => void;
}> = ({ row, onUpdate }) => {
  const { settings } = row;

  return (
    <div className="space-y-4">
      <div>
        <label className="block font-bold text-[#1E3A5F] mb-1">Row Container Width</label>
        <div className="grid grid-cols-2 gap-2">
          <button
            type="button"
            onClick={() => onUpdate({ layoutWidth: 'boxed' })}
            className={`p-2 rounded-lg border text-center font-bold text-xs cursor-pointer ${
              settings.layoutWidth === 'boxed'
                ? 'bg-[#1E3A5F] text-white border-[#1E3A5F]'
                : 'bg-white text-slate-600 border-[#BCD5E6]'
            }`}
          >
            Boxed (Max 1280px)
          </button>
          <button
            type="button"
            onClick={() => onUpdate({ layoutWidth: 'full' })}
            className={`p-2 rounded-lg border text-center font-bold text-xs cursor-pointer ${
              settings.layoutWidth === 'full'
                ? 'bg-[#1E3A5F] text-white border-[#1E3A5F]'
                : 'bg-white text-slate-600 border-[#BCD5E6]'
            }`}
          >
            Full Width (100%)
          </button>
        </div>
      </div>

      <div>
        <label className="block font-bold text-[#1E3A5F] mb-1">Background Type</label>
        <select
          value={settings.bgType}
          onChange={(e) => onUpdate({ bgType: e.target.value as any })}
          className="w-full px-2.5 py-1.5 rounded-lg border border-[#BCD5E6] bg-white text-[#1E3A5F]"
        >
          <option value="none">None (Transparent)</option>
          <option value="color">Solid Color</option>
          <option value="gradient">Gradient</option>
          <option value="image">Background Image</option>
        </select>
      </div>

      {settings.bgType === 'color' && (
        <div>
          <label className="block font-bold text-[#1E3A5F] mb-1">Background Color</label>
          <div className="flex items-center gap-2">
            <input
              type="color"
              value={settings.bgColor || '#FFFFFF'}
              onChange={(e) => onUpdate({ bgColor: e.target.value })}
              className="w-8 h-8 rounded border border-[#BCD5E6] cursor-pointer"
            />
            <input
              type="text"
              value={settings.bgColor || '#FFFFFF'}
              onChange={(e) => onUpdate({ bgColor: e.target.value })}
              className="flex-1 px-2.5 py-1.5 rounded-lg border border-[#BCD5E6] bg-white text-[#1E3A5F]"
            />
          </div>
        </div>
      )}

      {settings.bgType === 'gradient' && (
        <div>
          <label className="block font-bold text-[#1E3A5F] mb-1">CSS Gradient String</label>
          <input
            type="text"
            value={settings.bgGradient || ''}
            onChange={(e) => onUpdate({ bgGradient: e.target.value })}
            className="w-full px-2.5 py-1.5 rounded-lg border border-[#BCD5E6] bg-white font-mono text-[10px]"
            placeholder="linear-gradient(135deg, #E0F2FE 0%, #FFFFFF 100%)"
          />
        </div>
      )}

      {settings.bgType === 'image' && (
        <div>
          <label className="block font-bold text-[#1E3A5F] mb-1">Background Image URL</label>
          <input
            type="text"
            value={settings.bgImageUrl || ''}
            onChange={(e) => onUpdate({ bgImageUrl: e.target.value })}
            className="w-full px-2.5 py-1.5 rounded-lg border border-[#BCD5E6] bg-white text-[#1E3A5F]"
            placeholder="https://..."
          />
        </div>
      )}

      <div className="pt-2 border-t border-[#BCD5E6]/60">
        <label className="block font-bold text-[#1E3A5F] mb-2">Padding (px)</label>
        <div className="grid grid-cols-2 gap-2">
          <div>
            <span className="text-[10px] text-slate-500">Top</span>
            <input
              type="number"
              value={settings.padding.top ?? 20}
              onChange={(e) =>
                onUpdate({
                  padding: { ...settings.padding, top: Number(e.target.value) },
                })
              }
              className="w-full px-2 py-1 rounded border border-[#BCD5E6] bg-white"
            />
          </div>
          <div>
            <span className="text-[10px] text-slate-500">Bottom</span>
            <input
              type="number"
              value={settings.padding.bottom ?? 20}
              onChange={(e) =>
                onUpdate({
                  padding: { ...settings.padding, bottom: Number(e.target.value) },
                })
              }
              className="w-full px-2 py-1 rounded border border-[#BCD5E6] bg-white"
            />
          </div>
        </div>
      </div>

      <div className="pt-2 border-t border-[#BCD5E6]/60 flex items-center justify-between">
        <span className="font-bold text-[#1E3A5F]">Equal Height Columns</span>
        <input
          type="checkbox"
          checked={!!settings.equalHeightColumns}
          onChange={(e) => onUpdate({ equalHeightColumns: e.target.checked })}
          className="w-4 h-4 rounded text-[#0EA5E9]"
        />
      </div>
    </div>
  );
};

// =========================================================================
// COLUMN SETTINGS FORM
// =========================================================================
const ColumnInspectorContent: React.FC<{
  column: ColumnBlock;
  onUpdate: (c: Partial<ColumnBlock>) => void;
}> = ({ column, onUpdate }) => {
  const { settings, width } = column;

  return (
    <div className="space-y-4">
      <div>
        <label className="block font-bold text-[#1E3A5F] mb-1">Column Width Fraction</label>
        <select
          value={width}
          onChange={(e) => onUpdate({ width: e.target.value as any })}
          className="w-full px-2.5 py-1.5 rounded-lg border border-[#BCD5E6] bg-white text-[#1E3A5F] font-bold"
        >
          <option value="1/1">1/1 (Full Row Span)</option>
          <option value="3/5">3/5 (Three Fifths - 60%)</option>
          <option value="2/5">2/5 (Two Fifths - 40%)</option>
          <option value="1/2">1/2 (Half Row - 50%)</option>
          <option value="1/3">1/3 (One Third - 33%)</option>
          <option value="2/3">2/3 (Two Thirds - 66%)</option>
          <option value="1/4">1/4 (One Fourth - 25%)</option>
          <option value="3/4">3/4 (Three Fourths - 75%)</option>
          <option value="1/5">1/5 (One Fifth - 20%)</option>
          <option value="4/5">4/5 (Four Fifths - 80%)</option>
        </select>
      </div>

      <div>
        <label className="block font-bold text-[#1E3A5F] mb-1">Vertical Alignment</label>
        <div className="grid grid-cols-3 gap-1">
          {(['top', 'middle', 'bottom'] as const).map((pos) => (
            <button
              key={pos}
              type="button"
              onClick={() =>
                onUpdate({
                  settings: { ...settings, verticalAlign: pos },
                })
              }
              className={`p-1.5 rounded-lg border text-center font-bold text-xs capitalize cursor-pointer ${
                settings.verticalAlign === pos
                  ? 'bg-[#1E3A5F] text-white border-[#1E3A5F]'
                  : 'bg-white text-slate-600 border-[#BCD5E6]'
              }`}
            >
              {pos}
            </button>
          ))}
        </div>
      </div>

      <div>
        <label className="block font-bold text-[#1E3A5F] mb-1">Column Background</label>
        <div className="flex items-center gap-2">
          <input
            type="color"
            value={settings.bgColor || '#FFFFFF'}
            onChange={(e) =>
              onUpdate({
                settings: { ...settings, bgColor: e.target.value },
              })
            }
            className="w-8 h-8 rounded border border-[#BCD5E6] cursor-pointer"
          />
          <input
            type="text"
            value={settings.bgColor || ''}
            onChange={(e) =>
              onUpdate({
                settings: { ...settings, bgColor: e.target.value },
              })
            }
            placeholder="Transparent"
            className="flex-1 px-2.5 py-1.5 rounded-lg border border-[#BCD5E6] bg-white text-[#1E3A5F]"
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-2">
        <div>
          <label className="block font-bold text-[#1E3A5F] mb-1">Border Radius</label>
          <input
            type="number"
            value={settings.borderRadius ?? 0}
            onChange={(e) =>
              onUpdate({
                settings: { ...settings, borderRadius: Number(e.target.value) },
              })
            }
            className="w-full px-2 py-1.5 rounded-lg border border-[#BCD5E6] bg-white text-[#1E3A5F]"
          />
        </div>
        <div>
          <label className="block font-bold text-[#1E3A5F] mb-1">Padding All (px)</label>
          <input
            type="number"
            value={settings.padding?.top ?? 8}
            onChange={(e) => {
              const val = Number(e.target.value);
              onUpdate({
                settings: {
                  ...settings,
                  padding: { top: val, bottom: val, left: val, right: val },
                },
              });
            }}
            className="w-full px-2 py-1.5 rounded-lg border border-[#BCD5E6] bg-white text-[#1E3A5F]"
          />
        </div>
      </div>
    </div>
  );
};

// =========================================================================
// ELEMENT SETTINGS FORM
// =========================================================================
const ElementInspectorContent: React.FC<{
  element: ElementBlock;
  onUpdate: (el: Partial<ElementBlock>) => void;
  onDelete: () => void;
  onDuplicate: () => void;
}> = ({ element, onUpdate, onDelete, onDuplicate }) => {
  const entry = ELEMENT_REGISTRY[element.type];
  if (!entry) return null;

  const { Editor } = entry;

  return (
    <div className="space-y-4">
      {/* Action Bar */}
      <div className="flex items-center justify-between pb-3 border-b border-[#BCD5E6]/60">
        <span className="font-bold text-[#1E3A5F] flex items-center gap-1.5">
          <entry.icon className="w-4 h-4 text-[#0EA5E9]" />
          <span>{entry.label}</span>
        </span>
        <div className="flex items-center gap-1">
          <button
            type="button"
            onClick={onDuplicate}
            title="Duplicate block"
            className="p-1.5 rounded-lg hover:bg-slate-100 text-slate-500 hover:text-[#1E3A5F] cursor-pointer"
          >
            <Copy className="w-3.5 h-3.5" />
          </button>
          <button
            type="button"
            onClick={onDelete}
            title="Delete block"
            className="p-1.5 rounded-lg hover:bg-red-50 text-slate-500 hover:text-red-600 cursor-pointer"
          >
            <Trash2 className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Alignment Control */}
      <div>
        <label className="block font-bold text-[#1E3A5F] mb-1">Alignment</label>
        <div className="grid grid-cols-3 gap-1">
          {(['left', 'center', 'right'] as const).map((a) => (
            <button
              key={a}
              type="button"
              onClick={() =>
                onUpdate({
                  settings: { ...element.settings, alignment: a },
                })
              }
              className={`p-1.5 rounded-lg border text-center font-bold text-xs capitalize cursor-pointer ${
                element.settings.alignment === a
                  ? 'bg-[#1E3A5F] text-white border-[#1E3A5F]'
                  : 'bg-white text-slate-600 border-[#BCD5E6]'
              }`}
            >
              {a}
            </button>
          ))}
        </div>
      </div>

      {/* Specific Element Editor Content */}
      <div className="pt-2 border-t border-[#BCD5E6]/60">
        <Editor
          content={(element.content as any).data}
          settings={element.settings}
          onUpdateContent={(newData) =>
            onUpdate({
              content: {
                ...element.content,
                data: newData,
              } as any,
            })
          }
          onUpdateSettings={(newSettings) =>
            onUpdate({
              settings: newSettings,
            })
          }
        />
      </div>

      {/* Margins */}
      <div className="pt-2 border-t border-[#BCD5E6]/60">
        <label className="block font-bold text-[#1E3A5F] mb-1">Bottom Spacing (px)</label>
        <input
          type="number"
          value={element.settings.margin?.bottom ?? 12}
          onChange={(e) =>
            onUpdate({
              settings: {
                ...element.settings,
                margin: { ...element.settings.margin, bottom: Number(e.target.value) },
              },
            })
          }
          className="w-full px-2.5 py-1.5 rounded-lg border border-[#BCD5E6] bg-white text-[#1E3A5F]"
        />
      </div>
    </div>
  );
};
