import React, { useEffect, createContext, useContext } from 'react';
import { useEditorStore } from './useEditorStore';
import { EditorToolbar } from './EditorToolbar';
import { supabase } from '@/lib/supabase';
import './editor.css';

// ============================================
// Editor Context
// ============================================

interface EditorContextValue {
  isEditing: boolean;
  isPreview: boolean;
  isAuthenticated: boolean;
  getDisplayValue: (key: string, defaultValue: string) => string;
  updateLocalDraft: (key: string, value: string) => void;
}

const EditorContext = createContext<EditorContextValue | null>(null);

export const useEditor = () => {
  const context = useContext(EditorContext);
  if (!context) {
    throw new Error('useEditor must be used within EditorProvider');
  }
  return context;
};

// Safe hook that returns default values when outside provider
export const useEditorSafe = (): EditorContextValue => {
  const context = useContext(EditorContext);
  if (!context) {
    return {
      isEditing: false,
      isPreview: false,
      isAuthenticated: false,
      getDisplayValue: (_key: string, defaultValue: string) => defaultValue,
      updateLocalDraft: () => {},
    };
  }
  return context;
};

// ============================================
// Editor Provider Component
// ============================================

export interface EditorProviderProps {
  children: React.ReactNode;
  pageId?: string;
}

export const EditorProvider: React.FC<EditorProviderProps> = ({ children, pageId: _pageId }) => {
  const {
    isEditing,
    isPreview,
    isAuthenticated,
    getDisplayValue,
    updateLocalDraft,
    fetchAllContent,
    checkSession,
    toggleEditMode,
  } = useEditorStore();

  // Check session and fetch content on mount
  // Listen for auth state changes (login/logout)
  useEffect(() => {
    checkSession();
    fetchAllContent();

    // Subscribe to Supabase auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(() => {
      checkSession();
    });

    return () => subscription.unsubscribe();
  }, [checkSession, fetchAllContent]);

  // Keyboard shortcut: Ctrl+Shift+E to toggle edit mode
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.ctrlKey && e.shiftKey && e.key === 'E') {
        e.preventDefault();
        if (isAuthenticated) {
          toggleEditMode();
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isAuthenticated, toggleEditMode]);

  const contextValue: EditorContextValue = {
    isEditing,
    isPreview,
    isAuthenticated,
    getDisplayValue,
    updateLocalDraft,
  };

  return (
    <EditorContext.Provider value={contextValue}>
      <div className={isEditing ? 'editor-mode-active' : ''}>
        {children}
      </div>
      {/* Show toolbar - minimal version for login, full version when authenticated */}
      <EditorToolbar />
    </EditorContext.Provider>
  );
};

export default EditorProvider;
