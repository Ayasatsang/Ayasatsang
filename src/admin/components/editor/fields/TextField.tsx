interface TextFieldProps {
  label: string;
  value: string | number | undefined;
  onChange: (value: string) => void;
  required?: boolean;
  placeholder?: string;
  type?: 'text' | 'number' | 'color' | 'email' | 'url';
}

const TextField = ({
  label,
  value,
  onChange,
  required,
  placeholder,
  type = 'text',
}: TextFieldProps) => {
  // For color type, empty string is invalid - must be #rrggbb format
  const inputValue = type === 'color'
    ? (value && typeof value === 'string' && value.startsWith('#') ? value : '#6366f1')
    : (value ?? '');

  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-white">
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </label>
      <input
        type={type}
        value={inputValue}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        required={required}
        className={`w-full px-4 py-2.5 bg-[#2d2d2d] border border-[#3d3d3d] rounded-md text-sm text-white placeholder-[#6b6b6b] focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-colors ${
          type === 'color' ? 'h-12 cursor-pointer' : ''
        }`}
      />
    </div>
  );
};

export default TextField;
