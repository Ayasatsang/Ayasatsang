import { useState, useRef, useEffect } from 'react';

interface SelectOption {
  value: string;
  label: string;
  color?: string;
}

interface MultiSelectFieldProps {
  label: string;
  value: string[] | undefined;
  onChange: (value: string[]) => void;
  options: SelectOption[];
  required?: boolean;
  placeholder?: string;
  max?: number;
}

const MultiSelectField = ({
  label,
  value = [],
  onChange,
  options,
  required,
  placeholder = 'Select options...',
  max,
}: MultiSelectFieldProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState('');
  const [openUpward, setOpenUpward] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLDivElement>(null);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Determine if dropdown should open upward
  const handleToggle = () => {
    if (!isOpen && triggerRef.current) {
      const rect = triggerRef.current.getBoundingClientRect();
      const spaceBelow = window.innerHeight - rect.bottom;
      setOpenUpward(spaceBelow < 260);
    }
    setIsOpen(!isOpen);
  };

  const selectedOptions = options.filter(opt => value.includes(opt.value));
  const filteredOptions = options.filter(opt =>
    opt.label.toLowerCase().includes(search.toLowerCase())
  );

  const isAtMax = max !== undefined && value.length >= max;

  const toggleOption = (optionValue: string) => {
    if (value.includes(optionValue)) {
      onChange(value.filter(v => v !== optionValue));
    } else if (!isAtMax) {
      onChange([...value, optionValue]);
    }
  };

  const removeOption = (optionValue: string, e: React.MouseEvent) => {
    e.stopPropagation();
    onChange(value.filter(v => v !== optionValue));
  };

  return (
    <div className="space-y-2 relative" ref={containerRef}>
      <label className="block text-sm font-medium text-white">
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
        {max !== undefined && (
          <span className="text-[#666] font-normal ml-2">(макс. {max})</span>
        )}
      </label>

      {/* Selected Items & Trigger */}
      <div
        ref={triggerRef}
        onClick={handleToggle}
        className="min-h-[42px] w-full px-3 py-2 bg-[#2d2d2d] border border-[#3d3d3d] rounded-md text-sm cursor-pointer focus-within:border-indigo-500 focus-within:ring-1 focus-within:ring-indigo-500 transition-colors"
      >
        {selectedOptions.length > 0 ? (
          <div className="flex flex-wrap gap-1.5">
            {selectedOptions.map(opt => (
              <span
                key={opt.value}
                className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-xs font-medium"
                style={{
                  backgroundColor: opt.color ? `${opt.color}20` : '#6366f120',
                  color: opt.color || '#6366f1'
                }}
              >
                {opt.label}
                <button
                  type="button"
                  onClick={(e) => removeOption(opt.value, e)}
                  className="hover:opacity-70"
                >
                  <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </span>
            ))}
          </div>
        ) : (
          <span className="text-[#666]">{placeholder}</span>
        )}
      </div>

      {/* Dropdown */}
      {isOpen && (
        <div
          className="absolute left-0 right-0 z-50 max-h-60 bg-[#2d2d2d] border border-[#3d3d3d] rounded-md shadow-lg overflow-hidden"
          style={openUpward ? { bottom: '100%', marginBottom: 4 } : { top: '100%', marginTop: 4 }}
        >
          {/* Search */}
          <div className="p-2 border-b border-[#3d3d3d]">
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search..."
              className="w-full px-3 py-1.5 bg-[#252525] border border-[#3d3d3d] rounded text-sm text-white focus:outline-none focus:border-indigo-500"
              onClick={(e) => e.stopPropagation()}
            />
          </div>

          {/* Options */}
          <div className="max-h-40 overflow-y-auto">
            {filteredOptions.length > 0 ? (
              filteredOptions.map(opt => {
                const isSelected = value.includes(opt.value);
                const isDisabled = !isSelected && isAtMax;
                return (
                <div
                  key={opt.value}
                  onClick={() => !isDisabled && toggleOption(opt.value)}
                  className={`flex items-center gap-2 px-3 py-2 transition-colors ${
                    isDisabled ? 'opacity-40 cursor-not-allowed' : 'cursor-pointer hover:bg-[#3d3d3d]'
                  } ${isSelected ? 'bg-[#3d3d3d]/50' : ''}`}
                >
                  <div className={`w-4 h-4 rounded border flex items-center justify-center ${
                    value.includes(opt.value)
                      ? 'bg-indigo-500 border-indigo-500'
                      : 'border-[#666]'
                  }`}>
                    {value.includes(opt.value) && (
                      <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    )}
                  </div>
                  <span
                    className="text-sm"
                    style={{ color: opt.color || '#fff' }}
                  >
                    {opt.label}
                  </span>
                </div>
                );
              })
            ) : (
              <div className="px-3 py-4 text-sm text-[#666] text-center">
                No options found
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default MultiSelectField;
