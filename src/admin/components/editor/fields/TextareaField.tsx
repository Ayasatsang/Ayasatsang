interface TextareaFieldProps {
  label: string;
  value: string | undefined;
  onChange: (value: string) => void;
  required?: boolean;
  placeholder?: string;
  rows?: number;
}

const TextareaField = ({
  label,
  value,
  onChange,
  required,
  placeholder,
  rows = 4,
}: TextareaFieldProps) => {
  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-white">
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </label>
      <textarea
        value={value ?? ''}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        required={required}
        rows={rows}
        className="w-full px-4 py-2.5 bg-[#2d2d2d] border border-[#3d3d3d] rounded-md text-sm text-white placeholder-[#6b6b6b] focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-colors resize-y"
      />
    </div>
  );
};

export default TextareaField;
