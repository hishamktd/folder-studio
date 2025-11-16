"use client";

import { useEffect, useRef } from "react";
import { FolderStyle } from "@/utils/folderStyles";

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

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const size = 512;
    canvas.width = size;
    canvas.height = size;

    // Clear canvas
    ctx.clearRect(0, 0, size, size);

    // Draw folder shape (similar to the reference image)
    const folderBaseY = size * 0.25;
    const folderHeight = size * 0.65;
    const folderWidth = size * 0.9;
    const folderX = size * 0.05;

    // Draw shadow
    ctx.shadowColor = style.colors.shadow;
    ctx.shadowBlur = 20;
    ctx.shadowOffsetX = 0;
    ctx.shadowOffsetY = 10;

    // Draw folder base (main body)
    ctx.fillStyle = style.colors.base;
    ctx.beginPath();
    ctx.roundRect(folderX, folderBaseY + 50, folderWidth, folderHeight - 50, [0, 0, 15, 15]);
    ctx.fill();

    // Reset shadow
    ctx.shadowColor = "transparent";
    ctx.shadowBlur = 0;
    ctx.shadowOffsetX = 0;
    ctx.shadowOffsetY = 0;

    // Draw folder tab/top (the distinctive curved top part)
    ctx.fillStyle = style.colors.top;
    ctx.beginPath();

    // Create the folder tab shape
    const tabStartX = folderX;
    const tabStartY = folderBaseY + 50;
    const tabWidth = folderWidth;
    const tabHeight = 60;

    ctx.moveTo(tabStartX, tabStartY);
    ctx.lineTo(tabStartX, folderBaseY);
    ctx.lineTo(tabStartX + tabWidth * 0.4, folderBaseY);
    ctx.arcTo(
      tabStartX + tabWidth * 0.45,
      folderBaseY,
      tabStartX + tabWidth * 0.45,
      folderBaseY + 20,
      20
    );
    ctx.lineTo(tabStartX + tabWidth * 0.45, folderBaseY + 30);
    ctx.lineTo(tabStartX + tabWidth, folderBaseY + 30);
    ctx.lineTo(tabStartX + tabWidth, tabStartY);
    ctx.closePath();
    ctx.fill();

    // Draw image content area if image exists
    if (image) {
      const img = new Image();
      img.crossOrigin = "anonymous";
      img.onload = () => {
        const contentAreaY = folderBaseY + 120;
        const contentAreaHeight = folderHeight - 170;
        const contentAreaWidth = folderWidth - 40;
        const contentAreaX = folderX + 20;

        // Clip to folder area
        ctx.save();
        ctx.beginPath();
        ctx.roundRect(contentAreaX, contentAreaY, contentAreaWidth, contentAreaHeight, 10);
        ctx.clip();

        // Calculate image scaling to cover the area
        const scale = Math.max(
          contentAreaWidth / img.width,
          contentAreaHeight / img.height
        );
        const scaledWidth = img.width * scale;
        const scaledHeight = img.height * scale;
        const imgX = contentAreaX + (contentAreaWidth - scaledWidth) / 2;
        const imgY = contentAreaY + (contentAreaHeight - scaledHeight) / 2;

        ctx.drawImage(img, imgX, imgY, scaledWidth, scaledHeight);
        ctx.restore();

        // Draw title bar after image is loaded
        drawTitleBar();
      };
      img.src = image;
    } else {
      // Draw title bar immediately if no image
      drawTitleBar();
    }

    function drawTitleBar() {
      if (!ctx) return;

      // Draw title background bar
      const titleBarY = folderBaseY + 40;
      const titleBarHeight = 70;

      ctx.fillStyle = titleBgColor;
      ctx.fillRect(folderX, titleBarY, folderWidth, titleBarHeight);

      // Draw title text
      ctx.fillStyle = titleTextColor;
      ctx.font = `${fontWeight} ${size * 0.08}px Arial, sans-serif`;
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillText(title, size / 2, titleBarY + titleBarHeight / 2);
    }
  }, [image, title, style, fontWeight, titleBgColor, titleTextColor, canvasRef]);

  return (
    <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-6 border border-gray-700/50 shadow-lg">
      <h2 className="text-xl font-semibold mb-4 text-cyan-400">Live Preview</h2>
      <div ref={containerRef} className="bg-gray-900/50 rounded-xl p-8 flex items-center justify-center">
        <canvas
          ref={canvasRef}
          className="max-w-full h-auto rounded-lg shadow-2xl"
          style={{ imageRendering: "crisp-edges" }}
        />
      </div>
      <p className="text-gray-500 text-sm mt-4 text-center">
        Preview updates in real-time as you make changes
      </p>
    </div>
  );
}
