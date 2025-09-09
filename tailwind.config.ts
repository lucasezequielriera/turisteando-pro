import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: { slatebg: "#0b1120", slatecard: "#0f172a" },
    },
  },
  plugins: [],
};
export default config;