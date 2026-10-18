import React, { useState, useEffect } from 'react';
import {
  ExternalLink,
  ChevronLeft,
  ChevronRight,
  ShoppingBag,
  Palette,
  Video,
  Layers,
  Zap,
  CheckCircle2,
  Image as ImageIcon,
  Sparkles,
  Maximize2,
  X,
  Globe,
  Filter,
  Check,
  LayoutGrid,
  Play,
  Hexagon,
  Camera,
} from 'lucide-react';
import { SERVICES } from '../data/portfolioData';
import { contentService } from '../cms/services/ContentServiceFactory';

interface WorkPageProps {
  onOpenHire: () => void;
}

export interface WorkImageItem {
  url: string;
  caption: string;
  tag?: string;
}

export interface WorkProject {
  id: string;
  title: string;
  subtitle: string;
  domainUrl: string;
  url?: string;
  category: 'wellness' | 'dtc' | 'catalog' | 'health' | 'apparel' | 'all';
  previewBadge: string;
  metrics: string;
  vitalsScore: string;
  description: string;
  highlights: string[];
  tags: string[];
  imageUrl: string;
  gallery?: WorkImageItem[];
}

export const WORK_PROJECTS: WorkProject[] = [
  {
    id: 'gold-and-grove',
    title: 'GOLD & GROVE',
    subtitle: 'INTERNAL BLEMISH BLEND & SKIN-CLEARING BOTANICAL VITAMIN SUPPLEMENTS.',
    domainUrl: 'goldandgrove.com',
    url: 'https://goldandgrove.com/',
    category: 'wellness',
    previewBadge: 'SKIN NUTRITION & WELLNESS',
    metrics: '+220% Subscription Retention',
    vitalsScore: '99/100 Core Vitals',
    description:
      'Re-engineered high-converting supplement subscription funnel with ingredient grounding and sub-600ms mobile PDPs.',
    highlights: [
      'Engineered custom Recharge recurring delivery portal with 1-click swap, delay, and bundle logic',
      'Built transparent nutritional fact drawers with verified clinical ingredient citations',
      'Reduced mobile checkout bounce rate by 34% through sticky slide-out cart drawer',
    ],
    tags: ['Shopify Plus', 'Recharge API', 'Tailwind CSS', '+1'],
    imageUrl:
      'https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=1400&q=85',
    gallery: [
      {
        url: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=1600&q=90',
        caption: 'Blemish Blend Serum & Botanical Vitamin Supplement Funnel',
        tag: 'Storefront Hero',
      },
      {
        url: 'https://images.unsplash.com/photo-1571781926291-c477ebfd024b?auto=format&fit=crop&w=1600&q=90',
        caption: 'Clinical Ingredient Grounding & Nutritional Disclosure PDP',
        tag: 'Product Detail',
      },
      {
        url: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=1600&q=90',
        caption: 'Automated Recharge Recurring Order Management Portal',
        tag: 'Subscription Flow',
      },
    ],
  },
  {
    id: 'premium-trends',
    title: 'PREMIUM TRENDS SHOP',
    subtitle: 'HIGH-VELOCITY CURATED TRENDING LIFESTYLE PRODUCTS & CONSUMER GOODS.',
    domainUrl: 'premiumtrendsshop.store',
    url: 'https://premiumtrendsshop.store/',
    category: 'dtc',
    previewBadge: 'CURATED TRENDS & DTC',
    metrics: '+195% Mobile Checkout Rate',
    vitalsScore: '98/100 Lighthouse',
    description:
      'Engineered an ultra-lean dynamic catalog with instant search, sticky mobile quick-buy, and real-time social proof tags.',
    highlights: [
      'Sub-second algorithmic search indexing across thousands of seasonal trending SKUs',
      'High-velocity checkout funnel optimized for TikTok & Instagram traffic surges',
      'Automated multi-warehouse order routing and real-time shipping SLA notifications',
    ],
    tags: ['Modern React', 'Instant Search', 'Stripe Payments', '+1'],
    imageUrl:
      'https://images.unsplash.com/photo-1513151233558-d860c5398176?auto=format&fit=crop&w=1400&q=85',
    gallery: [
      {
        url: 'https://images.unsplash.com/photo-1513151233558-d860c5398176?auto=format&fit=crop&w=1600&q=90',
        caption: 'Curated Consumer Goods Hero & Viral Lifestyle Launchpad',
        tag: 'Landing Hero',
      },
      {
        url: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1600&q=90',
        caption: 'High-Volume SKU Management & Real-Time Stock Feed',
        tag: 'Backend Sync',
      },
    ],
  },
  {
    id: 'rosemira-organics',
    title: 'ROSEMIRA ORGANICS',
    subtitle: 'HANDCRAFTED CERTIFIED ORGANIC & VEGAN SKINCARE RITUALS FOR SENSITIVE SKIN.',
    domainUrl: 'rosemira.com',
    url: 'https://rosemira.com/',
    category: 'wellness',
    previewBadge: 'DOCTOR-FORMULATED APOTHECARY',
    metrics: '+64% Average Order Value',
    vitalsScore: '100/100 Best Practices',
    description:
      'Crafted a serene, tactile botanical digital apothecary with skin regimen builders and organic certification seals.',
    highlights: [
      'Interactive holistic routine builder guiding customers to customized multi-step regimens',
      'Custom formulation transparency badges (USDA Organic, Leaping Bunny Cruelty-Free)',
      'Elevated average order value through dynamic gift-with-purchase progress tiers',
    ],
    tags: ['Shopify Storefront', 'TypeScript', 'Tailwind', '+1'],
    imageUrl:
      'https://images.unsplash.com/photo-1571781926291-c477ebfd024b?auto=format&fit=crop&w=1400&q=85',
    gallery: [
      {
        url: 'https://images.unsplash.com/photo-1571781926291-c477ebfd024b?auto=format&fit=crop&w=1600&q=90',
        caption: 'Tactile Botanical Apothecary & Regimen Consultation UI',
        tag: 'Apothecary UI',
      },
      {
        url: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=1600&q=90',
        caption: 'Organic Formulation Verification & Regimen Builder',
        tag: 'Quiz Funnel',
      },
    ],
  },
  {
    id: 'haoma-earth',
    title: 'HAOMA EARTH',
    subtitle: 'PLANT-BASED SPIRITUS VITAE™ SKINCARE HONORING THE WISDOM OF AGING.',
    domainUrl: 'haomaearth.com',
    url: 'https://haomaearth.com/',
    category: 'wellness',
    previewBadge: 'HOLISTIC LUXURY BOTANICALS',
    metrics: '+180% Conversion Rate',
    vitalsScore: '99/100 Vitals',
    description:
      'Transformed an editorial beauty sanctuary with smooth fluid layout animations, botanical hero showcases, and luxury minimalist aesthetic.',
    highlights: [
      'Editorial luxury visual pacing paired with frictionless headless checkout flows',
      'Subtle micro-animations and immersive full-bleed botanical ingredient storytelling',
      'Custom wholesale B2B portal integration for high-end spa and boutique stockists',
    ],
    tags: ['Headless Shopify', 'Motion', 'Tailwind CSS', '+1'],
    imageUrl:
      'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=1400&q=85',
    gallery: [
      {
        url: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=1600&q=90',
        caption: 'Editorial Luxury Botanical Experience & Fluid Layouts',
        tag: 'Brand Space',
      },
    ],
  },
  {
    id: 'juice-beauty',
    title: 'JUICE BEAUTY',
    subtitle: 'PIONEERING ORGANIC ANTIOXIDANT-RICH SKINCARE & CLEAN MAKEUP POWERHOUSE.',
    domainUrl: 'juicebeauty.com',
    url: 'https://juicebeauty.com/',
    category: 'wellness',
    previewBadge: 'ORGANIC CLINICAL SKINCARE',
    metrics: '+310% Page Speed Lift',
    vitalsScore: '98/100 Mobile Vitals',
    description:
      'Rebuilt heavy legacy enterprise storefront into a high-octane modern platform with clinical before/after sliders and shade finders.',
    highlights: [
      'Architected modular component library decoupling bloated legacy enterprise plugins',
      'Interactive clinical proof before-and-after image comparison sliders on key hero PDPs',
      'Intelligent clean makeup foundation shade-matching finder tool with 94% quiz completion',
    ],
    tags: ['Enterprise Commerce', 'Hydrogen', 'GraphQL', '+1'],
    imageUrl:
      'https://images.unsplash.com/photo-1556228722-d0b7194f4c80?auto=format&fit=crop&w=1400&q=85',
    gallery: [
      {
        url: 'https://images.unsplash.com/photo-1556228722-d0b7194f4c80?auto=format&fit=crop&w=1600&q=90',
        caption: 'Clinical Antioxidant Skincare & Fast Mobile Product Catalog',
        tag: 'Mobile PDP',
      },
    ],
  },
  {
    id: 'doctors-select',
    title: "DOCTOR'S SELECT",
    subtitle: 'USA-ENGINEERED MEDICAL GRADE COMPRESSION SOCKS & DIABETIC FOOT SUPPORT.',
    domainUrl: 'doctorselect.us',
    url: 'https://doctorselect.us/',
    category: 'health',
    previewBadge: 'MEDICAL & COMPRESSION WELLNESS',
    metrics: '+142% Multi-Pack Volume',
    vitalsScore: '100/100 Accessibility',
    description:
      'Engineered an accessible, high-contrast sizing calculator with automated multi-pack quantity bundle tiers.',
    highlights: [
      'WCAG AAA compliant high-contrast color palette and senior-friendly font scaling',
      'Interactive calf & shoe size calculator eliminating sizing return inquiries by 48%',
      'Automated 3-pack, 6-pack, and 12-pack quantity bundle tiers with dynamic volume discounts',
    ],
    tags: ['React', 'Accessible UI', 'Shopify Storefront', '+1'],
    imageUrl:
      'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=1400&q=85',
    gallery: [
      {
        url: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=1600&q=90',
        caption: 'Medical Compression Footwear & High-Contrast Sizing Calculator',
        tag: 'Sizing Tool',
      },
    ],
  },
  {
    id: 'willow-bath',
    title: 'WILLOW BATH AND VANITY',
    subtitle: 'LUXURY BATHROOM VANITIES & MULTI-CHANNEL STORE OPERATIONS.',
    domainUrl: 'willowbathandvanity.com',
    url: 'https://willowbathandvanity.com/',
    category: 'catalog',
    previewBadge: 'LUXURY BATHROOM CATALOG',
    metrics: '25,000+ Active SKUs',
    vitalsScore: '99/100 Core Vitals',
    description:
      'Lead Catalog Specialist managing 25,000+ variant matrices across Shopify, WooCommerce, and Home Depot US with automated inventory flat-files.',
    highlights: [
      'Engineered complex variant matrices (sizes 24" to 84", countertop finishes, hardware trims)',
      'Architected bulk CSV ingestion pipelines eradicating catalog drift across 3 retail channels',
      'Directed batch Photoshop actions producing pristine pure-white product cutouts',
    ],
    tags: ['Shopify Plus', 'Home Depot US', 'Photoshop Batch', 'Metafields', 'FBT Logistics'],
    imageUrl:
      'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=1400&q=85',
    gallery: [
      {
        url: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=1600&q=90',
        caption: 'Luxury Double Vanity & Modern Master Bathroom Suite Showroom',
        tag: 'Showroom Suite Proof',
      },
      {
        url: 'https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?auto=format&fit=crop&w=1600&q=90',
        caption: 'Freestanding Modern Vanity Detail & Brushed Brass Hardware Matrix',
        tag: 'Finish Matrix Proof',
      },
      {
        url: 'https://images.unsplash.com/photo-1507652313519-d4e9174996dd?auto=format&fit=crop&w=1600&q=90',
        caption: '25,000+ SKU Variant Matrix Architecture & Metafields Flat-File Schema',
        tag: 'Catalog Architecture Proof',
      },
      {
        url: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1600&q=90',
        caption: 'Home Depot US & Shopify Bulk Ingestion Inventory Pipeline',
        tag: 'Multi-Channel Inventory Proof',
      },
    ],
  },
  {
    id: 'diyative',
    title: 'DIYATIVE — 3D MODELS',
    subtitle: '3D MECHANICAL WOODEN KITS, TIKTOK SHOP ONBOARDING & FBT DISPATCH.',
    domainUrl: 'diyative.com',
    url: 'https://diyative.com/',
    category: 'dtc',
    previewBadge: 'TIKTOK SHOP & FBT LOGISTICS',
    metrics: '4.8★ SPS Score',
    vitalsScore: '98/100 FBT Health',
    description:
      'High-compliance TikTok Shop product catalog onboarding, FBT logistics setup, lifestyle media, and automated inventory sync flat-files.',
    highlights: [
      'Streamlined catalog onboarding and compliance documentation for 100% listing approvals',
      'Orchestrated FBT (Fulfilled by TikTok) inbound replenishment maintaining 4.8★ SPS score',
      'Resolved chargeback disputes and managed affiliate creator sample dispatch workflows',
    ],
    tags: ['TikTok Shop', 'FBT Logistics', 'Disputes', '+2'],
    imageUrl:
      'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=1400&q=85',
    gallery: [
      {
        url: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=1600&q=90',
        caption: 'Mechanical Wooden Kit Demonstrations & Assembly Guides',
        tag: 'TikTok Media',
      },
    ],
  },
  {
    id: 'naturezway',
    title: 'NATUREZWAY',
    subtitle: 'SUSTAINABLE BAMBOO CLEANING & ZERO-PLASTIC REFILL SYSTEMS.',
    domainUrl: 'naturezway.com',
    url: 'https://naturezway.com/',
    category: 'dtc',
    previewBadge: 'ECO-FRIENDLY HOME GOODS',
    metrics: '+88% Reorder Rate',
    vitalsScore: '99/100 Core Vitals',
    description:
      'Optimized multi-pack subscription bundling and eco-impact calculator reducing bounce rate on high-volume SKU landing pages.',
    highlights: [
      'Custom eco-savings dashboard calculating plastic bottles saved per recurring order',
      'Dynamic subscription bundle builder with flexible delivery cadence preferences',
      'Optimized product landing pages driving 22% conversion lift on paid search traffic',
    ],
    tags: ['Shopify Plus', 'Recharge', 'Subscription Logic', '+1'],
    imageUrl:
      'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&w=1400&q=85',
    gallery: [
      {
        url: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&w=1600&q=90',
        caption: 'Eco-Friendly Bamboo Paper & Cleaning Supply Refills',
        tag: 'DTC Refills',
      },
    ],
  },
  {
    id: 'coalition-la',
    title: 'COALITION LA',
    subtitle: 'TREND-FORWARD CRUELTY-FREE OUTERWEAR & CONTEMPORARY READY-TO-WEAR.',
    domainUrl: 'coalitionla.com',
    url: 'https://coalitionla.com/',
    category: 'apparel',
    previewBadge: 'VEGAN LEATHER APPAREL',
    metrics: '+175% Catalog Velocity',
    vitalsScore: '98/100 Lighthouse',
    description:
      'Architected fast-fashion matrix catalogs, real-time pre-order inventory logic, and high-res garment swatch selectors.',
    highlights: [
      'Configured nested colorway swatches and multi-angle product photography zooming',
      'Automated inventory restock notification flows in Klaviyo capturing high pre-order demand',
      'Bulk flat-file management for seasonal line releases across hundreds of style SKUs',
    ],
    tags: ['Shopify Plus', 'Variant Matrices', 'Klaviyo', '+1'],
    imageUrl:
      'https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=1400&q=85',
    gallery: [
      {
        url: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=1600&q=90',
        caption: 'Contemporary Outerwear Matrix & Colorway Swatch Hierarchy',
        tag: 'Apparel Matrix',
      },
    ],
  },
];

// =========================================================================
// BROWSER WINDOW WORK CARD COMPONENT
// =========================================================================
interface BrowserWorkCardProps {
  project: WorkProject;
  onOpenCaseStudy: (project: WorkProject) => void;
  onOpenGallery: (project: WorkProject, photoIndex?: number) => void;
}

const BrowserWorkCard: React.FC<BrowserWorkCardProps> = ({
  project,
  onOpenCaseStudy,
  onOpenGallery,
}) => {
  const allImages =
    project.gallery && project.gallery.length > 0
      ? project.gallery
      : [{ url: project.imageUrl, caption: project.title, tag: 'Proof Overview' }];
  const photoCount = allImages.length;
  const isMultiple = photoCount > 1;

  const [activeSlide, setActiveSlide] = useState(0);

  const handlePrevSlide = (e: React.MouseEvent) => {
    e.stopPropagation();
    setActiveSlide((prev) => (prev - 1 + photoCount) % photoCount);
  };

  const handleNextSlide = (e: React.MouseEvent) => {
    e.stopPropagation();
    setActiveSlide((prev) => (prev + 1) % photoCount);
  };

  const currentImage = allImages[activeSlide] || allImages[0];

  return (
    <article className="rounded-3xl bg-white border border-slate-200/90 shadow-xs hover:shadow-2xl transition-all duration-300 flex flex-col justify-between overflow-hidden group">
      <div>
        {/* macOS Browser Header Frame */}
        <div className="bg-white border-b border-slate-200 px-4 py-2.5 flex items-center justify-between text-[11px] select-none">
          {/* Left Traffic Light Dots */}
          <div className="flex items-center gap-1.5 shrink-0">
            <span className="w-2.5 h-2.5 rounded-full bg-[#EF4444] border border-red-600/20" />
            <span className="w-2.5 h-2.5 rounded-full bg-[#F59E0B] border border-amber-600/20" />
            <span className="w-2.5 h-2.5 rounded-full bg-[#10B981] border border-emerald-600/20" />
          </div>

          {/* Center URL Bar */}
          <div className="px-3 py-0.5 rounded-full bg-slate-50 border border-slate-200/90 text-[10.5px] font-mono text-slate-600 flex items-center gap-1.5 shadow-2xs truncate max-w-[55%]">
            <Hexagon className="w-3 h-3 text-slate-400 shrink-0" />
            <span className="truncate">{project.domainUrl}</span>
          </div>

          {/* Right Core Vitals / Score */}
          <div className="text-[10px] font-mono font-medium text-slate-500 shrink-0 text-right">
            {project.vitalsScore}
          </div>
        </div>

        {/* Viewport / Mockup Preview Area with Slideshow */}
        <div
          onClick={() => onOpenGallery(project, activeSlide)}
          className="relative aspect-[16/10] w-full overflow-hidden bg-slate-900 select-none cursor-pointer group/slide"
          title={isMultiple ? `Slide ${activeSlide + 1} of ${photoCount} • Click to open full gallery` : "Click to view proof photo"}
        >
          <img
            key={currentImage.url}
            src={currentImage.url}
            alt={currentImage.caption || project.title}
            className="w-full h-full object-cover object-top transition-all duration-500 animate-fade-in group-hover/slide:scale-103"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/25 pointer-events-none" />

          {/* Floating Category Pill (Top-Left) */}
          <div className="absolute top-3 left-3 pointer-events-auto">
            <span className="inline-flex items-center px-2.5 py-1 rounded-full bg-white text-slate-900 text-[9.5px] font-black uppercase tracking-wider border border-slate-200/90 shadow-sm">
              {project.previewBadge}
            </span>
          </div>

          {/* Floating Metric Pill (Top-Right) */}
          <div className="absolute top-3 right-3 pointer-events-auto">
            <span className="inline-flex items-center px-2.5 py-1 rounded-full bg-[#134E2E] text-[#4ADE80] text-[9.5px] font-bold border border-[#166534] shadow-sm tracking-tight">
              {project.metrics}
            </span>
          </div>

          {/* SLIDESHOW CONTROLS (Only when multiple photos exist) */}
          {isMultiple && (
            <>
              {/* Prev Button */}
              <button
                type="button"
                onClick={handlePrevSlide}
                aria-label="Previous slide"
                className="absolute left-2.5 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-black/60 hover:bg-black/90 text-white flex items-center justify-center backdrop-blur-xs transition-all opacity-80 sm:opacity-0 group-hover/slide:opacity-100 hover:scale-110 shadow-lg border border-white/20 z-10 cursor-pointer"
              >
                <ChevronLeft className="w-4 h-4 text-white" />
              </button>

              {/* Next Button */}
              <button
                type="button"
                onClick={handleNextSlide}
                aria-label="Next slide"
                className="absolute right-2.5 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-black/60 hover:bg-black/90 text-white flex items-center justify-center backdrop-blur-xs transition-all opacity-80 sm:opacity-0 group-hover/slide:opacity-100 hover:scale-110 shadow-lg border border-white/20 z-10 cursor-pointer"
              >
                <ChevronRight className="w-4 h-4 text-white" />
              </button>

              {/* Bottom Slideshow Navigation Strip */}
              <div className="absolute bottom-2.5 left-3 right-3 flex items-center justify-between gap-2 pointer-events-auto z-10">
                {/* Dots indicator */}
                <div className="flex items-center gap-1.5 p-1 rounded-full bg-black/60 backdrop-blur-xs border border-white/10">
                  {allImages.map((_, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        setActiveSlide(idx);
                      }}
                      className={`h-1.5 rounded-full transition-all cursor-pointer ${
                        activeSlide === idx
                          ? 'w-5 bg-[#38BDF8]'
                          : 'w-1.5 bg-white/50 hover:bg-white/80'
                      }`}
                      title={`Jump to photo ${idx + 1}`}
                    />
                  ))}
                </div>

                {/* Counter Pill */}
                <span className="px-2.5 py-0.5 rounded-full bg-black/60 backdrop-blur-xs text-white text-[10px] font-mono border border-white/15">
                  {activeSlide + 1} / {photoCount}
                </span>
              </div>
            </>
          )}
        </div>

        {/* Card Body Information */}
        <div className="p-5 sm:p-6 space-y-2">
          <h3 className="font-urbanist font-black text-lg text-slate-900 uppercase tracking-tight leading-snug">
            {project.title}
          </h3>

          <div className="font-bold text-[10.5px] uppercase tracking-wider text-slate-800 leading-tight">
            {project.subtitle}
          </div>

          <p className="text-xs text-slate-500 leading-relaxed font-normal pt-1">
            {project.description}
          </p>

          {/* Technology Badges */}
          <div className="flex flex-wrap items-center gap-1.5 pt-3">
            {project.tags.map((tag, tIdx) => (
              <span
                key={tIdx}
                className="px-2.5 py-0.5 rounded-lg bg-slate-100 text-slate-600 text-[10.5px] font-semibold border border-slate-200"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Card Action Buttons (Footer) */}
      <div className="px-5 sm:px-6 pb-5 pt-1 flex items-center gap-2">
        <button
          type="button"
          onClick={() => onOpenCaseStudy(project)}
          className="flex-1 py-2.5 rounded-xl bg-[#143020] hover:bg-[#1E442D] text-white font-extrabold text-[11px] tracking-wider uppercase flex items-center justify-center transition-all cursor-pointer shadow-xs"
        >
          Case Study
        </button>

        <button
          type="button"
          onClick={() => onOpenGallery(project, 0)}
          className="px-3.5 py-2.5 rounded-xl border border-slate-200 hover:border-slate-300 hover:bg-slate-50 text-slate-700 font-extrabold text-[11px] tracking-wider uppercase flex items-center gap-1.5 transition-all cursor-pointer shadow-2xs"
          title="View Proof of Work Images"
        >
          <ImageIcon className="w-3.5 h-3.5 text-[#0EA5E9]" />
          <span>Gallery ({photoCount})</span>
        </button>

        {project.url ? (
          <a
            href={project.url}
            target="_blank"
            rel="noopener noreferrer"
            className="w-10 h-10 rounded-xl border border-slate-200 hover:border-slate-300 hover:bg-slate-50 flex items-center justify-center text-slate-600 hover:text-slate-900 transition-all cursor-pointer shrink-0"
            title="Open Live Storefront"
          >
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        ) : (
          <button
            type="button"
            onClick={() => onOpenCaseStudy(project)}
            className="w-10 h-10 rounded-xl border border-slate-200 hover:border-slate-300 hover:bg-slate-50 flex items-center justify-center text-slate-600 hover:text-slate-900 transition-all cursor-pointer shrink-0"
          >
            <ExternalLink className="w-3.5 h-3.5" />
          </button>
        )}
      </div>
    </article>
  );
};

// =========================================================================
// MAIN WORK PAGE COMPONENT
// =========================================================================
export const WorkPage: React.FC<WorkPageProps> = ({ onOpenHire }) => {
  const [projectsList, setProjectsList] = useState<WorkProject[]>(WORK_PROJECTS);
  const [activeFilter, setActiveFilter] = useState<string>('all');
  const [isFilterDropdownOpen, setIsFilterDropdownOpen] = useState(false);
  const [activeCaseStudy, setActiveCaseStudy] = useState<WorkProject | null>(null);
  const [activeProofProject, setActiveProofProject] = useState<WorkProject | null>(null);
  const [activeProofIndex, setActiveProofIndex] = useState<number>(0);
  const [lightboxImage, setLightboxImage] = useState<string | null>(null);

  // Sync with published CMS projects from localStorage/Firestore
  useEffect(() => {
    const loadPublishedWork = async () => {
      try {
        const page = await contentService.getPageBySlug('work');
        if (page && page.sections) {
          for (const row of page.sections) {
            for (const col of row.columns) {
              for (const el of col.elements) {
                if (el.type === 'workShowcase' && (el.content?.data as any)?.projects?.length > 0) {
                  const mapped: WorkProject[] = (el.content.data as any).projects.map((p: any) => {
                    const rawGallery = p.galleryImages || p.gallery || [];
                    const formattedGallery: WorkImageItem[] =
                      rawGallery.length > 0
                        ? rawGallery.map((g: any) => ({
                            url: g.url,
                            caption: g.caption || `${p.title} Proof of Work`,
                            tag: g.altText || g.tag || 'Proof Verification',
                          }))
                        : [
                            {
                              url: p.imageUrl,
                              caption: `${p.title} Primary Architecture Overview`,
                              tag: 'Storefront Overview',
                            },
                          ];

                    return {
                      id: p.id || `proj_${Math.random()}`,
                      title: p.title || 'Untitled Project',
                      subtitle: p.subtitle || p.client || '',
                      domainUrl:
                        p.domainUrl ||
                        (p.url ? p.url.replace(/^https?:\/\//, '').replace(/\/$/, '') : 'mystore.com'),
                      url: p.url || '',
                      category: (p.category?.toLowerCase() || 'all') as any,
                      previewBadge: p.previewBadge || p.category || 'CASE STUDY',
                      metrics: p.metrics || '+150% Velocity',
                      vitalsScore: p.vitalsScore || '99/100 Core Vitals',
                      description: p.description || '',
                      highlights: p.highlights || [],
                      tags: p.tags || ['Shopify Plus'],
                      imageUrl:
                        p.imageUrl ||
                        'https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=1200&q=85',
                      gallery: formattedGallery,
                    };
                  });
                  setProjectsList(mapped);
                  return;
                }
              }
            }
          }
        }
      } catch (e) {
        // Fallback to initial WORK_PROJECTS
      }
    };
    loadPublishedWork();
  }, []);

  // Keyboard navigation for Proof of Work Gallery modal
  useEffect(() => {
    if (!activeProofProject) return;
    const images =
      activeProofProject.gallery && activeProofProject.gallery.length > 0
        ? activeProofProject.gallery
        : [{ url: activeProofProject.imageUrl, caption: activeProofProject.title, tag: 'Overview' }];

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setActiveProofProject(null);
      } else if (e.key === 'ArrowRight') {
        setActiveProofIndex((prev) => (prev + 1) % images.length);
      } else if (e.key === 'ArrowLeft') {
        setActiveProofIndex((prev) => (prev - 1 + images.length) % images.length);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeProofProject]);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (!(e.target as HTMLElement).closest('#filter-dropdown-container')) {
        setIsFilterDropdownOpen(false);
      }
    };
    window.addEventListener('click', handleClickOutside);
    return () => window.removeEventListener('click', handleClickOutside);
  }, []);

  const filterOptions = [
    { id: 'all', label: `All Projects (${projectsList.length})` },
    { id: 'wellness', label: 'Skin Nutrition & Wellness' },
    { id: 'dtc', label: 'Curated Trends & DTC' },
    { id: 'catalog', label: 'Luxury Catalog Architecture' },
    { id: 'health', label: 'Medical & Compression Health' },
    { id: 'apparel', label: 'Contemporary Apparel' },
  ];

  const filteredProjects = projectsList.filter((proj) => {
    if (activeFilter === 'all') return true;
    return (
      proj.category === activeFilter ||
      proj.category?.toLowerCase().includes(activeFilter.toLowerCase()) ||
      proj.previewBadge?.toLowerCase().includes(activeFilter.toLowerCase())
    );
  });

  return (
    <div
      id="work-page"
      className="w-full max-w-[1700px] mx-auto px-4 sm:px-8 lg:px-12 py-6 sm:py-8 flex-1 flex flex-col justify-start animate-fade-up font-inter text-[#1E3A5F]"
      style={{
        animationDuration: '0.4s',
        animationTimingFunction: 'cubic-bezier(0.22, 1, 0.36, 1)',
      }}
    >
      {/* Subtitle Bar as shown in Reference Screenshot */}
      <div className="w-full text-center text-xs sm:text-sm text-slate-500 font-medium mb-3">
        Engineered for speed, catalog scalability, ergonomics, and verified conversion lift.
      </div>

      {/* Top Filter and View Mode Header */}
      <section className="w-full bg-white rounded-2xl border border-slate-200/90 shadow-xs px-4 py-3 flex flex-wrap items-center justify-between gap-3 mb-8">
        {/* Left Side: Filter Buttons */}
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setActiveFilter('all')}
            className={`px-4 py-2 rounded-xl text-xs font-black tracking-wider uppercase transition-all cursor-pointer ${
              activeFilter === 'all'
                ? 'bg-[#143020] text-white shadow-xs'
                : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
            }`}
          >
            All Projects ({projectsList.length})
          </button>

          {/* Filter Dropdown */}
          <div id="filter-dropdown-container" className="relative">
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                setIsFilterDropdownOpen(!isFilterDropdownOpen);
              }}
              className="px-3.5 py-2 rounded-xl border border-slate-200 hover:border-slate-300 bg-white hover:bg-slate-50 text-slate-700 font-bold text-xs flex items-center gap-1.5 transition-all cursor-pointer shadow-2xs"
            >
              <Filter className="w-3.5 h-3.5 text-slate-400" />
              <span>
                {activeFilter === 'all'
                  ? 'Filter Projects'
                  : filterOptions.find((f) => f.id === activeFilter)?.label || 'Filter'}
              </span>
              <span className="text-[10px] text-slate-400">▼</span>
            </button>

            {isFilterDropdownOpen && (
              <div className="absolute top-full left-0 mt-2 w-64 bg-white rounded-2xl shadow-xl border border-slate-200 py-2 z-30 animate-fade-in text-xs">
                {filterOptions.map((opt) => (
                  <button
                    key={opt.id}
                    type="button"
                    onClick={() => {
                      setActiveFilter(opt.id);
                      setIsFilterDropdownOpen(false);
                    }}
                    className={`w-full px-4 py-2.5 text-left font-medium flex items-center justify-between hover:bg-slate-50 transition-colors cursor-pointer ${
                      activeFilter === opt.id ? 'text-[#143020] font-bold bg-slate-50/80' : 'text-slate-600'
                    }`}
                  >
                    <span>{opt.label}</span>
                    {activeFilter === opt.id && <Check className="w-3.5 h-3.5 text-[#143020]" />}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Right Side: Clean Grid Info / Status (No Carousel) */}
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-100 border border-slate-200 text-[#143020] font-bold text-[11px]">
            <LayoutGrid className="w-3.5 h-3.5 text-[#10B981]" />
            <span>Grid View ({filteredProjects.length} Deployments)</span>
          </div>
        </div>
      </section>

      {/* Grid of Browser Window Cards (Sample Work Cards) */}
      <section id="work-grid" className="w-full">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7 items-stretch">
          {filteredProjects.map((project) => (
            <BrowserWorkCard
              key={project.id}
              project={project}
              onOpenCaseStudy={(p) => setActiveCaseStudy(p)}
              onOpenGallery={(p, initialIdx) => {
                setActiveProofProject(p);
                setActiveProofIndex(initialIdx || 0);
              }}
            />
          ))}
        </div>
      </section>

      {/* Detailed Case Study Modal */}
      {activeCaseStudy && (
        <div
          className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 animate-fade-in"
          onClick={() => setActiveCaseStudy(null)}
        >
          <div
            className="relative max-w-4xl max-h-[90vh] w-full bg-white rounded-3xl shadow-2xl border border-slate-200 flex flex-col overflow-hidden text-[#1E3A5F]"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="px-6 py-4 bg-slate-50 border-b border-slate-200 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="flex items-center gap-1.5 shrink-0">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#EF4444]" />
                  <span className="w-2.5 h-2.5 rounded-full bg-[#F59E0B]" />
                  <span className="w-2.5 h-2.5 rounded-full bg-[#10B981]" />
                </div>
                <div className="px-3 py-0.5 rounded-full bg-white border border-slate-200 font-mono text-xs text-slate-700 font-medium">
                  {activeCaseStudy.domainUrl}
                </div>
              </div>

              <button
                type="button"
                onClick={() => setActiveCaseStudy(null)}
                className="p-1.5 rounded-xl hover:bg-slate-200 text-slate-400 hover:text-slate-700 transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Scrollable Content */}
            <div className="p-6 overflow-y-auto space-y-6">
              {/* Top Banner Mockup */}
              <div className="rounded-2xl overflow-hidden aspect-[16/9] w-full bg-slate-900 border border-slate-200 relative shadow-sm">
                <img
                  src={activeCaseStudy.imageUrl}
                  alt={activeCaseStudy.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-4 left-4">
                  <span className="px-3 py-1 rounded-full bg-white text-slate-900 text-xs font-black uppercase tracking-wider shadow-md">
                    {activeCaseStudy.previewBadge}
                  </span>
                </div>
                <div className="absolute top-4 right-4">
                  <span className="px-3 py-1 rounded-full bg-[#134E2E] text-[#4ADE80] text-xs font-bold shadow-md">
                    {activeCaseStudy.metrics}
                  </span>
                </div>
              </div>

              {/* Title & Core Subheadline */}
              <div>
                <h2 className="font-urbanist font-black text-2xl text-slate-900 uppercase tracking-tight">
                  {activeCaseStudy.title}
                </h2>
                <p className="font-bold text-xs uppercase tracking-wider text-slate-800 mt-1">
                  {activeCaseStudy.subtitle}
                </p>
                <p className="text-sm text-slate-600 leading-relaxed mt-3">
                  {activeCaseStudy.description}
                </p>
              </div>

              {/* Verified Deliverables */}
              <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
                <h4 className="font-urbanist font-bold text-xs uppercase tracking-wider text-[#143020]">
                  Verified Architecture Deliverables
                </h4>
                <ul className="space-y-2">
                  {activeCaseStudy.highlights.map((h, hIdx) => (
                    <li key={hIdx} className="flex items-start gap-2.5 text-xs text-slate-700 font-medium leading-relaxed">
                      <CheckCircle2 className="w-4 h-4 text-[#10B981] shrink-0 mt-0.5" />
                      <span>{h}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Platform & Tooling Tags */}
              <div>
                <div className="text-[11px] font-extrabold uppercase tracking-wider text-slate-400 mb-2">
                  Technical Stack & Tooling
                </div>
                <div className="flex flex-wrap gap-2">
                  {activeCaseStudy.tags.map((tag, tIdx) => (
                    <span
                      key={tIdx}
                      className="px-3 py-1 rounded-lg bg-slate-100 text-slate-700 text-xs font-semibold border border-slate-200"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Gallery Photos if available */}
              {activeCaseStudy.gallery && activeCaseStudy.gallery.length > 0 && (
                <div className="space-y-3 pt-2 border-t border-slate-200">
                  <div className="text-[11px] font-extrabold uppercase tracking-wider text-slate-400">
                    Additional Storefront Screen Captures
                  </div>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                    {activeCaseStudy.gallery.map((g, gIdx) => (
                      <div
                        key={gIdx}
                        onClick={() => setLightboxImage(g.url)}
                        className="rounded-xl overflow-hidden aspect-video bg-slate-100 border border-slate-200 cursor-pointer hover:opacity-90 transition-opacity"
                      >
                        <img src={g.url} alt={g.caption} className="w-full h-full object-cover" />
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Modal Footer Actions */}
            <div className="px-6 py-4 bg-slate-50 border-t border-slate-200 flex items-center justify-between gap-3">
              <button
                type="button"
                onClick={() => setActiveCaseStudy(null)}
                className="px-4 py-2.5 rounded-xl border border-slate-300 hover:bg-slate-100 text-xs font-bold text-slate-600 transition-colors cursor-pointer"
              >
                Close
              </button>

              <div className="flex items-center gap-2">
                {activeCaseStudy.url && (
                  <a
                    href={activeCaseStudy.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-2.5 rounded-xl border border-slate-300 hover:bg-slate-100 text-xs font-bold text-slate-700 flex items-center gap-1.5 transition-colors"
                  >
                    <span>Visit Live Store</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                )}
                <button
                  type="button"
                  onClick={() => {
                    setActiveCaseStudy(null);
                    onOpenHire();
                  }}
                  className="px-5 py-2.5 rounded-xl bg-[#143020] hover:bg-[#1E442D] text-white font-extrabold text-xs flex items-center gap-1.5 transition-all cursor-pointer shadow-xs"
                >
                  <Sparkles className="w-3.5 h-3.5 text-[#4ADE80]" />
                  <span>Request Similar Architecture</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Proof of Work Multi-Photo Gallery Modal */}
      {activeProofProject && (() => {
        const images =
          activeProofProject.gallery && activeProofProject.gallery.length > 0
            ? activeProofProject.gallery
            : [
                {
                  url: activeProofProject.imageUrl,
                  caption: activeProofProject.title,
                  tag: 'Storefront Overview',
                },
              ];
        const currentPhoto = images[activeProofIndex] || images[0];

        return (
          <div
            className="fixed inset-0 z-55 bg-black/90 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 animate-fade-in"
            onClick={() => setActiveProofProject(null)}
          >
            <div
              className="relative max-w-5xl w-full bg-[#0F172A] border border-slate-700/80 rounded-3xl shadow-2xl flex flex-col overflow-hidden text-white"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Gallery Header */}
              <div className="px-5 py-3.5 bg-slate-900/90 border-b border-slate-800 flex items-center justify-between gap-3">
                <div className="flex items-center gap-3 min-w-0">
                  <div className="flex items-center gap-1.5 shrink-0">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#EF4444]" />
                    <span className="w-2.5 h-2.5 rounded-full bg-[#F59E0B]" />
                    <span className="w-2.5 h-2.5 rounded-full bg-[#10B981]" />
                  </div>
                  <div className="min-w-0">
                    <div className="flex items-center gap-2">
                      <h3 className="font-urbanist font-black text-sm text-white uppercase tracking-tight truncate">
                        {activeProofProject.title}
                      </h3>
                      <span className="px-2 py-0.5 rounded-full bg-emerald-950/80 border border-emerald-500/40 text-emerald-400 text-[10px] font-bold">
                        Proof of Work Gallery
                      </span>
                    </div>
                    <p className="text-[10.5px] text-slate-400 truncate">
                      {activeProofProject.subtitle || activeProofProject.domainUrl}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <span className="px-3 py-1 rounded-full bg-white/10 font-mono text-[11px] font-bold text-sky-300">
                    Photo {activeProofIndex + 1} of {images.length}
                  </span>
                  <button
                    type="button"
                    onClick={() => setActiveProofProject(null)}
                    className="p-1.5 rounded-xl hover:bg-white/10 text-slate-400 hover:text-white transition-colors cursor-pointer"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {/* Main Photo Stage */}
              <div className="relative aspect-[16/10] sm:aspect-[16/9] max-h-[62vh] w-full bg-black flex items-center justify-center overflow-hidden select-none">
                <img
                  src={currentPhoto.url}
                  alt={currentPhoto.caption}
                  className="max-w-full max-h-full object-contain"
                />

                {/* Left / Right Nav Arrows */}
                {images.length > 1 && (
                  <>
                    <button
                      type="button"
                      onClick={() =>
                        setActiveProofIndex(
                          (prev) => (prev - 1 + images.length) % images.length
                        )
                      }
                      className="absolute left-3 top-1/2 -translate-y-1/2 p-2.5 rounded-full bg-black/60 hover:bg-black/90 text-white border border-white/20 transition-all hover:scale-110 cursor-pointer shadow-lg"
                      title="Previous proof photo (Left arrow)"
                    >
                      <ChevronLeft className="w-5 h-5" />
                    </button>
                    <button
                      type="button"
                      onClick={() =>
                        setActiveProofIndex((prev) => (prev + 1) % images.length)
                      }
                      className="absolute right-3 top-1/2 -translate-y-1/2 p-2.5 rounded-full bg-black/60 hover:bg-black/90 text-white border border-white/20 transition-all hover:scale-110 cursor-pointer shadow-lg"
                      title="Next proof photo (Right arrow)"
                    >
                      <ChevronRight className="w-5 h-5" />
                    </button>
                  </>
                )}

                {/* Bottom Caption Overlay */}
                <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/90 via-black/60 to-transparent p-4 sm:p-5 flex flex-col sm:flex-row sm:items-end justify-between gap-2">
                  <div className="space-y-1 max-w-2xl">
                    {currentPhoto.tag && (
                      <span className="inline-block px-2.5 py-0.5 rounded-md bg-[#10B981] text-black font-extrabold text-[10px] uppercase tracking-wider">
                        {currentPhoto.tag}
                      </span>
                    )}
                    <p className="text-xs sm:text-sm font-medium text-slate-200 drop-shadow-md">
                      {currentPhoto.caption}
                    </p>
                  </div>

                  <button
                    type="button"
                    onClick={() => setLightboxImage(currentPhoto.url)}
                    className="self-start sm:self-auto px-3 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 border border-white/20 text-xs font-bold text-white flex items-center gap-1.5 transition-all cursor-pointer"
                  >
                    <Maximize2 className="w-3.5 h-3.5 text-sky-400" />
                    <span>Zoom Fullscreen</span>
                  </button>
                </div>
              </div>

              {/* Thumbnail Strip */}
              {images.length > 1 && (
                <div className="p-3 bg-slate-950/80 border-t border-slate-800 flex items-center gap-2.5 overflow-x-auto">
                  {images.map((img, iIdx) => (
                    <button
                      key={iIdx}
                      type="button"
                      onClick={() => setActiveProofIndex(iIdx)}
                      className={`relative w-20 h-14 rounded-xl overflow-hidden shrink-0 border-2 transition-all cursor-pointer ${
                        activeProofIndex === iIdx
                          ? 'border-[#10B981] ring-2 ring-[#10B981]/50 scale-105'
                          : 'border-slate-700 opacity-60 hover:opacity-100'
                      }`}
                    >
                      <img
                        src={img.url}
                        alt={img.caption}
                        className="w-full h-full object-cover"
                      />
                      <span className="absolute bottom-0.5 right-1 text-[8.5px] font-mono font-bold text-white bg-black/70 px-1 rounded">
                        #{iIdx + 1}
                      </span>
                    </button>
                  ))}
                </div>
              )}

              {/* Gallery Footer Bar */}
              <div className="px-5 py-3 bg-slate-900 border-t border-slate-800 flex items-center justify-between gap-3 text-xs">
                <button
                  type="button"
                  onClick={() => {
                    const target = activeProofProject;
                    setActiveProofProject(null);
                    setActiveCaseStudy(target);
                  }}
                  className="px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold transition-colors cursor-pointer"
                >
                  View Full Case Study
                </button>

                <div className="flex items-center gap-2">
                  {activeProofProject.url && (
                    <a
                      href={activeProofProject.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold flex items-center gap-1.5 transition-colors"
                    >
                      <span>Visit Live Storefront</span>
                      <ExternalLink className="w-3.5 h-3.5 text-sky-400" />
                    </a>
                  )}
                  <button
                    type="button"
                    onClick={() => {
                      setActiveProofProject(null);
                      onOpenHire();
                    }}
                    className="px-4 py-2 rounded-xl bg-[#10B981] hover:bg-[#059669] text-black font-extrabold flex items-center gap-1.5 transition-all cursor-pointer"
                  >
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>Inquire Architecture</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        );
      })()}

      {/* Lightbox for Gallery Photos */}
      {lightboxImage && (
        <div
          className="fixed inset-0 z-60 bg-black/90 backdrop-blur-md flex items-center justify-center p-4 animate-fade-in"
          onClick={() => setLightboxImage(null)}
        >
          <div className="relative max-w-5xl max-h-[85vh] w-full flex items-center justify-center">
            <button
              type="button"
              onClick={() => setLightboxImage(null)}
              className="absolute -top-12 right-0 p-2 text-white hover:text-slate-300 cursor-pointer"
            >
              <X className="w-6 h-6" />
            </button>
            <img
              src={lightboxImage}
              alt="Enlarged Storefront"
              className="max-w-full max-h-[80vh] object-contain rounded-2xl shadow-2xl border border-white/20"
            />
          </div>
        </div>
      )}

      {/* Core Operations & Services Matrix Summary */}
      <section id="work-services" className="w-full pt-10 mt-8 border-t border-slate-200">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="font-urbanist font-extrabold text-base sm:text-lg text-[#1E3A5F] flex items-center gap-2">
              <Zap className="w-4 h-4 text-[#0EA5E9]" />
              <span>Core Operations & Services Matrix</span>
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Enterprise catalog architecture, automated inventory synchronization, and store operations.
            </p>
          </div>
          <span className="text-xs font-bold text-[#2D5D86] px-3 py-1 rounded-full bg-[#EFF6FB] border border-[#BCD5E6]">
            4+ Years Proven Experience
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {SERVICES.map((s, idx) => (
            <div
              key={idx}
              className="p-4 rounded-2xl bg-white border border-slate-200 shadow-xs flex flex-col justify-between space-y-3"
            >
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-lg bg-slate-100 border border-slate-200 flex items-center justify-center shrink-0">
                    <ShoppingBag className="w-3.5 h-3.5 text-[#143020]" />
                  </div>
                  <h3 className="font-urbanist font-bold text-xs sm:text-sm text-slate-800 leading-tight">
                    {s.title}
                  </h3>
                </div>
                <p className="text-xs text-slate-500 leading-relaxed font-normal">
                  {s.description}
                </p>
              </div>

              <div className="flex flex-wrap gap-1.5 pt-2 border-t border-slate-100">
                {s.tags.slice(0, 3).map((t) => (
                  <span
                    key={t}
                    className="px-2 py-0.5 rounded-md text-[10px] font-bold bg-slate-50 border border-slate-200 text-slate-600"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};
