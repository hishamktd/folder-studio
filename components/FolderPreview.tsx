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

    // Geometric variables based on wireframe
    // Following the mathematical model: P1(0,0) to P8, with tab dimensions
    const W = size * 0.95;        // Total Width
    const H = size * 0.67;        // Back panel height (H)
    const Hf = size * 0.62;       // Front panel height (Hf < H)
    const wt = W * 0.44;          // Tab width (w_t)
    const ht = size * 0.10;       // Tab height (h_t)
    const x_offset = 0;           // Tab x-position (starting from left)

    // Position folder in canvas
    const folderX = (size - W) / 2;
    const folderY = size * 0.15;

    // Derived dimensions
    const folderWidth = W;
    const folderHeight = H;
    const tabWidth = wt;
    const tabHeight = ht;
    const cornerRadius = 15;

    // Draw shadow
    ctx.shadowColor = style.colors.shadow;
    ctx.shadowBlur = 25;
    ctx.shadowOffsetX = 0;
    ctx.shadowOffsetY = 12;

    // Draw main folder body first (behind the tab)
    // Following geometric model: P1(0,0) → P2(W,0) → P3(W,H) → P4 → ... → P8(0,H)
    const P1_x = folderX;
    const P1_y = folderY + folderHeight;  // Bottom-left (P1)
    const P2_x = folderX + folderWidth;
    const P2_y = P1_y;                     // Bottom-right (P2)
    const P3_x = P2_x;
    const P3_y = folderY + tabHeight;      // Top-right of body (P3)
    const P8_x = P1_x;
    const P8_y = P3_y;                     // Top-left of body (P8)

    ctx.fillStyle = style.colors.base;
    ctx.beginPath();
    // Start at P1 (bottom-left)
    ctx.moveTo(P1_x + cornerRadius, P1_y);
    // Bottom edge to P2
    ctx.lineTo(P2_x - cornerRadius, P2_y);
    // Bottom-right corner (P2)
    ctx.arcTo(P2_x, P2_y, P2_x, P2_y - cornerRadius, cornerRadius);
    // Right edge to P3
    ctx.lineTo(P3_x, P3_y + cornerRadius);
    // Top-right corner (P3)
    ctx.arcTo(P3_x, P3_y, P3_x - cornerRadius, P3_y, cornerRadius);
    // Top edge to P8
    ctx.lineTo(P8_x, P8_y);
    // Left edge back to P1
    ctx.lineTo(P1_x, P1_y - cornerRadius);
    // Bottom-left corner
    ctx.arcTo(P1_x, P1_y, P1_x + cornerRadius, P1_y, cornerRadius);
    ctx.closePath();
    ctx.fill();

    // Reset shadow
    ctx.shadowBlur = 0;
    ctx.shadowOffsetY = 0;

    // Add inner shadow/depth effect under the tab
    const gradient = ctx.createLinearGradient(0, P8_y, 0, P8_y + 15);
    gradient.addColorStop(0, 'rgba(0, 0, 0, 0.3)');
    gradient.addColorStop(1, 'rgba(0, 0, 0, 0)');
    ctx.fillStyle = gradient;
    ctx.fillRect(folderX, P8_y, tabWidth, 15);

    // Draw folder tab (on top, appears raised)
    // Following geometric model: P8(0,H) → P7(x_o,H) → P6(x_o,H+h_t) → P5(x_o+w_t,H+h_t) → P4(x_o+w_t,H)
    const P7_x = folderX + x_offset;
    const P7_y = P8_y;
    const P6_x = P7_x;
    const P6_y = folderY;                  // Top-left of tab (P6)
    const P5_x = folderX + x_offset + tabWidth;
    const P5_y = P6_y;                     // Top-right of tab (P5)
    const P4_x = P5_x;
    const P4_y = P8_y;                     // (P4)

    ctx.shadowColor = 'rgba(0, 0, 0, 0.4)';
    ctx.shadowBlur = 8;
    ctx.shadowOffsetX = 0;
    ctx.shadowOffsetY = 3;

    ctx.fillStyle = style.colors.top;
    ctx.beginPath();
    // Start at P7, go around the tab
    ctx.moveTo(P7_x, P7_y);
    // Up to P6
    ctx.lineTo(P6_x, P6_y + cornerRadius);
    // Top-left corner of tab
    ctx.arcTo(P6_x, P6_y, P6_x + cornerRadius, P6_y, cornerRadius);
    // Top edge to P5
    ctx.lineTo(P5_x - cornerRadius, P5_y);
    // Top-right corner of tab
    ctx.arcTo(P5_x, P5_y, P5_x, P5_y + cornerRadius, cornerRadius);
    // Down to P4
    ctx.lineTo(P4_x, P4_y);
    // Bottom edge back to P7
    ctx.lineTo(P7_x, P7_y);
    ctx.closePath();
    ctx.fill();

    // Reset shadow
    ctx.shadowBlur = 0;
    ctx.shadowOffsetY = 0;

    // Draw image content area if image exists
    if (image) {
      const img = new Image();
      img.crossOrigin = "anonymous";
      img.onload = () => {
        // Image area - fills completely edge-to-edge (NO padding)
        const imgX = folderX;
        const imgY = folderY + tabHeight;
        const imgWidth = folderWidth;
        const imgHeight = folderHeight - tabHeight;

        // Clip to match folder body shape exactly
        ctx.save();
        ctx.beginPath();
        // Top edge (straight, no curve)
        ctx.moveTo(imgX, imgY);
        ctx.lineTo(imgX + imgWidth - cornerRadius, imgY);
        // Top-right corner
        ctx.arcTo(
          imgX + imgWidth,
          imgY,
          imgX + imgWidth,
          imgY + cornerRadius,
          cornerRadius
        );
        // Right edge
        ctx.lineTo(imgX + imgWidth, imgY + imgHeight - cornerRadius);
        // Bottom-right corner
        ctx.arcTo(
          imgX + imgWidth,
          imgY + imgHeight,
          imgX + imgWidth - cornerRadius,
          imgY + imgHeight,
          cornerRadius
        );
        // Bottom edge
        ctx.lineTo(imgX + cornerRadius, imgY + imgHeight);
        // Bottom-left corner
        ctx.arcTo(
          imgX,
          imgY + imgHeight,
          imgX,
          imgY + imgHeight - cornerRadius,
          cornerRadius
        );
        // Left edge
        ctx.lineTo(imgX, imgY);
        ctx.closePath();
        ctx.clip();

        // Calculate scaling to cover area
        const scale = Math.max(
          imgWidth / img.width,
          imgHeight / img.height
        );
        const scaledWidth = img.width * scale;
        const scaledHeight = img.height * scale;
        const offsetX = imgX + (imgWidth - scaledWidth) / 2;
        const offsetY = imgY + (imgHeight - scaledHeight) / 2;

        ctx.drawImage(img, offsetX, offsetY, scaledWidth, scaledHeight);
        ctx.restore();

        // Draw title after image
        drawTitle();
      };
      img.src = image;
    } else {
      // Draw title immediately if no image
      drawTitle();
    }

    function drawTitle() {
      if (!ctx) return;

      // Draw title text directly on the tab (no background box)
      // Text centered between P6 and P5 (horizontally) and P6 and P7 (vertically)
      ctx.fillStyle = titleTextColor;
      const fontSize = Math.min(size * 0.048, 24);
      ctx.font = `${fontWeight} ${fontSize}px Arial, sans-serif`;
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";

      // Center text in the tab using geometric coordinates
      const textX = P6_x + (tabWidth / 2);      // Midpoint between P6 and P5
      const textY = P6_y + (tabHeight / 2);     // Midpoint between P6 and P7
      ctx.fillText(title.toUpperCase(), textX, textY);
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
