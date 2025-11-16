"use client";

import { useRef } from "react";
import { FolderStyle } from "@/types/folder";
import { useFolderCanvas } from "@/hooks/useFolderCanvas";
import { IMAGE_STYLES } from "@/constants/canvas";

interface FolderPreviewProps {
  canvasRef: React.RefObject<HTMLCanvasElement | null>;
  image: string | null;
  title: string;
  style: FolderStyle;
  fontWeight: string;
  titleBgColor: string;
  titleTextColor: string;
}

export default function FolderPreview({
  canvasRef,
  image,
  title,
  style,
  fontWeight,
  titleBgColor,
  titleTextColor,
}: FolderPreviewProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  // Use custom hook for canvas rendering with external ref
  useFolderCanvas(
    {
      image,
      title,
      style,
      fontWeight,
      titleTextColor,
    },
    canvasRef
  );

  return (
    <div className="bg-gradient-to-br from-gray-800/60 to-gray-900/60 backdrop-blur-sm rounded-2xl p-8 border border-gray-700/50 shadow-2xl">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
          Live Preview
        </h2>
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
          <span className="text-xs text-gray-400 font-medium">Real-time</span>
        </div>
      </div>
      <div
        ref={containerRef}
        className="bg-gray-900/70 rounded-xl p-10 flex items-center justify-center border border-gray-700/30 shadow-inner min-h-[500px]"
      >
        <canvas
          ref={canvasRef}
          className="max-w-full h-auto rounded-lg shadow-2xl ring-1 ring-cyan-500/20"
          style={{ imageRendering: IMAGE_STYLES.IMAGE_RENDERING }}
        />
      </div>
      <div className="mt-6 p-4 bg-gray-900/40 rounded-lg border border-gray-700/30">
        <p className="text-gray-400 text-sm text-center">
          Your folder icon updates automatically as you customize
        </p>
      </div>
    </div>
  );
}
