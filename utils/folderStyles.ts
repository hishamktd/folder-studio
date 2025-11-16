export interface FolderStyle {
  name: string;
  value: string;
  colors: {
    base: string;
    top: string;
    shadow: string;
  };
}

export const folderStyles: FolderStyle[] = [
  {
    name: "Modern Red",
    value: "modern-red",
    colors: {
      base: "#8B1538",
      top: "#C41E3A",
      shadow: "rgba(139, 21, 56, 0.5)",
    },
  },
  {
    name: "Neon Blue",
    value: "neon-blue",
    colors: {
      base: "#0284c7",
      top: "#22d3ee",
      shadow: "rgba(34, 211, 238, 0.6)",
    },
  },
  {
    name: "Neon Purple",
    value: "neon-purple",
    colors: {
      base: "#7c3aed",
      top: "#a78bfa",
      shadow: "rgba(168, 85, 247, 0.6)",
    },
  },
  {
    name: "Neon Pink",
    value: "neon-pink",
    colors: {
      base: "#db2777",
      top: "#ec4899",
      shadow: "rgba(236, 72, 153, 0.6)",
    },
  },
  {
    name: "Glass",
    value: "glass",
    colors: {
      base: "rgba(255, 255, 255, 0.1)",
      top: "rgba(255, 255, 255, 0.2)",
      shadow: "rgba(255, 255, 255, 0.1)",
    },
  },
  {
    name: "Matte Dark",
    value: "matte-dark",
    colors: {
      base: "#1f2937",
      top: "#374151",
      shadow: "rgba(0, 0, 0, 0.5)",
    },
  },
  {
    name: "Gradient Sunset",
    value: "gradient-sunset",
    colors: {
      base: "#f97316",
      top: "#fbbf24",
      shadow: "rgba(249, 115, 22, 0.6)",
    },
  },
  {
    name: "Gradient Ocean",
    value: "gradient-ocean",
    colors: {
      base: "#0891b2",
      top: "#06b6d4",
      shadow: "rgba(8, 145, 178, 0.6)",
    },
  },
  // Anime-themed styles
  {
    name: "Anime Sakura",
    value: "anime-sakura",
    colors: {
      base: "#ff6b9d",
      top: "#ffa6c9",
      shadow: "rgba(255, 107, 157, 0.6)",
    },
  },
  {
    name: "Anime Blue",
    value: "anime-blue",
    colors: {
      base: "#1e40af",
      top: "#3b82f6",
      shadow: "rgba(59, 130, 246, 0.6)",
    },
  },
  {
    name: "Anime Gold",
    value: "anime-gold",
    colors: {
      base: "#d97706",
      top: "#fbbf24",
      shadow: "rgba(251, 191, 36, 0.6)",
    },
  },
  {
    name: "Anime Violet",
    value: "anime-violet",
    colors: {
      base: "#6b21a8",
      top: "#a855f7",
      shadow: "rgba(168, 85, 247, 0.6)",
    },
  },
  {
    name: "Anime Crimson",
    value: "anime-crimson",
    colors: {
      base: "#991b1b",
      top: "#dc2626",
      shadow: "rgba(220, 38, 38, 0.6)",
    },
  },
  {
    name: "Anime Emerald",
    value: "anime-emerald",
    colors: {
      base: "#047857",
      top: "#10b981",
      shadow: "rgba(16, 185, 129, 0.6)",
    },
  },
  // Film-themed styles
  {
    name: "Film Noir",
    value: "film-noir",
    colors: {
      base: "#000000",
      top: "#1f1f1f",
      shadow: "rgba(0, 0, 0, 0.8)",
    },
  },
  {
    name: "Film Sepia",
    value: "film-sepia",
    colors: {
      base: "#704214",
      top: "#92400e",
      shadow: "rgba(112, 66, 20, 0.6)",
    },
  },
  {
    name: "Film Hollywood",
    value: "film-hollywood",
    colors: {
      base: "#b91c1c",
      top: "#ef4444",
      shadow: "rgba(239, 68, 68, 0.6)",
    },
  },
  {
    name: "Film Retro",
    value: "film-retro",
    colors: {
      base: "#0e7490",
      top: "#06b6d4",
      shadow: "rgba(6, 182, 212, 0.6)",
    },
  },
  {
    name: "Film Purple",
    value: "film-purple",
    colors: {
      base: "#581c87",
      top: "#9333ea",
      shadow: "rgba(147, 51, 234, 0.6)",
    },
  },
  {
    name: "Film Gold",
    value: "film-gold",
    colors: {
      base: "#a16207",
      top: "#eab308",
      shadow: "rgba(234, 179, 8, 0.6)",
    },
  },
];

export const fontWeights = [
  { name: "Light", value: "300" },
  { name: "Regular", value: "400" },
  { name: "Medium", value: "500" },
  { name: "Semi Bold", value: "600" },
  { name: "Bold", value: "700" },
  { name: "Extra Bold", value: "800" },
];

export const exportSizes = [
  { name: "Small (128x128)", value: 128 },
  { name: "Medium (256x256)", value: 256 },
  { name: "Large (512x512)", value: 512 },
  { name: "Extra Large (1024x1024)", value: 1024 },
];
