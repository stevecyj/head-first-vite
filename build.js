import * as esbuild from "esbuild";
import fs from "node:fs";

let result = await esbuild.build({
  absWorkingDir: process.cwd(),
  entryPoints: ["./src/index.jsx"],
  bundle: true,
  splitting: true,
  sourcemap: true,
  // metafile: true,
  format: "esm",
  loader: {
    ".png": "base64"
  },
  outdir: "./dist"
});

// fs.writeFileSync("meta.json", JSON.stringify(result.metafile));
