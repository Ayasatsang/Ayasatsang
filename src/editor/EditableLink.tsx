import React, { useState, useRef, useEffect, useCallback } from 'react';
import { Link2, Pencil, X, Check } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useEditorSafe } from './EditorProvider';
import { createPortal } from 'react-dom';

// ============================================
// Link Editor Modal
// ============================================

interface LinkEditorModalProps {
  isOpen: boolean;
  currentText: string;
  currentUrl: string;
  onSave: (text: string, url: string) => void;
  onClose: () => void;
}

const LinkEditorModal: React.FC<LinkEditorModalProps> = ({
  isOpen,
  currentText,
  currentUrl,
  onSave,
  onClose,
}) => {
  const [text, setText] = useState(currentText);
  const [url, setUrl] = useState(currentUrl);

  useEffect(() => {
    if (isOpen) {
      setText(currentText);
      setUrl(currentUrl);
    }
  }, [isOpen, currentText, currentUrl]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(text, url);
  };

  return createPortal(
    <div className="editor-modal-overlay" onClick={onClose}>
      <div className="editor-modal" style={{ maxWidth: '420px' }} onClick={(e) => e.stopPropagation()}>
        <div className="editor-modal-header">
          <h3>Edit Link</h3>
          <button onClick={onClose} className="editor-modal-close">
            <X size={18} />
          </button>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="editor-modal-body">
            {/* Text Input */}
            <div style={{ marginBottom: '16px' }}>
              <label style={{ display: 'block', marginBottom: '6px', fontSize: '13px', color: '#9ca3af' }}>
                Button Text
              </label>
              <input
                type="text"
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="Enter button text"
                className="editor-input"
                autoFocus
              />
            </div>

            {/* URL Input */}
            <div>
              <label style={{ display: 'block', marginBottom: '6px', fontSize: '13px', color: '#9ca3af' }}>
                Link URL
              </label>
              <input
                type="text"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                placeholder="https://example.com or /page"
                className="editor-input"
              />
              <p style={{ marginTop: '6px', fontSize: '12px', color: '#6b7280' }}>
                External: https://youtube.com/@channel | Internal: /articles
              </p>
            </div>
          </div>
          <div className="editor-modal-footer">
            <button type="button" onClick={onClose} className="editor-btn editor-btn-secondary">
              Cancel
            </button>
            <button
              type="submit"
              disabled={!text}
              className="editor-btn editor-btn-primary"
            >
              <Check size={16} />
              Save
            </button>
          </div>
        </form>
      </div>
    </div>,
    document.body
  );
};

// ============================================
// Editable Link Component
// ============================================

interface EditableLinkProps {
  contentKey: string;
  defaultText: string;
  defaultUrl: string;
  className?: string;
  style?: React.CSSProperties;
  // Allow passing through any attributes
  [key: string]: any;
}

export const EditableLink: React.FC<EditableLinkProps> = ({
  contentKey,
  defaultText,
  defaultUrl,
  className,
  style,
  ...rest
}) => {
  const { isEditing, getDisplayValue, updateLocalDraft } = useEditorSafe();
  const [showEditor, setShowEditor] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isToolbarHovered, setIsToolbarHovered] = useState(false);
  const [toolbarPosition, setToolbarPosition] = useState({ top: 0, left: 0 });
  const elementRef = useRef<HTMLButtonElement>(null);
  const hideTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const showToolbar = isHovered || isToolbarHovered;

  // Get current values
  const displayText = getDisplayValue(`${contentKey}.text`, defaultText);
  const displayUrl = getDisplayValue(`${contentKey}.url`, defaultUrl);

  // Update toolbar position
  const updateToolbarPosition = useCallback(() => {
    if (elementRef.current) {
      const rect = elementRef.current.getBoundingClientRect();
      setToolbarPosition({
        top: rect.top + window.scrollY - 48,
        left: rect.left + rect.width / 2,
      });
    }
  }, []);

  // Update position on hover/scroll
  useEffect(() => {
    if (showToolbar && isEditing) {
      updateToolbarPosition();
      window.addEventListener('scroll', updateToolbarPosition, true);
      window.addEventListener('resize', updateToolbarPosition);
      return () => {
        window.removeEventListener('scroll', updateToolbarPosition, true);
        window.removeEventListener('resize', updateToolbarPosition);
      };
    }
  }, [showToolbar, isEditing, updateToolbarPosition]);

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (hideTimeoutRef.current) {
        clearTimeout(hideTimeoutRef.current);
      }
    };
  }, []);

  // Handle save
  const handleSave = (text: string, url: string) => {
    updateLocalDraft(`${contentKey}.text`, text);
    updateLocalDraft(`${contentKey}.url`, url);
    setShowEditor(false);
  };

  // Handle mouse enter on element
  const handleMouseEnter = useCallback(() => {
    if (hideTimeoutRef.current) {
      clearTimeout(hideTimeoutRef.current);
      hideTimeoutRef.current = null;
    }
    setIsHovered(true);
  }, []);

  // Handle mouse leave on element - with delay
  const handleMouseLeave = useCallback(() => {
    hideTimeoutRef.current = setTimeout(() => {
      setIsHovered(false);
    }, 150);
  }, []);

  // Handle toolbar mouse enter
  const handleToolbarEnter = useCallback(() => {
    if (hideTimeoutRef.current) {
      clearTimeout(hideTimeoutRef.current);
      hideTimeoutRef.current = null;
    }
    setIsToolbarHovered(true);
  }, []);

  // Handle toolbar mouse leave
  const handleToolbarLeave = useCallback(() => {
    setIsToolbarHovered(false);
  }, []);

  // Handle click - in edit mode open editor, otherwise navigate
  const handleClick = (e: React.MouseEvent) => {
    if (isEditing) {
      e.preventDefault();
      e.stopPropagation();
      // Don't open editor on click - use toolbar button instead
    } else if (displayUrl) {
      if (displayUrl.startsWith('http') || displayUrl.startsWith('//')) {
        window.open(displayUrl, '_blank', 'noopener,noreferrer');
      } else {
        window.location.href = displayUrl;
      }
    }
  };

  // Handle edit click
  const handleEditClick = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setShowEditor(true);
  }, []);

  // Non-editing mode: render as clickable button
  if (!isEditing) {
    return (
      <button
        className={className}
        style={style}
        onClick={handleClick}
        {...rest}
      >
        {displayText}
      </button>
    );
  }

  // Floating toolbar rendered via portal
  const toolbar = showToolbar && createPortal(
    <div
      className="editable-toolbar"
      style={{
        position: 'fixed',
        top: toolbarPosition.top - window.scrollY,
        left: toolbarPosition.left,
        transform: 'translateX(-50%)',
      }}
      onMouseEnter={handleToolbarEnter}
      onMouseLeave={handleToolbarLeave}
    >
      <button
        className="editable-toolbar-btn"
        onClick={handleEditClick}
        title="Edit link"
      >
        <Pencil size={14} />
      </button>
      <button
        className="editable-toolbar-btn"
        onClick={handleEditClick}
        title="Edit URL"
      >
        <Link2 size={14} />
      </button>
    </div>,
    document.body
  );

  // Editing mode: render with hover toolbar
  return (
    <>
      {toolbar}
      <button
        ref={elementRef}
        className={cn(
          className,
          'editable-text',
          showToolbar && 'editable-hovered'
        )}
        style={style}
        onClick={handleClick}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        {...rest}
      >
        {displayText}
      </button>

      <LinkEditorModal
        isOpen={showEditor}
        currentText={displayText}
        currentUrl={displayUrl}
        onSave={handleSave}
        onClose={() => setShowEditor(false)}
      />
    </>
  );
};

export default EditableLink;
