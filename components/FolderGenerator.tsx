"use client";

import { useState, useRef } from "react";
import { folderStyles, fontWeights, exportSizes } from "@/utils/folderStyles";
import { canvasToICO, canvasToPNG } from "@/utils/iconConverter";
import { saveAs } from "file-saver";
import FolderPreview from "./FolderPreview";
import ControlPanel from "./ControlPanel";

export type ExportFormat = 'ico' | 'png';

export default function FolderGenerator() {
  const [image, setImage] = useState<string | null>(null);
  const [title, setTitle] = useState("FOLDER");
  const [selectedStyle, setSelectedStyle] = useState(folderStyles[0]);
  const [fontWeight, setFontWeight] = useState(fontWeights[4].value);
  const [titleBgColor, setTitleBgColor] = useState("#8B1538");
  const [titleTextColor, setTitleTextColor] = useState("#ffffff");
  const [exportFormat, setExportFormat] = useState<ExportFormat>('ico');
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setImage(event.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleImagePaste = async () => {
    try {
      const clipboardItems = await navigator.clipboard.read();
      for (const item of clipboardItems) {
        for (const type of item.types) {
          if (type.startsWith("image/")) {
            const blob = await item.getType(type);
            const reader = new FileReader();
            reader.onload = (event) => {
              setImage(event.target?.result as string);
            };
            reader.readAsDataURL(blob);
            return;
          }
        }
      }
    } catch (err) {
      console.error("Failed to read clipboard:", err);
    }
  };

  const handleStyleChange = (styleValue: string) => {
    const style = folderStyles.find((s) => s.value === styleValue);
    if (style) {
      setSelectedStyle(style);
      setTitleBgColor(style.colors.base);
    }
  };

  const handleExport = async (size: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const exportCanvas = document.createElement("canvas");
    exportCanvas.width = size;
    exportCanvas.height = size;
    const ctx = exportCanvas.getContext("2d");
    if (!ctx) return;

    ctx.drawImage(canvas, 0, 0, size, size);

    try {
      if (exportFormat === 'ico') {
        // Export as ICO (can include multiple sizes)
        const blob = await canvasToICO(exportCanvas, [size]);
        saveAs(blob, `folder-icon-${size}x${size}.ico`);
      } else {
        // Export as PNG
        const blob = await canvasToPNG(exportCanvas);
        saveAs(blob, `folder-icon-${size}x${size}.png`);
      }
    } catch (error) {
      console.error('Export failed:', error);
      alert('Failed to export icon. Please try again.');
    }
  };

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
        onImageUpload={handleImageUpload}
        onImagePaste={handleImagePaste}
        onTitleChange={setTitle}
        onStyleChange={handleStyleChange}
        onFontWeightChange={setFontWeight}
        onTitleBgColorChange={setTitleBgColor}
        onTitleTextColorChange={setTitleTextColor}
        onExportFormatChange={setExportFormat}
        onExport={handleExport}
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
