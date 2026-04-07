interface DateFieldProps {
  label: string;
  value: string | undefined;
  onChange: (value: string) => void;
  required?: boolean;
}

const DateField = ({ label, value, onChange, required }: DateFieldProps) => {
  // Format date for input (YYYY-MM-DD)
  const formatForInput = (dateStr: string | undefined) => {
    if (!dateStr) return '';
    try {
      const date = new Date(dateStr);
      return date.toISOString().split('T')[0];
    } catch {
      return '';
    }
  };

  // Format date for storage (ISO string)
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (value) {
      onChange(new Date(value).toISOString());
    } else {
      onChange('');
    }
  };

  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-white">
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </label>
      <input
        type="date"
        value={formatForInput(value)}
        onChange={handleChange}
        required={required}
        className="w-full px-4 py-2.5 bg-[#2d2d2d] border border-[#3d3d3d] rounded-md text-sm text-white focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-colors [color-scheme:dark]"
      />
    </div>
  );
};

export default DateField;
