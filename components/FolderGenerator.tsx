"use client";

import { useRef } from "react";
import { useImageUpload, useFolderConfig, useExport } from "@/hooks";
import FolderPreview from "./FolderPreview";
import ControlPanel from "./ControlPanel";

export default function FolderGenerator() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Use custom hooks for state management
  const { image, uploadImage, pasteImage, loadImageFromUrl, clearImage } = useImageUpload();

  const {
    title,
    selectedStyle,
    fontWeight,
    titleBgColor,
    titleTextColor,
    exportFormat,
    setTitle,
    setFontWeight,
    setTitleBgColor,
    setTitleTextColor,
    setExportFormat,
    handleStyleChange,
  } = useFolderConfig();

  const { handleExport } = useExport(canvasRef);

  return (
    <div className="grid lg:grid-cols-2 gap-8">
      <ControlPanel
        image={image}
        title={title}
        selectedStyle={selectedStyle}
        fontWeight={fontWeight}
        titleBgColor={titleBgColor}
        titleTextColor={titleTextColor}
        exportFormat={exportFormat}
        onImageUpload={uploadImage}
        onImagePaste={pasteImage}
        onImageUrlLoad={loadImageFromUrl}
        onImageRemove={clearImage}
        onTitleChange={setTitle}
        onStyleChange={handleStyleChange}
        onFontWeightChange={setFontWeight}
        onTitleBgColorChange={setTitleBgColor}
        onTitleTextColorChange={setTitleTextColor}
        onExportFormatChange={setExportFormat}
        onExport={(size) => handleExport(exportFormat, size)}
      />

      <FolderPreview
        canvasRef={canvasRef}
        image={image}
        title={title}
        style={selectedStyle}
        fontWeight={fontWeight}
        titleBgColor={titleBgColor}
        titleTextColor={titleTextColor}
      />
    </div>
  );
}
