/**
 * Reusable button component
 */

interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  variant?: 'primary' | 'secondary' | 'accent';
  fullWidth?: boolean;
  disabled?: boolean;
  className?: string;
}

const variantStyles = {
  primary: 'bg-cyan-500/20 hover:bg-cyan-500/30 border-cyan-500/50 text-cyan-300 hover:shadow-neon',
  secondary: 'bg-purple-500/20 hover:bg-purple-500/30 border-purple-500/50 text-purple-300 neon-glow-purple',
  accent: 'bg-pink-500/20 hover:bg-pink-500/30 border-pink-500/50 text-pink-300 hover:shadow-neon-pink',
};

export function Button({
  children,
  onClick,
  variant = 'primary',
  fullWidth = false,
  disabled = false,
  className = '',
}: ButtonProps) {
  const widthClass = fullWidth ? 'w-full' : '';
  const variantClass = variantStyles[variant];
  const disabledClass = disabled ? 'opacity-50 cursor-not-allowed' : '';

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`px-4 py-2 border rounded-lg transition-all ${variantClass} ${widthClass} ${disabledClass} ${className}`}
    >
      {children}
    </button>
  );
}
