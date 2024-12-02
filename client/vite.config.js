import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/api": "https://umbrella-talk-api-zeta.vercel.app",
      changeOrigin: true,
    },
    host: true,
    port: 3000,
    watch: {
      usePolling: true,
    },
  },
});
