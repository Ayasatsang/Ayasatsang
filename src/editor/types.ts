// Visual Editor Types

export type ContentType = 'text' | 'richtext' | 'image';

export interface StaticContent {
  id: string;
  contentKey: string;
  page: string;
  section: string | null;
  contentType: ContentType;
  contentValue: string;
  draftValue: string | null;
  isDirty: boolean;
  label: string | null;
  publishedAt: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface ContentVersion {
  id: string;
  contentId: string;
  contentValue: string;
  versionNumber: number;
  publishedAt: string;
}

export interface EditorState {
  // Mode
  isEditing: boolean;
  isPreview: boolean;
  isAuthenticated: boolean;

  // Content from database
  content: Record<string, StaticContent>;

  // Local draft changes (before saving to DB)
  localDrafts: Record<string, string>;

  // Loading states
  isLoading: boolean;
  isSaving: boolean;
  isPublishing: boolean;
}

export interface EditorActions {
  // Mode actions
  setEditMode: (mode: boolean) => void;
  setPreviewMode: (mode: boolean) => void;
  toggleEditMode: () => void;

  // Content actions
  fetchAllContent: () => Promise<void>;
  fetchPageContent: (page: string) => Promise<void>;

  // Draft actions
  updateLocalDraft: (key: string, value: string) => void;
  saveDrafts: () => Promise<void>;
  discardLocalDrafts: () => void;

  // Publish actions
  publishAll: () => Promise<void>;
  publishSingle: (key: string) => Promise<void>;

  // Content getters
  getContentValue: (key: string, defaultValue: string) => string;
  getDraftValue: (key: string, defaultValue: string) => string;
  getDisplayValue: (key: string, defaultValue: string) => string;

  // Auth actions
  login: (password: string) => Promise<boolean>;
  logout: () => void;
  checkSession: () => void;
}

export type EditorStore = EditorState & EditorActions;

// Supabase row types (snake_case)
export interface StaticContentRow {
  id: string;
  content_key: string;
  page: string;
  section: string | null;
  content_type: string;
  content_value: string;
  draft_value: string | null;
  is_dirty: boolean;
  label: string | null;
  published_at: string | null;
  created_at: string;
  updated_at: string;
}

// Transform functions
export const transformFromSupabase = (row: StaticContentRow): StaticContent => ({
  id: row.id,
  contentKey: row.content_key,
  page: row.page,
  section: row.section,
  contentType: row.content_type as ContentType,
  contentValue: row.content_value,
  draftValue: row.draft_value,
  isDirty: row.is_dirty,
  label: row.label,
  publishedAt: row.published_at,
  createdAt: row.created_at,
  updatedAt: row.updated_at,
});

export const transformToSupabase = (
  content: Partial<StaticContent>
): Partial<StaticContentRow> => {
  const row: Partial<StaticContentRow> = {};

  if (content.contentKey !== undefined) row.content_key = content.contentKey;
  if (content.page !== undefined) row.page = content.page;
  if (content.section !== undefined) row.section = content.section;
  if (content.contentType !== undefined) row.content_type = content.contentType;
  if (content.contentValue !== undefined) row.content_value = content.contentValue;
  if (content.draftValue !== undefined) row.draft_value = content.draftValue;
  if (content.isDirty !== undefined) row.is_dirty = content.isDirty;
  if (content.label !== undefined) row.label = content.label;
  if (content.publishedAt !== undefined) row.published_at = content.publishedAt;

  return row;
};
