import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: {
    cors: true,
    host: "127.0.0.1", // Spotify redirect doesn't like localhost. This one is needed.
    proxy: {
      "/api": "http://127.0.0.1:3000",
    },
  },
});
