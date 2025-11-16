/**
 * PNG export utilities
 */

/**
 * Exports canvas as PNG blob
 */
export async function canvasToPNG(canvas: HTMLCanvasElement): Promise<Blob> {
  return new Promise((resolve, reject) => {
    canvas.toBlob(
      (blob) => {
        if (blob) {
          resolve(blob);
        } else {
          reject(new Error('Failed to create PNG blob'));
        }
      },
      'image/png'
    );
  });
}

/**
 * Exports canvas as PNG with specific size
 */
export async function canvasToPNGWithSize(
  canvas: HTMLCanvasElement,
  size: number
): Promise<Blob> {
  const tempCanvas = document.createElement('canvas');
  tempCanvas.width = size;
  tempCanvas.height = size;

  const ctx = tempCanvas.getContext('2d');
  if (!ctx) {
    throw new Error('Failed to get canvas context');
  }

  ctx.drawImage(canvas, 0, 0, size, size);

  return canvasToPNG(tempCanvas);
}
