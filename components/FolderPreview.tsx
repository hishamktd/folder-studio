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
    <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-6 border border-gray-700/50 shadow-lg">
      <h2 className="text-xl font-semibold mb-4 text-cyan-400">Live Preview</h2>
      <div
        ref={containerRef}
        className="bg-gray-900/50 rounded-xl p-8 flex items-center justify-center"
      >
        <canvas
          ref={canvasRef}
          className="max-w-full h-auto rounded-lg shadow-2xl"
          style={{ imageRendering: IMAGE_STYLES.IMAGE_RENDERING }}
        />
      </div>
      <p className="text-gray-500 text-sm mt-4 text-center">
        Preview updates in real-time as you make changes
      </p>
    </div>
  );
}
