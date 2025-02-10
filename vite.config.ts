import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  assetsInclude: ["**/*.JPG"],
  base: "https://nkamlo237.github.io/cryptography/",
  build: {
    outDir: "dist",
    rollupOptions: {
      output: {
        entryFileNames: "assets/index-[hash].js",
        chunkFileNames: "assets/[name]-[hash].js",
        assetFileNames: "assets/[name]-[hash].[ext]",
      },
    },
  }
});
