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

  const loadImageFromUrl = useCallback(async (url: string) => {
    if (!url.trim()) {
      setError('Please enter a valid URL');
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      // Validate URL format
      new URL(url);

      // Create an image element to load and convert to data URL
      const img = new Image();
      img.crossOrigin = 'anonymous';

      await new Promise<void>((resolve, reject) => {
        img.onload = () => {
          try {
            // Create canvas to convert image to data URL
            const canvas = document.createElement('canvas');
            canvas.width = img.width;
            canvas.height = img.height;
            const ctx = canvas.getContext('2d');

            if (!ctx) {
              reject(new Error('Failed to get canvas context'));
              return;
            }

            ctx.drawImage(img, 0, 0);
            const dataUrl = canvas.toDataURL('image/png');
            setImage(dataUrl);
            resolve();
          } catch (err) {
            reject(err);
          }
        };

        img.onerror = () => {
          reject(new Error('Failed to load image from URL. Make sure the URL is valid and the image is accessible.'));
        };

        img.src = url;
      });
    } catch (err) {
      if (err instanceof TypeError) {
        setError('Invalid URL format');
      } else {
        setError(err instanceof Error ? err.message : 'Failed to load image from URL');
      }
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
    loadImageFromUrl,
    clearImage,
    setImage,
  };
}
