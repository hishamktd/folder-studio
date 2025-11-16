/**
 * Custom hook for folder configuration state management
 */

import { useState, useCallback } from 'react';
import { FolderStyle, FolderConfig, ExportFormat } from '@/types/folder';
import { DEFAULTS } from '@/constants/defaults';
import { FOLDER_STYLES } from '@/constants/styles';

export function useFolderConfig() {
  const [title, setTitle] = useState<string>(DEFAULTS.TITLE);
  const [selectedStyle, setSelectedStyle] = useState<FolderStyle>(DEFAULTS.STYLE);
  const [fontWeight, setFontWeight] = useState<string>(DEFAULTS.FONT_WEIGHT);
  const [titleBgColor, setTitleBgColor] = useState<string>(DEFAULTS.TITLE_BG_COLOR);
  const [titleTextColor, setTitleTextColor] = useState<string>(DEFAULTS.TITLE_TEXT_COLOR);
  const [exportFormat, setExportFormat] = useState<ExportFormat>(DEFAULTS.EXPORT_FORMAT);

  const handleStyleChange = useCallback((styleValue: string) => {
    const style = FOLDER_STYLES.find((s) => s.value === styleValue);
    if (style) {
      setSelectedStyle(style);
      setTitleBgColor(style.colors.base);
    }
  }, []);

  const config: FolderConfig = {
    image: null, // Image is managed separately via useImageUpload
    title,
    style: selectedStyle,
    fontWeight,
    titleBgColor,
    titleTextColor,
    exportFormat,
  };

  return {
    config,
    title,
    selectedStyle,
    fontWeight,
    titleBgColor,
    titleTextColor,
    exportFormat,
    setTitle,
    setSelectedStyle,
    setFontWeight,
    setTitleBgColor,
    setTitleTextColor,
    setExportFormat,
    handleStyleChange,
  };
}
