# Changelog

All notable changes to Folder Studio will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.2.0] - 2025-11-17

### Added

- **Image URL Loading**
  - Direct image URL input field in the Image section
  - Automatic image fetching and conversion from external URLs
  - Support for Enter key to quickly load images
  - CORS-enabled loading with automatic canvas conversion
  - Validation and error handling for invalid URLs
  - URL input clears automatically after successful load

- **Remove Image Feature**
  - New "Remove Image" button appears when image is loaded
  - Quick way to clear the current image and start fresh
  - Clean state reset without reloading the page
  - Maintains all other settings (title, style, colors)

### Improved

- **Enhanced Image Upload Experience**
  - Three ways to add images: file upload, clipboard paste, or URL
  - Organized image section with clear labels
  - Better visual feedback for loaded images
  - Improved image preview display with remove option

### Technical Changes

- Added `loadImageFromUrl` function in `useImageUpload` hook
- Enhanced error handling for URL validation and CORS issues
- Updated `ControlPanel` component with URL input and remove button
- Improved state management for image operations

## [1.1.0] - 2025-11-17

### Major Refactoring

- **Complete codebase refactoring** with professional architecture
  - Created proper directory structure with clear separation of concerns
  - Extracted business logic from components into dedicated modules
  - Centralized all constants and configuration
  - Implemented comprehensive TypeScript type system
  - Created custom React hooks for state management
  - Built reusable UI component library

### New Directory Structure

- **constants/** - Centralized constants and configuration
  - `canvas.ts` - Canvas rendering constants and ratios
  - `defaults.ts` - Default values and app metadata
  - `styles.ts` - Folder styles organized by category (Modern, Anime, Film)

- **types/** - Comprehensive TypeScript type definitions
  - `folder.ts` - Core type system for all application types

- **lib/** - Business logic and utilities
  - `canvas/` - Modular canvas rendering (geometry, drawing, renderer)
  - `export/` - Export utilities (ICO, PNG, file saver)
  - `image/` - Image handling (upload, clipboard)

- **hooks/** - Custom React hooks
  - `useImageUpload` - Image upload and clipboard paste handling
  - `useFolderCanvas` - Canvas rendering with reactive updates
  - `useFolderConfig` - Folder configuration state management
  - `useExport` - Export functionality with error handling

- **components/ui/** - Reusable UI components
  - `Button` - Configurable button with variants
  - `ColorPicker` - Dual input color picker
  - `Input` - Styled text input
  - `Select` - Styled select dropdown
  - `SectionCard` - Consistent section wrapper
  - `StyleButton` - Style selection button

### Code Quality Improvements

- **Component Refactoring**
  - FolderGenerator: 122 lines → 64 lines (-47% reduction)
  - FolderPreview: 255 lines → 60 lines (-76% reduction)
  - ControlPanel: 270 lines → 211 lines (-22% reduction)

- **Type Safety**
  - Added comprehensive TypeScript interfaces
  - Better IDE autocomplete and IntelliSense
  - Compile-time error detection
  - Self-documenting code

- **Code Organization**
  - Separated business logic from presentation
  - Single responsibility principle applied
  - Eliminated code duplication
  - Improved maintainability and testability

### Technical Enhancements

- **Canvas Rendering**
  - Modular geometry calculations
  - Reusable drawing primitives
  - Clean rendering orchestration
  - Better performance with optimized hooks

- **State Management**
  - Custom hooks for encapsulated state
  - Reduced prop drilling
  - Cleaner component APIs
  - Better separation of concerns

- **Error Handling**
  - Proper error states in hooks
  - Loading states for async operations
  - Better user feedback

### Version Consistency

- Fixed version inconsistencies across files
- Single source of truth in `constants/defaults.ts`
- Updated all references to use centralized metadata

### Documentation

- Added comprehensive `REFACTORING.md` documentation
  - Complete refactoring overview
  - Migration guide for future development
  - Code examples and best practices
  - Testing results and next steps

### Added Styles

- **Anime-themed folder styles** (6 styles)
  - Anime Sakura (pink cherry blossom)
  - Anime Blue (deep blue)
  - Anime Gold (golden yellow)
  - Anime Violet (deep purple)
  - Anime Crimson (deep red)
  - Anime Emerald (emerald green)

- **Film-themed folder styles** (6 styles)
  - Film Noir (classic black)
  - Film Sepia (vintage brown)
  - Film Hollywood (classic red)
  - Film Retro (retro cyan)
  - Film Purple (deep purple)
  - Film Gold (golden)

### Build & Testing

- ✅ TypeScript compilation successful
- ✅ Next.js production build successful
- ✅ All static pages generated
- ✅ Zero type errors
- ✅ Zero build warnings

## [1.0.1] - 2025-11-16

### Improved
- **Enhanced folder icon design** to match professional reference
  - Repositioned title bar to folder tab (top section)
  - Increased image area to cover most of the folder body
  - Improved folder proportions for more realistic appearance
  - Better tab shape with proper rounded corners
  - Larger, more prominent image display area
  - Title now appears on the folder tab (like real folder designs)
  - Enhanced shadow and depth effects
  - More accurate folder dimensions matching reference images

## [1.0.0] - 2025-11-16

### Added
- Initial release of Folder Studio
- Image upload functionality with file input
- Paste from clipboard feature for quick image import
- Live canvas-based preview with real-time updates
- 8 professional folder style presets:
  - Modern Red (reference-inspired design)
  - Neon Blue with cyan glow effects
  - Neon Purple with purple glow effects
  - Neon Pink with pink glow effects
  - Glass with glassmorphism effects
  - Matte Dark professional theme
  - Gradient Sunset (orange to yellow)
  - Gradient Ocean (teal to cyan)
- Custom title input with text customization
- 6 font weight options (Light to Extra Bold)
- Color picker for title background
- Color picker for title text
- Distinctive folder tab design matching reference aesthetic
- Professional shadow effects on folder icons
- Export functionality in 4 sizes:
  - Small (128x128)
  - Medium (256x256)
  - Large (512x512)
  - Extra Large (1024x1024)
- PNG export with transparency support
- Modern dark theme UI with neon accents
- Glassmorphism effects with backdrop blur
- Smooth transitions and hover effects
- Responsive grid layout
- Real-time preview updates
- Type-safe TypeScript implementation
- Next.js 16 App Router with Turbopack
- Tailwind CSS v3 for styling
- Full documentation (README, FEATURES, QUICK_START)

### Technical Details
- Built with Next.js 16.0.3
- TypeScript for type safety
- Tailwind CSS 3.4.18 for styling
- Canvas API for icon generation
- React 19.2.0
- pnpm package manager
- Production build optimized
- Vercel deployment ready

### Design
- Clean, minimal interface
- Dark theme with gradient backgrounds
- Neon glow effects on interactive elements
- Soft shadows and rounded corners
- Professional color palette
- User-friendly control panel layout
- Live preview panel with real-time rendering

---

## Future Releases

### [1.1.0] - Planned
- Additional folder style presets
- Custom gradient builder
- Icon templates library
- Batch export functionality
- Save/load custom presets
- Undo/redo functionality
- Image filters and adjustments
- More export format options (SVG, ICO)

### [1.2.0] - Planned
- Dark/light theme toggle
- Custom folder shape options
- Advanced text styling (shadows, outlines)
- Image positioning controls
- Rotation and scaling controls
- Layer management system
- Preset sharing functionality

---

## Version History

| Version | Release Date | Status |
|---------|-------------|--------|
| 1.2.0   | 2025-11-17  | ✅ Current |
| 1.1.0   | 2025-11-17  | Released |
| 1.0.1   | 2025-11-16  | Released |
| 1.0.0   | 2025-11-16  | Released |

---

## Deployment

- **Live URL**: https://folder-studio.vercel.app/
- **Platform**: Vercel
- **Status**: Production
- **Branch**: main
