"use client";

import { version } from "../package.json";

export default function Footer() {
  return (
    <footer className="mt-16 pb-8">
      <div className="border-t border-gray-700/50 pt-8">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-gray-500 text-sm">
          <div className="flex items-center gap-2">
            <span className="text-cyan-400 font-semibold">Folder Studio</span>
            <span>v{version}</span>
            <span className="text-gray-700">|</span>
            <span>2025</span>
          </div>

          <div className="flex items-center gap-4">
            <a
              href="https://folder-studio.vercel.app"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-cyan-400 transition-colors"
            >
              Live Demo
            </a>
            <span className="text-gray-700">|</span>
            <a
              href="https://github.com/yourusername/folder-studio"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-cyan-400 transition-colors"
            >
              GitHub
            </a>
            <span className="text-gray-700">|</span>
            <a
              href="https://github.com/yourusername/folder-studio/blob/main/CHANGELOG.md"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-cyan-400 transition-colors"
            >
              Changelog
            </a>
          </div>

          <div className="flex items-center gap-2">
            <span>Built with</span>
            <span className="text-cyan-400">Next.js</span>
            <span>&</span>
            <span className="text-purple-400">TypeScript</span>
          </div>
        </div>

        <div className="text-center mt-4 text-xs text-gray-600">
          <p>Create beautiful custom folder icons with modern, neon-styled designs</p>
        </div>
      </div>
    </footer>
  );
}
