import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { normalizePath } from "vite";
import path from "path";
import postcssConfig from "./postcss.config.js";

const resolve = (str: string) => normalizePath(path.resolve(__dirname, str));
const variablePath = resolve("src/variables.scss");

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react({
      babel: {
        plugins: ["babel-plugin-styled-components", "@emotion/babel-plugin"],
      },
      jsxImportSource: "@emotion/react",
    }),
  ],
  css: {
    postcss: postcssConfig,
    modules: {
      generateScopedName: "[name]__[local]___[hash:base64:5]",
    },
    preprocessorOptions: {
      scss: {
        additionalData: `@import "${variablePath}";`,
      },
    },
  },
});
