/**
 * Default values and configurations
 */

import { FOLDER_STYLES, FONT_WEIGHTS } from './styles';
import { ExportFormat } from '@/types/folder';
import packageJson from '../package.json';

/**
 * Default folder configuration values
 */
export const DEFAULTS = {
  TITLE: 'FOLDER',
  STYLE: FOLDER_STYLES[0],
  FONT_WEIGHT: FONT_WEIGHTS[4].value, // Bold (700)
  TITLE_BG_COLOR: '#8B1538',
  TITLE_TEXT_COLOR: '#ffffff',
  EXPORT_FORMAT: 'ico' as ExportFormat,
} as const;

/**
 * Application metadata
 */
export const APP_METADATA = {
  NAME: packageJson.name,
  VERSION: packageJson.version,
  DESCRIPTION: packageJson.description,
  AUTHOR: packageJson.author,
} as const;
