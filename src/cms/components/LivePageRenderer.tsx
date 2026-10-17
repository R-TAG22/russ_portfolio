import React from 'react';
import { PageDocument, RowBlock, ColumnBlock, ElementBlock } from '../types/schema';
import { ELEMENT_REGISTRY } from '../registry/ElementRegistry';

interface LivePageRendererProps {
  page: PageDocument;
  className?: string;
  onSelectProjectCard?: (
    rowId: string,
    colId: string,
    elId: string,
    project: any,
    projectIndex: number
  ) => void;
  selectedProjectId?: string | null;
  onUpdateElementContent?: (
    rowId: string,
    colId: string,
    elId: string,
    content: any
  ) => void;
}

export const LivePageRenderer: React.FC<LivePageRendererProps> = ({
  page,
  className = '',
  onSelectProjectCard,
  selectedProjectId,
  onUpdateElementContent,
}) => {
  return (
    <article className={`w-full font-inter text-[#1E3A5F] ${className}`}>
      {(page.sections || []).map((row) => (
        <RenderRow
          key={row.id}
          row={row}
          onSelectProjectCard={onSelectProjectCard}
          selectedProjectId={selectedProjectId}
          onUpdateElementContent={onUpdateElementContent}
        />
      ))}
    </article>
  );
};

const RenderRow: React.FC<{
  row: RowBlock;
  onSelectProjectCard?: (
    rowId: string,
    colId: string,
    elId: string,
    project: any,
    projectIndex: number
  ) => void;
  selectedProjectId?: string | null;
  onUpdateElementContent?: (
    rowId: string,
    colId: string,
    elId: string,
    content: any
  ) => void;
}> = ({ row, onSelectProjectCard, selectedProjectId, onUpdateElementContent }) => {
  const { settings } = row;

  // Background style
  const bgStyle: React.CSSProperties = {};
  if (settings.bgType === 'color' && settings.bgColor) {
    bgStyle.backgroundColor = settings.bgColor;
  } else if (settings.bgType === 'gradient' && settings.bgGradient) {
    bgStyle.backgroundImage = settings.bgGradient;
  } else if (settings.bgType === 'image' && settings.bgImageUrl) {
    bgStyle.backgroundImage = `url(${settings.bgImageUrl})`;
    bgStyle.backgroundSize = 'cover';
    bgStyle.backgroundPosition = 'center';
  }

  const paddingStyle: React.CSSProperties = {
    paddingTop: settings.padding.top !== undefined ? `${settings.padding.top}px` : undefined,
    paddingBottom: settings.padding.bottom !== undefined ? `${settings.padding.bottom}px` : undefined,
    paddingLeft: settings.padding.left !== undefined ? `${settings.padding.left}px` : undefined,
    paddingRight: settings.padding.right !== undefined ? `${settings.padding.right}px` : undefined,
    marginTop: settings.margin.top !== undefined ? `${settings.margin.top}px` : undefined,
    marginBottom: settings.margin.bottom !== undefined ? `${settings.margin.bottom}px` : undefined,
  };

  const containerClass =
    settings.layoutWidth === 'full'
      ? 'w-full px-4 sm:px-6'
      : 'max-w-7xl mx-auto px-4 sm:px-6 lg:px-8';

  return (
    <section
      id={row.id}
      className={`w-full relative transition-all ${settings.customClass || ''}`}
      style={{ ...bgStyle, ...paddingStyle }}
    >
      <div className={containerClass}>
        <div
          className={`flex flex-wrap -mx-2 sm:-mx-3 ${
            settings.equalHeightColumns ? 'items-stretch' : 'items-start'
          }`}
        >
          {(row.columns || []).map((col) => (
            <RenderColumn
              key={col.id}
              rowId={row.id}
              column={col}
              onSelectProjectCard={onSelectProjectCard}
              selectedProjectId={selectedProjectId}
              onUpdateElementContent={onUpdateElementContent}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

const RenderColumn: React.FC<{
  rowId: string;
  column: ColumnBlock;
  onSelectProjectCard?: (
    rowId: string,
    colId: string,
    elId: string,
    project: any,
    projectIndex: number
  ) => void;
  selectedProjectId?: string | null;
  onUpdateElementContent?: (
    rowId: string,
    colId: string,
    elId: string,
    content: any
  ) => void;
}> = ({ rowId, column, onSelectProjectCard, selectedProjectId, onUpdateElementContent }) => {
  const { width, settings, elements } = column;

  // Width translation
  const widthClasses: Record<string, string> = {
    '1/1': 'w-full',
    '1/2': 'w-full md:w-1/2',
    '1/3': 'w-full md:w-1/3',
    '2/3': 'w-full md:w-2/3',
    '1/4': 'w-full sm:w-1/2 md:w-1/4',
    '3/4': 'w-full md:w-3/4',
    '3/5': 'w-full md:w-3/5',
    '2/5': 'w-full md:w-2/5',
    '1/5': 'w-full md:w-1/5',
    '4/5': 'w-full md:w-4/5',
  };

  const alignClass =
    settings.verticalAlign === 'middle'
      ? 'justify-center'
      : settings.verticalAlign === 'bottom'
      ? 'justify-end'
      : 'justify-start';

  const colStyle: React.CSSProperties = {
    backgroundColor: settings.bgColor || undefined,
    borderRadius: settings.borderRadius ? `${settings.borderRadius}px` : undefined,
    paddingTop: settings.padding.top !== undefined ? `${settings.padding.top}px` : undefined,
    paddingBottom: settings.padding.bottom !== undefined ? `${settings.padding.bottom}px` : undefined,
    paddingLeft: settings.padding.left !== undefined ? `${settings.padding.left}px` : undefined,
    paddingRight: settings.padding.right !== undefined ? `${settings.padding.right}px` : undefined,
  };

  return (
    <div className={`px-2 sm:px-3 mb-4 md:mb-0 ${widthClasses[width] || 'w-full'} flex`}>
      <div
        className={`w-full flex flex-col ${alignClass} ${settings.customClass || ''}`}
        style={colStyle}
      >
        {(elements || []).map((el) => (
          <RenderElement
            key={el.id}
            rowId={rowId}
            colId={column.id}
            element={el}
            onSelectProjectCard={onSelectProjectCard}
            selectedProjectId={selectedProjectId}
            onUpdateElementContent={onUpdateElementContent}
          />
        ))}
      </div>
    </div>
  );
};

const RenderElement: React.FC<{
  rowId: string;
  colId: string;
  element: ElementBlock;
  onSelectProjectCard?: (
    rowId: string,
    colId: string,
    elId: string,
    project: any,
    projectIndex: number
  ) => void;
  selectedProjectId?: string | null;
  onUpdateElementContent?: (
    rowId: string,
    colId: string,
    elId: string,
    content: any
  ) => void;
}> = ({
  rowId,
  colId,
  element,
  onSelectProjectCard,
  selectedProjectId,
  onUpdateElementContent,
}) => {
  const entry = ELEMENT_REGISTRY[element.type];
  if (!entry) {
    return (
      <div className="p-3 my-2 rounded-lg bg-amber-50 border border-amber-200 text-amber-800 text-xs">
        Unknown block element: <code>{element.type}</code>
      </div>
    );
  }

  const { Render } = entry;
  const { settings, content } = element;

  const style: React.CSSProperties = {
    marginTop: settings.margin?.top !== undefined ? `${settings.margin.top}px` : undefined,
    marginBottom: settings.margin?.bottom !== undefined ? `${settings.margin.bottom}px` : undefined,
    paddingTop: settings.padding?.top !== undefined ? `${settings.padding.top}px` : undefined,
    paddingBottom: settings.padding?.bottom !== undefined ? `${settings.padding.bottom}px` : undefined,
  };

  return (
    <div id={element.id} style={style} className="w-full">
      <Render
        content={(content as any).data}
        settings={settings}
        selectedProjectId={selectedProjectId}
        onSelectProjectCard={(project, idx) =>
          onSelectProjectCard?.(rowId, colId, element.id, project, idx)
        }
        onUpdateContent={(newData) =>
          onUpdateElementContent?.(rowId, colId, element.id, newData)
        }
      />
    </div>
  );
};
