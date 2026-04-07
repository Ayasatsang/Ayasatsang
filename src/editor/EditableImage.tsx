import React, { useState } from 'react';
import { Pencil, X, Check } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useEditorSafe } from './EditorProvider';

// ============================================
// Image Picker Modal
// ============================================

interface ImagePickerModalProps {
  isOpen: boolean;
  currentSrc: string;
  onSave: (newSrc: string) => void;
  onClose: () => void;
}

const ImagePickerModal: React.FC<ImagePickerModalProps> = ({
  isOpen,
  currentSrc,
  onSave,
  onClose,
}) => {
  const [url, setUrl] = useState(currentSrc);
  const [previewError, setPreviewError] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (url && !previewError) {
      onSave(url);
    }
  };

  return (
    <div className="editor-modal-overlay" onClick={onClose}>
      <div className="editor-modal" style={{ maxWidth: '480px' }} onClick={(e) => e.stopPropagation()}>
        <div className="editor-modal-header">
          <h3>Edit Image</h3>
          <button onClick={onClose} className="editor-modal-close">
            <X size={18} />
          </button>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="editor-modal-body">
            {/* Preview */}
            <div
              style={{
                width: '100%',
                height: '200px',
                marginBottom: '16px',
                background: '#374151',
                borderRadius: '8px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                overflow: 'hidden',
              }}
            >
              {url && !previewError ? (
                <img
                  src={url}
                  alt="Preview"
                  style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain' }}
                  onError={() => setPreviewError(true)}
                />
              ) : (
                <span style={{ color: '#6b7280' }}>
                  {previewError ? 'Failed to load image' : 'No image'}
                </span>
              )}
            </div>

            {/* URL Input */}
            <input
              type="url"
              value={url}
              onChange={(e) => {
                setUrl(e.target.value);
                setPreviewError(false);
              }}
              placeholder="Enter image URL (e.g., /images/photo.png)"
              className="editor-input"
              autoFocus
            />

            <p style={{ marginTop: '8px', fontSize: '12px', color: '#6b7280' }}>
              Tip: Use /images/filename.png for local images
            </p>
          </div>
          <div className="editor-modal-footer">
            <button type="button" onClick={onClose} className="editor-btn editor-btn-secondary">
              Cancel
            </button>
            <button
              type="submit"
              disabled={!url || previewError}
              className="editor-btn editor-btn-primary"
            >
              <Check size={16} />
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

// ============================================
// Editable Image Component
// ============================================

interface EditableImageProps {
  contentKey: string;
  defaultSrc: string;
  alt: string;
  className?: string;
  style?: React.CSSProperties;
  // Allow passing through any img attributes
  [key: string]: any;
}

export const EditableImage: React.FC<EditableImageProps> = ({
  contentKey,
  defaultSrc,
  alt,
  className,
  style,
  ...rest
}) => {
  const { isEditing, getDisplayValue, updateLocalDraft } = useEditorSafe();
  const [showPicker, setShowPicker] = useState(false);
  const [imgError, setImgError] = useState(false);

  // Get the current src
  const src = getDisplayValue(contentKey, defaultSrc);

  // Handle image save
  const handleSave = (newSrc: string) => {
    updateLocalDraft(contentKey, newSrc);
    setShowPicker(false);
    setImgError(false);
  };

  // Handle image error
  const handleError = () => {
    setImgError(true);
  };

  // Non-editing mode: just render the image
  if (!isEditing) {
    return (
      <img
        src={imgError ? 'https://placehold.co/400x300?text=Image+Error' : src}
        alt={alt}
        className={className}
        style={style}
        onError={handleError}
        {...rest}
      />
    );
  }

  // Editing mode: render with overlay
  return (
    <>
      <div
        className={cn('editable-image-wrapper', className)}
        style={style}
        onClick={() => setShowPicker(true)}
        data-content-key={contentKey}
      >
        <img
          src={imgError ? 'https://placehold.co/400x300?text=Image+Error' : src}
          alt={alt}
          onError={handleError}
          style={{ width: '100%', height: '100%', objectFit: 'inherit' }}
          {...rest}
        />
        <div className="editable-image-overlay">
          <button className="editable-image-btn" type="button">
            <Pencil size={16} />
            Edit Image
          </button>
        </div>
      </div>

      <ImagePickerModal
        isOpen={showPicker}
        currentSrc={src}
        onSave={handleSave}
        onClose={() => setShowPicker(false)}
      />
    </>
  );
};

export default EditableImage;
