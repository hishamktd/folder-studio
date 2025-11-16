/**
 * Image upload utilities
 */

/**
 * Convert file to base64 data URL
 */
export function fileToDataURL(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = (event) => {
      const result = event.target?.result;
      if (typeof result === 'string') {
        resolve(result);
      } else {
        reject(new Error('Failed to read file as data URL'));
      }
    };

    reader.onerror = () => {
      reject(new Error('Failed to read file'));
    };

    reader.readAsDataURL(file);
  });
}

/**
 * Convert blob to data URL
 */
export function blobToDataURL(blob: Blob): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = (event) => {
      const result = event.target?.result;
      if (typeof result === 'string') {
        resolve(result);
      } else {
        reject(new Error('Failed to read blob as data URL'));
      }
    };

    reader.onerror = () => {
      reject(new Error('Failed to read blob'));
    };

    reader.readAsDataURL(blob);
  });
}

/**
 * Handle file input change event
 */
export async function handleFileUpload(
  event: React.ChangeEvent<HTMLInputElement>
): Promise<string | null> {
  const file = event.target.files?.[0];
  if (!file) return null;

  try {
    return await fileToDataURL(file);
  } catch (error) {
    console.error('Failed to upload file:', error);
    return null;
  }
}

/**
 * Validate image file
 */
export function isValidImageFile(file: File): boolean {
  const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp'];
  return validTypes.includes(file.type);
}
