/**
 * Custom hook for exporting folder icons
 */

import { useState, useCallback } from 'react';
import { ExportFormat } from '@/types/folder';
import { exportCanvas } from '@/lib/export/saver';

export function useExport(canvasRef: React.RefObject<HTMLCanvasElement | null>) {
  const [isExporting, setIsExporting] = useState(false);
  const [exportError, setExportError] = useState<string | null>(null);

  const handleExport = useCallback(
    async (format: ExportFormat, size: number) => {
      const canvas = canvasRef.current;
      if (!canvas) {
        setExportError('Canvas not ready');
        return;
      }

      setIsExporting(true);
      setExportError(null);

      try {
        await exportCanvas(canvas, format, size);
      } catch (error) {
        const message = error instanceof Error ? error.message : 'Export failed';
        setExportError(message);
        console.error('Export error:', error);
      } finally {
        setIsExporting(false);
      }
    },
    [canvasRef]
  );

  return {
    isExporting,
    exportError,
    handleExport,
  };
}
