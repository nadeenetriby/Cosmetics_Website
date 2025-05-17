import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/api": {
        target: "http://localhost:3000", // Redirect API requests to backend
        changeOrigin: true,
        secure: false,
      },
    },
  },
});
