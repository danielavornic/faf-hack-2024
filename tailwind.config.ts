import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          50: "#edeaff",
          100: "#ccc1f4",
          200: "#ac99e7",
          300: "#8d71dc",
          400: "#7248d0",
          500: "#502fb7",
          600: "#37248f",
          700: "#211968",
          800: "#110f40",
          "900": "#04031b"
        }
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic": "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
        hero: "radial-gradient(ellipse 130% 210% at 95% 0,#7248d0 10%,#04031b 70%)",
        "footer-gradient":
          "linear-gradient(0deg, #04031b 2%, rgba(0,0,0,0.2) 75%, rgba(0,0,0,0) 100%)"
      }
    }
  },
  plugins: []
};
export default config;
