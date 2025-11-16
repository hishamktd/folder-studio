import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
      boxShadow: {
        'neon': '0 0 5px theme("colors.cyan.400"), 0 0 20px theme("colors.cyan.600")',
        'neon-pink': '0 0 5px theme("colors.pink.400"), 0 0 20px theme("colors.pink.600")',
        'neon-purple': '0 0 5px theme("colors.purple.400"), 0 0 20px theme("colors.purple.600")',
      },
    },
  },
  plugins: [],
};

export default config;
