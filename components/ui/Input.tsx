/**
 * Reusable input components
 */

interface InputProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  type?: 'text' | 'email' | 'password';
}

export function Input({
  label,
  value,
  onChange,
  placeholder,
  type = 'text',
}: InputProps) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-300 mb-2">
        {label}
      </label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full px-4 py-2 bg-gray-900/50 border border-gray-600 rounded-lg text-gray-300 focus:outline-none focus:ring-2 focus:ring-cyan-500/50 transition-all"
      />
    </div>
  );
}

interface SelectProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  options: Array<{ name: string; value: string }>;
}

export function Select({ label, value, onChange, options }: SelectProps) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-300 mb-2">
        {label}
      </label>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full px-4 py-2 bg-gray-900/50 border border-gray-600 rounded-lg text-gray-300 focus:outline-none focus:ring-2 focus:ring-cyan-500/50 transition-all cursor-pointer"
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.name}
          </option>
        ))}
      </select>
    </div>
  );
}
