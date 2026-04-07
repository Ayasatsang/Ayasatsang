import { useEffect, useState, useRef } from 'react';

interface SlugFieldProps {
  label: string;
  value: string | undefined;
  onChange: (value: string) => void;
  sourceValue?: string;
  required?: boolean;
}

const UA_TRANSLIT: Record<string, string> = {
  а: 'a', б: 'b', в: 'v', г: 'h', ґ: 'g', д: 'd', е: 'e', є: 'ye',
  ж: 'zh', з: 'z', и: 'y', і: 'i', ї: 'yi', й: 'y', к: 'k', л: 'l',
  м: 'm', н: 'n', о: 'o', п: 'p', р: 'r', с: 's', т: 't', у: 'u',
  ф: 'f', х: 'kh', ц: 'ts', ч: 'ch', ш: 'sh', щ: 'shch', ь: '',
  ю: 'yu', я: 'ya', ъ: '', э: 'e', ы: 'y', ё: 'yo',
};

const transliterate = (text: string): string => {
  return text
    .split('')
    .map(char => {
      const lower = char.toLowerCase();
      if (lower in UA_TRANSLIT) {
        const result = UA_TRANSLIT[lower];
        return char === lower ? result : result.charAt(0).toUpperCase() + result.slice(1);
      }
      return char;
    })
    .join('');
};

const generateSlug = (text: string): string => {
  return transliterate(text)
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '');
};

const SlugField = ({ label, value, onChange, sourceValue, required }: SlugFieldProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [hasBeenEdited, setHasBeenEdited] = useState(false);
  const prevSourceRef = useRef<string | undefined>();
  const onChangeRef = useRef(onChange);

  // Keep onChange ref updated
  onChangeRef.current = onChange;

  // Auto-generate slug from source (usually title) if not manually edited
  useEffect(() => {
    // Only auto-generate when sourceValue actually changes
    if (sourceValue !== prevSourceRef.current && sourceValue && !hasBeenEdited) {
      const newSlug = generateSlug(sourceValue);
      // Only update if the generated slug is different
      if (newSlug !== value) {
        onChangeRef.current(newSlug);
      }
    }
    prevSourceRef.current = sourceValue;
  }, [sourceValue, hasBeenEdited, value]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setHasBeenEdited(true);
    onChange(generateSlug(e.target.value));
  };

  const handleRegenerate = () => {
    if (sourceValue) {
      onChange(generateSlug(sourceValue));
      setHasBeenEdited(false);
    }
  };

  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-white">
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </label>
      <div className="flex gap-2">
        <div className="flex-1 relative">
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[#a0a0a0] text-sm">/</span>
          <input
            type="text"
            value={value || ''}
            onChange={handleChange}
            onFocus={() => setIsEditing(true)}
            onBlur={() => setIsEditing(false)}
            required={required}
            className="w-full pl-6 pr-4 py-2.5 bg-[#2d2d2d] border border-[#3d3d3d] rounded-md text-sm text-white focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-colors"
            placeholder="auto-generated-slug"
          />
        </div>
        {sourceValue && (
          <button
            type="button"
            onClick={handleRegenerate}
            className="px-3 py-2 bg-[#2d2d2d] border border-[#3d3d3d] rounded-md text-sm text-[#a0a0a0] hover:text-white hover:border-[#4d4d4d] transition-colors"
            title="Regenerate from title"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
          </button>
        )}
      </div>
      {value && (
        <p className="text-xs text-[#a0a0a0]">
          URL: /{value}
        </p>
      )}
    </div>
  );
};

export default SlugField;
