/**
 * Clipboard image utilities
 */

import { blobToDataURL } from './upload';

/**
 * Read image from clipboard
 */
export async function readImageFromClipboard(): Promise<string | null> {
  try {
    const clipboardItems = await navigator.clipboard.read();

    for (const item of clipboardItems) {
      for (const type of item.types) {
        if (type.startsWith('image/')) {
          const blob = await item.getType(type);
          return await blobToDataURL(blob);
        }
      }
    }

    return null;
  } catch (error) {
    console.error('Failed to read clipboard:', error);
    return null;
  }
}

/**
 * Check if clipboard API is available
 */
export function isClipboardAvailable(): boolean {
  return (
    typeof navigator !== 'undefined' &&
    'clipboard' in navigator &&
    'read' in navigator.clipboard
  );
}
