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
  primary: 'bg-cyan-500/20 hover:bg-cyan-500/30 border-cyan-500/50 text-cyan-300 hover:shadow-lg hover:shadow-cyan-500/20 hover:scale-[1.02]',
  secondary: 'bg-purple-500/20 hover:bg-purple-500/30 border-purple-500/50 text-purple-300 hover:shadow-lg hover:shadow-purple-500/20 hover:scale-[1.02]',
  accent: 'bg-gradient-to-r from-pink-500/20 to-purple-500/20 hover:from-pink-500/30 hover:to-purple-500/30 border-pink-500/50 text-pink-300 hover:shadow-lg hover:shadow-pink-500/20 hover:scale-[1.02] font-semibold',
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
      className={`px-4 py-2 border rounded-lg transition-all duration-200 ${variantClass} ${widthClass} ${disabledClass} ${className}`}
    >
      {children}
    </button>
  );
}
