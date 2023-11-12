import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/app/**/*.{jsx,tsx}", "./src/components/**/*.{jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        light: "#C0BCCA",
        dark: "#0F0E11",

        primary: "#4D6066",
        "primary-light": "#EAEFF4",
        "primary-dark": "#242424",
        secondary: "#2A3447",
        cyan: "#19B3BD",
        "cyan-light": "#B8EBEF",
        warning: "#E72C59",
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
