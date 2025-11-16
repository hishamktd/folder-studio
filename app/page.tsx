"use client";

import FolderGenerator from "@/components/FolderGenerator";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black">
      <div className="container mx-auto px-4 py-8">
        <header className="text-center mb-12">
          <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
            Folder Studio
          </h1>
          <p className="text-gray-400 text-lg">
            Create beautiful custom folder icons with modern, neon-styled designs
          </p>
        </header>

        <FolderGenerator />

        <Footer />
      </div>
    </main>
  );
}
