import { ContentRepository, PageFilter, PageSummary } from '../repositories/ContentRepository';
import { PageDocument, MediaItem, GlobalConfigurations } from '../types/schema';

const STORAGE_KEYS = {
  PAGES: 'wpbakery_cms_pages_v3',
  MEDIA: 'wpbakery_cms_media_v2',
  GLOBALS: 'wpbakery_cms_globals_v2',
};

// Initial Seed Pages matching our 3 Core Pages: Homepage, About, Work
const INITIAL_DEMO_PAGES: PageDocument[] = [
  // 1. HOMEPAGE
  {
    id: 'page_homepage',
    slug: 'homepage',
    title: 'Homepage',
    status: 'published',
    createdAt: new Date(Date.now() - 86400000 * 5).toISOString(),
    updatedAt: new Date().toISOString(),
    authorId: 'user_russell_01',
    authorName: 'Russell Taga-an',
    seo: {
      metaTitle: 'Russell Taga-an • E-Commerce Operations & Catalog Systems Specialist',
      metaDescription: 'Scale your e-commerce store with enterprise catalog matrices, TikTok Shop operations, and high-velocity 4-VA pod execution.',
      keywords: ['Shopify', 'TikTok Shop', 'Catalog Management', 'Operations', 'Home Depot'],
    },
    sections: [
      // Row 1: Hero Section (2 Columns: 3/5 + 2/5)
      {
        id: 'row_home_hero',
        type: 'row',
        settings: {
          layoutWidth: 'boxed',
          bgType: 'gradient',
          bgGradient: 'linear-gradient(135deg, rgba(224, 242, 254, 0.7) 0%, rgba(240, 249, 255, 0.95) 100%)',
          padding: { top: 36, bottom: 36, left: 20, right: 20 },
          margin: { top: 0, bottom: 20 },
          equalHeightColumns: true,
        },
        columns: [
          // Left Column (3/5)
          {
            id: 'col_home_hero_left',
            type: 'column',
            width: '3/5',
            settings: {
              verticalAlign: 'middle',
              textAlign: 'left',
              padding: { top: 12, bottom: 12, left: 16, right: 16 },
              margin: {},
            },
            elements: [
              {
                id: 'el_home_status_badge',
                type: 'statusBadge',
                settings: { alignment: 'left', margin: { bottom: 12 } },
                content: {
                  type: 'statusBadge',
                  data: {
                    text: '• Available for High-Growth DTC Brands & Multi-Channel Ops',
                    statusDotColor: '#0EA5E9',
                  },
                },
              },
              {
                id: 'el_home_heading',
                type: 'heading',
                settings: { alignment: 'left', margin: { bottom: 12 } },
                content: {
                  type: 'heading',
                  data: {
                    text: 'Scale Your E-Commerce Store.',
                    tag: 'h1',
                    fontSize: '4xl',
                    fontWeight: 'extrabold',
                    subtitle: 'E-Commerce Catalog Architecture & Store Operations',
                  },
                },
              },
              {
                id: 'el_home_subhead',
                type: 'richText',
                settings: { alignment: 'left', margin: { bottom: 20 } },
                content: {
                  type: 'richText',
                  data: {
                    html: '<p>E-Commerce & TikTok Shop Operations Specialist architecting enterprise catalog systems, high-compliance product launches, and end-to-end backend fulfillment across Shopify, TikTok Shop, and Home Depot.</p>',
                  },
                },
              },
              {
                id: 'el_home_cta',
                type: 'ctaButton',
                settings: { alignment: 'left', margin: { bottom: 20 } },
                content: {
                  type: 'ctaButton',
                  data: {
                    label: 'Deploy Operations Engine →',
                    url: '#contact',
                    style: 'primary',
                    size: 'lg',
                    subtext: 'Available for High-Growth DTC Brands • EST / PST / GMT Aligned',
                  },
                },
              },
              {
                id: 'el_home_stat_variants',
                type: 'statCounter',
                settings: { alignment: 'center', margin: { bottom: 10 } },
                content: {
                  type: 'statCounter',
                  data: {
                    value: '25K+',
                    label: 'Matrix Variants Built',
                    detail: 'Multi-attribute wood, tops & custom hardware',
                  },
                },
              },
              {
                id: 'el_home_stat_velocity',
                type: 'statCounter',
                settings: { alignment: 'center', margin: { bottom: 10 } },
                content: {
                  type: 'statCounter',
                  data: {
                    value: '400–600',
                    label: 'Daily SKU Velocity (4-VA Pod)',
                    detail: '4-VA execution pod with internal QA',
                  },
                },
              },
              {
                id: 'el_home_stat_rating',
                type: 'statCounter',
                settings: { alignment: 'center', margin: { bottom: 10 } },
                content: {
                  type: 'statCounter',
                  data: {
                    value: '4.8 ★',
                    label: 'TikTok Shop SPS Rating',
                    detail: 'SPS compliance, FBT & SLA fulfillment',
                  },
                },
              },
            ],
          },
          // Right Column (2/5)
          {
            id: 'col_home_hero_right',
            type: 'column',
            width: '2/5',
            settings: {
              verticalAlign: 'middle',
              textAlign: 'center',
              padding: { top: 12, bottom: 12, left: 12, right: 12 },
              margin: {},
            },
            elements: [
              {
                id: 'el_home_orbit',
                type: 'profileOrbit',
                settings: { alignment: 'center', margin: { bottom: 0 } },
                content: {
                  type: 'profileOrbit',
                  data: {
                    imageUrl: 'https://avatars.githubusercontent.com/u/121448425?v=4',
                    altText: 'Russell Taga-an - E-Commerce Specialist',
                    badges: [
                      { name: 'Shopify Plus' },
                      { name: 'TikTok Shop' },
                      { name: 'Home Depot US' },
                      { name: 'WooCommerce' },
                      { name: 'Zendrop' },
                      { name: 'CJ Dropshipping' },
                    ],
                  },
                },
              },
            ],
          },
        ],
      },
      // Row 2: Client Marquee / Tech Stack Bar
      {
        id: 'row_home_marquee',
        type: 'row',
        settings: {
          layoutWidth: 'boxed',
          bgType: 'none',
          padding: { top: 12, bottom: 24, left: 16, right: 16 },
          margin: { top: 0, bottom: 20 },
        },
        columns: [
          {
            id: 'col_home_marquee_full',
            type: 'column',
            width: '1/1',
            settings: {
              verticalAlign: 'top',
              textAlign: 'center',
              padding: { top: 4, bottom: 4, left: 4, right: 4 },
              margin: {},
            },
            elements: [
              {
                id: 'el_home_marquee',
                type: 'clientMarquee',
                settings: { alignment: 'center', margin: { top: 0, bottom: 0 } },
                content: {
                  type: 'clientMarquee',
                  data: {
                    title: 'Enterprise Multi-Channel Ecosystem & Technical Tooling',
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
                },
              },
            ],
          },
        ],
      },
    ],
  },

  // 2. ABOUT PAGE
  {
    id: 'page_about',
    slug: 'about',
    title: 'About',
    status: 'published',
    createdAt: new Date(Date.now() - 86400000 * 4).toISOString(),
    updatedAt: new Date().toISOString(),
    authorId: 'user_russell_01',
    authorName: 'Russell Taga-an',
    seo: {
      metaTitle: 'About Russell Taga-an | E-Commerce Specialist & Catalog Architect',
      metaDescription: 'Executive background, 25,000+ variant matrix architectures, and verified career milestones.',
      keywords: ['Russell Taga-an', 'Catalog Systems', 'Shopify Plus', 'TikTok Shop Operations'],
    },
    sections: [
      // Row 1: Profile & Header Intro (2 Columns: 1/3 + 2/3)
      {
        id: 'row_about_intro',
        type: 'row',
        settings: {
          layoutWidth: 'boxed',
          bgType: 'color',
          bgColor: '#FFFFFF',
          padding: { top: 32, bottom: 32, left: 24, right: 24 },
          margin: { top: 0, bottom: 20 },
        },
        columns: [
          // Left Column (1/3)
          {
            id: 'col_about_profile',
            type: 'column',
            width: '1/3',
            settings: {
              verticalAlign: 'top',
              textAlign: 'center',
              padding: { top: 12, bottom: 12, left: 12, right: 12 },
              margin: {},
            },
            elements: [
              {
                id: 'el_about_profile_card',
                type: 'profileCard',
                settings: { alignment: 'center', margin: { bottom: 12 } },
                content: {
                  type: 'profileCard',
                  data: {
                    imageUrl: 'https://avatars.githubusercontent.com/u/121448425?v=4',
                    name: 'Russell Taga-an',
                    caption: 'Operations & Catalog Systems Architect',
                  },
                },
              },
            ],
          },
          // Right Column (2/3)
          {
            id: 'col_about_narrative',
            type: 'column',
            width: '2/3',
            settings: {
              verticalAlign: 'top',
              textAlign: 'left',
              padding: { top: 12, bottom: 12, left: 16, right: 16 },
              margin: {},
            },
            elements: [
              {
                id: 'el_about_status_badge',
                type: 'statusBadge',
                settings: { alignment: 'left', margin: { bottom: 8 } },
                content: {
                  type: 'statusBadge',
                  data: {
                    text: '• Available for High-Growth DTC Brands & Multi-Channel Ops',
                    statusDotColor: '#0EA5E9',
                  },
                },
              },
              {
                id: 'el_about_heading',
                type: 'heading',
                settings: { alignment: 'left', margin: { bottom: 12 } },
                content: {
                  type: 'heading',
                  data: {
                    text: 'Executive Background & Systems Architecture',
                    tag: 'h2',
                    fontSize: '2xl',
                    fontWeight: 'extrabold',
                    subtitle: '4+ Years Systems & Catalog Leadership',
                  },
                },
              },
              {
                id: 'el_about_bio',
                type: 'richText',
                settings: { alignment: 'left', margin: { bottom: 16 } },
                content: {
                  type: 'richText',
                  data: {
                    html: '<p>I engineer high-efficiency backend operations and catalog architectures for 7-figure e-commerce brands. From configuring massive <strong>25,000+ variant matrices</strong> with multi-attribute logic (finishes, materials, custom specifications) for luxury brands like <strong>Willow Bath and Vanity</strong>, to maintaining rigorous compliance and a <strong>4.8/5.0 seller health score on TikTok Shop</strong>, I eliminate the catalog errors, listing rejections, and inventory bottlenecks that stall scale.</p>',
                  },
                },
              },
              {
                id: 'el_about_cta',
                type: 'ctaButton',
                settings: { alignment: 'left', margin: { bottom: 8 } },
                content: {
                  type: 'ctaButton',
                  data: {
                    label: 'Deploy Operations Engine →',
                    url: '#contact',
                    style: 'primary',
                    size: 'md',
                  },
                },
              },
            ],
          },
        ],
      },
      // Row 2: Verified Experience Timeline Cards
      {
        id: 'row_about_timeline',
        type: 'row',
        settings: {
          layoutWidth: 'boxed',
          bgType: 'none',
          padding: { top: 12, bottom: 28, left: 16, right: 16 },
          margin: { top: 0, bottom: 20 },
        },
        columns: [
          {
            id: 'col_about_timeline_full',
            type: 'column',
            width: '1/1',
            settings: {
              verticalAlign: 'top',
              textAlign: 'left',
              padding: { top: 8, bottom: 8, left: 8, right: 8 },
              margin: {},
            },
            elements: [
              {
                id: 'el_about_experience_timeline',
                type: 'experienceTimeline',
                settings: { alignment: 'left', margin: { bottom: 16 } },
                content: {
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
                },
              },
            ],
          },
        ],
      },
    ],
  },

  // 3. WORK PAGE
  {
    id: 'page_work',
    slug: 'work',
    title: 'Work',
    status: 'published',
    createdAt: new Date(Date.now() - 86400000 * 3).toISOString(),
    updatedAt: new Date().toISOString(),
    authorId: 'user_russell_01',
    authorName: 'Russell Taga-an',
    seo: {
      metaTitle: 'Client Work & Case Studies | Russell Taga-an',
      metaDescription: 'Featured systems, 25,000+ SKU variant matrices, and multi-channel deployments.',
      keywords: ['Case Studies', 'Shopify Plus', 'Home Depot', 'TikTok Shop'],
    },
    sections: [
      // Row 1: Work Intro & Architecture Filter Bar
      {
        id: 'row_work_header',
        type: 'row',
        settings: {
          layoutWidth: 'boxed',
          bgType: 'none',
          padding: { top: 24, bottom: 16, left: 16, right: 16 },
          margin: { top: 0, bottom: 16 },
        },
        columns: [
          {
            id: 'col_work_h',
            type: 'column',
            width: '1/1',
            settings: { verticalAlign: 'top', textAlign: 'center', padding: {}, margin: {} },
            elements: [
              {
                id: 'el_work_h1',
                type: 'heading',
                settings: { alignment: 'center', margin: { bottom: 8 } },
                content: {
                  type: 'heading',
                  data: {
                    text: 'Featured Systems & Catalog Deployments',
                    tag: 'h1',
                    fontSize: '3xl',
                    fontWeight: 'extrabold',
                    subtitle: 'Real-world operational architecture and catalog scale',
                  },
                },
              },
            ],
          },
        ],
      },
      // Row 2: 25K+ SKU Carousel / Case Studies Grid
      {
        id: 'row_work_showcase_grid',
        type: 'row',
        settings: {
          layoutWidth: 'boxed',
          bgType: 'none',
          padding: { top: 8, bottom: 32, left: 16, right: 16 },
          margin: { top: 0, bottom: 20 },
        },
        columns: [
          {
            id: 'col_work_showcase_full',
            type: 'column',
            width: '1/1',
            settings: { verticalAlign: 'top', textAlign: 'left', padding: {}, margin: {} },
            elements: [
              {
                id: 'el_work_showcase',
                type: 'workShowcase',
                settings: { alignment: 'left', margin: { bottom: 20 } },
                content: {
                  type: 'workShowcase',
                  data: {
                    headline: 'Verified Storefronts & Client Case Studies',
                    subhead: 'Enterprise catalog matrices, automated inventory reconciliation, and compliance operations.',
                    filters: ['All', 'Catalog Architecture', 'Marketplace Ops', 'Automation'],
                    projects: [
                      {
                        title: 'Willow Bath and Vanity Inc.',
                        client: 'Luxury Bathroom Vanities',
                        category: 'Catalog Architecture',
                        metrics: '25K+ Active SKUs',
                        description: 'Architected 25,000+ variant matrices with nested countertop cutouts, finishes, and custom hardware across Shopify, WooCommerce, and Home Depot US.',
                        tags: ['Shopify Plus', 'Home Depot US', 'Photoshop Batch', 'Metafields'],
                        imageUrl: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=800&q=80',
                        url: 'https://willowbathandvanity.com/',
                      },
                      {
                        title: 'DIYATIVE — 3D Mechanical Models',
                        client: 'Creative Crafts & Wooden DTC',
                        category: 'Marketplace Ops',
                        metrics: '4.8★ SPS Score',
                        description: 'Streamlined product catalog onboarding, lifestyle imagery, assembly guides, and automated inventory sync flat-files with full FBT replenishment.',
                        tags: ['TikTok Shop', 'FBT Fulfillment', 'Disputes', 'Automation'],
                        imageUrl: 'https://images.unsplash.com/photo-1513151233558-d860c5398176?auto=format&fit=crop&w=800&q=80',
                        url: 'https://diyative.com/',
                      },
                      {
                        title: 'Multi-Channel Inventory Automation',
                        client: 'Cross-Platform Retail Deployment',
                        category: 'Automation',
                        metrics: '3,000+ SKUs Synced',
                        description: 'Synchronized store management across Home Depot, Shopify, and WooCommerce with automated inventory reconciliation and rapid order fulfillment.',
                        tags: ['Shopify', 'WooCommerce', 'Home Depot', 'Inventory'],
                        imageUrl: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80',
                        url: 'https://willowbathandvanity.com/',
                      },
                      {
                        title: 'Skin by Brownlee & Co.',
                        client: 'Clinical Skincare DTC',
                        category: 'Marketplace Ops',
                        metrics: '4.8★ Health Score',
                        description: 'Engineered high-compliance TikTok Shop catalog, SPS health optimization, and FBT logistics dispatch for high-scrutiny supplements and topicals.',
                        tags: ['TikTok Shop', 'FBT Dispatch', 'Shopify Plus'],
                        imageUrl: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=800&q=80',
                        url: 'https://skinbybrownleeandco.com/',
                      },
                    ],
                  },
                },
              },
            ],
          },
        ],
      },
    ],
  },
];

const INITIAL_GLOBALS: GlobalConfigurations = {
  navigation: {
    items: [
      { id: 'nav_home', label: 'Home', path: '#home', isActive: true },
      { id: 'nav_about', label: 'About', path: '#about', isActive: true },
      { id: 'nav_work', label: 'Work', path: '#work', isActive: true },
    ],
    ctaButtonLabel: 'Hire me',
    ctaButtonLink: '#contact',
  },
  header: {
    logoTitle: 'Russell',
    logoSubtitle: 'Portfolio',
    showStatusIndicator: true,
    statusText: 'Available for Remote Roles',
    sticky: true,
  },
  footer: {
    copyrightText: '© 2026 Russell Taga-an • E-commerce Operations Manager & Catalog Systems Specialist',
    subtext: 'Built with WPBakery Modular CMS',
    showSocials: true,
    socialLinks: [
      { platform: 'Upwork', url: 'https://www.upwork.com/freelancers/~017d47884cc6a6c3ac' },
      { platform: 'GitHub', url: 'https://github.com/R-TAG22' },
    ],
  },
  contact: {
    email: 'tagaan01@gmail.com',
    phone: '+63 929 6937 829',
    location: 'Malabon City, Philippines',
    timezones: 'US (EST / PST) • UK (GMT) • AU (AEST)',
    upworkUrl: 'https://www.upwork.com/freelancers/~017d47884cc6a6c3ac',
    githubUrl: 'https://github.com/R-TAG22',
  },
  buttons: {
    primaryCtaLabel: 'Deploy Operations Engine',
    primaryCtaTarget: '#contact',
    secondaryCtaLabel: 'View Managed Storefronts',
    secondaryCtaTarget: '#work',
  },
  settings: {
    siteName: 'Russell Taga-an Portfolio',
    siteDescription: 'E-commerce & TikTok Shop Operations Specialist architecting enterprise catalog systems.',
    faviconUrl: '/favicon.ico',
    defaultOgImage: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200',
    maintenanceMode: false,
  },
};

const INITIAL_MEDIA_LIBRARY: MediaItem[] = [
  {
    id: 'media_dash_01',
    url: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=80',
    storagePath: 'media/operations_dashboard.jpg',
    fileName: 'operations_dashboard.jpg',
    mimeType: 'image/jpeg',
    size: 248920,
    width: 1200,
    height: 800,
    altText: 'E-commerce operations analytics dashboard',
    caption: 'Real-time multi-channel synchronization',
    createdAt: new Date().toISOString(),
  },
  {
    id: 'media_vanity_02',
    url: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=1200&q=80',
    storagePath: 'media/willow_bath_vanity.jpg',
    fileName: 'willow_bath_vanity.jpg',
    mimeType: 'image/jpeg',
    size: 312450,
    width: 1200,
    height: 900,
    altText: 'Willow Bath and Vanity custom marble vanity',
    caption: 'Luxury catalog matrix representation',
    createdAt: new Date().toISOString(),
  },
  {
    id: 'media_creative_03',
    url: 'https://images.unsplash.com/photo-1513151233558-d860c5398176?auto=format&fit=crop&w=1200&q=80',
    storagePath: 'media/diyative_assembly.jpg',
    fileName: 'diyative_assembly.jpg',
    mimeType: 'image/jpeg',
    size: 198420,
    width: 1200,
    height: 800,
    altText: 'DIYATIVE 3D wooden kit model',
    caption: 'Precision lifestyle product asset',
    createdAt: new Date().toISOString(),
  },
];

export class LocalStorageContentService implements ContentRepository {
  private inMemoryPages: PageDocument[] = [];
  private inMemoryMedia: MediaItem[] = [];
  private inMemoryGlobals: GlobalConfigurations = INITIAL_GLOBALS;

  constructor() {
    this.initStorage();
  }

  private initStorage(): void {
    if (typeof window === 'undefined') {
      this.inMemoryPages = [...INITIAL_DEMO_PAGES];
      this.inMemoryMedia = [...INITIAL_MEDIA_LIBRARY];
      this.inMemoryGlobals = { ...INITIAL_GLOBALS };
      return;
    }

    try {
      // Clean up legacy storage versions
      try {
        localStorage.removeItem('wpbakery_cms_pages_v1');
        localStorage.removeItem('wpbakery_cms_pages_v2');
      } catch {
        // ignore
      }

      const storedPages = localStorage.getItem(STORAGE_KEYS.PAGES);
      if (!storedPages) {
        localStorage.setItem(STORAGE_KEYS.PAGES, JSON.stringify(INITIAL_DEMO_PAGES));
        this.inMemoryPages = [...INITIAL_DEMO_PAGES];
      } else {
        const parsed = JSON.parse(storedPages);
        // Strictly filter out any removed pages (packages or faq)
        const sanitized = Array.isArray(parsed)
          ? parsed.filter((p: any) => p.slug !== 'packages' && p.slug !== 'faq')
          : [...INITIAL_DEMO_PAGES];
        this.inMemoryPages = sanitized.length > 0 ? sanitized : [...INITIAL_DEMO_PAGES];
        localStorage.setItem(STORAGE_KEYS.PAGES, JSON.stringify(this.inMemoryPages));
      }

      const storedMedia = localStorage.getItem(STORAGE_KEYS.MEDIA);
      if (!storedMedia) {
        localStorage.setItem(STORAGE_KEYS.MEDIA, JSON.stringify(INITIAL_MEDIA_LIBRARY));
        this.inMemoryMedia = [...INITIAL_MEDIA_LIBRARY];
      } else {
        this.inMemoryMedia = JSON.parse(storedMedia);
      }

      const storedGlobals = localStorage.getItem(STORAGE_KEYS.GLOBALS);
      if (!storedGlobals) {
        localStorage.setItem(STORAGE_KEYS.GLOBALS, JSON.stringify(INITIAL_GLOBALS));
        this.inMemoryGlobals = { ...INITIAL_GLOBALS };
      } else {
        this.inMemoryGlobals = JSON.parse(storedGlobals);
      }
    } catch {
      this.inMemoryPages = [...INITIAL_DEMO_PAGES];
      this.inMemoryMedia = [...INITIAL_MEDIA_LIBRARY];
      this.inMemoryGlobals = { ...INITIAL_GLOBALS };
    }
  }

  private persistPages(): void {
    if (typeof window !== 'undefined') {
      try {
        localStorage.setItem(STORAGE_KEYS.PAGES, JSON.stringify(this.inMemoryPages));
      } catch (err) {
        console.error('Failed to persist pages to localStorage', err);
      }
    }
  }

  private persistMedia(): void {
    if (typeof window !== 'undefined') {
      try {
        localStorage.setItem(STORAGE_KEYS.MEDIA, JSON.stringify(this.inMemoryMedia));
      } catch (err) {
        console.error('Failed to persist media to localStorage', err);
      }
    }
  }

  private persistGlobals(): void {
    if (typeof window !== 'undefined') {
      try {
        localStorage.setItem(STORAGE_KEYS.GLOBALS, JSON.stringify(this.inMemoryGlobals));
      } catch (err) {
        console.error('Failed to persist globals to localStorage', err);
      }
    }
  }

  async getPageBySlug(slug: string): Promise<PageDocument | null> {
    const page = this.inMemoryPages.find((p) => p.slug === slug);
    return page ? JSON.parse(JSON.stringify(page)) : null;
  }

  async getPageById(id: string): Promise<PageDocument | null> {
    const page = this.inMemoryPages.find((p) => p.id === id);
    return page ? JSON.parse(JSON.stringify(page)) : null;
  }

  async savePage(pageData: PageDocument): Promise<PageDocument> {
    const updatedPage: PageDocument = {
      ...pageData,
      updatedAt: new Date().toISOString(),
    };

    const existingIndex = this.inMemoryPages.findIndex((p) => p.id === pageData.id);
    if (existingIndex >= 0) {
      this.inMemoryPages[existingIndex] = updatedPage;
    } else {
      this.inMemoryPages.unshift(updatedPage);
    }

    this.persistPages();
    return JSON.parse(JSON.stringify(updatedPage));
  }

  async deletePage(pageId: string): Promise<boolean> {
    const initialLength = this.inMemoryPages.length;
    this.inMemoryPages = this.inMemoryPages.filter((p) => p.id !== pageId);
    if (this.inMemoryPages.length !== initialLength) {
      this.persistPages();
      return true;
    }
    return false;
  }

  async listPages(filter?: PageFilter): Promise<PageSummary[]> {
    let pages = [...this.inMemoryPages];

    if (filter?.status) {
      pages = pages.filter((p) => p.status === filter.status);
    }

    if (filter?.searchQuery) {
      const q = filter.searchQuery.toLowerCase();
      pages = pages.filter(
        (p) => p.title.toLowerCase().includes(q) || p.slug.toLowerCase().includes(q)
      );
    }

    if (filter?.limit) {
      pages = pages.slice(0, filter.limit);
    }

    return pages.map((p) => ({
      id: p.id,
      slug: p.slug,
      title: p.title,
      status: p.status,
      authorName: p.authorName,
      updatedAt: p.updatedAt,
      sectionCount: p.sections?.length || 0,
    }));
  }

  async uploadMedia(
    file: File | { name: string; type: string; base64: string; size: number }
  ): Promise<MediaItem> {
    let url = '';
    let fileName = '';
    let mimeType = 'image/jpeg';
    let size = 0;

    if ('base64' in file) {
      url = file.base64;
      fileName = file.name;
      mimeType = file.type;
      size = file.size;
    } else {
      fileName = file.name;
      mimeType = file.type;
      size = file.size;
      url = URL.createObjectURL(file);
    }

    const newMedia: MediaItem = {
      id: `media_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
      url,
      storagePath: `media/${Date.now()}_${fileName}`,
      fileName,
      mimeType,
      size,
      altText: fileName.replace(/\.[^/.]+$/, '').replace(/[-_]/g, ' '),
      caption: '',
      createdAt: new Date().toISOString(),
    };

    this.inMemoryMedia.unshift(newMedia);
    this.persistMedia();
    return newMedia;
  }

  async getMediaLibrary(): Promise<MediaItem[]> {
    return JSON.parse(JSON.stringify(this.inMemoryMedia));
  }

  async deleteMedia(mediaId: string): Promise<boolean> {
    const initialLen = this.inMemoryMedia.length;
    this.inMemoryMedia = this.inMemoryMedia.filter((m) => m.id !== mediaId);
    if (this.inMemoryMedia.length !== initialLen) {
      this.persistMedia();
      return true;
    }
    return false;
  }

  async getGlobals(): Promise<GlobalConfigurations> {
    return JSON.parse(JSON.stringify(this.inMemoryGlobals));
  }

  async saveGlobals(globals: Partial<GlobalConfigurations>): Promise<GlobalConfigurations> {
    this.inMemoryGlobals = {
      ...this.inMemoryGlobals,
      ...globals,
    };
    this.persistGlobals();
    return JSON.parse(JSON.stringify(this.inMemoryGlobals));
  }

  resetToDemo(): void {
    this.inMemoryPages = JSON.parse(JSON.stringify(INITIAL_DEMO_PAGES));
    this.inMemoryMedia = JSON.parse(JSON.stringify(INITIAL_MEDIA_LIBRARY));
    this.inMemoryGlobals = JSON.parse(JSON.stringify(INITIAL_GLOBALS));
    this.persistPages();
    this.persistMedia();
    this.persistGlobals();
  }
}
