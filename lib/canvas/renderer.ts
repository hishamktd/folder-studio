/**
 * Main canvas rendering orchestrator
 */

import { FolderStyle } from '@/types/folder';
import {
  createCanvasConfig,
  calculateFolderGeometry,
  calculateTextPosition,
  calculateImageArea,
} from './geometry';
import {
  drawFolderBody,
  drawFolderTab,
  drawInnerShadow,
  setShadow,
  resetShadow,
  createImageClipPath,
  calculateImageScale,
} from './drawing';
import {
  CANVAS_STYLES,
  TEXT_STYLES,
  SHADOW_STYLES,
  IMAGE_STYLES
} from '@/constants/canvas';

/**
 * Rendering options
 */
export interface RenderOptions {
  image: string | null;
  title: string;
  style: FolderStyle;
  fontWeight: string;
  titleTextColor: string;
  size?: number;
}

/**
 * Render folder icon to canvas
 */
export function renderFolderIcon(
  canvas: HTMLCanvasElement,
  options: RenderOptions,
  onComplete?: () => void
): void {
  const ctx = canvas.getContext('2d');
  if (!ctx) return;

  const { image, title, style, fontWeight, titleTextColor, size = 512 } = options;

  // Setup canvas
  canvas.width = size;
  canvas.height = size;

  // Clear canvas
  ctx.clearRect(0, 0, size, size);

  // Calculate geometry
  const config = createCanvasConfig(size);
  const geometry = calculateFolderGeometry(config);

  // Draw folder with shadow
  setShadow(
    ctx,
    style.colors.shadow,
    CANVAS_STYLES.SHADOW_BLUR,
    CANVAS_STYLES.SHADOW_OFFSET_Y
  );

  // Draw main folder body
  drawFolderBody(ctx, geometry, config, style.colors.base);

  // Reset shadow
  resetShadow(ctx);

  // Draw inner shadow under tab
  drawInnerShadow(ctx, geometry, config);

  // Draw folder tab with shadow
  setShadow(
    ctx,
    SHADOW_STYLES.TAB_SHADOW,
    CANVAS_STYLES.TAB_SHADOW_BLUR,
    CANVAS_STYLES.TAB_SHADOW_OFFSET_Y
  );

  drawFolderTab(ctx, geometry, config, style.colors.top);

  // Reset shadow
  resetShadow(ctx);

  // Draw image if provided
  if (image) {
    renderImage(ctx, image, geometry, config, () => {
      renderTitle(ctx, title, fontWeight, titleTextColor, geometry, config);
      if (onComplete) onComplete();
    });
  } else {
    renderTitle(ctx, title, fontWeight, titleTextColor, geometry, config);
    if (onComplete) onComplete();
  }
}

/**
 * Render image content
 */
function renderImage(
  ctx: CanvasRenderingContext2D,
  imageSrc: string,
  geometry: ReturnType<typeof calculateFolderGeometry>,
  config: ReturnType<typeof createCanvasConfig>,
  onComplete: () => void
): void {
  const img = new Image();
  img.crossOrigin = IMAGE_STYLES.CROSS_ORIGIN;

  img.onload = () => {
    const imageArea = calculateImageArea(geometry, config);

    // Create clipping path
    ctx.save();
    createImageClipPath(
      ctx,
      imageArea.x,
      imageArea.y,
      imageArea.width,
      imageArea.height,
      config.cornerRadius
    );

    // Calculate scaling
    const scaling = calculateImageScale(
      img.width,
      img.height,
      imageArea.width,
      imageArea.height
    );

    // Draw image
    ctx.drawImage(
      img,
      imageArea.x + scaling.offsetX,
      imageArea.y + scaling.offsetY,
      scaling.scaledWidth,
      scaling.scaledHeight
    );

    ctx.restore();
    onComplete();
  };

  img.onerror = () => {
    console.error('Failed to load image');
    onComplete();
  };

  img.src = imageSrc;
}

/**
 * Render title text
 */
function renderTitle(
  ctx: CanvasRenderingContext2D,
  title: string,
  fontWeight: string,
  color: string,
  geometry: ReturnType<typeof calculateFolderGeometry>,
  config: ReturnType<typeof createCanvasConfig>
): void {
  const textPos = calculateTextPosition(geometry, config);
  const fontSize = Math.min(
    config.size * TEXT_STYLES.FONT_SIZE_RATIO,
    TEXT_STYLES.MAX_FONT_SIZE
  );

  ctx.fillStyle = color;
  ctx.font = `${fontWeight} ${fontSize}px ${TEXT_STYLES.FONT_FAMILY}`;
  ctx.textAlign = TEXT_STYLES.TEXT_ALIGN;
  ctx.textBaseline = TEXT_STYLES.TEXT_BASELINE;

  ctx.fillText(title.toUpperCase(), textPos.x, textPos.y);
}

/**
 * Clear canvas
 */
export function clearCanvas(canvas: HTMLCanvasElement): void {
  const ctx = canvas.getContext('2d');
  if (!ctx) return;

  ctx.clearRect(0, 0, canvas.width, canvas.height);
}
