import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./data/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#0F3D2E",
          dark: "#08261D",
        },
        accent: "#D7A84F",
        bg: "#F7F1E8",
        surface: "#FFFFFF",
        ink: "#161616",
        muted: "#5E625F",
        success: "#168A4A",
        urgency: "#B42318",
        border: "#E6DDD0",
      },
      fontFamily: {
        arabic: ["var(--font-cairo)", "var(--font-tajawal)", "sans-serif"],
        latin: ["var(--font-inter)", "sans-serif"],
      },
      maxWidth: {
        content: "1200px",
      },
      borderRadius: {
        cta: "16px",
      },
    },
  },
  plugins: [],
};

export default config;
