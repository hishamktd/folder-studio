/**
 * Canvas geometry calculations
 */

import { CanvasConfig, FolderGeometry, Point } from '@/types/folder';
import {
  DEFAULT_CANVAS_SIZE,
  CANVAS_RATIOS,
  CANVAS_STYLES
} from '@/constants/canvas';

/**
 * Create canvas configuration based on size
 */
export function createCanvasConfig(size: number = DEFAULT_CANVAS_SIZE): CanvasConfig {
  const W = size * CANVAS_RATIOS.WIDTH_RATIO;
  const H = size * CANVAS_RATIOS.HEIGHT_RATIO;
  const wt = W * CANVAS_RATIOS.TAB_WIDTH_RATIO;
  const ht = size * CANVAS_RATIOS.TAB_HEIGHT_RATIO;

  return {
    size,
    folderWidth: W,
    folderHeight: H,
    tabWidth: wt,
    tabHeight: ht,
    cornerRadius: CANVAS_STYLES.CORNER_RADIUS,
  };
}

/**
 * Calculate folder geometry points
 */
export function calculateFolderGeometry(config: CanvasConfig): FolderGeometry {
  const { size, folderWidth, folderHeight, tabWidth, tabHeight } = config;

  const folderX = (size - folderWidth) / 2;
  const folderY = size * CANVAS_RATIOS.FOLDER_Y_OFFSET;
  const x_offset = 0; // Tab x-position (starting from left)

  // P1-P8 points following the geometric model
  // P1 (bottom-left)
  const P1: Point = {
    x: folderX,
    y: folderY + folderHeight,
  };

  // P2 (bottom-right)
  const P2: Point = {
    x: folderX + folderWidth,
    y: P1.y,
  };

  // P3 (top-right of body)
  const P3: Point = {
    x: P2.x,
    y: folderY + tabHeight,
  };

  // P4 (right side of tab base)
  const P4: Point = {
    x: folderX + x_offset + tabWidth,
    y: P3.y,
  };

  // P5 (top-right of tab)
  const P5: Point = {
    x: P4.x,
    y: folderY,
  };

  // P6 (top-left of tab)
  const P6: Point = {
    x: folderX + x_offset,
    y: folderY,
  };

  // P7 (left side of tab base)
  const P7: Point = {
    x: P6.x,
    y: P3.y,
  };

  // P8 (top-left of body)
  const P8: Point = {
    x: P1.x,
    y: P3.y,
  };

  return {
    P1,
    P2,
    P3,
    P4,
    P5,
    P6,
    P7,
    P8,
    folderX,
    folderY,
  };
}

/**
 * Calculate text position (centered on tab)
 */
export function calculateTextPosition(
  geometry: FolderGeometry,
  config: CanvasConfig
): Point {
  const { P6 } = geometry;
  const { tabWidth, tabHeight } = config;

  return {
    x: P6.x + tabWidth / 2,
    y: P6.y + tabHeight / 2,
  };
}

/**
 * Calculate image area dimensions
 */
export function calculateImageArea(
  geometry: FolderGeometry,
  config: CanvasConfig
): {
  x: number;
  y: number;
  width: number;
  height: number;
} {
  const { folderX, folderY } = geometry;
  const { folderWidth, folderHeight, tabHeight } = config;

  return {
    x: folderX,
    y: folderY + tabHeight,
    width: folderWidth,
    height: folderHeight - tabHeight,
  };
}
