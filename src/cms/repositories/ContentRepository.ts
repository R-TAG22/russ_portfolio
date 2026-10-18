import { PageDocument, MediaItem, PageStatus } from '../types/schema';

export interface PageFilter {
  status?: PageStatus;
  searchQuery?: string;
  limit?: number;
}

export interface PageSummary {
  id: string;
  slug: string;
  title: string;
  status: PageStatus;
  authorName: string;
  updatedAt: string;
  sectionCount: number;
}

/**
 * Decoupled Content Repository Interface
 * Supports drop-in implementations for LocalStorage, Mock APIs,
 * and Firebase (Firestore + Firebase Storage).
 */
export interface ContentRepository {
  /**
   * Retrieves a full page document by its unique slug
   */
  getPageBySlug(slug: string): Promise<PageDocument | null>;

  /**
   * Retrieves a full page document by its document ID
   */
  getPageById(id: string): Promise<PageDocument | null>;

  /**
   * Upserts a page document (create or replace)
   */
  savePage(pageData: PageDocument): Promise<PageDocument>;

  /**
   * Deletes a page document
   */
  deletePage(pageId: string): Promise<boolean>;

  /**
   * Lists available pages with optional filtering
   */
  listPages(filter?: PageFilter): Promise<PageSummary[]>;

  /**
   * Uploads a media asset to the repository storage
   */
  uploadMedia(file: File | { name: string; type: string; base64: string; size: number }): Promise<MediaItem>;

  /**
   * Retrieves all media assets from the library
   */
  getMediaLibrary(): Promise<MediaItem[]>;

  /**
   * Deletes a media asset
   */
  deleteMedia(mediaId: string): Promise<boolean>;

  /**
   * Retrieves global website configurations (header, footer, nav, contact, settings)
   */
  getGlobals(): Promise<import('../types/schema').GlobalConfigurations>;

  /**
   * Saves or updates global website configurations
   */
  saveGlobals(globals: Partial<import('../types/schema').GlobalConfigurations>): Promise<import('../types/schema').GlobalConfigurations>;

  /**
   * Retrieves all blog posts
   */
  getBlogs(): Promise<import('../types/schema').BlogPost[]>;

  /**
   * Retrieves a single blog post by its slug
   */
  getBlogBySlug(slug: string): Promise<import('../types/schema').BlogPost | null>;

  /**
   * Saves or creates a blog post
   */
  saveBlog(blog: import('../types/schema').BlogPost): Promise<import('../types/schema').BlogPost>;

  /**
   * Deletes a blog post
   */
  deleteBlog(id: string): Promise<boolean>;
}
