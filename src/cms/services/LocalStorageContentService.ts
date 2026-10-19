import { ContentRepository, PageFilter, PageSummary } from '../repositories/ContentRepository';
import { PageDocument, MediaItem, GlobalConfigurations, BlogPost } from '../types/schema';

const STORAGE_KEYS = {
  PAGES: 'wpbakery_cms_pages_v3',
  MEDIA: 'wpbakery_cms_media_v2',
  GLOBALS: 'wpbakery_cms_globals_v2',
  BLOGS: 'wpbakery_cms_blogs_v2',
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
                        id: 'proj_gold_grove',
                        title: 'GOLD & GROVE',
                        client: 'Gold & Grove LLC',
                        subtitle: 'INTERNAL BLEMISH BLEND & SKIN-CLEARING BOTANICAL VITAMIN SUPPLEMENTS.',
                        domainUrl: 'goldandgrove.com',
                        category: 'Skin Nutrition & Wellness',
                        previewBadge: 'SKIN NUTRITION & WELLNESS',
                        metrics: '+220% Subscription Retention',
                        vitalsScore: '99/100 Core Vitals',
                        description: 'Re-engineered high-converting supplement subscription funnel with ingredient grounding and sub-600ms mobile PDPs.',
                        highlights: [
                          'Engineered custom Recharge recurring delivery portal with 1-click swap, delay, and bundle logic',
                          'Built transparent nutritional fact drawers with verified clinical ingredient citations',
                          'Reduced mobile checkout bounce rate by 34% through sticky slide-out cart drawer',
                        ],
                        tags: ['Shopify Plus', 'Recharge API', 'Tailwind CSS', '+1'],
                        imageUrl: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=1200&q=85',
                        url: 'https://goldandgrove.com/',
                        actionLabel: 'CASE STUDY',
                      },
                      {
                        id: 'proj_premium_trends',
                        title: 'PREMIUM TRENDS SHOP',
                        client: 'Premium Trends DTC',
                        subtitle: 'HIGH-VELOCITY CURATED TRENDING LIFESTYLE PRODUCTS & CONSUMER GOODS.',
                        domainUrl: 'premiumtrendsshop.store',
                        category: 'Curated Trends & DTC',
                        previewBadge: 'CURATED TRENDS & DTC',
                        metrics: '+195% Mobile Checkout Rate',
                        vitalsScore: '98/100 Lighthouse',
                        description: 'Engineered an ultra-lean dynamic catalog with instant search, sticky mobile quick-buy, and real-time social proof tags.',
                        highlights: [
                          'Sub-second algorithmic search indexing across thousands of seasonal trending SKUs',
                          'High-velocity checkout funnel optimized for TikTok & Instagram traffic surges',
                          'Automated multi-warehouse order routing and real-time shipping SLA notifications',
                        ],
                        tags: ['Modern React', 'Instant Search', 'Stripe Payments', '+1'],
                        imageUrl: 'https://images.unsplash.com/photo-1513151233558-d860c5398176?auto=format&fit=crop&w=1200&q=85',
                        url: 'https://premiumtrendsshop.store/',
                        actionLabel: 'CASE STUDY',
                      },
                      {
                        id: 'proj_rosemira',
                        title: 'ROSEMIRA ORGANICS',
                        client: 'Rosemira Botanicals',
                        subtitle: 'HANDCRAFTED CERTIFIED ORGANIC & VEGAN SKINCARE RITUALS FOR SENSITIVE SKIN.',
                        domainUrl: 'rosemira.com',
                        category: 'Doctor-Formulated Apothecary',
                        previewBadge: 'DOCTOR-FORMULATED APOTHECARY',
                        metrics: '+64% Average Order Value',
                        vitalsScore: '100/100 Best Practices',
                        description: 'Crafted a serene, tactile botanical digital apothecary with skin regimen builders and organic certification seals.',
                        highlights: [
                          'Interactive holistic routine builder guiding customers to customized multi-step regimens',
                          'Custom formulation transparency badges (USDA Organic, Leaping Bunny Cruelty-Free)',
                          'Elevated average order value through dynamic gift-with-purchase progress tiers',
                        ],
                        tags: ['Shopify Storefront', 'TypeScript', 'Tailwind', '+1'],
                        imageUrl: 'https://images.unsplash.com/photo-1571781926291-c477ebfd024b?auto=format&fit=crop&w=1200&q=85',
                        url: 'https://rosemira.com/',
                        actionLabel: 'CASE STUDY',
                      },
                      {
                        id: 'proj_haoma',
                        title: 'HAOMA EARTH',
                        client: 'Haoma Earth Inc.',
                        subtitle: 'PLANT-BASED SPIRITUS VITAE™ SKINCARE HONORING THE WISDOM OF AGING.',
                        domainUrl: 'haomaearth.com',
                        category: 'Holistic Luxury Botanicals',
                        previewBadge: 'HOLISTIC LUXURY BOTANICALS',
                        metrics: '+180% Conversion Rate',
                        vitalsScore: '99/100 Vitals',
                        description: 'Transformed an editorial beauty sanctuary with smooth fluid layout animations, botanical hero showcases, and luxury minimalist aesthetic.',
                        highlights: [
                          'Editorial luxury visual pacing paired with frictionless headless checkout flows',
                          'Subtle micro-animations and immersive full-bleed botanical ingredient storytelling',
                          'Custom wholesale B2B portal integration for high-end spa and boutique stockists',
                        ],
                        tags: ['Headless Shopify', 'Motion', 'Tailwind CSS', '+1'],
                        imageUrl: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=1200&q=85',
                        url: 'https://haomaearth.com/',
                        actionLabel: 'CASE STUDY',
                      },
                      {
                        id: 'proj_juice_beauty',
                        title: 'JUICE BEAUTY',
                        client: 'Juice Beauty',
                        subtitle: 'PIONEERING ORGANIC ANTIOXIDANT-RICH SKINCARE & CLEAN MAKEUP POWERHOUSE.',
                        domainUrl: 'juicebeauty.com',
                        category: 'Organic Clinical Skincare',
                        previewBadge: 'ORGANIC CLINICAL SKINCARE',
                        metrics: '+310% Page Speed Lift',
                        vitalsScore: '98/100 Mobile Vitals',
                        description: 'Rebuilt heavy legacy enterprise storefront into a high-octane modern platform with clinical before/after sliders and shade finders.',
                        highlights: [
                          'Architected modular component library decoupling bloated legacy enterprise plugins',
                          'Interactive clinical proof before-and-after image comparison sliders on key hero PDPs',
                          'Intelligent clean makeup foundation shade-matching finder tool with 94% quiz completion',
                        ],
                        tags: ['Enterprise Commerce', 'Hydrogen', 'GraphQL', '+1'],
                        imageUrl: 'https://images.unsplash.com/photo-1556228722-d0b7194f4c80?auto=format&fit=crop&w=1200&q=85',
                        url: 'https://juicebeauty.com/',
                        actionLabel: 'CASE STUDY',
                      },
                      {
                        id: 'proj_doctors_select',
                        title: "DOCTOR'S SELECT",
                        client: "Doctor's Select Footwear",
                        subtitle: 'USA-ENGINEERED MEDICAL GRADE COMPRESSION SOCKS & DIABETIC FOOT SUPPORT.',
                        domainUrl: 'doctorselect.us',
                        category: 'Medical & Compression Wellness',
                        previewBadge: 'MEDICAL & COMPRESSION WELLNESS',
                        metrics: '+142% Multi-Pack Volume',
                        vitalsScore: '100/100 Accessibility',
                        description: 'Engineered an accessible, high-contrast sizing calculator with automated multi-pack quantity bundle tiers.',
                        highlights: [
                          'WCAG AAA compliant high-contrast color palette and senior-friendly font scaling',
                          'Interactive calf & shoe size calculator eliminating sizing return inquiries by 48%',
                          'Automated 3-pack, 6-pack, and 12-pack quantity bundle tiers with dynamic volume discounts',
                        ],
                        tags: ['React', 'Accessible UI', 'Shopify Storefront', '+1'],
                        imageUrl: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=1200&q=85',
                        url: 'https://doctorselect.us/',
                        actionLabel: 'CASE STUDY',
                      },
                      {
                        id: 'proj_willow_bath',
                        title: 'Willow Bath and Vanity Inc.',
                        client: 'Willow Bath & Vanity Inc.',
                        subtitle: 'Luxury Bathroom Vanities & Multi-Channel Ops',
                        domainUrl: 'willowbathandvanity.com',
                        category: 'Luxury Catalog Architecture',
                        previewBadge: 'LUXURY BATHROOM CATALOG',
                        metrics: '25,000+ Active SKUs',
                        vitalsScore: '99/100 Core Vitals',
                        description: 'Architected 25,000+ variant matrices with nested countertop cutouts, finishes, and custom hardware logic across Shopify, WooCommerce, and Home Depot US with automated inventory flat-files.',
                        highlights: [
                          'Architected 25,000+ variant matrices with nested countertop cutouts, finishes, and custom hardware logic across Shopify and Home Depot',
                          'Engineered bulk CSV ingestion pipelines eradicating catalog drift across 3 retail channels',
                          'Directed batch Photoshop actions producing pristine pure-white product cutouts and dimensional schematics',
                        ],
                        tags: ['Shopify Plus', 'Home Depot US', 'Photoshop Batch', 'Metafields', 'FBT Logistics'],
                        imageUrl: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=1200&q=85',
                        galleryImages: [
                          {
                            id: 'g_wb_1',
                            url: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=1400&q=85',
                            caption: 'Luxury Double Vanity & Master Suite Catalog Overview',
                            altText: 'Showroom Suite Proof',
                          },
                          {
                            id: 'g_wb_2',
                            url: 'https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?auto=format&fit=crop&w=1400&q=85',
                            caption: 'Freestanding Modern Vanity Detail & Brushed Brass Hardware Matrix',
                            altText: 'Hardware Finish Variant Matrix',
                          },
                          {
                            id: 'g_wb_3',
                            url: 'https://images.unsplash.com/photo-1507652313519-d4e9174996dd?auto=format&fit=crop&w=1400&q=85',
                            caption: '25,000+ SKU Variant Matrix Architecture & Metafields Flat-File Schema',
                            altText: 'Catalog Architecture Proof',
                          },
                          {
                            id: 'g_wb_4',
                            url: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1400&q=85',
                            caption: 'Home Depot US & Shopify Bulk Ingestion Inventory Pipeline',
                            altText: 'Multi-Channel Inventory Proof',
                          },
                        ],
                        url: 'https://willowbathandvanity.com/',
                        actionLabel: 'CASE STUDY',
                      },
                      {
                        id: 'proj_diyative',
                        title: 'DIYATIVE — 3D MODELS',
                        client: 'DIYATIVE Brand',
                        subtitle: '3D MECHANICAL WOODEN KITS, TIKTOK SHOP ONBOARDING & FBT DISPATCH.',
                        domainUrl: 'diyative.com',
                        category: 'Curated Trends & DTC',
                        previewBadge: 'TIKTOK SHOP & FBT LOGISTICS',
                        metrics: '4.8★ SPS Score',
                        vitalsScore: '98/100 FBT Health',
                        description: 'High-compliance TikTok Shop product catalog onboarding, FBT logistics setup, lifestyle media, and automated inventory sync flat-files.',
                        highlights: [
                          'Streamlined catalog onboarding and compliance documentation for 100% listing approvals',
                          'Orchestrated FBT (Fulfilled by TikTok) inbound replenishment maintaining 4.8★ SPS score',
                          'Resolved chargeback disputes and managed affiliate creator sample dispatch workflows',
                        ],
                        tags: ['TikTok Shop', 'FBT Logistics', 'Disputes', '+2'],
                        imageUrl: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=1200&q=85',
                        url: 'https://diyative.com/',
                        actionLabel: 'CASE STUDY',
                      },
                      {
                        id: 'proj_naturezway',
                        title: 'NATUREZWAY',
                        client: 'NatureZway Eco Products',
                        subtitle: 'SUSTAINABLE BAMBOO CLEANING & ZERO-PLASTIC REFILL SYSTEMS.',
                        domainUrl: 'naturezway.com',
                        category: 'Curated Trends & DTC',
                        previewBadge: 'ECO-FRIENDLY HOME GOODS',
                        metrics: '+88% Reorder Rate',
                        vitalsScore: '99/100 Core Vitals',
                        description: 'Optimized multi-pack subscription bundling and eco-impact calculator reducing bounce rate on high-volume SKU landing pages.',
                        highlights: [
                          'Custom eco-savings dashboard calculating plastic bottles saved per recurring order',
                          'Dynamic subscription bundle builder with flexible delivery cadence preferences',
                          'Optimized product landing pages driving 22% conversion lift on paid search traffic',
                        ],
                        tags: ['Shopify Plus', 'Recharge', 'Subscription Logic', '+1'],
                        imageUrl: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&w=1200&q=85',
                        url: 'https://naturezway.com/',
                        actionLabel: 'CASE STUDY',
                      },
                      {
                        id: 'proj_coalition_la',
                        title: 'COALITION LA',
                        client: 'Coalition LA Outerwear',
                        subtitle: 'TREND-FORWARD CRUELTY-FREE OUTERWEAR & CONTEMPORARY READY-TO-WEAR.',
                        domainUrl: 'coalitionla.com',
                        category: 'Contemporary Apparel',
                        previewBadge: 'VEGAN LEATHER APPAREL',
                        metrics: '+175% Catalog Velocity',
                        vitalsScore: '98/100 Lighthouse',
                        description: 'Architected fast-fashion matrix catalogs, real-time pre-order inventory logic, and high-res garment swatch selectors.',
                        highlights: [
                          'Configured nested colorway swatches and multi-angle product photography zooming',
                          'Automated inventory restock notification flows in Klaviyo capturing high pre-order demand',
                          'Bulk flat-file management for seasonal line releases across hundreds of style SKUs',
                        ],
                        tags: ['Shopify Plus', 'Variant Matrices', 'Klaviyo', '+1'],
                        imageUrl: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=1200&q=85',
                        url: 'https://coalitionla.com/',
                        actionLabel: 'CASE STUDY',
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
    connectSocials: {
      enabled: true,
      flipIntervalSec: 1.0,
      items: [
        {
          id: 'c_gmail',
          letter: 'C',
          platform: 'gmail',
          label: 'Gmail',
          url: 'mailto:tagaan01@gmail.com',
          color: '#EA4335',
          bgColor: '#FEF2F2',
          enabled: true,
        },
        {
          id: 'o_fb',
          letter: 'O',
          platform: 'facebook',
          label: 'Facebook',
          url: 'https://facebook.com/russell.tagaan',
          color: '#1877F2',
          bgColor: '#EFF6FF',
          enabled: true,
        },
        {
          id: 'n_insta',
          letter: 'N',
          platform: 'instagram',
          label: 'Instagram',
          url: 'https://instagram.com/russ_tag',
          color: '#E4405F',
          bgColor: '#FDF2F8',
          enabled: true,
        },
        {
          id: 'n_linkedin',
          letter: 'N',
          platform: 'linkedin',
          label: 'LinkedIn',
          url: 'https://www.linkedin.com/in/russell-tagaan',
          color: '#0A66C2',
          bgColor: '#F0F9FF',
          enabled: true,
        },
        {
          id: 'e_whatsapp',
          letter: 'E',
          platform: 'whatsapp',
          label: 'WhatsApp',
          url: 'https://wa.me/639296937829',
          color: '#25D366',
          bgColor: '#F0FDF4',
          enabled: true,
        },
        {
          id: 'c_threads',
          letter: 'C',
          platform: 'threads',
          label: 'Threads',
          url: 'https://threads.net/@russell.tagaan',
          color: '#000000',
          bgColor: '#F8FAFC',
          enabled: true,
        },
        {
          id: 't_github',
          letter: 'T',
          platform: 'github',
          label: 'GitHub',
          url: 'https://github.com/R-TAG22',
          color: '#24292F',
          bgColor: '#F1F5F9',
          enabled: true,
        },
      ],
    },
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

const INITIAL_DEMO_BLOGS: BlogPost[] = [
  {
    id: 'blog_1',
    slug: 'architecting-25k-sku-variant-matrices',
    title: 'Architecting 25,000+ SKU Variant Matrices on Shopify Plus & Home Depot US',
    subtitle: 'Hierarchical Matrix Logic, Nested Countertop Cutouts, and Automated CSV Sync',
    excerpt: 'How we engineered a 3-tier variant architecture across finishes, sizes, and countertop sink cutouts, eradicating SKU collision and multi-channel inventory desync.',
    coverImage: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=1600&q=85',
    category: 'Catalog Architecture',
    tags: ['Shopify Plus', 'Home Depot US', 'Variant Matrix', 'Metafields'],
    authorName: 'Russell Taga-an',
    authorRole: 'Lead E-Commerce Operations & Catalog Architect',
    authorAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=256&q=80',
    publishedAt: '2026-03-24',
    readTime: '8 min read',
    featured: true,
    status: 'published',
    viewsCount: 1420,
    content: `### The Challenge: Beyond the 100-Variant Limit

When managing luxury bathroom vanity lines—such as Willow Bath and Vanity Inc.—a single vanity style often comes in:
- 5 Widths (30", 36", 48", 60" Single, 72" Double)
- 4 Base Finishes (Matte White, Midnight Navy, Natural Oak, Charcoal Gray)
- 6 Countertop Stone Profiles (Calacatta Gold, Carrara White, Solid Quartz, Nero Marquina)
- 3 Hardware Metals (Brushed Brass, Matte Black, Polished Chrome)
- 2 Sink Cutout Types (Undermount Oval, Rectangular Vessel)

Multiplying these parameters yields **720 discrete purchase combinations per vanity collection**, far surpassing Shopify’s native limit of 100 variants per product handle. Furthermore, Home Depot US EDI feeds demand strict flat-file hierarchy codes and exact dimension cutouts.

### The Architectural Blueprint

To solve this without sacrificing user experience or breaking wholesale EDI sync, we devised a decoupled variant architecture:

1. **Parent-Child Product Partitioning**: Rather than bundling all permutations under one bloated handle, we split collections by primary Finish while binding them via custom namespace metafields (\`custom.collection_swatches\`).
2. **Dynamic Cutout & Hardware Combiners**: Countertops and Hardware kits are mapped as linked child inventory lines that dynamically reserve and deduct real-time stock upon order placement.
3. **Automated Flat-File Generators**: Daily cron scripts parse the Shopify master matrix and automatically emit Home Depot compliant XML/CSV sheets, validating UPCs, case weights, and freight classifications.

> "A scalable catalog matrix isn't just about entering product descriptions; it is the financial and operational backbone connecting your warehouse logistics to retail marketplaces."

### Key Metrics & Tangible Outcomes
- **25,000+ Active SKUs** maintained with zero catalog drift over 18 months.
- **-94% Catalog Drift**: Eradicated incorrect SKU drops and fulfillment mismatch errors.
- **+180% Velocity Lift**: Customers configure their dream vanity with real-time stock confirmation in under 3 clicks.`,
  },
  {
    id: 'blog_2',
    slug: 'zero-latency-multi-channel-inventory',
    title: 'Zero-Latency Multi-Channel Inventory Synchronization Across 3 Retail Marketplaces',
    subtitle: 'Event-Driven Webhook Relays and Safety Buffer Thresholds',
    excerpt: 'Preventing overselling and chargebacks during high-volume flash sales across Shopify Plus, Home Depot, and TikTok Shop with real-time stock allocation.',
    coverImage: 'https://images.unsplash.com/photo-1553413077-190dd305871c?auto=format&fit=crop&w=1600&q=85',
    category: 'Marketplace Operations',
    tags: ['Inventory Sync', 'EDI Pipelines', 'Shopify Plus', 'FBT Logistics'],
    authorName: 'Russell Taga-an',
    authorRole: 'Lead E-Commerce Operations & Catalog Architect',
    authorAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=256&q=80',
    publishedAt: '2026-02-18',
    readTime: '6 min read',
    featured: false,
    status: 'published',
    viewsCount: 980,
    content: `### The Multi-Channel Stock Dilemma

When products are listed concurrently across retail partners, a flash spike on TikTok Shop can exhaust inventory before the warehouse ERP propagates stock levels to Home Depot or Shopify. This leads to backorders, cancellation penalties, and suppressed merchant scorecards.

### The Safety Buffer & Event Pipeline

We engineered a resilient multi-tier inventory buffer model:

- **Virtual Stock Buffers**: High-velocity SKUs maintain an automated 5-unit safety ceiling. When stock dips below 5 units, secondary channels are temporarily throttled while the primary direct-to-consumer store finishes clearing remaining units.
- **Webhook-Triggered Micro-Updates**: Instead of batch polling every 60 minutes, order creation webhooks trigger instantaneous delta recalculations broadcast to all channel APIs within 800 milliseconds.
- **Automated Restock Forecasts**: Lead-time calculations dynamically adjust marketplace backorder availability flags based on container transit manifests.

### Results
- Zero out-of-stock cancellation penalties across 24 consecutive months.
- 99.8% on-time marketplace fulfillment rate.`,
  },
  {
    id: 'blog_3',
    slug: 'automating-photoshop-batch-product-schematics',
    title: 'Automating 300 DPI Pure-White Product Schematics with Photoshop Batch Actions',
    subtitle: 'Processing 14,000 Architectural Renders with Zero Manual Clipping',
    excerpt: 'How we standardized batch actions, color-profile scripts, and dimension line overlays to generate pristine Home Depot compliant assets at massive scale.',
    coverImage: 'https://images.unsplash.com/photo-1542744094-3a31f272c490?auto=format&fit=crop&w=1600&q=85',
    category: 'Asset Automation',
    tags: ['Photoshop Batch', '300 DPI', 'Asset Pipeline', 'Retail Compliance'],
    authorName: 'Russell Taga-an',
    authorRole: 'Lead E-Commerce Operations & Catalog Architect',
    authorAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=256&q=80',
    publishedAt: '2026-01-12',
    readTime: '5 min read',
    featured: false,
    status: 'published',
    viewsCount: 1250,
    content: `### Retail Portal Compliance Standards

Major enterprise retailers like Home Depot and Wayfair maintain non-negotiable asset standards:
1. Pure #FFFFFF RGB background on primary angle images.
2. Minimum 3000x3000px at 300 DPI resolution.
3. Precise 85% frame fill ratio with consistent drop-shadow physics.
4. Exact dimensional measurement schematics for plumbing cutouts.

### Scripted Asset Pipeline

Rather than having designers manually pen-tool thousands of bathroom vanity renders, we created automated Photoshop droplets and JavaScript ExtendScript workflows:
- Automated contrast threshold detection and soft feathering.
- Auto-centering and margin expansion adhering to 10% bounding borders.
- Layered SVG dimension callout insertions driven directly from CSV measurement attributes.

### Production Velocity
- 14,000+ assets rendered and published in under 48 hours.
- 100% first-pass acceptance rate through the Home Depot supplier portal.`,
  },
  {
    id: 'blog_4',
    slug: 'headless-hydrogen-vs-liquid-core-vitals',
    title: 'Headless Hydrogen vs. Liquid: Achieving 99/100 Core Web Vitals on Heavy Catalogs',
    subtitle: 'Decoupling Heavy App Scripts and Optimizing Mobile Conversion Velocity',
    excerpt: 'A technical evaluation of moving enterprise storefronts to headless architectures to reduce Time-to-Interactive from 4.2s down to 0.7s.',
    coverImage: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1600&q=85',
    category: 'Storefront Tech',
    tags: ['React', 'Headless Commerce', 'Next.js', 'Core Web Vitals'],
    authorName: 'Russell Taga-an',
    authorRole: 'Lead E-Commerce Operations & Catalog Architect',
    authorAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=256&q=80',
    publishedAt: '2025-11-30',
    readTime: '7 min read',
    featured: false,
    status: 'published',
    viewsCount: 1680,
    content: `### The Monolithic Liquid Bottleneck

As stores scale, marketing teams install 20+ Shopify apps: reviews, upsells, wishlist popups, live chat, and currency converters. Each app injects render-blocking JavaScript, driving mobile Google PageSpeed scores down into the red (20-35/100).

### The Modern Headless Architecture

By adopting a headless approach with React and modern edge CDNs:
- **Zero Third-Party Script Pollution**: Apps run through secure server-side GraphQL proxies instead of polluting the client DOM.
- **Optimistic UI Cart Transitions**: Adding items to cart or switching variant swatches happens instantly with zero layout shifts (CLS 0.00).
- **Static Edge Pre-rendering**: Product detail pages for top-converting collections are pre-rendered at the CDN edge with sub-100ms response times.

### The Conversion Impact
- Mobile PageSpeed lifted from 28 to **99/100**.
- Conversion rate increased by +34% within the first 60 days post-launch.`,
  },
];

export class LocalStorageContentService implements ContentRepository {
  private inMemoryPages: PageDocument[] = [];
  private inMemoryMedia: MediaItem[] = [];
  private inMemoryGlobals: GlobalConfigurations = INITIAL_GLOBALS;
  private inMemoryBlogs: BlogPost[] = [];

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
        try {
          const parsedGlobals = JSON.parse(storedGlobals);
          if (!parsedGlobals.footer?.connectSocials || !Array.isArray(parsedGlobals.footer.connectSocials.items)) {
            parsedGlobals.footer = {
              ...parsedGlobals.footer,
              connectSocials: INITIAL_GLOBALS.footer.connectSocials,
            };
            localStorage.setItem(STORAGE_KEYS.GLOBALS, JSON.stringify(parsedGlobals));
          }
          this.inMemoryGlobals = parsedGlobals;
        } catch {
          this.inMemoryGlobals = { ...INITIAL_GLOBALS };
        }
      }

      const storedBlogs = localStorage.getItem(STORAGE_KEYS.BLOGS);
      if (!storedBlogs) {
        localStorage.setItem(STORAGE_KEYS.BLOGS, JSON.stringify(INITIAL_DEMO_BLOGS));
        this.inMemoryBlogs = [...INITIAL_DEMO_BLOGS];
      } else {
        try {
          const parsedBlogs = JSON.parse(storedBlogs);
          this.inMemoryBlogs = Array.isArray(parsedBlogs) && parsedBlogs.length > 0 ? parsedBlogs : [...INITIAL_DEMO_BLOGS];
        } catch {
          this.inMemoryBlogs = [...INITIAL_DEMO_BLOGS];
        }
      }
    } catch {
      this.inMemoryPages = [...INITIAL_DEMO_PAGES];
      this.inMemoryMedia = [...INITIAL_MEDIA_LIBRARY];
      this.inMemoryGlobals = { ...INITIAL_GLOBALS };
      this.inMemoryBlogs = [...INITIAL_DEMO_BLOGS];
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
        window.dispatchEvent(new CustomEvent('content_service_globals_updated', { detail: this.inMemoryGlobals }));
      } catch (err) {
        console.error('Failed to persist globals to localStorage', err);
      }
    }
  }

  private persistBlogs(): void {
    if (typeof window !== 'undefined') {
      try {
        localStorage.setItem(STORAGE_KEYS.BLOGS, JSON.stringify(this.inMemoryBlogs));
      } catch (err) {
        console.error('Failed to persist blogs to localStorage', err);
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

  async getBlogs(): Promise<BlogPost[]> {
    return JSON.parse(JSON.stringify(this.inMemoryBlogs));
  }

  async getBlogBySlug(slug: string): Promise<BlogPost | null> {
    const found = this.inMemoryBlogs.find((b) => b.slug === slug);
    return found ? JSON.parse(JSON.stringify(found)) : null;
  }

  async saveBlog(blog: BlogPost): Promise<BlogPost> {
    const updatedBlog: BlogPost = {
      ...blog,
      id: blog.id || `blog_${Date.now()}`,
    };
    const existingIndex = this.inMemoryBlogs.findIndex((b) => b.id === updatedBlog.id || b.slug === updatedBlog.slug);
    if (existingIndex >= 0) {
      this.inMemoryBlogs[existingIndex] = updatedBlog;
    } else {
      this.inMemoryBlogs.unshift(updatedBlog);
    }
    this.persistBlogs();
    return JSON.parse(JSON.stringify(updatedBlog));
  }

  async deleteBlog(id: string): Promise<boolean> {
    const initialLen = this.inMemoryBlogs.length;
    this.inMemoryBlogs = this.inMemoryBlogs.filter((b) => b.id !== id);
    if (this.inMemoryBlogs.length !== initialLen) {
      this.persistBlogs();
      return true;
    }
    return false;
  }

  resetToDemo(): void {
    this.inMemoryPages = JSON.parse(JSON.stringify(INITIAL_DEMO_PAGES));
    this.inMemoryMedia = JSON.parse(JSON.stringify(INITIAL_MEDIA_LIBRARY));
    this.inMemoryGlobals = JSON.parse(JSON.stringify(INITIAL_GLOBALS));
    this.inMemoryBlogs = JSON.parse(JSON.stringify(INITIAL_DEMO_BLOGS));
    this.persistPages();
    this.persistMedia();
    this.persistGlobals();
    this.persistBlogs();
  }
}
