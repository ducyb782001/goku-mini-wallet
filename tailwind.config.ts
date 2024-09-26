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
        background: "var(--background)",
        foreground: "var(--foreground)",
        backLine: "#ff0000",
        primary: "#00FFFF",
        primaryWhite: "#F5F5F5",
        primaryDark: "#00C9C9",
        secondary: "#003452",
        gray: "#827D9D",
        grayDark: "#373737",
        grayLight: "#2F2F2F",
        subBlue: "#00A2FD",
        subBg: "#050E25",
        bgInput: "#2F2F2F",
        blue: "#53B9EA",
        dangerous: "#F13535",
        blueDark: "#0067A2",
      },
    },
  },
  plugins: [],
};
export default config;
