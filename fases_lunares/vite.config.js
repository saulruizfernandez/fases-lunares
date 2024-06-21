import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  base: "/",
  plugins: [react()],
  optimizeDeps: {
    include: ["@emotion/styled"],
  },
  build: {
    chunkSizeWarningLimit: 1000, // Adjust as needed
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes("node_modules")) {
            return id.split("node_modules/").pop().split("/")[0];
          }
        },
      },
    },
  },
});
