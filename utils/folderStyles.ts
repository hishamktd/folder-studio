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
