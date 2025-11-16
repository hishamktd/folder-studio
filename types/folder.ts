/**
 * Core type definitions for Folder Studio
 */

/**
 * Folder style color scheme
 */
export interface FolderColors {
  base: string;
  top: string;
  shadow: string;
}

/**
 * Folder style configuration
 */
export interface FolderStyle {
  name: string;
  value: string;
  colors: FolderColors;
}

/**
 * Font weight configuration
 */
export interface FontWeight {
  name: string;
  value: string;
}

/**
 * Export size configuration
 */
export interface ExportSize {
  name: string;
  value: number;
}

/**
 * Export format types
 */
export type ExportFormat = 'ico' | 'png';

/**
 * Folder configuration state
 */
export interface FolderConfig {
  image: string | null;
  title: string;
  style: FolderStyle;
  fontWeight: string;
  titleBgColor: string;
  titleTextColor: string;
  exportFormat: ExportFormat;
}

/**
 * Canvas rendering configuration
 */
export interface CanvasConfig {
  size: number;
  folderWidth: number;
  folderHeight: number;
  tabWidth: number;
  tabHeight: number;
  cornerRadius: number;
}

/**
 * Geometric point
 */
export interface Point {
  x: number;
  y: number;
}

/**
 * Folder geometry points
 */
export interface FolderGeometry {
  P1: Point;
  P2: Point;
  P3: Point;
  P4: Point;
  P5: Point;
  P6: Point;
  P7: Point;
  P8: Point;
  folderX: number;
  folderY: number;
}
