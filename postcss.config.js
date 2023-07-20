/** @type {import('postcss-load-config').Config} */

import autoprefixer from "autoprefixer";
import tailwindcss from "tailwindcss";
import tailwindConfig from "./tailwind.config.js";
export default {
  plugins: [
    tailwindcss(tailwindConfig),
    autoprefixer({
      overrideBrowserslist: ["last 2 versions", "> 1%"],
    }),
  ],
};
