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
        light: "#C0BCCA",
        dark: "#0F0E11",

        "gray-dark": "#273444",
        "gray-light": "#d3dce6",
      },
      fontFamily: {
        heebo: ["Heebo", "sans-serif"],
        work: ["Work Sans", "sans-serif"],
      },
    },
  },
  plugins: [],

  corePlugins: {
    preflight: true,
  },
  important: true,
};
export default config;
