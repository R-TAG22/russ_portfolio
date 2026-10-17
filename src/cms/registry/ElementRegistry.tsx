import React, { useState } from 'react';
import {
  Heading as HeadingIcon,
  AlignLeft,
  Image as ImageIcon,
  LayoutGrid,
  MousePointerClick,
  ShoppingBag,
  Code2,
  ExternalLink,
  ArrowRight,
  Sparkles,
  CircleDot,
  Radio,
  Award,
  CheckCircle2,
  User,
  SlidersHorizontal,
  ChevronRight,
  ChevronLeft,
  Plus,
  Trash2,
  Hexagon,
  Edit3,
  Upload,
  X,
  Eye,
  Sliders,
  Copy,
  Camera,
} from 'lucide-react';
import {
  ElementType,
  ElementContent,
  ElementSettings,
  HeadingContent,
  RichTextContent,
  ImageContent,
  GalleryContent,
  CtaButtonContent,
  ShowcaseCardContent,
  CustomHtmlContent,
  StatusBadgeContent,
  ProfileOrbitContent,
  ClientMarqueeContent,
  ProfileCardContent,
  ExperienceTimelineContent,
  ExperienceTimelineItem,
  WorkShowcaseContent,
  WorkShowcaseProject,
} from '../types/schema';
import defaultRussellPhoto from '../../assets/images/regenerated_image_1788105616348.png';
import defaultAboutPhoto from '../../assets/images/regenerated_image_1788105382320.jpg';
import { WorkShowcaseInspector } from '../components/WorkShowcaseInspector';
import { WorkProjectEditModal } from '../components/WorkProjectEditModal';

export interface ElementRegistryEntry {
  type: ElementType;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  description: string;
  category: 'Typography' | 'Media' | 'Action' | 'Commerce' | 'Advanced';
  defaultContent: () => ElementContent;
  defaultSettings: () => ElementSettings;
  Render: React.FC<{
    content: any;
    settings: ElementSettings;
    onUpdateContent?: (newContent: any) => void;
    onSelectProjectCard?: (project: any, projectIndex: number) => void;
    selectedProjectId?: string | null;
  }>;
  Editor: React.FC<{
    content: any;
    settings: ElementSettings;
    onUpdateContent: (newContent: any) => void;
    onUpdateSettings: (newSettings: ElementSettings) => void;
  }>;
}

// =========================================================================
// 1. HEADING ELEMENT
// =========================================================================
const HeadingRender: React.FC<{ content: HeadingContent; settings: ElementSettings }> = ({
  content,
  settings,
}) => {
  const Tag = (content.tag || 'h2') as React.ElementType;
  const alignClass =
    settings.alignment === 'center'
      ? 'text-center'
      : settings.alignment === 'right'
      ? 'text-right'
      : 'text-left';

  const sizeClasses: Record<string, string> = {
    sm: 'text-sm font-semibold',
    base: 'text-base font-semibold',
    lg: 'text-lg font-bold',
    xl: 'text-xl font-bold',
    '2xl': 'text-2xl font-extrabold',
    '3xl': 'text-3xl font-extrabold tracking-tight',
    '4xl': 'text-3xl sm:text-4xl font-extrabold tracking-tight',
    '5xl': 'text-4xl sm:text-5xl font-extrabold tracking-tight',
  };

  return (
    <div className={`w-full ${alignClass} ${settings.customClass || ''}`}>
      <Tag
        className={`${sizeClasses[content.fontSize || '3xl'] || sizeClasses['3xl']} text-[#1E3A5F] leading-tight`}
        style={{ color: settings.textColor }}
      >
        {content.text || 'Headline Text'}
      </Tag>
      {content.subtitle && (
        <p className="mt-1.5 text-xs sm:text-sm font-medium text-[#2D5D86] tracking-wide">
          {content.subtitle}
        </p>
      )}
    </div>
  );
};

const HeadingEditor: React.FC<{
  content: HeadingContent;
  settings: ElementSettings;
  onUpdateContent: (c: HeadingContent) => void;
}> = ({ content, onUpdateContent }) => {
  return (
    <div className="space-y-3 text-xs">
      <div>
        <label className="block font-bold text-[#1E3A5F] mb-1">Headline Text</label>
        <input
          type="text"
          value={content.text}
          onChange={(e) => onUpdateContent({ ...content, text: e.target.value })}
          className="w-full px-3 py-1.5 rounded-lg border border-[#BCD5E6] bg-white text-[#1E3A5F] focus:outline-[#0EA5E9]"
          placeholder="Enter heading..."
        />
      </div>
      <div>
        <label className="block font-bold text-[#1E3A5F] mb-1">Subtitle / Micro-copy</label>
        <input
          type="text"
          value={content.subtitle || ''}
          onChange={(e) => onUpdateContent({ ...content, subtitle: e.target.value })}
          className="w-full px-3 py-1.5 rounded-lg border border-[#BCD5E6] bg-white text-[#1E3A5F] focus:outline-[#0EA5E9]"
          placeholder="Optional supporting subtitle..."
        />
      </div>
      <div className="grid grid-cols-2 gap-2">
        <div>
          <label className="block font-bold text-[#1E3A5F] mb-1">HTML Tag</label>
          <select
            value={content.tag}
            onChange={(e) => onUpdateContent({ ...content, tag: e.target.value as any })}
            className="w-full px-2.5 py-1.5 rounded-lg border border-[#BCD5E6] bg-white text-[#1E3A5F]"
          >
            <option value="h1">H1 (Hero Main)</option>
            <option value="h2">H2 (Section Head)</option>
            <option value="h3">H3 (Sub-section)</option>
            <option value="h4">H4 (Card Title)</option>
            <option value="h5">H5 (Small)</option>
            <option value="h6">H6 (Micro)</option>
          </select>
        </div>
        <div>
          <label className="block font-bold text-[#1E3A5F] mb-1">Visual Size</label>
          <select
            value={content.fontSize || '3xl'}
            onChange={(e) => onUpdateContent({ ...content, fontSize: e.target.value as any })}
            className="w-full px-2.5 py-1.5 rounded-lg border border-[#BCD5E6] bg-white text-[#1E3A5F]"
          >
            <option value="sm">Small (14px)</option>
            <option value="base">Base (16px)</option>
            <option value="lg">Large (18px)</option>
            <option value="xl">XL (20px)</option>
            <option value="2xl">2XL (24px)</option>
            <option value="3xl">3XL (30px)</option>
            <option value="4xl">4XL (36px)</option>
            <option value="5xl">5XL (48px)</option>
          </select>
        </div>
      </div>
    </div>
  );
};

// =========================================================================
// 2. RICH TEXT ELEMENT
// =========================================================================
const RichTextRender: React.FC<{ content: RichTextContent; settings: ElementSettings }> = ({
  content,
  settings,
}) => {
  const alignClass =
    settings.alignment === 'center'
      ? 'text-center'
      : settings.alignment === 'right'
      ? 'text-right'
      : 'text-left';

  return (
    <div
      className={`prose prose-slate max-w-none text-xs sm:text-sm text-[#1E3A5F]/90 leading-relaxed font-normal ${alignClass} ${settings.customClass || ''}`}
      dangerouslySetInnerHTML={{ __html: content.html || '<p>Enter your content here...</p>' }}
    />
  );
};

const RichTextEditor: React.FC<{
  content: RichTextContent;
  onUpdateContent: (c: RichTextContent) => void;
}> = ({ content, onUpdateContent }) => {
  return (
    <div className="space-y-2 text-xs">
      <label className="block font-bold text-[#1E3A5F]">HTML Content / Copy</label>
      <textarea
        rows={6}
        value={content.html}
        onChange={(e) => onUpdateContent({ html: e.target.value })}
        className="w-full p-2.5 rounded-lg border border-[#BCD5E6] bg-white font-mono text-[11px] text-[#1E3A5F] focus:outline-[#0EA5E9]"
        placeholder="<p>Enter formatted paragraph or copy with <strong>strong</strong> tags...</p>"
      />
      <div className="text-[10px] text-slate-500 flex items-center gap-1">
        <span>Quick formatting supported: &lt;strong&gt;, &lt;em&gt;, &lt;ul&gt;, &lt;li&gt;, &lt;a href=""&gt;</span>
      </div>
    </div>
  );
};

// =========================================================================
// 3. SINGLE IMAGE ELEMENT
// =========================================================================
const ImageRender: React.FC<{ content: ImageContent; settings: ElementSettings }> = ({
  content,
  settings,
}) => {
  const alignClass =
    settings.alignment === 'center'
      ? 'flex justify-center'
      : settings.alignment === 'right'
      ? 'flex justify-end'
      : 'flex justify-start';

  const shadowClasses: Record<string, string> = {
    none: '',
    sm: 'shadow-xs',
    md: 'shadow-md',
    lg: 'shadow-lg',
    xl: 'shadow-xl',
  };

  const imgEl = (
    <img
      src={content.url || 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80'}
      alt={content.altText || 'Showcase'}
      className={`max-w-full h-auto object-cover ${shadowClasses[content.shadow || 'md']}`}
      style={{
        borderRadius: `${content.borderRadius !== undefined ? content.borderRadius : 12}px`,
        aspectRatio: content.aspectRatio === 'auto' ? undefined : content.aspectRatio?.replace('/', ' / '),
      }}
      loading="lazy"
    />
  );

  return (
    <div className={`w-full ${alignClass} ${settings.customClass || ''}`}>
      <figure className="inline-block max-w-full">
        {content.linkUrl ? (
          <a href={content.linkUrl} target="_blank" rel="noopener noreferrer">
            {imgEl}
          </a>
        ) : (
          imgEl
        )}
        {content.caption && (
          <figcaption className="mt-1.5 text-center text-[11px] font-medium text-slate-500">
            {content.caption}
          </figcaption>
        )}
      </figure>
    </div>
  );
};

const ImageEditor: React.FC<{
  content: ImageContent;
  onUpdateContent: (c: ImageContent) => void;
}> = ({ content, onUpdateContent }) => {
  return (
    <div className="space-y-3 text-xs">
      <div>
        <label className="block font-bold text-[#1E3A5F] mb-1">Image URL</label>
        <input
          type="text"
          value={content.url}
          onChange={(e) => onUpdateContent({ ...content, url: e.target.value })}
          className="w-full px-3 py-1.5 rounded-lg border border-[#BCD5E6] bg-white text-[#1E3A5F]"
          placeholder="https://..."
        />
      </div>
      <div>
        <label className="block font-bold text-[#1E3A5F] mb-1">Alt Text (Accessibility / SEO)</label>
        <input
          type="text"
          value={content.altText}
          onChange={(e) => onUpdateContent({ ...content, altText: e.target.value })}
          className="w-full px-3 py-1.5 rounded-lg border border-[#BCD5E6] bg-white text-[#1E3A5F]"
          placeholder="Descriptive image alt text..."
        />
      </div>
      <div>
        <label className="block font-bold text-[#1E3A5F] mb-1">Caption</label>
        <input
          type="text"
          value={content.caption || ''}
          onChange={(e) => onUpdateContent({ ...content, caption: e.target.value })}
          className="w-full px-3 py-1.5 rounded-lg border border-[#BCD5E6] bg-white text-[#1E3A5F]"
          placeholder="Optional caption..."
        />
      </div>
      <div className="grid grid-cols-2 gap-2">
        <div>
          <label className="block font-bold text-[#1E3A5F] mb-1">Aspect Ratio</label>
          <select
            value={content.aspectRatio || 'auto'}
            onChange={(e) => onUpdateContent({ ...content, aspectRatio: e.target.value as any })}
            className="w-full px-2 py-1.5 rounded-lg border border-[#BCD5E6] bg-white text-[#1E3A5F]"
          >
            <option value="auto">Original Auto</option>
            <option value="1/1">1:1 Square</option>
            <option value="4/3">4:3 Standard</option>
            <option value="16/9">16:9 Widescreen</option>
            <option value="21/9">21:9 Ultra-wide</option>
          </select>
        </div>
        <div>
          <label className="block font-bold text-[#1E3A5F] mb-1">Corner Radius (px)</label>
          <input
            type="number"
            value={content.borderRadius !== undefined ? content.borderRadius : 12}
            onChange={(e) => onUpdateContent({ ...content, borderRadius: Number(e.target.value) })}
            className="w-full px-2 py-1.5 rounded-lg border border-[#BCD5E6] bg-white text-[#1E3A5F]"
          />
        </div>
      </div>
    </div>
  );
};

// =========================================================================
// 4. CALL TO ACTION BUTTON ELEMENT
// =========================================================================
const CtaButtonRender: React.FC<{ content: CtaButtonContent; settings: ElementSettings }> = ({
  content,
  settings,
}) => {
  const alignClass =
    settings.alignment === 'center'
      ? 'text-center'
      : settings.alignment === 'right'
      ? 'text-right'
      : 'text-left';

  const styleClasses: Record<string, string> = {
    primary: 'bg-[#1E3A5F] hover:bg-[#2D5D86] text-white shadow-md',
    secondary: 'bg-[#0EA5E9] hover:bg-[#0284C7] text-white shadow-md',
    outline: 'bg-white hover:bg-[#EFF6FB] border-2 border-[#BCD5E6] text-[#1E3A5F]',
    gradient: 'bg-gradient-to-r from-[#1E3A5F] to-[#0EA5E9] hover:opacity-95 text-white shadow-lg',
  };

  const sizeClasses: Record<string, string> = {
    sm: 'px-4 py-1.5 text-xs font-bold rounded-lg',
    md: 'px-6 py-2.5 text-xs sm:text-sm font-bold rounded-full',
    lg: 'px-8 py-3.5 text-sm sm:text-base font-extrabold rounded-full',
  };

  return (
    <div className={`w-full ${alignClass} ${settings.customClass || ''}`}>
      <a
        href={content.url || '#'}
        target={content.openInNewTab ? '_blank' : '_self'}
        rel="noopener noreferrer"
        className={`inline-flex items-center gap-2 transition-all cursor-pointer select-none ${
          styleClasses[content.style || 'primary']
        } ${sizeClasses[content.size || 'md']}`}
      >
        <span>{content.label || 'Click Here'}</span>
        <ArrowRight className="w-4 h-4 shrink-0" />
      </a>
      {content.subtext && (
        <p className="mt-1 text-[11px] font-medium text-slate-500">{content.subtext}</p>
      )}
    </div>
  );
};

const CtaButtonEditor: React.FC<{
  content: CtaButtonContent;
  onUpdateContent: (c: CtaButtonContent) => void;
}> = ({ content, onUpdateContent }) => {
  return (
    <div className="space-y-3 text-xs">
      <div>
        <label className="block font-bold text-[#1E3A5F] mb-1">Button Label</label>
        <input
          type="text"
          value={content.label}
          onChange={(e) => onUpdateContent({ ...content, label: e.target.value })}
          className="w-full px-3 py-1.5 rounded-lg border border-[#BCD5E6] bg-white text-[#1E3A5F]"
          placeholder="e.g. Schedule Audit"
        />
      </div>
      <div>
        <label className="block font-bold text-[#1E3A5F] mb-1">Target URL</label>
        <input
          type="text"
          value={content.url}
          onChange={(e) => onUpdateContent({ ...content, url: e.target.value })}
          className="w-full px-3 py-1.5 rounded-lg border border-[#BCD5E6] bg-white text-[#1E3A5F]"
          placeholder="https://... or #contact"
        />
      </div>
      <div>
        <label className="block font-bold text-[#1E3A5F] mb-1">Supporting Micro-copy</label>
        <input
          type="text"
          value={content.subtext || ''}
          onChange={(e) => onUpdateContent({ ...content, subtext: e.target.value })}
          className="w-full px-3 py-1.5 rounded-lg border border-[#BCD5E6] bg-white text-[#1E3A5F]"
          placeholder="e.g. Zero commitment consultation"
        />
      </div>
      <div className="grid grid-cols-2 gap-2">
        <div>
          <label className="block font-bold text-[#1E3A5F] mb-1">Visual Theme</label>
          <select
            value={content.style}
            onChange={(e) => onUpdateContent({ ...content, style: e.target.value as any })}
            className="w-full px-2 py-1.5 rounded-lg border border-[#BCD5E6] bg-white text-[#1E3A5F]"
          >
            <option value="primary">Navy Primary</option>
            <option value="secondary">Sky Blue</option>
            <option value="gradient">Gradient Glow</option>
            <option value="outline">Clean Outline</option>
          </select>
        </div>
        <div>
          <label className="block font-bold text-[#1E3A5F] mb-1">Button Size</label>
          <select
            value={content.size}
            onChange={(e) => onUpdateContent({ ...content, size: e.target.value as any })}
            className="w-full px-2 py-1.5 rounded-lg border border-[#BCD5E6] bg-white text-[#1E3A5F]"
          >
            <option value="sm">Small</option>
            <option value="md">Medium</option>
            <option value="lg">Large Hero</option>
          </select>
        </div>
      </div>
    </div>
  );
};

// =========================================================================
// 5. SHOWCASE CARD ELEMENT (Product / Project Card)
// =========================================================================
const ShowcaseCardRender: React.FC<{ content: ShowcaseCardContent; settings: ElementSettings }> = ({
  content,
  settings,
}) => {
  return (
    <div
      className={`w-full p-4 sm:p-5 rounded-2xl bg-white border-2 border-[#BCD5E6] shadow-sm hover:shadow-md transition-all flex flex-col justify-between ${
        settings.customClass || ''
      }`}
    >
      <div>
        {content.imageUrl && (
          <div className="w-full h-44 sm:h-48 rounded-xl overflow-hidden mb-3.5 bg-slate-100">
            <img
              src={content.imageUrl}
              alt={content.title}
              className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
            />
          </div>
        )}
        <div className="flex items-center justify-between gap-2 mb-1.5">
          <span className="text-[10px] font-bold uppercase tracking-wider text-[#0EA5E9] bg-[#E0F2FE] px-2 py-0.5 rounded-md">
            {content.category || 'Featured Showcase'}
          </span>
          <span className="text-xs font-extrabold text-[#1E3A5F]">
            {content.priceOrMetric}
          </span>
        </div>
        <h4 className="font-urbanist font-extrabold text-base sm:text-lg text-[#1E3A5F] leading-snug">
          {content.title}
        </h4>
        <p className="mt-1 text-xs text-[#1E3A5F]/80 leading-relaxed font-normal">
          {content.description}
        </p>
      </div>

      <div className="mt-4 pt-3 border-t border-[#BCD5E6]/60 flex flex-wrap items-center justify-between gap-2">
        <div className="flex flex-wrap gap-1">
          {(content.badges || []).map((b, i) => (
            <span
              key={i}
              className="text-[10px] font-semibold px-2 py-0.5 rounded-md bg-[#F4F8FB] border border-[#BCD5E6] text-[#2D5D86]"
            >
              {b}
            </span>
          ))}
        </div>
        {content.ctaUrl && (
          <a
            href={content.ctaUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 text-xs font-bold text-[#0EA5E9] hover:text-[#0284C7]"
          >
            <span>{content.ctaText || 'Learn More'}</span>
            <ExternalLink className="w-3 h-3" />
          </a>
        )}
      </div>
    </div>
  );
};

const ShowcaseCardEditor: React.FC<{
  content: ShowcaseCardContent;
  onUpdateContent: (c: ShowcaseCardContent) => void;
}> = ({ content, onUpdateContent }) => {
  return (
    <div className="space-y-3 text-xs">
      <div>
        <label className="block font-bold text-[#1E3A5F] mb-1">Title</label>
        <input
          type="text"
          value={content.title}
          onChange={(e) => onUpdateContent({ ...content, title: e.target.value })}
          className="w-full px-3 py-1.5 rounded-lg border border-[#BCD5E6] bg-white text-[#1E3A5F]"
        />
      </div>
      <div className="grid grid-cols-2 gap-2">
        <div>
          <label className="block font-bold text-[#1E3A5F] mb-1">Category / Tag</label>
          <input
            type="text"
            value={content.category}
            onChange={(e) => onUpdateContent({ ...content, category: e.target.value })}
            className="w-full px-3 py-1.5 rounded-lg border border-[#BCD5E6] bg-white text-[#1E3A5F]"
          />
        </div>
        <div>
          <label className="block font-bold text-[#1E3A5F] mb-1">Price or Metric</label>
          <input
            type="text"
            value={content.priceOrMetric}
            onChange={(e) => onUpdateContent({ ...content, priceOrMetric: e.target.value })}
            className="w-full px-3 py-1.5 rounded-lg border border-[#BCD5E6] bg-white text-[#1E3A5F]"
          />
        </div>
      </div>
      <div>
        <label className="block font-bold text-[#1E3A5F] mb-1">Image URL</label>
        <input
          type="text"
          value={content.imageUrl}
          onChange={(e) => onUpdateContent({ ...content, imageUrl: e.target.value })}
          className="w-full px-3 py-1.5 rounded-lg border border-[#BCD5E6] bg-white text-[#1E3A5F]"
        />
      </div>
      <div>
        <label className="block font-bold text-[#1E3A5F] mb-1">Description</label>
        <textarea
          rows={3}
          value={content.description}
          onChange={(e) => onUpdateContent({ ...content, description: e.target.value })}
          className="w-full p-2.5 rounded-lg border border-[#BCD5E6] bg-white text-[#1E3A5F]"
        />
      </div>
      <div>
        <label className="block font-bold text-[#1E3A5F] mb-1">Badges (Comma separated)</label>
        <input
          type="text"
          value={(content.badges || []).join(', ')}
          onChange={(e) =>
            onUpdateContent({
              ...content,
              badges: e.target.value.split(',').map((s) => s.trim()).filter(Boolean),
            })
          }
          className="w-full px-3 py-1.5 rounded-lg border border-[#BCD5E6] bg-white text-[#1E3A5F]"
        />
      </div>
      <div className="grid grid-cols-2 gap-2">
        <div>
          <label className="block font-bold text-[#1E3A5F] mb-1">Link Label</label>
          <input
            type="text"
            value={content.ctaText || ''}
            onChange={(e) => onUpdateContent({ ...content, ctaText: e.target.value })}
            className="w-full px-3 py-1.5 rounded-lg border border-[#BCD5E6] bg-white text-[#1E3A5F]"
          />
        </div>
        <div>
          <label className="block font-bold text-[#1E3A5F] mb-1">Link URL</label>
          <input
            type="text"
            value={content.ctaUrl || ''}
            onChange={(e) => onUpdateContent({ ...content, ctaUrl: e.target.value })}
            className="w-full px-3 py-1.5 rounded-lg border border-[#BCD5E6] bg-white text-[#1E3A5F]"
          />
        </div>
      </div>
    </div>
  );
};

// =========================================================================
// 6. CUSTOM HTML / SHORTCODE ELEMENT
// =========================================================================
const CustomHtmlRender: React.FC<{ content: CustomHtmlContent; settings: ElementSettings }> = ({
  content,
  settings,
}) => {
  return (
    <div
      className={`w-full ${settings.customClass || ''}`}
      dangerouslySetInnerHTML={{ __html: content.rawHtml || '<!-- Custom HTML -->' }}
    />
  );
};

const CustomHtmlEditor: React.FC<{
  content: CustomHtmlContent;
  onUpdateContent: (c: CustomHtmlContent) => void;
}> = ({ content, onUpdateContent }) => {
  return (
    <div className="space-y-2 text-xs">
      <label className="block font-bold text-[#1E3A5F]">Raw HTML / Embed Code</label>
      <textarea
        rows={6}
        value={content.rawHtml}
        onChange={(e) => onUpdateContent({ ...content, rawHtml: e.target.value })}
        className="w-full p-2 rounded-lg border border-[#BCD5E6] bg-slate-900 text-emerald-400 font-mono text-[11px]"
        placeholder="<div>Custom embed, widget, or iframe...</div>"
      />
    </div>
  );
};

// =========================================================================
// 7. GALLERY ELEMENT
// =========================================================================
const GalleryRender: React.FC<{ content: GalleryContent; settings: ElementSettings }> = ({
  content,
  settings,
}) => {
  const colClass =
    content.columns === 2
      ? 'grid-cols-1 sm:grid-cols-2'
      : content.columns === 4
      ? 'grid-cols-2 sm:grid-cols-4'
      : 'grid-cols-1 sm:grid-cols-3';

  return (
    <div className={`grid ${colClass} gap-3 w-full ${settings.customClass || ''}`}>
      {(content.items || []).map((item) => (
        <div key={item.id} className="rounded-xl overflow-hidden border border-[#BCD5E6] bg-white shadow-xs">
          <img
            src={item.url}
            alt={item.altText}
            className="w-full h-36 sm:h-44 object-cover hover:scale-105 transition-transform duration-300"
          />
          {item.title && (
            <div className="p-2 text-center text-[11px] font-bold text-[#1E3A5F]">
              {item.title}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

const GalleryEditor: React.FC<{
  content: GalleryContent;
  onUpdateContent: (c: GalleryContent) => void;
}> = ({ content, onUpdateContent }) => {
  return (
    <div className="space-y-3 text-xs">
      <div>
        <label className="block font-bold text-[#1E3A5F] mb-1">Grid Columns</label>
        <select
          value={content.columns}
          onChange={(e) => onUpdateContent({ ...content, columns: Number(e.target.value) as any })}
          className="w-full px-2 py-1.5 rounded-lg border border-[#BCD5E6] bg-white text-[#1E3A5F]"
        >
          <option value={2}>2 Columns</option>
          <option value={3}>3 Columns</option>
          <option value={4}>4 Columns</option>
        </select>
      </div>
      <div>
        <label className="block font-bold text-[#1E3A5F] mb-1">
          Image URLs (one per line)
        </label>
        <textarea
          rows={4}
          value={(content.items || []).map((i) => i.url).join('\n')}
          onChange={(e) => {
            const urls = e.target.value.split('\n').filter((u) => u.trim());
            const items = urls.map((u, idx) => ({
              id: `gal_item_${idx}`,
              url: u.trim(),
              altText: `Gallery item ${idx + 1}`,
            }));
            onUpdateContent({ ...content, items });
          }}
          className="w-full p-2.5 rounded-lg border border-[#BCD5E6] bg-white text-[#1E3A5F]"
        />
      </div>
    </div>
  );
};

// =========================================================================
// 8. STATUS BADGE ELEMENT
// =========================================================================
const StatusBadgeRender: React.FC<{ content: StatusBadgeContent; settings: ElementSettings }> = ({
  content,
  settings,
}) => {
  const alignClass =
    settings.alignment === 'center'
      ? 'justify-center'
      : settings.alignment === 'right'
      ? 'justify-end'
      : 'justify-start';

  return (
    <div className={`w-full flex ${alignClass} ${settings.customClass || ''}`}>
      <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/95 border border-[#BCD5E6] shadow-xs text-xs font-bold text-[#1E3A5F] select-none backdrop-blur-xs">
        <span
          className="w-2 h-2 rounded-full shadow-[0_0_8px_#38BDF8] animate-pulse"
          style={{ backgroundColor: content.statusDotColor || '#0EA5E9' }}
        />
        <span>{content.text || '• Available for High-Growth DTC Brands & Multi-Channel Ops'}</span>
      </div>
    </div>
  );
};

const StatusBadgeEditor: React.FC<{
  content: StatusBadgeContent;
  onUpdateContent: (c: StatusBadgeContent) => void;
}> = ({ content, onUpdateContent }) => {
  return (
    <div className="space-y-3 text-xs">
      <div>
        <label className="block font-bold text-[#1E3A5F] mb-1">Status Badge Text</label>
        <input
          type="text"
          value={content.text || ''}
          onChange={(e) => onUpdateContent({ ...content, text: e.target.value })}
          className="w-full px-3 py-1.5 rounded-lg border border-[#BCD5E6] bg-white text-[#1E3A5F]"
          placeholder="e.g. • Available for High-Growth DTC Brands..."
        />
      </div>
      <div>
        <label className="block font-bold text-[#1E3A5F] mb-1">Pulsing Indicator Color</label>
        <input
          type="color"
          value={content.statusDotColor || '#0EA5E9'}
          onChange={(e) => onUpdateContent({ ...content, statusDotColor: e.target.value })}
          className="w-10 h-7 rounded border border-[#BCD5E6] cursor-pointer"
        />
      </div>
    </div>
  );
};

// =========================================================================
// 9. PROFILE ORBIT ELEMENT
// =========================================================================
const ProfileOrbitRender: React.FC<{ content: ProfileOrbitContent; settings: ElementSettings }> = ({
  content,
  settings,
}) => {
  const photo = content.imageUrl || defaultRussellPhoto;
  const badges = content.badges && content.badges.length > 0 ? content.badges : [
    { name: 'Shopify Plus' },
    { name: 'TikTok Shop' },
    { name: 'Home Depot US' },
    { name: 'WooCommerce' },
    { name: 'Zendrop & CJ' },
    { name: 'Wayfair' },
  ];

  return (
    <div className={`w-full flex flex-col items-center justify-center p-2 relative ${settings.customClass || ''}`}>
      <div className="relative w-[300px] h-[300px] sm:w-[360px] sm:h-[360px] lg:w-[420px] lg:h-[420px] flex items-center justify-center">
        {/* Ambient liquid glow */}
        <div className="absolute inset-0 bg-gradient-to-tr from-[#38BDF8]/40 via-[#0EA5E9]/30 to-[#1E3A5F]/20 blur-2xl -z-10 animate-hero-glow" />

        {/* Dynamic morph frame */}
        <div className="absolute inset-2 bg-gradient-to-br from-[#38BDF8] via-[#1E3A5F] to-[#7DD3FC] opacity-80 -z-10 shadow-xl animate-hero-morph" />

        {/* Center Portrait Frame */}
        <div className="relative w-4/5 h-4/5 flex items-center justify-center overflow-hidden shadow-2xl border-4 border-white bg-white animate-hero-morph">
          <img
            src={photo}
            alt={content.altText || 'Russell Taga-an'}
            className="w-full h-full object-cover object-top select-none scale-105"
          />
        </div>

        {/* Orbiting / Surrounding Badges */}
        {badges.slice(0, 6).map((b, idx) => {
          const angles = [30, 90, 150, 210, 270, 330];
          const angle = angles[idx % angles.length];
          const rad = (angle * Math.PI) / 180;
          const r = 44;
          const x = 50 + r * Math.cos(rad);
          const y = 50 + r * Math.sin(rad);

          return (
            <div
              key={idx}
              className="absolute hidden sm:flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/95 border border-[#BCD5E6] shadow-md text-[10px] font-bold text-[#1E3A5F] hover:scale-105 transition-all z-10 select-none whitespace-nowrap"
              style={{
                left: `${x}%`,
                top: `${y}%`,
                transform: 'translate(-50%, -50%)',
              }}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-[#0EA5E9]" />
              <span>{b.name}</span>
            </div>
          );
        })}
      </div>

      {/* Badges row for small screens */}
      <div className="flex sm:hidden flex-wrap items-center justify-center gap-1.5 mt-3">
        {badges.map((b, i) => (
          <span key={i} className="px-2.5 py-0.5 rounded-full bg-white border border-[#BCD5E6] text-[10px] font-bold text-[#1E3A5F] shadow-xs">
            {b.name}
          </span>
        ))}
      </div>
    </div>
  );
};

const ProfileOrbitEditor: React.FC<{
  content: ProfileOrbitContent;
  onUpdateContent: (c: ProfileOrbitContent) => void;
}> = ({ content, onUpdateContent }) => {
  return (
    <div className="space-y-3 text-xs">
      <div>
        <label className="block font-bold text-[#1E3A5F] mb-1">Portrait Image URL</label>
        <input
          type="text"
          value={content.imageUrl || ''}
          onChange={(e) => onUpdateContent({ ...content, imageUrl: e.target.value })}
          className="w-full px-3 py-1.5 rounded-lg border border-[#BCD5E6] bg-white text-[#1E3A5F]"
          placeholder="https://..."
        />
        <p className="text-[10px] text-slate-400 mt-0.5">Leave blank to use Russell's default cutout photo.</p>
      </div>

      <div>
        <label className="block font-bold text-[#1E3A5F] mb-1">Orbiting Brand Badges (comma-separated)</label>
        <textarea
          rows={3}
          value={(content.badges || []).map((b) => b.name).join(', ')}
          onChange={(e) => {
            const names = e.target.value.split(',').map((n) => n.trim()).filter(Boolean);
            onUpdateContent({
              ...content,
              badges: names.map((name) => ({ name })),
            });
          }}
          className="w-full p-2 rounded-lg border border-[#BCD5E6] bg-white text-[#1E3A5F]"
          placeholder="Shopify, TikTok Shop, Home Depot, WooCommerce, Zendrop, CJ"
        />
      </div>
    </div>
  );
};

// =========================================================================
// 10. CLIENT MARQUEE / TECH STACK ELEMENT
// =========================================================================
const ClientMarqueeRender: React.FC<{ content: ClientMarqueeContent; settings: ElementSettings }> = ({
  content,
  settings,
}) => {
  const logos = content.logos && content.logos.length > 0 ? content.logos : [
    { name: 'Klaviyo' },
    { name: 'Mailchimp' },
    { name: 'Amazon' },
    { name: 'Walmart' },
    { name: 'Faire' },
    { name: 'Omnisend' },
    { name: 'Etsy' },
    { name: 'Home Depot' },
    { name: 'Photoshop' },
    { name: 'Premiere Pro' },
    { name: 'DaVinci Resolve' },
    { name: 'Shopify' },
  ];

  return (
    <div className={`w-full py-2 ${settings.customClass || ''}`}>
      <div className="w-full bg-white/95 border-2 border-[#BCD5E6] rounded-2xl shadow-xs overflow-hidden ticker-mask select-none py-2 px-3 backdrop-blur-xs">
        <div className="flex items-center gap-3 sm:gap-4 overflow-x-auto no-scrollbar py-1">
          {logos.concat(logos).map((logo, idx) => (
            <div
              key={idx}
              className="flex-none flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-[#EFF6FB]/90 hover:bg-white border border-[#BCD5E6] hover:border-[#1E3A5F] shadow-2xs transition-all text-xs font-bold text-[#1E3A5F]"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-[#0EA5E9]" />
              <span>{logo.name}</span>
            </div>
          ))}
        </div>
      </div>
      {content.title && (
        <div className="mt-1 text-center text-[10px] font-semibold text-slate-400 uppercase tracking-widest">
          {content.title}
        </div>
      )}
    </div>
  );
};

const ClientMarqueeEditor: React.FC<{
  content: ClientMarqueeContent;
  onUpdateContent: (c: ClientMarqueeContent) => void;
}> = ({ content, onUpdateContent }) => {
  return (
    <div className="space-y-3 text-xs">
      <div>
        <label className="block font-bold text-[#1E3A5F] mb-1">Optional Caption</label>
        <input
          type="text"
          value={content.title || ''}
          onChange={(e) => onUpdateContent({ ...content, title: e.target.value })}
          className="w-full px-3 py-1.5 rounded-lg border border-[#BCD5E6] bg-white text-[#1E3A5F]"
          placeholder="e.g. Enterprise Tooling & Marketplace Ecosystem"
        />
      </div>
      <div>
        <label className="block font-bold text-[#1E3A5F] mb-1">Logos & Tool Names (comma-separated)</label>
        <textarea
          rows={4}
          value={(content.logos || []).map((l) => l.name).join(', ')}
          onChange={(e) => {
            const names = e.target.value.split(',').map((n) => n.trim()).filter(Boolean);
            onUpdateContent({
              ...content,
              logos: names.map((name) => ({ name })),
            });
          }}
          className="w-full p-2 rounded-lg border border-[#BCD5E6] bg-white text-[#1E3A5F]"
          placeholder="Klaviyo, Mailchimp, Amazon, Walmart, Faire, Omnisend, Etsy, Home Depot, Photoshop, Premiere, DaVinci, Shopify"
        />
      </div>
    </div>
  );
};

// =========================================================================
// 11. PROFILE CARD ELEMENT (ABOUT PAGE)
// =========================================================================
const ProfileCardRender: React.FC<{ content: ProfileCardContent; settings: ElementSettings }> = ({
  content,
  settings,
}) => {
  const photo = content.imageUrl || defaultAboutPhoto;

  return (
    <div className={`w-full flex flex-col items-center justify-center text-center p-2 ${settings.customClass || ''}`}>
      <div className="relative w-[260px] h-[260px] sm:w-[340px] sm:h-[340px] lg:w-[380px] lg:h-[380px] flex items-center justify-center">
        <div className="absolute inset-[-12px] bg-gradient-to-tr from-[#38BDF8]/40 via-[#0EA5E9]/30 to-[#1E3A5F]/25 blur-2xl -z-10 animate-hero-glow" />
        <div className="absolute inset-[-3px] bg-gradient-to-br from-[#38BDF8] via-[#1E3A5F] to-[#7DD3FC] opacity-80 -z-10 shadow-xl animate-hero-morph" />
        <div className="relative w-full h-full flex items-center justify-center overflow-hidden shadow-2xl border-4 border-white bg-white animate-hero-morph">
          <img
            src={photo}
            alt={content.name || 'Russell Taga-an'}
            className="w-full h-full object-cover object-[35%_center] select-none scale-105"
          />
        </div>
      </div>
      <div className="mt-4">
        <h3 className="font-urbanist font-extrabold text-xl text-[#1E3A5F]">
          {content.name || 'Russell Taga-an'}
        </h3>
        <p className="text-xs font-semibold text-[#0EA5E9] mt-0.5">
          {content.caption || 'Operations & Catalog Systems Architect'}
        </p>
      </div>
    </div>
  );
};

const ProfileCardEditor: React.FC<{
  content: ProfileCardContent;
  onUpdateContent: (c: ProfileCardContent) => void;
}> = ({ content, onUpdateContent }) => {
  return (
    <div className="space-y-3 text-xs">
      <div>
        <label className="block font-bold text-[#1E3A5F] mb-1">Image URL</label>
        <input
          type="text"
          value={content.imageUrl || ''}
          onChange={(e) => onUpdateContent({ ...content, imageUrl: e.target.value })}
          className="w-full px-3 py-1.5 rounded-lg border border-[#BCD5E6] bg-white text-[#1E3A5F]"
          placeholder="https://..."
        />
        <p className="text-[10px] text-slate-400 mt-0.5">Leave blank to use Russell's default portrait.</p>
      </div>
      <div>
        <label className="block font-bold text-[#1E3A5F] mb-1">Full Name</label>
        <input
          type="text"
          value={content.name || ''}
          onChange={(e) => onUpdateContent({ ...content, name: e.target.value })}
          className="w-full px-3 py-1.5 rounded-lg border border-[#BCD5E6] bg-white text-[#1E3A5F]"
        />
      </div>
      <div>
        <label className="block font-bold text-[#1E3A5F] mb-1">Caption / Subtitle</label>
        <input
          type="text"
          value={content.caption || ''}
          onChange={(e) => onUpdateContent({ ...content, caption: e.target.value })}
          className="w-full px-3 py-1.5 rounded-lg border border-[#BCD5E6] bg-white text-[#1E3A5F]"
        />
      </div>
    </div>
  );
};

// =========================================================================
// 12. EXPERIENCE TIMELINE ELEMENT (ABOUT PAGE)
// =========================================================================
const ExperienceTimelineRender: React.FC<{ content: ExperienceTimelineContent; settings: ElementSettings }> = ({
  content,
  settings,
}) => {
  const items = content.items || [];

  return (
    <div className={`w-full space-y-3 ${settings.customClass || ''}`}>
      {content.sectionTitle && (
        <div className="flex items-center gap-2 text-xs font-bold text-[#1E3A5F] pb-1 border-b border-[#BCD5E6]/60">
          <Award className="w-4 h-4 text-[#0EA5E9]" />
          <span className="uppercase tracking-wider text-[11px] text-[#2D5D86]">
            {content.sectionTitle}
          </span>
        </div>
      )}

      {items.map((item, idx) => (
        <div key={idx} className="p-4 rounded-xl bg-[#EFF6FB]/60 border border-[#BCD5E6] space-y-2">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <h4 className="font-bold text-xs sm:text-sm text-[#1E3A5F] flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#0EA5E9]" />
              <span>{item.title}</span>
            </h4>
            <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-[#E0F2FE] border border-[#BAE6FD] text-[#0369A1]">
              {item.period}
            </span>
          </div>
          <div className="text-[11px] font-semibold text-[#2D5D86]">{item.company}</div>
          <ul className="space-y-1 pt-1 text-xs text-[#1E3A5F]/85">
            {(item.bullets || []).map((bullet, bIdx) => (
              <li key={bIdx} className="flex items-start gap-1.5 leading-snug">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#0EA5E9] shrink-0 mt-0.5" />
                <span>{bullet}</span>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};

const ExperienceTimelineEditor: React.FC<{
  content: ExperienceTimelineContent;
  onUpdateContent: (c: ExperienceTimelineContent) => void;
}> = ({ content, onUpdateContent }) => {
  const items = content.items || [];

  const updateItem = (index: number, updated: Partial<ExperienceTimelineItem>) => {
    const newItems = [...items];
    newItems[index] = { ...newItems[index], ...updated };
    onUpdateContent({ ...content, items: newItems });
  };

  const addItem = () => {
    onUpdateContent({
      ...content,
      items: [
        ...items,
        {
          title: 'New Position',
          company: 'Company Name',
          period: '2026 — Present',
          bullets: ['Key impact milestone or responsibility.'],
        },
      ],
    });
  };

  const removeItem = (idx: number) => {
    onUpdateContent({
      ...content,
      items: items.filter((_, i) => i !== idx),
    });
  };

  return (
    <div className="space-y-4 text-xs">
      <div>
        <label className="block font-bold text-[#1E3A5F] mb-1">Section Title</label>
        <input
          type="text"
          value={content.sectionTitle || ''}
          onChange={(e) => onUpdateContent({ ...content, sectionTitle: e.target.value })}
          className="w-full px-3 py-1.5 rounded-lg border border-[#BCD5E6] bg-white text-[#1E3A5F]"
          placeholder="Career History & Verified Impact"
        />
      </div>

      <div className="flex items-center justify-between">
        <span className="font-bold text-[#1E3A5F]">Positions ({items.length})</span>
        <button
          type="button"
          onClick={addItem}
          className="px-2.5 py-1 rounded bg-[#0EA5E9] text-white font-bold flex items-center gap-1 cursor-pointer"
        >
          <Plus className="w-3 h-3" />
          <span>Add Position</span>
        </button>
      </div>

      <div className="space-y-3">
        {items.map((item, idx) => (
          <div key={idx} className="p-3 rounded-lg border border-[#BCD5E6] bg-white space-y-2">
            <div className="flex items-center justify-between">
              <span className="font-bold text-[#1E3A5F]">#{idx + 1} Role</span>
              <button
                type="button"
                onClick={() => removeItem(idx)}
                className="text-red-500 hover:text-red-700 cursor-pointer"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            </div>
            <input
              type="text"
              value={item.title}
              onChange={(e) => updateItem(idx, { title: e.target.value })}
              className="w-full px-2 py-1 rounded border border-[#BCD5E6] bg-slate-50 font-bold"
              placeholder="Job Title"
            />
            <div className="grid grid-cols-2 gap-2">
              <input
                type="text"
                value={item.company}
                onChange={(e) => updateItem(idx, { company: e.target.value })}
                className="w-full px-2 py-1 rounded border border-[#BCD5E6]"
                placeholder="Company"
              />
              <input
                type="text"
                value={item.period}
                onChange={(e) => updateItem(idx, { period: e.target.value })}
                className="w-full px-2 py-1 rounded border border-[#BCD5E6]"
                placeholder="Period"
              />
            </div>
            <div>
              <label className="block text-[10px] font-bold text-slate-500 mb-0.5">Bullets (one per line)</label>
              <textarea
                rows={3}
                value={(item.bullets || []).join('\n')}
                onChange={(e) =>
                  updateItem(idx, {
                    bullets: e.target.value.split('\n').filter(Boolean),
                  })
                }
                className="w-full p-2 rounded border border-[#BCD5E6]"
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// =========================================================================
// 13. WORK SHOWCASE ELEMENT (WORK PAGE)
// =========================================================================
const WorkShowcaseRender: React.FC<{
  content: WorkShowcaseContent;
  settings: ElementSettings;
  onUpdateContent?: (c: WorkShowcaseContent) => void;
  onSelectProjectCard?: (project: WorkShowcaseProject, projectIndex: number) => void;
  selectedProjectId?: string | null;
}> = ({
  content,
  settings,
  onUpdateContent,
  onSelectProjectCard,
  selectedProjectId,
}) => {
  const [activeFilter, setActiveFilter] = useState('All');
  const filters = content.filters && content.filters.length > 0
    ? content.filters
    : ['All', 'Catalog Architecture', 'Marketplace Ops', 'Automation'];
  const projects = content.projects || [];

  const [editingCanvasProject, setEditingCanvasProject] = useState<WorkShowcaseProject | null>(null);
  const [editingCanvasIndex, setEditingCanvasIndex] = useState<number | null>(null);

  const filtered = activeFilter === 'All'
    ? projects
    : projects.filter(
        (p) =>
          p.category?.toLowerCase() === activeFilter.toLowerCase() ||
          p.previewBadge?.toLowerCase() === activeFilter.toLowerCase() ||
          (p.tags || []).some((t) => t.toLowerCase().includes(activeFilter.toLowerCase()))
      );

  const handleSaveCanvasProject = (saved: WorkShowcaseProject) => {
    if (onUpdateContent) {
      const targetIdx = projects.findIndex(
        (p) => p.id === saved.id || (editingCanvasIndex !== null && projects[editingCanvasIndex]?.id === p.id)
      );
      if (targetIdx >= 0) {
        const updated = [...projects];
        updated[targetIdx] = saved;
        onUpdateContent({ ...content, projects: updated });
      } else {
        onUpdateContent({ ...content, projects: [saved, ...projects] });
      }
    }
    setEditingCanvasProject(null);
    setEditingCanvasIndex(null);
  };

  const handleCreateNewCard = () => {
    if (!onUpdateContent) return;
    const newProject: WorkShowcaseProject = {
      id: `proj_${Date.now()}`,
      title: 'New Sample Work Storefront',
      client: 'Brand Partner Inc.',
      subtitle: 'Luxury E-Commerce Catalog & Store Operations',
      domainUrl: 'mystore.com',
      url: 'https://mystore.com/',
      category: filters[1] || 'Catalog Architecture',
      previewBadge: 'CASE STUDY',
      metrics: '+180% Velocity Lift',
      vitalsScore: '99/100 Core Vitals',
      description:
        'Architected 25,000+ variant matrices with nested countertop cutouts, finishes, and custom hardware logic across Shopify and Home Depot with automated inventory flat-files.',
      highlights: [
        'Configured scalable variant matrix architecture and automated SKU synchronization',
        'Built high-converting checkout flows and optimized mobile ergonomics',
      ],
      tags: ['Shopify Plus', 'Home Depot US', 'Photoshop Batch', 'Metafields', 'FBT Logistics'],
      imageUrl: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=1200&q=85',
      galleryImages: [],
      actionLabel: 'CASE STUDY',
    };
    const updated = [newProject, ...projects];
    onUpdateContent({ ...content, projects: updated });
    setEditingCanvasProject(newProject);
    setEditingCanvasIndex(0);
  };

  const handleDuplicateCard = (projId: string) => {
    if (!onUpdateContent) return;
    const targetIdx = projects.findIndex((p) => p.id === projId);
    if (targetIdx === -1) return;
    const target = projects[targetIdx];
    const duplicated: WorkShowcaseProject = {
      ...target,
      id: `proj_${Date.now()}`,
      title: `${target.title} (Copy)`,
    };
    const updated = [...projects];
    updated.splice(targetIdx + 1, 0, duplicated);
    onUpdateContent({ ...content, projects: updated });
  };

  const handleDeleteCard = (projId: string) => {
    if (!onUpdateContent) return;
    if (window.confirm('Are you sure you want to delete this sample work card?')) {
      const updated = projects.filter((p) => p.id !== projId);
      onUpdateContent({ ...content, projects: updated });
    }
  };

  const handleUploadPhotosForCard = (projId: string, files: File[]) => {
    if (!onUpdateContent || !files.length) return;
    const targetIdx = projects.findIndex((p) => p.id === projId);
    if (targetIdx === -1) return;

    files.forEach((file) => {
      const reader = new FileReader();
      reader.onload = () => {
        if (typeof reader.result === 'string') {
          const newImg = {
            id: `img_${Date.now()}_${Math.random().toString(36).substr(2, 4)}`,
            url: reader.result,
            caption: `${file.name.replace(/\.[^/.]+$/, '')} Proof Photo`,
            altText: projects[targetIdx].title || 'Proof photo',
          };
          const updated = [...projects];
          updated[targetIdx] = {
            ...updated[targetIdx],
            galleryImages: [...(updated[targetIdx].galleryImages || []), newImg],
          };
          onUpdateContent({ ...content, projects: updated });
        }
      };
      reader.readAsDataURL(file);
    });
  };

  return (
    <div className={`w-full space-y-6 ${settings.customClass || ''}`}>
      {/* Admin Quick Action Bar for Sample Cards */}
      {onUpdateContent && (
        <div className="flex flex-wrap items-center justify-between gap-3 p-4 rounded-2xl bg-gradient-to-r from-sky-50 via-emerald-50 to-white border border-[#BCD5E6] shadow-xs">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-[#0EA5E9] text-white flex items-center justify-center font-bold shadow-xs">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <div>
              <h4 className="font-urbanist font-extrabold text-sm text-[#1E3A5F]">
                Sample Work Cards Manager ({projects.length} Total Cards)
              </h4>
              <p className="text-[11px] text-slate-500">
                Click any card to edit title, subtitle, description, tags, storefront links & multi-photo gallery.
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={handleCreateNewCard}
            className="px-4 py-2 rounded-xl bg-[#143020] hover:bg-[#1E442D] text-white font-extrabold text-xs shadow-sm flex items-center gap-2 transition-all hover:scale-105 cursor-pointer"
          >
            <Plus className="w-4 h-4 text-[#4ADE80]" />
            <span>+ Add New Sample Work Card</span>
          </button>
        </div>
      )}

      {/* Header and Filter Buttons */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-200">
        <div>
          {content.headline && (
            <h3 className="font-urbanist font-extrabold text-xl sm:text-2xl text-slate-900">
              {content.headline}
            </h3>
          )}
          {content.subhead && (
            <p className="text-xs text-slate-500 mt-0.5">{content.subhead}</p>
          )}
        </div>

        {/* Filter Pills */}
        <div className="flex flex-wrap items-center gap-1.5 p-1 rounded-2xl bg-slate-100 border border-slate-200">
          {filters.map((f) => (
            <button
              key={f}
              type="button"
              onClick={() => setActiveFilter(f)}
              className={`px-3 py-1 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                activeFilter === f
                  ? 'bg-[#143020] text-white shadow-xs'
                  : 'bg-white hover:bg-slate-50 text-slate-600 border border-slate-200/60'
              }`}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      {/* Projects Grid (macOS Browser Frame Cards) */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map((proj, idx) => {
          const photoCount = 1 + (proj.galleryImages?.length || 0);
          const realIndex = projects.findIndex((p) => p.id === proj.id);
          const isSelected = selectedProjectId === proj.id;

          return (
            <div
              key={proj.id || idx}
              onClick={() => {
                if (onSelectProjectCard) {
                  onSelectProjectCard(proj, realIndex >= 0 ? realIndex : idx);
                } else if (onUpdateContent) {
                  setEditingCanvasProject(proj);
                  setEditingCanvasIndex(realIndex >= 0 ? realIndex : idx);
                }
              }}
              className={`rounded-3xl bg-white border shadow-xs hover:shadow-2xl transition-all duration-300 flex flex-col justify-between overflow-hidden group relative cursor-pointer ${
                isSelected
                  ? 'border-[#0EA5E9] ring-4 ring-[#0EA5E9]/50 shadow-2xl scale-[1.015]'
                  : onSelectProjectCard
                  ? 'border-slate-200/90 hover:border-[#0EA5E9] hover:ring-2 hover:ring-[#0EA5E9]/30'
                  : onUpdateContent
                  ? 'border-slate-200/90 hover:border-[#0EA5E9] hover:ring-2 hover:ring-[#0EA5E9]/50'
                  : 'border-slate-200/90'
              }`}
            >
              {/* Selected in Left Editor Badge */}
              {isSelected && (
                <div className="absolute top-2 left-2 z-25 px-2.5 py-1 rounded-full bg-[#0EA5E9] text-white text-[10px] font-black tracking-wider uppercase shadow-md flex items-center gap-1.5 animate-pulse">
                  <span className="w-1.5 h-1.5 rounded-full bg-white shadow-xs" />
                  <span>Editing on Left Panel</span>
                </div>
              )}

              {/* Hover Badge if Clickable for Left Editor */}
              {!isSelected && onSelectProjectCard && (
                <div className="opacity-0 group-hover:opacity-100 transition-opacity absolute top-2 left-2 z-25 px-2.5 py-1 rounded-full bg-slate-900/80 backdrop-blur-xs text-white text-[9.5px] font-bold shadow-md flex items-center gap-1">
                  <span>Click to edit in left side 👈</span>
                </div>
              )}
              {/* Quick Actions Overlay for CMS Canvas */}
              {onUpdateContent && (
                <div className="absolute top-2 right-2 z-20 flex items-center gap-1.5">
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      if (onSelectProjectCard) {
                        onSelectProjectCard(proj, realIndex >= 0 ? realIndex : idx);
                      } else {
                        setEditingCanvasProject(proj);
                        setEditingCanvasIndex(realIndex >= 0 ? realIndex : idx);
                      }
                    }}
                    className="px-2.5 py-1 rounded-xl bg-[#143020] hover:bg-[#1E442D] text-white text-[10.5px] font-bold shadow-md flex items-center gap-1 cursor-pointer backdrop-blur-xs transition-all hover:scale-105"
                    title="Edit text, photos, and links in left panel"
                  >
                    <Edit3 className="w-3 h-3 text-[#4ADE80]" />
                    <span>Edit Card</span>
                  </button>

                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDuplicateCard(proj.id);
                    }}
                    className="p-1 rounded-xl bg-white/90 hover:bg-white text-slate-700 shadow-md border border-slate-200 transition-all hover:scale-105 cursor-pointer"
                    title="Duplicate card"
                  >
                    <Copy className="w-3 h-3 text-slate-600" />
                  </button>

                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDeleteCard(proj.id);
                    }}
                    className="p-1 rounded-xl bg-white/90 hover:bg-red-50 text-slate-400 hover:text-red-600 shadow-md border border-slate-200 transition-all hover:scale-105 cursor-pointer"
                    title="Delete card"
                  >
                    <Trash2 className="w-3 h-3 text-red-500" />
                  </button>
                </div>
              )}

              <div>
                {/* Browser Window Header */}
                <div className="bg-white border-b border-slate-200 px-4 py-2.5 flex items-center justify-between text-[11px] select-none">
                  <div className="flex items-center gap-1.5 shrink-0">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#EF4444]" />
                    <span className="w-2.5 h-2.5 rounded-full bg-[#F59E0B]" />
                    <span className="w-2.5 h-2.5 rounded-full bg-[#10B981]" />
                  </div>

                  <div className="px-3 py-0.5 rounded-full bg-slate-50 border border-slate-200 text-[10px] font-mono text-slate-600 flex items-center gap-1 truncate max-w-[55%]">
                    <Hexagon className="w-3 h-3 text-slate-400 shrink-0" />
                    <span className="truncate">{proj.domainUrl || 'store.com'}</span>
                  </div>

                  <div className="text-[10px] font-mono font-medium text-slate-400 shrink-0">
                    {proj.vitalsScore || '99/100 Vitals'}
                  </div>
                </div>

                {/* Viewport Image Area */}
                <div className="relative aspect-[16/10] w-full overflow-hidden bg-slate-900 select-none group/img">
                  {proj.imageUrl ? (
                    <img
                      src={proj.imageUrl}
                      alt={proj.title}
                      className="w-full h-full object-cover group-hover:scale-104 transition-transform duration-500"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-slate-500">
                      <ImageIcon className="w-8 h-8" />
                    </div>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/20 pointer-events-none" />

                  {/* Top-Left Category Badge */}
                  <div className="absolute top-3 left-3 pointer-events-auto">
                    <span className="inline-flex items-center px-2.5 py-1 rounded-full bg-white text-slate-900 text-[9px] font-black uppercase tracking-wider border border-slate-200 shadow-sm">
                      {proj.previewBadge || proj.category}
                    </span>
                  </div>

                  {/* Top-Right Metric Pill */}
                  <div className="absolute top-3 right-3 pointer-events-auto">
                    <span className="inline-flex items-center px-2.5 py-1 rounded-full bg-[#134E2E] text-[#4ADE80] text-[9.5px] font-bold border border-[#166534] shadow-sm">
                      {proj.metrics}
                    </span>
                  </div>

                  {/* Bottom Gallery Badge & Quick Photo Upload */}
                  <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between gap-2 pointer-events-auto">
                    <span className="px-2.5 py-1 rounded-full bg-black/80 backdrop-blur-xs text-white text-[9.5px] font-bold flex items-center gap-1 border border-white/20">
                      <Camera className="w-3 h-3 text-sky-400" />
                      <span>{photoCount} Proof Photos</span>
                    </span>

                    {onUpdateContent && (
                      <label
                        onClick={(e) => e.stopPropagation()}
                        className="px-2 py-0.5 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white text-[9.5px] font-bold flex items-center gap-1 cursor-pointer shadow-md transition-colors"
                        title="Upload photos directly to this card"
                      >
                        <Upload className="w-2.5 h-2.5" />
                        <span>+ Upload Photos</span>
                        <input
                          type="file"
                          multiple
                          accept="image/*"
                          className="hidden"
                          onChange={(e) => {
                            const files = Array.from(e.target.files || []) as File[];
                            handleUploadPhotosForCard(proj.id, files);
                          }}
                        />
                      </label>
                    )}
                  </div>
                </div>

                {/* Card Body */}
                <div className="p-5 space-y-2">
                  <h4 className="font-urbanist font-black text-base text-slate-900 uppercase tracking-tight group-hover:text-[#0EA5E9] transition-colors">
                    {proj.title}
                  </h4>

                  <p className="font-bold text-[10px] uppercase tracking-wider text-slate-800 leading-tight">
                    {proj.subtitle || proj.client}
                  </p>

                  <p className="text-xs text-slate-500 leading-relaxed font-normal line-clamp-3">
                    {proj.description}
                  </p>

                  {/* Tags */}
                  <div className="flex flex-wrap items-center gap-1.5 pt-2">
                    {(proj.tags || []).slice(0, 5).map((t, tIdx) => (
                      <span
                        key={tIdx}
                        className="px-2 py-0.5 rounded-md bg-slate-100 text-slate-600 text-[10px] font-medium border border-slate-200"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Card Footer */}
              <div className="px-5 pb-5 pt-1 flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => {
                    if (onSelectProjectCard) {
                      onSelectProjectCard(proj, realIndex >= 0 ? realIndex : idx);
                    } else {
                      setEditingCanvasProject(proj);
                      setEditingCanvasIndex(realIndex >= 0 ? realIndex : idx);
                    }
                  }}
                  className="flex-1 py-2 rounded-xl bg-[#143020] hover:bg-[#1E442D] text-white font-extrabold text-[11px] tracking-wider uppercase transition-all cursor-pointer shadow-xs flex items-center justify-center gap-1"
                >
                  <Edit3 className="w-3 h-3 text-[#4ADE80]" />
                  <span>{proj.actionLabel || 'Edit Card Details'}</span>
                </button>

                {proj.url && (
                  <a
                    href={proj.url}
                    target="_blank"
                    rel="noreferrer"
                    onClick={(e) => e.stopPropagation()}
                    className="w-9 h-9 rounded-xl border border-slate-200 hover:bg-slate-100 flex items-center justify-center text-slate-600"
                    title="Open live storefront"
                  >
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* In-Canvas Direct Project Edit Modal */}
      {editingCanvasProject && (
        <WorkProjectEditModal
          project={editingCanvasProject}
          availableCategories={filters}
          isOpen={true}
          onClose={() => {
            setEditingCanvasProject(null);
            setEditingCanvasIndex(null);
          }}
          onSave={handleSaveCanvasProject}
        />
      )}
    </div>
  );
};

const WorkShowcaseEditor: React.FC<{
  content: WorkShowcaseContent;
  onUpdateContent: (c: WorkShowcaseContent) => void;
}> = ({ content, onUpdateContent }) => {
  return (
    <WorkShowcaseInspector
      content={content}
      onUpdateContent={onUpdateContent}
    />
  );
};

// =========================================================================
// MASTER WPBakery ELEMENT REGISTRY
// =========================================================================
export const ELEMENT_REGISTRY: Record<ElementType, ElementRegistryEntry> = {
  heading: {
    type: 'heading',
    label: 'Custom Heading',
    icon: HeadingIcon,
    description: 'Add styled H1-H6 headers with subtitles and responsive font scaling.',
    category: 'Typography',
    defaultContent: () => ({
      type: 'heading',
      data: {
        text: 'Transform Your E-Commerce Operations',
        tag: 'h2',
        fontSize: '3xl',
        fontWeight: 'bold',
        subtitle: 'Enterprise Systems & Catalog Velocity',
      },
    }),
    defaultSettings: () => ({ alignment: 'left', margin: { bottom: 12 } }),
    Render: HeadingRender,
    Editor: HeadingEditor,
  },

  richText: {
    type: 'richText',
    label: 'Text Block',
    icon: AlignLeft,
    description: 'Formatted copy, bulleted lists, and rich HTML markup.',
    category: 'Typography',
    defaultContent: () => ({
      type: 'richText',
      data: {
        html: '<p>Standardize your catalog management routines with automated spreadsheet pipelines, multi-attribute matrices, and daily QA verification.</p>',
      },
    }),
    defaultSettings: () => ({ alignment: 'left', margin: { bottom: 16 } }),
    Render: RichTextRender,
    Editor: RichTextEditor,
  },

  image: {
    type: 'image',
    label: 'Single Image',
    icon: ImageIcon,
    description: 'Responsive picture asset with border radius, aspect ratio, and captions.',
    category: 'Media',
    defaultContent: () => ({
      type: 'image',
      data: {
        url: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80',
        altText: 'E-commerce operations analytics',
        aspectRatio: '16/9',
        borderRadius: 12,
        shadow: 'md',
        caption: 'Enterprise catalog synchronizer dashboard',
      },
    }),
    defaultSettings: () => ({ alignment: 'center', margin: { bottom: 16 } }),
    Render: ImageRender,
    Editor: ImageEditor,
  },

  gallery: {
    type: 'gallery',
    label: 'Image Gallery',
    icon: LayoutGrid,
    description: 'Responsive multi-image grid gallery with hover effects.',
    category: 'Media',
    defaultContent: () => ({
      type: 'gallery',
      data: {
        columns: 3,
        gap: 'md',
        aspectRatio: '4/3',
        items: [
          {
            id: 'g1',
            url: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80',
            altText: 'Operations',
            title: 'Analytics Engine',
          },
          {
            id: 'g2',
            url: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=800&q=80',
            altText: 'Willow Bath',
            title: 'Luxury Vanities',
          },
          {
            id: 'g3',
            url: 'https://images.unsplash.com/photo-1513151233558-d860c5398176?auto=format&fit=crop&w=800&q=80',
            altText: 'DIYATIVE',
            title: '3D Wooden Kits',
          },
        ],
      },
    }),
    defaultSettings: () => ({ alignment: 'center', margin: { bottom: 20 } }),
    Render: GalleryRender,
    Editor: GalleryEditor,
  },

  ctaButton: {
    type: 'ctaButton',
    label: 'Call to Action Button',
    icon: MousePointerClick,
    description: 'High-converting action button with custom styles, icons, and micro-copy.',
    category: 'Action',
    defaultContent: () => ({
      type: 'ctaButton',
      data: {
        label: 'Schedule Catalog Audit',
        url: '#contact',
        style: 'primary',
        size: 'md',
        subtext: 'Free 30-min strategy review',
      },
    }),
    defaultSettings: () => ({ alignment: 'left', margin: { bottom: 12 } }),
    Render: CtaButtonRender,
    Editor: CtaButtonEditor,
  },

  showcaseCard: {
    type: 'showcaseCard',
    label: 'Showcase / Product Card',
    icon: ShoppingBag,
    description: 'E-commerce product or portfolio card with metrics, image, badges, and CTA.',
    category: 'Commerce',
    defaultContent: () => ({
      type: 'showcaseCard',
      data: {
        title: 'Skin by Brownlee & Co.',
        category: 'Clinical Skincare DTC',
        description: 'Engineered high-compliance TikTok Shop catalog, SPS health optimization, and FBT logistics setup.',
        priceOrMetric: '4.8★ Health Score',
        imageUrl: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=800&q=80',
        badges: ['TikTok Shop', 'FBT Dispatch', 'Shopify Plus'],
        ctaText: 'Visit Live Store',
        ctaUrl: 'https://skinbybrownleeandco.com/',
      },
    }),
    defaultSettings: () => ({ alignment: 'left', margin: { bottom: 16 } }),
    Render: ShowcaseCardRender,
    Editor: ShowcaseCardEditor,
  },

  statCounter: {
    type: 'statCounter',
    label: 'Stat Counter / Metric',
    icon: Sparkles,
    description: 'Prominent counter card for 25K+ variants, 4.8★ ratings, or daily throughput metrics.',
    category: 'Commerce',
    defaultContent: () => ({
      type: 'statCounter',
      data: {
        value: '25,000+',
        label: 'Matrix Variants Built',
        detail: 'Multi-attribute luxury vanities & flat-file pipelines',
        trend: '+100% SLA Accuracy',
      },
    }),
    defaultSettings: () => ({ alignment: 'center', margin: { bottom: 16 } }),
    Render: ({ content, settings }: any) => (
      <div className={`p-4 rounded-2xl bg-white border-2 border-[#BCD5E6] shadow-xs text-center ${settings.customClass || ''}`}>
        <div className="font-urbanist font-extrabold text-3xl sm:text-4xl text-[#1E3A5F] tracking-tight">
          {content.value || '0'}
        </div>
        <div className="mt-1 font-bold text-xs text-[#0EA5E9] uppercase tracking-wider">
          {content.label || 'Metric Label'}
        </div>
        {content.detail && (
          <p className="mt-1 text-[11px] text-slate-500 font-medium">
            {content.detail}
          </p>
        )}
      </div>
    ),
    Editor: ({ content, onUpdateContent }: any) => (
      <div className="space-y-3 text-xs">
        <div>
          <label className="block font-bold text-[#1E3A5F] mb-1">Metric Value (e.g. 25K+, 4.8★)</label>
          <input
            type="text"
            value={content.value || ''}
            onChange={(e) => onUpdateContent({ ...content, value: e.target.value })}
            className="w-full px-3 py-1.5 rounded-lg border border-[#BCD5E6] bg-white text-[#1E3A5F] font-bold"
          />
        </div>
        <div>
          <label className="block font-bold text-[#1E3A5F] mb-1">Metric Label</label>
          <input
            type="text"
            value={content.label || ''}
            onChange={(e) => onUpdateContent({ ...content, label: e.target.value })}
            className="w-full px-3 py-1.5 rounded-lg border border-[#BCD5E6] bg-white text-[#1E3A5F]"
          />
        </div>
        <div>
          <label className="block font-bold text-[#1E3A5F] mb-1">Supporting Detail / Description</label>
          <input
            type="text"
            value={content.detail || ''}
            onChange={(e) => onUpdateContent({ ...content, detail: e.target.value })}
            className="w-full px-3 py-1.5 rounded-lg border border-[#BCD5E6] bg-white text-[#1E3A5F]"
          />
        </div>
      </div>
    ),
  },

  customHtml: {
    type: 'customHtml',
    label: 'Custom HTML / Shortcode',
    icon: Code2,
    description: 'Insert raw HTML, embed widgets, or external shortcodes.',
    category: 'Advanced',
    defaultContent: () => ({
      type: 'customHtml',
      data: {
        rawHtml: '<div class="p-4 rounded-xl bg-sky-50 border border-sky-200 text-sky-900 font-semibold text-xs text-center">⚡ Custom Embedded Shortcode Block</div>',
      },
    }),
    defaultSettings: () => ({ alignment: 'left', margin: { bottom: 12 } }),
    Render: CustomHtmlRender,
    Editor: CustomHtmlEditor,
  },

  statusBadge: {
    type: 'statusBadge',
    label: 'Status Badge',
    icon: CircleDot,
    description: 'Pulsing live availability status pill with custom text and indicator.',
    category: 'Typography',
    defaultContent: () => ({
      type: 'statusBadge',
      data: {
        text: '• Available for High-Growth DTC Brands & Multi-Channel Ops',
        statusDotColor: '#0EA5E9',
      },
    }),
    defaultSettings: () => ({ alignment: 'left', margin: { bottom: 12 } }),
    Render: StatusBadgeRender,
    Editor: StatusBadgeEditor,
  },

  profileOrbit: {
    type: 'profileOrbit',
    label: 'Profile Orbit & Brand Badges',
    icon: Radio,
    description: 'Animated morph portrait with orbiting partner/storefront badges.',
    category: 'Media',
    defaultContent: () => ({
      type: 'profileOrbit',
      data: {
        imageUrl: '',
        altText: 'Russell Taga-an',
        badges: [
          { name: 'Shopify Plus' },
          { name: 'TikTok Shop' },
          { name: 'Home Depot US' },
          { name: 'WooCommerce' },
          { name: 'Zendrop & CJ' },
          { name: 'Wayfair' },
        ],
      },
    }),
    defaultSettings: () => ({ alignment: 'center', margin: { bottom: 0 } }),
    Render: ProfileOrbitRender,
    Editor: ProfileOrbitEditor,
  },

  clientMarquee: {
    type: 'clientMarquee',
    label: 'Client Marquee / Tech Stack',
    icon: SlidersHorizontal,
    description: 'Continuously scrolling marquee of client platforms and tool logos.',
    category: 'Commerce',
    defaultContent: () => ({
      type: 'clientMarquee',
      data: {
        title: 'Enterprise Multi-Channel Ecosystem',
        logos: [
          { name: 'Klaviyo' },
          { name: 'Mailchimp' },
          { name: 'Amazon' },
          { name: 'Walmart' },
          { name: 'Faire' },
          { name: 'Omnisend' },
          { name: 'Etsy' },
          { name: 'Home Depot' },
          { name: 'Photoshop' },
          { name: 'Premiere Pro' },
          { name: 'DaVinci Resolve' },
          { name: 'Shopify' },
        ],
      },
    }),
    defaultSettings: () => ({ alignment: 'center', margin: { top: 12, bottom: 12 } }),
    Render: ClientMarqueeRender,
    Editor: ClientMarqueeEditor,
  },

  profileCard: {
    type: 'profileCard',
    label: 'Executive Profile Card',
    icon: User,
    description: 'Morphing portrait card with executive name, title, and ambient glow.',
    category: 'Media',
    defaultContent: () => ({
      type: 'profileCard',
      data: {
        imageUrl: '',
        name: 'Russell Taga-an',
        caption: 'Operations & Catalog Systems Architect',
      },
    }),
    defaultSettings: () => ({ alignment: 'center', margin: { bottom: 16 } }),
    Render: ProfileCardRender,
    Editor: ProfileCardEditor,
  },

  experienceTimeline: {
    type: 'experienceTimeline',
    label: 'Experience Timeline',
    icon: Award,
    description: 'Structured verified career milestones with metric badges and bullet points.',
    category: 'Commerce',
    defaultContent: () => ({
      type: 'experienceTimeline',
      data: {
        sectionTitle: 'Career History & Verified Impact',
        items: [
          {
            title: 'TikTok Shop Operations Specialist',
            company: 'Remote DTC Brand (Dietary Supplements & Health)',
            period: '2026 — Present',
            bullets: [
              'Oversee daily TikTok Shop backend operations in high-scrutiny supplement niches, guaranteeing full adherence to platform health claims, nutritional labeling formatting, and documentation guidelines for 100% listing approvals.',
              'Orchestrate FBT (Fulfilled by TikTok) inbound replenishment, monitor dispatch SLAs, and minimize order cancellation rates to maintain an elite 4.8 / 5.0 Shop Performance Score.',
              'Drive GMV velocity through automated flash sales, discount coupon logic, affiliate sample logistics, and chargeback/dispute resolution.',
            ],
          },
          {
            title: 'E-Commerce Specialist & Catalog Systems Lead',
            company: 'Willow Bath and Vanity Inc.',
            period: 'Feb 2022 — Apr 2026',
            bullets: [
              'Engineered and maintained complex multi-attribute catalogs exceeding 25,000+ variants (wood finishes, countertop cuts, custom hardware) across Shopify, WooCommerce, and Home Depot US.',
              'Architected bulk CSV ingestion templates, nested metafield mappings, and SEO tags, eradicating catalog inconsistencies across 3 retail channels.',
              'Directed batch Photoshop actions for thousands of luxury SKUs—producing pristine pure-white product cutouts, dimensional schematics, and web-compressed imagery.',
            ],
          },
          {
            title: 'Creative Media & Data Integrity Specialist',
            company: 'Independent Creative & GekkoMultimedia',
            period: '2019 — 2023',
            bullets: [
              'Edited cinematic commercial clips, UGC ads, and Reels using Premiere Pro and DaVinci Resolve with professional color grading and sound design.',
              'Audited, cleansed, and restructured 3,000+ fabric retailer listings and public databases using advanced spreadsheet automation and verification checklists.',
              'Managed multi-channel order processing, fulfillment pipelines, and non-voice client support during high-volume seasonal spikes.',
            ],
          },
        ],
      },
    }),
    defaultSettings: () => ({ alignment: 'left', margin: { bottom: 20 } }),
    Render: ExperienceTimelineRender,
    Editor: ExperienceTimelineEditor,
  },

  workShowcase: {
    type: 'workShowcase',
    label: 'Work Showcase & Filter Grid',
    icon: ShoppingBag,
    description: 'Interactive case studies with category filtering, metrics, and live store links.',
    category: 'Commerce',
    defaultContent: () => ({
      type: 'workShowcase',
      data: {
        headline: 'Featured Systems & Catalog Deployments',
        subhead: 'Real-world operational architecture and catalog scale',
        filters: ['All', 'Catalog Architecture', 'Marketplace Ops', 'Automation'],
        projects: [
          {
            title: 'Willow Bath and Vanity',
            client: 'Willow Bath and Vanity Inc.',
            category: 'Catalog Architecture',
            metrics: '25,000+ SKUs',
            description: 'Lead Catalog Specialist managing large-scale luxury bathroom vanities across Shopify, WooCommerce, and Home Depot.',
            tags: ['Shopify', 'Home Depot', 'Metafields', 'Variant Matrices'],
            imageUrl: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=800&q=80',
            url: 'https://willowbathandvanity.com/',
          },
          {
            title: 'DIYATIVE — 3D Mechanical Models',
            client: 'DIYATIVE DTC Store',
            category: 'Marketplace Ops',
            metrics: '4.8★ SPS Score',
            description: 'High-compliance TikTok Shop product catalog onboarding, FBT logistics setup, lifestyle media, and assembly guides.',
            tags: ['TikTok Shop', 'FBT Logistics', 'Disputes', 'SPS Health'],
            imageUrl: 'https://images.unsplash.com/photo-1513151233558-d860c5398176?auto=format&fit=crop&w=800&q=80',
            url: 'https://diyative.com/',
          },
          {
            title: 'Skin by Brownlee & Co.',
            client: 'Clinical Skincare DTC',
            category: 'Automation',
            metrics: '100% SLA Adherence',
            description: 'Automated inventory sync flat-files, multi-channel order processing, and high-scrutiny nutritional compliance.',
            tags: ['Shopify Plus', 'Automated Sync', 'Photoshop QA'],
            imageUrl: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=800&q=80',
            url: 'https://skinbybrownleeandco.com/',
          },
        ],
      },
    }),
    defaultSettings: () => ({ alignment: 'left', margin: { bottom: 24 } }),
    Render: WorkShowcaseRender,
    Editor: WorkShowcaseEditor,
  },
};
