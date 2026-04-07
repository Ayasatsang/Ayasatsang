import { useState, useRef, useCallback } from 'react';
import { Upload, X, Loader2, Image as ImageIcon, Link } from 'lucide-react';
import { supabase } from '@/lib/supabase';

interface ImageFieldProps {
  label: string;
  value: string | undefined;
  onChange: (value: string) => void;
  required?: boolean;
  bucket?: string;
}

const ImageField = ({ label, value, onChange, required, bucket = 'images' }: ImageFieldProps) => {
  const [isUploading, setIsUploading] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isPreviewError, setIsPreviewError] = useState(false);
  const [showUrlInput, setShowUrlInput] = useState(false);
  const [urlValue, setUrlValue] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const generateFileName = (file: File) => {
    const timestamp = Date.now();
    const randomString = Math.random().toString(36).substring(2, 8);
    const extension = file.name.split('.').pop();
    return `${timestamp}-${randomString}.${extension}`;
  };

  const uploadFile = async (file: File) => {
    // Validate file type
    if (!file.type.startsWith('image/')) {
      setError('Будь ласка, виберіть файл зображення');
      return;
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      setError('Файл занадто великий. Максимум 5MB');
      return;
    }

    setIsUploading(true);
    setError(null);
    setIsPreviewError(false);

    try {
      const fileName = generateFileName(file);
      const filePath = `uploads/${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from(bucket)
        .upload(filePath, file, {
          cacheControl: '3600',
          upsert: false,
        });

      if (uploadError) {
        throw uploadError;
      }

      // Get public URL
      const { data: { publicUrl } } = supabase.storage
        .from(bucket)
        .getPublicUrl(filePath);

      onChange(publicUrl);
    } catch (err: any) {
      console.error('Upload error:', err);
      setError(err.message || 'Помилка завантаження файлу');
    } finally {
      setIsUploading(false);
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      uploadFile(file);
    }
    // Reset input value to allow re-uploading same file
    e.target.value = '';
  };

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);

    const file = e.dataTransfer.files?.[0];
    if (file) {
      uploadFile(file);
    }
  }, []);

  const handleRemove = () => {
    onChange('');
    setError(null);
    setIsPreviewError(false);
    setUrlValue('');
  };

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  const handleUrlSubmit = () => {
    if (urlValue.trim()) {
      onChange(urlValue.trim());
      setShowUrlInput(false);
      setError(null);
      setIsPreviewError(false);
    }
  };

  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-white">
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </label>

      {/* Hidden file input */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileSelect}
        className="hidden"
      />

      {/* Image Preview or Upload Zone */}
      {value && !isPreviewError ? (
        <div className="relative w-full h-48 bg-[#2d2d2d] border border-[#3d3d3d] rounded-lg overflow-hidden group">
          <img
            src={value}
            alt="Preview"
            className="w-full h-full object-cover"
            onError={() => setIsPreviewError(true)}
          />
          <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
            <button
              type="button"
              onClick={handleClick}
              className="p-2 bg-white/20 rounded-full text-white hover:bg-white/30 transition-colors"
              title="Замінити"
            >
              <Upload className="w-5 h-5" />
            </button>
            <button
              type="button"
              onClick={handleRemove}
              className="p-2 bg-red-500/80 rounded-full text-white hover:bg-red-500 transition-colors"
              title="Видалити"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>
      ) : (
        <div
          onClick={handleClick}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          className={`
            relative w-full h-48 border-2 border-dashed rounded-lg cursor-pointer
            transition-all duration-200 flex flex-col items-center justify-center gap-3
            ${isDragging
              ? 'border-indigo-500 bg-indigo-500/10'
              : 'border-[#3d3d3d] bg-[#2d2d2d] hover:border-[#4d4d4d] hover:bg-[#333]'
            }
            ${isUploading ? 'pointer-events-none' : ''}
          `}
        >
          {isUploading ? (
            <>
              <Loader2 className="w-10 h-10 text-indigo-500 animate-spin" />
              <span className="text-sm text-[#a0a0a0]">Завантаження...</span>
            </>
          ) : (
            <>
              <div className={`
                p-4 rounded-full transition-colors
                ${isDragging ? 'bg-indigo-500/20' : 'bg-[#333]'}
              `}>
                {isDragging ? (
                  <Upload className="w-8 h-8 text-indigo-500" />
                ) : (
                  <ImageIcon className="w-8 h-8 text-[#666]" />
                )}
              </div>
              <div className="text-center">
                <p className="text-sm text-white">
                  {isDragging ? 'Відпустіть для завантаження' : 'Натисніть або перетягніть файл'}
                </p>
                <p className="text-xs text-[#666] mt-1">
                  PNG, JPG, GIF до 5MB
                </p>
              </div>
            </>
          )}
        </div>
      )}

      {/* URL Input Toggle */}
      <div className="flex items-center gap-2 mt-2">
        <button
          type="button"
          onClick={() => setShowUrlInput(!showUrlInput)}
          className="text-xs text-indigo-400 hover:text-indigo-300 flex items-center gap-1"
        >
          <Link className="w-3 h-3" />
          {showUrlInput ? 'Приховати URL' : 'Вставити URL зображення'}
        </button>
      </div>

      {/* URL Input */}
      {showUrlInput && (
        <div className="flex gap-2 mt-2">
          <input
            type="url"
            value={urlValue}
            onChange={(e) => setUrlValue(e.target.value)}
            placeholder="https://example.com/image.jpg"
            className="flex-1 px-3 py-2 bg-[#2d2d2d] border border-[#3d3d3d] rounded-lg text-white text-sm placeholder-[#666] focus:outline-none focus:border-indigo-500"
          />
          <button
            type="button"
            onClick={handleUrlSubmit}
            className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-sm rounded-lg transition-colors"
          >
            Застосувати
          </button>
        </div>
      )}

      {/* Error message */}
      {error && (
        <p className="text-xs text-red-500 flex items-center gap-1">
          <X className="w-3 h-3" />
          {error}
        </p>
      )}

      {isPreviewError && value && (
        <p className="text-xs text-amber-500">
          Не вдалося завантажити прев'ю. URL: {value}
        </p>
      )}
    </div>
  );
};

export default ImageField;
