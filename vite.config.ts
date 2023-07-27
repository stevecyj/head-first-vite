import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { normalizePath } from "vite";
import path from "path";
import postcssConfig from "./postcss.config.js";
import viteEslint from "vite-plugin-eslint";
import viteStylelint from "vite-plugin-stylelint";
import svgr from "vite-plugin-svgr";
import viteImagemin from "vite-plugin-imagemin";
import { createSvgIconsPlugin } from "vite-plugin-svg-icons";

const resolve = (str: string) => normalizePath(path.resolve(__dirname, str));
const variablePath = resolve("src/variables.scss");

const isProduction = process.env.NODE_ENV === "production";
const CDN_URL = "https://xxx.xxx.xxx";

// here log the process.argv to the cli, ex. pnpm run dev -- --theme=11
// console.log("process =====> ", process.argv.slice(2));
const _argv = process.argv.slice(2);

function checkArgv(_argv: string[]) {
  if (!_argv.length) {
    return;
  }
}
checkArgv(_argv);

const regex = /^--theme=(\d+)$/;
const match = _argv[1]?.match(regex);
if (match) {
  console.log("theme =====> ", match[1]);
} else {
  console.log("no value found for --theme");
}

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react({
      babel: {
        plugins: ["babel-plugin-styled-components", "@emotion/babel-plugin"]
      },
      jsxImportSource: "@emotion/react"
    }),
    viteEslint(),
    viteStylelint({
      exclude: ["node_modules", "dist"]
    }),
    svgr(),
    viteImagemin({
      // 無損壓縮配置，無損壓縮下圖片質量不會變差
      optipng: {
        optimizationLevel: 7
      },
      // 有損壓縮配置，有損壓縮下圖片質量可能會變差
      pngquant: {
        quality: [0.8, 0.9]
      },
      // svg 優化
      svgo: {
        plugins: [
          {
            name: "removeViewBox"
          },
          {
            name: "removeEmptyAttrs",
            active: false
          }
        ]
      }
    }),
    createSvgIconsPlugin({
      iconDirs: [path.join(__dirname, "src/assets/icons")]
    })
  ],
  css: {
    postcss: postcssConfig,
    modules: {
      generateScopedName: "[name]__[local]___[hash:base64:5]"
    },
    preprocessorOptions: {
      scss: {
        additionalData: `@import "${variablePath}";`
      }
    }
  },
  // alias config
  resolve: {
    alias: {
      "@assets": path.join(__dirname, "src/assets")
    }
  },
  json: {
    stringify: true
  },
  base: isProduction ? `${CDN_URL}/` : "/"
});
