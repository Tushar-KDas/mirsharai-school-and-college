import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          navy: "#12315A",
          blue: "#2563EB",
          DEFAULT: "#12315A",
        },
        navy: {
          800: "#1A4073",
          900: "#12315A",
          950: "#0B1E38",
        },
        accent: {
          blue: "#2563EB",
          light: "#3B82F6",
          dark: "#1D4ED8",
        },
        surface: "#FFFFFF",
        pageBg: "#F8FAFC",
        textMain: "#0F172A",
        textMuted: "#64748B",
        success: {
          DEFAULT: "#16A34A",
          50: "#F0FDF4",
          100: "#DCFCE7",
          600: "#16A34A",
          700: "#15803D",
        },
        warning: {
          DEFAULT: "#D97706",
          50: "#FFFBEB",
          100: "#FEF3C7",
          500: "#F59E0B",
          600: "#D97706",
        },
        danger: {
          DEFAULT: "#DC2626",
          50: "#FEF2F2",
          100: "#FEE2E2",
          600: "#DC2626",
          700: "#B91C1C",
        },
      },
      fontFamily: {
        sans: ["system-ui", "-apple-system", "BlinkMacSystemFont", "Segoe UI", "Roboto", "Noto Sans Bengali", "sans-serif"],
        bengali: ["Noto Sans Bengali", "system-ui", "sans-serif"],
      },
    },
  },
  plugins: [],
};

export default config;
