import { ContentRepository } from '../repositories/ContentRepository';
import { LocalStorageContentService } from './LocalStorageContentService';

/**
 * FEATURE FLAG: Set to true once Firebase config credentials are provided
 * and the 'firebase' npm package is installed.
 */
export const USE_FIREBASE_BACKEND = false;

class ContentServiceFactory {
  private static instance: ContentRepository;

  public static getRepository(): ContentRepository {
    if (!this.instance) {
      if (USE_FIREBASE_BACKEND) {
        // When enabled, return FirestoreContentService
        // const { FirestoreContentService } = require('./FirestoreContentService.stub');
        // this.instance = new FirestoreContentService();
        console.warn('Firebase requested but defaulting to LocalStorageContentService until credentials supplied.');
        this.instance = new LocalStorageContentService();
      } else {
        this.instance = new LocalStorageContentService();
      }
    }
    return this.instance;
  }

  /**
   * For testing or resetting singleton instance
   */
  public static setRepository(repository: ContentRepository): void {
    this.instance = repository;
  }
}

export const contentService = ContentServiceFactory.getRepository();
