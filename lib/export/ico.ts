/**
 * ICO file format export utilities
 */

/**
 * Image data for ICO file
 */
interface ICOImage {
  size: number;
  data: Uint8Array;
}

/**
 * Converts a canvas to ICO format
 * ICO files can contain multiple sizes of the same image
 */
export async function canvasToICO(
  canvas: HTMLCanvasElement,
  sizes: number[] = [256]
): Promise<Blob> {
  const images: ICOImage[] = [];

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
  return new Blob([new Uint8Array(icoData)], { type: 'image/x-icon' });
}

/**
 * Creates an ICO file from multiple PNG images
 */
function createICOFile(images: ICOImage[]): Uint8Array {
  const HEADER_SIZE = 6;
  const DIR_ENTRY_SIZE = 16;
  const totalDirSize = HEADER_SIZE + images.length * DIR_ENTRY_SIZE;

  // Calculate total file size
  let totalSize = totalDirSize;
  for (const img of images) {
    totalSize += img.data.length;
  }

  const icoFile = new Uint8Array(totalSize);
  let offset = 0;

  // Write ICO header (6 bytes)
  offset = writeICOHeader(icoFile, offset, images.length);

  // Write directory entries
  let imageDataOffset = totalDirSize;
  for (const img of images) {
    offset = writeDirectoryEntry(icoFile, offset, img, imageDataOffset);
    imageDataOffset += img.data.length;
  }

  // Write image data
  for (const img of images) {
    icoFile.set(img.data, offset);
    offset += img.data.length;
  }

  return icoFile;
}

/**
 * Write ICO file header
 */
function writeICOHeader(
  buffer: Uint8Array,
  offset: number,
  imageCount: number
): number {
  buffer[offset++] = 0; // Reserved
  buffer[offset++] = 0; // Reserved
  buffer[offset++] = 1; // Type: 1 = ICO
  buffer[offset++] = 0; // Type (continued)
  buffer[offset++] = imageCount & 0xff; // Number of images (low byte)
  buffer[offset++] = (imageCount >> 8) & 0xff; // Number of images (high byte)
  return offset;
}

/**
 * Write directory entry for an image
 */
function writeDirectoryEntry(
  buffer: Uint8Array,
  offset: number,
  image: ICOImage,
  dataOffset: number
): number {
  // Width and height (0 means 256)
  const width = image.size === 256 ? 0 : image.size;
  const height = image.size === 256 ? 0 : image.size;

  buffer[offset++] = width & 0xff; // Width
  buffer[offset++] = height & 0xff; // Height
  buffer[offset++] = 0; // Color palette (0 for PNG)
  buffer[offset++] = 0; // Reserved
  buffer[offset++] = 1; // Color planes (low byte)
  buffer[offset++] = 0; // Color planes (high byte)
  buffer[offset++] = 32; // Bits per pixel (low byte)
  buffer[offset++] = 0; // Bits per pixel (high byte)

  // Image size (4 bytes, little-endian)
  const imageSize = image.data.length;
  buffer[offset++] = imageSize & 0xff;
  buffer[offset++] = (imageSize >> 8) & 0xff;
  buffer[offset++] = (imageSize >> 16) & 0xff;
  buffer[offset++] = (imageSize >> 24) & 0xff;

  // Image offset (4 bytes, little-endian)
  buffer[offset++] = dataOffset & 0xff;
  buffer[offset++] = (dataOffset >> 8) & 0xff;
  buffer[offset++] = (dataOffset >> 16) & 0xff;
  buffer[offset++] = (dataOffset >> 24) & 0xff;

  return offset;
}
