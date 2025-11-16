/**
 * Custom hook for image upload and clipboard handling
 */

import { useState, useCallback } from 'react';
import { handleFileUpload } from '@/lib/image/upload';
import { readImageFromClipboard } from '@/lib/image/clipboard';

export function useImageUpload() {
  const [image, setImage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const uploadImage = useCallback(async (event: React.ChangeEvent<HTMLInputElement>) => {
    setIsLoading(true);
    setError(null);

    try {
      const dataUrl = await handleFileUpload(event);
      if (dataUrl) {
        setImage(dataUrl);
      } else {
        setError('Failed to upload image');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to upload image');
    } finally {
      setIsLoading(false);
    }
  }, []);

  const pasteImage = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      const dataUrl = await readImageFromClipboard();
      if (dataUrl) {
        setImage(dataUrl);
      } else {
        setError('No image found in clipboard');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to paste image');
    } finally {
      setIsLoading(false);
    }
  }, []);

  const clearImage = useCallback(() => {
    setImage(null);
    setError(null);
  }, []);

  return {
    image,
    isLoading,
    error,
    uploadImage,
    pasteImage,
    clearImage,
    setImage,
  };
}
