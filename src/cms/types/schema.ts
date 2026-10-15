/**
 * WPBakery-style Headless CMS Data Schemas
 * Firestore & NoSQL Document Compatible
 */

export type PageStatus = 'draft' | 'published' | 'archived';

export type ColumnWidth = 
  | '1/1' 
  | '1/2' 
  | '1/3' 
  | '2/3' 
  | '1/4' 
  | '3/4'
  | '3/5'
  | '2/5'
  | '1/5'
  | '4/5';

export type ElementType = 
  | 'heading' 
  | 'richText' 
  | 'image' 
  | 'gallery' 
  | 'ctaButton' 
  | 'showcaseCard' 
  | 'statCounter'
  | 'statusBadge'
  | 'profileOrbit'
  | 'clientMarquee'
  | 'profileCard'
  | 'experienceTimeline'
  | 'workShowcase'
  | 'customHtml';

export interface FirestoreTimestamp {
  seconds: number;
  nanoseconds: number;
}

export type TimestampField = string | number | FirestoreTimestamp;

export interface PageSEO {
  metaTitle: string;
  metaDescription: string;
  ogImage?: string;
  keywords?: string[];
  canonicalUrl?: string;
}

export interface BoxSpacing {
  top?: number | string;
  bottom?: number | string;
  left?: number | string;
  right?: number | string;
}

export interface RowSettings {
  layoutWidth: 'boxed' | 'full';
  bgType: 'none' | 'color' | 'gradient' | 'image';
  bgColor?: string;
  bgGradient?: string;
  bgImageUrl?: string;
  padding: BoxSpacing;
  margin: BoxSpacing;
  customClass?: string;
  equalHeightColumns?: boolean;
}

export interface ColumnSettings {
  verticalAlign: 'top' | 'middle' | 'bottom';
  textAlign: 'left' | 'center' | 'right';
  padding: BoxSpacing;
  margin: BoxSpacing;
  bgColor?: string;
  borderRadius?: number;
  customClass?: string;
}

export interface ElementSettings {
  alignment?: 'left' | 'center' | 'right';
  padding?: BoxSpacing;
  margin?: BoxSpacing;
  customClass?: string;
  textColor?: string;
  bgColor?: string;
}

// ---------------- Element Specific Content Interfaces ----------------

export interface HeadingContent {
  text: string;
  tag: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
  fontSize?: 'sm' | 'base' | 'lg' | 'xl' | '2xl' | '3xl' | '4xl' | '5xl';
  fontWeight?: 'normal' | 'medium' | 'semibold' | 'bold' | 'extrabold';
  subtitle?: string;
}

export interface RichTextContent {
  html: string;
}

export interface ImageContent {
  url: string;
  altText: string;
  caption?: string;
  width?: string | number;
  height?: string | number;
  aspectRatio?: 'auto' | '1/1' | '4/3' | '16/9' | '21/9';
  borderRadius?: number;
  shadow?: 'none' | 'sm' | 'md' | 'lg' | 'xl';
  linkUrl?: string;
}

export interface GalleryItem {
  id: string;
  url: string;
  altText: string;
  title?: string;
}

export interface GalleryContent {
  items: GalleryItem[];
  columns: 2 | 3 | 4;
  gap: 'sm' | 'md' | 'lg';
  aspectRatio: '1/1' | '4/3' | '16/9';
}

export interface CtaButtonContent {
  label: string;
  url: string;
  style: 'primary' | 'secondary' | 'outline' | 'gradient';
  size: 'sm' | 'md' | 'lg';
  openInNewTab?: boolean;
  iconName?: string;
  subtext?: string;
}

export interface ShowcaseCardContent {
  title: string;
  category: string;
  description: string;
  priceOrMetric: string;
  imageUrl: string;
  badges: string[];
  ctaText?: string;
  ctaUrl?: string;
}

export interface StatCounterContent {
  value: string;
  label: string;
  detail?: string;
  trend?: string;
}

export interface StatusBadgeContent {
  text: string;
  statusDotColor?: string;
  subtle?: boolean;
}

export interface ProfileOrbitBadge {
  name: string;
  sublabel?: string;
  url?: string;
  iconName?: string;
}

export interface ProfileOrbitContent {
  imageUrl: string;
  altText?: string;
  glowColor?: string;
  badges: ProfileOrbitBadge[];
}

export interface ClientMarqueeLogo {
  name: string;
  category?: string;
}

export interface ClientMarqueeContent {
  title?: string;
  logos: ClientMarqueeLogo[];
  speed?: 'normal' | 'slow' | 'fast';
}

export interface ProfileCardContent {
  imageUrl: string;
  name: string;
  caption: string;
  statusText?: string;
}

export interface ExperienceTimelineItem {
  title: string;
  company: string;
  period: string;
  bullets: string[];
  isFeatured?: boolean;
}

export interface ExperienceTimelineContent {
  sectionTitle?: string;
  items: ExperienceTimelineItem[];
}

export interface WorkShowcaseProject {
  title: string;
  client: string;
  category: string;
  metrics: string;
  description: string;
  highlights?: string[];
  tags: string[];
  imageUrl: string;
  url?: string;
}

export interface WorkShowcaseContent {
  headline?: string;
  subhead?: string;
  filters: string[];
  projects: WorkShowcaseProject[];
}

export interface CustomHtmlContent {
  rawHtml: string;
  css?: string;
}

export type ElementContent = 
  | { type: 'heading'; data: HeadingContent }
  | { type: 'richText'; data: RichTextContent }
  | { type: 'image'; data: ImageContent }
  | { type: 'gallery'; data: GalleryContent }
  | { type: 'ctaButton'; data: CtaButtonContent }
  | { type: 'showcaseCard'; data: ShowcaseCardContent }
  | { type: 'statCounter'; data: StatCounterContent }
  | { type: 'statusBadge'; data: StatusBadgeContent }
  | { type: 'profileOrbit'; data: ProfileOrbitContent }
  | { type: 'clientMarquee'; data: ClientMarqueeContent }
  | { type: 'profileCard'; data: ProfileCardContent }
  | { type: 'experienceTimeline'; data: ExperienceTimelineContent }
  | { type: 'workShowcase'; data: WorkShowcaseContent }
  | { type: 'customHtml'; data: CustomHtmlContent };

export interface ElementBlock {
  id: string;
  type: ElementType;
  settings: ElementSettings;
  content: ElementContent;
}

export interface ColumnBlock {
  id: string;
  type: 'column';
  width: ColumnWidth;
  settings: ColumnSettings;
  elements: ElementBlock[];
}

export interface RowBlock {
  id: string;
  type: 'row';
  settings: RowSettings;
  columns: ColumnBlock[];
}

export interface PageDocument {
  id: string;
  slug: string;
  title: string;
  status: PageStatus;
  createdAt: string;
  updatedAt: string;
  authorId: string;
  authorName: string;
  seo: PageSEO;
  sections: RowBlock[];
}

export interface MediaItem {
  id: string;
  url: string;
  storagePath: string;
  fileName: string;
  mimeType: string;
  size: number;
  width?: number;
  height?: number;
  altText: string;
  caption?: string;
  createdAt: string;
}

// ---------------- Global Content Schemas (Firestore globals/ collection) ----------------

export interface NavigationMenuItem {
  id: string;
  label: string;
  path: string;
  isExternal?: boolean;
  isActive?: boolean;
}

export interface NavigationMenuConfig {
  items: NavigationMenuItem[];
  ctaButtonLabel: string;
  ctaButtonLink: string;
}

export interface HeaderConfig {
  logoTitle: string;
  logoSubtitle: string;
  logoUrl?: string;
  showStatusIndicator: boolean;
  statusText: string;
  sticky: boolean;
}

export interface FooterConfig {
  copyrightText: string;
  subtext: string;
  showSocials: boolean;
  socialLinks: { platform: string; url: string }[];
}

export interface ContactConfig {
  email: string;
  phone: string;
  location: string;
  timezones: string;
  upworkUrl: string;
  linkedInUrl?: string;
  githubUrl?: string;
}

export interface ButtonCtaConfig {
  primaryCtaLabel: string;
  primaryCtaTarget: string;
  secondaryCtaLabel: string;
  secondaryCtaTarget: string;
}

export interface WebsiteSettingsConfig {
  siteName: string;
  siteDescription: string;
  faviconUrl: string;
  defaultOgImage: string;
  googleAnalyticsId?: string;
  maintenanceMode: boolean;
}

export interface GlobalConfigurations {
  navigation: NavigationMenuConfig;
  header: HeaderConfig;
  footer: FooterConfig;
  contact: ContactConfig;
  buttons: ButtonCtaConfig;
  settings: WebsiteSettingsConfig;
}
