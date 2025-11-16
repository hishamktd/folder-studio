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
    selected: 'border-cyan-500 bg-cyan-500/20 text-cyan-300 shadow-neon',
    unselected: 'border-gray-600 bg-gray-900/30 text-gray-400 hover:border-gray-500 hover:bg-gray-800/50',
  },
  pink: {
    selected: 'border-pink-500 bg-pink-500/20 text-pink-300 shadow-neon',
    unselected: 'border-gray-600 bg-gray-900/30 text-gray-400 hover:border-gray-500 hover:bg-gray-800/50',
  },
  purple: {
    selected: 'border-purple-500 bg-purple-500/20 text-purple-300 shadow-neon',
    unselected: 'border-gray-600 bg-gray-900/30 text-gray-400 hover:border-gray-500 hover:bg-gray-800/50',
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
      className={`px-3 py-2 rounded-lg border-2 transition-all text-sm ${className}`}
    >
      {label}
    </button>
  );
}
