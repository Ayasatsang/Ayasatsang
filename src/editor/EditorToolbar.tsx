import React from 'react';
import { Eye, Pencil, Save, Upload, X } from 'lucide-react';
import { useEditorStore, useDirtyCount, useHasLocalChanges } from './useEditorStore';
import { cn } from '@/lib/utils';

// ============================================
// Editor Toolbar
// ============================================

export const EditorToolbar: React.FC = () => {
  const {
    isEditing,
    isPreview,
    isAuthenticated,
    isSaving,
    isPublishing,
    setEditMode,
    setPreviewMode,
    saveDrafts,
    publishAll,
    discardLocalDrafts,
  } = useEditorStore();

  const dirtyCount = useDirtyCount();
  const hasLocalChanges = useHasLocalChanges();

  // Handle save
  const handleSave = async () => {
    await saveDrafts();
  };

  // Handle publish
  const handlePublish = async () => {
    // Save local changes first
    if (hasLocalChanges) {
      await saveDrafts();
    }
    await publishAll();
  };

  // Handle discard
  const handleDiscard = () => {
    if (hasLocalChanges) {
      discardLocalDrafts();
    }
  };

  // Not authenticated: hide toolbar completely
  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className="editor-toolbar">
      {/* Left: Mode toggle - Two buttons like Webflow */}
      <div className="editor-toolbar-left">
        <button
          onClick={() => {
            if (isEditing) {
              setEditMode(false);
            } else {
              setPreviewMode(false);
              setEditMode(true);
            }
          }}
          className={cn('editor-btn', isEditing && 'editor-btn-active')}
        >
          <Pencil size={16} />
          <span>Edit</span>
        </button>
        <button
          onClick={() => {
            if (isPreview) {
              setPreviewMode(false);
            } else {
              setEditMode(false);
              setPreviewMode(true);
            }
          }}
          className={cn('editor-btn', isPreview && 'editor-btn-active')}
        >
          <Eye size={16} />
          <span>Preview</span>
        </button>
      </div>

      {/* Center: Status */}
      <div className="editor-toolbar-center">
        {dirtyCount > 0 && (
          <span className="editor-status-dirty">
            {dirtyCount} unsaved {dirtyCount === 1 ? 'change' : 'changes'}
          </span>
        )}
        {isSaving && <span className="editor-status-saving">Saving...</span>}
        {isPublishing && <span className="editor-status-publishing">Publishing...</span>}
      </div>

      {/* Right: Actions */}
      <div className="editor-toolbar-right">
        {hasLocalChanges && (
          <button onClick={handleDiscard} className="editor-btn editor-btn-secondary">
            <X size={16} />
            <span>Discard</span>
          </button>
        )}

        {(hasLocalChanges || dirtyCount > 0) && (
          <>
            {hasLocalChanges && (
              <button
                onClick={handleSave}
                disabled={isSaving}
                className="editor-btn editor-btn-secondary"
              >
                <Save size={16} />
                <span>Save Draft</span>
              </button>
            )}

            <button
              onClick={handlePublish}
              disabled={isPublishing || isSaving}
              className="editor-btn editor-btn-primary"
            >
              <Upload size={16} />
              <span>Publish</span>
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default EditorToolbar;
