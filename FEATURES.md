# Folder Studio - Features

## Core Features

### 1. Image Upload & Management
- **File Upload**: Standard file input supporting all image formats
- **Clipboard Paste**: Paste images directly from clipboard using the Clipboard API
- **Image Preview**: Real-time preview of uploaded image in the control panel

### 2. Title Customization
- **Custom Text**: Enter any title text for your folder
- **Font Weight Options**:
  - Light (300)
  - Regular (400)
  - Medium (500)
  - Semi Bold (600)
  - Bold (700) - Default
  - Extra Bold (800)

### 3. Color Customization
- **Title Background Color**: Full color picker + hex input
- **Title Text Color**: Full color picker + hex input
- Real-time color updates in preview

### 4. Folder Style Presets

#### Modern Red
- Base: #8B1538
- Top: #C41E3A
- Matches the reference Demon Slayer folder design

#### Neon Blue
- Base: #0284c7
- Top: #22d3ee
- Cyan neon glow effect

#### Neon Purple
- Base: #7c3aed
- Top: #a78bfa
- Purple neon glow effect

#### Neon Pink
- Base: #db2777
- Top: #ec4899
- Pink neon glow effect

#### Glass
- Base: rgba(255, 255, 255, 0.1)
- Top: rgba(255, 255, 255, 0.2)
- Glassmorphism effect

#### Matte Dark
- Base: #1f2937
- Top: #374151
- Dark, professional look

#### Gradient Sunset
- Base: #f97316 (Orange)
- Top: #fbbf24 (Yellow)
- Warm gradient effect

#### Gradient Ocean
- Base: #0891b2 (Teal)
- Top: #06b6d4 (Cyan)
- Cool ocean gradient

### 5. Live Canvas Preview
- **Real-time Rendering**: Canvas-based rendering updates instantly
- **Folder Shape**:
  - Distinctive tab design (matching reference)
  - Rounded corners
  - Professional shadow effects
- **Image Scaling**: Automatic image scaling to fit folder content area
- **512x512 Preview**: High-quality preview resolution

### 6. Export Options
Multiple size options for different use cases:
- **Small (128x128)**: For compact displays
- **Medium (256x256)**: Standard folder icon size
- **Large (512x512)**: High-resolution displays
- **Extra Large (1024x1024)**: Retina/4K displays

Export format: PNG with transparency

## UI/UX Features

### Design Elements
- **Dark Theme**: Professional dark background
- **Neon Accents**: Cyan, purple, and pink neon glow effects
- **Glassmorphism**: Backdrop blur on panels
- **Smooth Transitions**: All interactive elements have smooth transitions
- **Responsive Grid**: Adapts to different screen sizes

### User Experience
- **Clean Layout**: Two-column layout with controls on left, preview on right
- **Organized Sections**: Each control group in its own card
- **Visual Feedback**: Selected styles highlighted with neon borders
- **Accessibility**: Clear labels and good contrast ratios

## Technical Implementation

### Canvas Rendering
The folder icon is drawn using HTML Canvas API with:
1. Shadow layer for depth
2. Folder base (main body)
3. Folder tab (top section with distinctive curve)
4. Image content area (with clipping and scaling)
5. Title bar overlay (with custom colors)
6. Title text (with custom font weight and color)

### Architecture
- **Component-based**: Modular React components
- **Type-safe**: Full TypeScript support
- **Server-side**: Next.js App Router
- **Client-side rendering**: Canvas operations in browser

### Performance
- **Efficient re-renders**: Only updates canvas when values change
- **Image caching**: Browser handles image caching
- **Optimized exports**: Direct canvas-to-blob conversion
