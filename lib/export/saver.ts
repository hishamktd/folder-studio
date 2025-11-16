/**
 * File saving utilities
 */

import { saveAs } from 'file-saver';
import { ExportFormat } from '@/types/folder';
import { canvasToICO } from './ico';
import { canvasToPNG } from './png';

/**
 * Export canvas to file
 */
export async function exportCanvas(
  canvas: HTMLCanvasElement,
  format: ExportFormat,
  size: number
): Promise<void> {
  // Create a temporary canvas with the desired export size
  const exportCanvas = document.createElement('canvas');
  exportCanvas.width = size;
  exportCanvas.height = size;

  const ctx = exportCanvas.getContext('2d');
  if (!ctx) {
    throw new Error('Failed to get canvas context');
  }

  // Draw the original canvas scaled to the export size
  ctx.drawImage(canvas, 0, 0, size, size);

  try {
    let blob: Blob;
    let filename: string;

    if (format === 'ico') {
      blob = await canvasToICO(exportCanvas, [size]);
      filename = `folder-icon-${size}x${size}.ico`;
    } else {
      blob = await canvasToPNG(exportCanvas);
      filename = `folder-icon-${size}x${size}.png`;
    }

    saveAs(blob, filename);
  } catch (error) {
    console.error('Export failed:', error);
    throw new Error('Failed to export icon. Please try again.');
  }
}
