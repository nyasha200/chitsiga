import type { Config } from "tailwindcss";

export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        black: "#313131",
        "gray-1": "#333333",
        "brown-1": "#ff8659",
        "brown-2": "#ff8f61",
        "orange": "#ff3118",
        "red-1": "#ff0000",
        "red-2": "#b50000"
      },
    },
  },
  plugins: [],
} satisfies Config;
