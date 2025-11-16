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
    <div className="grid lg:grid-cols-[1fr,600px] gap-8 items-start">
      {/* Scrollable Control Panel */}
      <div className="max-h-[calc(100vh-12rem)] overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-gray-700 scrollbar-track-gray-900">
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
      </div>

      {/* Sticky Preview Panel */}
      <div className="lg:sticky lg:top-8">
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
    </div>
  );
}
