"use client";

import { folderStyles, fontWeights, exportSizes, FolderStyle } from "@/utils/folderStyles";

interface ControlPanelProps {
  image: string | null;
  title: string;
  selectedStyle: FolderStyle;
  fontWeight: string;
  titleBgColor: string;
  titleTextColor: string;
  onImageUpload: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onImagePaste: () => void;
  onTitleChange: (title: string) => void;
  onStyleChange: (style: string) => void;
  onFontWeightChange: (weight: string) => void;
  onTitleBgColorChange: (color: string) => void;
  onTitleTextColorChange: (color: string) => void;
  onExport: (size: number) => void;
}

export default function ControlPanel({
  image,
  title,
  selectedStyle,
  fontWeight,
  titleBgColor,
  titleTextColor,
  onImageUpload,
  onImagePaste,
  onTitleChange,
  onStyleChange,
  onFontWeightChange,
  onTitleBgColorChange,
  onTitleTextColorChange,
  onExport,
}: ControlPanelProps) {
  return (
    <div className="space-y-6">
      {/* Image Upload Section */}
      <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-6 border border-gray-700/50 shadow-lg">
        <h2 className="text-xl font-semibold mb-4 text-cyan-400">Image</h2>
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
          <button
            onClick={onImagePaste}
            className="w-full px-4 py-2 bg-purple-500/20 hover:bg-purple-500/30 border border-purple-500/50 rounded-lg text-purple-300 transition-all neon-glow-purple"
          >
            Paste from Clipboard
          </button>
          {image && (
            <div className="relative aspect-square rounded-lg overflow-hidden border border-gray-600">
              <img src={image} alt="Preview" className="w-full h-full object-cover" />
            </div>
          )}
        </div>
      </div>

      {/* Title Section */}
      <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-6 border border-gray-700/50 shadow-lg">
        <h2 className="text-xl font-semibold mb-4 text-cyan-400">Title</h2>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Folder Title
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => onTitleChange(e.target.value)}
              className="w-full px-4 py-2 bg-gray-900/50 border border-gray-600 rounded-lg text-gray-300 focus:outline-none focus:ring-2 focus:ring-cyan-500/50 transition-all"
              placeholder="Enter folder title"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Font Weight
            </label>
            <select
              value={fontWeight}
              onChange={(e) => onFontWeightChange(e.target.value)}
              className="w-full px-4 py-2 bg-gray-900/50 border border-gray-600 rounded-lg text-gray-300 focus:outline-none focus:ring-2 focus:ring-cyan-500/50 transition-all cursor-pointer"
            >
              {fontWeights.map((fw) => (
                <option key={fw.value} value={fw.value}>
                  {fw.name}
                </option>
              ))}
            </select>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Title Background
              </label>
              <div className="flex items-center gap-2">
                <input
                  type="color"
                  value={titleBgColor}
                  onChange={(e) => onTitleBgColorChange(e.target.value)}
                  className="w-12 h-10 rounded-lg cursor-pointer bg-gray-900 border border-gray-600"
                />
                <input
                  type="text"
                  value={titleBgColor}
                  onChange={(e) => onTitleBgColorChange(e.target.value)}
                  className="flex-1 px-3 py-2 bg-gray-900/50 border border-gray-600 rounded-lg text-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500/50"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Title Text
              </label>
              <div className="flex items-center gap-2">
                <input
                  type="color"
                  value={titleTextColor}
                  onChange={(e) => onTitleTextColorChange(e.target.value)}
                  className="w-12 h-10 rounded-lg cursor-pointer bg-gray-900 border border-gray-600"
                />
                <input
                  type="text"
                  value={titleTextColor}
                  onChange={(e) => onTitleTextColorChange(e.target.value)}
                  className="flex-1 px-3 py-2 bg-gray-900/50 border border-gray-600 rounded-lg text-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500/50"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Folder Style Section */}
      <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-6 border border-gray-700/50 shadow-lg">
        <h2 className="text-xl font-semibold mb-4 text-cyan-400">Folder Style</h2>
        <div className="grid grid-cols-2 gap-3">
          {folderStyles.map((style) => (
            <button
              key={style.value}
              onClick={() => onStyleChange(style.value)}
              className={`px-4 py-3 rounded-lg border-2 transition-all ${
                selectedStyle.value === style.value
                  ? "border-cyan-500 bg-cyan-500/20 text-cyan-300 shadow-neon"
                  : "border-gray-600 bg-gray-900/30 text-gray-400 hover:border-gray-500 hover:bg-gray-800/50"
              }`}
            >
              {style.name}
            </button>
          ))}
        </div>
      </div>

      {/* Export Section */}
      <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-6 border border-gray-700/50 shadow-lg">
        <h2 className="text-xl font-semibold mb-4 text-cyan-400">Export</h2>
        <div className="grid grid-cols-2 gap-3">
          {exportSizes.map((size) => (
            <button
              key={size.value}
              onClick={() => onExport(size.value)}
              className="px-4 py-3 bg-pink-500/20 hover:bg-pink-500/30 border border-pink-500/50 rounded-lg text-pink-300 transition-all hover:shadow-neon-pink"
            >
              {size.name}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
