import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { normalizePath } from "vite";
import path from "path";

const resolve = (str: string) => normalizePath(path.resolve(__dirname, str));
const variablePath = resolve("src/variables.scss");

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@import "${variablePath}";`,
      },
    },
  },
});
