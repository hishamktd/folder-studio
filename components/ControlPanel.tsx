"use client";

import { FolderStyle, ExportFormat } from "@/types/folder";
import {
  FOLDER_STYLES,
  MODERN_NEON_STYLES,
  ANIME_STYLES,
  FILM_STYLES,
  FONT_WEIGHTS,
  EXPORT_SIZES,
} from "@/constants/styles";
import { SectionCard, ColorPicker, StyleButton, Input, Select, Button } from "@/components/ui";

interface ControlPanelProps {
  image: string | null;
  title: string;
  selectedStyle: FolderStyle;
  fontWeight: string;
  titleBgColor: string;
  titleTextColor: string;
  exportFormat: ExportFormat;
  onImageUpload: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onImagePaste: () => void;
  onTitleChange: (title: string) => void;
  onStyleChange: (style: string) => void;
  onFontWeightChange: (weight: string) => void;
  onTitleBgColorChange: (color: string) => void;
  onTitleTextColorChange: (color: string) => void;
  onExportFormatChange: (format: ExportFormat) => void;
  onExport: (size: number) => void;
}

export default function ControlPanel({
  image,
  title,
  selectedStyle,
  fontWeight,
  titleBgColor,
  titleTextColor,
  exportFormat,
  onImageUpload,
  onImagePaste,
  onTitleChange,
  onStyleChange,
  onFontWeightChange,
  onTitleBgColorChange,
  onTitleTextColorChange,
  onExportFormatChange,
  onExport,
}: ControlPanelProps) {
  return (
    <div className="space-y-6">
      {/* Image Upload Section */}
      <SectionCard title="Image">
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Upload Image
            </label>
            <input
              type="file"
              accept="image/*"
              onChange={onImageUpload}
              className="w-full px-4 py-2 bg-gray-900/50 border border-gray-600 rounded-lg text-gray-300 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-cyan-500/20 file:text-cyan-400 hover:file:bg-cyan-500/30 transition-all cursor-pointer"
            />
          </div>
          <Button onClick={onImagePaste} variant="secondary" fullWidth>
            Paste from Clipboard
          </Button>
          {image && (
            <div className="relative aspect-square rounded-lg overflow-hidden border border-gray-600">
              <img src={image} alt="Preview" className="w-full h-full object-cover" />
            </div>
          )}
        </div>
      </SectionCard>

      {/* Title Section */}
      <SectionCard title="Title">
        <div className="space-y-4">
          <Input
            label="Folder Title"
            value={title}
            onChange={onTitleChange}
            placeholder="Enter folder title"
          />

          <Select
            label="Font Weight"
            value={fontWeight}
            onChange={onFontWeightChange}
            options={FONT_WEIGHTS}
          />

          <div className="grid grid-cols-2 gap-4">
            <ColorPicker
              label="Title Background"
              value={titleBgColor}
              onChange={onTitleBgColorChange}
            />
            <ColorPicker
              label="Title Text"
              value={titleTextColor}
              onChange={onTitleTextColorChange}
            />
          </div>
        </div>
      </SectionCard>

      {/* Folder Style Section */}
      <SectionCard title="Folder Style">
        {/* Modern & Neon Styles */}
        <div className="mb-4">
          <h3 className="text-sm font-medium text-gray-400 mb-2">Modern & Neon</h3>
          <div className="grid grid-cols-2 gap-2">
            {MODERN_NEON_STYLES.map((style) => (
              <StyleButton
                key={style.value}
                label={style.name}
                value={style.value}
                isSelected={selectedStyle.value === style.value}
                onClick={() => onStyleChange(style.value)}
                variant="cyan"
              />
            ))}
          </div>
        </div>

        {/* Anime Styles */}
        <div className="mb-4">
          <h3 className="text-sm font-medium text-pink-400 mb-2">Anime Themed</h3>
          <div className="grid grid-cols-2 gap-2">
            {ANIME_STYLES.map((style) => (
              <StyleButton
                key={style.value}
                label={style.name}
                value={style.value}
                isSelected={selectedStyle.value === style.value}
                onClick={() => onStyleChange(style.value)}
                variant="pink"
              />
            ))}
          </div>
        </div>

        {/* Film Styles */}
        <div>
          <h3 className="text-sm font-medium text-purple-400 mb-2">Film Themed</h3>
          <div className="grid grid-cols-2 gap-2">
            {FILM_STYLES.map((style) => (
              <StyleButton
                key={style.value}
                label={style.name}
                value={style.value}
                isSelected={selectedStyle.value === style.value}
                onClick={() => onStyleChange(style.value)}
                variant="purple"
              />
            ))}
          </div>
        </div>
      </SectionCard>

      {/* Export Section */}
      <SectionCard title="Export">
        {/* Format Selector */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Export Format
          </label>
          <div className="grid grid-cols-2 gap-3">
            <StyleButton
              label="ICO (Default)"
              value="ico"
              isSelected={exportFormat === 'ico'}
              onClick={() => onExportFormatChange('ico')}
              variant="cyan"
            />
            <StyleButton
              label="PNG"
              value="png"
              isSelected={exportFormat === 'png'}
              onClick={() => onExportFormatChange('png')}
              variant="cyan"
            />
          </div>
        </div>

        {/* Size Selector */}
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Export Size
          </label>
          <div className="grid grid-cols-2 gap-3">
            {EXPORT_SIZES.map((size) => (
              <Button
                key={size.value}
                onClick={() => onExport(size.value)}
                variant="accent"
                className="py-3"
              >
                {size.name}
              </Button>
            ))}
          </div>
        </div>
      </SectionCard>
    </div>
  );
}
