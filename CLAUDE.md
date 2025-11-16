# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Folder Studio is a modern web application for generating custom folder icons with neon-styled designs. Built with Next.js 16 (App Router), TypeScript, and Tailwind CSS, it uses the Canvas API for real-time icon rendering and export.

## Development Commands

```bash
# Install dependencies
pnpm install

# Start development server (http://localhost:3000)
pnpm dev

# Build for production
pnpm build

# Start production server
pnpm start

# Run linter
pnpm lint
```

## Architecture

### Component Structure

The application follows a modular component architecture with clear separation of concerns:

- **FolderGenerator** (`components/FolderGenerator.tsx`) - Main orchestrator component that composes the UI using custom hooks for state management
- **ControlPanel** (`components/ControlPanel.tsx`) - Left sidebar with all user controls (image upload, style selection, customization options)
- **FolderPreview** (`components/FolderPreview.tsx`) - Right panel containing the canvas preview that renders in real-time

### Custom Hooks Pattern

State management is organized using custom React hooks (all in `hooks/`):

- `useImageUpload` - Handles image upload and clipboard paste functionality
- `useFolderConfig` - Manages folder configuration state (title, style, colors, font weight, export format)
- `useFolderCanvas` - Manages canvas rendering lifecycle and updates
- `useExport` - Handles exporting icons in different sizes and formats (PNG/ICO)

### Core Library Structure

Business logic is separated into specialized modules under `lib/`:

- **canvas/** - Canvas rendering logic
  - `geometry.ts` - Calculates folder shape geometry and coordinates
  - `drawing.ts` - Low-level canvas drawing operations (paths, shadows, gradients)
  - `renderer.ts` - High-level rendering orchestration (combines geometry + drawing)

- **image/** - Image handling
  - `upload.ts` - File upload processing
  - `clipboard.ts` - Clipboard paste functionality

- **export/** - Export functionality
  - `png.ts` - PNG export logic
  - `ico.ts` - ICO format conversion
  - `saver.ts` - File download handling

### Style System

Folder styles are defined in `constants/styles.ts` with three categories:
- `MODERN_NEON_STYLES` - Modern professional styles (8 presets)
- `ANIME_STYLES` - Anime-themed styles (6 presets)
- `FILM_STYLES` - Film-themed styles (6 presets)

All combined into `FOLDER_STYLES` array. Each style has a `name`, `value`, and `colors` object with `base`, `top`, and `shadow` properties.

### Type System

TypeScript types are centralized in `types/folder.ts`:
- `FolderConfig` - Main configuration state interface
- `FolderStyle` - Style preset definition
- `CanvasConfig` - Canvas rendering configuration
- `FolderGeometry` - Geometric coordinates for folder shape
- `ExportFormat` - 'ico' | 'png' union type

### Canvas Rendering Flow

1. User makes changes in ControlPanel
2. State updates via custom hooks
3. FolderPreview receives new props
4. `useFolderCanvas` hook detects changes
5. Calls `renderFolderIcon()` from `lib/canvas/renderer.ts`
6. Renderer uses:
   - `calculateFolderGeometry()` to get coordinates
   - `drawFolderBase()` and `drawFolderTab()` for the shape
   - Image compositing for user's uploaded image
   - Text rendering for the title

### Path Alias

The project uses `@/*` path alias (configured in `tsconfig.json`) to reference root directory files. Always use `@/` imports instead of relative paths:
- `@/components/*`
- `@/hooks/*`
- `@/lib/*`
- `@/types/*`
- `@/constants/*`

### SEO and Metadata

SEO optimization is implemented in:
- `app/layout.tsx` - Meta tags, OpenGraph, Twitter cards
- `app/sitemap.ts` - Dynamic sitemap generation
- `app/structured-data.tsx` - JSON-LD structured data for search engines

## Key Implementation Details

### Folder Geometry

The folder icon uses a distinctive tab design with 8 coordinate points (P1-P8) calculated in `lib/canvas/geometry.ts`. The tab creates a professional folder appearance with rounded corners.

### Export Format Support

- **PNG**: Direct canvas export via `toBlob()`
- **ICO**: Multi-resolution ICO generation with BMP encoding (Windows icon format)

Export sizes: 128x128, 256x256, 512x512, 1024x1024

### Canvas Size

Default canvas size is 1024x1024 for preview. Exports scale the entire rendering to requested size while maintaining proportions.

## File Naming Conventions

- Components: PascalCase (e.g., `FolderGenerator.tsx`)
- Hooks: camelCase with "use" prefix (e.g., `useFolderConfig.ts`)
- Utilities/Libraries: camelCase (e.g., `geometry.ts`, `renderer.ts`)
- Types: camelCase (e.g., `folder.ts`)
- Constants: camelCase (e.g., `styles.ts`)

## Package Manager

This project uses **pnpm** (specified in `package.json` as packageManager). Always use `pnpm` commands, not `npm` or `yarn`.
