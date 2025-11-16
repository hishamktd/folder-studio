/**
 * Canvas rendering constants
 */

/**
 * Default canvas size
 */
export const DEFAULT_CANVAS_SIZE = 512;

/**
 * Canvas dimension ratios based on geometric model
 */
export const CANVAS_RATIOS = {
  WIDTH_RATIO: 0.95,        // Total width relative to canvas size
  HEIGHT_RATIO: 0.67,       // Back panel height ratio
  FRONT_HEIGHT_RATIO: 0.62, // Front panel height ratio (Hf < H)
  TAB_WIDTH_RATIO: 0.44,    // Tab width ratio
  TAB_HEIGHT_RATIO: 0.10,   // Tab height ratio
  FOLDER_Y_OFFSET: 0.15,    // Vertical positioning offset
} as const;

/**
 * Canvas styling constants
 */
export const CANVAS_STYLES = {
  CORNER_RADIUS: 15,
  SHADOW_BLUR: 25,
  SHADOW_OFFSET_Y: 12,
  TAB_SHADOW_BLUR: 8,
  TAB_SHADOW_OFFSET_Y: 3,
  INNER_SHADOW_HEIGHT: 15,
} as const;

/**
 * Text rendering constants
 */
export const TEXT_STYLES = {
  FONT_SIZE_RATIO: 0.048,
  MAX_FONT_SIZE: 24,
  FONT_FAMILY: 'Arial, sans-serif',
  TEXT_ALIGN: 'center' as CanvasTextAlign,
  TEXT_BASELINE: 'middle' as CanvasTextBaseline,
} as const;

/**
 * Shadow and depth effect constants
 */
export const SHADOW_STYLES = {
  INNER_SHADOW_START: 'rgba(0, 0, 0, 0.3)',
  INNER_SHADOW_END: 'rgba(0, 0, 0, 0)',
  TAB_SHADOW: 'rgba(0, 0, 0, 0.4)',
} as const;

/**
 * Image rendering constants
 */
export const IMAGE_STYLES = {
  CROSS_ORIGIN: 'anonymous' as const,
  IMAGE_RENDERING: 'crisp-edges' as const,
} as const;
