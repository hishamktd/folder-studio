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
    <div className={`bg-gray-800/50 backdrop-blur-sm rounded-2xl p-6 border border-gray-700/50 shadow-lg ${className}`}>
      <h2 className={`text-xl font-semibold mb-4 ${titleColor}`}>{title}</h2>
      {children}
    </div>
  );
}
