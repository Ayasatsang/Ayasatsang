import { create } from 'zustand';
import { useShallow } from 'zustand/react/shallow';
import { supabase } from '@/lib/supabase';
import type {
  CMSStore,
  CollectionName,
  CollectionItem,
  ContentStatus,
} from '../types';

// ============================================
// Table name mapping (Supabase uses snake_case)
// ============================================

const tableNames: Record<CollectionName, string> = {
  events: 'events',
  articles: 'articles',
  academy: 'academy',
  meditation_blocks: 'meditation_blocks',
  books: 'books',
  videos: 'videos',
  reviews: 'reviews',
  tags: 'tags',
  authors: 'authors',
};

// ============================================
// Store State Interface
// ============================================

interface AdminStoreState extends CMSStore {
  // Loading states
  isLoading: boolean;
  loadingCollections: Set<CollectionName>;
  fetchedCollections: Set<CollectionName>;
  error: string | null;

  // Fetch data from Supabase
  fetchCollection: <T extends CollectionName>(collection: T) => Promise<void>;
  fetchAllCollections: () => Promise<void>;

  // CRUD Actions (async with Supabase)
  addItem: <T extends CollectionName>(
    collection: T,
    item: Omit<CollectionItem<T>, 'id' | 'createdAt' | 'updatedAt'>
  ) => Promise<string | null>;
  updateItem: <T extends CollectionName>(
    collection: T,
    id: string,
    updates: Partial<CollectionItem<T>>
  ) => Promise<boolean>;
  deleteItem: <T extends CollectionName>(collection: T, id: string) => Promise<boolean>;
  getItem: <T extends CollectionName>(collection: T, id: string) => CollectionItem<T> | undefined;
  getItems: <T extends CollectionName>(collection: T) => CollectionItem<T>[];

  // Status Actions
  setStatus: <T extends CollectionName>(
    collection: T,
    id: string,
    status: ContentStatus
  ) => Promise<boolean>;
  publishItem: <T extends CollectionName>(collection: T, id: string) => Promise<boolean>;
  unpublishItem: <T extends CollectionName>(collection: T, id: string) => Promise<boolean>;
  archiveItem: <T extends CollectionName>(collection: T, id: string) => Promise<boolean>;
}

// ============================================
// Initial State
// ============================================

const initialState: CMSStore & { isLoading: boolean; loadingCollections: Set<CollectionName>; fetchedCollections: Set<CollectionName>; error: string | null } = {
  events: [],
  articles: [],
  academy: [],
  meditation_blocks: [],
  books: [],
  videos: [],
  reviews: [],
  tags: [],
  authors: [],
  isLoading: false,
  loadingCollections: new Set(),
  fetchedCollections: new Set(),
  error: null,
};

// ============================================
// Data transformers (Supabase -> App)
// ============================================

const transformFromSupabase = (collection: CollectionName, data: any): any => {
  const baseTransform = {
    ...data,
    createdAt: data.created_at,
    updatedAt: data.updated_at,
    metaTitle: data.meta_title,
    metaDescription: data.meta_description,
  };

  // Remove snake_case properties
  delete baseTransform.created_at;
  delete baseTransform.updated_at;
  delete baseTransform.meta_title;
  delete baseTransform.meta_description;

  // Collection-specific transforms
  switch (collection) {
    case 'articles':
      return baseTransform;
    case 'academy':
      return {
        ...baseTransform,
        authorId: data.author_id,
        showOnIndex: data.show_on_index ?? true,
      };
    case 'meditation_blocks':
      return {
        ...baseTransform,
        blockNumber: data.block_number,
        totalDuration: data.total_duration,
        accessUrl: data.access_url,
      };
    case 'books':
      return {
        ...baseTransform,
        coverImage: data.cover_image,
        audioSampleUrl: data.audio_sample_url,
        purchaseUrl: data.purchase_url,
      };
    case 'videos':
      return {
        ...baseTransform,
        thumbnailImage: data.thumbnail_image,
        coverImage: data.thumbnail_image,
        videoUrl: data.video_url,
        youtubeId: data.youtube_id,
      };
    case 'reviews':
      return {
        ...baseTransform,
        authorName: data.author_name,
        sunImage: data.sun_image,
      };
    default:
      return baseTransform;
  }
};

const transformToSupabase = (collection: CollectionName, data: any): any => {
  // Remove id if present (for inserts)
  const { id, createdAt, updatedAt, ...rest } = data;

  // Base transform
  let transformed: any = { ...rest };

  // Universal SEO fields (all collections)
  if ('metaTitle' in data) {
    transformed.meta_title = data.metaTitle;
    delete transformed.metaTitle;
  }
  if ('metaDescription' in data) {
    transformed.meta_description = data.metaDescription;
    delete transformed.metaDescription;
  }

  // Collection-specific transforms
  switch (collection) {
    case 'articles':
      break;
    case 'academy':
      if ('authorId' in data) {
        transformed.author_id = data.authorId;
        delete transformed.authorId;
      }
      if ('showOnIndex' in data) {
        transformed.show_on_index = data.showOnIndex;
        delete transformed.showOnIndex;
      }
      break;
    case 'meditation_blocks':
      if ('blockNumber' in data) {
        transformed.block_number = data.blockNumber;
        delete transformed.blockNumber;
      }
      if ('totalDuration' in data) {
        transformed.total_duration = data.totalDuration;
        delete transformed.totalDuration;
      }
      if ('accessUrl' in data) {
        transformed.access_url = data.accessUrl;
        delete transformed.accessUrl;
      }
      break;
    case 'books':
      if ('coverImage' in data) {
        transformed.cover_image = data.coverImage;
        delete transformed.coverImage;
      }
      if ('audioSampleUrl' in data) {
        transformed.audio_sample_url = data.audioSampleUrl;
        delete transformed.audioSampleUrl;
      }
      if ('purchaseUrl' in data) {
        transformed.purchase_url = data.purchaseUrl;
        delete transformed.purchaseUrl;
      }
      break;
    case 'videos':
      if ('thumbnailImage' in data) {
        transformed.thumbnail_image = data.thumbnailImage;
        delete transformed.thumbnailImage;
      }
      if ('coverImage' in data) {
        transformed.thumbnail_image = data.coverImage;
        delete transformed.coverImage;
      }
      if ('videoUrl' in data) {
        transformed.video_url = data.videoUrl;
        delete transformed.videoUrl;
      }
      if ('youtubeId' in data) {
        transformed.youtube_id = data.youtubeId;
        delete transformed.youtubeId;
      }
      break;
    case 'reviews':
      if ('authorName' in data) {
        transformed.author_name = data.authorName;
        delete transformed.authorName;
      }
      if ('sunImage' in data) {
        transformed.sun_image = data.sunImage;
        delete transformed.sunImage;
      }
      break;
  }

  // Remove junction table fields (tags) - these are handled separately
  delete transformed.tags;

  return transformed;
};

// Junction table config: which collections have tags
const junctionConfig: Record<string, { table: string; fkColumn: string }> = {
  events: { table: 'events_tags', fkColumn: 'event_id' },
  articles: { table: 'articles_tags', fkColumn: 'article_id' },
  academy: { table: 'academy_tags', fkColumn: 'academy_id' },
};

// Save tags to junction table (delete old + insert new)
const saveJunctionTags = async (collection: string, itemId: string, tagIds: string[]) => {
  const config = junctionConfig[collection];
  if (!config) return;

  // Delete existing tags
  await supabase
    .from(config.table)
    .delete()
    .eq(config.fkColumn, itemId);

  // Insert new tags
  if (tagIds.length > 0) {
    const rows = tagIds.map(tagId => ({
      [config.fkColumn]: itemId,
      tag_id: tagId,
    }));
    await supabase.from(config.table).insert(rows);
  }
};

// Fetch tags for an item from junction table
const fetchJunctionTags = async (collection: string, itemId: string): Promise<string[]> => {
  const config = junctionConfig[collection];
  if (!config) return [];

  const { data } = await supabase
    .from(config.table)
    .select('tag_id, tags(name)')
    .eq(config.fkColumn, itemId);

  return (data || []).map((row: any) => row.tags?.name || row.tag_id);
};

// ============================================
// Store Implementation
// ============================================

export const useAdminStore = create<AdminStoreState>()((set, get) => ({
  ...initialState,

  // ========== Fetch Actions ==========

  fetchCollection: async (collection) => {
    const state = get();
    // Skip if already fetched (cached) or currently loading
    if (state.fetchedCollections.has(collection) || state.loadingCollections.has(collection)) {
      return;
    }

    const tableName = tableNames[collection];

    set((state) => ({
      loadingCollections: new Set([...state.loadingCollections, collection]),
    }));

    try {
      const { data, error } = await supabase
        .from(tableName)
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;

      let transformedData = (data || []).map((item) =>
        transformFromSupabase(collection, item)
      );

      // Fetch junction table tags for collections that have them
      if (collection in junctionConfig) {
        transformedData = await Promise.all(
          transformedData.map(async (item: any) => ({
            ...item,
            tags: await fetchJunctionTags(collection, item.id),
          }))
        );
      }

      set((state) => {
        const newLoadingCollections = new Set(state.loadingCollections);
        newLoadingCollections.delete(collection);
        const newFetchedCollections = new Set(state.fetchedCollections);
        newFetchedCollections.add(collection);
        return {
          [collection]: transformedData,
          loadingCollections: newLoadingCollections,
          fetchedCollections: newFetchedCollections,
          error: null,
        };
      });
    } catch (error: any) {
      const errorMessage = error.message || 'Failed to fetch data';

      // Check if it's an auth/RLS error (will happen after RLS migration)
      if (error.code === 'PGRST301' || error.status === 401 || error.status === 403) {
        console.warn('[AdminStore] Authentication required for this operation');
      }

      set((state) => {
        const newLoadingCollections = new Set(state.loadingCollections);
        newLoadingCollections.delete(collection);
        return {
          loadingCollections: newLoadingCollections,
          error: errorMessage,
        };
      });
    }
  },

  fetchAllCollections: async () => {
    set({ isLoading: true, error: null });

    const collections: CollectionName[] = [
      'events', 'articles', 'academy', 'meditation_blocks',
      'books', 'videos', 'reviews', 'tags', 'authors'
    ];

    try {
      await Promise.all(collections.map((c) => get().fetchCollection(c)));
    } finally {
      set({ isLoading: false });
    }
  },

  // ========== CRUD Actions ==========

  addItem: async (collection, item) => {
    const tableName = tableNames[collection];
    const tagIds: string[] = (item as any).tags || [];
    const transformedData = transformToSupabase(collection, item);

    try {
      const { data, error } = await supabase
        .from(tableName)
        .insert(transformedData)
        .select()
        .single();

      if (error) throw error;

      // Save junction table tags
      if (tagIds.length > 0) {
        await saveJunctionTags(collection, data.id, tagIds);
      }

      const newItem = transformFromSupabase(collection, data);
      (newItem as any).tags = tagIds;

      set((state) => ({
        [collection]: [newItem, ...state[collection]],
      }));

      return data.id;
    } catch (error: any) {
      const errorMessage = error.message || 'Failed to add item';
      console.error('[AdminStore] addItem error:', collection, error);

      // Auth/RLS error handling (ready for RLS migration)
      if (error.code === 'PGRST301' || error.status === 401 || error.status === 403) {
        console.warn('[AdminStore] Authentication required to add items');
      }

      set({ error: errorMessage });
      return null;
    }
  },

  updateItem: async (collection, id, updates) => {
    const tableName = tableNames[collection];
    const tagIds: string[] | undefined = (updates as any).tags;
    const transformedData = transformToSupabase(collection, updates);

    try {
      const { data, error } = await supabase
        .from(tableName)
        .update(transformedData)
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;

      // Save junction table tags if provided
      if (tagIds !== undefined) {
        await saveJunctionTags(collection, id, tagIds);
      }

      const updatedItem = transformFromSupabase(collection, data);
      if (tagIds !== undefined) {
        (updatedItem as any).tags = tagIds;
      }

      set((state) => ({
        [collection]: state[collection].map((item) =>
          item.id === id ? updatedItem : item
        ),
      }));

      return true;
    } catch (error: any) {
      const errorMessage = error.message || 'Failed to update item';
      console.error('[AdminStore] updateItem error:', collection, id, error);

      // Auth/RLS error handling (ready for RLS migration)
      if (error.code === 'PGRST301' || error.status === 401 || error.status === 403) {
        console.warn('[AdminStore] Authentication required to update items');
      }

      set({ error: errorMessage });
      return false;
    }
  },

  deleteItem: async (collection, id) => {
    const tableName = tableNames[collection];

    try {
      const { error } = await supabase
        .from(tableName)
        .delete()
        .eq('id', id);

      if (error) throw error;

      set((state) => ({
        [collection]: state[collection].filter((item) => item.id !== id),
      }));

      return true;
    } catch (error: any) {
      const errorMessage = error.message || 'Failed to delete item';
      console.error('[AdminStore] deleteItem error:', collection, id, error);

      // Auth/RLS error handling (ready for RLS migration)
      if (error.code === 'PGRST301' || error.status === 401 || error.status === 403) {
        console.warn('[AdminStore] Authentication required to delete items');
      }

      set({ error: errorMessage });
      return false;
    }
  },

  getItem: (collection, id) => {
    return get()[collection].find((item) => item.id === id) as CollectionItem<typeof collection> | undefined;
  },

  getItems: (collection) => {
    return get()[collection] as CollectionItem<typeof collection>[];
  },

  // ========== Status Actions ==========

  setStatus: async (collection, id, status) => {
    return get().updateItem(collection, id, { status } as any);
  },

  publishItem: async (collection, id) => {
    return get().setStatus(collection, id, 'published');
  },

  unpublishItem: async (collection, id) => {
    return get().setStatus(collection, id, 'draft');
  },

  archiveItem: async (collection, id) => {
    return get().setStatus(collection, id, 'archived');
  },
}));

// ============================================
// Selector Hooks
// ============================================

export const useEvents = () => useAdminStore((state) => state.events);
export const useArticles = () => useAdminStore((state) => state.articles);
export const useAcademy = () => useAdminStore((state) => state.academy);
export const useMeditationBlocks = () => useAdminStore((state) => state.meditation_blocks);
export const useBooks = () => useAdminStore((state) => state.books);
export const useVideos = () => useAdminStore((state) => state.videos);
export const useReviews = () => useAdminStore((state) => state.reviews);
export const useTags = () => useAdminStore((state) => state.tags);
export const useAuthors = () => useAdminStore((state) => state.authors);

// Get published items only (for public pages)
// Using useShallow to prevent infinite re-renders from filter creating new arrays
export const usePublishedEvents = () =>
  useAdminStore(useShallow((state) => state.events.filter((e) => e.status === 'published')));
export const usePublishedArticles = () =>
  useAdminStore(useShallow((state) => state.articles.filter((a) => a.status === 'published')));
export const usePublishedAcademy = () =>
  useAdminStore(useShallow((state) => state.academy.filter((a) => a.status === 'published')));
export const usePublishedMeditationBlocks = () =>
  useAdminStore(useShallow((state) => state.meditation_blocks.filter((b) => b.status === 'published')));
export const usePublishedBooks = () =>
  useAdminStore(useShallow((state) => state.books.filter((b) => b.status === 'published')));
export const usePublishedVideos = () =>
  useAdminStore(useShallow((state) => state.videos.filter((v) => v.status === 'published')));
export const usePublishedReviews = () =>
  useAdminStore(useShallow((state) => state.reviews.filter((r) => r.status === 'published')));

// Get collection count
export const useCollectionCount = (collection: CollectionName) =>
  useAdminStore((state) => state[collection].length);

// Loading state
export const useIsLoading = () => useAdminStore((state) => state.isLoading);
export const useIsCollectionLoading = (collection: CollectionName) =>
  useAdminStore((state) => state.loadingCollections.has(collection));
export const useError = () => useAdminStore((state) => state.error);

export default useAdminStore;
