import { create } from 'zustand';
import { supabase } from '@/lib/supabase';
import type {
  EditorStore,
  StaticContent,
  StaticContentRow,
} from './types';
import {
  transformFromSupabase as transform,
} from './types';

// ============================================
// Zustand Store
// ============================================

export const useEditorStore = create<EditorStore>()((set, get) => ({
  // Initial state
  isEditing: false,
  isPreview: false,
  isAuthenticated: false,
  content: {},
  localDrafts: {},
  isLoading: false,
  isSaving: false,
  isPublishing: false,

  // ============================================
  // Mode Actions
  // ============================================

  setEditMode: (mode: boolean) => {
    set({ isEditing: mode });
  },

  setPreviewMode: (mode: boolean) => {
    set({ isPreview: mode });
  },

  toggleEditMode: () => {
    const { isEditing, isAuthenticated } = get();
    if (!isAuthenticated) return;
    set({ isEditing: !isEditing });
  },

  // ============================================
  // Fetch Content
  // ============================================

  fetchAllContent: async () => {
    set({ isLoading: true });

    try {
      const { data, error } = await supabase
        .from('static_content')
        .select('*')
        .order('content_key');

      if (error) throw error;

      const contentMap: Record<string, StaticContent> = {};
      (data as StaticContentRow[]).forEach((row) => {
        const content = transform(row);
        contentMap[content.contentKey] = content;
      });

      set({ content: contentMap, isLoading: false });
    } catch (error) {
      console.error('Error fetching content:', error);
      set({ isLoading: false });
    }
  },

  fetchPageContent: async (page: string) => {
    set({ isLoading: true });

    try {
      const { data, error } = await supabase
        .from('static_content')
        .select('*')
        .eq('page', page)
        .order('content_key');

      if (error) throw error;

      const { content: existingContent } = get();
      const contentMap = { ...existingContent };

      (data as StaticContentRow[]).forEach((row) => {
        const content = transform(row);
        contentMap[content.contentKey] = content;
      });

      set({ content: contentMap, isLoading: false });
    } catch (error) {
      console.error('Error fetching page content:', error);
      set({ isLoading: false });
    }
  },

  // ============================================
  // Draft Actions
  // ============================================

  updateLocalDraft: (key: string, value: string) => {
    const { localDrafts } = get();
    set({
      localDrafts: {
        ...localDrafts,
        [key]: value,
      },
    });
  },

  saveDrafts: async () => {
    const { localDrafts, content } = get();
    const keys = Object.keys(localDrafts);

    if (keys.length === 0) return;

    set({ isSaving: true });

    try {
      for (const key of keys) {
        const value = localDrafts[key];
        const existing = content[key];

        if (existing) {
          // Update existing content
          const { error } = await supabase
            .from('static_content')
            .update({
              draft_value: value,
              is_dirty: true,
            })
            .eq('content_key', key);

          if (error) throw error;
        } else {
          // Parse key to get page and section
          const parts = key.split('.');
          const page = parts[0];
          const section = parts.length > 2 ? parts[1] : null;

          // Create new content
          const { error } = await supabase.from('static_content').insert({
            content_key: key,
            page,
            section,
            content_type: 'text',
            content_value: value,
            draft_value: value,
            is_dirty: true,
          });

          if (error) throw error;
        }
      }

      // Clear local drafts and refetch
      set({ localDrafts: {}, isSaving: false });
      await get().fetchAllContent();
    } catch (error) {
      console.error('Error saving drafts:', error);
      set({ isSaving: false });
    }
  },

  discardLocalDrafts: () => {
    set({ localDrafts: {} });
  },

  // ============================================
  // Publish Actions
  // ============================================

  publishAll: async () => {
    const { content } = get();
    const dirtyKeys = Object.keys(content).filter((key) => content[key].isDirty);

    if (dirtyKeys.length === 0) return;

    set({ isPublishing: true });

    try {
      for (const key of dirtyKeys) {
        const item = content[key];
        if (!item.draftValue) continue;

        // Get current version count
        const { count } = await supabase
          .from('content_versions')
          .select('*', { count: 'exact', head: true })
          .eq('content_id', item.id);

        const versionNumber = (count || 0) + 1;

        // Save version history
        await supabase.from('content_versions').insert({
          content_id: item.id,
          content_value: item.contentValue,
          version_number: versionNumber,
        });

        // Update content: move draft to published
        const { error } = await supabase
          .from('static_content')
          .update({
            content_value: item.draftValue,
            draft_value: null,
            is_dirty: false,
            published_at: new Date().toISOString(),
          })
          .eq('content_key', key);

        if (error) throw error;
      }

      set({ isPublishing: false });
      await get().fetchAllContent();
    } catch (error) {
      console.error('Error publishing:', error);
      set({ isPublishing: false });
    }
  },

  publishSingle: async (key: string) => {
    const { content } = get();
    const item = content[key];

    if (!item || !item.isDirty || !item.draftValue) return;

    set({ isPublishing: true });

    try {
      // Get current version count
      const { count } = await supabase
        .from('content_versions')
        .select('*', { count: 'exact', head: true })
        .eq('content_id', item.id);

      const versionNumber = (count || 0) + 1;

      // Save version history
      await supabase.from('content_versions').insert({
        content_id: item.id,
        content_value: item.contentValue,
        version_number: versionNumber,
      });

      // Update content
      const { error } = await supabase
        .from('static_content')
        .update({
          content_value: item.draftValue,
          draft_value: null,
          is_dirty: false,
          published_at: new Date().toISOString(),
        })
        .eq('content_key', key);

      if (error) throw error;

      set({ isPublishing: false });
      await get().fetchAllContent();
    } catch (error) {
      console.error('Error publishing:', error);
      set({ isPublishing: false });
    }
  },

  // ============================================
  // Content Getters
  // ============================================

  getContentValue: (key: string, defaultValue: string) => {
    const { content } = get();
    return content[key]?.contentValue ?? defaultValue;
  },

  getDraftValue: (key: string, defaultValue: string) => {
    const { content, localDrafts } = get();
    return (
      localDrafts[key] ?? content[key]?.draftValue ?? content[key]?.contentValue ?? defaultValue
    );
  },

  getDisplayValue: (key: string, defaultValue: string) => {
    const { isPreview, isEditing, content, localDrafts } = get();

    // In preview mode, show draft values
    if (isPreview || isEditing) {
      return (
        localDrafts[key] ??
        content[key]?.draftValue ??
        content[key]?.contentValue ??
        defaultValue
      );
    }

    // Normal mode, show published values
    return content[key]?.contentValue ?? defaultValue;
  },

  // ============================================
  // Auth Actions (Supabase Auth)
  // ============================================

  checkSession: async () => {
    try {
      const { data: { session } } = await supabase.auth.getSession();
      set({ isAuthenticated: !!session });
    } catch (error) {
      console.error('Error checking session:', error);
      set({ isAuthenticated: false });
    }
  },

  // Login with password (delegated to Supabase Auth via admin panel)
  login: async (_password: string) => {
    // Login is handled through Supabase Auth in the admin panel
    return false;
  },

  // Logout just resets edit mode (actual logout happens through admin panel)
  logout: () => {
    set({ isAuthenticated: false, isEditing: false });
  },
}));

// ============================================
// Selector Hooks
// ============================================

export const useEditorMode = () =>
  useEditorStore((state) => ({
    isEditing: state.isEditing,
    isPreview: state.isPreview,
    isAuthenticated: state.isAuthenticated,
  }));

export const useEditorContent = () =>
  useEditorStore((state) => ({
    content: state.content,
    localDrafts: state.localDrafts,
  }));

export const useEditorLoading = () =>
  useEditorStore((state) => ({
    isLoading: state.isLoading,
    isSaving: state.isSaving,
    isPublishing: state.isPublishing,
  }));

export const useDirtyCount = () =>
  useEditorStore((state) => {
    const dbDirty = Object.values(state.content).filter((c) => c.isDirty).length;
    const localDirty = Object.keys(state.localDrafts).length;
    return dbDirty + localDirty;
  });

export const useHasLocalChanges = () =>
  useEditorStore((state) => Object.keys(state.localDrafts).length > 0);
