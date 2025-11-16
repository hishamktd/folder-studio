/**
 * Reusable style button component
 */

interface StyleButtonProps {
  label: string;
  value: string;
  isSelected: boolean;
  onClick: () => void;
  variant?: 'cyan' | 'pink' | 'purple';
}

const variantStyles = {
  cyan: {
    selected: 'border-cyan-500 bg-cyan-500/20 text-cyan-300 shadow-lg shadow-cyan-500/20 ring-2 ring-cyan-500/30 font-semibold',
    unselected: 'border-gray-600/50 bg-gray-900/40 text-gray-400 hover:border-cyan-500/50 hover:bg-gray-800/50 hover:text-gray-300 hover:scale-[1.02]',
  },
  pink: {
    selected: 'border-pink-500 bg-pink-500/20 text-pink-300 shadow-lg shadow-pink-500/20 ring-2 ring-pink-500/30 font-semibold',
    unselected: 'border-gray-600/50 bg-gray-900/40 text-gray-400 hover:border-pink-500/50 hover:bg-gray-800/50 hover:text-gray-300 hover:scale-[1.02]',
  },
  purple: {
    selected: 'border-purple-500 bg-purple-500/20 text-purple-300 shadow-lg shadow-purple-500/20 ring-2 ring-purple-500/30 font-semibold',
    unselected: 'border-gray-600/50 bg-gray-900/40 text-gray-400 hover:border-purple-500/50 hover:bg-gray-800/50 hover:text-gray-300 hover:scale-[1.02]',
  },
};

export function StyleButton({
  label,
  value,
  isSelected,
  onClick,
  variant = 'cyan',
}: StyleButtonProps) {
  const styles = variantStyles[variant];
  const className = isSelected ? styles.selected : styles.unselected;

  return (
    <button
      onClick={onClick}
      className={`px-3 py-2 rounded-lg border-2 transition-all duration-200 text-sm ${className}`}
    >
      {label}
    </button>
  );
}
