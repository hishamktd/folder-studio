# Folder Studio

[![Version](https://img.shields.io/badge/version-1.0.0-blue.svg)](https://github.com/yourusername/folder-studio)
[![Live Demo](https://img.shields.io/badge/demo-live-success.svg)](https://folder-studio.vercel.app)
[![License](https://img.shields.io/badge/license-MIT-green.svg)](LICENSE)

A modern, minimal, neon-styled Folder Icon Generator built with Next.js, TypeScript, and Tailwind CSS.

Create beautiful custom folder icons with a distinctive tab design, inspired by professional folder aesthetics.

**🌐 Live Demo**: [https://folder-studio.vercel.app](https://folder-studio.vercel.app)

## Features

- **Image Upload & Paste**: Upload images or paste directly from clipboard
- **Live Preview**: Real-time canvas-based preview of your folder icon with distinctive tab shape
- **Custom Title**: Add custom text with adjustable font weight (6 options)
- **Color Customization**: Full color picker for title background and text colors
- **8 Folder Style Presets**:
  - Modern Red (Inspired by professional designs)
  - Neon Blue with cyan glow
  - Neon Purple with purple glow
  - Neon Pink with pink glow
  - Glass (Glassmorphism effect)
  - Matte Dark (Professional dark theme)
  - Gradient Sunset (Orange to yellow)
  - Gradient Ocean (Teal to cyan)
- **Export Options**: Download in multiple sizes (128x128, 256x256, 512x512, 1024x1024)
- **Modern UI**: Clean, user-friendly interface with neon glow accents and glassmorphism

## Getting Started

### Prerequisites

- Node.js 18+
- pnpm (recommended) or npm

### Installation

1. Clone the repository:
```bash
git clone <your-repo-url>
cd folder-studio
```

2. Install dependencies:
```bash
pnpm install
```

3. Run the development server:
```bash
pnpm dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

## Usage

1. **Add an Image**: Click "Upload Image" or use "Paste from Clipboard" to add your image
2. **Customize Title**: Enter your folder name and select font weight
3. **Choose Colors**: Pick custom colors for the title background and text
4. **Select Style**: Choose from 8 different folder styles
5. **Export**: Click any size button to download your custom folder icon

## Tech Stack

- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Canvas API**: For icon generation
- **Package Manager**: pnpm

## Project Structure

```
folder-studio/
├── app/
│   ├── layout.tsx       # Root layout
│   ├── page.tsx         # Main page
│   └── globals.css      # Global styles
├── components/
│   ├── FolderGenerator.tsx  # Main generator component
│   ├── ControlPanel.tsx     # Controls sidebar
│   └── FolderPreview.tsx    # Canvas preview
├── utils/
│   └── folderStyles.ts      # Folder style definitions
├── public/              # Static assets
└── ...config files
```

## Scripts

- `pnpm dev` - Start development server
- `pnpm build` - Build for production
- `pnpm start` - Start production server
- `pnpm lint` - Run ESLint

## Deployment

The application is deployed on Vercel and is production-ready.

**Live URL**: [https://folder-studio.vercel.app](https://folder-studio.vercel.app)

### Deploy Your Own

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/yourusername/folder-studio)

1. Fork this repository
2. Connect to Vercel
3. Deploy with one click

The app is optimized for Vercel deployment with:
- Automatic builds on push
- Edge runtime support
- Optimized static assets
- Fast global CDN

## Version History

Current version: **1.0.0**

See [CHANGELOG.md](CHANGELOG.md) for detailed version history and release notes.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- Inspired by modern folder icon designs
- Built with Next.js and TypeScript
- Styled with Tailwind CSS
- Deployed on Vercel
