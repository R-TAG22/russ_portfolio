import React, { useState } from 'react';
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
  FileText,
  Headphones,
  Maximize2,
  X,
  Globe,
} from 'lucide-react';
import { SERVICES } from '../data/portfolioData';

interface WorkPageProps {
  onOpenHire: () => void;
}

export type WorkCategory = 'all' | 'ecommerce' | 'graphic' | 'video';

export interface WorkImageItem {
  url: string;
  caption: string;
  tag?: string;
}

export interface WorkSample {
  id: string;
  category: 'ecommerce' | 'graphic' | 'video';
  categoryLabel: string;
  title: string;
  client: string;
  url?: string;
  metrics: string;
  description: string;
  highlights: string[];
  tags: string[];
  previewType: 'website' | 'graphic' | 'video';
  previewBadge: string;
  images: WorkImageItem[];
}

export const WORK_SAMPLES: WorkSample[] = [
  {
    id: 'willow-bath',
    category: 'ecommerce',
    categoryLabel: 'E-commerce Store',
    title: 'Willow Bath and Vanity',
    client: 'Willow Bath and Vanity Inc.',
    url: 'https://willowbathandvanity.com/',
    metrics: '3,000+ SKUs & Multi-Channel Uploads',
    description:
      'Lead Catalog Specialist managing large-scale luxury bathroom vanities across Shopify, WooCommerce, and Home Depot.',
    highlights: [
      'Complex variant matrices (sizes, counter finishes, hardware)',
      'Metafields implementation & technical specifications',
      'Batch image retouching and clean white-background clipping in Photoshop',
    ],
    tags: ['Shopify', 'WooCommerce', 'Home Depot', 'Metafields'],
    previewType: 'website',
    previewBadge: 'Luxury Bathroom Catalog',
    images: [
      {
        url: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=1600&q=90',
        caption: 'Luxury Double Vanity & Modern Bathroom Suite Showroom',
        tag: 'Hero Showcase',
      },
      {
        url: 'https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?auto=format&fit=crop&w=1600&q=90',
        caption: 'Freestanding Modern Vanity Detail & Matte Hardware Finish',
        tag: 'Product Detail',
      },
      {
        url: 'https://images.unsplash.com/photo-1620626011761-996317b8d101?auto=format&fit=crop&w=1600&q=90',
        caption: 'Quartz Countertop & Undermount Ceramic Basin Matrix',
        tag: 'Material Finish',
      },
      {
        url: 'https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=1600&q=90',
        caption: 'Minimalist Architectural Vanity & LED Backlit Mirror Collection',
        tag: 'Catalog Collection',
      },
      {
        url: 'https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?auto=format&fit=crop&w=1600&q=90',
        caption: 'Contemporary Master Bath Suite & Oak Vanity Arrangement',
        tag: 'Store Interior',
      },
    ],
  },
  {
    id: 'sultans-fabrics',
    category: 'ecommerce',
    categoryLabel: 'E-commerce Store',
    title: "Sultan's Fine Fabrics",
    client: "Sultan's Fine Fabrics",
    url: 'https://www.sultansfinefabrics.com/',
    metrics: 'Inventory Sync & Fabric Variations',
    description:
      'Store operations for premium luxury textiles, managing fabric swatch matrices, price tiers, and inventory stock availability.',
    highlights: [
      'Fabric variations by yardage, blend, and mill origin',
      'Real-time inventory coordination and high-ticket catalog integrity',
      'High-resolution swatch image optimization for web delivery',
    ],
    tags: ['E-commerce', 'Inventory Sync', 'Quality Control'],
    previewType: 'website',
    previewBadge: 'Luxury Textile Catalog',
    images: [
      {
        url: 'https://images.unsplash.com/photo-1558769132-cb1aea458c5e?auto=format&fit=crop&w=1400&q=90',
        caption: 'Premium Wool, Silk & Linen Textile Bolt Assortment',
        tag: 'Fabric Swatches',
      },
      {
        url: 'https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?auto=format&fit=crop&w=1400&q=90',
        caption: 'Bespoke Suiting Cloth & Herringbone Weave Precision Detail',
        tag: 'High-Res Texture',
      },
      {
        url: 'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?auto=format&fit=crop&w=1400&q=90',
        caption: 'Tailoring Cloth Rolls, Cashmere Blends & Color Matrices',
        tag: 'Inventory Grid',
      },
      {
        url: 'https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=1400&q=90',
        caption: 'Fine Draped Textiles & Haute Couture Material Showcase',
        tag: 'Storefront Display',
      },
      {
        url: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=1400&q=90',
        caption: 'Luxury Apparel Fabrics & Custom Yardage Selection',
        tag: 'Order Management',
      },
    ],
  },
  {
    id: 'canton-roast',
    category: 'ecommerce',
    categoryLabel: 'E-commerce Store',
    title: 'Canton Roast',
    client: 'Canton Roast',
    url: 'https://cantonroast.com/',
    metrics: 'Menu Restructuring & Digital Assets',
    description:
      'Online ordering catalog structure, menu item configurations, promotional banners, and imagery optimization.',
    highlights: [
      'Structured digital menu and ordering item categorizations',
      'Food photography retouching & appetizing color calibration',
      'Price adjustments and real-time menu item availability updates',
    ],
    tags: ['Online Ordering', 'Catalog Setup', 'Image Optimization'],
    previewType: 'website',
    previewBadge: 'Online Ordering Menu',
    images: [
      {
        url: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=1400&q=90',
        caption: 'Signature Roast BBQ Delicacies & Appetizing Glaze Color Treatment',
        tag: 'Signature Dish',
      },
      {
        url: 'https://images.unsplash.com/photo-1563245372-f21724e3856d?auto=format&fit=crop&w=1400&q=90',
        caption: 'Dim Sum Specialties & Steamer Basket Digital Menu Grid',
        tag: 'Menu Categories',
      },
      {
        url: 'https://images.unsplash.com/photo-1585032226651-759b368d7246?auto=format&fit=crop&w=1400&q=90',
        caption: 'Handcrafted Noodles & Broth Item Retouching for Mobile Ordering',
        tag: 'Mobile Item Card',
      },
      {
        url: 'https://images.unsplash.com/photo-1512058564366-18510be2db19?auto=format&fit=crop&w=1400&q=90',
        caption: 'Specialty Bento Boxes, Rice Combos & Promotional Banners',
        tag: 'Combo Meals',
      },
      {
        url: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=1400&q=90',
        caption: 'Modern Dining Room & Digital Takeout Ordering Counter',
        tag: 'Brand Experience',
      },
    ],
  },
  {
    id: 'graphic-product-hero',
    category: 'graphic',
    categoryLabel: 'Graphic Design',
    title: 'E-commerce Product Showcase Banners',
    client: 'Commercial Retail Client',
    metrics: 'High-Converting Clean Layouts',
    description:
      'High-impact e-commerce promotional banners and clean product feature callouts created in Adobe Photoshop and Canva.',
    highlights: [
      'Pixel-perfect background removal and seamless drop shadows',
      'Feature callout badges and typography layout for promotional campaigns',
      'Optimized lightweight export ready for instant web loading',
    ],
    tags: ['Photoshop', 'Canva', 'Banner Design', 'Product Graphics'],
    previewType: 'graphic',
    previewBadge: 'Photoshop Design Assets',
    images: [
      {
        url: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=1400&q=90',
        caption: 'High-Converting Minimalist Retail Hero Banner & Promo Layout',
        tag: 'Hero Banner',
      },
      {
        url: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=1400&q=90',
        caption: 'Studio Clean White Background Product Clipping & Drop Shadows',
        tag: 'Clipping Path',
      },
      {
        url: 'https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?auto=format&fit=crop&w=1400&q=90',
        caption: 'Retro Photography & Lifestyle Product Feature Card',
        tag: 'Feature Card',
      },
      {
        url: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=1400&q=90',
        caption: 'Audio Electronics Spec Badge & Technical Callouts',
        tag: 'Spec Graphic',
      },
      {
        url: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=1400&q=90',
        caption: 'Vibrant Footwear Commercial Poster & Dynamic Contrast Palette',
        tag: 'Marketing Creative',
      },
    ],
  },
  {
    id: 'graphic-spec-sheets',
    category: 'graphic',
    categoryLabel: 'Graphic Design',
    title: 'Technical Product Dimension Diagrams',
    client: 'Furniture & Hardware Clients',
    metrics: 'Accurate Customer Spec Cards',
    description:
      'Clear dimension infographics and variant comparison cards designed to reduce customer inquiry bounce rates.',
    highlights: [
      'Clear visual measurement callouts and architectural sizing',
      'Consistent brand colors, typography, and iconography',
      'Formatted for high-res Shopify image gallery viewports',
    ],
    tags: ['Photoshop', 'Illustrator', 'Infographics', 'Spec Sheets'],
    previewType: 'graphic',
    previewBadge: 'Infographic Spec Cards',
    images: [
      {
        url: 'https://images.unsplash.com/photo-1507089947368-19c1da9775ae?auto=format&fit=crop&w=1400&q=90',
        caption: 'Architectural Blueprint Spec & Dimension Callout Sheet',
        tag: 'Blueprint Spec',
      },
      {
        url: 'https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?auto=format&fit=crop&w=1400&q=90',
        caption: 'UI Design System & Mobile Component Spec Grid',
        tag: 'Design System',
      },
      {
        url: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1400&q=90',
        caption: 'Interior Fitting Dimension Guide & Clearance Measurements',
        tag: 'Fitment Guide',
      },
      {
        url: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=1400&q=90',
        caption: 'Furniture Variant Size Comparison Chart (30", 36", 48", 60")',
        tag: 'Variant Comparison',
      },
      {
        url: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=1400&q=90',
        caption: 'Technical Layout CAD Illustration for E-Commerce Galleries',
        tag: 'CAD Illustration',
      },
    ],
  },
  {
    id: 'candid-click-media',
    category: 'video',
    categoryLabel: 'Photo & Video',
    title: 'Candid Click — Wedding Stories & Media',
    client: 'Candid Click by MBS',
    url: 'https://www.facebook.com/CandidclickbyMbs',
    metrics: 'Wedding Stories & Video Production',
    description:
      'Videography, cinematography, and social media production for weddings, events, and prenup films with creative storytelling.',
    highlights: [
      'Cinematic wedding highlight reels, teasers, and full event coverage',
      'Dynamic color grading, multi-camera audio sync, and drone footage editing',
      'High-engagement Facebook and Instagram social content delivery',
    ],
    tags: ['Premiere Pro', 'DaVinci Resolve', 'Wedding Video', 'Social Media'],
    previewType: 'video',
    previewBadge: 'Wedding Media Production',
    images: [
      {
        url: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1600&q=90',
        caption: 'Cinematic Golden Hour Wedding Teaser & Romantic Storytelling',
        tag: 'Wedding Teaser',
      },
      {
        url: 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=1600&q=90',
        caption: 'Bridal Portrait Cinematography & Warm Tone Grading',
        tag: 'Color Grading',
      },
      {
        url: 'https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?auto=format&fit=crop&w=1600&q=90',
        caption: 'Scenic Outdoor Ceremony Reception & Drone Aerial Footage',
        tag: 'Drone Cinematography',
      },
      {
        url: 'https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&w=1600&q=90',
        caption: 'Emotional First Look Moments & Multi-Camera Audio Sync',
        tag: 'Highlight Reel',
      },
      {
        url: 'https://images.unsplash.com/photo-1520854221256-17451cc331bf?auto=format&fit=crop&w=1600&q=90',
        caption: 'Social Media Engagement Reels & Celebration Party Highlights',
        tag: 'Social Media Reel',
      },
    ],
  },
  {
    id: 'video-editing-commercial',
    category: 'video',
    categoryLabel: 'Photo & Video',
    title: 'Social Commercial Reels & Product Clips',
    client: 'Brand & Wedding Clients',
    metrics: '4K Color Grading & Audio Sync',
    description:
      'Dynamic short-form social reels and product showcase videos edited in Premiere Pro, DaVinci Resolve, and CapCut.',
    highlights: [
      'Precision beat-synced cuts, smooth transitions, and speed ramps',
      'Professional color correction and cinematic LUT grading',
      'Optimized 9:16 vertical exports with crisp on-screen typography',
    ],
    tags: ['Premiere Pro', 'DaVinci Resolve', 'CapCut', 'Color Grading'],
    previewType: 'video',
    previewBadge: 'Commercial Video Timeline',
    images: [
      {
        url: 'https://images.unsplash.com/photo-1536240478700-b869070f9279?auto=format&fit=crop&w=1400&q=90',
        caption: 'Multi-Track NLE Timeline Editing & Precision Audio Sync in Premiere Pro',
        tag: 'NLE Timeline',
      },
      {
        url: 'https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?auto=format&fit=crop&w=1400&q=90',
        caption: 'Studio Camera Rigging, 4K Master Capture & Lighting Setup',
        tag: 'Production Rig',
      },
      {
        url: 'https://images.unsplash.com/photo-1518133910546-b6c2fb7d79e3?auto=format&fit=crop&w=1400&q=90',
        caption: 'DaVinci Resolve Color Grading Waveforms & Film LUT Application',
        tag: 'Color Grading Suite',
      },
      {
        url: 'https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?auto=format&fit=crop&w=1400&q=90',
        caption: 'Dynamic 9:16 Vertical Reel Production for Instagram & TikTok',
        tag: 'Social 9:16 Format',
      },
      {
        url: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=1400&q=90',
        caption: 'High-Resolution 4K Master Deliverables & Commercial Sound Design',
        tag: 'Final Master',
      },
    ],
  },
];

export const WorkPage: React.FC<WorkPageProps> = ({ onOpenHire }) => {
  const [selectedCategory, setSelectedCategory] = useState<WorkCategory>('all');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [lightboxImage, setLightboxImage] = useState<{ url: string; caption: string; title: string } | null>(null);

  // Filtered samples based on selected category tab
  const filteredSamples = WORK_SAMPLES.filter((item) => {
    if (selectedCategory === 'all') return true;
    return item.category === selectedCategory;
  });

  const activeIndex = currentIndex >= filteredSamples.length ? 0 : currentIndex;
  const currentWork = filteredSamples[activeIndex] || WORK_SAMPLES[0];
  const images = currentWork.images && currentWork.images.length > 0 ? currentWork.images : [];
  const currentImage = images[activeImageIndex] || images[0] || {
    url: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=1600&q=90',
    caption: currentWork.title,
    tag: 'Showcase',
  };

  const handleCategoryChange = (category: WorkCategory) => {
    setSelectedCategory(category);
    setCurrentIndex(0);
    setActiveImageIndex(0);
  };

  const handlePrevWork = () => {
    setCurrentIndex((prev) => (prev > 0 ? prev - 1 : filteredSamples.length - 1));
    setActiveImageIndex(0);
  };

  const handleNextWork = () => {
    setCurrentIndex((prev) => (prev < filteredSamples.length - 1 ? prev + 1 : 0));
    setActiveImageIndex(0);
  };

  const handlePrevImage = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    if (images.length === 0) return;
    setActiveImageIndex((prev) => (prev > 0 ? prev - 1 : images.length - 1));
  };

  const handleNextImage = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    if (images.length === 0) return;
    setActiveImageIndex((prev) => (prev < images.length - 1 ? prev + 1 : 0));
  };

  const iconMap: Record<string, React.ReactNode> = {
    ShoppingBag: <ShoppingBag className="w-3.5 h-3.5 text-[#2F5D3A]" />,
    FileText: <FileText className="w-3.5 h-3.5 text-[#2F5D3A]" />,
    Headphones: <Headphones className="w-3.5 h-3.5 text-[#2F5D3A]" />,
    Video: <Video className="w-3.5 h-3.5 text-[#2F5D3A]" />,
  };

  return (
    <div
      id="work-page"
      className="w-full max-w-[1700px] h-full mx-auto px-4 sm:px-8 lg:px-12 py-1 flex-1 flex flex-col justify-between animate-fade-up font-inter text-[#2F5D3A] overflow-hidden"
      style={{
        animationDuration: '0.4s',
        animationTimingFunction: 'cubic-bezier(0.22, 1, 0.36, 1)',
      }}
    >
      {/* =========================================================================
          SECTION 1: Header, Title & Category Filter Buttons (Compact Header)
         ========================================================================= */}
      <section id="work-section-1-header" className="w-full pb-1.5 border-b border-[#C9DAB0]/70 flex-none">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-1.5">
          <div className="flex items-center gap-3">
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-white border border-[#C9DAB0] shadow-xs text-[10px] sm:text-[11px] font-bold text-[#2F5D3A]">
              <span className="w-2 h-2 rounded-full bg-[#2F5D3A] animate-pulse" />
              <span>Client Portfolio & Work Gallery</span>
            </div>
            <h1 className="font-urbanist font-extrabold text-base sm:text-xl lg:text-2xl text-[#2F5D3A] tracking-tight leading-none">
              Sample Works & Picture Carousel
            </h1>
          </div>

          {/* Category Filter Pills */}
          <div className="flex flex-wrap items-center gap-1 p-0.5 rounded-xl bg-[#E8EDE0] border border-[#C9DAB0] self-start lg:self-auto">
            <button
              type="button"
              onClick={() => handleCategoryChange('all')}
              className={`px-2.5 py-1 rounded-lg text-[11px] font-bold transition-all cursor-pointer flex items-center gap-1 ${
                selectedCategory === 'all'
                  ? 'bg-white text-[#2F5D3A] shadow-xs border border-[#C9DAB0]'
                  : 'text-[#2F5D3A]/70 hover:text-[#2F5D3A] hover:bg-white/50'
              }`}
            >
              <Layers className="w-3 h-3" />
              <span>All Works</span>
            </button>
            <button
              type="button"
              onClick={() => handleCategoryChange('ecommerce')}
              className={`px-2.5 py-1 rounded-lg text-[11px] font-bold transition-all cursor-pointer flex items-center gap-1 ${
                selectedCategory === 'ecommerce'
                  ? 'bg-white text-[#2F5D3A] shadow-xs border border-[#C9DAB0]'
                  : 'text-[#2F5D3A]/70 hover:text-[#2F5D3A] hover:bg-white/50'
              }`}
            >
              <ShoppingBag className="w-3 h-3" />
              <span>E-commerce</span>
            </button>
            <button
              type="button"
              onClick={() => handleCategoryChange('graphic')}
              className={`px-2.5 py-1 rounded-lg text-[11px] font-bold transition-all cursor-pointer flex items-center gap-1 ${
                selectedCategory === 'graphic'
                  ? 'bg-white text-[#2F5D3A] shadow-xs border border-[#C9DAB0]'
                  : 'text-[#2F5D3A]/70 hover:text-[#2F5D3A] hover:bg-white/50'
              }`}
            >
              <Palette className="w-3 h-3" />
              <span>Graphic Design</span>
            </button>
            <button
              type="button"
              onClick={() => handleCategoryChange('video')}
              className={`px-2.5 py-1 rounded-lg text-[11px] font-bold transition-all cursor-pointer flex items-center gap-1 ${
                selectedCategory === 'video'
                  ? 'bg-white text-[#2F5D3A] shadow-xs border border-[#C9DAB0]'
                  : 'text-[#2F5D3A]/70 hover:text-[#2F5D3A] hover:bg-white/50'
              }`}
            >
              <Video className="w-3 h-3" />
              <span>Photo & Video</span>
            </button>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 2: Dedicated Carousel of Sample Works (4-5 IMAGES PER PROJECT)
          - Left: Description, Highlights, Tags, & Live Link / Request Button
          - Right: High-Res Picture Carousel (4-5 images) with Slider, Thumbnails, & Zoom
         ========================================================================= */}
      <section id="work-section-2-carousel" className="w-full my-1.5 flex-1 flex flex-col min-h-0">
        <div className="relative w-full h-full rounded-2xl bg-white border-2 border-[#C9DAB0] shadow-sm p-3 sm:p-4 flex flex-col justify-between overflow-hidden">
          
          {/* Carousel Top Project Navigation Bar */}
          <div className="flex items-center justify-between gap-2 pb-1.5 border-b border-[#C9DAB0]/50 flex-none">
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-md text-[11px] font-bold bg-[#C9DAB0]/50 text-[#2F5D3A] uppercase tracking-wider">
                {currentWork.categoryLabel}
              </span>
              <span className="text-xs font-semibold text-[#3A6B4A]">
                Project {activeIndex + 1} of {filteredSamples.length}
              </span>
              <span className="hidden sm:inline-block text-[11px] text-[#3A6B4A]/75 font-medium">
                • {images.length} sample work photos
              </span>
            </div>

            {/* Prev / Next Project Controls */}
            <div className="flex items-center gap-1.5">
              <span className="text-[11px] font-bold text-[#2F5D3A]/70 mr-1 hidden sm:inline-block">Switch Project:</span>
              <button
                type="button"
                onClick={handlePrevWork}
                aria-label="Previous sample work project"
                className="w-7 h-7 rounded-lg bg-[#F2F2EE] hover:bg-[#C9DAB0] border border-[#C9DAB0] text-[#2F5D3A] flex items-center justify-center transition-all cursor-pointer shadow-2xs"
                title="Previous project"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={handleNextWork}
                aria-label="Next sample work project"
                className="w-7 h-7 rounded-lg bg-[#F2F2EE] hover:bg-[#C9DAB0] border border-[#C9DAB0] text-[#2F5D3A] flex items-center justify-center transition-all cursor-pointer shadow-2xs"
                title="Next project"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Carousel Main Body: Left Description + Right 4-5 Image Carousel */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 lg:gap-6 items-stretch py-2 flex-1 min-h-0">
            
            {/* Left Column: Description, Highlights, Tags, & See Live Site Button (5 Cols) */}
            <div className="lg:col-span-5 flex flex-col justify-between space-y-2 h-full">
              <div className="space-y-1.5">
                <div className="flex items-center gap-2">
                  <span className="px-2 py-0.5 rounded text-[10px] font-extrabold bg-[#2F5D3A] text-white">
                    {currentWork.previewBadge}
                  </span>
                  <span className="text-[11px] font-bold text-[#3A6B4A]">
                    {currentWork.client}
                  </span>
                </div>
                <h3 className="font-urbanist font-extrabold text-lg sm:text-xl lg:text-2xl text-[#2F5D3A] leading-tight">
                  {currentWork.title}
                </h3>
                <p className="text-xs sm:text-sm text-[#2F5D3A]/90 font-medium leading-relaxed">
                  {currentWork.description}
                </p>
              </div>

              {/* Verified Highlights / Bullets */}
              <div className="space-y-1.5">
                {currentWork.highlights.map((h, hIdx) => (
                  <div key={hIdx} className="flex items-start gap-1.5 text-xs text-[#2F5D3A]/90 font-medium">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#2F5D3A] flex-none mt-0.5" />
                    <span className="leading-tight">{h}</span>
                  </div>
                ))}
              </div>

              {/* Tags & Action Links */}
              <div className="pt-2 border-t border-[#C9DAB0]/60 flex flex-wrap items-center justify-between gap-2 flex-none">
                <div className="flex flex-wrap gap-1">
                  {currentWork.tags.map((t) => (
                    <span
                      key={t}
                      className="px-2 py-0.5 rounded text-[10px] font-bold bg-[#F2F2EE] border border-[#C9DAB0] text-[#2F5D3A]"
                    >
                      {t}
                    </span>
                  ))}
                </div>

                <div className="flex flex-wrap items-center gap-1.5">
                  {currentWork.url ? (
                    <a
                      href={currentWork.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-white bg-[#2F5D3A] hover:bg-[#3A6B4A] px-3.5 py-1.5 rounded-full transition-all shadow-xs"
                    >
                      <span>See live site</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  ) : (
                    <button
                      type="button"
                      onClick={onOpenHire}
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-white bg-[#2F5D3A] hover:bg-[#3A6B4A] px-3.5 py-1.5 rounded-full transition-all cursor-pointer shadow-xs"
                    >
                      <span>Request Similar Work</span>
                      <Sparkles className="w-3.5 h-3.5 text-[#C9DAB0]" />
                    </button>
                  )}
                </div>
              </div>
            </div>

            {/* Right Column: Interactive 4-5 Image Carousel Showcase (7 Cols) */}
            <div className="lg:col-span-7 flex flex-col justify-between h-full min-h-0 space-y-2">
              <div className="w-full h-full rounded-xl border-2 border-[#C9DAB0] bg-white overflow-hidden shadow-xs flex flex-col justify-between min-h-0">
                
                {/* Photo Carousel Header / Counter bar */}
                <div className="px-3 py-1.5 bg-[#E8EDE0] border-b border-[#C9DAB0] flex items-center justify-between text-[11px] flex-none">
                  <div className="flex items-center gap-2 min-w-0">
                    <div className="flex items-center gap-1.5">
                      <div className="w-2.5 h-2.5 rounded-full bg-red-400/80 flex-none" />
                      <div className="w-2.5 h-2.5 rounded-full bg-yellow-400/80 flex-none" />
                      <div className="w-2.5 h-2.5 rounded-full bg-green-400/80 flex-none" />
                    </div>

                    <div className="flex items-center gap-1.5 bg-white/90 border border-[#C9DAB0]/80 px-2 py-0.5 rounded text-[10px] font-semibold text-[#2F5D3A] ml-1 truncate">
                      <ImageIcon className="w-3 h-3 text-[#3A6B4A] flex-none" />
                      <span className="truncate">Sample Work Photos ({activeImageIndex + 1}/{images.length})</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    {currentImage.tag && (
                      <span className="text-[10px] font-bold text-[#2F5D3A] bg-white px-2 py-0.5 rounded border border-[#C9DAB0] hidden sm:inline-block">
                        {currentImage.tag}
                      </span>
                    )}
                    <button
                      type="button"
                      onClick={() =>
                        setLightboxImage({
                          url: currentImage.url,
                          caption: currentImage.caption,
                          title: currentWork.title,
                        })
                      }
                      className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-white hover:bg-[#C9DAB0] border border-[#C9DAB0] text-[10px] font-bold text-[#2F5D3A] transition-all cursor-pointer shadow-2xs"
                      title="Enlarge Fullscreen"
                    >
                      <Maximize2 className="w-2.5 h-2.5" />
                      <span className="hidden sm:inline">Zoom</span>
                    </button>
                  </div>
                </div>

                {/* Main Picture Stage with Carousel Slide Controls & Caption */}
                <div className="relative flex-1 min-h-0 w-full overflow-hidden bg-[#F2F2EE] group select-none">
                  <img
                    key={currentImage.url}
                    src={currentImage.url}
                    alt={currentImage.caption || currentWork.title}
                    className="w-full h-full object-cover object-center transition-all duration-500 group-hover:scale-103"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent pointer-events-none" />

                  {/* Left / Right Carousel Arrow Overlays */}
                  <button
                    type="button"
                    onClick={handlePrevImage}
                    aria-label="Previous work photo"
                    className="absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-black/50 hover:bg-[#2F5D3A] text-white border border-white/30 flex items-center justify-center transition-all cursor-pointer opacity-80 group-hover:opacity-100 hover:scale-110 shadow-lg z-10"
                    title="Previous photo"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>

                  <button
                    type="button"
                    onClick={handleNextImage}
                    aria-label="Next work photo"
                    className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-black/50 hover:bg-[#2F5D3A] text-white border border-white/30 flex items-center justify-center transition-all cursor-pointer opacity-80 group-hover:opacity-100 hover:scale-110 shadow-lg z-10"
                    title="Next photo"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>

                  {/* Image Counter Badge Top-Right */}
                  <div className="absolute top-2.5 right-2.5 px-2 py-0.5 rounded-full bg-black/65 backdrop-blur-xs text-white text-[10px] font-bold border border-white/20">
                    {activeImageIndex + 1} / {images.length}
                  </div>

                  {/* Caption Overlay at Bottom of Photo */}
                  <div className="absolute bottom-2.5 left-3 right-3 flex items-center justify-between pointer-events-auto gap-2">
                    <div className="px-2.5 py-1 rounded-lg bg-black/70 backdrop-blur-xs text-white text-[11px] font-semibold border border-white/20 truncate max-w-[75%] shadow-xs">
                      {currentImage.caption}
                    </div>

                    {currentWork.url && (
                      <a
                        href={currentWork.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-2.5 py-1 rounded-lg bg-[#2F5D3A] hover:bg-[#3A6B4A] text-white text-[10px] font-bold border border-[#C9DAB0]/40 flex items-center gap-1 shadow-sm transition-all flex-none"
                      >
                        <span>See live site</span>
                        <ExternalLink className="w-2.5 h-2.5" />
                      </a>
                    )}
                  </div>
                </div>

                {/* 4-5 Image Thumbnail Strip Bar */}
                <div className="p-1.5 bg-[#F2F2EE] border-t border-[#C9DAB0] flex items-center justify-between gap-2 flex-none">
                  <div className="flex items-center gap-1.5 overflow-x-auto py-0.5 flex-1 min-w-0">
                    {images.map((img, imgIdx) => (
                      <button
                        key={imgIdx}
                        type="button"
                        onClick={() => setActiveImageIndex(imgIdx)}
                        className={`relative rounded-lg overflow-hidden flex-none w-12 sm:w-16 h-8 sm:h-9 border-2 transition-all cursor-pointer ${
                          imgIdx === activeImageIndex
                            ? 'border-[#2F5D3A] scale-105 shadow-xs ring-1 ring-[#2F5D3A]'
                            : 'border-[#C9DAB0] opacity-60 hover:opacity-100'
                        }`}
                        title={img.caption}
                      >
                        <img
                          src={img.url}
                          alt={img.caption}
                          className="w-full h-full object-cover"
                          referrerPolicy="no-referrer"
                        />
                        {imgIdx === activeImageIndex && (
                          <div className="absolute inset-0 bg-[#2F5D3A]/20 pointer-events-none" />
                        )}
                      </button>
                    ))}
                  </div>

                  <span className="text-[10px] font-bold px-2 py-1 rounded bg-white border border-[#C9DAB0] text-[#2F5D3A] flex-none hidden sm:inline-block">
                    {currentWork.metrics}
                  </span>
                </div>

              </div>
            </div>

          </div>

          {/* Dots Indicator For Projects */}
          <div className="flex items-center justify-center gap-1.5 pt-1 flex-none">
            {filteredSamples.map((_, dotIdx) => (
              <button
                key={dotIdx}
                type="button"
                onClick={() => {
                  setCurrentIndex(dotIdx);
                  setActiveImageIndex(0);
                }}
                aria-label={`Go to project ${dotIdx + 1}`}
                className={`h-1.5 rounded-full transition-all cursor-pointer ${
                  dotIdx === activeIndex ? 'w-6 bg-[#2F5D3A]' : 'w-2 bg-[#C9DAB0] hover:bg-[#3A6B4A]'
                }`}
              />
            ))}
          </div>

        </div>
      </section>

      {/* Fullscreen Lightbox Modal */}
      {lightboxImage && (
        <div
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-sm flex flex-col items-center justify-center p-4 animate-fade-in"
          onClick={() => setLightboxImage(null)}
        >
          <div
            className="relative max-w-5xl max-h-[85vh] w-full flex flex-col items-center justify-center"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => setLightboxImage(null)}
              className="absolute -top-10 right-0 p-1.5 rounded-full bg-white/20 hover:bg-white/40 text-white transition-all cursor-pointer"
              title="Close"
            >
              <X className="w-6 h-6" />
            </button>

            <img
              src={lightboxImage.url}
              alt={lightboxImage.caption}
              className="max-w-full max-h-[75vh] object-contain rounded-xl shadow-2xl border border-white/20"
              referrerPolicy="no-referrer"
            />

            <div className="mt-3 text-center text-white px-4 py-2 rounded-xl bg-black/60 border border-white/10 max-w-2xl">
              <div className="text-xs font-bold text-[#C9DAB0]">{lightboxImage.title}</div>
              <div className="text-sm font-medium">{lightboxImage.caption}</div>
            </div>
          </div>
        </div>
      )}

      {/* =========================================================================
          SECTION 3: Core Operations & Services Matrix (Compact Bottom Grid)
         ========================================================================= */}
      <section id="work-section-3-services" className="w-full pt-0.5 flex-none">
        <div className="flex items-center justify-between mb-1 px-0.5">
          <h2 className="font-urbanist font-bold text-xs sm:text-sm text-[#2F5D3A] flex items-center gap-1.5">
            <Zap className="w-3.5 h-3.5 text-[#3A6B4A]" />
            <span>Core Operations & Services</span>
          </h2>
          <span className="text-[11px] font-bold text-[#3A6B4A]">4+ Years Experience</span>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-2">
          {SERVICES.map((s, idx) => (
            <div
              key={idx}
              className="p-2 rounded-xl bg-white border-2 border-[#C9DAB0] shadow-xs flex flex-col justify-between space-y-0.5"
            >
              <div className="space-y-0.5">
                <div className="flex items-center gap-1.5">
                  <div className="w-5 h-5 rounded-md bg-[#C9DAB0]/40 border border-[#2F5D3A]/30 flex items-center justify-center flex-none">
                    {iconMap[s.iconName] || <ShoppingBag className="w-3 h-3 text-[#2F5D3A]" />}
                  </div>
                  <h3 className="font-urbanist font-bold text-[11px] sm:text-xs text-[#2F5D3A] leading-tight truncate">
                    {s.title}
                  </h3>
                </div>
                <p className="text-[9.5px] text-[#2F5D3A]/80 font-medium leading-tight line-clamp-1 sm:line-clamp-2">
                  {s.description}
                </p>
              </div>

              <div className="flex flex-wrap gap-1 pt-0.5 border-t border-[#C9DAB0]/50">
                {s.tags.slice(0, 2).map((t) => (
                  <span
                    key={t}
                    className="px-1.5 py-0.2 rounded text-[8.5px] font-bold bg-[#F2F2EE] border border-[#C9DAB0] text-[#2F5D3A]"
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

