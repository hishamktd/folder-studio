/**
 * Reusable section card component
 */

interface SectionCardProps {
  title: string;
  titleColor?: string;
  children: React.ReactNode;
  className?: string;
}

export function SectionCard({
  title,
  titleColor = 'text-cyan-400',
  children,
  className = '',
}: SectionCardProps) {
  return (
    <div className={`bg-gradient-to-br from-gray-800/60 to-gray-800/40 backdrop-blur-sm rounded-2xl p-6 border border-gray-700/50 shadow-xl hover:border-gray-600/50 transition-all duration-300 ${className}`}>
      <h2 className={`text-lg font-bold mb-5 ${titleColor} tracking-wide uppercase text-sm`}>{title}</h2>
      {children}
    </div>
  );
}
