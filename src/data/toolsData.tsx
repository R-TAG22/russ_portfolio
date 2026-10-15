import React from 'react';

export interface ToolLogoItem {
  id: string;
  name: string;
  category: string;
  type: 'design' | 'marketing' | 'ecommerce';
  icon: React.ReactNode;
}

export const ALL_TOOL_LOGOS: ToolLogoItem[] = [
  // --- E-COMMERCE & DESIGN PLATFORMS (From Image 1) ---
  {
    id: 'shopify',
    name: 'Shopify',
    category: 'E-commerce Platform',
    type: 'ecommerce',
    icon: (
      <div className="flex items-center gap-1.5 px-1 py-0.5">
        <svg className="w-6 h-6 flex-none" viewBox="0 0 109 124" fill="none">
          <path
            d="M74.8 17.5c-.4-.4-1-.5-1.5-.4l-5.6 1.7c-.5.2-.9.6-1.1 1.1l-10 27.2c-.3.7.1 1.5.8 1.7.7.3 1.5-.1 1.7-.8l9.6-26.1 4.5-1.3c.7-.2 1.2.3 1.4 1l11.4 56.6-46.7 9.8-24.1-17.6c-.3-.2-.5-.6-.5-1l4.4-44.2 13.9-3.8c.7-.2 1.5.2 1.7.9.2.7-.2 1.5-.9 1.7l-12.7 3.5-3.8 38.3 22.3 16.3 43.8-9.2-10.7-53.1c-.2-.8-.7-1.4-1.4-1.6l-6.3-1.9z"
            fill="#95BF47"
          />
          <path
            d="M60.8 19.8c0-.7-.3-1.4-.9-1.8L44.2 8.7c-1.2-.8-2.8-.5-3.6.7L18.4 43.1c-.4.7-.4 1.5 0 2.2l22.7 39.4 19.7-5.4V19.8z"
            fill="#95BF47"
          />
          <path d="M60.8 19.8v59.5l23.5-6.4 10.9-54.3-34.4 1.2z" fill="#5E8E3E" />
        </svg>
        <span className="font-urbanist font-black text-[13px] text-[#2F5D3A] tracking-tight">
          shopify
        </span>
      </div>
    ),
  },
  {
    id: 'wix',
    name: 'Wix',
    category: 'Website Builder',
    type: 'design',
    icon: (
      <div className="flex items-center gap-0.5 font-urbanist font-black text-base text-neutral-900 tracking-wider">
        <span className="text-lg">W</span>
        <span className="text-[#FFCC00] font-black text-sm">i</span>
        <span className="text-lg">X</span>
      </div>
    ),
  },
  {
    id: 'wordpress',
    name: 'WordPress',
    category: 'CMS & Store',
    type: 'ecommerce',
    icon: (
      <div className="flex items-center gap-1.5">
        <svg className="w-5 h-5 flex-none" viewBox="0 0 100 100" fill="none">
          <circle cx="50" cy="50" r="48" fill="#21759B" />
          <path
            d="M50 8C26.8 8 8 26.8 8 50c0 10.7 4 20.4 10.6 27.8L38.2 24.3c.7-2 .3-3.3-1.1-3.6l-3.3-.3v-1.8h17.4v1.8l-4.4.4c-1.5.1-2.1 1.6-1.5 3.5L55 53.6l6.8-19.8c.8-2.3.2-3.6-1.2-3.8l-3.8-.4v-1.8h17.2v1.8l-3.5.3c-1.5.1-2.2 1.6-1.5 3.5l12.7 36.9C88.2 63.8 92 57.3 92 50c0-23.2-18.8-42-42-42zM15 50c0 4.2.8 8.2 2.3 11.9l16.1-46.7C22.6 23.3 15 35.8 15 50zm35 34.3c-3 0-5.8-.4-8.5-1.2L28.2 46.2 43 89c2.3.6 4.7.9 7 .9 3.5 0 6.9-.5 10.1-1.6L44.8 44.1 50 84.3z"
            fill="#FFFFFF"
          />
        </svg>
        <span className="font-serif font-bold text-[11px] text-[#21759B] tracking-wider uppercase">
          WORDPRESS
        </span>
      </div>
    ),
  },
  {
    id: 'webflow',
    name: 'Webflow',
    category: 'Visual Development',
    type: 'design',
    icon: (
      <div className="flex items-center gap-1.5">
        <svg className="w-5 h-5 flex-none" viewBox="0 0 100 100" fill="none">
          <path
            d="M95 32c-3.7 10-12.7 18.7-22.3 26.8-4.2-7.5-8.2-15-12.5-22.5h-15l10.8 19.3c-5.7 4.7-11.4 9.5-17.5 13.9L22 32H5l19.5 35.7C38.7 67.8 53 54.3 64.6 42.4c3.4 6 6.7 12 10.2 18H90c3.3-9.3 6.7-18.7 10-28h-5z"
            fill="#146EF5"
          />
        </svg>
        <span className="font-urbanist font-extrabold text-[12px] text-neutral-900">
          Webflow
        </span>
      </div>
    ),
  },
  {
    id: 'framer',
    name: 'Framer',
    category: 'Interactive UI',
    type: 'design',
    icon: (
      <div className="flex items-center gap-1.5">
        <div className="w-5 h-5 rounded-md bg-[#0055FF] flex items-center justify-center text-white font-black text-xs font-urbanist shadow-xs">
          F
        </div>
        <span className="font-urbanist font-bold text-[12px] text-neutral-800">
          Framer
        </span>
      </div>
    ),
  },
  {
    id: 'canva',
    name: 'Canva',
    category: 'Visual Design',
    type: 'design',
    icon: (
      <div className="flex items-center gap-1.5">
        <div className="w-6 h-6 rounded-full bg-gradient-to-tr from-[#00C4CC] to-[#7D2AE8] flex items-center justify-center text-white font-black text-[9px] font-urbanist shadow-xs italic">
          Canva
        </div>
        <span className="font-urbanist font-bold text-[12px] text-[#7D2AE8]">
          Canva
        </span>
      </div>
    ),
  },
  {
    id: 'pagefly',
    name: 'PageFly',
    category: 'Shopify Page Builder',
    type: 'design',
    icon: (
      <div className="flex items-center gap-1.5">
        <svg className="w-5 h-5 flex-none" viewBox="0 0 32 32" fill="none">
          <rect x="2" y="2" width="28" height="28" rx="6" fill="#3B5998" />
          <path d="M8 8h16v3H8zm0 6h12v3H8zm0 6h16v3H8z" fill="#FFFFFF" />
        </svg>
        <span className="font-urbanist font-bold text-[12px] text-[#3B5998]">
          PageFly
        </span>
      </div>
    ),
  },
  {
    id: 'figma',
    name: 'Figma',
    category: 'UI/UX Design',
    type: 'design',
    icon: (
      <div className="flex items-center gap-1.5">
        <svg className="w-4 h-6 flex-none" viewBox="0 0 38 57" fill="none">
          <path d="M19 28.5a9.5 9.5 0 1 1 19 0 9.5 9.5 0 0 1-19 0z" fill="#1ABCFE" />
          <path d="M0 47.5A9.5 9.5 0 0 1 9.5 38H19v9.5a9.5 9.5 0 1 1-19 0z" fill="#0ACF83" />
          <path d="M19 0v19h9.5a9.5 9.5 0 1 0 0-19H19z" fill="#FF7262" />
          <path d="M0 9.5A9.5 9.5 0 0 0 9.5 19H19V0H9.5A9.5 9.5 0 0 0 0 9.5z" fill="#F24E1E" />
          <path d="M0 28.5A9.5 9.5 0 0 0 9.5 38H19V19H9.5A9.5 9.5 0 0 0 0 28.5z" fill="#A259FF" />
        </svg>
        <span className="font-urbanist font-extrabold text-[12px] text-neutral-900">
          Figma
        </span>
      </div>
    ),
  },
  {
    id: 'gohighlevel',
    name: 'GoHighLevel',
    category: 'CRM & Funnels',
    type: 'marketing',
    icon: (
      <div className="flex items-center gap-1">
        <div className="flex items-center text-xs">
          <span className="text-[#00C4CC] font-black">↑</span>
          <span className="text-[#38B000] font-black">↑</span>
        </div>
        <span className="font-urbanist font-extrabold text-[11.5px] text-neutral-900">
          HighLevel
        </span>
      </div>
    ),
  },
  {
    id: 'replo',
    name: 'Replo',
    category: 'Shopify Landing Pages',
    type: 'design',
    icon: (
      <div className="flex items-center gap-1.5">
        <div className="w-5 h-5 rounded bg-black flex items-center justify-center text-white text-[10px] font-black">
          ☵
        </div>
        <span className="font-urbanist font-extrabold text-[12px] text-neutral-900">
          Replo
        </span>
      </div>
    ),
  },
  {
    id: 'systeme',
    name: 'systeme.io',
    category: 'Marketing Platform',
    type: 'marketing',
    icon: (
      <div className="flex items-center gap-1.5">
        <div className="w-5 h-5 rounded-full bg-[#00A8FF] text-white flex items-center justify-center font-bold text-xs">
          S
        </div>
        <span className="font-urbanist font-bold text-[12px] text-[#00A8FF]">
          systeme.io
        </span>
      </div>
    ),
  },
  {
    id: 'kajabi',
    name: 'Kajabi',
    category: 'Course & Funnel Builder',
    type: 'marketing',
    icon: (
      <div className="flex items-center gap-1.5">
        <span className="text-[#FF5C39] font-black text-sm">K</span>
        <span className="font-urbanist font-extrabold text-[12px] text-neutral-900">
          kajabi
        </span>
      </div>
    ),
  },
  {
    id: 'gempages',
    name: 'GemPages',
    category: 'Shopify Page Builder',
    type: 'design',
    icon: (
      <div className="flex items-center gap-1.5">
        <svg className="w-4 h-4 flex-none" viewBox="0 0 24 24" fill="none">
          <path d="M12 2L2 9l10 13 10-13L12 2z" fill="#FFA500" />
        </svg>
        <span className="font-urbanist font-extrabold text-[12px] text-neutral-900">
          GemPages
        </span>
      </div>
    ),
  },

  // --- MARKETING & ADMIN TOOLS (From Image 2) ---
  {
    id: 'meta-ads',
    name: 'Meta Ads',
    category: 'Paid Advertising',
    type: 'marketing',
    icon: (
      <div className="flex items-center gap-1.5">
        <svg className="w-5 h-5 flex-none" viewBox="0 0 100 100" fill="none">
          <path
            d="M28 35c-10 0-18 8-18 18s8 18 18 18c11 0 17-9 22-17 5 8 11 17 22 17 10 0 18-8 18-18s-8-18-18-18c-11 0-17 9-22 17-5-8-11-17-22-17z"
            stroke="#0081FB"
            strokeWidth="8"
          />
        </svg>
        <span className="font-urbanist font-bold text-[12px] text-neutral-900">
          Meta
        </span>
      </div>
    ),
  },
  {
    id: 'linkedin-ads',
    name: 'LinkedIn Ads',
    category: 'B2B Advertising',
    type: 'marketing',
    icon: (
      <div className="flex items-center gap-1">
        <span className="font-urbanist font-bold text-[11px] text-[#0A66C2]">
          Linked
        </span>
        <div className="w-4 h-4 rounded bg-[#0A66C2] text-white font-bold text-[9px] flex items-center justify-center">
          in
        </div>
        <span className="text-[10px] text-neutral-600 font-semibold">Ads</span>
      </div>
    ),
  },
  {
    id: 'adroll',
    name: 'AdRoll',
    category: 'Retargeting Platform',
    type: 'marketing',
    icon: (
      <div className="flex items-center gap-1 font-urbanist font-black text-xs text-[#00A8FF]">
        <span>AdRoll</span>
      </div>
    ),
  },
  {
    id: 'google-ads',
    name: 'Google Ads',
    category: 'Search & PPC Ads',
    type: 'marketing',
    icon: (
      <div className="flex items-center gap-1.5">
        <svg className="w-4 h-5 flex-none" viewBox="0 0 24 24" fill="none">
          <path d="M3 13l8.5-9.5a3 3 0 0 1 4.5 4L7.5 17a3 3 0 0 1-4.5-4z" fill="#4285F4" />
          <path d="M16 17a3 3 0 1 0 0-6 3 3 0 0 0 0 6z" fill="#34A853" />
          <path d="M3 13l8.5 9.5a3 3 0 0 0 4.5-4L7.5 9a3 3 0 0 0-4.5 4z" fill="#FBBC05" />
        </svg>
        <div className="leading-tight">
          <span className="font-bold text-[11px] text-neutral-800">Google </span>
          <span className="font-bold text-[11px] text-[#4285F4]">Ads</span>
        </div>
      </div>
    ),
  },
  {
    id: 'google-analytics',
    name: 'Google Analytics',
    category: 'Store Telemetry & GA4',
    type: 'marketing',
    icon: (
      <div className="flex items-center gap-1.5">
        <div className="flex items-end gap-0.5 h-4">
          <div className="w-1.5 h-2 bg-[#F9AB00] rounded-xs" />
          <div className="w-1.5 h-3 bg-[#F9AB00] rounded-xs" />
          <div className="w-1.5 h-4 bg-[#E37400] rounded-xs" />
        </div>
        <div className="leading-tight">
          <span className="font-medium text-[10px] text-neutral-600 block">Google</span>
          <span className="font-bold text-[11px] text-neutral-800 -mt-1 block">Analytics</span>
        </div>
      </div>
    ),
  },
  {
    id: 'klaviyo',
    name: 'Klaviyo',
    category: 'Email & SMS Flows',
    type: 'marketing',
    icon: (
      <div className="flex items-center gap-1.5">
        <span className="font-urbanist font-black text-sm text-neutral-900 tracking-tight">
          klaviyo
        </span>
        <div className="w-2.5 h-2.5 rounded-xs bg-neutral-900" />
      </div>
    ),
  },
  {
    id: 'mailchimp',
    name: 'Mailchimp',
    category: 'Email Marketing',
    type: 'marketing',
    icon: (
      <div className="flex items-center gap-1.5">
        <div className="w-5 h-5 rounded-full bg-[#FFE01B] flex items-center justify-center text-black font-black text-[11px] shadow-xs">
          🐵
        </div>
        <span className="font-urbanist font-extrabold text-[11.5px] text-neutral-900">
          mailchimp
        </span>
      </div>
    ),
  },
  {
    id: 'amazon-seller',
    name: 'Amazon Seller',
    category: 'Marketplace Operations',
    type: 'ecommerce',
    icon: (
      <div className="flex items-center gap-1.5">
        <div className="w-5 h-5 rounded-sm bg-neutral-900 text-[#FF9900] flex items-center justify-center font-black text-[10px] shadow-xs">
          a
        </div>
        <div className="leading-tight">
          <span className="font-bold text-[11.5px] text-neutral-900 block">amazon</span>
          <span className="text-[9px] text-neutral-500 font-semibold -mt-0.5 block">seller</span>
        </div>
      </div>
    ),
  },
  {
    id: 'walmart',
    name: 'Walmart Marketplace',
    category: 'Marketplace Catalog',
    type: 'ecommerce',
    icon: (
      <div className="flex items-center gap-1.5">
        <div className="text-[#FFC220] font-black text-sm leading-none">
          ✻
        </div>
        <div className="leading-tight">
          <span className="font-urbanist font-black text-[11px] text-[#0071DC] block">
            Walmart
          </span>
          <span className="text-[8px] text-neutral-500 font-bold uppercase tracking-wider -mt-0.5 block">
            Marketplace
          </span>
        </div>
      </div>
    ),
  },
  {
    id: 'faire',
    name: 'Faire',
    category: 'Wholesale B2B Platform',
    type: 'ecommerce',
    icon: (
      <div className="font-serif font-bold text-sm tracking-[0.2em] text-neutral-900 uppercase">
        FAIRE
      </div>
    ),
  },
  {
    id: 'omnisend',
    name: 'Omnisend',
    category: 'E-commerce Automation',
    type: 'marketing',
    icon: (
      <div className="flex items-center gap-1.5">
        <div className="w-4 h-4 rounded bg-[#00A878] text-white flex items-center justify-center text-[10px] font-black">
          O
        </div>
        <span className="font-urbanist font-extrabold text-[12px] text-neutral-900">
          omnisend
        </span>
      </div>
    ),
  },
  {
    id: 'etsy',
    name: 'Etsy',
    category: 'Marketplace & Handmade',
    type: 'ecommerce',
    icon: (
      <div className="font-serif font-black text-base text-[#F1641E] tracking-tight">
        Etsy
      </div>
    ),
  },
  {
    id: 'beefree',
    name: 'Beefree',
    category: 'HTML Email Designer',
    type: 'marketing',
    icon: (
      <div className="flex items-center gap-1.5">
        <div className="w-5 h-5 rounded-md bg-[#6C5CE7] text-white flex items-center justify-center text-[11px] font-black">
          B
        </div>
        <span className="font-urbanist font-bold text-[11px] text-[#6C5CE7]">
          beefree
        </span>
      </div>
    ),
  },
  {
    id: 'homedepot',
    name: 'The Home Depot',
    category: 'Supplier Catalog',
    type: 'ecommerce',
    icon: (
      <div className="flex items-center gap-1.5">
        <div className="w-5 h-5 rounded-md bg-[#F96302] flex items-center justify-center text-white font-extrabold text-[7.5px] leading-tight font-urbanist p-0.5 text-center shadow-xs">
          HD
        </div>
        <span className="font-urbanist font-bold text-[11px] text-[#F96302]">
          Home Depot
        </span>
      </div>
    ),
  },
  {
    id: 'photoshop',
    name: 'Adobe Photoshop',
    category: 'Image Retouching',
    type: 'design',
    icon: (
      <div className="flex items-center gap-1.5">
        <div className="w-5 h-5 rounded-md bg-[#001E36] border border-[#31A8FF] flex items-center justify-center text-[#31A8FF] font-black text-[10px] font-urbanist shadow-xs">
          Ps
        </div>
        <span className="font-urbanist font-bold text-[11px] text-[#001E36]">
          Photoshop
        </span>
      </div>
    ),
  },
  {
    id: 'premiere',
    name: 'Adobe Premiere Pro',
    category: 'Video Editing',
    type: 'design',
    icon: (
      <div className="flex items-center gap-1.5">
        <div className="w-5 h-5 rounded-md bg-[#00005B] border border-[#9999FF] flex items-center justify-center text-[#9999FF] font-black text-[10px] font-urbanist shadow-xs">
          Pr
        </div>
        <span className="font-urbanist font-bold text-[11px] text-[#00005B]">
          Premiere
        </span>
      </div>
    ),
  },
  {
    id: 'davinci',
    name: 'DaVinci Resolve',
    category: 'Color & Mastering',
    type: 'design',
    icon: (
      <div className="flex items-center gap-1.5">
        <svg className="w-5 h-5 flex-none" viewBox="0 0 100 100" fill="none">
          <circle cx="50" cy="50" r="48" fill="#1C1C1E" />
          <path d="M50 20 L75 65 L25 65 Z" fill="#E63946" />
          <path d="M65 35 L80 80 L35 75 Z" fill="#457B9D" opacity="0.85" />
          <path d="M35 35 L65 75 L20 80 Z" fill="#2A9D8F" opacity="0.85" />
        </svg>
        <span className="font-urbanist font-bold text-[11px] text-neutral-800">
          DaVinci
        </span>
      </div>
    ),
  },
  {
    id: 'sheets',
    name: 'Google Sheets',
    category: 'Inventory & Data',
    type: 'ecommerce',
    icon: (
      <div className="flex items-center gap-1.5">
        <svg className="w-4 h-5 flex-none" viewBox="0 0 64 64" fill="none">
          <rect x="8" y="4" width="48" height="56" rx="6" fill="#0F9D58" />
          <path d="M40 4 L56 20 L40 20 Z" fill="#87CEAB" />
          <rect x="18" y="24" width="28" height="24" rx="2" fill="#FFFFFF" />
          <path d="M18 32 h28 M18 40 h28 M32 24 v24" stroke="#0F9D58" strokeWidth="2.5" />
        </svg>
        <span className="font-urbanist font-bold text-[11px] text-[#0F9D58]">
          Sheets
        </span>
      </div>
    ),
  },
];
