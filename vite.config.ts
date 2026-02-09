import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [react()],
  server: {
    cors: true,
    host: "127.0.0.1", // Spotify redirect doesn't like localhost. This one is needed.
  },
});
