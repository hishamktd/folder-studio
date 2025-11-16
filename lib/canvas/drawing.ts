/**
 * Canvas drawing utilities
 */

import { FolderGeometry, CanvasConfig } from '@/types/folder';
import { CANVAS_STYLES, SHADOW_STYLES } from '@/constants/canvas';

/**
 * Draw rounded rectangle path
 */
export function drawRoundedRect(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  width: number,
  height: number,
  radius: number
): void {
  ctx.beginPath();
  ctx.moveTo(x + radius, y);
  ctx.lineTo(x + width - radius, y);
  ctx.arcTo(x + width, y, x + width, y + radius, radius);
  ctx.lineTo(x + width, y + height - radius);
  ctx.arcTo(x + width, y + height, x + width - radius, y + height, radius);
  ctx.lineTo(x + radius, y + height);
  ctx.arcTo(x, y + height, x, y + height - radius, radius);
  ctx.lineTo(x, y + radius);
  ctx.arcTo(x, y, x + radius, y, radius);
  ctx.closePath();
}

/**
 * Draw folder body
 */
export function drawFolderBody(
  ctx: CanvasRenderingContext2D,
  geometry: FolderGeometry,
  config: CanvasConfig,
  color: string
): void {
  const { P1, P2, P3, P8 } = geometry;
  const { cornerRadius } = config;

  ctx.fillStyle = color;
  ctx.beginPath();

  // Start at P1 (bottom-left)
  ctx.moveTo(P1.x + cornerRadius, P1.y);

  // Bottom edge to P2
  ctx.lineTo(P2.x - cornerRadius, P2.y);

  // Bottom-right corner (P2)
  ctx.arcTo(P2.x, P2.y, P2.x, P2.y - cornerRadius, cornerRadius);

  // Right edge to P3
  ctx.lineTo(P3.x, P3.y + cornerRadius);

  // Top-right corner (P3)
  ctx.arcTo(P3.x, P3.y, P3.x - cornerRadius, P3.y, cornerRadius);

  // Top edge to P8
  ctx.lineTo(P8.x, P8.y);

  // Left edge back to P1
  ctx.lineTo(P1.x, P1.y - cornerRadius);

  // Bottom-left corner
  ctx.arcTo(P1.x, P1.y, P1.x + cornerRadius, P1.y, cornerRadius);

  ctx.closePath();
  ctx.fill();
}

/**
 * Draw folder tab
 */
export function drawFolderTab(
  ctx: CanvasRenderingContext2D,
  geometry: FolderGeometry,
  config: CanvasConfig,
  color: string
): void {
  const { P4, P5, P6, P7 } = geometry;
  const { cornerRadius } = config;

  ctx.fillStyle = color;
  ctx.beginPath();

  // Start at P7
  ctx.moveTo(P7.x, P7.y);

  // Up to P6
  ctx.lineTo(P6.x, P6.y + cornerRadius);

  // Top-left corner of tab
  ctx.arcTo(P6.x, P6.y, P6.x + cornerRadius, P6.y, cornerRadius);

  // Top edge to P5
  ctx.lineTo(P5.x - cornerRadius, P5.y);

  // Top-right corner of tab
  ctx.arcTo(P5.x, P5.y, P5.x, P5.y + cornerRadius, cornerRadius);

  // Down to P4
  ctx.lineTo(P4.x, P4.y);

  // Bottom edge back to P7
  ctx.lineTo(P7.x, P7.y);

  ctx.closePath();
  ctx.fill();
}

/**
 * Draw inner shadow effect under the tab
 */
export function drawInnerShadow(
  ctx: CanvasRenderingContext2D,
  geometry: FolderGeometry,
  config: CanvasConfig
): void {
  const { P8, folderX } = geometry;
  const { tabWidth } = config;

  const gradient = ctx.createLinearGradient(
    0,
    P8.y,
    0,
    P8.y + CANVAS_STYLES.INNER_SHADOW_HEIGHT
  );

  gradient.addColorStop(0, SHADOW_STYLES.INNER_SHADOW_START);
  gradient.addColorStop(1, SHADOW_STYLES.INNER_SHADOW_END);

  ctx.fillStyle = gradient;
  ctx.fillRect(folderX, P8.y, tabWidth, CANVAS_STYLES.INNER_SHADOW_HEIGHT);
}

/**
 * Set shadow for drawing
 */
export function setShadow(
  ctx: CanvasRenderingContext2D,
  color: string,
  blur: number,
  offsetY: number
): void {
  ctx.shadowColor = color;
  ctx.shadowBlur = blur;
  ctx.shadowOffsetX = 0;
  ctx.shadowOffsetY = offsetY;
}

/**
 * Reset shadow
 */
export function resetShadow(ctx: CanvasRenderingContext2D): void {
  ctx.shadowBlur = 0;
  ctx.shadowOffsetX = 0;
  ctx.shadowOffsetY = 0;
}

/**
 * Create clipping path for image area
 */
export function createImageClipPath(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  width: number,
  height: number,
  cornerRadius: number
): void {
  ctx.beginPath();

  // Top edge (straight, no curve)
  ctx.moveTo(x, y);
  ctx.lineTo(x + width - cornerRadius, y);

  // Top-right corner
  ctx.arcTo(x + width, y, x + width, y + cornerRadius, cornerRadius);

  // Right edge
  ctx.lineTo(x + width, y + height - cornerRadius);

  // Bottom-right corner
  ctx.arcTo(x + width, y + height, x + width - cornerRadius, y + height, cornerRadius);

  // Bottom edge
  ctx.lineTo(x + cornerRadius, y + height);

  // Bottom-left corner
  ctx.arcTo(x, y + height, x, y + height - cornerRadius, cornerRadius);

  // Left edge
  ctx.lineTo(x, y);

  ctx.closePath();
  ctx.clip();
}

/**
 * Calculate image scaling to cover area
 */
export function calculateImageScale(
  imgWidth: number,
  imgHeight: number,
  targetWidth: number,
  targetHeight: number
): {
  scale: number;
  scaledWidth: number;
  scaledHeight: number;
  offsetX: number;
  offsetY: number;
  targetX: number;
  targetY: number;
} {
  const scale = Math.max(targetWidth / imgWidth, targetHeight / imgHeight);
  const scaledWidth = imgWidth * scale;
  const scaledHeight = imgHeight * scale;

  return {
    scale,
    scaledWidth,
    scaledHeight,
    offsetX: (targetWidth - scaledWidth) / 2,
    offsetY: (targetHeight - scaledHeight) / 2,
    targetX: 0,
    targetY: 0,
  };
}
