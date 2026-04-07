import React, { useRef, useEffect, useState, useCallback } from 'react';
import { Pencil } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useEditorSafe } from './EditorProvider';
import { createPortal } from 'react-dom';

// ============================================
// Editable Text Component
// ============================================

type EditableElement = keyof JSX.IntrinsicElements;

interface EditableTextProps {
  contentKey: string;
  defaultValue: string;
  as?: EditableElement;
  className?: string;
  style?: React.CSSProperties;
  multiline?: boolean;
  // Allow passing through any HTML attributes
  [key: string]: any;
}

export const EditableText: React.FC<EditableTextProps> = ({
  contentKey,
  defaultValue,
  as: Component = 'span',
  className,
  style,
  multiline = false,
  ...rest
}) => {
  const { isEditing, getDisplayValue, updateLocalDraft } = useEditorSafe();
  const elementRef = useRef<HTMLElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [isToolbarHovered, setIsToolbarHovered] = useState(false);
  const [isEditingText, setIsEditingText] = useState(false);
  const [toolbarPosition, setToolbarPosition] = useState({ top: 0, left: 0 });
  const hideTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Combined hover state - show toolbar if either element or toolbar is hovered
  const showToolbar = isHovered || isToolbarHovered || isEditingText;

  // Get the current value to display
  const displayValue = getDisplayValue(contentKey, defaultValue);

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
    if (showToolbar) {
      updateToolbarPosition();
      window.addEventListener('scroll', updateToolbarPosition, true);
      window.addEventListener('resize', updateToolbarPosition);
      return () => {
        window.removeEventListener('scroll', updateToolbarPosition, true);
        window.removeEventListener('resize', updateToolbarPosition);
      };
    }
  }, [showToolbar, updateToolbarPosition]);

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (hideTimeoutRef.current) {
        clearTimeout(hideTimeoutRef.current);
      }
    };
  }, []);

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
    if (isEditingText) return;

    hideTimeoutRef.current = setTimeout(() => {
      setIsHovered(false);
    }, 150); // Small delay to allow cursor to reach toolbar
  }, [isEditingText]);

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
    if (!isHovered && !isEditingText) {
      setIsHovered(false);
    }
  }, [isHovered, isEditingText]);

  // Handle content change when done editing
  const handleBlur = useCallback(() => {
    setIsEditingText(false);
    if (elementRef.current) {
      const newValue = multiline
        ? elementRef.current.innerHTML
        : elementRef.current.textContent || '';

      // Only update if value changed
      if (newValue !== displayValue) {
        updateLocalDraft(contentKey, newValue);
      }
    }
  }, [contentKey, displayValue, multiline, updateLocalDraft]);

  // Handle keyboard
  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      // Prevent Enter from creating new lines in single-line mode
      if (!multiline && e.key === 'Enter') {
        e.preventDefault();
        elementRef.current?.blur();
      }

      // Escape to cancel editing
      if (e.key === 'Escape') {
        e.preventDefault();
        if (elementRef.current) {
          // Reset to original value
          if (multiline) {
            elementRef.current.innerHTML = displayValue;
          } else {
            elementRef.current.textContent = displayValue;
          }
        }
        elementRef.current?.blur();
      }
    },
    [multiline, displayValue]
  );

  // Enable editing when clicking the pencil icon
  const handleEditClick = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsEditingText(true);
    // Focus the element after a short delay
    setTimeout(() => {
      if (elementRef.current) {
        elementRef.current.focus();
        // Select all text
        const selection = window.getSelection();
        const range = document.createRange();
        range.selectNodeContents(elementRef.current);
        selection?.removeAllRanges();
        selection?.addRange(range);
      }
    }, 10);
  }, []);

  // Non-editing mode: just render the text
  if (!isEditing) {
    const props = {
      className,
      style,
      ...rest,
    };

    if (multiline) {
      return React.createElement(Component as string, {
        ...props,
        dangerouslySetInnerHTML: { __html: displayValue },
      });
    }

    return React.createElement(Component as string, props, displayValue);
  }

  // Floating toolbar rendered via portal (doesn't affect layout)
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
        title="Редагувати текст"
      >
        <Pencil size={14} />
      </button>
    </div>,
    document.body
  );

  // Editing mode: render element with editable state
  return (
    <>
      {toolbar}
      {React.createElement(Component as string, {
        ref: elementRef,
        className: cn(
          className,
          'editable-text',
          showToolbar && 'editable-hovered',
          isEditingText && 'editable-active'
        ),
        style,
        contentEditable: isEditingText,
        suppressContentEditableWarning: true,
        onBlur: handleBlur,
        onKeyDown: handleKeyDown,
        onMouseEnter: handleMouseEnter,
        onMouseLeave: handleMouseLeave,
        ...(multiline ? { dangerouslySetInnerHTML: { __html: displayValue } } : {}),
        ...rest,
      }, multiline ? undefined : displayValue)}
    </>
  );
};

export default EditableText;
