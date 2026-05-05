import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#fbb21c",
          dark: "#eab308",
          light: "#fcd34d",
        },
        accent: {
          DEFAULT: "#000000",
          dark: "#000000",
        },
        foreground: "#0f172a",
        muted: "#64748b",
        light: "#f8fafc",
        border: "#e2e8f0",
      },
      fontFamily: {
        sans: ["var(--font-inter)", "Inter", "sans-serif"],
      },
    },
  },
  plugins: [],
};

export default config;
