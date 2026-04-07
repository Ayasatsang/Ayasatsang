// CMS Admin Panel - Type Definitions

// ============================================
// Base Types
// ============================================

export type ContentStatus = 'draft' | 'published' | 'archived';

export interface BaseContent {
  id: string;
  createdAt: string;
  updatedAt: string;
  status: ContentStatus;
  slug: string;
}

// ============================================
// Reference Collections
// ============================================

export interface Tag {
  id: string;
  name: string;
  slug: string;
  color: string; // hex color for badge
}

export interface Author {
  id: string;
  name: string;
  slug: string;
  avatar?: string;
  bio?: string;
}

// ============================================
// Content Collections
// ============================================

export interface Event extends BaseContent {
  title: string;
  description: string;
  content?: string; // Rich text
  image: string;
  date: string;
  location: string;
  tags: string[]; // Tag IDs
  metaTitle?: string;
  metaDescription?: string;
}

export interface Article extends BaseContent {
  title: string;
  description: string;
  content: string; // Rich text
  image: string;
  date: string;
  tags: string[]; // Tag IDs
  metaTitle?: string;
  metaDescription?: string;
}

export interface AcademyPost extends BaseContent {
  title: string;
  description: string;
  content: string; // Rich text
  image: string;
  date: string;
  tags: string[]; // Tag IDs
  author?: string; // Author ID
  showOnIndex?: boolean;
  metaTitle?: string;
  metaDescription?: string;
}

export interface MeditationBlock extends BaseContent {
  blockNumber: number;
  title: string;
  subtitle?: string;
  description?: string;
  image: string;
  duration?: string;
  totalDuration?: string; // "30:41 хв"
  accessUrl?: string;
  order: number;
  metaTitle?: string;
  metaDescription?: string;
}

export interface Book extends BaseContent {
  title: string;
  subtitle?: string;
  description: string;
  coverImage: string;
  chapters: string[];
  audioSampleUrl?: string;
  purchaseUrl?: string;
  format: 'audio' | 'print' | 'both';
  metaTitle?: string;
  metaDescription?: string;
}

export type VideoCategory = 'podcasts' | 'meditations' | 'streams';

export interface Video extends BaseContent {
  title: string;
  subtitle?: string;
  thumbnailImage?: string;
  coverImage?: string;
  videoUrl?: string;
  youtubeId?: string;
  category?: VideoCategory;
  order?: number;
  metaTitle?: string;
  metaDescription?: string;
}

export interface Review extends BaseContent {
  text: string;
  authorName: string;
  sunImage: string; // Path to sun illustration
  rating?: number;
}

// ============================================
// CMS Store Types
// ============================================

export interface CMSStore {
  events: Event[];
  articles: Article[];
  academy: AcademyPost[];
  meditation_blocks: MeditationBlock[];
  books: Book[];
  videos: Video[];
  reviews: Review[];
  tags: Tag[];
  authors: Author[];
}

export type CollectionName = keyof CMSStore;

export type CollectionItem<T extends CollectionName> = CMSStore[T][number];

// ============================================
// Collection Config Types
// ============================================

export type FieldType =
  | 'text'
  | 'textarea'
  | 'richtext'
  | 'image'
  | 'date'
  | 'slug'
  | 'select'
  | 'multiselect'
  | 'switch'
  | 'toggle'
  | 'number'
  | 'color';

export type FieldSection = 'basic' | 'content' | 'meta' | 'settings';

export interface CollectionField {
  name: string;
  type: FieldType;
  label: string;
  required?: boolean;
  placeholder?: string;
  options?: { value: string; label: string }[];
  referenceCollection?: CollectionName;
  section?: FieldSection;
  generateFrom?: string; // For slug field - generate from another field
  max?: number; // For multiselect - max number of selections
}

export interface CollectionConfig {
  name: CollectionName;
  singularName: string;
  pluralName: string;
  icon: string;
  slug: string;
  fields: CollectionField[];
  tableColumns: string[];
  defaultSort: string;
}

// ============================================
// UI Types
// ============================================

export interface TableColumn {
  key: string;
  label: string;
  sortable?: boolean;
  width?: string;
}

export interface FilterOption {
  field: string;
  operator: 'eq' | 'contains' | 'gt' | 'lt';
  value: string;
}
