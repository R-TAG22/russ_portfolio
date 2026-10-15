import { JobExperience, ProjectItem, ServiceItem } from '../types';

export const PERSONAL_INFO = {
  name: 'Russell Taga-an',
  shortName: 'Russell',
  role: 'E-commerce & TikTok Shop Operations Specialist / Catalog Systems Lead',
  email: 'tagaan01@gmail.com',
  phone: '+63 929 6937 829',
  location: 'Malabon City, Philippines',
  status: 'Available for High-Growth DTC Brands & Multi-Channel Ops',
  availabilityDetails: 'Full-time & Part-time — EST, PST, GMT & AEST',
  avatarUrl: 'https://avatars.githubusercontent.com/u/121448425?v=4',
  resumePdfUrl: 'https://r-tag22.github.io/my_personal_site/Russell-T-Resume.pdf',
  githubUrl: 'https://github.com/R-TAG22',
  upworkUrl: 'https://www.upwork.com/freelancers/~017d47884cc6a6c3ac',
  portfolioSiteUrl: 'https://r-tag22.github.io/my_personal_site/index.html',
  intro:
    'E-Commerce & TikTok Shop Operations Specialist architecting enterprise catalog systems, high-compliance product launches, and end-to-end backend fulfillment across Shopify, TikTok Shop, and Home Depot.',
  summary:
    'E-commerce Operations Manager and Catalog Systems Specialist experienced in 25,000+ SKU variant matrices, strict TikTok Shop compliance (4.8/5.0 seller score), and leading a 4-person execution pod with 400–600 daily listing throughput across Shopify, WooCommerce, and Home Depot US.',
  internet: 'Converge Fiber 200 Mbps + Smart 5G backup',
  equipment: 'MacBook Air M1, Custom Ryzen 7 PC (32GB RAM), dual monitors, HD cam & noise-canceling audio',
  languages: [
    { lang: 'English', level: 'Fluent' },
    { lang: 'Filipino', level: 'Native' },
  ],
};

export const METRICS = [
  { id: 'variants', value: '25K+', label: 'Matrix Variants Built', detail: 'Multi-attribute wood, tops & custom hardware' },
  { id: 'output', value: '400–600', label: 'Daily SKU Velocity', detail: '4-VA execution pod with internal QA' },
  { id: 'rating', value: '4.8★', label: 'TikTok Shop Rating', detail: 'SPS compliance, FBT & SLA fulfillment' },
];

export const CORE_SKILLS = [
  'Shopify',
  'TikTok Shop Seller Center',
  'Home Depot US',
  'Amazon Seller Central',
  'Wayfair',
  'WooCommerce',
  'FBT Fulfillment',
  'Catalog Compliance & SPS',
  'Multi-Attribute Matrices',
  'Bulk CSV Flat-Files',
  'Adobe Photoshop',
  'DaVinci Resolve',
  'Premiere Pro',
  'ClickUp & Asana',
  'AI Workflow Automation',
];

export const SERVICES: ServiceItem[] = [
  {
    title: 'Enterprise Catalog Systems & Matrices',
    description: 'Architecting complex multi-attribute variant matrices (25K+ SKUs), nested metafields, and bulk flat-file CSV pipelines across Shopify, Home Depot, and Wayfair.',
    iconName: 'ShoppingBag',
    tags: ['Shopify', 'Home Depot', 'WooCommerce', 'Variant Matrices'],
  },
  {
    title: 'TikTok Shop Operations & Compliance',
    description: 'End-to-end Seller Center management, strict supplement/health compliance, FBT replenishment, dispatch SLAs, and dispute resolution maintaining a 4.8/5.0 score.',
    iconName: 'FileText',
    tags: ['TikTok Shop', 'FBT Logistics', 'SPS Health', 'Affiliate Ops'],
  },
  {
    title: 'High-Velocity Pod Execution (4-VA)',
    description: 'Commanding a dedicated 4-specialist execution pod delivering 400–600 QA-validated product listings per day for aggressive catalog rollouts.',
    iconName: 'Headphones',
    tags: ['Pod Leadership', 'Bulk Publishing', 'QA Checklists', 'SOPs'],
  },
  {
    title: 'Commercial Creative & Video Assets',
    description: 'Batch Photoshop product retouching, pure-white cutout silhouettes, dimension schematics, and high-converting Reels/UGC in Premiere Pro and DaVinci Resolve.',
    iconName: 'Video',
    tags: ['Photoshop Batch', 'DaVinci Resolve', 'Premiere Pro', 'Ad Creatives'],
  },
];

export const EXPERIENCES: JobExperience[] = [
  {
    title: 'TikTok Shop Operations Specialist',
    company: 'Remote DTC Brand (Dietary Supplements & Health)',
    period: '2026 — Present',
    featured: true,
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
    featured: true,
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
];

export const PROJECTS: ProjectItem[] = [
  {
    tag: 'Shopify Catalog',
    title: '3,000+ Product Store Catalog Cleanup',
    description: 'Large-scale catalog restructuring, categorization, SKU validation, metafields implementation, and SEO title/description optimization.',
    metrics: '3,000+ SKUs Optimized',
    skills: ['Shopify', 'SEO', 'Google Sheets', 'Photoshop'],
  },
  {
    tag: 'E-commerce Operations',
    title: 'Multi-platform Store Management',
    description: 'Synchronized store management across Home Depot, Shopify, and WooCommerce with automated inventory reconciliation and rapid order fulfillment.',
    metrics: 'Multi-channel Sync',
    skills: ['Shopify', 'WooCommerce', 'Home Depot', 'Inventory'],
  },
  {
    tag: 'Creative & Video Production',
    title: 'E-commerce & Brand Video Editing',
    description: 'High-converting social video reels, product showcase clips, color correction, and audio mastering using Premiere Pro and DaVinci Resolve.',
    metrics: 'Social Ready Exports',
    skills: ['Premiere Pro', 'DaVinci Resolve', 'CapCut', 'Photoshop'],
  },
];
