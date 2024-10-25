import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: [{ find: "@", replacement: "/src/Routes.jsx" }],
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@import "./src/widgets/assets/animation.scss";`,
      },
    },
  },
  esbuild: {
    loader: 'jsx', // Correctly set the loader for .js files
  },
});
