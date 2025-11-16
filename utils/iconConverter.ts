/**
 * Converts a canvas to ICO format
 * ICO files can contain multiple sizes of the same image
 */
export async function canvasToICO(canvas: HTMLCanvasElement, sizes: number[] = [256]): Promise<Blob> {
  const images: { size: number; data: Uint8Array }[] = [];

  // Generate images for each size
  for (const size of sizes) {
    const tempCanvas = document.createElement('canvas');
    tempCanvas.width = size;
    tempCanvas.height = size;
    const ctx = tempCanvas.getContext('2d');
    if (!ctx) continue;

    // Draw scaled image
    ctx.drawImage(canvas, 0, 0, size, size);

    // Get PNG data
    const blob = await new Promise<Blob>((resolve) => {
      tempCanvas.toBlob((b) => resolve(b!), 'image/png');
    });
    const arrayBuffer = await blob.arrayBuffer();
    const pngData = new Uint8Array(arrayBuffer);

    images.push({ size, data: pngData });
  }

  // Create ICO file structure
  const icoData = createICOFile(images);
  // Convert Uint8Array to regular array for Blob compatibility
  return new Blob([new Uint8Array(icoData)], { type: 'image/x-icon' });
}

/**
 * Creates an ICO file from multiple PNG images
 */
function createICOFile(images: { size: number; data: Uint8Array }[]): Uint8Array {
  // ICO Header (6 bytes)
  const headerSize = 6;
  const dirEntrySize = 16;
  const totalDirSize = headerSize + (images.length * dirEntrySize);

  // Calculate total file size
  let totalSize = totalDirSize;
  for (const img of images) {
    totalSize += img.data.length;
  }

  const icoFile = new Uint8Array(totalSize);
  let offset = 0;

  // Write ICO header
  icoFile[offset++] = 0; // Reserved
  icoFile[offset++] = 0; // Reserved
  icoFile[offset++] = 1; // Type: 1 = ICO
  icoFile[offset++] = 0; // Type (continued)
  icoFile[offset++] = images.length & 0xFF; // Number of images (low byte)
  icoFile[offset++] = (images.length >> 8) & 0xFF; // Number of images (high byte)

  // Write directory entries
  let imageDataOffset = totalDirSize;
  for (const img of images) {
    const width = img.size === 256 ? 0 : img.size; // 0 means 256
    const height = img.size === 256 ? 0 : img.size;

    icoFile[offset++] = width & 0xFF; // Width
    icoFile[offset++] = height & 0xFF; // Height
    icoFile[offset++] = 0; // Color palette (0 for PNG)
    icoFile[offset++] = 0; // Reserved
    icoFile[offset++] = 1; // Color planes (low byte)
    icoFile[offset++] = 0; // Color planes (high byte)
    icoFile[offset++] = 32; // Bits per pixel (low byte)
    icoFile[offset++] = 0; // Bits per pixel (high byte)

    // Image size (4 bytes, little-endian)
    const imageSize = img.data.length;
    icoFile[offset++] = imageSize & 0xFF;
    icoFile[offset++] = (imageSize >> 8) & 0xFF;
    icoFile[offset++] = (imageSize >> 16) & 0xFF;
    icoFile[offset++] = (imageSize >> 24) & 0xFF;

    // Image offset (4 bytes, little-endian)
    icoFile[offset++] = imageDataOffset & 0xFF;
    icoFile[offset++] = (imageDataOffset >> 8) & 0xFF;
    icoFile[offset++] = (imageDataOffset >> 16) & 0xFF;
    icoFile[offset++] = (imageDataOffset >> 24) & 0xFF;

    imageDataOffset += imageSize;
  }

  // Write image data
  for (const img of images) {
    icoFile.set(img.data, offset);
    offset += img.data.length;
  }

  return icoFile;
}

/**
 * Exports canvas as PNG
 */
export async function canvasToPNG(canvas: HTMLCanvasElement): Promise<Blob> {
  return new Promise((resolve, reject) => {
    canvas.toBlob((blob) => {
      if (blob) {
        resolve(blob);
      } else {
        reject(new Error('Failed to create PNG blob'));
      }
    }, 'image/png');
  });
}
