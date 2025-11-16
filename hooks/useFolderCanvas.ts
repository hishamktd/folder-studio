/**
 * Custom hook for folder canvas rendering
 */

import { useRef, useEffect } from 'react';
import { renderFolderIcon, RenderOptions } from '@/lib/canvas/renderer';

export function useFolderCanvas(
  options: RenderOptions,
  externalRef?: React.RefObject<HTMLCanvasElement | null>
) {
  const internalRef = useRef<HTMLCanvasElement | null>(null);
  const canvasRef = externalRef || internalRef;

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    renderFolderIcon(canvas, options);
  }, [
    options.image,
    options.title,
    options.style,
    options.fontWeight,
    options.titleTextColor,
    options.size,
    canvasRef,
  ]);

  return canvasRef;
}
