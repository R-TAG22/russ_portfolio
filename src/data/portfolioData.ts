import { JobExperience, ProjectItem, ServiceItem } from '../types';

export const PERSONAL_INFO = {
  name: 'Russell Taga-an',
  shortName: 'Russell',
  role: 'E-commerce Virtual Assistant & Specialist',
  email: 'tagaan01@gmail.com',
  phone: '+63 929 6937 829',
  location: 'Malabon City, Philippines',
  status: 'Available for Remote Work',
  availabilityDetails: 'Full-time & Part-time — EST, PST, GMT & AEST',
  avatarUrl: 'https://avatars.githubusercontent.com/u/121448425?v=4',
  resumePdfUrl: 'https://r-tag22.github.io/my_personal_site/Russell-T-Resume.pdf',
  githubUrl: 'https://github.com/R-TAG22',
  upworkUrl: 'https://www.upwork.com/freelancers/~017d47884cc6a6c3ac',
  portfolioSiteUrl: 'https://r-tag22.github.io/my_personal_site/index.html',
  intro:
    'E-commerce Virtual Assistant with 4+ years of experience in Shopify & WooCommerce. Specializing in product listings, inventory management, and daily store operations.',
  summary:
    'Detail-oriented Virtual Assistant experienced in data management, lead generation, Shopify, WooCommerce and Home Depot product uploading. Skilled in structured workflows, quality checks, spreadsheets, and creative editing for remote e-commerce teams.',
  internet: 'Converge Fiber 200 Mbps + Smart 5G backup',
  equipment: 'MacBook Air M1, Windows PC, dual monitors, headset & HD webcam',
  languages: [
    { lang: 'English', level: 'Fluent' },
    { lang: 'Filipino', level: 'Native' },
  ],
};

export const METRICS = [
  { id: 'exp', value: '4+', label: 'Years Experience', detail: 'Shopify, WooCommerce, Home Depot' },
  { id: 'products', value: '3K+', label: 'Products Managed', detail: 'Catalog cleanup, metafields, SEO' },
  { id: 'remote', value: '100%', label: 'Remote Ready', detail: '200Mbps Fiber + 5G Backup' },
];

export const CORE_SKILLS = [
  'Shopify',
  'WooCommerce',
  'Home Depot',
  'WordPress',
  'Product Listings',
  'Inventory Management',
  'Order Fulfillment',
  'SEO & Metafields',
  'Adobe Photoshop',
  'Canva',
  'Premiere Pro',
  'DaVinci Resolve',
  'CapCut',
  'ChatGPT / AI Tools',
  'Google Sheets & Excel',
  'Customer Support',
  'Data Entry',
];

export const SERVICES: ServiceItem[] = [
  {
    title: 'Store & Catalog Management',
    description: 'Products, variants, collections, inventory, metafields, and day-to-day store operations on Shopify & WooCommerce.',
    iconName: 'ShoppingBag',
    tags: ['Shopify', 'WooCommerce', 'Home Depot', 'Inventory'],
  },
  {
    title: 'Product Content & SEO',
    description: 'Accurate titles, optimized descriptions, SEO fields, image preparation in Photoshop, and structured product data formatting.',
    iconName: 'FileText',
    tags: ['SEO', 'Photoshop', 'Metafields', 'Image Cleanup'],
  },
  {
    title: 'Operations & Customer Support',
    description: 'Order processing, non-voice customer support, supplier coordination, and spreadsheet tracking.',
    iconName: 'Headphones',
    tags: ['Order Fulfillment', 'Google Sheets', 'Support', 'Trello'],
  },
  {
    title: 'Creative Media & Video Editing',
    description: 'Social video clips, promotional reels, photo enhancement, color grading, and audio syncing.',
    iconName: 'Video',
    tags: ['Premiere Pro', 'DaVinci Resolve', 'CapCut', 'Canva'],
  },
];

export const EXPERIENCES: JobExperience[] = [
  {
    title: 'E-commerce Virtual Assistant / Product Uploader',
    company: 'Willow Bath and Vanity Inc.',
    period: 'Feb 2022 — Apr 2026',
    featured: true,
    bullets: [
      'Uploaded and managed hundreds of products across Home Depot, WooCommerce and Shopify.',
      'Maintained accurate titles, descriptions, pricing, product details and variations.',
      'Edited and optimized product images in Adobe Photoshop for web and e-commerce use.',
      'Organized bulk product data, specifications, and images with consistent formatting.',
      'Performed strict quality checks on product details, images, specifications, and categories.',
      'Supported structured product-page workflows with a strong focus on accuracy.',
    ],
  },
  {
    title: 'Videographer / Video Editor',
    company: 'Freelance Creative',
    period: '2023 — Present',
    bullets: [
      'Filmed and edited wedding prenup videos and social-ready commercial clips.',
      'Handled color grading, audio syncing, transitions, sound effects, and final exports.',
      'Managed raw footage organization and swift client delivery workflows.',
    ],
  },
  {
    title: 'E-commerce Virtual Assistant',
    company: 'GekkoMultimedia',
    period: 'May 2021 — Sep 2021',
    bullets: [
      'Managed product listings, details, pricing, tags, and promotional images.',
      'Assisted with marketing campaigns and promotional content creation.',
      'Handled non-voice customer support tickets and order concerns.',
      'Processed customer orders and maintained organized inventory records.',
    ],
  },
  {
    title: 'Data Entry Assistant',
    company: 'Mobile Home Park Research — Remote Client',
    period: '2019 — 2021',
    bullets: [
      'Researched property owners, verified contact details and company corporate filings.',
      'Verified business records through public records and Secretary of State databases.',
      'Maintained large structured datasets in spreadsheets with consistent formatting.',
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
