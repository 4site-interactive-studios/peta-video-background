import { defineConfig } from "vite";
import basicSsl from "@vitejs/plugin-basic-ssl";
import cssInjectedByJsPlugin from "vite-plugin-css-injected-by-js";

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    port: 3000,
    https: true,
  },
  build: {
    emptyOutDir: true,
    lib: {
      entry: "src/main.ts",
      name: "PETAVideoBackground",
      fileName: "peta-video-background",
      formats: ["es"],
    },
    minify: "esbuild",
    target: "esnext",
  },
  plugins: [basicSsl(), cssInjectedByJsPlugin()],
  define: {
    "process.env": {},
  },
});
